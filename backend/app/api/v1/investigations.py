import json
from typing import List, Optional
from fastapi import APIRouter, Depends, HTTPException, Query, BackgroundTasks, Response
from sqlalchemy.orm import Session
from sqlalchemy import desc

from app.db.session import get_db
from app.models.investigation import (
    User,
    Investigation,
    InvestigationInput,
    InvestigationStatus,
    RiskAssessment,
    Indicator,
    ExternalLookup
)
from app.schemas.investigation import (
    InvestigationCreateRequest,
    InvestigationDetailResponse,
    InvestigationSummaryResponse,
    EvidenceGraphResponse,
    RecommendationResponse,
    DashboardStatsResponse,
    IntegrationStatusResponse,
    GraphNode,
    GraphEdge
)
from app.api.v1.auth import get_current_user
from app.engine.pipeline import InvestigationPipeline
from app.engine.graph_builder import GraphBuilder
from app.core.config import settings

router = APIRouter(tags=["investigations"])

@router.post("/investigations", response_model=InvestigationDetailResponse)
def create_investigation(
    req: InvestigationCreateRequest,
    background_tasks: BackgroundTasks,
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user)
):
    # Validate that at least some input was provided
    if not req.raw_text and not req.raw_url and not req.payment_handle:
        raise HTTPException(status_code=400, detail="At least one input (text, url, or payment handle) must be provided.")

    title = req.title or (f"Investigation: {req.claimed_organization}" if req.claimed_organization else "Suspicious Message Investigation")
    
    inv = Investigation(
        user_id=current_user.id,
        title=title,
        context_type=req.context_type,
        status=InvestigationStatus.QUEUED.value,
        stage_progress=5,
        is_demo=req.is_demo_scenario or settings.DEMO_MODE
    )
    db.add(inv)
    db.commit()
    db.refresh(inv)

    inv_input = InvestigationInput(
        investigation_id=inv.id,
        raw_text=req.raw_text,
        raw_url=req.raw_url,
        claimed_organization=req.claimed_organization,
        payment_handle=req.payment_handle,
        notes=req.notes,
        is_redacted=req.enable_pii_redaction
    )
    db.add(inv_input)
    db.commit()

    # Execute pipeline synchronously or in background
    # Executing synchronously for fast, immediate UI feedback
    InvestigationPipeline.run_pipeline(inv.id, db)
    db.refresh(inv)

    return inv

@router.get("/investigations", response_model=List[InvestigationSummaryResponse])
def list_investigations(
    status: Optional[str] = None,
    limit: int = Query(default=50, le=100),
    offset: int = 0,
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user)
):
    query = db.query(Investigation).filter(Investigation.user_id == current_user.id)
    if status:
        query = query.filter(Investigation.status == status)
    
    invs = query.order_by(desc(Investigation.created_at)).offset(offset).limit(limit).all()
    
    results = []
    for inv in invs:
        risk = inv.risk_assessment
        results.append(InvestigationSummaryResponse(
            id=inv.id,
            title=inv.title,
            context_type=inv.context_type,
            status=inv.status,
            stage_progress=inv.stage_progress,
            is_demo=inv.is_demo,
            created_at=inv.created_at,
            completed_at=inv.completed_at,
            risk_level=risk.risk_level if risk else None,
            risk_score=risk.risk_score if risk else None
        ))
    return results

@router.get("/investigations/{inv_id}", response_model=InvestigationDetailResponse)
def get_investigation_detail(
    inv_id: str,
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user)
):
    inv = db.query(Investigation).filter(
        Investigation.id == inv_id,
        Investigation.user_id == current_user.id
    ).first()
    if not inv:
        raise HTTPException(status_code=404, detail="Investigation not found.")
    return inv

@router.delete("/investigations/{inv_id}")
def delete_investigation(
    inv_id: str,
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user)
):
    inv = db.query(Investigation).filter(
        Investigation.id == inv_id,
        Investigation.user_id == current_user.id
    ).first()
    if not inv:
        raise HTTPException(status_code=404, detail="Investigation not found.")
    
    db.delete(inv)
    db.commit()
    return {"status": "deleted", "id": inv_id}

