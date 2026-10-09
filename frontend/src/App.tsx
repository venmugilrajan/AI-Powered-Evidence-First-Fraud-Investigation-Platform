import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { Navbar } from './components/Navbar';
import { LandingPage } from './pages/LandingPage';
import { DashboardPage } from './pages/DashboardPage';
import { NewInvestigationPage } from './pages/NewInvestigationPage';
import { InvestigationWorkspacePage } from './pages/InvestigationWorkspacePage';
import { HistoryPage } from './pages/HistoryPage';
import { SettingsPage } from './pages/SettingsPage';
import { LoginPage } from './pages/LoginPage';
import { SignupPage } from './pages/SignupPage';
import { ParticleBackground } from './components/ParticleBackground';

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 5000,
      retry: 1,
    },
  },
});

export const App: React.FC = () => {
  return (
    <QueryClientProvider client={queryClient}>
      <BrowserRouter>
        <div className="min-h-screen bg-slate-50 text-slate-900 flex flex-col font-sans selection:bg-blue-100 selection:text-blue-900">
          <Navbar />
          <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 pt-4">
            <Routes>
              <Route path="/" element={<LandingPage />} />
              <Route path="/login" element={<LoginPage />} />
              <Route path="/signup" element={<SignupPage />} />
              <Route path="/dashboard" element={<DashboardPage />} />
              <Route path="/investigate/new" element={<NewInvestigationPage />} />
              <Route path="/investigations/:id" element={<InvestigationWorkspacePage />} />
              <Route path="/history" element={<HistoryPage />} />
              <Route path="/settings" element={<SettingsPage />} />
            </Routes>
          </main>

          {/* Luxury Editorial Footer with Kashflow-inspired Topography & Watermark */}
          <footer className="mt-24 rounded-t-[2.5rem] border-t border-[#2C4830] bg-[#121614] text-[#FAF8F5] pt-16 pb-14 overflow-hidden relative shadow-2xl">
            
            {/* Moving particle topography background */}
            <ParticleBackground theme="dark" className="opacity-40 z-0" />

            {/* Footer Terrain Backdrop Image */}
            <div 
              className="absolute inset-0 bg-cover bg-bottom opacity-25 mix-blend-screen pointer-events-none"
              style={{ backgroundImage: `url('/footer_topography.jpg')` }}
            />

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
              
              <div className="grid grid-cols-1 md:grid-cols-12 gap-8 pb-12 border-b border-[#2C4830]/80">
                <div className="md:col-span-6 space-y-4">
                  <h3 className="font-serif text-3xl sm:text-4xl font-bold text-white tracking-tight">
                    See Beyond The <span className="italic font-normal text-[#C4DDBC]">Evidence</span>
                  </h3>
                  <p className="text-xs text-[#A7BAA5] max-w-md font-sans leading-relaxed">
                    Deconstruct fraudulent narratives, correlate multi-source indicators, and obtain court-defensible forensic dossiers before transactions settle.
                  </p>

                  {/* Email Intake Bar matching Dribbble Video */}
                  <div className="pt-2 flex items-center max-w-md">
                    <div className="relative flex-1">
                      <input
                        type="email"
                        placeholder="Enter your investigation email"
                        className="w-full px-5 py-3 rounded-full bg-[#1A241D] border border-[#2F4D33] text-xs text-white placeholder-[#788E76] focus:outline-none focus:border-[#52D172] transition-colors"
                      />
                    </div>
                    <button
                      className="ml-2 px-6 py-3 rounded-full bg-[#FAF8F5] hover:bg-[#EFECE3] text-[#121614] text-xs font-semibold shadow-md transition-all cursor-pointer whitespace-nowrap"
                    >
                      <span>Inquire</span>
                    </button>
                  </div>
                </div>

                <div className="md:col-span-6 grid grid-cols-2 sm:grid-cols-3 gap-6 text-xs font-mono">
                  <div>
                    <span className="text-[#8FA88D] uppercase block text-[10px] mb-3">Intelligence</span>
                    <ul className="space-y-2 text-[#C8D6C6]">
                      <li>Claim Dissection</li>
                      <li>ASN Mismatch</li>
                      <li>Heuristic Matrix</li>
                      <li>Bipartite Graph</li>
                    </ul>
                  </div>
                  <div>
                    <span className="text-[#8FA88D] uppercase block text-[10px] mb-3">Security Ops</span>
                    <ul className="space-y-2 text-[#C8D6C6]">
                      <li>SSRF Filter</li>
                      <li>RFC 1918 Guard</li>
                      <li>Metadata Block</li>
                      <li>PII Redaction</li>
                    </ul>
                  </div>
                  <div>
                    <span className="text-[#8FA88D] uppercase block text-[10px] mb-3">System</span>
                    <ul className="space-y-2 text-[#C8D6C6]">
                      <li>Deterministic API</li>
                      <li>Postgres Ledger</li>
                      <li>Playwright CI</li>
                      <li>Zero Eval Code</li>
                    </ul>
                  </div>
                </div>
              </div>

              {/* Huge Editorial Serif Brand Watermark matching Kashflow Video */}
              <div className="pt-12 text-center select-none opacity-20">
                <span className="font-serif text-7xl sm:text-9xl font-bold tracking-tight text-[#528758] block">
                  TRUSTTRACE
                </span>
              </div>

              <div className="mt-6 flex flex-col sm:flex-row items-center justify-between text-[11px] font-mono text-[#8FA88D] gap-4">
                <div>&copy; 2026 TrustTrace Forensics • Zero Untrusted Code Execution Architecture</div>
                <div className="flex items-center space-x-4">
                  <span>Light Editorial Theme</span>
                  <span>•</span>
                  <span>Autonomous AI Engine</span>
                  <span>•</span>
                  <span>Verified 34/34 Pass</span>
                </div>
              </div>

            </div>
          </footer>
        </div>
      </BrowserRouter>
    </QueryClientProvider>
  );
};

export default App;
