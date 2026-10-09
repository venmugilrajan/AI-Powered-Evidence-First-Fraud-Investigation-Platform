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
  ChevronRight,
  ShieldCheck,
  Cpu,
  Layers
} from 'lucide-react';

export const LandingPage: React.FC = () => {
  const [activeFeature, setActiveFeature] = useState(0);

  const capabilities = [
    {
      num: '01',
      tag: 'AI Claim Extraction',
      title: 'Deconstruct Suspicious Assertions',
      desc: 'Systematically splits untrusted messages into discrete, falsifiable claims (impersonation, urgency penalty, payment reroutes).',
      highlight: 'Zero blackbox hallucinations — each claim is indexed to precise character offsets.'
    },
    {
      num: '02',
      tag: 'Contradiction Engine',
      title: 'Real-Time Identity Contradiction',
      desc: 'Proves authority mismatches immediately when claimed sender diverges from destination hostnames, ASN ownership, or WHOIS registration.',
      highlight: 'Direct proof against lookalike punycode & untrusted TLD spoofing.'
    },
    {
      num: '03',
      tag: 'Forensic Correlation Graph',
      title: 'Interactive Evidence Topography',
      desc: 'Visualize relational graphs linking entities, indicators, and external intelligence with verifiable provenance.',
      highlight: 'Multi-node visual forensics defensible in formal incident reviews.'
    },
    {
      num: '04',
      tag: 'Actionable Playbook',
      title: 'Defensible Incident Containment',
      desc: 'Generates structured step-by-step containment checklists with verified official contact numbers and domain registries.',
      highlight: 'Explicit honest uncertainty scoring when evidence is partial.'
    }
  ];

  return (
    <div className="space-y-24 pb-20">
      
      {/* Editorial Luxury Hero Section */}
      <section className="relative pt-6 sm:pt-14 pb-8 text-center max-w-5xl mx-auto px-4">
        
        {/* Subtle pill badge */}
        <div className="inline-flex items-center space-x-2 px-3.5 py-1.5 rounded-full bg-[#EFECE3] border border-[#DDD7C7] text-[#474235] text-xs font-mono font-medium mb-8 shadow-xs">
          <Sparkles className="w-3.5 h-3.5 text-[#2A5C37]" />
          <span>Evidence-First Intelligence Architecture</span>
        </div>

        {/* Hero Title (Preserves E2E Test Query Target: 'Investigate Suspicious Messages') */}
        <h1 className="font-serif text-4xl sm:text-7xl font-bold tracking-tight text-[#171A1C] mb-6 leading-[1.08]">
          Investigate Suspicious Messages <br />
          <span className="italic font-normal text-[#2A5C37]">
            Before You Send Money or Trust An Identity
          </span>
        </h1>

        <p className="text-base sm:text-lg text-[#5F5849] max-w-2xl mx-auto mb-10 leading-relaxed font-sans">
          Not an ambiguous scam guesser. TrustTrace extracts discrete claims, inspects infrastructure indicators, verifies identity contradictions, and generates defensible evidence graphs with actionable next steps.
        </p>

        {/* Hero Action Buttons (Preserves 'Start Investigation') */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <Link
            to="/investigate/new"
            className="w-full sm:w-auto inline-flex items-center justify-center space-x-2.5 px-7 py-3.5 rounded-full text-sm font-semibold bg-[#182B1B] hover:bg-[#253F29] text-[#FAF8F5] shadow-[0_10px_25px_-5px_rgba(24,43,27,0.3)] transition-all hover:-translate-y-0.5 cursor-pointer"
          >
            <span>Start Investigation</span>
            <ArrowRight className="w-4 h-4 text-[#C4DDBC]" />
          </Link>
          <Link
            to="/dashboard"
            className="w-full sm:w-auto inline-flex items-center justify-center space-x-2 px-7 py-3.5 rounded-full text-sm font-medium bg-[#FAF8F5] hover:bg-[#EFECE3] text-[#343026] border border-[#DDD7C7] shadow-xs transition-all cursor-pointer"
          >
            <Eye className="w-4 h-4 text-[#736B59]" />
            <span>View Forensics Dashboard</span>
          </Link>
        </div>

        {/* Hero Live Forensic Banner Card */}
        <div className="mt-14 max-w-4xl mx-auto rounded-3xl p-6 sm:p-8 bg-[#182B1B] text-[#FAF8F5] shadow-[0_20px_50px_-15px_rgba(18,22,20,0.4)] border border-[#2B472F] relative overflow-hidden text-left">
          <div className="absolute top-0 right-0 w-96 h-96 bg-[#2B4E32]/20 rounded-full blur-3xl pointer-events-none" />
          
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between pb-6 border-b border-[#2C4830]/80 gap-4">
            <div className="flex items-center space-x-3">
              <div className="w-3 h-3 rounded-full bg-[#52D172] animate-pulse" />
              <span className="font-mono text-xs uppercase tracking-wider text-[#A7C9A4]">Autonomous Forensic Pipeline Active</span>
            </div>
            <div className="flex items-center space-x-2 text-xs font-mono text-[#D7DFD6]">
              <span>Latency: 420ms</span>
              <span>•</span>
              <span>SSRF Filter: Active</span>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 pt-6">
            <div>
              <div className="text-xs uppercase font-mono text-[#8FA88D] mb-1">Claim Analysis</div>
              <div className="font-serif text-2xl font-bold text-[#FFFFFF]">100% Deterministic</div>
              <p className="text-xs text-[#B2CBB0] mt-1 font-sans">Every risk point traces back to concrete evidence records.</p>
            </div>
            <div>
              <div className="text-xs uppercase font-mono text-[#8FA88D] mb-1">Network Sandbox</div>
              <div className="font-serif text-2xl font-bold text-[#FFFFFF]">Zero Untrusted Exec</div>
              <p className="text-xs text-[#B2CBB0] mt-1 font-sans">RFC 1918 & Cloud metadata isolation on all outbound scans.</p>
            </div>
            <div>
              <div className="text-xs uppercase font-mono text-[#8FA88D] mb-1">Evidence Depth</div>
              <div className="font-serif text-2xl font-bold text-[#FFFFFF]">Bipartite Graph</div>
              <p className="text-xs text-[#B2CBB0] mt-1 font-sans">Structured relationships between actors, claims, & proof.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Interactive 01/04 Forensics Capabilities (Inspired by Kashflow video) */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 pb-6 border-b border-[#E4DFD3]">
          <div>
            <span className="text-xs font-mono uppercase tracking-widest text-[#736B59]">System Architecture</span>
            <h2 className="font-serif text-3xl sm:text-5xl font-bold text-[#171A1C] mt-2">
              Forensics Intelligence In Action
            </h2>
          </div>
          <p className="text-sm text-[#5F5849] max-w-md mt-4 md:mt-0 font-sans">
            Explore how TrustTrace dismantles sophisticated deception through multi-tier correlation and verifiable evidence trails.
          </p>
        </div>

        {/* 4 Feature Columns / Tabs */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          {capabilities.map((cap, idx) => {
            const isSelected = activeFeature === idx;
            return (
              <div
                key={cap.num}
                onClick={() => setActiveFeature(idx)}
                className={`p-6 rounded-2xl cursor-pointer transition-all duration-300 flex flex-col justify-between border ${
                  isSelected 
                    ? 'bg-[#182B1B] text-[#FAF8F5] border-[#25422A] shadow-xl -translate-y-1' 
                    : 'bg-[#FAF8F5] text-[#171A1C] border-[#E4DFD3] hover:border-[#C9C2AF] hover:bg-[#F3EFE6]'
                }`}
              >
                <div>
                  <div className="flex items-center justify-between mb-6">
                    <span className={`font-mono text-sm font-bold ${isSelected ? 'text-[#8DBA89]' : 'text-[#8C8472]'}`}>
                      {cap.num} / 04
                    </span>
                    <span className={`text-[10px] font-mono uppercase px-2 py-0.5 rounded-full ${
                      isSelected ? 'bg-[#27442B] text-[#BEE0BA]' : 'bg-[#EAE5D8] text-[#595243]'
                    }`}>
                      {cap.tag}
                    </span>
                  </div>
                  <h3 className={`font-serif text-xl font-bold mb-3 ${isSelected ? 'text-white' : 'text-[#171A1C]'}`}>
                    {cap.title}
                  </h3>
                  <p className={`text-xs leading-relaxed font-sans ${isSelected ? 'text-[#C5D9C2]' : 'text-[#635C4E]'}`}>
                    {cap.desc}
                  </p>
                </div>

                <div className={`mt-6 pt-4 border-t text-[11px] font-mono ${
                  isSelected ? 'border-[#2C4830] text-[#9FC49B]' : 'border-[#EAE5D8] text-[#7A7260]'
                }`}>
                  {cap.highlight}
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* The Six Core Forensics Questions Grid */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <span className="text-xs font-mono uppercase tracking-widest text-[#736B59]">Defensible Methodology</span>
          <h2 className="font-serif text-3xl sm:text-4xl font-bold text-[#171A1C] mt-1">The Six Core Forensics Questions</h2>
          <p className="text-[#5F5849] mt-2 text-sm max-w-xl mx-auto font-sans">
            Traditional tools give you an arbitrary "85% Scam" verdict. TrustTrace answers the questions that matter in real-world fraud investigations:
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="p-6 rounded-2xl bg-[#FAF8F5] border border-[#E4DFD3] shadow-xs hover:border-[#CCC4B2] transition-all">
            <div className="w-10 h-10 rounded-xl bg-[#E8EFE5] text-[#245229] flex items-center justify-center mb-4 border border-[#CADBC6]">
              <FileCheck2 className="w-5 h-5" />
            </div>
            <h3 className="font-serif text-lg font-bold text-[#171A1C] mb-2">1. Discrete Claim Extraction</h3>
            <p className="text-xs text-[#5F5849] leading-relaxed">
              Deconstructs untrusted communications into testable assertions (claimed package hold, urgency penalty, payment demand).
            </p>
          </div>

          <div className="p-6 rounded-2xl bg-[#FAF8F5] border border-[#E4DFD3] shadow-xs hover:border-[#CCC4B2] transition-all">
            <div className="w-10 h-10 rounded-xl bg-[#FDEEEE] text-[#A62626] flex items-center justify-center mb-4 border border-[#F6CACA]">
              <Scale className="w-5 h-5" />
            </div>
            <h3 className="font-serif text-lg font-bold text-[#171A1C] mb-2">2. Contradiction Analysis</h3>
            <p className="text-xs text-[#5F5849] leading-relaxed">
              Proves identity mismatch directly: when claimed authority is "USPS" but target destination resolves to an unauthorized ".top" or bare IP domain.
            </p>
          </div>

          <div className="p-6 rounded-2xl bg-[#FAF8F5] border border-[#E4DFD3] shadow-xs hover:border-[#CCC4B2] transition-all">
            <div className="w-10 h-10 rounded-xl bg-[#EBEBF7] text-[#343A8C] flex items-center justify-center mb-4 border border-[#D0D0EF]">
              <Network className="w-5 h-5" />
            </div>
            <h3 className="font-serif text-lg font-bold text-[#171A1C] mb-2">3. Evidence Correlation Graph</h3>
            <p className="text-xs text-[#5F5849] leading-relaxed">
              Visual interactive graph mapping nodes between entities, claims, indicators, lookups, and contradictions.
            </p>
          </div>

          <div className="p-6 rounded-2xl bg-[#FAF8F5] border border-[#E4DFD3] shadow-xs hover:border-[#CCC4B2] transition-all">
            <div className="w-10 h-10 rounded-xl bg-[#FEF6E9] text-[#A66F17] flex items-center justify-center mb-4 border border-[#F9E2BC]">
              <AlertTriangle className="w-5 h-5" />
            </div>
            <h3 className="font-serif text-lg font-bold text-[#171A1C] mb-2">4. Transparent Risk Scoring</h3>
            <p className="text-xs text-[#5F5849] leading-relaxed">
              Documented, deterministic severity weights and evidence confidence coverage rather than an unverifiable black box.
            </p>
          </div>

          <div className="p-6 rounded-2xl bg-[#FAF8F5] border border-[#E4DFD3] shadow-xs hover:border-[#CCC4B2] transition-all">
            <div className="w-10 h-10 rounded-xl bg-[#E8F4F8] text-[#1B637B] flex items-center justify-center mb-4 border border-[#C5E4EF]">
              <HelpCircle className="w-5 h-5" />
            </div>
            <h3 className="font-serif text-lg font-bold text-[#171A1C] mb-2">5. Honest Uncertainty Reporting</h3>
            <p className="text-xs text-[#5F5849] leading-relaxed">
              Explicitly categorizes what remains unverified. Absence of a threat-intel match is never misrepresented as proof of safety.
            </p>
          </div>

          <div className="p-6 rounded-2xl bg-[#FAF8F5] border border-[#E4DFD3] shadow-xs hover:border-[#CCC4B2] transition-all">
            <div className="w-10 h-10 rounded-xl bg-[#E5F3EB] text-[#185E34] flex items-center justify-center mb-4 border border-[#BEDECB]">
              <Lock className="w-5 h-5" />
            </div>
            <h3 className="font-serif text-lg font-bold text-[#171A1C] mb-2">6. Actionable Response Playbook</h3>
            <p className="text-xs text-[#5F5849] leading-relaxed">
              Generates personalized verification checklists linked to exact findings, including independent official channel verification and incident response steps.
            </p>
          </div>
        </div>
      </section>

      {/* Security and Privacy Assurance */}
      <section className="max-w-4xl mx-auto px-4">
        <div className="p-8 rounded-3xl bg-[#FAF8F5] border border-[#E4DFD3] shadow-sm flex flex-col sm:flex-row items-start gap-6">
          <div className="p-3.5 bg-[#E8EFE5] border border-[#CADBC6] rounded-2xl text-[#1E4E26] shrink-0">
            <Lock className="w-6 h-6" />
          </div>
          <div>
            <h3 className="font-serif text-xl font-bold text-[#171A1C] mb-2">SSRF Defense & Privacy Isolation</h3>
            <p className="text-xs sm:text-sm text-[#5F5849] leading-relaxed mb-4">
              TrustTrace never runs browser sandboxes or downloads untrusted binaries on user targets. Outbound network checks enforce strict RFC 1918 / Cloud Metadata (169.254.169.254) blocking. Client phone numbers and personal emails can be automatically redacted before AI extraction.
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs font-mono text-[#38332A]">
              <div className="flex items-center space-x-2">
                <CheckCircle2 className="w-4 h-4 text-[#266336]" />
                <span>Zero Execution of Untrusted URLs</span>
              </div>
              <div className="flex items-center space-x-2">
                <CheckCircle2 className="w-4 h-4 text-[#266336]" />
                <span>Transparent Simulated Demo Lab Fallback</span>
              </div>
            </div>
          </div>
        </div>
      </section>

    </div>
  );
};

