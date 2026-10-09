import logging
import httpx
from typing import List, Dict, Any
from app.core.config import settings
from app.core.ssrf_guard import SSRFGuard

logger = logging.getLogger(__name__)

# Known synthetic test dataset for demonstration mode and test benchmark validation
DEMO_THREAT_DATABASE = {
    "usps-redelivery-fee-update.top": {
        "status": "MALICIOUS",
        "provider": "URLHAUS",
        "threat": "Phishing / Credential Harvesting kit targeting postal users",
        "reference": "https://urlhaus.abuse.ch/sample/mock-usps-phish-9843/"
    },
    "parcel-reschedule-fee.xyz": {
        "status": "MALICIOUS",
        "provider": "GOOGLE_SAFE_BROWSING",
        "threat": "Social Engineering / Financial phishing site",
        "reference": "https://transparencyreport.google.com/safe-browsing/search"
    },
    "secure-login-hdfc-kyc.com": {
        "status": "MALICIOUS",
        "provider": "URLHAUS",
        "threat": "Banking credential and OTP harvester impersonating HDFC Bank",
        "reference": "https://urlhaus.abuse.ch/sample/mock-hdfc-otp-5512/"
    },
    "usps.com": {
        "status": "CLEAN",
        "provider": "GOOGLE_SAFE_BROWSING",
        "threat": "Official United States Postal Service Domain",
        "reference": "https://transparencyreport.google.com/safe-browsing/search"
    },
    "amazon.com": {
        "status": "CLEAN",
        "provider": "GOOGLE_SAFE_BROWSING",
        "threat": "Official Verified Corporate Domain",
        "reference": "https://transparencyreport.google.com/safe-browsing/search"
    }
}

