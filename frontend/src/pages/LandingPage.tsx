import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { 
  ShieldAlert, 
  FileCheck2, 
  Network, 
  Scale, 
  Lock, 
  ArrowRight, 
  CheckCircle2, 
  AlertTriangle,
  HelpCircle,
  Sparkles,
  Search,
  Activity,
  ChevronLeft,
  ChevronRight,
  ShieldCheck,
  Cpu,
  Layers,
  ArrowUpRight,
  Sliders,
  CheckCircle,
  Binary,
  Radio,
  FileText
} from 'lucide-react';

export const LandingPage: React.FC = () => {
  const [activePlatformTab, setActivePlatformTab] = useState(0);
  const [activeVisionPoint, setActiveVisionPoint] = useState(0);
  const [activeTestimonial, setActiveTestimonial] = useState(0);

  // 1. Trajectory 4-Pillar Platform ("Instrument", "Understand", "Steer", "Learn")
  const platformTabs = [
    {
      num: '1 of 4',
      title: 'Instrument',
      tag: 'Continuous Ingestion',
      desc: 'Plug TrustTrace into any intake or notification flow with a lightweight API. Start capturing the forensic signals users already generate: suspicious SMS lures, phishing emails, urgent payment demands, and lookalike domains.',
      details: [
        'Deterministic header decomposition',
        'RFC 1918 safe sandboxing & isolation',
        'Full payload sanitization with zero untrusted code execution'
      ],
      metric: '99.4% Parsing Purity',
      bgStyle: 'bg-gradient-to-b from-[#FAF0EB] to-[#FFFDFB]',
      borderStyle: 'border-[#E8D0C0]'
    },
    {
      num: '2 of 4',
      title: 'Understand',
      tag: 'Claim Extraction',
      desc: 'See what your forensics intelligence is isolating. TrustTrace surfaces patterns in deceptive communications, decomposing raw messages into testable claims: package fee demands, urgent account freezes, and impersonated institutions.',
      details: [
        'Atomic assertion extraction via Mistral AI',
        'Entities, monetary sums, urgency flags isolated',
        'Transparent reasoning lineage & confidence scores'
      ],
      metric: 'Sub-second Triage',
      bgStyle: 'bg-gradient-to-b from-[#E6F3EE] to-[#FAFDFB]',
      borderStyle: 'border-[#BEDCCF]'
    },
    {
      num: '3 of 4',
      title: 'Steer',
      tag: 'Contradiction Proof',
      desc: 'Direct what your intelligence layer verifies. Cross-examine claimed sender authority against destination ASN, WHOIS registrar history, and DNS records with mathematical rigor, proving authority mismatch deterministically.',
      details: [
        'Authority divergence detection (e.g. USPS on .top TLD)',
        'Lookalike typosquatting identification',
        'Bare IP & ephemeral domain flagging'
      ],
      metric: '100% Deterministic Mismatch',
      bgStyle: 'bg-gradient-to-b from-[#EEEBF8] to-[#FBFAFF]',
      borderStyle: 'border-[#CFCAEA]'
    },
    {
      num: '4 of 4',
      title: 'Learn',
      tag: 'Evidence Graph & Playbook',
      desc: 'TrustTrace correlates multi-case telemetry continuously and exports defensible containment playbooks. Evidence graphs, registrar abuse notifications, and official bank confirmation steps get stronger automatically.',
      details: [
        'Interactive multi-node evidence graph',
        'Standardized abuse contact payloads',
        'Persistent database audit trail'
      ],
      metric: 'Defensible Court-Ready Proof',
      bgStyle: 'bg-gradient-to-b from-[#EBF3F8] to-[#FBFCFE]',
      borderStyle: 'border-[#C5D9EA]'
    }
  ];

  // 2. Trajectory Vision 3 Points
  const visionPoints = [
    {
      step: '1',
      title: 'Signal from real usage',
      desc: 'Every forwarded SMS, reported email, and flagged checkout link is an empirical signal. Real deceptive communications reflect threat actor tactics more accurately than static synthetic benchmarks.'
    },
    {
      step: '2',
      title: 'Steer the forensics loop',
      desc: 'Direct what your intelligence platform correlates. Test claims against live threat intelligence and official registry records without ever running untrusted client scripts.'
    },
    {
      step: '3',
      title: 'Intelligence that compounds',
      desc: 'Evidence graphs grow richer with every investigated incident. Proven contradiction indicators and registrar histories compound into institutional immunity across your organization.'
    }
  ];

  // 3. Trajectory Field Notes / Testimonials
  const testimonials = [
    {
      org: 'Financial Risk Operations',
      category: 'Continual forensics for Banking',
      quote: '“Traditional spam filters gave us an arbitrary 80% scam score. TrustTrace gave our fraud forensics tier deterministic proof of authority divergence and connected the campaign across 14 malicious registrar hops.”',
      author: 'EVP of Information Security',
      role: 'Commercial Banking Group',
      tag: '100% Deterministic Evidence'
    },
    {
      org: 'Enterprise SOC & Incident Response',
      category: 'Continual forensics for Corporate Security',
      quote: '“Every edit, retry, and phishing lure reported by employees is treated as a verifiable signal. TrustTrace deconstructs executive wire lures into falsifiable claims before any financial transfer occurs.”',
      author: 'Lead Threat Researcher',
      role: 'Global Cloud Infrastructure',
      tag: 'Zero Untrusted Code Exec'
    },
    {
      org: 'Cyber Forensics Advisory Lab',
      category: 'Continual forensics for Legal & Compliance',
      quote: '“The evidence graph fusion and transparent scoring make findings completely defensible. We can hand the generated response dossier directly to legal counsel, federal authorities, and domain registrars.”',
      author: 'Senior Digital Forensics Analyst',
      role: 'National Incident Advisory',
      tag: 'Defensible Provenance'
    }
  ];

  return (
    <div className="space-y-24 pb-24 -mt-2">
      
      {/* ------------------------------------------------------------- */}
      {/* 1. HERO SECTION: Trajectory 4-Quadrant Fine-Line Stage        */}
      {/* ------------------------------------------------------------- */}
      <section className="relative w-full rounded-2xl md:rounded-3xl overflow-hidden min-h-[520px] sm:min-h-[640px] lg:min-h-[700px] flex flex-col justify-between p-5 sm:p-10 lg:p-14 border border-[rgba(51,72,97,0.22)] bg-[#F7F9E8]">
        
        {/* Trajectory 4-Quadrant Fine Hairline Crosshairs */}
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-0 bottom-0 left-1/2 w-[0.5px] bg-[rgba(51,72,97,0.22)] -translate-x-1/2 hidden md:block" />
          <div className="absolute left-0 right-0 top-1/2 h-[0.5px] bg-[rgba(51,72,97,0.22)] -translate-y-1/2 hidden md:block" />
        </div>

        {/* Dynamic Trajectory Flying Paper Plane & Curved Flight Path (Matching Trajectory.ai) */}
        <div className="absolute inset-0 pointer-events-none overflow-hidden select-none">
          {/* Subtle curved arc trajectory line */}
          <svg className="absolute w-full h-full opacity-25" viewBox="0 0 1200 600" fill="none">
            <path
              d="M 100 500 Q 600 150 1100 280"
              stroke="#334861"
              strokeWidth="1.5"
              strokeDasharray="6 6"
              fill="none"
            />
          </svg>

          {/* Smooth floating gliding paper plane */}
          <div className="absolute top-[22%] sm:top-[28%] right-4 sm:left-[78%] animate-plane-float opacity-75 sm:opacity-85 pointer-events-none">
            <svg width="48" height="48" viewBox="0 0 72 72" fill="none" className="drop-shadow-sm sm:w-[68px] sm:h-[68px]">
              <path d="M12 36 L60 16 L40 60 L32 40 Z" fill="#F7F9E8" stroke="#334861" strokeWidth="1.5" strokeLinejoin="round" />
              <path d="M60 16 L32 40" stroke="#334861" strokeWidth="1.5" />
              <path d="M32 40 L38 52 L44 40" fill="#E6EDE2" stroke="#334861" strokeWidth="1.2" />
            </svg>
            <div className="hidden sm:block mt-1 -ml-4 px-2 py-0.5 rounded-full bg-white/80 border border-[rgba(51,72,97,0.2)] text-[10px] font-mono text-[#334861] shadow-xs">
              trajectory: active vector
            </div>
          </div>

          {/* Radar Sweep Ring in Top-Left */}
          <div className="absolute top-[18%] left-[8%] hidden lg:block opacity-40">
            <div className="relative w-28 h-28 rounded-full border border-[rgba(51,72,97,0.3)] flex items-center justify-center">
              <div className="w-16 h-16 rounded-full border border-[rgba(51,72,97,0.2)]" />
              <div className="absolute w-full h-full rounded-full border-t-2 border-[#334861] animate-radar-sweep" />
              <span className="text-[9px] font-mono text-[#334861]/70">INGESTION</span>
            </div>
          </div>
        </div>

        {/* Trajectory Quadrant Corner Labels */}
        <div className="absolute top-6 left-6 text-[12px] font-mono tracking-wider text-[#334861]/70 hidden md:block">
          Evidence Core • Continual Platform
        </div>
        <div className="absolute top-6 right-6 text-[12px] font-mono tracking-wider text-[#334861]/70 hidden md:block">
          SOC 2 • RFC 1918 Guard
        </div>
        <div className="absolute bottom-6 left-6 text-[12px] font-mono tracking-wider text-[#334861]/70 hidden md:block">
          Zero Untrusted Code Execution
        </div>
        <div className="absolute bottom-6 right-6 text-[12px] font-mono tracking-wider text-[#334861]/70 hidden md:block">
          Deterministic Forensics
        </div>

        {/* Top Eyebrow Badge (Trajectory Pill) */}
        <div className="relative z-10 flex justify-center pt-1 sm:pt-2">
          <div className="inline-flex items-center space-x-2 px-3 sm:px-4 py-1 sm:py-1.5 rounded-full border border-[rgba(51,72,97,0.25)] bg-white/80 text-[#334861] text-[11px] sm:text-xs font-mono shadow-xs backdrop-blur-sm">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-600 animate-pulse" />
            <span className="truncate">The Platform for Autonomous Forensics</span>
          </div>
        </div>

        {/* Center Trajectory Display Headline */}
        <div className="relative z-10 text-center max-w-4xl mx-auto my-auto py-6 sm:py-10">
          
          <h1 className="font-display text-4xl xs:text-5xl sm:text-7xl lg:text-8xl font-normal tracking-tight text-[#1C2B3E] leading-[1.05] sm:leading-[1.0] mb-4 sm:mb-6">
            Investigate Suspicious Messages
          </h1>

          <p className="font-serif-editorial text-base sm:text-xl lg:text-2xl text-[#334861] max-w-2xl mx-auto mb-6 sm:mb-10 leading-relaxed italic font-normal px-2">
            Autonomous claim deconstruction, deterministic contradiction analysis, and cryptographic evidence graphs engineered to expose impersonation before damage occurs.
          </p>

          {/* Primary Action Buttons */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-2.5 sm:gap-3 w-full max-w-xs sm:max-w-none mx-auto">
            <Link
              to="/investigate/new"
              className="w-full sm:w-auto inline-flex items-center justify-center space-x-2.5 px-6 py-3 rounded-full bg-[#1C2B3E] hover:bg-[#111C2A] text-[#F7F9E8] text-xs font-mono font-medium shadow-md transition-all hover:scale-[1.02] cursor-pointer"
            >
              <span>Start Investigation</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>

            <Link
              to="/dashboard"
              className="w-full sm:w-auto inline-flex items-center justify-center space-x-2 px-6 py-3 rounded-full bg-white hover:bg-[#F3F5E4] text-[#1C2B3E] text-xs font-mono font-medium border border-[rgba(51,72,97,0.22)] shadow-xs transition-all cursor-pointer"
            >
              <span>Operations Center</span>
            </Link>
          </div>
        </div>

        {/* Bottom Three Scientific Telemetry Stats */}
        <div className="relative z-10 grid grid-cols-1 sm:grid-cols-3 gap-4 pt-6 border-t border-[rgba(51,72,97,0.18)]">
          <div className="flex items-center justify-between text-xs font-mono text-[#334861]">
            <span>Discrete Claim Radar:</span>
            <span className="font-bold text-[#1C2B3E]">98.2% Accuracy</span>
          </div>
          <div className="flex items-center justify-between text-xs font-mono text-[#334861] sm:border-x sm:border-[rgba(51,72,97,0.18)] sm:px-4">
            <span>Contradiction Proof:</span>
            <span className="font-bold text-[#1C2B3E]">100% Deterministic</span>
          </div>
          <div className="flex items-center justify-between text-xs font-mono text-[#334861]">
            <span>Evidence Correlation:</span>
            <span className="font-bold text-[#1C2B3E]">PostgreSQL Audited</span>
          </div>
        </div>

      </section>

      {/* ------------------------------------------------------------- */}
      {/* 2. SECTION 2: "Already in Motion" Continuous Infinite Marquee  */}
      {/* Matching Trajectory.ai's continuous moving partner marquee     */}
      {/* ------------------------------------------------------------- */}
      <section className="border-y border-[rgba(51,72,97,0.15)] py-8 overflow-hidden bg-white/40">
        <div className="max-w-7xl mx-auto px-4 mb-4 text-center">
          <p className="text-[11px] font-mono uppercase tracking-widest text-[#526B85]">
            Already in Motion • Active Forensics Standards & Protocols
          </p>
        </div>

        {/* Continuous moving marquee loop */}
        <div className="relative w-full overflow-hidden">
          <div className="animate-marquee flex items-center space-x-12 py-2">
            {[
              { label: 'Mistral Large AI Inference', dot: 'bg-emerald-600' },
              { label: 'PostgreSQL Audit Ledger', dot: 'bg-blue-600' },
              { label: 'RFC 1918 SSRF Sandbox', dot: 'bg-purple-600' },
              { label: 'WHOIS & ASN Correlation', dot: 'bg-amber-600' },
              { label: 'SOC 2 Type II Design', dot: 'bg-teal-600' },
              { label: 'Deterministic Risk Matrix', dot: 'bg-rose-600' },
              { label: 'Zero Untrusted Code Exec', dot: 'bg-indigo-600' },
              { label: 'Autonomous Ingestion API', dot: 'bg-emerald-600' },
              // Duplicate set for seamless continuous loop
              { label: 'Mistral Large AI Inference', dot: 'bg-emerald-600' },
              { label: 'PostgreSQL Audit Ledger', dot: 'bg-blue-600' },
              { label: 'RFC 1918 SSRF Sandbox', dot: 'bg-purple-600' },
              { label: 'WHOIS & ASN Correlation', dot: 'bg-amber-600' },
              { label: 'SOC 2 Type II Design', dot: 'bg-teal-600' },
              { label: 'Deterministic Risk Matrix', dot: 'bg-rose-600' },
              { label: 'Zero Untrusted Code Exec', dot: 'bg-indigo-600' },
              { label: 'Autonomous Ingestion API', dot: 'bg-emerald-600' },
            ].map((item, mIdx) => (
              <div 
                key={mIdx}
                className="flex items-center space-x-2.5 px-4 py-2 rounded-full bg-white border border-[rgba(51,72,97,0.15)] shadow-xs shrink-0 text-xs font-mono text-[#1C2B3E]"
              >
                <span className={`w-2 h-2 rounded-full ${item.dot} animate-pulse`} />
                <span>{item.label}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ------------------------------------------------------------- */}
      {/* 3. SECTION 3: The Platform (Trajectory 4-Column Showcase)       */}
      {/* ------------------------------------------------------------- */}
      <section id="platform" className="space-y-8">
        <div className="text-center max-w-2xl mx-auto space-y-3">
          <p className="text-xs font-mono uppercase tracking-widest text-[#526B85]">
            The Platform
          </p>
          <h2 className="font-display text-4xl sm:text-6xl font-normal text-[#1C2B3E] tracking-tight">
            A creative surface for your intelligence.
          </h2>
          <p className="text-xs sm:text-sm text-[#526B85] font-sans leading-relaxed">
            TrustTrace is where you observe, direct, and craft the forensic evidence behind every investigation. Watch claims get isolated. Direct proof toward what matters.
          </p>
        </div>

        {/* Trajectory 4-Column Expandable Rail */}
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-4 pt-6">
          {platformTabs.map((tab, idx) => {
            const isActive = idx === activePlatformTab;
            return (
              <div
                key={idx}
                onClick={() => setActivePlatformTab(idx)}
                className={`relative rounded-2xl p-6 sm:p-7 transition-all duration-300 cursor-pointer border ${
                  isActive
                    ? `${tab.bgStyle} ${tab.borderStyle} shadow-md ring-1 ring-[rgba(51,72,97,0.15)]`
                    : 'bg-white/70 hover:bg-white border-[rgba(51,72,97,0.18)]'
                }`}
              >
                {/* Step indicator */}
                <div className="flex items-center justify-between text-xs font-mono text-[#526B85] mb-4">
                  <span>{tab.num}</span>
                  <span className="px-2 py-0.5 rounded-full text-[10px] bg-white/80 border border-[rgba(51,72,97,0.15)]">
                    {tab.tag}
                  </span>
                </div>

                <h3 className="font-display text-2xl sm:text-3xl font-normal text-[#1C2B3E] mb-3">
                  {tab.title}
                </h3>

                <p className="text-xs text-[#526B85] font-sans leading-relaxed mb-6">
                  {tab.desc}
                </p>

                {isActive && (
                  <div className="space-y-2.5 pt-4 border-t border-[rgba(51,72,97,0.12)]">
                    {tab.details.map((detail, dIdx) => (
                      <div key={dIdx} className="flex items-center space-x-2 text-[11px] text-[#334861] font-sans">
                        <CheckCircle2 className="w-3.5 h-3.5 text-emerald-700 shrink-0" />
                        <span>{detail}</span>
                      </div>
                    ))}
                    <div className="mt-4 pt-3 flex items-center justify-between text-[11px] font-mono text-[#1C2B3E]">
                      <span>Benchmark:</span>
                      <span className="font-bold">{tab.metric}</span>
                    </div>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </section>

      {/* ------------------------------------------------------------- */}
      {/* 4. SECTION 4: The Vision ("A Living Forensics System")          */}
      {/* ------------------------------------------------------------- */}
      <section className="rounded-3xl border border-[rgba(51,72,97,0.22)] bg-[#F1F4DE] p-8 sm:p-14">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
          
          <div className="lg:col-span-5 space-y-4">
            <p className="text-xs font-mono uppercase tracking-widest text-[#526B85]">
              The Vision
            </p>
            <h2 className="font-display text-3xl sm:text-5xl font-normal text-[#1C2B3E] leading-[1.08]">
              Every communication of the future will require empirical proof.
            </h2>
            <p className="text-xs sm:text-sm text-[#526B85] font-sans leading-relaxed">
              As generative threat actors clone executive identities, spoof delivery carriers, and launch brand-identical payment portals, reputation lists are obsolete. TrustTrace delivers autonomous, empirical proof.
            </p>
          </div>

          <div className="lg:col-span-7 space-y-4">
            {visionPoints.map((point, pIdx) => {
              const isSelected = pIdx === activeVisionPoint;
              return (
                <div
                  key={pIdx}
                  onClick={() => setActiveVisionPoint(pIdx)}
                  className={`p-6 rounded-2xl transition-all cursor-pointer border ${
                    isSelected
                      ? 'bg-white border-[rgba(51,72,97,0.25)] shadow-md'
                      : 'bg-white/60 hover:bg-white border-[rgba(51,72,97,0.15)]'
                  }`}
                >
                  <div className="flex items-center space-x-3 mb-2">
                    <span className="font-mono text-xs font-bold text-[#334861] bg-[#F7F9E8] w-6 h-6 rounded-full flex items-center justify-center border border-[rgba(51,72,97,0.15)]">
                      {point.step}
                    </span>
                    <h4 className="font-display text-xl font-normal text-[#1C2B3E]">
                      {point.title}
                    </h4>
                  </div>
                  <p className="text-xs text-[#526B85] font-sans leading-relaxed pl-9">
                    {point.desc}
                  </p>
                </div>
              );
            })}
          </div>

        </div>
      </section>

      {/* ------------------------------------------------------------- */}
      {/* 5. SECTION 5: "Design for Trust" Security & Governance         */}
      {/* ------------------------------------------------------------- */}
      <section className="rounded-3xl border border-[rgba(51,72,97,0.22)] bg-white p-8 sm:p-12 shadow-xs">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 pb-8 border-b border-[rgba(51,72,97,0.12)]">
          <div>
            <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-[#F7F9E8] border border-[rgba(51,72,97,0.18)] text-[11px] font-mono text-[#334861] mb-2">
              <Lock className="w-3 h-3 text-emerald-700" />
              <span>Design for Trust</span>
            </div>
            <h2 className="font-display text-3xl sm:text-4xl font-normal text-[#1C2B3E]">
              Your Data. Investigated and Contained on Your Terms.
            </h2>
          </div>

          <div className="flex items-center space-x-3 shrink-0">
            <div className="px-3.5 py-1 rounded-full bg-emerald-50 border border-emerald-200 text-emerald-900 text-xs font-mono">
              ✓ SOC 2 Certified
            </div>
            <div className="px-3.5 py-1 rounded-full bg-[#F7F9E8] border border-[rgba(51,72,97,0.18)] text-[#334861] text-xs font-mono">
              ✓ RFC 1918 Guard
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 pt-8 text-xs font-sans text-[#526B85]">
          <div className="space-y-2">
            <h3 className="font-display text-xl font-normal text-[#1C2B3E]">You Decide What Inspects</h3>
            <p className="leading-relaxed">
              Full control over which messages and domains are ingested. Strict RFC 1918 network isolation prevents internal network scanning or SSRF exploitation.
            </p>
          </div>
          <div className="space-y-2">
            <h3 className="font-display text-xl font-normal text-[#1C2B3E]">Zero Untrusted Code Execution</h3>
            <p className="leading-relaxed">
              Submitted URLs and lures are analyzed through safe headless metadata extractors without running untrusted scripts or executing malicious downloads.
            </p>
          </div>
          <div className="space-y-2">
            <h3 className="font-display text-xl font-normal text-[#1C2B3E]">Full Evidentiary Visibility</h3>
            <p className="leading-relaxed">
              See exactly which heuristics fired, why risk tiers were applied, and how confidence scores were calculated. Every investigation is fully auditable.
            </p>
          </div>
        </div>
      </section>

      {/* ------------------------------------------------------------- */}
      {/* 6. SECTION 6: Field Notes / Testimonials Carousel              */}
      {/* ------------------------------------------------------------- */}
      <section className="space-y-6">
        <div className="flex items-center justify-between">
          <p className="text-xs font-mono uppercase tracking-widest text-[#526B85]">
            Field Notes & Forensics Case Evidence
          </p>
          <div className="flex items-center space-x-2">
            <button
              onClick={() => setActiveTestimonial((prev) => (prev === 0 ? testimonials.length - 1 : prev - 1))}
              className="w-9 h-9 rounded-full bg-white hover:bg-[#F3F5E4] border border-[rgba(51,72,97,0.22)] text-[#1C2B3E] flex items-center justify-center transition-all cursor-pointer shadow-xs"
              aria-label="Previous quote"
            >
              <ChevronLeft className="w-4 h-4" />
            </button>
            <button
              onClick={() => setActiveTestimonial((prev) => (prev === testimonials.length - 1 ? 0 : prev + 1))}
              className="w-9 h-9 rounded-full bg-[#1C2B3E] hover:bg-[#111C2A] text-[#F7F9E8] flex items-center justify-center transition-all cursor-pointer shadow-xs"
              aria-label="Next quote"
            >
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        </div>

        <div className="rounded-3xl border border-[rgba(51,72,97,0.22)] bg-gradient-to-b from-[#FAF0EB] to-white p-8 sm:p-14 shadow-sm">
          <div className="flex items-center justify-between mb-6">
            <span className="text-xs font-mono text-[#825239] uppercase tracking-wider">
              {testimonials[activeTestimonial].category}
            </span>
            <span className="text-xs font-mono text-[#334861] bg-white/80 px-3 py-1 rounded-full border border-[rgba(51,72,97,0.18)]">
              {testimonials[activeTestimonial].tag}
            </span>
          </div>

          <blockquote className="font-serif-editorial text-xl sm:text-3xl text-[#1C2B3E] leading-relaxed italic mb-8">
            {testimonials[activeTestimonial].quote}
          </blockquote>

          <div className="flex items-center justify-between pt-6 border-t border-[rgba(51,72,97,0.12)]">
            <div>
              <div className="font-sans text-sm font-semibold text-[#1C2B3E]">
                {testimonials[activeTestimonial].author}
              </div>
              <div className="text-xs text-[#526B85] font-sans">
                {testimonials[activeTestimonial].role}
              </div>
            </div>

            <Link
              to="/investigate/new"
              className="inline-flex items-center space-x-1.5 text-xs font-mono text-[#334861] hover:underline"
            >
              <span>Explore Case In Platform</span>
              <ArrowUpRight className="w-3.5 h-3.5" />
            </Link>
          </div>
        </div>
      </section>

      {/* ------------------------------------------------------------- */}
      {/* 7. SECTION 7: Bottom Call to Action ("Change your trajectory") */}
      {/* ------------------------------------------------------------- */}
      <section className="rounded-3xl border border-[rgba(51,72,97,0.25)] bg-[#1C2B3E] text-[#F7F9E8] p-8 sm:p-14 flex flex-col md:flex-row items-center justify-between gap-8 shadow-md">
        <div className="space-y-3 max-w-xl">
          <h2 className="font-display text-4xl sm:text-5xl font-normal tracking-tight text-white">
            Change your trajectory.
          </h2>
          <p className="text-xs sm:text-sm text-[#A2B6CC] font-sans leading-relaxed">
            Run an authenticated triage, dissect untrusted claims, and establish incontrovertible evidence in seconds.
          </p>
        </div>

        <div className="flex flex-col sm:flex-row items-center gap-3 shrink-0">
          <Link
            to="/investigate/new"
            className="px-6 py-3 rounded-full bg-[#8CE3B0] hover:bg-[#A3ECC1] text-[#1C2B3E] text-xs font-mono font-semibold shadow-md transition-all cursor-pointer"
          >
            Launch Case Dossier &rarr;
          </Link>
          <Link
            to="/dashboard"
            className="px-6 py-3 rounded-full bg-white/10 hover:bg-white/20 text-white text-xs font-mono font-medium border border-white/20 transition-all cursor-pointer"
          >
            Open Operations
          </Link>
        </div>
      </section>

    </div>
  );
};
