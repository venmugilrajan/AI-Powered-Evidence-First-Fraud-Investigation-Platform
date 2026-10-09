export interface User {
  id: string;
  email: string;
  full_name?: string;
  is_active: boolean;
  role: string;
  created_at: string;
}

export interface ExtractedEntity {
  id: string;
  entity_type: string;
  value: string;
  normalized_value: string;
  source_context?: string;
}

export interface Claim {
  id: string;
  claim_text: string;
  category: string;
  status: 'UNVERIFIED' | 'VERIFIED' | 'CONTRADICTED' | 'UNABLE_TO_CHECK';
  confidence: number;
  rationale?: string;
  extraction_source?: 'AI_GENERATED' | 'DETERMINISTIC_RULES';
}

export interface Indicator {
  id: string;
  title: string;
  category: string;
  severity: 'LOW' | 'MEDIUM' | 'HIGH' | 'CRITICAL' | 'INFORMATIONAL';
  description: string;
  detection_method: string;
  supporting_evidence?: Record<string, any>;
  limitations?: string;
}

export interface ExternalLookup {
  id: string;
  provider: string;
  query_target: string;
  query_type: string;
  status: 'MALICIOUS' | 'CLEAN' | 'SUSPICIOUS' | 'UNAVAILABLE' | 'NOT_PERFORMED' | 'INSUFFICIENT_EVIDENCE';
  source_reference?: string;
  raw_response?: Record<string, any>;
  is_simulated: boolean;
}

export interface RiskAssessment {
  risk_level: 'LOW' | 'MODERATE' | 'HIGH' | 'CRITICAL' | 'INSUFFICIENT_EVIDENCE';
  risk_score: number;
  evidence_confidence: number;
  critical_indicators_count: number;
  contradictions_count: number;
  executive_summary: string;
  methodology_notes: string;
  score_breakdown?: Array<{
    type: string;
    title: string;
    severity: string;
    points: number;
    rationale: string;
  }>;
  caveats?: string[];
}

export interface Recommendation {
  id: string;
  title: string;
  action_type: string;
  priority: 'HIGH' | 'MEDIUM' | 'LOW';
  description: string;
  triggered_by_finding: string;
}

export interface InvestigationEvent {
  stage: string;
  message: string;
  timestamp: string;
  details?: Record<string, any>;
}

export interface InvestigationDetail {
  id: string;
  title: string;
  context_type: string;
  status: 'DRAFT' | 'QUEUED' | 'ANALYZING' | 'COMPLETED' | 'FAILED';
  current_stage?: string;
  stage_progress: number;
  is_demo: boolean;
  error_message?: string;
  created_at: string;
  completed_at?: string;
  entities: ExtractedEntity[];
  claims: Claim[];
  indicators: Indicator[];
  lookups: ExternalLookup[];
  risk_assessment?: RiskAssessment;
  recommendations: Recommendation[];
  events: InvestigationEvent[];
}

export interface InvestigationSummary {
  id: string;
  title: string;
  context_type: string;
  status: string;
  stage_progress: number;
  is_demo: boolean;
  created_at: string;
  completed_at?: string;
  risk_level?: string;
  risk_score?: number;
}

export interface DashboardStats {
  total_investigations: number;
  completed_investigations: number;
  analyzing_investigations: number;
  risk_distribution: Record<string, number>;
  common_indicators: { title: string; count: number }[];
  recent_investigations: InvestigationSummary[];
}

export interface GraphNode {
  id: string;
  type: string;
  data: Record<string, any>;
}

export interface GraphEdge {
  id: string;
  source: string;
  target: string;
  label: string;
  animated?: boolean;
  data?: Record<string, any>;
}

export interface EvidenceGraphData {
  nodes: GraphNode[];
  edges: GraphEdge[];
}

export interface IntegrationStatus {
  ai_provider: string;
  ai_available: boolean;
  threat_intel_urlhaus_active: boolean;
  threat_intel_safebrowsing_active: boolean;
  demo_mode_enabled: boolean;
  environment: string;
}
