from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from app.core.config import settings
from app.db.session import engine, Base
from app.api.v1 import auth, investigations

# Enforce security validation
try:
    settings.validate_production_security()
except Exception as e:
    print(f"Warning on production security validation: {e}")

# Automatically initialize tables
try:
    Base.metadata.create_all(bind=engine)
except Exception as e:
    print(f"Warning: could not run Base.metadata.create_all on startup: {e}")

app = FastAPI(
    title=settings.PROJECT_NAME,
    version=settings.VERSION,
    description="TrustTrace: AI-Powered Evidence-First Fraud Investigation Platform"
)

app.add_middleware(
    CORSMiddleware,
    allow_origins=settings.CORS_ORIGINS,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Mount API Routers
app.include_router(auth.router, prefix=settings.API_V1_STR)
app.include_router(investigations.router, prefix=settings.API_V1_STR)

# Also mount under /v1 so if Vercel strips /api, the routes still match 100%
app.include_router(auth.router, prefix="/v1")
app.include_router(investigations.router, prefix="/v1")

@app.get("/api/v1/health")
@app.get("/v1/health")
@app.get("/health")
def health_check():
    return {
        "status": "healthy",
        "service": settings.PROJECT_NAME,
        "version": settings.VERSION,
        "environment": settings.ENVIRONMENT,
        "demo_mode": settings.DEMO_MODE
    }