@router.get("/investigations/{inv_id}/graph", response_model=EvidenceGraphResponse)
def get_investigation_graph(
    inv_id: str,
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user)
):
    inv = db.query(Investigation).filter(
        Investigation.id == inv_id,
        Investigation.user_id == current_user.id
    ).first()
    if not inv:
        raise HTTPException(status_code=404, detail="Investigation not found.")

    # Extract contradictions from claims marked CONTRADICTED
    contradictions = [
        {"title": f"Contradiction in {c.category}", "explanation": c.rationale or "Contradicted by evidence"}
        for c in inv.claims if c.status == "CONTRADICTED"
    ]

    nodes, edges, _ = GraphBuilder.build_graph(
        entities=[{"id": e.id, "value": e.value, "entity_type": e.entity_type, "source_context": e.source_context} for e in inv.entities],
        claims=[{"id": c.id, "claim_text": c.claim_text, "category": c.category, "status": c.status, "rationale": c.rationale} for c in inv.claims],
        indicators=[{"id": i.id, "title": i.title, "severity": i.severity, "category": i.category, "description": i.description, "supporting_evidence": i.supporting_evidence} for i in inv.indicators],
        lookups=[{"id": l.id, "provider": l.provider, "status": l.status, "query_target": l.query_target, "is_simulated": l.is_simulated} for l in inv.lookups],
        recommendations=[{"id": r.id, "title": r.title, "priority": r.priority, "description": r.description} for r in inv.recommendations],
        contradictions=contradictions
    )

    return EvidenceGraphResponse(
        nodes=[GraphNode(id=n["id"], type=n["type"], data=n["data"]) for n in nodes],
        edges=[GraphEdge(id=e["id"], source=e["source"], target=e["target"], label=e["label"], animated=e.get("animated", False), data=e.get("data")) for e in edges]
    )

@router.get("/investigations/{inv_id}/export")
def export_investigation(
    inv_id: str,
    format: str = Query("json", pattern="^(json|markdown)$"),
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user)
):
    inv = db.query(Investigation).filter(
        Investigation.id == inv_id,
        Investigation.user_id == current_user.id
    ).first()
    if not inv:
        raise HTTPException(status_code=404, detail="Investigation not found.")

    if format == "json":
        export_data = {
            "id": inv.id,
            "title": inv.title,
            "context_type": inv.context_type,
            "status": inv.status,
            "is_demo": inv.is_demo,
            "created_at": inv.created_at.isoformat() if inv.created_at else None,
            "completed_at": inv.completed_at.isoformat() if inv.completed_at else None,
            "risk_assessment": {
                "level": inv.risk_assessment.risk_level if inv.risk_assessment else None,
                "score": inv.risk_assessment.risk_score if inv.risk_assessment else None,
                "summary": inv.risk_assessment.executive_summary if inv.risk_assessment else None
            },
            "claims": [{"text": c.claim_text, "status": c.status, "rationale": c.rationale, "source": c.extraction_source} for c in inv.claims],
            "indicators": [{"title": i.title, "severity": i.severity, "desc": i.description} for i in inv.indicators],
            "lookups": [{"provider": l.provider, "target": l.query_target, "status": l.status, "is_simulated": l.is_simulated} for l in inv.lookups],
            "recommendations": [{"title": r.title, "action": r.action_type, "desc": r.description} for r in inv.recommendations]
        }
        return Response(content=json.dumps(export_data, indent=2), media_type="application/json")
    else:
        # Markdown Report
        risk = inv.risk_assessment
        md = f"""# TrustTrace Investigation Report: {inv.title}

- **Investigation ID**: `{inv.id}`
- **Created**: {inv.created_at}
- **Status**: {inv.status}
- **Assessed Risk Level**: {risk.risk_level if risk else 'N/A'} ({risk.risk_score if risk else 0}/100)
- **Demo Mode**: {'Yes (Simulated Feeds)' if inv.is_demo else 'No (Live)'}

---

## Executive Summary
{risk.executive_summary if risk else 'No risk assessment available.'}

## Extracted Claims & Verification Status
"""
        for c in inv.claims:
            md += f"- **[{c.status}]** {c.claim_text}\n  *Rationale*: {c.rationale}\n"

        md += "\n## Observed Indicators\n"
        for i in inv.indicators:
            md += f"- **[{i.severity}]** {i.title}: {i.description}\n"

        md += "\n## External Threat Intelligence Lookups\n"
        for l in inv.lookups:
            sim_str = " (Simulated Demo)" if l.is_simulated else ""
            md += f"- **{l.provider}**: Target `{l.query_target}` -> **{l.status}**{sim_str}\n"

        md += "\n## Recommended Actions\n"
        for r in inv.recommendations:
            md += f"1. **{r.title}** ({r.priority} Priority)\n   {r.description}\n"

        md += "\n---\n*Generated by TrustTrace AI Evidence-First Fraud Platform*\n"
        return Response(content=md, media_type="text/markdown")

