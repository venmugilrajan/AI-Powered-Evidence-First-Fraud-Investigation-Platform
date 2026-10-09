import pytest
from httpx import AsyncClient, ASGITransport
from app.main import app
from app.db.session import engine, Base

@pytest.fixture(autouse=True)
def setup_db():
    Base.metadata.create_all(bind=engine)
    yield

@pytest.mark.asyncio
async def test_health_check_endpoint():
    transport = ASGITransport(app=app)
    async with AsyncClient(transport=transport, base_url="http://test") as ac:
        response = await ac.get("/api/v1/health")
    assert response.status_code == 200
    data = response.json()
    assert data["status"] == "healthy"
    assert data["service"] == "TrustTrace"

@pytest.mark.asyncio
async def test_auth_and_investigation_lifecycle():
    import uuid
    unique_email = f"analyst_{uuid.uuid4().hex[:8]}@trusttrace.ai"
    transport = ASGITransport(app=app)
    async with AsyncClient(transport=transport, base_url="http://test") as ac:
        # 1. Register a test investigator
        reg_res = await ac.post("/api/v1/auth/register", json={
            "email": unique_email,
            "password": "Password123!",
            "full_name": "Senior Forensic Analyst"
        })
        assert reg_res.status_code == 200
        token = reg_res.json()["access_token"]
        headers = {"Authorization": f"Bearer {token}"}

        # 2. Check current user
        me_res = await ac.get("/api/v1/auth/me", headers=headers)
        assert me_res.status_code == 200
        assert me_res.json()["email"] == unique_email

        # 3. Submit a suspicious parcel scam message
        inv_payload = {
            "title": "USPS Package Fee Phishing Message",
            "context_type": "delivery",
            "claimed_organization": "USPS",
            "raw_text": "USPS Notice: Your parcel #940011 is delayed due to an incorrect address. Pay $1.99 redelivery fee within 24 hours at http://usps-redelivery-fee-update.top or package will be returned to sender.",
            "raw_url": "http://usps-redelivery-fee-update.top",
            "is_demo_scenario": True
        }
        create_res = await ac.post("/api/v1/investigations", json=inv_payload, headers=headers)
        assert create_res.status_code == 200
        inv_data = create_res.json()
        assert inv_data["status"] == "COMPLETED"
        assert len(inv_data["claims"]) > 0
        assert len(inv_data["indicators"]) > 0
        assert inv_data["risk_assessment"]["risk_level"] in ("HIGH", "CRITICAL")
        
        inv_id = inv_data["id"]

        # 4. Fetch Graph representation
        graph_res = await ac.get(f"/api/v1/investigations/{inv_id}/graph", headers=headers)
        assert graph_res.status_code == 200
        graph_data = graph_res.json()
        assert len(graph_data["nodes"]) > 0
        assert len(graph_data["edges"]) > 0

        # 5. Fetch Dashboard metrics
        dash_res = await ac.get("/api/v1/dashboard/stats", headers=headers)
        assert dash_res.status_code == 200
        stats = dash_res.json()
        assert stats["total_investigations"] >= 1
        assert stats["completed_investigations"] >= 1

        # 6. Export report as Markdown
        exp_res = await ac.get(f"/api/v1/investigations/{inv_id}/export?format=markdown", headers=headers)
        assert exp_res.status_code == 200
        assert "TrustTrace Investigation Report" in exp_res.text
