import React, { useState, useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { 
  ShieldAlert, 
  LayoutDashboard, 
  PlusCircle, 
  History, 
  Settings, 
  FileSearch,
  LogIn,
  LogOut,
  UserCheck,
  Sparkles
} from 'lucide-react';
import { getAuthToken, getStoredUser, clearAuthToken } from '../services/api';

export const Navbar: React.FC = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [token, setToken] = useState<string | null>(getAuthToken());
  const [user, setUser] = useState<any | null>(getStoredUser());

  useEffect(() => {
    setToken(getAuthToken());
    setUser(getStoredUser());
  }, [location]);

  const handleLogout = () => {
    clearAuthToken();
    setToken(null);
    setUser(null);
    navigate('/login');
  };

  const navItems = [
    { name: 'Dashboard', path: '/dashboard', icon: LayoutDashboard },
    { name: 'New Investigation', path: '/investigate/new', icon: PlusCircle },
    { name: 'History & Cases', path: '/history', icon: History },
    { name: 'Integrations & Mode', path: '/settings', icon: Settings },
  ];

  return (
    <header className="sticky top-4 z-50 px-4 sm:px-6 lg:px-8 mb-6">
      <div className="max-w-7xl mx-auto">
        <div className="bg-[#FAF8F5]/90 backdrop-blur-md border border-[#E4DFD3] rounded-full px-5 py-2.5 shadow-[0_4px_20px_-4px_rgba(0,0,0,0.05)] flex items-center justify-between transition-all">
          
          {/* Brand Logo & Editorial Title */}
          <div className="flex items-center space-x-6">
            <Link to="/" className="flex items-center space-x-2.5 group">
              <div className="w-9 h-9 rounded-full bg-[#182B1B] text-[#E7E2D4] flex items-center justify-center shadow-xs group-hover:scale-105 transition-transform">
                <ShieldAlert className="w-4 h-4 text-[#C4DDBC]" />
              </div>
              <div className="flex flex-col">
                <span className="font-serif text-lg font-bold tracking-tight text-[#171A1C] leading-none">
                  TrustTrace
                </span>
                <span className="text-[10px] tracking-widest uppercase font-mono text-[#7D7667] mt-0.5">
                  Forensic AI
                </span>
              </div>
            </Link>

            {/* Nav Menu for Authenticated Users */}
            {token && (
              <nav className="hidden md:flex items-center space-x-1 pl-4 border-l border-[#E2DDCF]">
                {navItems.map((item) => {
                  const Icon = item.icon;
                  const isActive = location.pathname === item.path;
                  return (
                    <Link
                      key={item.path}
                      to={item.path}
                      className={`flex items-center space-x-2 px-3.5 py-1.5 rounded-full text-xs font-medium transition-all ${
                        isActive
                          ? 'bg-[#182B1B] text-[#FAF8F5] shadow-xs font-semibold'
                          : 'text-[#5C5648] hover:text-[#182B1B] hover:bg-[#EFECE3]'
                      }`}
                    >
                      <Icon className="w-3.5 h-3.5" />
                      <span>{item.name}</span>
                    </Link>
                  );
                })}
              </nav>
            )}
          </div>

          {/* Right Action / Auth Buttons */}
          <div className="flex items-center space-x-3">
            {token ? (
              <>
                <Link
                  to="/investigate/new"
                  className="inline-flex items-center space-x-2 px-4 py-1.5 rounded-full text-xs font-semibold bg-[#182B1B] hover:bg-[#253D29] text-[#FAF8F5] shadow-xs transition-all cursor-pointer"
                >
                  <FileSearch className="w-3.5 h-3.5 text-[#C4DDBC]" />
                  <span>Launch Case</span>
                </Link>
                <button
                  onClick={handleLogout}
                  className="inline-flex items-center space-x-1 px-3 py-1.5 rounded-full text-xs font-medium text-[#7D7667] hover:text-[#992222] hover:bg-[#FBEAEA] transition-all cursor-pointer"
                  title="Sign Out"
                >
                  <LogOut className="w-3.5 h-3.5" />
                  <span className="hidden sm:inline">Sign Out</span>
                </button>
              </>
            ) : (
              <div className="flex items-center space-x-2">
                <Link
                  to="/login"
                  className="inline-flex items-center space-x-1.5 px-3.5 py-1.5 rounded-full text-xs font-semibold text-[#3D382E] hover:text-[#182B1B] hover:bg-[#EFECE3] transition-all cursor-pointer"
                >
                  <LogIn className="w-3.5 h-3.5" />
                  <span>Sign In</span>
                </Link>
                <Link
                  to="/signup"
                  className="inline-flex items-center space-x-1.5 px-4 py-1.5 rounded-full text-xs font-semibold bg-[#182B1B] hover:bg-[#243F29] text-[#FAF8F5] shadow-xs transition-all cursor-pointer"
                >
                  <UserCheck className="w-3.5 h-3.5 text-[#C4DDBC]" />
                  <span>Register</span>
                </Link>
              </div>
            )}
          </div>

        </div>
      </div>
    </header>
  );
};
