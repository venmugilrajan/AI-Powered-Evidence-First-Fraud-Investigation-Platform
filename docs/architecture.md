# TrustTrace Architecture Specification

TrustTrace is an AI-powered, evidence-first fraud investigation platform designed to systematically evaluate suspicious communications, extract discrete testable claims, correlate deterministic and external evidence, highlight contradictions, and produce defensible, explainable risk reports.

---

## 1. High-Level Architecture

```mermaid
graph TD
    UI[Frontend: React 18 + TS + Tailwind + React Flow] -->|REST API / SSE| API[Backend: FastAPI Service]
    API --> AUTH[JWT Auth & RBAC Security Layer]
    API --> ORCH[Investigation Orchestrator State Machine]
    
    subgraph Engine Pipeline
        ORCH --> S1[Stage 1: Input Normalization & Entity Extraction]
        ORCH --> S2[Stage 2: Claim Extraction (LLM + Heuristics)]
        ORCH --> S3[Stage 3: Indicator Analysis (Deterministic Rules)]
        ORCH --> S4[Stage 4: Safe External Evidence (URLhaus, Safe Browsing, DNS/SSRF Guard)]
        ORCH --> S5[Stage 5: Identity & Verification Matching]
        ORCH --> S6[Stage 6: Evidence Correlation Graph Builder]
        ORCH --> S7[Stage 7: Transparent Risk Assessment Engine]
        ORCH --> S8[Stage 8: Actionable Recommendations Generator]
        ORCH --> S9[Stage 9: Final Report & Provenance Compiler]
    end

    S2 -.-> AI_ADAPTER[Provider-Agnostic AI Adapter (Gemini / OpenAI / Demo Engine)]
    S4 -.-> TI_ADAPTER[Threat Intel Adapters & SSRF-Protected Proxy]
    
    API --> DB[(SQLAlchemy 2.0 / PostgreSQL or SQLite)]
```

---

## 2. Evidence Model & Provenance

Every node in TrustTrace has strict provenance:
- **`Claim`**: An assertion extracted from the user submission (e.g. "Payment required to release USPS package within 24h").
- **`ExtractedEntity`**: Distinct tokens (URLs, emails, domains, phone numbers, payment IDs, organizations).
- **`Indicator`**: An observed heuristic or threat flag with severity (`LOW`, `MEDIUM`, `HIGH`, `CRITICAL`), detection method, and evidence anchor.
- **`ExternalLookup`**: Records queries made to external providers (URLhaus, Google Safe Browsing, WHOIS/RDAP, DNS) including raw responses, timestamp, status (`MALICIOUS`, `CLEAN`, `UNAVAILABLE`, `NOT_PERFORMED`), and cryptographic hash of findings.
- **`EvidenceRelationship`**: Directed edges between nodes (`supports`, `contradicts`, `mentions`, `claims_identity_of`, `links_to`, `requires_verification`) with confidence and explicit rationale.
- **`Contradiction`**: Flagged when claimed identity and verified digital identity diverge (e.g., Claimed Organization = "USPS", Destination Domain = "usps-redelivery-fee-update.top").

---

## 3. Investigation State Machine

Investigations progress through deterministic states persisted to the database:
1. `DRAFT`: Inputs received, validated, sanitized.
2. `QUEUED`: Enqueued for pipeline processing.
3. `ANALYZING`: Pipeline active; stages emit step events (`input_normalized` -> `claims_extracted` -> `indicators_analyzed` -> `external_lookups_completed` -> `identity_verified` -> `graph_correlated` -> `risk_assessed` -> `recommendations_built`).
4. `COMPLETED`: Graph persisted, final report compiled, immutable report snapshot generated.
5. `FAILED`: Terminal error trapped with safe user-facing diagnostic without leaking server internals.

---

## 4. Threat Model & Security Posture

### 4.1 SSRF & Unsafe Link Exploration
- **Zero Ingestion Execution**: The platform NEVER runs headless browsers against untrusted URLs or downloads executable payloads.
- **SSRF Defensive Guard**: For any outbound reputation or metadata lookup:
  - Strict URI scheme restriction (`http`, `https`).
  - IP resolution checks forbidding IPv4/IPv6 private ranges (`10.0.0.0/8`, `172.16.0.0/12`, `192.168.0.0/16`, `127.0.0.0/8`, `169.254.0.0/16` metadata IP, `::1`).
  - DNS rebinding defenses with connection timeout, maximum response size limits (64KB), and redirect blocking.

### 4.2 Prompt Injection Resistance
- Submitted messages are strictly bounded inside structured JSON and encapsulated with untrusted content demarcation tags.
- System instructions enforce that input text is treated strictly as data subject to analysis, never as instruction overrides.

### 4.3 Data Privacy & Redaction
- Configurable pre-LLM redaction mask for PII (phone numbers, account numbers, government IDs).
- Strict separation between operational audit logs (stripped of personal payloads) and encrypted investigation databases.

---

## 5. API Contracts (REST v1)

- `POST /api/v1/auth/register` & `POST /api/v1/auth/login` (JWT OAuth2 bearer)
- `GET /api/v1/auth/me`
- `POST /api/v1/investigations` (Create & launch investigation)
- `GET /api/v1/investigations` (Paginated list with risk and status filters)
- `GET /api/v1/investigations/{id}` (Detail, status, pipeline events)
- `GET /api/v1/investigations/{id}/graph` (Nodes and edges for React Flow)
- `GET /api/v1/investigations/{id}/report` (Structured final report)
- `GET /api/v1/investigations/{id}/export?format=json|markdown`
- `DELETE /api/v1/investigations/{id}`
- `GET /api/v1/dashboard/stats` (Aggregated statistics from authentic database records)
- `GET /api/v1/settings/integrations` (Status of AI provider, Threat Intel, Demo mode - zero secret leakage)
- `GET /api/v1/health` (Liveness & readiness probe)

---

## 6. Testing Strategy
- **Unit**: Strict validation of regex extractors, SSRF IP-blocker, heuristic indicator rules, risk score aggregation, Pydantic schemas.
- **Integration**: FastAPI `TestClient` / HTTPX end-to-end endpoint tests using SQLite in-memory, mocking external APIs, and testing both demo mode and LLM fallback flows.
- **E2E UI & Pipeline**: Verifying all scenarios (fake parcel delivery, recruitment scam, payment impersonation, legitimate alert, ambiguous message).
