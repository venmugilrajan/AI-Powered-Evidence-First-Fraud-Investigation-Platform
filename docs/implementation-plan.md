# TrustTrace Implementation Plan & Checklist

## Phase 1: Planning & Specification (Done)
- [x] Analyze master build prompt and requirements
- [x] Inspect existing workspace and runtime environments (Python 3.13, Node v22.19)
- [x] Document Architecture Specification (`docs/architecture.md`)
- [x] Document Implementation Plan (`docs/implementation-plan.md`)

---

## Phase 2: Foundational Scaffold & Database Architecture
- [ ] Backend setup:
  - `backend/pyproject.toml` or `backend/requirements.txt`
  - FastAPI application structure (`app/main.py`, `app/core/config.py`, `app/core/security.py`)
  - SQLAlchemy 2.0 ORM models (`app/models/`):
    - `User`, `Investigation`, `InvestigationInput`, `ExtractedEntity`, `Claim`, `EvidenceItem`, `Indicator`, `EvidenceRelationship`, `RiskAssessment`, `Recommendation`, `ExternalLookup`, `InvestigationEvent`
  - Alembic migrations setup & SQLite / Postgres dual support
  - Pydantic v2 schemas (`app/schemas/`)
  - Health checks & JWT auth handlers
- [ ] Frontend setup:
  - Vite + React + TypeScript + Tailwind CSS setup in `frontend/`
  - Lucide icons, TanStack Query, React Router DOM, React Flow (`@xyflow/react`), Recharts
  - Design tokens, typography, dark/light theme cyber-investigation theme
- [ ] Root configs:
  - `.env.example`, `.gitignore`, `docker-compose.yml`, backend Dockerfile, frontend Dockerfile

---

## Phase 3: Investigation Engine Pipeline
- [ ] **Stage 1 (Input Normalization)**:
  - Phone, email, URL, crypto/payment handle, organization entity parsing
  - Safe text normalization
  - Optional PII redaction layer
- [ ] **Stage 2 (Claim Extraction)**:
  - Provider-agnostic AI interface (Gemini, OpenAI, Synthetic/Demo fallback)
  - Extraction into structured Pydantic claims with source character ranges
- [ ] **Stage 3 (Indicator Analysis)**:
  - Deterministic checks (homoglyphs/typosquatting, suspicious TLDs, IP-as-host, urgency triggers, unverified payment handles)
- [ ] **Stage 4 (External Evidence Collection)**:
  - Strict SSRF protection guard (IP validation, private network blocking, DNS checks)
  - Provider adapters: URLhaus, Google Safe Browsing adapter, Demo Mock adapter
  - Distinction between Malicious, Clean, Unavailable, Not Performed
- [ ] **Stage 5 (Identity & Contradiction Verification)**:
  - Domain vs. Claimed Organization matching
  - Contradiction detector (e.g. Courier domain mismatch, unverified payment recipient)
- [ ] **Stage 6 (Evidence Correlation Graph)**:
  - Graph node & edge generation linking entities, claims, indicators, evidence, recommendations
- [ ] **Stage 7 (Risk Assessment Engine)**:
  - Explainable transparent scoring based on verified contradictions, indicator weights, evidence coverage
- [ ] **Stage 8 & 9 (Recommendations & Final Report)**:
  - Actionable checklist generation
  - Markdown and JSON report generator with limitation caveats

---

## Phase 4: Frontend Investigation Workspace & UI
- [ ] Landing page (`/`) with problem overview, workflow steps, sample preview
- [ ] Dashboard (`/dashboard`) with real DB analytics (active investigations, risk distribution, recent activity)
- [ ] New Investigation Wizard (`/investigate/new`) with scenario presets, multi-input options, privacy notice
- [ ] Investigation Workspace (`/investigations/:id`):
  - Real-time pipeline step progression
  - Interactive Evidence Graph with React Flow
  - Findings inspector (Claims, Indicators, Contradictions, External Lookups)
  - Report viewer with export (JSON & formatted printable view)
- [ ] Investigation History (`/history`) with search, filter, pagination, delete
- [ ] Settings & Integrations (`/settings`) with provider statuses and toggleable demo mode

---

## Phase 5: Automated Testing & Validation
- [ ] Unit tests for SSRF guard, entity extraction, deterministic indicators, risk aggregator
- [ ] Integration tests for API endpoints, auth flow, investigation pipeline execution
- [ ] Synthetic demo test scenarios (Parcel fraud, recruitment scam, UPI/payment scam, legitimate alert, ambiguous message)
- [ ] Execute all backend tests with Pytest

---

## Phase 6: Documentation & Deliverables Verification
- [ ] Comprehensive `README.md` with installation, architecture, environment vars, verification steps
- [ ] Verify clean, lint-free, secret-free workspace
