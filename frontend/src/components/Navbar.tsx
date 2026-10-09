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
  UserCheck
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
    <header className="border-b border-slate-200 bg-white/95 backdrop-blur sticky top-0 z-50 shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center space-x-3">
            <Link to="/" className="flex items-center space-x-3 group">
              <div className="p-2 bg-blue-50 border border-blue-200 rounded-lg group-hover:border-blue-400 group-hover:bg-blue-100 transition-colors">
                <ShieldAlert className="w-6 h-6 text-blue-600" />
              </div>
              <div>
                <span className="font-bold text-lg tracking-tight text-slate-900">
                  TrustTrace
                </span>
              </div>
            </Link>

            {token && (
              <nav className="hidden md:flex ml-8 space-x-1">
                {navItems.map((item) => {
                  const Icon = item.icon;
                  const isActive = location.pathname === item.path;
                  return (
                    <Link
                      key={item.path}
                      to={item.path}
                      className={`flex items-center space-x-2 px-3 py-2 rounded-lg text-sm font-medium transition-all ${
                        isActive
                          ? 'bg-blue-50 text-blue-700 font-semibold border border-blue-200 shadow-xs'
                          : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
                      }`}
                    >
                      <Icon className="w-4 h-4" />
                      <span>{item.name}</span>
                    </Link>
                  );
                })}
              </nav>
            )}
          </div>

          <div className="flex items-center space-x-3">
            {token ? (
              <>
                <Link
                  to="/investigate/new"
                  className="inline-flex items-center space-x-2 px-3.5 py-2 rounded-lg text-sm font-semibold bg-blue-600 hover:bg-blue-700 text-white shadow-xs transition-all cursor-pointer"
                >
                  <FileSearch className="w-4 h-4" />
                  <span>Launch Case</span>
                </Link>
                <button
                  onClick={handleLogout}
                  className="inline-flex items-center space-x-1.5 px-3 py-2 rounded-lg text-xs font-semibold text-slate-600 hover:text-red-600 hover:bg-red-50 border border-slate-200 hover:border-red-200 transition-all cursor-pointer"
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
                  className="inline-flex items-center space-x-1.5 px-3 py-2 rounded-lg text-xs font-semibold text-slate-700 hover:text-blue-600 hover:bg-slate-50 border border-slate-200 transition-all cursor-pointer"
                >
                  <LogIn className="w-3.5 h-3.5" />
                  <span>Sign In</span>
                </Link>
                <Link
                  to="/signup"
                  className="inline-flex items-center space-x-1.5 px-3.5 py-2 rounded-lg text-xs font-semibold bg-blue-600 hover:bg-blue-700 text-white shadow-xs transition-all cursor-pointer"
                >
                  <UserCheck className="w-3.5 h-3.5" />
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
