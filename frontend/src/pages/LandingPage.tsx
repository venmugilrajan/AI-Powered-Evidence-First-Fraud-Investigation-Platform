import React, { useState, useRef } from 'react';
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
  Send
} from 'lucide-react';

export const LandingPage: React.FC = () => {
  const [activeCardIndex, setActiveCardIndex] = useState(0);
  const [activeDarkCard, setActiveDarkCard] = useState('clarity');
  const [footerTheme, setFooterTheme] = useState<'dark' | 'light'>('light');

  const cards = [
    {
      num: '01',
      badge: 'AI Monitoring',
      title: 'Claim Extraction',
      subtitle: 'Discrete Assertion Radar',
      desc: 'Deconstructs untrusted messages into testable claims (delivery fees, urgent account freezes, spoofed identity).',
      img: '/assets/full_card_1_proper.jpg',
      art: '/assets/art_tree.jpg'
    },
    {
      num: '02',
      badge: 'Forecast Engine',
      title: 'Contradiction Analysis',
      subtitle: 'Real-Time Identity Proof',
      desc: 'Proves authority divergence when claimed authority conflicts with destination ASN, bare IP, or malicious registrar.',
      img: '/assets/full_card_2_proper.jpg',
      art: '/assets/art_mountain.jpg'
    },
    {
      num: '03',
      badge: 'Smart Insights',
      title: 'Evidence Graph',
      subtitle: 'Interactive Forensic Network',
      desc: 'Correlates entities, indicators, and threat intelligence in a verifiable visual graph with complete provenance.',
      img: '/assets/full_card_3_proper.jpg',
      art: '/assets/art_stream.jpg'
    },
    {
      num: '04',
      badge: 'Response Engine',
      title: 'Incident Containment',
      subtitle: 'Actionable Response Playbook',
      desc: 'Generates authenticated escalation checklists with official registry lookups and zero untrusted code execution.',
      img: '/assets/full_card_2_proper.jpg',
      art: '/assets/art_mountain.jpg'
    }
  ];

  const handlePrev = () => {
    setActiveCardIndex((prev) => (prev === 0 ? cards.length - 1 : prev - 1));
  };

  const handleNext = () => {
    setActiveCardIndex((prev) => (prev === cards.length - 1 ? 0 : prev + 1));
  };

  return (
    <div className="space-y-24 pb-20 -mt-4">
      
      {/* ------------------------------------------------------------- */}
      {/* 1. HERO SECTION: Moving Mountain Video Canvas (Like Video t=0s) */}
      {/* ------------------------------------------------------------- */}
      <section className="relative w-full rounded-3xl overflow-hidden min-h-[620px] sm:min-h-[720px] flex flex-col justify-between p-6 sm:p-12 shadow-2xl border border-[#2B472F]/50">
        
        {/* Moving Background Video */}
        <div className="bg-video-container">
          <video
            autoPlay
            loop
            muted
            playsInline
            poster="/assets/hero_mountain_screen.jpg"
            className="w-full h-full object-cover brightness-[0.88] contrast-[1.05]"
          >
            <source src="/assets/hero_moving.mp4" type="video/mp4" />
          </video>
          {/* Subtle gradient vignette overlay */}
          <div className="absolute inset-0 bg-radial from-transparent via-black/30 to-black/70 pointer-events-none" />
        </div>

        {/* Minimal Hero Top Sub-Nav (Exact like video: About, Features, Logo, App, Contact) */}
        <div className="relative z-10 flex items-center justify-between text-xs font-serif tracking-widest text-[#E6E1D3]/90 pt-2">
          <div className="flex items-center space-x-6">
            <span className="hover:text-white transition-colors cursor-pointer">About</span>
            <span className="hover:text-white transition-colors cursor-pointer">Features</span>
          </div>
          
          <div className="flex items-center space-x-2">
            <div className="w-8 h-8 rounded-full bg-[#EAE5D8]/20 backdrop-blur-md border border-white/20 flex items-center justify-center">
              <ShieldAlert className="w-4 h-4 text-[#C4DDBC]" />
            </div>
          </div>

          <div className="flex items-center space-x-6">
            <Link to="/dashboard" className="hover:text-white transition-colors">App</Link>
            <Link to="/investigate/new" className="hover:text-white transition-colors">Contact</Link>
          </div>
        </div>

        {/* Center Hero Headline & Subtitle (Exact layout as "Your AI CFO") */}
        <div className="relative z-10 text-center max-w-4xl mx-auto my-auto py-12">
          
          {/* Badge */}
          <div className="inline-flex items-center space-x-2 px-4 py-1.5 rounded-full bg-white/10 backdrop-blur-md border border-white/20 text-[#FAF8F5] text-xs font-mono mb-6 shadow-sm">
            <Sparkles className="w-3.5 h-3.5 text-[#A8D3A4]" />
            <span>AI Evidence-First Forensics Engine</span>
          </div>

          {/* Headline (Preserves required search text for E2E tests: "Investigate Suspicious Messages") */}
          <h1 className="font-serif text-5xl sm:text-7xl lg:text-8xl font-normal tracking-tight text-[#FAF8F5] mb-6 leading-[1.04] drop-shadow-md">
            Investigate Suspicious Messages
          </h1>

          <p className="font-sans text-sm sm:text-base text-[#D7DFD6] max-w-2xl mx-auto mb-10 leading-relaxed font-light drop-shadow">
            Detect impersonation, analyze URL contradiction indicators, and uncover hidden identity fraud before damage occurs.
          </p>

          {/* Hero Floating Button: "Start Investigation" (Exact pill with right arrow circle) */}
          <div className="flex justify-center">
            <Link
              to="/investigate/new"
              className="group inline-flex items-center space-x-3 pl-6 pr-2.5 py-2.5 rounded-full bg-[#FAF8F5]/90 hover:bg-[#FAF8F5] text-[#182B1B] font-serif text-sm font-medium shadow-xl backdrop-blur-md transition-all hover:scale-[1.02] cursor-pointer"
            >
              <span>Start Investigation</span>
              <div className="w-8 h-8 rounded-full bg-[#182B1B] text-[#FAF8F5] flex items-center justify-center group-hover:translate-x-0.5 transition-transform">
                <ChevronRight className="w-4 h-4" />
              </div>
            </Link>
          </div>
        </div>

        {/* Hero Bottom Telemetry Strip */}
        <div className="relative z-10 flex flex-col sm:flex-row items-center justify-between text-xs font-mono text-[#D7DFD6]/80 pt-4 border-t border-white/10 gap-2">
          <div className="flex items-center space-x-2">
            <span className="w-2 h-2 rounded-full bg-[#52D172] animate-pulse" />
            <span>Autonomous Evidence Correlation: Online</span>
          </div>
          <div>SSRF Isolation Active • Zero Untrusted Code Exec</div>
        </div>
      </section>

      {/* ------------------------------------------------------------- */}
      {/* 2. SECTION 2: "AI-Powered Financial Visibility" (Video t=8s)   */}
      {/* Features moving mesh background & 01/04 card carousel         */}
      {/* ------------------------------------------------------------- */}
      <section className="relative w-full rounded-3xl overflow-hidden p-8 sm:p-16 border border-[#E4DFD3] shadow-xl">
        
        {/* Moving Topographic Mesh Background Video */}
        <div className="bg-video-container opacity-45">
          <video
            autoPlay
            loop
            muted
            playsInline
            poster="/assets/mesh_topography.jpg"
            className="w-full h-full object-cover"
          >
            <source src="/assets/mesh_moving.mp4" type="video/mp4" />
          </video>
        </div>

        <div className="relative z-10">
          
          {/* Top Pill Tag */}
          <div className="inline-flex items-center space-x-2 px-3.5 py-1.5 rounded-full bg-[#EAE5D8]/80 backdrop-blur-md border border-[#DDD7C7] text-[#474235] text-xs font-serif font-medium mb-4">
            <span>Forensic Intelligence</span>
          </div>

          {/* Section Heading */}
          <div className="flex flex-col lg:flex-row lg:items-end justify-between mb-12 gap-6">
            <div>
              <h2 className="font-serif text-4xl sm:text-6xl font-normal text-[#171A1C] leading-[1.08]">
                AI-Powered <br />
                <span className="italic">Forensic Visibility</span>
              </h2>
            </div>
            <p className="text-sm text-[#5F5849] max-w-md font-sans leading-relaxed">
              Autonomous claim deconstruction, contradiction analysis, and live multi-layered evidence correlation designed for defensible forensic outcomes.
            </p>
          </div>

          {/* Interactive 01/04 Carousel Stage (Exact layout matching video) */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            
            {/* Left Column: Number Step + Text + Prev/Next Controls */}
            <div className="lg:col-span-4 space-y-6">
              <div className="space-y-2">
                <div className="font-serif text-5xl font-light text-[#171A1C]">
                  {cards[activeCardIndex].num}<span className="text-[#8C8472] text-2xl font-mono">/04</span>
                </div>
                <h3 className="font-serif text-2xl font-bold text-[#171A1C]">
                  {cards[activeCardIndex].title}
                </h3>
                <p className="text-xs text-[#5F5849] leading-relaxed font-sans">
                  {cards[activeCardIndex].desc}
                </p>
              </div>

              {/* Prev / Next circular buttons (Exact like video) */}
              <div className="flex items-center space-x-3 pt-4">
                <button
                  onClick={handlePrev}
                  className="w-10 h-10 rounded-full bg-[#182B1B] text-[#FAF8F5] flex items-center justify-center hover:bg-[#253D29] transition-transform active:scale-95 cursor-pointer shadow-sm"
                  aria-label="Previous capability"
                >
                  <ChevronLeft className="w-5 h-5" />
                </button>
                <button
                  onClick={handleNext}
                  className="w-10 h-10 rounded-full bg-[#182B1B] text-[#FAF8F5] flex items-center justify-center hover:bg-[#253D29] transition-transform active:scale-95 cursor-pointer shadow-sm"
                  aria-label="Next capability"
                >
                  <ChevronRight className="w-5 h-5" />
                </button>
              </div>
            </div>

            {/* Right Column: 3 Overlapping Luxury Rounded Cards (Exact video visual) */}
            <div className="lg:col-span-8 flex gap-5 overflow-x-auto pb-4 pt-2 no-scrollbar">
              {cards.map((card, idx) => {
                const isActive = idx === activeCardIndex;
                return (
                  <div
                    key={idx}
                    onClick={() => setActiveCardIndex(idx)}
                    className={`relative w-64 sm:w-72 shrink-0 rounded-3xl overflow-hidden cursor-pointer transition-all duration-500 shadow-xl border ${
                      isActive 
                        ? 'scale-105 border-[#2A5C37] ring-2 ring-[#2A5C37]/30' 
                        : 'opacity-85 hover:opacity-100 border-[#E4DFD3] hover:scale-[1.02]'
                    }`}
                    style={{ aspectRatio: '9 / 14' }}
                  >
                    {/* Background card artwork image extracted from video */}
                    <img 
                      src={card.img} 
                      alt={card.title} 
                      className="absolute inset-0 w-full h-full object-cover" 
                    />
                    
                    {/* Glass badge on top */}
                    <div className="absolute top-4 left-4 z-10">
                      <span className="px-3.5 py-1 rounded-full bg-white/20 backdrop-blur-md border border-white/30 text-[#FAF8F5] text-[11px] font-serif">
                        {card.badge}
                      </span>
                    </div>

                    {/* Gradient bottom overlay with title */}
                    <div className="absolute inset-x-0 bottom-0 p-5 bg-gradient-to-t from-black/90 via-black/60 to-transparent text-white z-10">
                      <h4 className="font-serif text-lg font-bold leading-tight mb-1">
                        {card.title}
                      </h4>
                      <p className="text-[11px] text-[#D7DFD6] line-clamp-2 font-sans font-light">
                        {card.desc}
                      </p>
                    </div>
                  </div>
                );
              })}
            </div>

          </div>

        </div>
      </section>

      {/* ------------------------------------------------------------- */}
      {/* 3. SECTION 3: "Built For Financial Clarity" (Video t=6s)       */}
      {/* Dark luxury stage with interactive side tabs and telemetry    */}
      {/* ------------------------------------------------------------- */}
      <section className="w-full rounded-3xl bg-[#0F1311] text-[#FAF8F5] p-8 sm:p-16 border border-[#2B472F] shadow-2xl relative overflow-hidden">
        
        {/* Subtle radial emerald background glow */}
        <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-[#1E3E26]/30 rounded-full blur-3xl pointer-events-none" />

        <div className="relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          {/* Left Hero side of the dark stage */}
          <div className="lg:col-span-6 space-y-8">
            <div className="inline-flex items-center space-x-2 px-3.5 py-1.5 rounded-full bg-white/10 backdrop-blur-md border border-white/15 text-[#C4DDBC] text-xs font-serif">
              <span>Forensic Assurance</span>
            </div>

            <h2 className="font-serif text-4xl sm:text-6xl font-normal leading-[1.08] text-white">
              Built <span className="inline-block px-3 py-1 rounded-2xl bg-[#1E3E26] border border-[#35613D] text-xs font-mono align-middle text-[#A8D3A4] -translate-y-1">AI LAB</span> For <br />
              <span className="italic font-light">Defensible Clarity</span>
            </h2>

            <p className="text-sm text-[#A7C2A4] max-w-md font-sans leading-relaxed">
              TrustTrace equips investigators to systematically test incoming communications, eliminate confirmation bias, and obtain concrete cryptographic evidence.
            </p>

            {/* Metric counters (Exact like video: +42%, $184K, 3.2x) */}
            <div className="grid grid-cols-3 gap-6 pt-6 border-t border-white/10">
              <div>
                <div className="font-serif text-3xl sm:text-4xl font-bold text-white">100%</div>
                <div className="text-[11px] font-mono text-[#8FA88D] mt-1">Claim Provenance</div>
              </div>
              <div>
                <div className="font-serif text-3xl sm:text-4xl font-bold text-white">0</div>
                <div className="text-[11px] font-mono text-[#8FA88D] mt-1">Untrusted Code Exec</div>
              </div>
              <div>
                <div className="font-serif text-3xl sm:text-4xl font-bold text-white">4.8&times;</div>
                <div className="text-[11px] font-mono text-[#8FA88D] mt-1">Faster Triage</div>
              </div>
            </div>
          </div>

          {/* Right side: 3 Stacked Luxury Cards (Exact like video cards) */}
          <div className="lg:col-span-6 space-y-4">
            
            {/* Card 1: Forensic Visibility */}
            <div 
              onClick={() => setActiveDarkCard('clarity')}
              className={`p-6 rounded-2xl transition-all cursor-pointer border ${
                activeDarkCard === 'clarity'
                  ? 'bg-[#EAE5D8] text-[#171A1C] border-[#FAF8F5] shadow-xl'
                  : 'bg-[#18231B] text-[#FAF8F5] border-[#2A3C2E] hover:border-[#3D5742]'
              }`}
            >
              <h3 className="font-serif text-xl font-bold mb-2">Forensic Visibility</h3>
              <p className={`text-xs leading-relaxed font-sans ${activeDarkCard === 'clarity' ? 'text-[#5F5849]' : 'text-[#8FA88D]'}`}>
                Continuous monitoring of sender telemetry, autonomous URL structure decomposition, and live lookup cross-referencing.
              </p>
              <div className="mt-4 flex items-center justify-between text-xs font-mono">
                <span className={activeDarkCard === 'clarity' ? 'text-[#182B1B] font-semibold' : 'text-[#A8D3A4]'}>
                  View Telemetry &rarr;
                </span>
                <span className="text-[10px] uppercase tracking-wider opacity-60">Engine Tier 1</span>
              </div>
            </div>

            {/* Card 2: Contradiction Engine */}
            <div 
              onClick={() => setActiveDarkCard('contradiction')}
              className={`p-6 rounded-2xl transition-all cursor-pointer border ${
                activeDarkCard === 'contradiction'
                  ? 'bg-[#EAE5D8] text-[#171A1C] border-[#FAF8F5] shadow-xl'
                  : 'bg-[#18231B] text-[#FAF8F5] border-[#2A3C2E] hover:border-[#3D5742]'
              }`}
            >
              <h3 className="font-serif text-xl font-bold mb-2">Contradiction Engine</h3>
              <p className={`text-xs leading-relaxed font-sans ${activeDarkCard === 'contradiction' ? 'text-[#5F5849]' : 'text-[#8FA88D]'}`}>
                Flags direct mismatches between claimed organizational identity and destination registrar, DNS, and IP infrastructure.
              </p>
              <div className="mt-4 flex items-center justify-between text-xs font-mono">
                <span className={activeDarkCard === 'contradiction' ? 'text-[#182B1B] font-semibold' : 'text-[#A8D3A4]'}>
                  Inspect Rules &rarr;
                </span>
                <span className="text-[10px] uppercase tracking-wider opacity-60">Engine Tier 2</span>
              </div>
            </div>

            {/* Card 3: Deterministic Scoring */}
            <div 
              onClick={() => setActiveDarkCard('scoring')}
              className={`p-6 rounded-2xl transition-all cursor-pointer border ${
                activeDarkCard === 'scoring'
                  ? 'bg-[#EAE5D8] text-[#171A1C] border-[#FAF8F5] shadow-xl'
                  : 'bg-[#18231B] text-[#FAF8F5] border-[#2A3C2E] hover:border-[#3D5742]'
              }`}
            >
              <h3 className="font-serif text-xl font-bold mb-2">Deterministic Scoring</h3>
              <p className={`text-xs leading-relaxed font-sans ${activeDarkCard === 'scoring' ? 'text-[#5F5849]' : 'text-[#8FA88D]'}`}>
                Eliminates subjective blackbox probabilities: scores are transparently calculated from verified heuristics and documented rules.
              </p>
              <div className="mt-4 flex items-center justify-between text-xs font-mono">
                <span className={activeDarkCard === 'scoring' ? 'text-[#182B1B] font-semibold' : 'text-[#A8D3A4]'}>
                  View Matrix &rarr;
                </span>
                <span className="text-[10px] uppercase tracking-wider opacity-60">Engine Tier 3</span>
              </div>
            </div>

          </div>

        </div>
      </section>

      {/* ------------------------------------------------------------- */}
      {/* 4. SECTION 4: The 6 Forensics Questions Grid                   */}
      {/* ------------------------------------------------------------- */}
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
            <p className="text-xs text-[#5F5849] leading-relaxed font-sans">
              Deconstructs untrusted communications into testable assertions (claimed package hold, urgency penalty, payment demand).
            </p>
          </div>

          <div className="p-6 rounded-2xl bg-[#FAF8F5] border border-[#E4DFD3] shadow-xs hover:border-[#CCC4B2] transition-all">
            <div className="w-10 h-10 rounded-xl bg-[#FDEEEE] text-[#A62626] flex items-center justify-center mb-4 border border-[#F6CACA]">
              <Scale className="w-5 h-5" />
            </div>
            <h3 className="font-serif text-lg font-bold text-[#171A1C] mb-2">2. Contradiction Analysis</h3>
            <p className="text-xs text-[#5F5849] leading-relaxed font-sans">
              Proves identity mismatch directly: when claimed authority is "USPS" but target destination resolves to an unauthorized ".top" or bare IP domain.
            </p>
          </div>

          <div className="p-6 rounded-2xl bg-[#FAF8F5] border border-[#E4DFD3] shadow-xs hover:border-[#CCC4B2] transition-all">
            <div className="w-10 h-10 rounded-xl bg-[#EBEBF7] text-[#343A8C] flex items-center justify-center mb-4 border border-[#D0D0EF]">
              <Network className="w-5 h-5" />
            </div>
            <h3 className="font-serif text-lg font-bold text-[#171A1C] mb-2">3. Evidence Correlation Graph</h3>
            <p className="text-xs text-[#5F5849] leading-relaxed font-sans">
              Visual interactive graph mapping nodes between entities, claims, indicators, lookups, and contradictions.
            </p>
          </div>

          <div className="p-6 rounded-2xl bg-[#FAF8F5] border border-[#E4DFD3] shadow-xs hover:border-[#CCC4B2] transition-all">
            <div className="w-10 h-10 rounded-xl bg-[#FEF6E9] text-[#A66F17] flex items-center justify-center mb-4 border border-[#F9E2BC]">
              <AlertTriangle className="w-5 h-5" />
            </div>
            <h3 className="font-serif text-lg font-bold text-[#171A1C] mb-2">4. Transparent Risk Scoring</h3>
            <p className="text-xs text-[#5F5849] leading-relaxed font-sans">
              Documented, deterministic severity weights and evidence confidence coverage rather than an unverifiable black box.
            </p>
          </div>

          <div className="p-6 rounded-2xl bg-[#FAF8F5] border border-[#E4DFD3] shadow-xs hover:border-[#CCC4B2] transition-all">
            <div className="w-10 h-10 rounded-xl bg-[#E8F4F8] text-[#1B637B] flex items-center justify-center mb-4 border border-[#C5E4EF]">
              <HelpCircle className="w-5 h-5" />
            </div>
            <h3 className="font-serif text-lg font-bold text-[#171A1C] mb-2">5. Honest Uncertainty Reporting</h3>
            <p className="text-xs text-[#5F5849] leading-relaxed font-sans">
              Explicitly categorizes what remains unverified. Absence of a threat-intel match is never misrepresented as proof of safety.
            </p>
          </div>

          <div className="p-6 rounded-2xl bg-[#FAF8F5] border border-[#E4DFD3] shadow-xs hover:border-[#CCC4B2] transition-all">
            <div className="w-10 h-10 rounded-xl bg-[#E5F3EB] text-[#185E34] flex items-center justify-center mb-4 border border-[#BEDECB]">
              <Lock className="w-5 h-5" />
            </div>
            <h3 className="font-serif text-lg font-bold text-[#171A1C] mb-2">6. Actionable Response Playbook</h3>
            <p className="text-xs text-[#5F5849] leading-relaxed font-sans">
              Generates personalized verification checklists linked to exact findings, including independent official channel verification and incident response steps.
            </p>
          </div>
        </div>
      </section>

      {/* ------------------------------------------------------------- */}
      {/* 5. SECTION 5: "See Beyond The Numbers" (Video t=13s - 17s)     */}
      {/* Moving Golden Mountain Canvas + Email Intake + Dark/Light Sw  */}
      {/* ------------------------------------------------------------- */}
      <section className="relative w-full rounded-3xl overflow-hidden p-8 sm:p-16 border border-[#E4DFD3] shadow-2xl min-h-[580px] flex flex-col justify-between">
        
        {/* Moving Background Video for Footer Stage */}
        <div className="bg-video-container">
          <video
            autoPlay
            loop
            muted
            playsInline
            poster={footerTheme === 'light' ? '/assets/footer_gold_screen.jpg' : '/assets/footer_dark_screen.jpg'}
            className="w-full h-full object-cover brightness-[0.88] contrast-[1.05]"
          >
            <source src="/assets/footer_moving.mp4" type="video/mp4" />
          </video>
          <div className="absolute inset-0 bg-radial from-transparent via-black/30 to-black/75 pointer-events-none" />
        </div>

        <div className="relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Left: See Beyond The Evidence + Email Input Pill */}
          <div className="lg:col-span-7 space-y-6">
            <h2 className="font-serif text-4xl sm:text-6xl font-normal text-[#FAF8F5] leading-tight">
              See Beyond The <br />
              <span className="italic">Evidence</span>
            </h2>

            {/* Email Intake Pill Container (Exact layout from video: "Enter your email" + "Contact us") */}
            <div className="max-w-md bg-black/40 backdrop-blur-md border border-white/20 rounded-full p-1.5 flex items-center justify-between shadow-xl">
              <input
                type="email"
                placeholder="Enter your email"
                className="bg-transparent px-4 py-2 text-xs text-white placeholder-white/60 focus:outline-hidden w-full font-sans"
              />
              <button
                type="button"
                className="px-5 py-2.5 rounded-full bg-[#EAE5D8] hover:bg-white text-[#182B1B] text-xs font-serif font-medium transition-all shrink-0 cursor-pointer shadow-sm"
              >
                Contact us
              </button>
            </div>
          </div>

          {/* Right: Two Column Links (Overview, Risk Detection, Forecast, etc.) */}
          <div className="lg:col-span-5 space-y-6 text-xs text-[#FAF8F5]/80 font-serif">
            <p className="font-sans text-xs text-[#D7DFD6] leading-relaxed mb-4">
              Predict deceptive vector evolution, monitor infrastructure risks, and uncover hidden fraud before financial damage impacts growth.
            </p>
            
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2.5">
                <div className="hover:text-white cursor-pointer transition-colors">Overview</div>
                <div className="hover:text-white cursor-pointer transition-colors">Risk Detection</div>
                <div className="hover:text-white cursor-pointer transition-colors">Forecasting</div>
                <div className="hover:text-white cursor-pointer transition-colors">AI Forensics</div>
              </div>
              <div className="space-y-2.5">
                <div className="hover:text-white cursor-pointer transition-colors">Telemetry Analysis</div>
                <div className="hover:text-white cursor-pointer transition-colors">Activity Graph</div>
                <div className="hover:text-white cursor-pointer transition-colors">AI Insights</div>
                <div className="hover:text-white cursor-pointer transition-colors">Playbook Planning</div>
              </div>
            </div>
          </div>

        </div>

        {/* Bottom Strip: Privacy Policy + Dark/Light Switch + Copyright (Exact like video) */}
        <div className="relative z-10 pt-16 border-t border-white/10 flex flex-col sm:flex-row items-center justify-between text-xs text-[#D7DFD6]/80 font-sans gap-4">
          <div className="flex items-center space-x-4 text-[11px]">
            <span className="hover:text-white cursor-pointer">Privacy Policy</span>
            <span>•</span>
            <span className="hover:text-white cursor-pointer">Terms of Service</span>
            <span>•</span>
            <span className="hover:text-white cursor-pointer">Cookie Policy</span>
          </div>

          {/* Dark / Light Pill Switch (Exact like video) */}
          <div className="flex items-center space-x-2 bg-black/40 backdrop-blur-md px-3 py-1 rounded-full border border-white/20">
            <span className="text-[11px] font-mono text-white/70">Dark</span>
            <button
              onClick={() => setFooterTheme((prev) => (prev === 'light' ? 'dark' : 'light'))}
              className={`w-9 h-5 rounded-full p-0.5 transition-colors cursor-pointer flex items-center ${
                footerTheme === 'light' ? 'bg-[#EAE5D8] justify-end' : 'bg-[#182B1B] justify-start'
              }`}
            >
              <div className="w-4 h-4 rounded-full bg-white shadow-xs" />
            </button>
            <span className="text-[11px] font-mono text-white">Light</span>
          </div>

          <div className="text-[11px] font-mono">
            &copy; 2026 TrustTrace AI. All rights reserved.
          </div>
        </div>

        {/* Oversized Brand Watermark (Exact like video: giant KASHFLOW -> TRUSTTRACE) */}
        <div className="relative z-10 pt-8 text-center select-none opacity-40">
          <span className="font-serif text-7xl sm:text-9xl font-bold tracking-tight text-white/30 drop-shadow-xl">
            TRUSTTRACE
          </span>
        </div>

      </section>

    </div>
  );
};

