import uuid
from datetime import datetime, timezone
from sqlalchemy import Column, String, Text, Boolean, Integer, Float, ForeignKey, DateTime, JSON, Enum
from sqlalchemy.orm import relationship
import enum
from app.db.session import Base

def generate_uuid():
    return str(uuid.uuid4())

def utc_now():
    return datetime.now(timezone.utc)

class UserRole(str, enum.Enum):
    ANALYST = "analyst"
    ADMIN = "admin"

class InvestigationStatus(str, enum.Enum):
    DRAFT = "DRAFT"
    QUEUED = "QUEUED"
    ANALYZING = "ANALYZING"
    COMPLETED = "COMPLETED"
    FAILED = "FAILED"

class RiskLevel(str, enum.Enum):
    LOW = "LOW"
    MODERATE = "MODERATE"
    HIGH = "HIGH"
    CRITICAL = "CRITICAL"
    INSUFFICIENT_EVIDENCE = "INSUFFICIENT_EVIDENCE"

class FindingSeverity(str, enum.Enum):
    INFORMATIONAL = "INFORMATIONAL"
    LOW = "LOW"
    MEDIUM = "MEDIUM"
    HIGH = "HIGH"
    CRITICAL = "CRITICAL"

class ClaimStatus(str, enum.Enum):
    UNVERIFIED = "UNVERIFIED"
    VERIFIED = "VERIFIED"
    CONTRADICTED = "CONTRADICTED"
    UNABLE_TO_CHECK = "UNABLE_TO_CHECK"

class LookupStatus(str, enum.Enum):
    MALICIOUS = "MALICIOUS"
    CLEAN = "CLEAN"
    SUSPICIOUS = "SUSPICIOUS"
    UNAVAILABLE = "UNAVAILABLE"
    NOT_PERFORMED = "NOT_PERFORMED"
    INSUFFICIENT_EVIDENCE = "INSUFFICIENT_EVIDENCE"

class User(Base):
    __tablename__ = "users"
    
    id = Column(String(36), primary_key=True, default=generate_uuid)
    email = Column(String(255), unique=True, index=True, nullable=False)
    hashed_password = Column(String(255), nullable=False)
    full_name = Column(String(255), nullable=True)
    is_active = Column(Boolean, default=True)
    role = Column(String(32), default=UserRole.ANALYST.value)
    created_at = Column(DateTime, default=utc_now)
    updated_at = Column(DateTime, default=utc_now, onupdate=utc_now)
    
    investigations = relationship("Investigation", back_populates="owner", cascade="all, delete-orphan")

class Investigation(Base):
    __tablename__ = "investigations"
    
    id = Column(String(36), primary_key=True, default=generate_uuid)
    user_id = Column(String(36), ForeignKey("users.id"), nullable=False, index=True)
    title = Column(String(255), nullable=False)
    context_type = Column(String(64), default="general") # delivery, recruitment, banking, marketplace, general
    status = Column(String(32), default=InvestigationStatus.DRAFT.value, index=True)
    current_stage = Column(String(64), nullable=True)
    stage_progress = Column(Integer, default=0) # 0 to 100
    is_demo = Column(Boolean, default=False)
    error_message = Column(Text, nullable=True)
    
    created_at = Column(DateTime, default=utc_now, index=True)
    completed_at = Column(DateTime, nullable=True)
    
    # Relationships
    owner = relationship("User", back_populates="investigations")
    inputs = relationship("InvestigationInput", back_populates="investigation", cascade="all, delete-orphan")
    entities = relationship("ExtractedEntity", back_populates="investigation", cascade="all, delete-orphan")
    claims = relationship("Claim", back_populates="investigation", cascade="all, delete-orphan")
    indicators = relationship("Indicator", back_populates="investigation", cascade="all, delete-orphan")
    lookups = relationship("ExternalLookup", back_populates="investigation", cascade="all, delete-orphan")
    relationships = relationship("EvidenceRelationship", back_populates="investigation", cascade="all, delete-orphan")
    risk_assessment = relationship("RiskAssessment", uselist=False, back_populates="investigation", cascade="all, delete-orphan")
    recommendations = relationship("Recommendation", back_populates="investigation", cascade="all, delete-orphan")
    events = relationship("InvestigationEvent", back_populates="investigation", cascade="all, delete-orphan")

class InvestigationInput(Base):
    __tablename__ = "investigation_inputs"
    
    id = Column(String(36), primary_key=True, default=generate_uuid)
    investigation_id = Column(String(36), ForeignKey("investigations.id"), nullable=False)
    raw_text = Column(Text, nullable=True)
    raw_url = Column(String(1024), nullable=True)
    claimed_organization = Column(String(255), nullable=True)
    payment_handle = Column(String(255), nullable=True)
    notes = Column(Text, nullable=True)
    normalized_text = Column(Text, nullable=True)
    is_redacted = Column(Boolean, default=False)
    created_at = Column(DateTime, default=utc_now)
    
    investigation = relationship("Investigation", back_populates="inputs")

class ExtractedEntity(Base):
    __tablename__ = "extracted_entities"
    
    id = Column(String(36), primary_key=True, default=generate_uuid)
    investigation_id = Column(String(36), ForeignKey("investigations.id"), nullable=False)
    entity_type = Column(String(64), nullable=False) # URL, DOMAIN, EMAIL, PHONE, ORG, PAYMENT_HANDLE, CURRENCY_AMOUNT
    value = Column(String(1024), nullable=False)
    normalized_value = Column(String(1024), nullable=False)
    source_context = Column(String(255), nullable=True)
    created_at = Column(DateTime, default=utc_now)
    
    investigation = relationship("Investigation", back_populates="entities")

