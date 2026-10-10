import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { 
  ShieldAlert, 
  LayoutDashboard, 
  PlusCircle, 
  History, 
  Settings, 
  FileSearch,
  Sparkles,
} from 'lucide-react';
import { TrustTraceLogo } from './TrustTraceLogo';

export const Navbar: React.FC = () => {
  const location = useLocation();


  const navItems = [
    { name: 'Dashboard', path: '/dashboard', icon: LayoutDashboard },
    { name: 'New Investigation', path: '/investigate/new', icon: PlusCircle },
    { name: 'History & Cases', path: '/history', icon: History },
    { name: 'Integrations & Mode', path: '/settings', icon: Settings },
  ];

  return (
    <header className="sticky top-4 z-50 px-4 sm:px-6 lg:px-8 mb-6">
      <div className="max-w-7xl mx-auto">
        <div className="bg-[#F7F9E8]/90 backdrop-blur-xl border border-[rgba(51,72,97,0.18)] rounded-full px-5 py-2.5 shadow-[0_4px_16px_-4px_rgba(51,72,97,0.08)] flex items-center justify-between transition-all">
          
          {/* Brand Logo & Editorial Title */}
          <div className="flex items-center space-x-6">
            <Link to="/" className="group focus:outline-none">
              <TrustTraceLogo size={36} subtitle="EVIDENCE-FIRST FORENSICS" />
            </Link>

            {/* Nav Menu permanently visible to all users */}
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

          {/* Direct CTA Button */}
          <div className="flex items-center space-x-3">
            <Link
              to="/investigate/new"
              className="inline-flex items-center space-x-2 px-4 py-1.5 rounded-full text-xs font-semibold bg-[#1C2B3E] hover:bg-[#111C2A] text-[#F7F9E8] shadow-xs transition-all cursor-pointer"
            >
              <FileSearch className="w-3.5 h-3.5 text-[#8CE3B0]" />
              <span>Launch Case</span>
            </Link>
          </div>

        </div>
      </div>
    </header>
  );
};

