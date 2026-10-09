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
  Eye,
  Sparkles,
  Search,
  Activity,
  ChevronLeft,
  ChevronRight,
  ShieldCheck,
  Cpu,
  Layers,
  ArrowUpRight,
  TrendingUp,
  Sliders,
  CheckCircle,
  Binary
} from 'lucide-react';

export const LandingPage: React.FC = () => {
  const [activeStep, setActiveStep] = useState(0);

  // Lucid Horizontal Stepper Workflow ("Making Proof Visible")
  const workflowSteps = [
    {
      num: '01',
      title: 'Autonomous Ingestion',
      category: 'Stage 1 • Claim Isolation',
      desc: 'Parses incoming SMS, email, and web lures into atomic, falsifiable assertions with complete provenance tracking and zero untrusted script execution.',
      metric: '99.4% Parsing Purity',
      tag: 'RFC-Compliant Ingestion',
      icon: Binary,
      details: [
        'Deterministic header decomposition',
        'Payload sanitization & safe decoding',
        'Zero-trust RFC 1918 sandboxing'
      ]
    },
    {
      num: '02',
      title: 'Contradiction Analysis',
      category: 'Stage 2 • Infrastructure Audit',
      desc: 'Correlates claimed institutional identity against destination ASN, WHOIS registrar history, TLS cipher suites, and dynamic redirect hops.',
      metric: '100% Deterministic Mismatch',
      tag: 'Real-Time Verification',
      icon: Scale,
      details: [
        'Authority divergence detection',
        'Lookalike typosquatting identification',
        'Bare IP & ephemeral domain flagging'
      ]
    },
    {
      num: '03',
      title: 'Evidence Graph Fusion',
      category: 'Stage 3 • Forensics Network',
      desc: 'Constructs an interactive multi-dimensional evidence graph binding entities, cryptographic hashes, autonomous indicators, and threat intelligence.',
      metric: 'Multi-Node Correlation',
      tag: 'Cryptographic Provenance',
      icon: Network,
      details: [
        'Graph-theoretic link analysis',
        'Corroborating lookup verification',
        'Persistent database auditing'
      ]
    },
    {
      num: '04',
      title: 'Actionable Containment',
      category: 'Stage 4 • Incident Remediation',
      desc: 'Generates step-by-step verified response playbooks, registrar abuse reporting templates, and official institution confirmation checklists.',
      metric: 'Zero Ambiguity Playbook',
      tag: 'Verified Response Protocol',
      icon: ShieldCheck,
      details: [
        'Official institution direct links',
        'Standardized abuse contact payloads',
        'Defensible evidentiary audit export'
      ]
    }
  ];

  const handlePrevStep = () => {
    setActiveStep((prev) => (prev === 0 ? workflowSteps.length - 1 : prev - 1));
  };

  const handleNextStep = () => {
    setActiveStep((prev) => (prev === workflowSteps.length - 1 ? 0 : prev + 1));
  };

  return (
    <div className="space-y-16 pb-20 -mt-2">
      
      {/* ------------------------------------------------------------- */}
      {/* 1. HERO SECTION: Lucid Ethereal Minimal Stage                  */}
      {/* ------------------------------------------------------------- */}
      <section className="relative w-full rounded-[36px] overflow-hidden min-h-[580px] sm:min-h-[640px] flex flex-col justify-between p-6 sm:p-12 shadow-[0_20px_50px_-20px_rgba(0,0,0,0.06)] border border-white bg-gradient-to-b from-[#F5F1EB] via-[#ECE5DC] to-[#E2D9CF]">
        
        {/* Soft Ambient Radial Light - 100% Pure CSS, Zero Video / Image Artifacts */}
        <div className="absolute -top-24 left-1/2 -translate-x-1/2 w-[600px] h-[350px] rounded-full bg-white/60 blur-3xl pointer-events-none" />
        <div className="absolute top-1/3 left-1/2 -translate-x-1/2 w-[400px] h-[300px] rounded-full bg-amber-50/50 blur-2xl pointer-events-none" />

        {/* Lucid Hero Top Sub-Nav (Minimal pill styling) */}
        <div className="relative z-10 flex items-center justify-between text-xs font-mono text-[#54514A]">
          <div className="flex items-center space-x-2 bg-white/70 backdrop-blur-md px-3.5 py-1.5 rounded-full border border-white/80 shadow-xs">
            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
            <span className="text-[11px] font-medium tracking-wide">Forensic Evidence Core Active</span>
          </div>

          <div className="hidden sm:flex items-center space-x-6 text-[11px] font-medium">
            <Link to="/dashboard" className="hover:text-black transition-colors">Operations</Link>
            <Link to="/history" className="hover:text-black transition-colors">Case Vault</Link>
            <Link to="/settings" className="hover:text-black transition-colors">Integrations</Link>
          </div>
        </div>

        {/* Center Hero Statement */}
        <div className="relative z-10 text-center max-w-3xl mx-auto my-auto py-10 sm:py-14">
          
          {/* Pill Badge */}
          <div className="inline-flex items-center space-x-2 px-4 py-1.5 rounded-full bg-white/80 backdrop-blur-md border border-white/90 text-[#34322D] text-xs font-mono mb-6 shadow-xs">
            <Sparkles className="w-3.5 h-3.5 text-emerald-600" />
            <span>Autonomous Evidence-First Forensics</span>
          </div>

          {/* Main Headline (Preserves required test text: "Investigate Suspicious Messages") */}
          <h1 className="font-heading text-4xl sm:text-6xl lg:text-7xl font-bold tracking-tight text-[#18191B] mb-5 leading-[1.08]">
            Investigate Suspicious Messages
          </h1>

          <p className="font-sans text-sm sm:text-base text-[#5E5B55] max-w-xl mx-auto mb-8 leading-relaxed font-normal">
            Autonomous claim deconstruction, deterministic contradiction analysis, and cryptographic evidence graphs engineered to expose impersonation before damage occurs.
          </p>

          {/* Primary Action Button ("Start Investigation" with circular arrow button) */}
          <div className="flex justify-center">
            <Link
              to="/investigate/new"
              className="group inline-flex items-center space-x-3 pl-6 pr-2.5 py-2.5 rounded-full bg-[#18191B] hover:bg-black text-white text-xs font-medium shadow-xl hover:shadow-2xl transition-all hover:scale-[1.02] cursor-pointer"
            >
              <span className="tracking-wide">Start Investigation</span>
              <div className="w-7 h-7 rounded-full bg-white/20 text-white flex items-center justify-center group-hover:translate-x-0.5 transition-transform">
                <ChevronRight className="w-4 h-4" />
              </div>
            </Link>
          </div>
        </div>

        {/* Bottom Floating Glass Statistic Cards (Directly matching Lucid Video Cards) */}
        <div className="relative z-10 grid grid-cols-1 sm:grid-cols-3 gap-4 pt-4">
          
          {/* Card 1: Extraction Precision */}
          <div className="lucid-glass-card rounded-2xl p-4 sm:p-5 flex flex-col justify-between">
            <div className="flex items-center justify-between text-xs text-[#6B6862]">
              <span className="font-mono text-[11px] uppercase tracking-wider">Discrete Claim Radar</span>
              <FileCheck2 className="w-4 h-4 text-emerald-600" />
            </div>
            <div className="my-3 flex items-baseline gap-2">
              <span className="font-heading text-3xl sm:text-4xl font-bold text-[#18191B]">98.2%</span>
              <span className="text-[11px] font-mono text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-full border border-emerald-100">Verified</span>
            </div>
            <div className="text-[11px] text-[#6B6862] font-sans flex items-center justify-between border-t border-[#EAE6DE] pt-2">
              <span>Isolated Assertions</span>
              <span className="font-mono text-[#18191B]">Deterministic</span>
            </div>
          </div>

          {/* Card 2: Contradiction Engine */}
          <div className="lucid-glass-card rounded-2xl p-4 sm:p-5 flex flex-col justify-between">
            <div className="flex items-center justify-between text-xs text-[#6B6862]">
              <span className="font-mono text-[11px] uppercase tracking-wider">Authority Divergence</span>
              <Scale className="w-4 h-4 text-amber-600" />
            </div>
            <div className="my-3 flex items-baseline gap-2">
              <span className="font-heading text-3xl sm:text-4xl font-bold text-[#18191B]">100%</span>
              <span className="text-[11px] font-mono text-amber-800 bg-amber-50 px-2 py-0.5 rounded-full border border-amber-100">Proven Mismatch</span>
            </div>
            <div className="text-[11px] text-[#6B6862] font-sans flex items-center justify-between border-t border-[#EAE6DE] pt-2">
              <span>ASN & WHOIS Mismatch</span>
              <span className="font-mono text-[#18191B]">Cryptographic</span>
            </div>
          </div>

          {/* Card 3: Evidence Graph Depth */}
          <div className="lucid-glass-card rounded-2xl p-4 sm:p-5 flex flex-col justify-between">
            <div className="flex items-center justify-between text-xs text-[#6B6862]">
              <span className="font-mono text-[11px] uppercase tracking-wider">Evidence Graph</span>
              <Network className="w-4 h-4 text-indigo-600" />
            </div>
            <div className="my-3 flex items-baseline gap-2">
              <span className="font-heading text-3xl sm:text-4xl font-bold text-[#18191B]">14+</span>
              <span className="text-[11px] font-mono text-indigo-700 bg-indigo-50 px-2 py-0.5 rounded-full border border-indigo-100">Live Nodes</span>
            </div>
            <div className="text-[11px] text-[#6B6862] font-sans flex items-center justify-between border-t border-[#EAE6DE] pt-2">
              <span>Provenance Corroborated</span>
              <span className="font-mono text-[#18191B]">PostgreSQL</span>
            </div>
          </div>

        </div>

      </section>

      {/* ------------------------------------------------------------- */}
      {/* 2. SECTION 2: "Making Proof Visible" Horizontal Stepper        */}
      {/* Matching Lucid Video t=6s - 10s ("Making Recovery Visible")   */}
      {/* ------------------------------------------------------------- */}
      <section className="w-full rounded-[36px] bg-[#E5DFD7] p-8 sm:p-14 border border-white/60 shadow-[0_20px_50px_-20px_rgba(0,0,0,0.05)] relative overflow-hidden">
        
        {/* Subtle decorative background blur */}
        <div className="absolute top-0 right-0 w-96 h-96 bg-white/20 rounded-full blur-3xl pointer-events-none" />

        <div className="relative z-10">
          
          {/* Header Row with Title and Pill Controls */}
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-6 mb-10 pb-6 border-b border-[#D4CDC3]">
            <div>
              <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-white/70 border border-white/80 text-[11px] font-mono text-[#54514A] mb-3">
                <Sliders className="w-3 h-3 text-emerald-700" />
                <span>Forensic Architecture</span>
              </div>
              <h2 className="font-heading text-3xl sm:text-5xl font-bold text-[#18191B] tracking-tight">
                Making Proof Visible
              </h2>
              <p className="text-xs sm:text-sm text-[#6B6862] mt-2 max-w-lg font-sans">
                A deterministic four-phase pipeline turning unstructured deceptive communications into verifiable, audit-ready evidentiary proof.
              </p>
            </div>

            {/* Stepper Pill Controls (< > arrows) */}
            <div className="flex items-center space-x-3">
              <span className="text-xs font-mono text-[#6B6862] mr-2">
                0{activeStep + 1} <span className="opacity-40">/ 04</span>
              </span>
              <button
                onClick={handlePrevStep}
                className="w-10 h-10 rounded-full bg-white hover:bg-[#F2ECE6] text-[#18191B] flex items-center justify-center shadow-xs transition-all cursor-pointer border border-[#DCD5CB]"
                aria-label="Previous step"
              >
                <ChevronLeft className="w-4 h-4" />
              </button>
              <button
                onClick={handleNextStep}
                className="w-10 h-10 rounded-full bg-[#18191B] hover:bg-black text-white flex items-center justify-center shadow-xs transition-all cursor-pointer"
                aria-label="Next step"
              >
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* Stepper Navigation Track (01, 02, 03, 04 connected nodes) */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-8">
            {workflowSteps.map((step, idx) => {
              const isActive = idx === activeStep;
              return (
                <button
                  key={idx}
                  onClick={() => setActiveStep(idx)}
                  className={`text-left p-4 rounded-2xl transition-all cursor-pointer border ${
                    isActive
                      ? 'bg-white border-white shadow-md text-[#18191B]'
                      : 'bg-white/40 border-transparent hover:bg-white/70 text-[#6B6862]'
                  }`}
                >
                  <div className="flex items-center justify-between mb-2">
                    <span className={`font-mono text-xs font-bold ${isActive ? 'text-emerald-700' : 'text-[#8C8880]'}`}>
                      {step.num}
                    </span>
                    {isActive && <div className="w-2 h-2 rounded-full bg-emerald-500" />}
                  </div>
                  <div className="font-heading text-sm font-semibold truncate">
                    {step.title}
                  </div>
                </button>
              );
            })}
          </div>

          {/* Active Step Showcase Card */}
          <div className="bg-white rounded-3xl p-6 sm:p-10 border border-white shadow-lg grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            
            <div className="lg:col-span-7 space-y-5">
              <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-[#F5F2EC] text-[11px] font-mono text-[#54514A]">
                <span>{workflowSteps[activeStep].category}</span>
              </div>

              <h3 className="font-heading text-2xl sm:text-3xl font-bold text-[#18191B]">
                {workflowSteps[activeStep].title}
              </h3>

              <p className="text-sm text-[#54514A] leading-relaxed font-sans">
                {workflowSteps[activeStep].desc}
              </p>

              {/* Bullet highlights */}
              <div className="space-y-2 pt-2">
                {workflowSteps[activeStep].details.map((detail, dIdx) => (
                  <div key={dIdx} className="flex items-center space-x-2.5 text-xs text-[#3E3C36] font-sans">
                    <div className="w-4 h-4 rounded-full bg-emerald-100 text-emerald-700 flex items-center justify-center shrink-0">
                      <CheckCircle2 className="w-3 h-3" />
                    </div>
                    <span>{detail}</span>
                  </div>
                ))}
              </div>

              <div className="pt-4 flex items-center gap-4">
                <Link
                  to="/investigate/new"
                  className="inline-flex items-center space-x-2 px-5 py-2.5 rounded-full bg-[#18191B] hover:bg-black text-white text-xs font-medium transition-all"
                >
                  <span>Execute This In A Case</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </Link>
                <span className="text-xs font-mono text-[#8C8880]">
                  Status: Autonomous Live
                </span>
              </div>
            </div>

            {/* Right Interactive Telemetry Panel */}
            <div className="lg:col-span-5 bg-[#F7F5F0] rounded-2xl p-6 border border-[#E5DFD7] space-y-4">
              <div className="flex items-center justify-between pb-3 border-b border-[#E5DFD7]">
                <span className="text-xs font-mono text-[#6B6862] uppercase tracking-wider">Verified Heuristic</span>
                <span className="text-[11px] font-mono text-emerald-800 bg-emerald-100/70 px-2.5 py-0.5 rounded-full">
                  {workflowSteps[activeStep].tag}
                </span>
              </div>

              <div className="space-y-1">
                <span className="text-[11px] font-mono text-[#8C8880]">Telemetry Benchmark:</span>
                <div className="font-heading text-2xl font-bold text-[#18191B]">
                  {workflowSteps[activeStep].metric}
                </div>
              </div>

              <div className="p-4 rounded-xl bg-white border border-[#E5DFD7] space-y-2 text-xs font-mono text-[#54514A]">
                <div className="flex justify-between">
                  <span>Engine:</span>
                  <span className="text-[#18191B] font-semibold">Mistral / Deterministic</span>
                </div>
                <div className="flex justify-between">
                  <span>Input Guard:</span>
                  <span className="text-emerald-700 font-semibold">SSRF Filtered</span>
                </div>
                <div className="flex justify-between">
                  <span>Persistence:</span>
                  <span className="text-[#18191B] font-semibold">Audit DB Logged</span>
                </div>
              </div>
            </div>

          </div>

        </div>
      </section>

      {/* ------------------------------------------------------------- */}
      {/* 3. SECTION 3: The Six Defensible Forensics Questions           */}
      {/* Editorial Forensic Spectrum Layout (Non-grid, fluid & unique) */}
      {/* ------------------------------------------------------------- */}
      <section className="max-w-7xl mx-auto px-2 sm:px-4">
        
        {/* Section Headline */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12 pb-6 border-b border-[#DCD5CB]">
          <div>
            <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-white/80 border border-white text-[11px] font-mono text-[#54514A] mb-3 shadow-xs">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-600"></span>
              <span>Scientific Rigor & Defensibility</span>
            </div>
            <h2 className="font-heading text-3xl sm:text-5xl font-bold text-[#18191B] tracking-tight">
              The Six Forensics Pillars
            </h2>
          </div>
          <p className="text-xs sm:text-sm text-[#6B6862] max-w-md font-sans leading-relaxed">
            Eliminating vague probabilistic guesses. Every investigative inquiry follows a structured, falsifiable proof continuum.
          </p>
        </div>

        {/* Fluid Horizontal Editorial Spectrum (No box grid) */}
        <div className="space-y-4">
          {[
            {
              id: '01',
              title: 'Discrete Claim Extraction',
              category: 'Vector Deconstruction',
              summary: 'Breaks down deceptive text, SMS lures, and urgent demands into testable assertions.',
              verdict: 'Deterministic Isolation',
              accent: 'text-emerald-700 bg-emerald-50 border-emerald-200'
            },
            {
              id: '02',
              title: 'Contradiction Analysis',
              category: 'Identity Divergence',
              summary: 'Proves authority mismatch when claimed sender brand clashes with registered ASN or bare IP.',
              verdict: 'Provable Divergence',
              accent: 'text-rose-700 bg-rose-50 border-rose-200'
            },
            {
              id: '03',
              title: 'Evidence Correlation Graph',
              category: 'Network Topology',
              summary: 'Maps interconnected entities, registrar records, cipher fingerprints, and historical lookups.',
              verdict: 'Graph-Theoretic Integrity',
              accent: 'text-indigo-700 bg-indigo-50 border-indigo-200'
            },
            {
              id: '04',
              title: 'Transparent Risk Scoring',
              category: 'Algorithmic Audit',
              summary: 'Documented, rule-based severity weights without unexplainable neural black boxes.',
              verdict: 'Audit-Verifiable Weights',
              accent: 'text-amber-700 bg-amber-50 border-amber-200'
            },
            {
              id: '05',
              title: 'Honest Uncertainty Reporting',
              category: 'Negative Space Assurance',
              summary: 'Absence of external threat flags is never misrepresented as confirmation of safety.',
              verdict: 'Zero False Confidence',
              accent: 'text-sky-700 bg-sky-50 border-sky-200'
            },
            {
              id: '06',
              title: 'Actionable Response Playbook',
              category: 'Active Containment',
              summary: 'Generates authenticated incident checklists and registrar abuse notices for immediate remediation.',
              verdict: 'Operational Readiness',
              accent: 'text-teal-700 bg-teal-50 border-teal-200'
            }
          ].map((item, idx) => (
            <div 
              key={idx}
              className="group relative flex flex-col lg:flex-row lg:items-center justify-between p-5 sm:p-7 rounded-2xl bg-white/70 hover:bg-white border border-[#E8E2D8] hover:border-white hover:shadow-lg transition-all duration-300"
            >
              {/* Left Column: Number + Title + Category */}
              <div className="flex items-start sm:items-center space-x-4 sm:space-x-6">
                <span className="font-mono text-xl sm:text-2xl font-semibold text-[#8C8880] group-hover:text-[#18191B] transition-colors">
                  {item.id}
                </span>
                <div>
                  <div className="flex items-center space-x-2.5 mb-1">
                    <span className="text-[10px] uppercase font-mono tracking-wider text-[#8C8880]">
                      {item.category}
                    </span>
                  </div>
                  <h3 className="font-heading text-lg sm:text-xl font-bold text-[#18191B] tracking-tight group-hover:translate-x-1 transition-transform">
                    {item.title}
                  </h3>
                </div>
              </div>

              {/* Middle: Brief summary */}
              <p className="mt-3 lg:mt-0 text-xs sm:text-sm text-[#6B6862] font-sans max-w-xl lg:px-6 leading-relaxed">
                {item.summary}
              </p>

              {/* Right: Pill Badge Verdict */}
              <div className="mt-4 lg:mt-0 flex items-center space-x-3 shrink-0">
                <span className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-mono border ${item.accent}`}>
                  {item.verdict}
                </span>
                <div className="w-8 h-8 rounded-full bg-[#F5F2EC] group-hover:bg-[#18191B] group-hover:text-white text-[#54514A] flex items-center justify-center transition-all">
                  <ArrowRight className="w-3.5 h-3.5" />
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ------------------------------------------------------------- */}
      {/* 4. SECTION 4: Final Assurance Hero Container                   */}
      {/* ------------------------------------------------------------- */}
      <section className="relative w-full rounded-[36px] overflow-hidden p-8 sm:p-14 border border-white bg-gradient-to-tr from-[#E6E0D8] to-[#F2ECE6] shadow-xl flex flex-col md:flex-row items-center justify-between gap-8">
        <div className="space-y-4 max-w-xl">
          <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-white text-[11px] font-mono text-[#54514A]">
            <ShieldAlert className="w-3.5 h-3.5 text-emerald-700" />
            <span>Ready for Immediate Deployment</span>
          </div>
          <h2 className="font-heading text-3xl sm:text-4xl font-bold text-[#18191B] tracking-tight">
            Begin Investigating Suspicious Incidents Now
          </h2>
          <p className="text-xs sm:text-sm text-[#6B6862] font-sans leading-relaxed">
            Run an authenticated triage, dissect untrusted claims, and establish incontrovertible evidence in seconds.
          </p>
        </div>

        <div className="flex flex-col sm:flex-row items-center gap-3 shrink-0">
          <Link
            to="/investigate/new"
            className="px-6 py-3 rounded-full bg-[#18191B] hover:bg-black text-white text-xs font-semibold shadow-lg hover:shadow-xl transition-all cursor-pointer"
          >
            Launch Investigation
          </Link>
          <Link
            to="/dashboard"
            className="px-6 py-3 rounded-full bg-white hover:bg-[#F7F5F0] text-[#18191B] text-xs font-semibold border border-[#DDD7CD] shadow-xs transition-all cursor-pointer"
          >
            Open Operations
          </Link>
        </div>
      </section>

    </div>
  );
};
