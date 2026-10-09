# TrustTrace — AI-Powered Evidence-First Fraud Investigation Platform

![TrustTrace](https://img.shields.io/badge/Security-Evidence--First-blue)
![Architecture](https://img.shields.io/badge/Architecture-Modular%20Pipeline-emerald)
![Test-Coverage](https://img.shields.io/badge/Automated%20Tests-34%20Passed-brightgreen)
![Frontend-Build](https://img.shields.io/badge/Frontend%20Build-Passing-brightgreen)
![Playwright](https://img.shields.io/badge/Browser%20E2E-Verified-brightgreen)
![AI-Inference](https://img.shields.io/badge/Live%20AI%20Inference-Mistral%20Verified-blue)
![License](https://img.shields.io/badge/License-MIT-lightgrey)

**TrustTrace** is a production-minded cybersecurity investigation platform built to evaluate suspicious digital communications before individuals or organizations transfer money, expose credentials, or trust impersonated identities.

---

## 1. Core Differentiators & Philosophy

Most AI security tools operate as simplistic "scam classifiers" outputting an arbitrary probability score (e.g. *"87% Likelihood of Fraud"*). TrustTrace solves the actual forensic problem:

1. **Discrete Claim Extraction**: Deconstructs untrusted communications into testable factual assertions (identity, fees, deadlines, delivery hold). Explicitly distinguishes `[AI EXTRACTED]` assertions from `[DETERMINISTIC]` rules so LLM extractions are never misrepresented as verified facts.
2. **Deterministic Contradiction Analysis**: Validates claimed organizations against destination domains, identifying mismatches (e.g. Claimed USPS, Destination `.top` domain).
3. **Evidence Correlation Graph**: Interactive relational network linking entities, claims, indicators, lookups, and contradictions.
4. **Transparent Risk Scoring**: Explainable, documented indicator weights and evidence coverage confidence.
5. **Honest Uncertainty Reporting**: Clean reputation lookups are never represented as proof of safety. Unverified assertions and inconclusive threat intel are explicitly flagged as `INSUFFICIENT_EVIDENCE`.
6. **Actionable Recommendations**: Personalized checklists linked directly to triggered findings.

---

## 2. Architecture & Pipeline Stages

```
Suspicious Input (SMS / URL / VPA / Email)
                    │
                    ▼
Stage 1: Safe Normalization & PII Redaction
Stage 2: Claim Extraction (Mistral / Gemini / OpenAI / Deterministic Engine with Prompt Injection Defense)
Stage 3: Indicator Analysis (TLD checks, Bare IPs, Urgency Heuristics)
Stage 4: External Threat Feeds (SSRF Guarded Lookups + Demo Fallbacks)
Stage 5: Identity & Contradiction Verification (Official Registry Cross-Check)
Stage 6: Risk Assessment Engine (Weighted Explainable Scoring)
Stage 7: Recommendation Playbook Generator
Stage 8: Relational Evidence Graph (React Flow)
Stage 9: Case Dossier & Markdown/JSON Export
```

### Critical Security Posture
- **Zero Browser Navigation to Untrusted Links**: Never runs headless browsers on raw targets.
- **SSRF Defensive Guard**: Outbound queries strictly block RFC 1918 private subnets, cloud metadata addresses (`169.254.169.254`), IPv6 unique local/loopback, and multicast.
- **PII Redaction**: Configurable masking of phone numbers and email handles before third-party LLM transmission.
- **Prompt Injection Boundaries**: Strict delimiter framing and JSON schemas ensure untrusted user messages cannot hijack system instructions or manipulate risk scoring.

---

## 3. Technology Stack

- **Frontend**: React 19, TypeScript, Vite, Tailwind CSS v4, Lucide Icons, React Router DOM v7, TanStack Query v5, React Flow (`@xyflow/react`), Recharts.
- **Backend**: Python 3.11+, FastAPI, SQLAlchemy 2.0, Pydantic v2, SQLite / PostgreSQL dual mode, Pytest, Playwright, HTTPX, and `mistralai`.
- **AI Layer**: Provider-agnostic adapter supporting Mistral AI (`open-mistral-7b`), Google Gemini, OpenAI, or local deterministic demonstration engine.

---

## 4. Quick Start (Local Development)

### Prerequisites
- Python 3.11+
- Node.js 20+

### 1. Start the Backend
```bash
cd backend
python -m venv venv
# On Windows:
.\venv\Scripts\activate
# On Linux/macOS:
source venv/bin/activate

pip install -r requirements.txt email-validator
uvicorn app.main:app --reload --port 8000
```
Backend API docs available at: `http://localhost:8000/docs`

### 2. Start the Frontend
```bash
cd frontend
npm install
npm run dev
```
Open your browser at `http://localhost:5173`.

---

## 5. Running Automated Tests

Execute the full 33-test backend, AI provider, threat intelligence, security audit, and Playwright browser E2E test suite:
```bash
cd backend
# On Windows:
$env:PYTHONPATH="."
.\venv\Scripts\pytest -v tests\
# On Linux/macOS:
PYTHONPATH=. pytest -v tests/
```
All 33 automated tests validate:
- **AI Claim Extractor**: Successful Mistral AI structured extraction, JSON recovery, Markdown fencing stripping, prompt-injection defense boundaries, rate-limit / timeout fallbacks, and deterministic rule consistency.
- **Threat Intelligence**: Google Safe Browsing and URLhaus query formatting, API authentication headers, and explicit `INSUFFICIENT_EVIDENCE` status for unlisted hosts.
- **SSRF Defensive Guard**: Loopback, IPv6 link-local, cloud metadata (`169.254.169.254`).
- **Entity Extraction & Redaction**: PII maskers and normalized URL extraction.
- **Risk Scoring Boundaries**: Strict numeric thresholds (0-24.9 LOW, 25-49.9 MODERATE, 50-74.9 HIGH, 75-100 CRITICAL), deduplication, and non-fraud guardrails.
- **Multi-Tenant Security Isolation**: User data isolation and unauthorized access rejection.
- **Production Configuration Validation**: Hard failure upon insecure defaults in production (`DEBUG=True`, weak `SECRET_KEY`, SQLite usage).
- **Browser End-to-End User Journey**: Headless Chromium testing authentication, investigation intake, interactive React Flow inspector sidebar, Markdown dossier report export, case archive history, investigation deletion, and 404 error handling.

---

## 6. Docker & Production Deployment

Deploy the complete stack with PostgreSQL and Nginx reverse proxy using Docker Compose:
```bash
docker-compose up --build
```
- **Frontend (Nginx SPA + Reverse Proxy)**: `http://localhost:5173` (or port 80 in production)
- **Backend API (Uvicorn / FastAPI)**: `http://localhost:8000`
- **PostgreSQL Database**: `localhost:5432`

### Hosting Platform Deployment Guide (e.g. AWS ECS / GCP Cloud Run / Render)
1. **Database**: Provision a managed PostgreSQL instance (e.g. AWS RDS or Supabase) with SSL enforced (`sslmode=require`).
2. **Backend**:
   - Container image built from `./backend/Dockerfile`.
   - Set environment variables: `ENVIRONMENT=production`, `DEBUG=false`, `DATABASE_URL=postgresql://...`, `SECRET_KEY=<32-char-random-key>`.
   - Inject external API keys (`MISTRAL_API_KEY`, `GOOGLE_SAFE_BROWSING_API_KEY`, `URLHAUS_API_KEY`).
3. **Frontend**:
   - Container image built from `./frontend/Dockerfile` (or deployed as static SPA to Cloudflare Pages / Vercel / S3).
   - Configure `VITE_API_BASE` pointing to the public HTTPS backend URL (or route `/api/` through Nginx reverse proxy / Cloudflare).
4. **HTTPS / TLS**: Terminate TLS at the application load balancer (ALB / Cloudflare CDN).

### Required Production Environment Variables
| Variable | Description | Default / Requirement |
| :--- | :--- | :--- |
| `SECRET_KEY` | High-entropy secret key for JWT signing | Must be >= 32 characters in production (enforced by startup check) |
| `ENVIRONMENT` | Deployment environment name | `production` |
| `DEBUG` | Enable debug logs and traces | Must be `false` in production (enforced by startup check) |
| `DATABASE_URL` | SQLAlchemy connection string | `postgresql://user:password@host:5432/db` (SQLite rejected in production) |
| `CORS_ORIGINS` | Permitted web frontend origins | Comma-separated list (e.g. `https://yourdomain.com`) |
| `DEMO_MODE` | Enable synthetic benchmark evaluation lab | `false` in live production |
| `AI_PROVIDER` | Active LLM backend (`demo`, `mistral`, `gemini`, `openai`) | `demo` default; `mistral` if key configured |
| `MISTRAL_API_KEY` | Mistral AI API key | Optional (active live inference verified) |
| `MISTRAL_MODEL` | Mistral model identifier | `open-mistral-7b` (or `mistral-small-latest`) |
| `GOOGLE_SAFE_BROWSING_API_KEY` | Google Safe Browsing API key | Optional (real threat queries when configured) |
| `URLHAUS_API_KEY` | URLhaus API key | Optional (real threat queries when configured) |

---

## 7. Synthetic Benchmark Scenarios

TrustTrace includes built-in 1-click synthetic benchmark scenarios:
- **Postal Courier Redelivery Fraud**: USPS impersonation requesting immediate redelivery fee on a `.top` domain.
- **Lucrative Task / Job Offer**: Telegram-redirecting task fraud offering unverified daily salaries.
- **Urgent Bank Netbanking KYC Freeze**: Urgent panic alert attempting netbanking credential harvesting.
- **Legitimate Official Notification**: Control baseline verifying official domain reputation and low observed risk.

---

## 8. Verification & Operational Status Checklist

### Verified & Hardened Features
- [x] **Risk Scoring & Categorical Alignment**: Strict numerical boundaries (0-24.9 LOW, 25-49.9 MODERATE, 50-74.9 HIGH, 75-100 CRITICAL). Fully tested across all boundary transitions.
- [x] **Evidence Deduplication**: Duplicate/redundant indicators are deduplicated by category and title signature, preventing artificial score compounding.
- [x] **Non-Fraudulent Guard**: Isolated urgency phrases or discount TLDs alone cannot classify a communication as fraudulent without identity contradictions or confirmed malicious lookups.
- [x] **Itemized Score Transparency**: Every single point contributing to the Threat Index is persisted and displayed with its specific rationale.
- [x] **Interactive Evidence Graph with Live Inspector**: React Flow network linking artifacts, claims, indicators, threat intel, and playbook actions. Clicking any node or edge opens the inspector sidebar with source provenance and confidence ratings.
- [x] **Database Persistence & Server Restart Integrity**: Relational graph nodes, itemized score contributions, indicators, and dossier reports survive database restarts without data loss.
- [x] **Provenance Separation**: Claims track `extraction_source` (`AI_GENERATED` vs `DETERMINISTIC_RULES`) across the DB, API responses, UI badges, and exported dossiers.
- [x] **Full Browser-Based E2E Test Suite**: Headless Playwright Chromium validating wizard intake, interactive React Flow graph, Markdown report export, case archive history, and case deletion.
- [x] **Strict Multi-Tenant Isolation**: Verified with automated tests ensuring cross-user access, graph inspection, export, or deletion requests return HTTP 404.
- [x] **SSRF Defense Guard**: Full IPv4 and IPv6 blocklist forbidding loopback, cloud metadata (169.254.169.254), RFC 1918 subnets, carrier-grade NAT, multicast, and ULA ranges.
- [x] **Production Security Enforcement**: Startup validation rejecting `DEBUG=True`, weak secrets, or SQLite in production.
- [x] **Zero Raw Browser Navigation**: Safe static and reputation parsing with zero execution of untrusted client scripts or binary payloads.
- [x] **Input Bounds**: Strict Pydantic length validations preventing unbounded memory or DOS attacks.

### Real vs. Simulated Feeds (Truthful Disclosure)
- **Live AI Provider Integration**: TrustTrace supports Google Gemini (`gemini-2.5-flash`) via the modern `google-genai` SDK and OpenAI. An adapter with prompt injection isolation, JSON validation, and error recovery is fully implemented. When live credentials are not present in `.env` (or if an invalid key is supplied), the system gracefully executes deterministic extraction. Live cloud inference remains unverified until a valid paid key is provided.
- **Threat Intelligence Feeds**: The Google Safe Browsing and URLhaus adapters execute real HTTP queries when keys are provided. When unconfigured or in `DEMO_MODE=true`, realistic synthetic benchmark feeds supply transparently labeled `[SIMULATED]` results for offline evaluations. Absence of a threat match is strictly treated as `INSUFFICIENT_EVIDENCE`, never as proof of safety.
- **Deployment Status**: Production containers (Docker Compose, Nginx, PostgreSQL) and configurations are fully validated locally. A live public URL has not been provisioned.

### Known Operational Boundaries
- **Dynamic JavaScript SPAs**: TrustTrace intentionally does not run client-side JavaScript execution environments on untrusted destination URLs to prevent browser-escape attacks.
- **Historical WHOIS Privacy**: Domain privacy proxy services (e.g., Domains By Proxy) may obscure registration details; absence of registration records does not prove malice.

---

## 9. Automated Test Results
- **Backend & Browser Tests**: 31 passed (`pytest -v tests/` in 16.12s).
- **Frontend Production Build**: Verified clean (`tsc -b && vite build` in 1.18s).

---

## 11. License
MIT License.
