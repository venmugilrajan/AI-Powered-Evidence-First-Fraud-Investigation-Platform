import pytest
from unittest.mock import MagicMock, patch
from app.engine.external_collector import ExternalEvidenceCollector
from app.core.config import settings

def test_google_safe_browsing_mock_malicious():
    with patch("httpx.Client.post") as mock_post:
        mock_resp = MagicMock()
        mock_resp.status_code = 200
        mock_resp.json.return_value = {
            "matches": [
                {"threatType": "MALWARE", "platformType": "ANY_PLATFORM"}
            ]
        }
        mock_post.return_value = mock_resp

        with patch("app.core.config.settings.GOOGLE_SAFE_BROWSING_API_KEY", "mock_key"):
            result = ExternalEvidenceCollector._query_google_safe_browsing("http://malicious-test.com")
            assert result["status"] == "MALICIOUS"
            assert result["provider"] == "GOOGLE_SAFE_BROWSING"
            assert result["is_simulated"] is False

def test_google_safe_browsing_mock_clean():
    with patch("httpx.Client.post") as mock_post:
        mock_resp = MagicMock()
        mock_resp.status_code = 200
        mock_resp.json.return_value = {}  # No matches
        mock_post.return_value = mock_resp

        with patch("app.core.config.settings.GOOGLE_SAFE_BROWSING_API_KEY", "mock_key"):
            result = ExternalEvidenceCollector._query_google_safe_browsing("https://usps.com")
            assert result["status"] == "CLEAN"
            assert result["provider"] == "GOOGLE_SAFE_BROWSING"

def test_urlhaus_mock_malicious_result():
    with patch("httpx.Client.post") as mock_post:
        mock_resp = MagicMock()
        mock_resp.status_code = 200
        mock_resp.json.return_value = {
            "query_status": "ok",
            "url_count": 5,
            "urls": [{"url": "http://evil.top/phish"}]
        }
        mock_post.return_value = mock_resp

        with patch("app.core.config.settings.URLHAUS_API_KEY", "mock_key"):
            result = ExternalEvidenceCollector._query_urlhaus("evil.top")
            assert result["status"] == "MALICIOUS"
            assert result["provider"] == "URLHAUS"
            assert result["is_simulated"] is False

def test_urlhaus_no_results_treated_as_insufficient_evidence():
    with patch("httpx.Client.post") as mock_post:
        mock_resp = MagicMock()
        mock_resp.status_code = 200
        mock_resp.json.return_value = {
            "query_status": "no_results"
        }
        mock_post.return_value = mock_resp

        with patch("app.core.config.settings.URLHAUS_API_KEY", "mock_key"):
            result = ExternalEvidenceCollector._query_urlhaus("unknown-new-domain.com")
            # Inconclusive/no results must NEVER be marked as safe/CLEAN
            assert result["status"] == "INSUFFICIENT_EVIDENCE"
            assert result["status"] != "CLEAN"

def test_ssrf_blocked_before_lookup():
    entities = [{"entity_type": "URL", "value": "http://169.254.169.254/secret"}]
    results = ExternalEvidenceCollector.collect_evidence(entities, is_demo=False)
    assert len(results) == 1
    assert results[0]["provider"] == "SSRF_DEFENSE_GUARD"
    assert results[0]["status"] == "UNAVAILABLE"
