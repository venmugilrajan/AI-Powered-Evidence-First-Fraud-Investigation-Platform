import re
import tldextract
from urllib.parse import urlparse
from typing import List, Dict, Any

SUSPICIOUS_TLDS = {
    "top", "xyz", "vip", "icu", "click", "buzz", "work", "loan", "tk", "ml", "ga", "cf", "gq", "rest", "cam", "fit"
}

SUSPICIOUS_KEYWORDS = [
    "verify", "login", "update", "secure", "banking", "tracking", "redelivery", "parcel", "wallet", "support", "resolution"
]

URGENCY_PATTERNS = [
    (re.compile(r'\b(within 24 hours|within 12 hours|immediately|urgent|right now|before it is cancelled|today only)\b', re.IGNORECASE), "High-pressure immediate deadline enforced"),
    (re.compile(r'\b(suspended|frozen|terminated|deactivated|penalty|legal action|arrest warrant)\b', re.IGNORECASE), "Coercive punitive consequence threat"),
    (re.compile(r'\b(final notice|last warning|action required immediately)\b', re.IGNORECASE), "False sense of finality/impending consequence")
]

class IndicatorAnalyzer:
    """
    Deterministic rule engine analyzing domain, URL, lexical and financial indicators.
    Every finding produces explicit detection method, severity, and limitations.
    """

    @staticmethod
    def analyze(
        entities: List[Dict[str, str]],
        raw_text: str,
        claimed_org: str = ""
    ) -> List[Dict[str, Any]]:
        indicators: List[Dict[str, Any]] = []

        # Analyze URLs & Domains
        domains = [e["value"] for e in entities if e["entity_type"] == "DOMAIN"]
        urls = [e["value"] for e in entities if e["entity_type"] == "URL"]

        for domain in domains:
            extracted = tldextract.extract(domain)
            tld = extracted.suffix.lower()
            subdomain = extracted.subdomain.lower()
            domain_name = extracted.domain.lower()

            # 1. Suspicious / High-abuse TLDs
            if tld in SUSPICIOUS_TLDS:
                indicators.append({
                    "title": f"High-Abuse Top-Level Domain (.{tld})",
                    "category": "DOMAIN_ANOMALY",
                    "severity": "MEDIUM",
                    "description": f"Domain '{domain}' uses a TLD (.{tld}) frequently associated with disposable bulletproof hosting and low-cost spam infrastructure.",
                    "detection_method": "DETERMINISTIC_TLD_CHECK",
                    "supporting_evidence": {"domain": domain, "tld": tld},
                    "limitations": "Legitimate websites occasionally register on discount TLDs; this is an indicator, not definitive proof of malice."
                })

            # 2. Deceptive Subdomains / Lookalikes (e.g., usps.tracking-update.com)
            for kw in SUSPICIOUS_KEYWORDS:
                if kw in subdomain or kw in domain_name:
                    if claimed_org and claimed_org.lower() not in domain.lower():
                        indicators.append({
                            "title": f"Potential Brand/Service Impersonation in Domain ('{kw}')",
                            "category": "DOMAIN_ANOMALY",
                            "severity": "HIGH",
                            "description": f"Domain '{domain}' embeds sensitive keyword '{kw}' despite claimed authority being '{claimed_org}'.",
                            "detection_method": "HEURISTIC_KEYWORD_MATCH",
                            "supporting_evidence": {"domain": domain, "keyword": kw, "claimed_org": claimed_org},
                            "limitations": "Third-party vendors or payment processors may legitimately include operational terms in hostnames."
                        })
                        break

            # 3. Excessive hyphens or subdomain depth
            if domain.count("-") >= 3:
                indicators.append({
                    "title": "Excessive Hyphenation in Hostname",
                    "category": "DOMAIN_ANOMALY",
                    "severity": "MEDIUM",
                    "description": f"Hostname '{domain}' contains multiple hyphens ({domain.count('-')}), a pattern common in automated scam domain registration kits.",
                    "detection_method": "DETERMINISTIC_SYNTAX_CHECK",
                    "supporting_evidence": {"domain": domain, "hyphen_count": domain.count("-")},
                    "limitations": "Some legitimate internationalized or corporate sites use multiple hyphens for descriptive brand naming."
                })

            # 4. Direct IP address as hostname
            if re.match(r'^\d{1,3}\.\d{1,3}\.\d{1,3}\.\d{1,3}$', domain):
                indicators.append({
                    "title": "Raw IP Address Used As Hostname",
                    "category": "DOMAIN_ANOMALY",
                    "severity": "HIGH",
                    "description": f"Target '{domain}' uses a bare IP address rather than a registered domain name, bypassing typical SSL certificate and reputation safeguards.",
                    "detection_method": "DETERMINISTIC_IP_CHECK",
                    "supporting_evidence": {"ip": domain},
                    "limitations": "Internal diagnostic interfaces or unconfigured servers can expose raw IP addresses."
                })

        # 5. Urgency & Coercive Pressure checks in text
        for pattern, explanation in URGENCY_PATTERNS:
            match = pattern.search(raw_text)
            if match:
                indicators.append({
                    "title": "Artificial Urgency & Threat Pressure",
                    "category": "URGENCY_PRESSURE",
                    "severity": "MEDIUM",
                    "description": f"Communication utilizes psychological pressure tactics: \"{match.group(0)}\". {explanation}.",
                    "detection_method": "REGEX_LEXICAL_ANALYSIS",
                    "supporting_evidence": {"trigger_phrase": match.group(0)},
                    "limitations": "Legitimate urgent notifications (e.g. fraudulent transaction alerts from real banks) also contain time limits."
                })

        # 6. Unofficial / Personal Payment Channels
        payment_handles = [e["value"] for e in entities if e["entity_type"] == "PAYMENT_HANDLE"]
        if payment_handles:
            for handle in payment_handles:
                indicators.append({
                    "title": "Informal / Peer-to-Peer Payment Destination",
                    "category": "FINANCIAL_DISCREPANCY",
                    "severity": "HIGH",
                    "description": f"Payment requested through individual handle '{handle}' rather than a verified merchant payment gateway or official corporate invoice.",
                    "detection_method": "DETERMINISTIC_PAYMENT_REGEX",
                    "supporting_evidence": {"payment_handle": handle},
                    "limitations": "Small sole proprietors or freelancers may use direct UPI / P2P payment handles legitimately."
                })

        # 7. Unofficial Communication Channel for Official Business
        if any(w in raw_text.lower() for w in ["telegram", "whatsapp me", "contact on whatsapp"]) and claimed_org:
            indicators.append({
                "title": "Off-Platform Communication Redirect",
                "category": "COMMUNICATION_ANOMALY",
                "severity": "HIGH",
                "description": f"Recruitment or enterprise communication redirects the recipient to an encrypted chat application (Telegram/WhatsApp) away from enterprise systems.",
                "detection_method": "HEURISTIC_OFFPLATFORM_CHECK",
                "supporting_evidence": {"claimed_org": claimed_org},
                "limitations": "Some small local businesses utilize WhatsApp for direct customer communication."
            })

        return indicators
