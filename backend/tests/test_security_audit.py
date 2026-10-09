import pytest
import uuid
from httpx import AsyncClient, ASGITransport
from app.main import app
from app.core.ssrf_guard import SSRFGuard
from app.engine.risk_assessor import RiskAssessor

@pytest.mark.asyncio
async def test_cross_user_data_isolation():
    """
    SECURITY AUDIT: Ensures User A cannot read, export, or delete investigations owned by User B.
    """
    transport = ASGITransport(app=app)
    async with AsyncClient(transport=transport, base_url="http://test") as ac:
        # Create User A
        email_a = f"user_a_{uuid.uuid4().hex[:6]}@trusttrace.ai"
        res_a = await ac.post("/api/v1/auth/register", json={
            "email": email_a, "password": "Password123!", "full_name": "Analyst A"
        })
        token_a = res_a.json()["access_token"]
        headers_a = {"Authorization": f"Bearer {token_a}"}

        # Create User B
        email_b = f"user_b_{uuid.uuid4().hex[:6]}@trusttrace.ai"
        res_b = await ac.post("/api/v1/auth/register", json={
            "email": email_b, "password": "Password123!", "full_name": "Analyst B"
        })
        token_b = res_b.json()["access_token"]
        headers_b = {"Authorization": f"Bearer {token_b}"}

        # User A creates an investigation
        inv_res = await ac.post("/api/v1/investigations", json={
            "title": "Private Classified Case A",
            "context_type": "banking",
            "raw_text": "Verify account security at https://usps.com",
            "is_demo_scenario": True
        }, headers=headers_a)
        inv_id = inv_res.json()["id"]

        # User B attempts to access User A's investigation detail -> MUST 404
        access_res = await ac.get(f"/api/v1/investigations/{inv_id}", headers=headers_b)
        assert access_res.status_code == 404, "Security violation: Cross-user data leakage on detail endpoint!"

        # User B attempts to view User A's graph -> MUST 404
        graph_res = await ac.get(f"/api/v1/investigations/{inv_id}/graph", headers=headers_b)
        assert graph_res.status_code == 404, "Security violation: Cross-user data leakage on graph endpoint!"

        # User B attempts to export User A's report -> MUST 404
        export_res = await ac.get(f"/api/v1/investigations/{inv_id}/export?format=json", headers=headers_b)
        assert export_res.status_code == 404, "Security violation: Cross-user data leakage on export endpoint!"

        # User B attempts to delete User A's investigation -> MUST 404
        delete_res = await ac.delete(f"/api/v1/investigations/{inv_id}", headers=headers_b)
        assert delete_res.status_code == 404, "Security violation: Unauthorized deletion allowed across users!"

@pytest.mark.asyncio
async def test_legitimate_control_produces_low_risk():
    """
    PRODUCT INTEGRITY: A legitimate official notification without anomalies
    must evaluate to LOW risk, never producing false-positive fraud verdicts.
    """
    transport = ASGITransport(app=app)
    async with AsyncClient(transport=transport, base_url="http://test") as ac:
        email = f"analyst_ctrl_{uuid.uuid4().hex[:6]}@trusttrace.ai"
        res = await ac.post("/api/v1/auth/register", json={
            "email": email, "password": "Password123!", "full_name": "Control Analyst"
        })
        headers = {"Authorization": f"Bearer {res.json()['access_token']}"}

        # Submit legitimate USPS notification
        clean_res = await ac.post("/api/v1/investigations", json={
            "title": "Legitimate USPS Tracking Alert",
            "context_type": "delivery",
            "claimed_organization": "USPS",
            "raw_text": "USPS tracking update: Package #940011 has departed our sorting hub in Chicago, IL. Track updates online at https://usps.com/tracking or through your mobile app.",
            "raw_url": "https://usps.com",
            "is_demo_scenario": True
        }, headers=headers)
        assert clean_res.status_code == 200
        data = clean_res.json()
        assert data["risk_assessment"]["risk_level"] == "LOW"
        assert data["risk_assessment"]["risk_score"] < 25.0
        assert data["risk_assessment"]["contradictions_count"] == 0

@pytest.mark.asyncio
async def test_input_size_and_malformed_url_resilience():
    """
    SECURITY AUDIT: Overly long inputs or malformed non-HTTP URIs are rejected cleanly.
    """
    transport = ASGITransport(app=app)
    async with AsyncClient(transport=transport, base_url="http://test") as ac:
        email = f"fuzz_{uuid.uuid4().hex[:6]}@trusttrace.ai"
        res = await ac.post("/api/v1/auth/register", json={
            "email": email, "password": "Password123!", "full_name": "Fuzzer"
        })
        headers = {"Authorization": f"Bearer {res.json()['access_token']}"}

        # 1. Reject blank payload
        empty_res = await ac.post("/api/v1/investigations", json={
            "context_type": "delivery",
            "raw_text": "",
            "raw_url": "",
            "payment_handle": ""
        }, headers=headers)
        assert empty_res.status_code == 400

        # 2. SSRF guard handles IPv6 loopback and non-standard schemes
        is_safe, err = SSRFGuard.validate_url("gopher://127.0.0.1:6379/_flushall")
        assert is_safe is False
        assert "Unsupported URL scheme" in err

        is_safe_v6, err_v6 = SSRFGuard.validate_url("http://[::1]:8080/")
        assert is_safe_v6 is False

def test_production_security_validation_rejects_insecure_settings():
    """
    SECURITY AUDIT: Production environment must strictly reject insecure debug, secret keys, or sqlite.
    """
    from app.core.config import Settings

    # 1. Reject DEBUG=True in production
    bad_debug = Settings(ENVIRONMENT="production", DEBUG=True, SECRET_KEY="a"*32, DATABASE_URL="postgresql://user:pw@host/db")
    with pytest.raises(ValueError, match="DEBUG must be False in production"):
        bad_debug.validate_production_security()

    # 2. Reject short/insecure secret key in production
    bad_key = Settings(ENVIRONMENT="production", DEBUG=False, SECRET_KEY="insecure-key", DATABASE_URL="postgresql://user:pw@host/db")
    with pytest.raises(ValueError, match="SECRET_KEY must be a random secret"):
        bad_key.validate_production_security()

    # 3. Reject SQLite in production
    bad_db = Settings(ENVIRONMENT="production", DEBUG=False, SECRET_KEY="a"*32, DATABASE_URL="sqlite:///./trusttrace.db")
    with pytest.raises(ValueError, match="must use PostgreSQL"):
        bad_db.validate_production_security()

def test_fresh_schema_and_migrations_idempotency():
    """
    DATABASE INTEGRITY: Validates that all models create cleanly on a blank database (e.g. clean PostgreSQL / memory engine)
    and that Base.metadata.create_all is strictly repeatable and idempotent.
    """
    from sqlalchemy import create_engine
    from app.db.session import Base
    import app.models.investigation  # ensure all models registered

    eng = create_engine("sqlite:///:memory:")
    # First creation (blank DB)
    Base.metadata.create_all(bind=eng)
    expected_tables = {
        'users', 'investigations', 'investigation_inputs', 'extracted_entities', 
        'claims', 'indicators', 'external_lookups', 'evidence_relationships', 
        'risk_assessments', 'recommendations', 'investigation_events'
    }
    assert expected_tables.issubset(set(Base.metadata.tables.keys()))
    
    # Second creation (existing DB / idempotent run)
    Base.metadata.create_all(bind=eng)
    assert expected_tables.issubset(set(Base.metadata.tables.keys()))


