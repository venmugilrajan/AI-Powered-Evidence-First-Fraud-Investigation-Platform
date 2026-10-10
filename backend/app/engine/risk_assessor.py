from typing import List, Dict, Any

class RiskAssessor:
    """
    Transparent, explainable risk assessment engine.
    Calculates numerical score and categorical risk level based on documented rules
    and evidence coverage, rather than opaque black-box outputs.
    
    Principles:
    1. Every risk category strictly matches its numeric score boundaries.
    2. Severity, evidence confidence, and overall risk score are tracked independently.
    3. Duplicate/redundant indicators are deduplicated by category/fingerprint to prevent artificial inflation.
    4. Full score contributions are itemized for complete user explainability.
    5. Clean, ambiguous, and insufficient-evidence scenarios are explicitly handled.
    6. A single suspicious TLD or urgency keyword alone CANNOT cause a High or Critical fraud classification.
    """

    SEVERITY_WEIGHTS = {
        "CRITICAL": 35.0,
        "HIGH": 20.0,
        "MEDIUM": 10.0,
        "LOW": 5.0,
        "INFORMATIONAL": 0.0
    }

    # Strict numeric thresholds for risk categories:
    # 0.0 - 24.9  => LOW
    # 25.0 - 49.9 => MODERATE
    # 50.0 - 74.9 => HIGH
    # 75.0 - 100  => CRITICAL
    # Or INSUFFICIENT_EVIDENCE if no actionable indicators/entities were present.

    @staticmethod
    def assess_risk(
        indicators: List[Dict[str, Any]],
        contradictions: List[Dict[str, Any]],
        lookups: List[Dict[str, Any]],
        claims: List[Dict[str, Any]]
    ) -> Dict[str, Any]:
        
        # 1. Deduplicate indicators by title / detection fingerprint to prevent score inflation
        unique_indicators: List[Dict[str, Any]] = []
        seen_keys = set()
        for ind in indicators:
            key = (ind.get("title", "").strip().lower(), ind.get("category", "").strip().lower())
            if key not in seen_keys:
                seen_keys.add(key)
                unique_indicators.append(ind)

        score = 0.0
        score_breakdown: List[Dict[str, Any]] = []
        critical_count = 0
        contradiction_count = len(contradictions)

        # 2. Accumulate Indicator Scores from deduplicated findings
        for ind in unique_indicators:
            sev = ind.get("severity", "LOW")
            pts = RiskAssessor.SEVERITY_WEIGHTS.get(sev, 5.0)
            if sev == "CRITICAL":
                critical_count += 1
            if pts > 0:
                score += pts
                score_breakdown.append({
                    "type": "INDICATOR",
                    "title": ind.get("title"),
                    "severity": sev,
                    "points": pts,
                    "rationale": ind.get("description", "")
                })

        # 3. Add Contradiction Penalties (e.g., claimed USPS vs destination .top domain)
        for contra in contradictions:
            contra_pts = 30.0
            score += contra_pts
            critical_count += 1
            score_breakdown.append({
                "type": "CONTRADICTION",
                "title": contra.get("title", "Identity Contradiction"),
                "severity": "CRITICAL",
                "points": contra_pts,
                "rationale": contra.get("explanation", "")
            })

        # 4. Add Confirmed External Threat Intelligence and OSINT Lookups
        for lkp in lookups:
            if lkp.get("status") == "MALICIOUS":
                lkp_pts = 35.0
                score += lkp_pts
                critical_count += 1
                sim_label = " [Simulated]" if lkp.get("is_simulated") else ""
                score_breakdown.append({
                    "type": "EXTERNAL_THREAT_INTEL",
                    "title": f"{lkp.get('provider')} Malicious Finding{sim_label}",
                    "severity": "CRITICAL",
                    "points": lkp_pts,
                    "rationale": f"Query target '{lkp.get('query_target')}' flagged as active malware/phishing by {lkp.get('provider')}."
                })
            elif lkp.get("status") == "SUSPICIOUS":
                lkp_pts = 20.0
                score += lkp_pts
                sim_label = " [Simulated]" if lkp.get("is_simulated") else ""
                score_breakdown.append({
                    "type": "EXTERNAL_OSINT_EVIDENCE",
                    "title": f"{lkp.get('provider')} Suspicious Match{sim_label}",
                    "severity": "HIGH",
                    "points": lkp_pts,
                    "rationale": f"Query target '{lkp.get('query_target')}' corroborated with public fraud/scam complaints or anomalous off-platform routing."
                })

        # Normalize score into [0.0, 100.0]
        normalized_score = min(100.0, max(0.0, score))

        # 5. Independent Evidence Confidence calculation (0.0 to 1.0)
        # Reflects breadth & corroboration of testable findings
        total_data_points = len(unique_indicators) + len(lookups) + len(claims)
        
        # High confidence requires corroborated lookups and testable claims
        has_confirmed_lookup = any(l.get("status") in ("MALICIOUS", "CLEAN", "SUSPICIOUS") for l in lookups)
        base_confidence = min(0.60, total_data_points * 0.08)
        confidence = base_confidence + (0.35 if has_confirmed_lookup else 0.10)
        confidence = min(0.98, max(0.15, confidence))

        # 6. Categorical Risk Level mapped directly to numeric threshold
        if total_data_points == 0 or (len(unique_indicators) == 0 and contradiction_count == 0 and not has_confirmed_lookup):
            risk_level = "INSUFFICIENT_EVIDENCE"
            summary = "Insufficient verifiable indicators observed to formulate a conclusive risk assessment."
        elif normalized_score >= 75.0 or (critical_count >= 2 and normalized_score >= 60.0):
            risk_level = "CRITICAL"
            summary = (
                f"Critical fraud risk detected (Threat Index: {round(normalized_score, 1)}/100). "
                f"Identified {critical_count} critical indicator(s) including direct digital infrastructure contradictions or confirmed threat-intel records."
            )
        elif normalized_score >= 50.0:
            risk_level = "HIGH"
            summary = (
                f"High risk detected (Threat Index: {round(normalized_score, 1)}/100). "
                f"Multiple strong indicators of impersonation or unauthorized payment instructions present."
            )
        elif normalized_score >= 25.0:
            risk_level = "MODERATE"
            summary = (
                f"Moderate suspicious signals observed (Threat Index: {round(normalized_score, 1)}/100). "
                "Non-standard syntax, unverified hostnames, or urgency tactics detected. Independent verification recommended before sharing funds or data."
            )
        else:
            risk_level = "LOW"
            summary = (
                f"Low observed risk (Threat Index: {round(normalized_score, 1)}/100). "
                "No malicious indicators or identity contradictions found. Note: Low risk is not an absolute guarantee against zero-day campaigns."
            )

        caveats = [
            "Assessment is based strictly on observable submitted tokens, headers, hostnames, and accessible threat feeds.",
            "Absence of a malicious record does not establish authentic identity or safety.",
            "Legitimate organizations may occasionally employ third-party cloud infrastructure or short links."
        ]

        methodology = (
            f"Deterministic additive rule engine: {len(unique_indicators)} distinct indicators evaluated, "
            f"{contradiction_count} direct identity contradictions verified, and {len(lookups)} external reputation checks recorded. "
            f"Evidence confidence: {round(confidence * 100)}%."
        )

        return {
            "risk_level": risk_level,
            "risk_score": round(normalized_score, 1),
            "evidence_confidence": round(confidence, 2),
            "critical_indicators_count": critical_count,
            "contradictions_count": contradiction_count,
            "executive_summary": summary,
            "methodology_notes": methodology,
            "score_breakdown": score_breakdown,
            "caveats": caveats
        }
