from pydantic_settings import BaseSettings, SettingsConfigDict
from pydantic import field_validator
from typing import Optional, List, Any
import os

class Settings(BaseSettings):
    model_config = SettingsConfigDict(env_file=".env", extra="ignore")

    PROJECT_NAME: str = "TrustTrace"
    VERSION: str = "1.0.0"
    API_V1_STR: str = "/api/v1"
    
    # Environment
    ENVIRONMENT: str = "development"
    DEBUG: bool = True
    DEMO_MODE: bool = True  # Allows full investigation scenarios without requiring paid keys
    
    # Security & Auth
    SECRET_KEY: str = "trusttrace-insecure-dev-key-change-in-production-min32chars"
    ACCESS_TOKEN_EXPIRE_MINUTES: int = 60 * 24 * 7  # 7 days
    ALGORITHM: str = "HS256"
    CORS_ORIGINS: Any = ["*"]
    
    @field_validator("CORS_ORIGINS", mode="before")
    @classmethod
    def assemble_cors_origins(cls, v: Any) -> List[str]:
        if isinstance(v, str):
            if v == "*":
                return ["*"]
            return [i.strip() for i in v.split(",") if i.strip()]
        elif isinstance(v, list):
            return v
        return ["*"]

    DATABASE_URL: str = "sqlite:///./trusttrace.db"
    
    # AI Provider Settings ("demo" | "mistral" | "gemini" | "openai")
    AI_PROVIDER: str = "demo"
    MISTRAL_API_KEY: Optional[str] = None
    MISTRAL_MODEL: str = "open-mistral-7b"
    GEMINI_API_KEY: Optional[str] = None
    GEMINI_MODEL: str = "gemini-2.5-flash"
    OPENAI_API_KEY: Optional[str] = None
    OPENAI_MODEL: str = "gpt-4o-mini"
    
    # Threat Intelligence Keys (Optional - gracefully degrades to deterministic/demo when empty)
    GOOGLE_SAFE_BROWSING_API_KEY: Optional[str] = None
    URLHAUS_API_KEY: Optional[str] = None
    
    # SSRF & Safe Request Constraints
    MAX_OUTBOUND_TIMEOUT_SECONDS: float = 3.0
    MAX_RESPONSE_BYTES: int = 65536  # 64 KB limit

    def validate_production_security(self):
        """Enforces critical security posture when running in production."""
        if self.ENVIRONMENT.lower() == "production":
            if self.DEBUG:
                raise ValueError("Insecure Configuration: DEBUG must be False in production.")
            if "insecure" in self.SECRET_KEY.lower() or len(self.SECRET_KEY) < 32:
                raise ValueError("Insecure Configuration: Production SECRET_KEY must be a random secret of at least 32 characters.")
            if self.DATABASE_URL.startswith("sqlite"):
                raise ValueError("Insecure Configuration: Production environment must use PostgreSQL, not SQLite.")

settings = Settings()