class Claim(Base):
    __tablename__ = "claims"
    
    id = Column(String(36), primary_key=True, default=generate_uuid)
    investigation_id = Column(String(36), ForeignKey("investigations.id"), nullable=False)
    claim_text = Column(Text, nullable=False)
    category = Column(String(64), nullable=False) # identity, urgency, financial, authority, delivery
    status = Column(String(32), default=ClaimStatus.UNVERIFIED.value)
    confidence = Column(Float, default=0.5)
    rationale = Column(Text, nullable=True)
    extraction_source = Column(String(32), default="DETERMINISTIC_RULES") # "AI_GENERATED" or "DETERMINISTIC_RULES"
    created_at = Column(DateTime, default=utc_now)
    
    investigation = relationship("Investigation", back_populates="claims")

class Indicator(Base):
    __tablename__ = "indicators"
    
    id = Column(String(36), primary_key=True, default=generate_uuid)
    investigation_id = Column(String(36), ForeignKey("investigations.id"), nullable=False)
    title = Column(String(255), nullable=False)
    category = Column(String(64), nullable=False) # DOMAIN_ANOMALY, URGENCY_PRESSURE, FINANCIAL_DISCREPANCY, THREAT_INTEL
    severity = Column(String(32), nullable=False) # LOW, MEDIUM, HIGH, CRITICAL
    description = Column(Text, nullable=False)
    detection_method = Column(String(64), nullable=False) # DETERMINISTIC_REGEX, HEURISTIC, REPUTATION_API, LLM_SEMANTIC
    supporting_evidence = Column(JSON, nullable=True)
    limitations = Column(Text, nullable=True)
    created_at = Column(DateTime, default=utc_now)
    
    investigation = relationship("Investigation", back_populates="indicators")

class ExternalLookup(Base):
    __tablename__ = "external_lookups"
    
    id = Column(String(36), primary_key=True, default=generate_uuid)
    investigation_id = Column(String(36), ForeignKey("investigations.id"), nullable=False)
    provider = Column(String(64), nullable=False) # URLHAUS, GOOGLE_SAFE_BROWSING, WHOIS_RDAP, DNS_SEC
    query_target = Column(String(1024), nullable=False)
    query_type = Column(String(64), nullable=False) # URL, DOMAIN, IP
    status = Column(String(32), nullable=False) # MALICIOUS, CLEAN, UNAVAILABLE, etc.
    source_reference = Column(String(512), nullable=True)
    raw_response = Column(JSON, nullable=True)
    is_simulated = Column(Boolean, default=False)
    created_at = Column(DateTime, default=utc_now)
    
    investigation = relationship("Investigation", back_populates="lookups")

class EvidenceRelationship(Base):
    __tablename__ = "evidence_relationships"
    
    id = Column(String(36), primary_key=True, default=generate_uuid)
    investigation_id = Column(String(36), ForeignKey("investigations.id"), nullable=False)
    source_id = Column(String(64), nullable=False)
    source_type = Column(String(64), nullable=False) # entity, claim, indicator, lookup
    target_id = Column(String(64), nullable=False)
    target_type = Column(String(64), nullable=False)
    relation_type = Column(String(64), nullable=False) # supports, contradicts, mentions, claims_identity_of, links_to, requires_verification
    confidence = Column(Float, default=1.0)
    explanation = Column(Text, nullable=False)
    created_at = Column(DateTime, default=utc_now)
    
    investigation = relationship("Investigation", back_populates="relationships")

class RiskAssessment(Base):
    __tablename__ = "risk_assessments"
    
    id = Column(String(36), primary_key=True, default=generate_uuid)
    investigation_id = Column(String(36), ForeignKey("investigations.id"), nullable=False, unique=True)
    risk_level = Column(String(32), nullable=False) # LOW, MODERATE, HIGH, CRITICAL, INSUFFICIENT_EVIDENCE
    risk_score = Column(Float, nullable=False) # 0.0 to 100.0 (transparent weighted sum)
    evidence_confidence = Column(Float, nullable=False) # 0.0 to 1.0 (coverage of verifiable points)
    critical_indicators_count = Column(Integer, default=0)
    contradictions_count = Column(Integer, default=0)
    executive_summary = Column(Text, nullable=False)
    methodology_notes = Column(Text, nullable=False)
    score_breakdown = Column(JSON, nullable=True)
    caveats = Column(JSON, nullable=True)
    created_at = Column(DateTime, default=utc_now)
    
    investigation = relationship("Investigation", back_populates="risk_assessment")

class Recommendation(Base):
    __tablename__ = "recommendations"
    
    id = Column(String(36), primary_key=True, default=generate_uuid)
    investigation_id = Column(String(36), ForeignKey("investigations.id"), nullable=False)
    title = Column(String(255), nullable=False)
    action_type = Column(String(64), nullable=False) # VERIFY_OFFICIAL_CHANNEL, CEASE_COMMUNICATION, REPORT_FRAUD, SECURE_CREDENTIALS
    priority = Column(String(32), nullable=False) # HIGH, MEDIUM, LOW
    description = Column(Text, nullable=False)
    triggered_by_finding = Column(String(255), nullable=False) # Reference to finding/indicator
    created_at = Column(DateTime, default=utc_now)
    
    investigation = relationship("Investigation", back_populates="recommendations")

class InvestigationEvent(Base):
    __tablename__ = "investigation_events"
    
    id = Column(String(36), primary_key=True, default=generate_uuid)
    investigation_id = Column(String(36), ForeignKey("investigations.id"), nullable=False)
    stage = Column(String(64), nullable=False)
    message = Column(String(512), nullable=False)
    details = Column(JSON, nullable=True)
    timestamp = Column(DateTime, default=utc_now)
    
    investigation = relationship("Investigation", back_populates="events")
