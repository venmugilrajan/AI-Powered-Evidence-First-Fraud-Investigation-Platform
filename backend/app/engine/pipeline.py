import logging
from datetime import datetime, timezone
from sqlalchemy.orm import Session
from typing import Dict, Any

from app.models.investigation import (
    Investigation,
    InvestigationInput,
    ExtractedEntity,
    Claim,
    Indicator,
    ExternalLookup,
    EvidenceRelationship,
    RiskAssessment,
    Recommendation,
    InvestigationEvent,
    InvestigationStatus
)
from app.engine.normalizer import normalize_text, redact_sensitive_pii, extract_entities_from_input
from app.engine.claim_extractor import ClaimExtractor
from app.engine.indicator_analyzer import IndicatorAnalyzer
from app.engine.external_collector import ExternalEvidenceCollector
from app.engine.verification_engine import VerificationEngine
from app.engine.graph_builder import GraphBuilder
from app.engine.risk_assessor import RiskAssessor
from app.engine.recommendation_engine import RecommendationEngine

logger = logging.getLogger(__name__)

class InvestigationPipeline:
    """
    Stateful execution pipeline advancing the investigation through 9 discrete stages,
    persisting findings, tracking events, and compiling provenance.
    """

    @staticmethod
    def run_pipeline(investigation_id: str, db: Session) -> Investigation:
        inv: Investigation = db.query(Investigation).filter(Investigation.id == investigation_id).first()
        if not inv:
            raise ValueError(f"Investigation {investigation_id} not found.")

        inp: InvestigationInput = inv.inputs[0] if inv.inputs else None
        if not inp:
            raise ValueError("Investigation has no submitted input.")

        def log_event(stage: str, message: str, details: Dict[str, Any] = None):
            event = InvestigationEvent(
                investigation_id=inv.id,
                stage=stage,
                message=message,
                details=details or {}
            )
            db.add(event)
            inv.current_stage = stage
            db.commit()

        try:
            inv.status = InvestigationStatus.ANALYZING.value
            db.commit()

            # --- Stage 1: Input Normalization & Entity Extraction ---
            inv.stage_progress = 10
            log_event("NORMALIZATION", "Normalizing text and parsing deterministic entities")
            
            raw_text = inp.raw_text or ""
            normalized = normalize_text(raw_text)
            inp.normalized_text = normalized

            # Safe entity extraction
            extracted = extract_entities_from_input(
                raw_text=normalized,
                raw_url=inp.raw_url or "",
                claimed_org=inp.claimed_organization or "",
                payment_handle=inp.payment_handle or ""
            )

            for ent_data in extracted:
                ent = ExtractedEntity(
                    investigation_id=inv.id,
                    entity_type=ent_data["entity_type"],
                    value=ent_data["value"],
                    normalized_value=ent_data["normalized_value"],
                    source_context=ent_data["source_context"]
                )
                db.add(ent)
            db.commit()

            # --- Stage 2: Claim Extraction ---
            inv.stage_progress = 25
            log_event("CLAIM_EXTRACTION", "Extracting testable factual assertions")
            
            # Use redacted text if PII redaction requested
            text_for_ai = redact_sensitive_pii(normalized) if inp.is_redacted else normalized
            extracted_claims = ClaimExtractor.extract_claims(
                raw_text=text_for_ai,
                context_type=inv.context_type,
                claimed_org=inp.claimed_organization or ""
            )

            for clm_data in extracted_claims:
                clm = Claim(
                    investigation_id=inv.id,
                    claim_text=clm_data["claim_text"],
                    category=clm_data["category"],
                    status="UNVERIFIED",
                    confidence=clm_data.get("confidence", 0.5),
                    rationale=clm_data.get("rationale"),
                    extraction_source=clm_data.get("extraction_source", "DETERMINISTIC_RULES")
                )
                db.add(clm)
            db.commit()

            # --- Stage 3: Indicator Analysis ---
            inv.stage_progress = 40
            log_event("INDICATOR_ANALYSIS", "Running deterministic heuristics and security rules")
            
            indicators_data = IndicatorAnalyzer.analyze(
                entities=extracted,
                raw_text=normalized,
                claimed_org=inp.claimed_organization or ""
            )

            for ind_data in indicators_data:
                ind = Indicator(
                    investigation_id=inv.id,
                    title=ind_data["title"],
                    category=ind_data["category"],
                    severity=ind_data["severity"],
                    description=ind_data["description"],
                    detection_method=ind_data["detection_method"],
                    supporting_evidence=ind_data["supporting_evidence"],
                    limitations=ind_data.get("limitations")
                )
                db.add(ind)
            db.commit()

            # --- Stage 4: External Evidence Collection ---
            inv.stage_progress = 55
            log_event("EXTERNAL_LOOKUP", "Checking external threat intelligence and reputation feeds")
            
            lookups_data = ExternalEvidenceCollector.collect_evidence(
                entities=extracted,
                is_demo=inv.is_demo
            )

            for lkp_data in lookups_data:
                lkp = ExternalLookup(
                    investigation_id=inv.id,
                    provider=lkp_data["provider"],
                    query_target=lkp_data["query_target"],
                    query_type=lkp_data["query_type"],
                    status=lkp_data["status"],
                    source_reference=lkp_data.get("source_reference"),
                    raw_response=lkp_data.get("raw_response"),
                    is_simulated=lkp_data.get("is_simulated", False)
                )
                db.add(lkp)
            db.commit()

            # --- Stage 5: Identity & Contradiction Verification ---
            inv.stage_progress = 70
            log_event("VERIFICATION", "Cross-referencing claims and testing for digital contradictions")
            
            verified_claims, contradictions = VerificationEngine.verify(
                claims=extracted_claims,
                entities=extracted,
                lookups=lookups_data,
                claimed_org=inp.claimed_organization or ""
            )

            # Update persisted claims with verification status
            db_claims = db.query(Claim).filter(Claim.investigation_id == inv.id).all()
            for i, db_clm in enumerate(db_claims):
                if i < len(verified_claims):
                    db_clm.status = verified_claims[i]["status"]
                    db_clm.rationale = verified_claims[i].get("rationale")
                    db_clm.confidence = verified_claims[i].get("confidence", 0.5)
            db.commit()

            # --- Stage 6: Risk Assessment ---
            inv.stage_progress = 80
            log_event("RISK_ASSESSMENT", "Computing explainable weighted risk score")
            
            risk_data = RiskAssessor.assess_risk(
                indicators=indicators_data,
                contradictions=contradictions,
                lookups=lookups_data,
                claims=verified_claims
            )

            risk_record = RiskAssessment(
                investigation_id=inv.id,
                risk_level=risk_data["risk_level"],
                risk_score=risk_data["risk_score"],
                evidence_confidence=risk_data["evidence_confidence"],
                critical_indicators_count=risk_data["critical_indicators_count"],
                contradictions_count=risk_data["contradictions_count"],
                executive_summary=risk_data["executive_summary"],
                methodology_notes=risk_data["methodology_notes"],
                score_breakdown=risk_data.get("score_breakdown"),
                caveats=risk_data["caveats"]
            )
            db.add(risk_record)
            db.commit()

            # --- Stage 7: Recommendations ---
            inv.stage_progress = 90
            log_event("RECOMMENDATIONS", "Generating actionable finding-triggered recommendations")
            
            recs_data = RecommendationEngine.generate_recommendations(
                indicators=indicators_data,
                contradictions=contradictions,
                lookups=lookups_data,
                risk_level=risk_data["risk_level"],
                claimed_org=inp.claimed_organization or ""
            )

            for r_data in recs_data:
                rec = Recommendation(
                    investigation_id=inv.id,
                    title=r_data["title"],
                    action_type=r_data["action_type"],
                    priority=r_data["priority"],
                    description=r_data["description"],
                    triggered_by_finding=r_data["triggered_by_finding"]
                )
                db.add(rec)
            db.commit()

            # --- Stage 8: Graph Builder & Relationships ---
            inv.stage_progress = 95
            log_event("GRAPH_CORRELATION", "Compiling graph edges and provenance relations")
            
            _, _, db_rel_data = GraphBuilder.build_graph(
                entities=extracted,
                claims=verified_claims,
                indicators=indicators_data,
                lookups=lookups_data,
                recommendations=recs_data,
                contradictions=contradictions
            )

            for rel in db_rel_data:
                er = EvidenceRelationship(
                    investigation_id=inv.id,
                    source_id=rel["source_id"],
                    source_type=rel["source_type"],
                    target_id=rel["target_id"],
                    target_type=rel["target_type"],
                    relation_type=rel["relation_type"],
                    confidence=rel["confidence"],
                    explanation=rel["explanation"]
                )
                db.add(er)
            db.commit()

            # --- Finalize ---
            inv.stage_progress = 100
            inv.status = InvestigationStatus.COMPLETED.value
            inv.completed_at = datetime.now(timezone.utc)
            log_event("COMPLETED", "Investigation finished successfully. Final report ready.")
            db.commit()
            return inv

        except Exception as e:
            logger.error(f"Investigation pipeline failure: {e}", exc_info=True)
            inv.status = InvestigationStatus.FAILED.value
            inv.error_message = f"Analysis error: {str(e)}"
            db.commit()
            return inv