class ExternalEvidenceCollector:
    """
    Threat Intelligence lookups with strict SSRF defense,
    real API integrations, and transparent demonstration fallbacks.
    """

    @staticmethod
    def collect_evidence(
        entities: List[Dict[str, str]],
        is_demo: bool = True
    ) -> List[Dict[str, Any]]:
        lookups: List[Dict[str, Any]] = []

        domains = [e["value"] for e in entities if e["entity_type"] == "DOMAIN"]
        urls = [e["value"] for e in entities if e["entity_type"] == "URL"]

        targets = list(set(domains + urls))

        for target in targets:
            # 1. SSRF Safety check before considering any lookup
            is_safe, error_msg = SSRFGuard.validate_url(target if "://" in target else f"http://{target}")
            if not is_safe:
                lookups.append({
                    "provider": "SSRF_DEFENSE_GUARD",
                    "query_target": target,
                    "query_type": "URL_OR_DOMAIN",
                    "status": "UNAVAILABLE",
                    "source_reference": "RFC 1918 / Metadata Protection Policy",
                    "raw_response": {"blocked_reason": error_msg},
                    "is_simulated": False
                })
                continue

            # 2. Live Threat Intel: Google Safe Browsing
            if settings.GOOGLE_SAFE_BROWSING_API_KEY and not is_demo:
                gsb_result = ExternalEvidenceCollector._query_google_safe_browsing(target)
                lookups.append(gsb_result)

            # 3. Live Threat Intel: URLhaus lookup
            if settings.URLHAUS_API_KEY and not is_demo:
                urlhaus_result = ExternalEvidenceCollector._query_urlhaus(target)
                lookups.append(urlhaus_result)

            # 4. If in demo mode or target is in synthetic benchmark fixture
            if is_demo or (not settings.GOOGLE_SAFE_BROWSING_API_KEY and not settings.URLHAUS_API_KEY):
                if target.lower() in DEMO_THREAT_DATABASE:
                    mock_data = DEMO_THREAT_DATABASE[target.lower()]
                    lookups.append({
                        "provider": mock_data["provider"],
                        "query_target": target,
                        "query_type": "DOMAIN",
                        "status": mock_data["status"],
                        "source_reference": mock_data["reference"],
                        "raw_response": {
                            "simulated_threat": mock_data["threat"],
                            "note": "SIMULATED RESULT: Clearly identified for demonstration transparency"
                        },
                        "is_simulated": True
                    })
                else:
                    # Honest reporting: not in local demo feed, external provider not configured
                    lookups.append({
                        "provider": "COMMUNITY_REPUTATION_CACHE",
                        "query_target": target,
                        "query_type": "DOMAIN",
                        "status": "INSUFFICIENT_EVIDENCE",
                        "source_reference": "TrustTrace Rep Cache",
                        "raw_response": {
                            "message": "No confirmed malicious reports logged in database. Clean status does NOT guarantee legitimacy."
                        },
                        "is_simulated": False
                    })

        return lookups

    @staticmethod
    def _query_google_safe_browsing(target_url: str) -> Dict[str, Any]:
        endpoint = f"https://safebrowsing.googleapis.com/v4/threatMatches:find?key={settings.GOOGLE_SAFE_BROWSING_API_KEY}"
        payload = {
            "client": {"clientId": "trusttrace", "clientVersion": "1.0.0"},
            "threatInfo": {
                "threatTypes": ["MALWARE", "SOCIAL_ENGINEERING", "UNWANTED_SOFTWARE", "POTENTIALLY_HARMFUL_APPLICATION"],
                "platformTypes": ["ANY_PLATFORM"],
                "threatEntryTypes": ["URL"],
                "threatEntries": [{"url": target_url if "://" in target_url else f"http://{target_url}"}]
            }
        }
        try:
            with httpx.Client(timeout=settings.MAX_OUTBOUND_TIMEOUT_SECONDS) as client:
                res = client.post(endpoint, json=payload)
                if res.status_code == 200:
                    data = res.json()
                    has_matches = bool(data.get("matches"))
                    return {
                        "provider": "GOOGLE_SAFE_BROWSING",
                        "query_target": target_url,
                        "query_type": "URL",
                        "status": "MALICIOUS" if has_matches else "CLEAN",
                        "source_reference": "https://safebrowsing.googleapis.com",
                        "raw_response": data,
                        "is_simulated": False
                    }
                else:
                    return {
                        "provider": "GOOGLE_SAFE_BROWSING",
                        "query_target": target_url,
                        "query_type": "URL",
                        "status": "UNAVAILABLE",
                        "source_reference": "https://safebrowsing.googleapis.com",
                        "raw_response": {"http_status": res.status_code, "error": res.text},
                        "is_simulated": False
                    }
        except Exception as e:
            return {
                "provider": "GOOGLE_SAFE_BROWSING",
                "query_target": target_url,
                "query_type": "URL",
                "status": "UNAVAILABLE",
                "source_reference": "https://safebrowsing.googleapis.com",
                "raw_response": {"exception": str(e)},
                "is_simulated": False
            }

    @staticmethod
    def _query_urlhaus(target: str) -> Dict[str, Any]:
        # URLhaus API v1 host lookup endpoint
        endpoint = "https://urlhaus-api.abuse.ch/v1/host/"
        headers = {"Auth-Key": settings.URLHAUS_API_KEY} if settings.URLHAUS_API_KEY else {}
        domain = target.replace("http://", "").replace("https://", "").split("/")[0]

        try:
            with httpx.Client(timeout=settings.MAX_OUTBOUND_TIMEOUT_SECONDS) as client:
                res = client.post(endpoint, data={"host": domain}, headers=headers)
                if res.status_code == 200:
                    data = res.json()
                    q_status = data.get("query_status")
                    if q_status == "ok":
                        urls_count = data.get("url_count", 0)
                        status = "MALICIOUS" if urls_count > 0 else "CLEAN"
                    elif q_status == "no_results":
                        status = "INSUFFICIENT_EVIDENCE"
                    else:
                        status = "UNAVAILABLE"

                    return {
                        "provider": "URLHAUS",
                        "query_target": domain,
                        "query_type": "DOMAIN",
                        "status": status,
                        "source_reference": f"https://urlhaus.abuse.ch/host/{domain}/",
                        "raw_response": data,
                        "is_simulated": False
                    }
                else:
                    return {
                        "provider": "URLHAUS",
                        "query_target": domain,
                        "query_type": "DOMAIN",
                        "status": "UNAVAILABLE",
                        "source_reference": "https://urlhaus.abuse.ch/",
                        "raw_response": {"http_status": res.status_code, "body": res.text},
                        "is_simulated": False
                    }
        except Exception as e:
            return {
                "provider": "URLHAUS",
                "query_target": domain,
                "query_type": "DOMAIN",
                "status": "UNAVAILABLE",
                "source_reference": "https://urlhaus.abuse.ch/",
                "raw_response": {"exception": str(e)},
                "is_simulated": False
            }
