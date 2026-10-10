# TrustTrace — AI-Powered Evidence-First Fraud Investigation Platform

[![Live Application](https://img.shields.io/badge/Live%20Demo-Render-brightgreen?style=for-the-badge&logo=render)](https://ai-powered-evidence-first-fraud.onrender.com/)
[![Backend API](https://img.shields.io/badge/API%20Endpoint-Active-blue?style=for-the-badge)](https://trusttrace-api-30mc.onrender.com/health)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg?style=for-the-badge)](LICENSE)

> **Live Deployment:** [https://ai-powered-evidence-first-fraud.onrender.com/](https://ai-powered-evidence-first-fraud.onrender.com/)  
> **Backend API Docs:** [https://trusttrace-api-30mc.onrender.com/docs](https://trusttrace-api-30mc.onrender.com/docs)

**TrustTrace** is a modern cybersecurity and digital forensics platform designed to investigate suspicious communications—such as phishing SMS (smishing), fraudulent emails, deceptive wire transfer lures, impersonated brands, and malicious URLs—before users or organizations take irreversible actions.

Instead of outputting arbitrary "black-box" risk percentages, TrustTrace enforces an **evidence-first, verifiable investigation methodology**: deconstructing untrusted communications into testable factual assertions, proving authority contradictions deterministically against authoritative registries, and visualizing findings via an interactive evidence graph.

---

## 🌐 Live Services

| Service | Component | Production URL | Status |
| :--- | :--- | :--- | :--- |
| **Frontend Application** | React 19 + Vite Static Site | [https://ai-powered-evidence-first-fraud.onrender.com/](https://ai-powered-evidence-first-fraud.onrender.com/) | **Active (200 OK)** |
| **Backend REST API** | FastAPI + Uvicorn Web Service | [https://trusttrace-api-30mc.onrender.com](https://trusttrace-api-30mc.onrender.com) | **Active (200 OK)** |
| **Interactive API Docs** | Swagger / OpenAPI | [https://trusttrace-api-30mc.onrender.com/docs](https://trusttrace-api-30mc.onrender.com/docs) | **Active (200 OK)** |

---

## 📸 Key Features & Capabilities

- **Evidence-First Forensics (Zero Hallucination Proof):** Distinguishes between generative claim extraction and deterministic authority verification. Mismatches between claimed entities (e.g., USPS, FedEx, HDFC Bank) and target domains are proved deterministically, not guessed by an LLM.
- **Interactive Relational Evidence Graph:** Powered by `@xyflow/react` (React Flow), rendering an interconnected graph linking root submissions, extracted claims, IOC indicators, external lookups, and contradiction nodes with click-to-inspect node/edge metadata.
- **Pre-Execution PII Redaction Guard:** Automatically sanitizes phone numbers and email handles before any analysis or third-party processing occurs.
- **Transparent Threat Severity Index (0–100):** Itemized, deduplicated point scoring across standardized severity tiers (`LOW`, `MODERATE`, `HIGH`, `CRITICAL`) with plain-English rationales for every scored factor.
- **Actionable Containment Playbooks:** Auto-generated incident response checklists (domain takedown steps, registrar abuse reporting, and official verification steps) linked to triggered indicators.
- **Dossier Case Export:** One-click export of complete investigation records to formatted Markdown (`.md`) or machine-readable JSON (`.json`) for ticketing and compliance.
- **Defensive SSRF Protection:** Network requests strictly validate against SSRF attacks, blocking loopback addresses, RFC 1918 private subnets, cloud metadata endpoints (`169.254.169.254`), and multicast ranges.
- **Zero Untrusted Code Execution:** Safe headless inspection of links and lure payloads without ever executing client-side scripts.
- **Universal Device Responsiveness:** Fully responsive interface designed for desktops, tablets, and mobile devices with collapsible navigation drawers and scrollable workspace tabs.

---

## 🏛 Platform Architecture & Pipeline Stages

```
Suspicious Input (SMS / URL / Email / Payment Demands)
                    │
                    ▼
Stage 1: Safe Normalization & PII Redaction Guard
Stage 2: Claim Extraction (Mistral AI / Local Deterministic Engine)
Stage 3: Indicator & IOC Analysis (TLD checks, Bare IPs, Urgency Heuristics)
Stage 4: Threat Intelligence & SSRF Guarded External Lookups
Stage 5: Identity & Contradiction Verification (Official Registry Cross-Check)
Stage 6: Risk Assessment Engine (Itemized Weighted Scoring 0–100)
Stage 7: Recommendation Playbook Generator
Stage 8: Relational Evidence Graph Generation (@xyflow/react)
Stage 9: Case Dossier & Markdown/JSON Report Export
```

---

## 💻 Tech Stack

### Frontend
- **Framework:** React 19, TypeScript, Vite
- **Styling:** Tailwind CSS v4, Custom Design System
- **Graph Visualization:** React Flow (`@xyflow/react`)
- **State & Data Fetching:** TanStack Query v5 (React Query)
- **Routing:** React Router DOM v7
- **Icons & Typography:** Lucide Icons, Instrument Serif, Inter, Newsreader, JetBrains Mono
- **Brandmark:** Custom SVG Vector Asset (`TrustTraceLogo`)

### Backend
- **Framework:** Python 3.11+, FastAPI
- **Database & ORM:** SQLAlchemy 2.0 (Dual-engine SQLite / PostgreSQL support)
- **Validation:** Pydantic v2, `email-validator`
- **Network Client:** HTTPX with SSRF validation guards
- **AI Integration:** Provider-agnostic adapter supporting Mistral AI (`open-mistral-7b`), Google Gemini, OpenAI, or local deterministic heuristic engine

---

## 🚀 Quick Start (Local Development)

### Prerequisites
- **Python:** 3.11+
- **Node.js:** 20+ (with npm)

### 1. Start the Backend API
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
- API Base URL: `http://localhost:8000`
- Interactive Swagger UI: `http://localhost:8000/docs`
- ReDoc Documentation: `http://localhost:8000/redoc`

### 2. Start the Frontend Application
```bash
cd frontend
npm install
npm run dev
```
- Web Application: `http://localhost:5173`

---

## 🧪 Running Automated Tests

Run the backend test suite:
```bash
cd backend
# On Windows PowerShell:
$env:PYTHONPATH="."
.\venv\Scripts\pytest -v tests/

# On Linux/macOS:
PYTHONPATH=. pytest -v tests/
```

Verify frontend build:
```bash
cd frontend
npm run build
```

---

## 🛡️ Synthetic Benchmark Scenarios

TrustTrace includes built-in one-click forensic scenarios for testing and demonstration:
1. **Postal Courier Redelivery Fraud:** USPS impersonation requesting immediate redelivery fees on an unverified `.top` domain.
2. **Lucrative Task / Job Offer:** Telegram-redirecting task fraud offering unrealistic daily returns.
3. **Urgent Bank Netbanking KYC Freeze:** High-pressure security alert seeking credential harvesting.
4. **Legitimate Official Notification:** Control baseline verifying official domain reputation and low observed risk.

---

## 🐳 Docker Deployment

To spin up the entire application using Docker:
```bash
docker-compose up --build
```
- **Frontend:** `http://localhost:5173` (or port 80)
- **Backend API:** `http://localhost:8000`
- **PostgreSQL:** `localhost:5432`

---

## 📄 License

This project is licensed under the [MIT License](LICENSE).
