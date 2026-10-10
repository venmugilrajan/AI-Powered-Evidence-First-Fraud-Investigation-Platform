import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { Navbar } from './components/Navbar';
import { LandingPage } from './pages/LandingPage';
import { DashboardPage } from './pages/DashboardPage';
import { NewInvestigationPage } from './pages/NewInvestigationPage';
import { InvestigationWorkspacePage } from './pages/InvestigationWorkspacePage';
import { Navigate } from 'react-router-dom';
import { HistoryPage } from './pages/HistoryPage';
import { SettingsPage } from './pages/SettingsPage';

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
        <div className="min-h-screen bg-[#F7F9E8] text-[#1C2B3E] flex flex-col font-sans selection:bg-[#334861]/10 selection:text-[#1C2B3E]">
          <Navbar />
          <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 pt-4">
            <Routes>
              <Route path="/" element={<LandingPage />} />
              <Route path="/login" element={<Navigate to="/investigate/new" replace />} />
              <Route path="/signup" element={<Navigate to="/investigate/new" replace />} />
              <Route path="/dashboard" element={<DashboardPage />} />
              <Route path="/investigate/new" element={<NewInvestigationPage />} />
              <Route path="/investigations/:id" element={<InvestigationWorkspacePage />} />
              <Route path="/history" element={<HistoryPage />} />
              <Route path="/settings" element={<SettingsPage />} />
              <Route path="*" element={<Navigate to="/" replace />} />
            </Routes>
          </main>


          {/* Trajectory Research Lab Minimalist Line Footer */}
          <footer className="mt-20 border-t border-[rgba(51,72,97,0.15)] bg-[#F7F9E8] pt-16 pb-12 overflow-hidden relative">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-8 pb-12 border-b border-[rgba(51,72,97,0.1)]">
                <div>
                  <h3 className="font-display text-3xl font-normal text-[#1C2B3E] tracking-tight">TrustTrace Forensics</h3>
                  <p className="text-xs text-[#526B85] mt-1.5 max-w-md font-sans">
                    Autonomous platform for evidence-first forensics, deterministic claim deconstruction, and cryptographic truth discovery.
                  </p>
                </div>

                <div className="flex items-center space-x-3 text-xs font-mono">
                  <div className="px-3.5 py-1.5 rounded-full bg-white border border-[rgba(51,72,97,0.15)] text-[#334861] shadow-xs">
                    <span>SOC 2 Verified Architecture</span>
                  </div>
                  <div className="px-3.5 py-1.5 rounded-full bg-[#334861] text-[#F7F9E8]">
                    <span>v1.4 Production Active</span>
                  </div>
                </div>
              </div>

              {/* Trajectory-style Giant Brandmark */}
              <div className="pt-6 sm:pt-10 text-center select-none opacity-10 overflow-hidden">
                <span className="font-display text-5xl xs:text-6xl sm:text-8xl md:text-[10rem] lg:text-[11rem] font-normal tracking-tight text-[#1C2B3E] block truncate">
                  TRUSTTRACE
                </span>
              </div>

              <div className="mt-6 flex flex-col sm:flex-row items-center justify-between text-[11px] font-mono text-[#6A829D] gap-4 text-center sm:text-left">
                <div>&copy; 2026 TrustTrace Systems • The Platform for Autonomous Forensics</div>
                <div className="flex flex-wrap items-center justify-center gap-x-3 gap-y-1">
                  <span>SSRF RFC 1918 Guard</span>
                  <span className="hidden sm:inline">•</span>
                  <span>Zero Code Execution</span>
                  <span className="hidden sm:inline">•</span>
                  <span>Deterministic Proof</span>
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
