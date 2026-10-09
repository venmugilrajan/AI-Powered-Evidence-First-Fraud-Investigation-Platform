import pytest
from app.engine.risk_assessor import RiskAssessor

def test_single_urgency_phrase_does_not_cause_fraud_classification():
    """
    PRODUCT INTEGRITY: An isolated urgency phrase alone (e.g. 'Action required today')
    must only yield LOW or MODERATE risk, never HIGH or CRITICAL fraud verdicts.
    """
    indicators = [{
        "title": "Artificial Urgency & Threat Pressure",
        "category": "URGENCY_PRESSURE",
        "severity": "MEDIUM",
        "description": "Urgent phrase detected."
    }]
    contradictions = []
    lookups = []
    claims = [{"claim_text": "Action required by end of business", "status": "UNVERIFIED"}]

    risk = RiskAssessor.assess_risk(indicators, contradictions, lookups, claims)
    # Severity weight for MEDIUM is 10.0 -> Score 10.0 => LOW (< 25.0)
    assert risk["risk_level"] == "LOW"
    assert risk["risk_score"] == 10.0
    assert risk["critical_indicators_count"] == 0

def test_suspicious_tld_alone_does_not_cause_high_risk():
    """
    PRODUCT INTEGRITY: A suspicious TLD alone (e.g. .xyz) without identity contradictions
    or malicious reputation reports must not exceed MODERATE risk.
    """
    indicators = [{
        "title": "High-Abuse Top-Level Domain (.xyz)",
        "category": "DOMAIN_ANOMALY",
        "severity": "MEDIUM",
        "description": "Discount TLD observed."
    }]
    contradictions = []
    lookups = [{"provider": "SAFE_BROWSING", "status": "INSUFFICIENT_EVIDENCE", "query_target": "domain.xyz", "is_simulated": False}]
    claims = []

    risk = RiskAssessor.assess_risk(indicators, contradictions, lookups, claims)
    assert risk["risk_level"] in ("LOW", "MODERATE")
    assert risk["risk_score"] < 50.0

def test_deduplication_prevents_indicator_inflation():
    """
    CORRECTNESS: Submitting repeated/duplicate indicator findings should not artificially
    compound the risk score.
    """
    dup_indicators = [
        {"title": "High-Abuse TLD", "category": "DOMAIN_ANOMALY", "severity": "MEDIUM"},
        {"title": "High-Abuse TLD", "category": "DOMAIN_ANOMALY", "severity": "MEDIUM"},
        {"title": "High-Abuse TLD", "category": "DOMAIN_ANOMALY", "severity": "MEDIUM"}
    ]
    risk = RiskAssessor.assess_risk(dup_indicators, [], [], [])
    # Should only be scored once (10.0 pts)
    assert risk["risk_score"] == 10.0
    assert len(risk["score_breakdown"]) == 1

def test_insufficient_evidence_when_no_data_present():
    """
    UNCERTAINTY REPORTING: Blank / sparse submissions without testable indicators
    must report INSUFFICIENT_EVIDENCE rather than clean LOW risk.
    """
    risk = RiskAssessor.assess_risk([], [], [], [])
    assert risk["risk_level"] == "INSUFFICIENT_EVIDENCE"
    assert risk["risk_score"] == 0.0

def test_strict_numeric_threshold_boundaries():
    """
    BOUNDARY VERIFICATION: Ensure every numeric range strictly aligns with its categorical label:
    - 0 to 24.9 => LOW
    - 25.0 to 49.9 => MODERATE
    - 50.0 to 74.9 => HIGH
    - 75.0 to 100 => CRITICAL
    """
    # 1. Score = 25.0 => MODERATE
    risk_mod = RiskAssessor.assess_risk(
        [
            {"title": "Ind 1", "category": "A", "severity": "HIGH"},   # 20.0
            {"title": "Ind 2", "category": "B", "severity": "LOW"}      # 5.0 -> 25.0
        ],
        [],
        [{"provider": "URLHAUS", "status": "CLEAN", "query_target": "example.com", "is_simulated": False}],
        []
    )
    assert risk_mod["risk_score"] == 25.0
    assert risk_mod["risk_level"] == "MODERATE"

    # 2. Score = 50.0 => HIGH
    risk_high = RiskAssessor.assess_risk(
        [
            {"title": "Ind 1", "category": "A", "severity": "HIGH"},   # 20.0
            {"title": "Ind 2", "category": "B", "severity": "HIGH"},   # 20.0
            {"title": "Ind 3", "category": "C", "severity": "MEDIUM"}  # 10.0 -> 50.0
        ],
        [],
        [{"provider": "URLHAUS", "status": "CLEAN", "query_target": "example.com", "is_simulated": False}],
        []
    )
    assert risk_high["risk_score"] == 50.0
    assert risk_high["risk_level"] == "HIGH"

    # 3. Score >= 75.0 => CRITICAL
    risk_crit = RiskAssessor.assess_risk(
        [
            {"title": "Ind 1", "category": "A", "severity": "HIGH"},   # 20.0
            {"title": "Ind 2", "category": "B", "severity": "HIGH"},   # 20.0
        ],
        [{"title": "Domain mismatch", "explanation": "Target domain does not belong to claimed org"}], # 30.0
        [{"provider": "URLHAUS", "status": "MALICIOUS", "query_target": "phish.top", "is_simulated": False}], # 35.0 -> 105 bounded to 100
        []
    )
    assert risk_crit["risk_score"] == 100.0
    assert risk_crit["risk_level"] == "CRITICAL"
