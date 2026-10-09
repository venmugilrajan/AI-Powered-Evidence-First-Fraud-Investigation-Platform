from typing import List, Dict, Any

class RecommendationEngine:
    """
    Produces actionable, finding-linked verification recommendations and follow-up guidance.
    Every recommendation is explicitly triggered by an observed indicator or contradiction.
    """

    @staticmethod
    def generate_recommendations(
        indicators: List[Dict[str, Any]],
        contradictions: List[Dict[str, Any]],
        lookups: List[Dict[str, Any]],
        risk_level: str,
        claimed_org: str = ""
    ) -> List[Dict[str, Any]]:
        recommendations: List[Dict[str, Any]] = []
        seen_actions = set()

        def add_rec(title: str, action_type: str, priority: str, description: str, trigger: str):
            if action_type not in seen_actions:
                seen_actions.add(action_type)
                recommendations.append({
                    "title": title,
                    "action_type": action_type,
                    "priority": priority,
                    "description": description,
                    "triggered_by_finding": trigger
                })

        # 1. Contradiction triggers
        if contradictions:
            org_display = claimed_org if claimed_org else "the claimed organization"
            add_rec(
                title=f"Independently Contact {org_display} Via Public Directory",
                action_type="VERIFY_OFFICIAL_CHANNEL",
                priority="HIGH",
                description=f"Do not respond using links or contact details from this message. Look up {org_display}'s verified official customer portal in a search engine and confirm reference numbers directly.",
                trigger=f"Contradiction: {contradictions[0]['title']}"
            )

        # 2. Malicious reputation triggers
        has_malicious = any(l.get("status") == "MALICIOUS" for l in lookups)
        if has_malicious:
            add_rec(
                title="Do Not Open Link or Submit Credentials",
                action_type="CEASE_COMMUNICATION",
                priority="HIGH",
                description="Threat intelligence confirms this target matches active phishing or malware distribution infrastructure. Close any open sessions immediately.",
                trigger="Threat Intelligence: Confirmed Malicious Destination"
            )

        # 3. Financial / Payment triggers
        financial_indicators = [i for i in indicators if i.get("category") == "FINANCIAL_DISCREPANCY"]
        if financial_indicators:
            add_rec(
                title="Do Not Transfer Funds or Authenticate OTP",
                action_type="HALT_PAYMENT",
                priority="HIGH",
                description="Legitimate institutions and couriers do not request immediate fee payments to personal UPI handles or third-party gateways. Do not authorize any transactions.",
                trigger=financial_indicators[0]["title"]
            )

        # 4. Urgency triggers
        urgency_indicators = [i for i in indicators if i.get("category") == "URGENCY_PRESSURE"]
        if urgency_indicators:
            add_rec(
                title="Resist Coercive Deadlines and Time Pressure",
                action_type="PAUSE_AND_CONFIRM",
                priority="MEDIUM",
                description="Scammers rely on psychological urgency to induce panic and bypass logical verification. Legitimate parcel holds or account issues provide formal dispute windows.",
                trigger=urgency_indicators[0]["title"]
            )

        # 5. Incident response if compromised
        if risk_level in ("HIGH", "CRITICAL"):
            add_rec(
                title="Immediate Remediation If Action Was Already Taken",
                action_type="INCIDENT_RESPONSE",
                priority="HIGH",
                description="If you already entered passwords or banking information: 1) Change credentials immediately, 2) Contact your bank's fraud department to freeze transactions, 3) File an official report at cybercrime.gov.in or ic3.gov.",
                trigger=f"Overall Assessment: {risk_level} Risk Level"
            )

        # 6. Default best practice recommendation
        if not recommendations:
            add_rec(
                title="Verify Through Official App or Portal",
                action_type="STANDARD_VERIFICATION",
                priority="LOW",
                description="While no high-severity indicators were flagged, always verify parcel or account status by opening the official provider app directly.",
                trigger="General Prevention Best Practice"
            )

        return recommendations
