# TrustTrace — AI-Powered Evidence-First Fraud Investigation Platform

![TrustTrace](https://img.shields.io/badge/Security-Evidence--First-blue)
![Architecture](https://img.shields.io/badge/Architecture-Modular%20Pipeline-emerald)
![Frontend-Build](https://img.shields.io/badge/Frontend%20Build-Passing-brightgreen)
![FastAPI](https://img.shields.io/badge/Backend-FastAPI%20REST-009688)
![React-Vite](https://img.shields.io/badge/Frontend-React%2019%20%2B%20Vite-61DAFB)
![License](https://img.shields.io/badge/License-MIT-lightgrey)

**TrustTrace** is a modern cybersecurity and digital forensics platform designed to investigate suspicious communications—such as phishing SMS (smishing), fraudulent emails, deceptive wire transfer lures, impersonated brands, and malicious URLs—before users or organizations take irreversible actions.

Instead of generating arbitrary "black-box" risk percentages, TrustTrace enforces an **evidence-first, verifiable investigation methodology**: deconstructing untrusted communications into testable factual assertions, corroborating claims against threat intelligence and official registries, and visualizing findings via an interactive evidence graph.

---

## 📸 Key Features & Capabilities

- **Modern Professional Forensic UI**: Built with a custom vector brandmark, high-clarity typography, and a streamlined forensic workspace tailored for fraud analysts and security teams.
- **Discrete Claim Deconstruction**: Breaks down unstructured messages into testable claims (claimed authority, monetary demands, urgency deadlines, delivery holds).
- **AI-Assisted & Deterministic Dual Engine**: Transparently distinguishes `[AI EXTRACTED]` assertions from deterministic rule-based checks with prompt-injection defense boundaries.
- **Deterministic Contradiction Analysis**: Flags mismatches between claimed organizations (e.g., USPS, FedEx, Chase) and destination domains (e.g., deceptive `.top` or lookalike TLDs).
- **Interactive Evidence Graph**: Powered by React Flow (`@xyflow/react`), rendering an interconnected graph linking claims, extracted indicators, reputation checks, and contradiction nodes with an interactive inspector.
- **Transparent Threat Index & Explainable Risk Scoring**: Itemized risk contributions across standardized severity tiers (Low, Moderate, High, Critical) with explicit rationales for every scored indicator.
- **Actionable Containment Playbooks**: Auto-generated remediation checklists linked directly to triggered investigation findings.
- **Case Dossier Export**: One-click export to Markdown (`.md`) or structured JSON (`.json`) for incident response ticketing and legal archiving.
- **SSRF & Defensive Security Guard**: Outbound lookups strictly block loopback, RFC 1918 private subnets, cloud metadata (`169.254.169.254`), and multicast addresses.

---

## 🏛 Platform Architecture & Pipeline Stages

```
Suspicious Input (SMS / URL / Email / Payment Demands)
                    │
                    ▼
Stage 1: Safe Normalization & PII Redaction
Stage 2: Claim Extraction (Mistral / Gemini / OpenAI / Deterministic Engine)
Stage 3: Indicator Analysis (TLD checks, Bare IPs, Urgency Heuristics)
Stage 4: External Threat Feeds (SSRF Guarded Lookups + Inconclusive Reporting)
Stage 5: Identity & Contradiction Verification (Official Registry Cross-Check)
Stage 6: Risk Assessment Engine (Weighted Itemized Scoring)
Stage 7: Recommendation Playbook Generator
Stage 8: Relational Evidence Graph (React Flow)
Stage 9: Case Dossier & Markdown/JSON Export
```

---

## 💻 Tech Stack

### Frontend
- **Framework**: React 19, TypeScript, Vite
- **Styling**: Tailwind CSS v4, Custom CSS Design System
- **Graph Visualization**: React Flow (`@xyflow/react`)
- **State & Data Fetching**: TanStack Query v5 (React Query)
- **Routing**: React Router DOM v7
- **Icons**: Lucide Icons
- **Brandmark**: Custom SVG Vector Asset (`TrustTraceLogo`)

### Backend
- **Framework**: Python 3.11+, FastAPI
- **Database & ORM**: SQLAlchemy 2.0 (SQLite / PostgreSQL dual-mode)
- **Validation**: Pydantic v2, `email-validator`
- **Network Client**: HTTPX with SSRF validation guards
- **AI Integration**: Provider-agnostic adapter supporting Mistral AI (`open-mistral-7b`), Google Gemini, OpenAI, or local deterministic extraction

---

## 🚀 Quick Start (Local Development)

### Prerequisites
- **Python**: 3.11+
- **Node.js**: 20+ (with npm)

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
1. **Postal Courier Redelivery Fraud**: USPS impersonation requesting immediate redelivery fees on an unverified `.top` domain.
2. **Lucrative Task / Job Offer**: Telegram-redirecting task fraud offering unrealistic daily returns.
3. **Urgent Bank Netbanking KYC Freeze**: High-pressure security alert seeking credential harvesting.
4. **Legitimate Official Notification**: Control baseline verifying official domain reputation and low observed risk.

---

## 🐳 Docker Deployment

To spin up the entire application using Docker:
```bash
docker-compose up --build
```
- **Frontend**: `http://localhost:5173` (or port 80)
- **Backend API**: `http://localhost:8000`
- **PostgreSQL**: `localhost:5432`

---

## 📄 License

This project is licensed under the [MIT License](LICENSE).