@router.delete("/investigations/{inv_id}", status_code=204)
def delete_investigation(
    inv_id: str,
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user)
):
    inv = db.query(Investigation).filter(
        Investigation.id == inv_id,
        Investigation.user_id == current_user.id
    ).first()
    if not inv:
        raise HTTPException(status_code=404, detail="Investigation not found.")
    
    db.delete(inv)
    db.commit()
    return None

@router.get("/dashboard/stats", response_model=DashboardStatsResponse)
def get_dashboard_stats(
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user)
):
    invs = db.query(Investigation).filter(Investigation.user_id == current_user.id).all()
    
    total = len(invs)
    completed = sum(1 for i in invs if i.status == InvestigationStatus.COMPLETED.value)
    analyzing = sum(1 for i in invs if i.status in (InvestigationStatus.ANALYZING.value, InvestigationStatus.QUEUED.value))

    # Real calculated risk distribution from DB
    risk_dist = {"LOW": 0, "MODERATE": 0, "HIGH": 0, "CRITICAL": 0, "INSUFFICIENT_EVIDENCE": 0}
    for i in invs:
        if i.risk_assessment:
            level = i.risk_assessment.risk_level
            if level in risk_dist:
                risk_dist[level] += 1

    # Most common observed indicators
    all_indicators = db.query(Indicator).join(Investigation).filter(Investigation.user_id == current_user.id).all()
    indicator_counts = {}
    for ind in all_indicators:
        indicator_counts[ind.title] = indicator_counts.get(ind.title, 0) + 1
    
    common_indicators = [
        {"title": k, "count": v} 
        for k, v in sorted(indicator_counts.items(), key=lambda x: x[1], reverse=True)[:5]
    ]

    recent_invs = []
    for inv in sorted(invs, key=lambda x: x.created_at, reverse=True)[:5]:
        risk = inv.risk_assessment
        recent_invs.append(InvestigationSummaryResponse(
            id=inv.id,
            title=inv.title,
            context_type=inv.context_type,
            status=inv.status,
            stage_progress=inv.stage_progress,
            is_demo=inv.is_demo,
            created_at=inv.created_at,
            completed_at=inv.completed_at,
            risk_level=risk.risk_level if risk else None,
            risk_score=risk.risk_score if risk else None
        ))

    return DashboardStatsResponse(
        total_investigations=total,
        completed_investigations=completed,
        analyzing_investigations=analyzing,
        risk_distribution=risk_dist,
        common_indicators=common_indicators,
        recent_investigations=recent_invs
    )

@router.get("/settings/integrations", response_model=IntegrationStatusResponse)
def get_integrations_status():
    """Returns provider status without exposing any API keys or secrets."""
    if settings.AI_PROVIDER == "mistral":
        ai_active = bool(settings.MISTRAL_API_KEY)
    elif settings.AI_PROVIDER == "gemini":
        ai_active = bool(settings.GEMINI_API_KEY)
    elif settings.AI_PROVIDER == "openai":
        ai_active = bool(settings.OPENAI_API_KEY)
    else:
        ai_active = True
    return IntegrationStatusResponse(
        ai_provider=settings.AI_PROVIDER,
        ai_available=ai_active,
        threat_intel_urlhaus_active=bool(settings.URLHAUS_API_KEY),
        threat_intel_safebrowsing_active=bool(settings.GOOGLE_SAFE_BROWSING_API_KEY),
        demo_mode_enabled=settings.DEMO_MODE,
        environment=settings.ENVIRONMENT
    )
