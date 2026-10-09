from typing import List, Dict, Any, Tuple

class GraphBuilder:
    """
    Constructs an evidence correlation graph connecting entities, claims, indicators,
    lookups, and recommendations with explicit relationship types, confidence, and provenance rationales.
    
    Provides categorized statuses:
    - Confirmed Evidence (e.g. verified claims, authoritative lookups)
    - Suspicious Signals (e.g. anomalous indicators, contradictions)
    - Unknowns / Unverified (e.g. unverified claims, insufficient evidence lookups)
    """

    @staticmethod
    def build_graph(
        entities: List[Dict[str, Any]],
        claims: List[Dict[str, Any]],
        indicators: List[Dict[str, Any]],
        lookups: List[Dict[str, Any]],
        recommendations: List[Dict[str, Any]],
        contradictions: List[Dict[str, Any]]
    ) -> Tuple[List[Dict[str, Any]], List[Dict[str, Any]], List[Dict[str, Any]]]:
        """
        Returns:
            nodes: List[GraphNode]
            edges: List[GraphEdge]
            relationships: List[EvidenceRelationship] for DB persistence
        """
        nodes: List[Dict[str, Any]] = []
        edges: List[Dict[str, Any]] = []
        db_relationships: List[Dict[str, Any]] = []

        edge_counter = 0

        def add_edge(source_id: str, source_type: str, target_id: str, target_type: str, rel_type: str, explanation: str, confidence: float = 1.0):
            nonlocal edge_counter
            edge_counter += 1
            e_id = f"e_{edge_counter}_{source_id}_{target_id}"
            edges.append({
                "id": e_id,
                "source": source_id,
                "target": target_id,
                "label": rel_type.replace("_", " ").title(),
                "animated": rel_type in ("contradicts", "requires_verification"),
                "data": {
                    "relation_type": rel_type,
                    "explanation": explanation,
                    "confidence": confidence,
                    "source_type": source_type,
                    "target_type": target_type
                }
            })
            db_relationships.append({
                "source_id": source_id,
                "source_type": source_type,
                "target_id": target_id,
                "target_type": target_type,
                "relation_type": rel_type,
                "confidence": confidence,
                "explanation": explanation
            })

        # 1. Add Entity Nodes (Artifacts / Tokens)
        for i, ent in enumerate(entities):
            node_id = ent.get("id") or f"entity_{i}"
            nodes.append({
                "id": node_id,
                "type": "entity",
                "data": {
                    "node_category": "ARTIFACT",
                    "title": ent["value"],
                    "subtitle": f"Entity: {ent['entity_type']}",
                    "context": ent.get("source_context", "Parsed from input"),
                    "details": ent
                }
            })

        # 2. Add Claim Nodes (Deconstructed Assertions)
        for i, clm in enumerate(claims):
            node_id = clm.get("id") or f"claim_{i}"
            status = clm.get("status", "UNVERIFIED")
            nodes.append({
                "id": node_id,
                "type": "claim",
                "data": {
                    "node_category": "CLAIM",
                    "title": clm["claim_text"],
                    "status": status,
                    "category": clm.get("category", "General"),
                    "rationale": clm.get("rationale", ""),
                    "confidence": clm.get("confidence", 0.5),
                    "evidence_nature": "CONFIRMED" if status == "VERIFIED" else ("SUSPICIOUS" if status == "CONTRADICTED" else "UNKNOWN"),
                    "details": clm
                }
            })

            # Connect claims to corresponding entities
            for j, ent in enumerate(entities):
                ent_id = ent.get("id") or f"entity_{j}"
                if ent["value"].lower() in clm["claim_text"].lower():
                    add_edge(node_id, "claim", ent_id, "entity", "mentions", f"Claim text explicitly references {ent['value']}", 0.9)

        # 3. Add Indicator Nodes (Heuristics & Observed Signals)
        for i, ind in enumerate(indicators):
            node_id = ind.get("id") or f"ind_{i}"
            sev = ind.get("severity", "LOW")
            nodes.append({
                "id": node_id,
                "type": "indicator",
                "data": {
                    "node_category": "INDICATOR",
                    "title": ind["title"],
                    "severity": sev,
                    "category": ind.get("category", "Anomalous Pattern"),
                    "description": ind["description"],
                    "detection_method": ind.get("detection_method", "Deterministic Rule"),
                    "limitations": ind.get("limitations", ""),
                    "evidence_nature": "SUSPICIOUS" if sev in ("HIGH", "CRITICAL") else "SIGNAL",
                    "details": ind
                }
            })

            # Connect indicators to associated domains/entities
            for j, ent in enumerate(entities):
                ent_id = ent.get("id") or f"entity_{j}"
                evidence_str = str(ind.get("supporting_evidence", "")).lower()
                if ent["value"].lower() in evidence_str:
                    add_edge(node_id, "indicator", ent_id, "entity", "associated_with", f"Indicator computed from inspection of {ent['value']}", 1.0)

        # 4. Add External Lookup Nodes (Threat Intel Feed Records)
        for i, lkp in enumerate(lookups):
            node_id = lkp.get("id") or f"lkp_{i}"
            status = lkp.get("status", "UNAVAILABLE")
            is_sim = lkp.get("is_simulated", False)
            nodes.append({
                "id": node_id,
                "type": "lookup",
                "data": {
                    "node_category": "THREAT_INTEL",
                    "title": f"{lkp['provider']}: {status}",
                    "status": status,
                    "target": lkp["query_target"],
                    "is_simulated": is_sim,
                    "source_reference": lkp.get("source_reference", ""),
                    "evidence_nature": "SUSPICIOUS" if status == "MALICIOUS" else ("CONFIRMED" if status == "CLEAN" else "UNKNOWN"),
                    "details": lkp
                }
            })

            # Connect lookup to queried target entity
            for j, ent in enumerate(entities):
                ent_id = ent.get("id") or f"entity_{j}"
                if ent["value"].lower() == lkp["query_target"].lower():
                    rel = "contradicts" if status == "MALICIOUS" else ("supports" if status == "CLEAN" else "requires_verification")
                    expl = (
                        f"External reputation confirms malicious activity on {ent['value']}"
                        if status == "MALICIOUS"
                        else (f"Official reputation corroborates clean status of {ent['value']}" if status == "CLEAN" else f"Uncorroborated lookup on {ent['value']}")
                    )
                    add_edge(node_id, "lookup", ent_id, "entity", rel, expl, 0.95 if not is_sim else 0.85)

        # 5. Add Contradiction Edges between Indicators and Disproven Claims
        for contra in contradictions:
            for i, clm in enumerate(claims):
                clm_id = clm.get("id") or f"claim_{i}"
                if clm.get("status") == "CONTRADICTED":
                    for j, ind in enumerate(indicators):
                        ind_id = ind.get("id") or f"ind_{j}"
                        add_edge(ind_id, "indicator", clm_id, "claim", "contradicts", contra.get("explanation", "Disproves claim"), 1.0)
                    break

        # 6. Add Recommendations & link to Triggering Indicators
        for i, rec in enumerate(recommendations):
            node_id = rec.get("id") or f"rec_{i}"
            trigger_text = rec.get("triggered_by_finding", "")
            nodes.append({
                "id": node_id,
                "type": "recommendation",
                "data": {
                    "node_category": "RECOMMENDATION",
                    "title": rec["title"],
                    "priority": rec.get("priority", "MEDIUM"),
                    "description": rec["description"],
                    "action_type": rec.get("action_type", "GENERAL"),
                    "triggered_by": trigger_text,
                    "evidence_nature": "ACTIONABLE",
                    "details": rec
                }
            })

            # Connect recommendation back to the matching indicator or claim node that triggered it
            for j, ind in enumerate(indicators):
                ind_id = ind.get("id") or f"ind_{j}"
                if ind["title"].lower() in trigger_text.lower():
                    add_edge(node_id, "recommendation", ind_id, "indicator", "requires_verification", f"Playbook action mandated by {ind['title']}", 1.0)

        return nodes, edges, db_relationships
