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

          {/* Luxury Editorial Footer with Kashflow-inspired Watermark */}
          <footer className="mt-20 border-t border-[#E4DFD3] bg-[#EFECE3] pt-16 pb-12 overflow-hidden relative">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-8 pb-12 border-b border-[#DDD7C7]">
                <div>
                  <h3 className="font-serif text-2xl font-bold text-[#171A1C]">TrustTrace Forensics Lab</h3>
                  <p className="text-xs text-[#5F5849] mt-1 max-w-md font-sans">
                    The evidence-first fraud intelligence architecture engineered for autonomous claim extraction, deterministic proof, and verifiable threat containment.
                  </p>
                </div>

                <div className="flex items-center space-x-3 text-xs font-mono">
                  <div className="px-3.5 py-1.5 rounded-full bg-[#FAF8F5] border border-[#DDD7C7] text-[#3D382E]">
                    <span>Mode: Light Editorial</span>
                  </div>
                  <div className="px-3.5 py-1.5 rounded-full bg-[#182B1B] text-[#FAF8F5] border border-[#2B472F]">
                    <span>API v1.4 Active</span>
                  </div>
                </div>
              </div>

              {/* Huge Editorial Serif Brand Watermark */}
              <div className="pt-10 text-center select-none opacity-20">
                <span className="font-serif text-7xl sm:text-9xl font-bold tracking-tight text-[#2B472F]">
                  TRUSTTRACE
                </span>
              </div>

              <div className="mt-6 flex flex-col sm:flex-row items-center justify-between text-[11px] font-mono text-[#736B59] gap-4">
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
