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
          <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 pt-8">
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
          <footer className="border-t border-slate-200 bg-white py-6 text-center text-xs text-slate-500 font-mono shadow-inner">
            TrustTrace • AI Evidence-First Fraud Forensics Engine • Zero Execution Untrusted Links
          </footer>
        </div>
      </BrowserRouter>
    </QueryClientProvider>
  );
};

export default App;
