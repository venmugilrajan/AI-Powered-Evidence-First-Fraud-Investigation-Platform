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
        <div className="min-h-screen bg-[#EFECE6] text-[#18191B] flex flex-col font-sans selection:bg-emerald-100 selection:text-emerald-950">
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

          {/* Lucid Luxury Editorial Footer with Brand Watermark */}
          <footer className="mt-20 border-t border-[#E2DDD6] bg-[#E8E4DC] pt-16 pb-12 overflow-hidden relative">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-8 pb-12 border-b border-[#DDD7CD]">
                <div>
                  <h3 className="font-heading text-2xl font-bold text-[#18191B]">TrustTrace Forensics Lab</h3>
                  <p className="text-xs text-[#6B6862] mt-1 max-w-md font-sans">
                    Autonomous evidence-first fraud intelligence platform engineered for deterministic claim extraction, proof graph correlation, and verifiable containment.
                  </p>
                </div>

                <div className="flex items-center space-x-3 text-xs font-mono">
                  <div className="px-3.5 py-1.5 rounded-full bg-white/80 border border-[#DDD7CD] text-[#423F39]">
                    <span>Engine: Autonomous Lucid</span>
                  </div>
                  <div className="px-3.5 py-1.5 rounded-full bg-[#18191B] text-white">
                    <span>API v1.4 Active</span>
                  </div>
                </div>
              </div>

              {/* Huge Brand Watermark */}
              <div className="pt-10 text-center select-none opacity-15">
                <span className="font-heading text-7xl sm:text-9xl font-extrabold tracking-tight text-[#18191B]">
                  TRUSTTRACE
                </span>
              </div>

              <div className="mt-6 flex flex-col sm:flex-row items-center justify-between text-[11px] font-mono text-[#8C8880] gap-4">
                <div>&copy; 2026 TrustTrace Systems • Zero Untrusted Code Execution Architecture</div>
                <div className="flex items-center space-x-4">
                  <span>SSRF Sandboxed</span>
                  <span>•</span>
                  <span>RFC 1918 Guard</span>
                  <span>•</span>
                  <span>Deterministic Scoring</span>
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
