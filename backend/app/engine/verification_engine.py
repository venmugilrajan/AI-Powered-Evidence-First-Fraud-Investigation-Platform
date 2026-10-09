import tldextract
from typing import List, Dict, Any, Tuple

# Official known domains for prominent entities
OFFICIAL_ENTITY_DOMAINS = {
    "usps": ["usps.com"],
    "united states postal service": ["usps.com"],
    "fedex": ["fedex.com"],
    "ups": ["ups.com"],
    "dhl": ["dhl.com"],
    "india post": ["indiapost.gov.in"],
    "amazon": ["amazon.com", "amazon.in", "amazon.co.uk"],
    "apple": ["apple.com"],
    "netflix": ["netflix.com"],
    "microsoft": ["microsoft.com"],
    "google": ["google.com"],
    "sbi": ["onlinesbi.sbi", "sbi.co.in"],
    "hdfc": ["hdfcbank.com"],
    "icici": ["icicibank.com"]
}

class VerificationEngine:
    """
    Evaluates claims against observed entities, domains, and external evidence.
    Identifies direct contradictions (e.g. Claimed USPS, Destination = .top domain).
    """

    @staticmethod
    def verify(
        claims: List[Dict[str, Any]],
        entities: List[Dict[str, str]],
        lookups: List[Dict[str, Any]],
        claimed_org: str = ""
    ) -> Tuple[List[Dict[str, Any]], List[Dict[str, Any]]]:
        """
        Returns (updated_claims, contradictions)
        """
        contradictions: List[Dict[str, Any]] = []
        updated_claims: List[Dict[str, Any]] = []

        domains = [e["value"].lower() for e in entities if e["entity_type"] == "DOMAIN"]
        org_normalized = claimed_org.strip().lower()

        # Check for Claimed Org vs Observed Domain contradiction
        if org_normalized:
            expected_domains = []
            for known_org, official_doms in OFFICIAL_ENTITY_DOMAINS.items():
                if known_org in org_normalized or org_normalized in known_org:
                    expected_domains.extend(official_doms)

            if expected_domains and domains:
                # Check if any observed domain matches official expected domains
                def get_reg_domain(dom_str: str) -> str:
                    ext = tldextract.extract(dom_str)
                    if ext.domain and ext.suffix:
                        return f"{ext.domain}.{ext.suffix}"
                    return dom_str

                matched_official = any(
                    any(get_reg_domain(d) == get_reg_domain(exp) for exp in expected_domains)
                    for d in domains
                )

                if not matched_official:
                    contradictions.append({
                        "title": f"Domain Contradicts Claimed Organization ({claimed_org})",
                        "severity": "CRITICAL",
                        "claimed": f"Official {claimed_org} communication",
                        "observed": f"Destination domains: {', '.join(domains)}",
                        "explanation": f"The message asserts it is from '{claimed_org}', but directs the user to unauthorized domain(s) ({', '.join(domains)}) rather than authorized domain ({', '.join(expected_domains)})."
                    })

        # Update claim statuses based on evidence
        for claim in claims:
            c = dict(claim)
            c_text = c.get("claim_text", "").lower()
            cat = c.get("category", "")

            # Check if this claim was contradicted
            has_contradiction = False
            for contra in contradictions:
                if cat == "identity" or claimed_org.lower() in c_text:
                    c["status"] = "CONTRADICTED"
                    c["rationale"] = contra["explanation"]
                    c["confidence"] = 0.95
                    has_contradiction = True
                    break

            if not has_contradiction:
                # Check if any lookup found malicious
                has_malicious = any(l["status"] == "MALICIOUS" for l in lookups)
                if has_malicious and cat in ("identity", "delivery", "financial"):
                    c["status"] = "CONTRADICTED"
                    c["rationale"] = "Evidence indicates the communication and associated infrastructure are known malicious indicators."
                    c["confidence"] = 0.9
                else:
                    # By default, without authoritative independent confirmation, claim remains UNVERIFIED
                    c["status"] = "UNVERIFIED"
                    c["rationale"] = "No independent authoritative digital signature or confirmed official channel corroboration found."
                    c["confidence"] = 0.4

            updated_claims.append(c)

        return updated_claims, contradictions
