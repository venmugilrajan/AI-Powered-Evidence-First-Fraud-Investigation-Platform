import pytest
from app.core.ssrf_guard import SSRFGuard
from app.engine.normalizer import normalize_text, redact_sensitive_pii, extract_entities_from_input
from app.engine.indicator_analyzer import IndicatorAnalyzer
from app.engine.risk_assessor import RiskAssessor

def test_ssrf_guard_blocks_localhost():
    is_safe, msg = SSRFGuard.validate_url("http://localhost:8000/admin")
    assert is_safe is False
    assert "restricted" in msg or "internal" in msg or "blocked" in msg

def test_ssrf_guard_blocks_cloud_metadata():
    is_safe, msg = SSRFGuard.validate_url("http://169.254.169.254/latest/meta-data/")
    assert is_safe is False

def test_ssrf_guard_allows_safe_url():
    is_safe, msg = SSRFGuard.validate_url("https://example.com")
    assert is_safe is True
    assert msg is None

def test_normalizer_and_redaction():
    text = "Call +1-800-555-0199 or email test.agent@example.com immediately!"
    redacted = redact_sensitive_pii(text)
    assert "+1-800-555-0199" not in redacted
    assert "[REDACTED_PHONE]" in redacted

def test_extract_entities():
    sample = "Delivery failed. Pay at http://usps-redelivery.top or via support@fake-upi"
    entities = extract_entities_from_input(sample)
    types = [e["entity_type"] for e in entities]
    assert "URL" in types
    assert "DOMAIN" in types

def test_indicator_analyzer_detects_suspicious_tld():
    entities = [{"entity_type": "DOMAIN", "value": "parcel-fee.xyz", "normalized_value": "parcel-fee.xyz"}]
    indicators = IndicatorAnalyzer.analyze(entities, "Click immediately to verify", "USPS")
    titles = [i["title"] for i in indicators]
    assert any("High-Abuse Top-Level Domain" in t for t in titles)

def test_risk_assessor_calculation():
    indicators = [{"severity": "CRITICAL"}, {"severity": "HIGH"}]
    contradictions = [{"title": "Domain mismatch"}]
    lookups = [{"status": "MALICIOUS"}]
    claims = []
    
    risk = RiskAssessor.assess_risk(indicators, contradictions, lookups, claims)
    assert risk["risk_level"] in ("HIGH", "CRITICAL")
    assert risk["risk_score"] > 60.0
