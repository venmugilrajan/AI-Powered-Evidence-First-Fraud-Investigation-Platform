import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { 
  ShieldAlert, 
  FileCheck2, 
  Network, 
  Scale, 
  Lock, 
  ArrowRight, 
  ArrowLeft,
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
import { ParticleBackground } from '../components/ParticleBackground';

export const LandingPage: React.FC = () => {
  const [activeSlide, setActiveSlide] = useState(0);

  const capabilities = [
    {
      num: '01',
      tag: 'AI Claim Extraction',
      title: 'Discrete Claim Extraction',
      subtitle: 'AI Monitoring',
      desc: 'Deconstructs untrusted communications into testable assertions (claimed package hold, urgency penalty, payment demand).',
      img: '/card_tree.jpg',
      badge: 'Continuous Heuristics'
    },
    {
      num: '02',
      tag: 'Contradiction Engine',
      title: 'Authority Contradiction',
      subtitle: 'Contradiction Engine',
      desc: 'Proves identity mismatch directly: when claimed authority is "USPS" but target destination resolves to an unauthorized ".top" or bare IP domain.',
      img: '/card_mountain.jpg',
      badge: 'Zero Spoofing'
    },
    {
      num: '03',
      tag: 'Evidence Graph',
      title: 'Evidence Correlation Graph',
      subtitle: 'Provenance Graph',
      desc: 'Visual interactive graph mapping nodes between entities, claims, indicators, lookups, and contradictions.',
      img: '/card_river.jpg',
      badge: 'Graph Provenance'
    },
    {
      num: '04',
      tag: 'Actionable Playbook',
      title: 'Incident Containment Checklist',
      subtitle: 'Response Engine',
      desc: 'Generates personalized verification checklists linked to exact findings, including independent official channel verification.',
      img: '/hero_topography.jpg',
      badge: 'Verifiable Protocol'
    }
  ];

  const handleNext = () => {
    setActiveSlide((prev) => (prev + 1) % capabilities.length);
  };

  const handlePrev = () => {
    setActiveSlide((prev) => (prev - 1 + capabilities.length) % capabilities.length);
  };

  return (
    <div className="space-y-28 pb-24">
      
      {/* ---------------- 1. EDITORIAL HERO SECTION WITH MOVING TERRAIN ---------------- */}
      <section className="relative rounded-[2.5rem] bg-[#121614] text-[#FAF8F5] overflow-hidden border border-[#2B472F] shadow-2xl min-h-[640px] flex flex-col justify-between p-8 sm:p-14">
        
        {/* Animated undulating topographical particle mesh */}
        <ParticleBackground theme="dark" className="opacity-75 z-0" />
        
        {/* Real luminous terrain topography layer with subtle breath animation */}
        <div 
          className="absolute inset-0 bg-cover bg-bottom opacity-40 mix-blend-screen pointer-events-none transition-all duration-1000 scale-105"
          style={{ backgroundImage: `url('/hero_topography.jpg')` }}
        />

        {/* Ambient Top Glow */}
        <div className="absolute -top-32 left-1/2 -translate-x-1/2 w-[600px] h-[300px] bg-[#618E66]/20 rounded-full blur-[120px] pointer-events-none" />

        {/* Hero Top Metadata Bar */}
        <div className="relative z-10 flex items-center justify-between border-b border-[#2C4830]/80 pb-6">
          <div className="inline-flex items-center space-x-2 px-3.5 py-1.5 rounded-full bg-[#182B1B]/80 border border-[#2F5234] text-[#A7C9A4] text-xs font-mono font-medium backdrop-blur-md">
            <span className="w-2 h-2 rounded-full bg-[#52D172] animate-pulse" />
            <span>AI Forensics Architecture v1.4</span>
          </div>

          <div className="hidden sm:flex items-center space-x-6 text-xs font-mono text-[#D7DFD6]">
            <span>Zero Untrusted Exec</span>
            <span>•</span>
            <span>Deterministic Scoring</span>
            <span>•</span>
            <span>RFC 1918 Isolated</span>
          </div>
        </div>

        {/* Hero Headline & Editorial Content (Preserves E2E Test Query Target: 'Investigate Suspicious Messages') */}
        <div className="relative z-10 my-auto text-center max-w-4xl mx-auto py-12">
          <h1 className="font-serif text-4xl sm:text-7xl lg:text-8xl font-bold tracking-tight text-[#FFFFFF] mb-6 leading-[1.04]">
            Investigate Suspicious Messages <br />
            <span className="italic font-normal text-[#C4DDBC]">
              Before You Send Money or Trust An Identity
            </span>
          </h1>

          <p className="text-base sm:text-lg text-[#C8D6C6] max-w-2xl mx-auto mb-10 leading-relaxed font-sans font-light">
            Not a generic scam classifier. TrustTrace systematically extracts discrete claims, inspects infrastructure indicators, verifies identity contradictions, and generates defensible evidence graphs with actionable next steps.
          </p>

          {/* Hero Action Buttons (Preserves 'Start Investigation') */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link
              to="/investigate/new"
              className="w-full sm:w-auto inline-flex items-center justify-center space-x-3 px-8 py-4 rounded-full text-sm font-semibold bg-[#FAF8F5] hover:bg-[#EFECE3] text-[#121614] shadow-xl hover:-translate-y-0.5 transition-all cursor-pointer group"
            >
              <span>Start Investigation</span>
              <div className="w-6 h-6 rounded-full bg-[#182B1B] text-[#FAF8F5] flex items-center justify-center group-hover:translate-x-1 transition-transform">
                <ArrowRight className="w-3.5 h-3.5" />
              </div>
            </Link>
            <Link
              to="/dashboard"
              className="w-full sm:w-auto inline-flex items-center justify-center space-x-2 px-7 py-4 rounded-full text-sm font-medium bg-[#1C261F]/80 hover:bg-[#253629] text-[#E4EDE2] border border-[#355239] backdrop-blur-md transition-all cursor-pointer"
            >
              <Eye className="w-4 h-4 text-[#A7C9A4]" />
              <span>View Forensics Dashboard</span>
            </Link>
          </div>
        </div>

        {/* Hero Bottom Telemetry Strip */}
        <div className="relative z-10 grid grid-cols-2 sm:grid-cols-4 gap-4 pt-6 border-t border-[#2C4830]/80 text-xs font-mono">
          <div>
            <span className="text-[#8FA88D] block text-[10px] uppercase">Latency</span>
            <span className="text-white font-semibold">420ms Pipeline</span>
          </div>
          <div>
            <span className="text-[#8FA88D] block text-[10px] uppercase">Provenance Depth</span>
            <span className="text-white font-semibold">100% Attributed</span>
          </div>
          <div>
            <span className="text-[#8FA88D] block text-[10px] uppercase">Model Fallback</span>
            <span className="text-white font-semibold">Self-Healing</span>
          </div>
          <div>
            <span className="text-[#8FA88D] block text-[10px] uppercase">Security Sandbox</span>
            <span className="text-white font-semibold">RFC 1918 Guard</span>
          </div>
        </div>

      </section>


      {/* ---------------- 2. KASHFLOW AI CAPABILITIES CAROUSEL (01/04 STYLE) ---------------- */}
      <section className="relative rounded-[2.5rem] bg-[#FAF8F5] border border-[#E4DFD3] p-8 sm:p-14 shadow-lg overflow-hidden">
        
        {/* Subtle warm canvas moving terrain backdrop */}
        <ParticleBackground theme="gold" className="opacity-40 z-0" />

        <div className="relative z-10">
          
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 pb-6 border-b border-[#E2DDCF]">
            <div>
              <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-[#EFECE3] border border-[#DDD7C7] text-[#474235] text-[11px] font-mono font-medium mb-3">
                <Sparkles className="w-3 h-3 text-[#245229]" />
                <span>Forensic Intelligence Architecture</span>
              </div>
              <h2 className="font-serif text-3xl sm:text-5xl font-bold text-[#171A1C] tracking-tight">
                AI-Powered Forensics Visibility
              </h2>
            </div>

            {/* Slider Navigation Controls matching Kashflow Video (Arrows & Step counter) */}
            <div className="flex items-center space-x-6 mt-6 md:mt-0">
              <div className="flex items-baseline space-x-1">
                <span className="font-serif text-3xl font-bold text-[#171A1C] leading-none">
                  {capabilities[activeSlide].num}
                </span>
                <span className="font-mono text-sm text-[#8C8472]">/04</span>
              </div>

              <div className="flex items-center space-x-2">
                <button
                  onClick={handlePrev}
                  className="w-10 h-10 rounded-full bg-[#EFECE3] hover:bg-[#E2DDCF] text-[#171A1C] border border-[#DDD7C7] flex items-center justify-center transition-all cursor-pointer active:scale-95"
                  title="Previous capability"
                >
                  <ArrowLeft className="w-4 h-4" />
                </button>
                <button
                  onClick={handleNext}
                  className="w-10 h-10 rounded-full bg-[#182B1B] hover:bg-[#253F29] text-white flex items-center justify-center transition-all cursor-pointer shadow-md active:scale-95"
                  title="Next capability"
                >
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>

          {/* Cards Grid / Carousel View */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[0, 1, 2].map((offset) => {
              const itemIndex = (activeSlide + offset) % capabilities.length;
              const cap = capabilities[itemIndex];
              const isLead = offset === 0;

              return (
                <div
                  key={`${cap.num}-${offset}`}
                  onClick={() => setActiveSlide(itemIndex)}
                  className={`rounded-3xl p-6 transition-all duration-500 flex flex-col justify-between overflow-hidden border cursor-pointer relative group ${
                    isLead 
                      ? 'bg-[#182B1B] text-[#FAF8F5] border-[#2E4F32] shadow-xl md:-translate-y-2' 
                      : 'bg-[#F2EFE8] text-[#171A1C] border-[#E2DDCF] hover:bg-[#ECE8DE]'
                  }`}
                >
                  {/* Visual Imagery extracted directly from Dribbble inspiration */}
                  <div className="relative h-56 rounded-2xl overflow-hidden mb-6 border border-[#2E4F32]/20">
                    <img 
                      src={cap.img} 
                      alt={cap.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" 
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
                    
                    <span className="absolute top-3 left-3 px-2.5 py-1 rounded-full bg-black/60 backdrop-blur-md text-white text-[10px] font-mono uppercase tracking-wider border border-white/20">
                      {cap.subtitle}
                    </span>

                    <span className="absolute bottom-3 right-3 px-2 py-0.5 rounded-full bg-white/20 backdrop-blur-md text-white text-[10px] font-mono">
                      {cap.badge}
                    </span>
                  </div>

                  <div>
                    <div className="flex items-center justify-between mb-2">
                      <span className={`text-xs font-mono font-semibold ${isLead ? 'text-[#A7C9A4]' : 'text-[#8C8472]'}`}>
                        {cap.tag}
                      </span>
                      <span className="font-mono text-xs font-bold text-[#8C8472]">
                        {cap.num}
                      </span>
                    </div>

                    <h3 className={`font-serif text-xl font-bold mb-2 ${isLead ? 'text-white' : 'text-[#171A1C]'}`}>
                      {cap.title}
                    </h3>

                    <p className={`text-xs leading-relaxed font-sans ${isLead ? 'text-[#C8D6C6]' : 'text-[#5F5849]'}`}>
                      {cap.desc}
                    </p>
                  </div>

                  <div className={`mt-6 pt-4 border-t flex items-center justify-between text-xs font-semibold ${
                    isLead ? 'border-[#2C4830] text-[#A7C9A4]' : 'border-[#DDD7C7] text-[#182B1B]'
                  }`}>
                    <span>Inspect Forensics Spec</span>
                    <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                  </div>
                </div>
              );
            })}
          </div>

        </div>
      </section>


      {/* ---------------- 3. BUILT FOR FORENSIC CLARITY (DARK/LIGHT 3-CARD SPLIT) ---------------- */}
      <section className="rounded-[2.5rem] bg-[#121614] text-[#FAF8F5] p-8 sm:p-14 border border-[#2B472F] shadow-2xl relative overflow-hidden">
        
        {/* Subtle particle effect */}
        <ParticleBackground theme="dark" className="opacity-30 z-0" />

        <div className="relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          <div className="lg:col-span-5 space-y-6">
            <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-[#182B1B] border border-[#2F5234] text-[#A7C9A4] text-xs font-mono font-medium">
              <span>Verified Evidence Triangulation</span>
            </div>

            <h2 className="font-serif text-4xl sm:text-6xl font-bold text-white tracking-tight leading-tight">
              Built For <br />
              <span className="italic font-normal text-[#C4DDBC]">Defensible Proof</span>
            </h2>

            <p className="text-sm text-[#C8D6C6] leading-relaxed font-sans font-light">
              TrustTrace helps analysts and individuals comprehend fraud mechanics, verify contradictory claims in real time, and isolate high-risk payload destinations before money is wired or credentials surrendered.
            </p>

            <div className="pt-6 border-t border-[#2C4830] grid grid-cols-3 gap-4 font-mono text-center">
              <div>
                <span className="font-serif text-2xl font-bold text-white block">100%</span>
                <span className="text-[10px] text-[#8FA88D] uppercase">Attributed</span>
              </div>
              <div>
                <span className="font-serif text-2xl font-bold text-white block">0-Sec</span>
                <span className="text-[10px] text-[#8FA88D] uppercase">Browser Exec</span>
              </div>
              <div>
                <span className="font-serif text-2xl font-bold text-white block">34/34</span>
                <span className="text-[10px] text-[#8FA88D] uppercase">Tests Passing</span>
              </div>
            </div>
          </div>

          <div className="lg:col-span-7 space-y-5">
            
            {/* Card 1: Dark Forest */}
            <div className="p-6 rounded-3xl bg-[#182B1B] border border-[#2E4F32] hover:border-[#4B7D50] transition-all">
              <div className="flex items-center justify-between mb-2">
                <h3 className="font-serif text-xl font-bold text-white">Continuous Claims Dissection</h3>
                <span className="text-[10px] font-mono uppercase px-2 py-0.5 rounded-full bg-[#27442B] text-[#BEE0BA]">Active Engine</span>
              </div>
              <p className="text-xs text-[#C8D6C6] leading-relaxed mb-4">
                Monitor every incoming assertion in real time with linguistic and syntactic contradiction tracking across your operational workflows.
              </p>
              <Link to="/investigate/new" className="text-xs font-semibold text-[#A7C9A4] hover:text-white inline-flex items-center gap-1.5">
                <span>View Discrete Claims</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </div>

            {/* Card 2: Warm Champagne Card (Accent Contrast like Kashflow video) */}
            <div className="p-6 rounded-3xl bg-[#FAF8F5] text-[#171A1C] border border-[#E4DFD3] shadow-md hover:bg-white transition-all">
              <div className="flex items-center justify-between mb-2">
                <h3 className="font-serif text-xl font-bold text-[#171A1C]">Predictive Infrastructure Scoring</h3>
                <span className="text-[10px] font-mono uppercase px-2 py-0.5 rounded-full bg-[#EAE5D8] text-[#595243]">Risk Models</span>
              </div>
              <p className="text-xs text-[#5F5849] leading-relaxed mb-4">
                Forecast identity mismatch, domain age anomalies, and malicious hosting infrastructure with deterministic risk attribution.
              </p>
              <Link to="/dashboard" className="text-xs font-semibold text-[#182B1B] hover:underline inline-flex items-center gap-1.5">
                <span>View Risk Distribution</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </div>

            {/* Card 3: Deep Obsidian Card */}
            <div className="p-6 rounded-3xl bg-[#141A16] border border-[#28382B] hover:border-[#3B543F] transition-all">
              <div className="flex items-center justify-between mb-2">
                <h3 className="font-serif text-xl font-bold text-white">Contradiction Threat Detection</h3>
                <span className="text-[10px] font-mono uppercase px-2 py-0.5 rounded-full bg-[#27442B] text-[#BEE0BA]">Verified</span>
              </div>
              <p className="text-xs text-[#C8D6C6] leading-relaxed mb-4">
                Identify punycode impersonation, urgency extortion patterns, and unauthorized bare-IP redirection before damages occur.
              </p>
              <Link to="/history" className="text-xs font-semibold text-[#A7C9A4] hover:text-white inline-flex items-center gap-1.5">
                <span>Inspect Detection Dossiers</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </div>

          </div>

        </div>

      </section>


      {/* ---------------- 4. THE SIX CORE FORENSICS QUESTIONS (GRID) ---------------- */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <span className="text-xs font-mono uppercase tracking-widest text-[#736B59]">Defensible Methodology</span>
          <h2 className="font-serif text-3xl sm:text-4xl font-bold text-[#171A1C] mt-1">The Six Core Forensics Questions</h2>
          <p className="text-[#5F5849] mt-2 text-sm max-w-xl mx-auto font-sans">
            Traditional tools give you an arbitrary "85% Scam" verdict. TrustTrace answers the questions that matter in real-world fraud investigations:
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="p-6 rounded-3xl bg-[#FAF8F5] border border-[#E4DFD3] shadow-xs hover:border-[#CCC4B2] transition-all">
            <div className="w-10 h-10 rounded-xl bg-[#E8EFE5] text-[#245229] flex items-center justify-center mb-4 border border-[#CADBC6]">
              <FileCheck2 className="w-5 h-5" />
            </div>
            <h3 className="font-serif text-lg font-bold text-[#171A1C] mb-2">1. Discrete Claim Extraction</h3>
            <p className="text-xs text-[#5F5849] leading-relaxed">
              Deconstructs untrusted communications into testable assertions (claimed package hold, urgency penalty, payment demand).
            </p>
          </div>

          <div className="p-6 rounded-3xl bg-[#FAF8F5] border border-[#E4DFD3] shadow-xs hover:border-[#CCC4B2] transition-all">
            <div className="w-10 h-10 rounded-xl bg-[#FDEEEE] text-[#A62626] flex items-center justify-center mb-4 border border-[#F6CACA]">
              <Scale className="w-5 h-5" />
            </div>
            <h3 className="font-serif text-lg font-bold text-[#171A1C] mb-2">2. Contradiction Analysis</h3>
            <p className="text-xs text-[#5F5849] leading-relaxed">
              Proves identity mismatch directly: when claimed authority is "USPS" but target destination resolves to an unauthorized ".top" or bare IP domain.
            </p>
          </div>

          <div className="p-6 rounded-3xl bg-[#FAF8F5] border border-[#E4DFD3] shadow-xs hover:border-[#CCC4B2] transition-all">
            <div className="w-10 h-10 rounded-xl bg-[#EBEBF7] text-[#343A8C] flex items-center justify-center mb-4 border border-[#D0D0EF]">
              <Network className="w-5 h-5" />
            </div>
            <h3 className="font-serif text-lg font-bold text-[#171A1C] mb-2">3. Evidence Correlation Graph</h3>
            <p className="text-xs text-[#5F5849] leading-relaxed">
              Visual interactive graph mapping nodes between entities, claims, indicators, lookups, and contradictions.
            </p>
          </div>

          <div className="p-6 rounded-3xl bg-[#FAF8F5] border border-[#E4DFD3] shadow-xs hover:border-[#CCC4B2] transition-all">
            <div className="w-10 h-10 rounded-xl bg-[#FEF6E9] text-[#A66F17] flex items-center justify-center mb-4 border border-[#F9E2BC]">
              <AlertTriangle className="w-5 h-5" />
            </div>
            <h3 className="font-serif text-lg font-bold text-[#171A1C] mb-2">4. Transparent Risk Scoring</h3>
            <p className="text-xs text-[#5F5849] leading-relaxed">
              Documented, deterministic severity weights and evidence confidence coverage rather than an unverifiable black box.
            </p>
          </div>

          <div className="p-6 rounded-3xl bg-[#FAF8F5] border border-[#E4DFD3] shadow-xs hover:border-[#CCC4B2] transition-all">
            <div className="w-10 h-10 rounded-xl bg-[#E8F4F8] text-[#1B637B] flex items-center justify-center mb-4 border border-[#C5E4EF]">
              <HelpCircle className="w-5 h-5" />
            </div>
            <h3 className="font-serif text-lg font-bold text-[#171A1C] mb-2">5. Honest Uncertainty Reporting</h3>
            <p className="text-xs text-[#5F5849] leading-relaxed">
              Explicitly categorizes what remains unverified. Absence of a threat-intel match is never misrepresented as proof of safety.
            </p>
          </div>

          <div className="p-6 rounded-3xl bg-[#FAF8F5] border border-[#E4DFD3] shadow-xs hover:border-[#CCC4B2] transition-all">
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

      {/* ---------------- 5. SSRF DEFENSE & PRIVACY ASSURANCE ---------------- */}
      <section className="max-w-4xl mx-auto px-4">
        <div className="p-8 rounded-3xl bg-[#FAF8F5] border border-[#E4DFD3] shadow-sm flex flex-col sm:flex-row items-start gap-6">
          <div className="p-3.5 bg-[#E8EFE5] border border-[#CADBC6] rounded-2xl text-[#1E4E26] shrink-0">
            <Lock className="w-6 h-6" />
          </div>
          <div>
            <h3 className="font-serif text-xl font-bold text-[#171A1C] mb-2">SSRF Defense & Privacy Isolation</h3>
            <p className="text-xs sm:text-sm text-[#5F5849] leading-relaxed mb-4 font-sans">
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

