import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { 
  ShieldAlert, 
  LayoutDashboard, 
  PlusCircle, 
  History, 
  Settings, 
  FileSearch,
  Sparkles,
  Menu,
  X
} from 'lucide-react';
import { TrustTraceLogo } from './TrustTraceLogo';

export const Navbar: React.FC = () => {
  const location = useLocation();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navItems = [
    { name: 'Dashboard', path: '/dashboard', icon: LayoutDashboard },
    { name: 'New Investigation', path: '/investigate/new', icon: PlusCircle },
    { name: 'History & Cases', path: '/history', icon: History },
    { name: 'Integrations & Mode', path: '/settings', icon: Settings },
  ];

  return (
    <header className="sticky top-2 sm:top-4 z-50 px-2 sm:px-6 lg:px-8 mb-4 sm:mb-6">
      <div className="max-w-7xl mx-auto">
        <div className="bg-[#F7F9E8]/95 backdrop-blur-xl border border-[rgba(51,72,97,0.18)] rounded-2xl sm:rounded-full px-3.5 sm:px-5 py-2 sm:py-2.5 shadow-[0_4px_16px_-4px_rgba(51,72,97,0.08)] flex items-center justify-between transition-all">
          
          {/* Brand Logo & Editorial Title */}
          <div className="flex items-center space-x-2 sm:space-x-6 min-w-0">
            <Link to="/" className="group focus:outline-none shrink-0" onClick={() => setMobileMenuOpen(false)}>
              <TrustTraceLogo size={32} subtitle="EVIDENCE-FIRST FORENSICS" />
            </Link>

            {/* Desktop Nav Menu */}
            <nav className="hidden md:flex items-center space-x-1 pl-4 border-l border-[rgba(51,72,97,0.15)]">
              {navItems.map((item) => {
                const Icon = item.icon;
                const isActive = location.pathname === item.path;
                return (
                  <Link
                    key={item.path}
                    to={item.path}
                    className={`flex items-center space-x-2 px-3.5 py-1.5 rounded-full text-xs font-medium transition-all ${
                      isActive
                        ? 'bg-[#1C2B3E] text-[#F7F9E8] shadow-xs font-semibold'
                        : 'text-[#334861] hover:text-[#1C2B3E] hover:bg-black/5'
                    }`}
                  >
                    <Icon className="w-3.5 h-3.5" />
                    <span>{item.name}</span>
                  </Link>
                );
              })}
            </nav>
          </div>

          {/* Right Action Buttons */}
          <div className="flex items-center space-x-2 sm:space-x-3 shrink-0">
            <Link
              to="/investigate/new"
              onClick={() => setMobileMenuOpen(false)}
              className="inline-flex items-center space-x-1.5 sm:space-x-2 px-3 sm:px-4 py-1.5 rounded-full text-xs font-semibold bg-[#1C2B3E] hover:bg-[#111C2A] text-[#F7F9E8] shadow-xs transition-all cursor-pointer whitespace-nowrap"
            >
              <FileSearch className="w-3.5 h-3.5 text-[#8CE3B0] shrink-0" />
              <span className="hidden xs:inline sm:inline">Launch Case</span>
              <span className="inline xs:hidden sm:hidden">Case</span>
            </Link>

            {/* Mobile Hamburger Toggle */}
            <button
              type="button"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="md:hidden p-1.5 rounded-xl border border-[rgba(51,72,97,0.2)] bg-white/80 text-[#1C2B3E] hover:bg-white transition-colors cursor-pointer"
              aria-label="Toggle Navigation Menu"
            >
              {mobileMenuOpen ? <X className="w-4 h-4" /> : <Menu className="w-4 h-4" />}
            </button>
          </div>

        </div>

        {/* Mobile Dropdown Menu Drawer */}
        {mobileMenuOpen && (
          <div className="md:hidden mt-2 p-3 bg-[#F7F9E8] border border-[rgba(51,72,97,0.18)] rounded-2xl shadow-lg backdrop-blur-xl animate-in fade-in slide-in-from-top-2 duration-200">
            <nav className="flex flex-col space-y-1">
              {navItems.map((item) => {
                const Icon = item.icon;
                const isActive = location.pathname === item.path;
                return (
                  <Link
                    key={item.path}
                    to={item.path}
                    onClick={() => setMobileMenuOpen(false)}
                    className={`flex items-center space-x-2.5 px-3.5 py-2.5 rounded-xl text-xs font-medium transition-all ${
                      isActive
                        ? 'bg-[#1C2B3E] text-[#F7F9E8] font-semibold'
                        : 'text-[#334861] hover:text-[#1C2B3E] hover:bg-black/5'
                    }`}
                  >
                    <Icon className="w-4 h-4" />
                    <span>{item.name}</span>
                  </Link>
                );
              })}
            </nav>
          </div>
        )}
      </div>
    </header>
  );
};
