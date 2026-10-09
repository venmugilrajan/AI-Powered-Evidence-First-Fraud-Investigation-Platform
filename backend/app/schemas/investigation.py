from pydantic import BaseModel, EmailStr, Field, ConfigDict
from typing import Optional, List, Dict, Any
from datetime import datetime

# --- Auth Schemas ---
class UserBase(BaseModel):
    email: EmailStr
    full_name: Optional[str] = None

class UserCreate(UserBase):
    password: str = Field(min_length=8)

class UserLogin(BaseModel):
    email: EmailStr
    password: str

class UserResponse(UserBase):
    model_config = ConfigDict(from_attributes=True)
    id: str
    is_active: bool
    role: str
    created_at: datetime

class Token(BaseModel):
    access_token: str
    token_type: str = "bearer"
    user: UserResponse

# --- Investigation Request & Input Schemas ---
class InvestigationCreateRequest(BaseModel):
    title: Optional[str] = Field(default=None, max_length=255)
    context_type: str = Field(default="general", max_length=64, description="delivery, recruitment, banking, marketplace, general")
    raw_text: Optional[str] = Field(default=None, max_length=32768)
    raw_url: Optional[str] = Field(default=None, max_length=2048)
    claimed_organization: Optional[str] = Field(default=None, max_length=255)
    payment_handle: Optional[str] = Field(default=None, max_length=255)
    notes: Optional[str] = Field(default=None, max_length=4096)
    enable_pii_redaction: bool = True
    is_demo_scenario: bool = False

# --- Domain & Findings Schemas ---
class ExtractedEntityResponse(BaseModel):
    model_config = ConfigDict(from_attributes=True)
    id: str
    entity_type: str
    value: str
    normalized_value: str
    source_context: Optional[str] = None

class ClaimResponse(BaseModel):
    model_config = ConfigDict(from_attributes=True)
    id: str
    claim_text: str
    category: str
    status: str
    confidence: float
    rationale: Optional[str] = None
    extraction_source: str = "DETERMINISTIC_RULES"

class IndicatorResponse(BaseModel):
    model_config = ConfigDict(from_attributes=True)
    id: str
    title: str
    category: str
    severity: str
    description: str
    detection_method: str
    supporting_evidence: Optional[Dict[str, Any]] = None
    limitations: Optional[str] = None

class ExternalLookupResponse(BaseModel):
    model_config = ConfigDict(from_attributes=True)
    id: str
    provider: str
    query_target: str
    query_type: str
    status: str
    source_reference: Optional[str] = None
    raw_response: Optional[Dict[str, Any]] = None
    is_simulated: bool

class EvidenceRelationshipResponse(BaseModel):
    model_config = ConfigDict(from_attributes=True)
    id: str
    source_id: str
    source_type: str
    target_id: str
    target_type: str
    relation_type: str
    confidence: float
    explanation: str

class RecommendationResponse(BaseModel):
    model_config = ConfigDict(from_attributes=True)
    id: str
    title: str
    action_type: str
    priority: str
    description: str
    triggered_by_finding: str

class RiskAssessmentResponse(BaseModel):
    model_config = ConfigDict(from_attributes=True)
    risk_level: str
    risk_score: float
    evidence_confidence: float
    critical_indicators_count: int
    contradictions_count: int
    executive_summary: str
    methodology_notes: str
    score_breakdown: Optional[List[Dict[str, Any]]] = None
    caveats: Optional[List[str]] = None

class InvestigationEventResponse(BaseModel):
    model_config = ConfigDict(from_attributes=True)
    stage: str
    message: str
    timestamp: datetime
    details: Optional[Dict[str, Any]] = None

# --- Complete Investigation View ---
class InvestigationDetailResponse(BaseModel):
    model_config = ConfigDict(from_attributes=True)
    id: str
    title: str
    context_type: str
    status: str
    current_stage: Optional[str] = None
    stage_progress: int
    is_demo: bool
    error_message: Optional[str] = None
    created_at: datetime
    completed_at: Optional[datetime] = None
    
    entities: List[ExtractedEntityResponse] = []
    claims: List[ClaimResponse] = []
    indicators: List[IndicatorResponse] = []
    lookups: List[ExternalLookupResponse] = []
    risk_assessment: Optional[RiskAssessmentResponse] = None
    recommendations: List[RecommendationResponse] = []
    events: List[InvestigationEventResponse] = []

class InvestigationSummaryResponse(BaseModel):
    id: str
    title: str
    context_type: str
    status: str
    stage_progress: int
    is_demo: bool
    created_at: datetime
    completed_at: Optional[datetime] = None
    risk_level: Optional[str] = None
    risk_score: Optional[float] = None

class DashboardStatsResponse(BaseModel):
    total_investigations: int
    completed_investigations: int
    analyzing_investigations: int
    risk_distribution: Dict[str, int]
    common_indicators: List[Dict[str, Any]]
    recent_investigations: List[InvestigationSummaryResponse]

# Graph View for React Flow
class GraphNode(BaseModel):
    id: str
    type: str # entity, claim, indicator, lookup, recommendation
    data: Dict[str, Any]

class GraphEdge(BaseModel):
    id: str
    source: str
    target: str
    label: str
    animated: Optional[bool] = False
    data: Optional[Dict[str, Any]] = None

class EvidenceGraphResponse(BaseModel):
    nodes: List[GraphNode]
    edges: List[GraphEdge]

# Settings/Integrations View
class IntegrationStatusResponse(BaseModel):
    ai_provider: str
    ai_available: bool
    threat_intel_urlhaus_active: bool
    threat_intel_safebrowsing_active: bool
    demo_mode_enabled: bool
    environment: str
