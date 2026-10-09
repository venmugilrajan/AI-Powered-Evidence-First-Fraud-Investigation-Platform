import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { ShieldAlert, Lock, Mail, AlertCircle, ArrowRight } from 'lucide-react';
import { loginUser } from '../services/api';

export const LoginPage: React.FC = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [rememberMe, setRememberMe] = useState(true);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    if (!email.trim() || !password.trim()) {
      setError('Please provide your email and password.');
      return;
    }

    setLoading(true);
    try {
      await loginUser({
        email: email.trim(),
        password: password.trim(),
        rememberMe
      });
      navigate('/dashboard');
    } catch (err: any) {
      setError(err.message || 'Login failed. Please check your credentials.');
    } finally {
      setLoading(false);
    }
  };

  const handleFillDemo = () => {
    setEmail('analyst@trusttrace.ai');
    setPassword('Password123!');
  };

  return (
    <div className="min-h-[75vh] flex items-center justify-center py-10 px-4">
      <div className="max-w-md w-full bg-white/85 backdrop-blur-xl border border-white rounded-[32px] p-8 sm:p-10 shadow-[0_20px_50px_-15px_rgba(0,0,0,0.06)] space-y-6">
        
        {/* Header with pill logo and Syne heading */}
        <div className="text-center space-y-2">
          <div className="inline-flex p-3 bg-[#EFECE6] border border-[#DDD7CD] rounded-2xl text-[#18191B] mb-1">
            <ShieldAlert className="w-6 h-6 text-emerald-600" />
          </div>
          <h1 className="font-heading text-2xl sm:text-3xl font-bold tracking-tight text-[#18191B]">
            Sign in to TrustTrace
          </h1>
          <p className="text-xs text-[#6B6862] font-sans">
            Access secure fraud investigation dossiers, telemetry & evidence graphs
          </p>
        </div>

        {error && (
          <div className="p-3.5 rounded-2xl bg-rose-50 border border-rose-200 text-rose-800 text-xs flex items-center gap-2 font-sans">
            <AlertCircle className="w-4 h-4 shrink-0 text-rose-600" />
            <span>{error}</span>
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-xs font-mono font-medium text-[#54514A] mb-1.5">
              Email Address
            </label>
            <div className="relative">
              <Mail className="w-4 h-4 absolute left-3.5 top-3 text-[#8C8880]" />
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="analyst@trusttrace.ai"
                required
                className="w-full pl-10 pr-4 py-2.5 bg-[#F7F5F0] border border-[#E5DFD7] rounded-full text-xs text-[#18191B] placeholder-[#8C8880] focus:outline-none focus:bg-white focus:border-[#18191B] focus:ring-1 focus:ring-[#18191B] transition-all font-sans"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-mono font-medium text-[#54514A] mb-1.5">
              Password
            </label>
            <div className="relative">
              <Lock className="w-4 h-4 absolute left-3.5 top-3 text-[#8C8880]" />
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••••••"
                required
                className="w-full pl-10 pr-4 py-2.5 bg-[#F7F5F0] border border-[#E5DFD7] rounded-full text-xs text-[#18191B] placeholder-[#8C8880] focus:outline-none focus:bg-white focus:border-[#18191B] focus:ring-1 focus:ring-[#18191B] transition-all font-sans"
              />
            </div>
          </div>

          <div className="flex items-center justify-between pt-1 text-xs">
            <label className="flex items-center gap-2 cursor-pointer select-none">
              <input
                type="checkbox"
                checked={rememberMe}
                onChange={(e) => setRememberMe(e.target.checked)}
                className="w-4 h-4 rounded text-[#18191B] border-[#DDD7CD] focus:ring-[#18191B] cursor-pointer accent-[#18191B]"
              />
              <span className="text-xs font-medium text-[#54514A] font-sans">Remember me</span>
            </label>

            <button
              type="button"
              onClick={handleFillDemo}
              className="text-xs text-emerald-800 hover:text-emerald-950 font-mono font-medium cursor-pointer"
            >
              Fill Demo Credentials
            </button>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full py-3 px-5 rounded-full bg-[#18191B] hover:bg-black text-white font-medium text-xs shadow-md hover:shadow-lg transition-all flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50"
          >
            {loading ? (
              <>
                <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                <span className="font-sans">Signing In...</span>
              </>
            ) : (
              <>
                <span className="font-sans">Sign In</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </>
            )}
          </button>
        </form>

        <div className="text-center pt-3 border-t border-[#EAE6DE]">
          <p className="text-xs text-[#6B6862] font-sans">
            Don't have an account yet?{' '}
            <Link to="/signup" className="text-[#18191B] hover:underline font-semibold font-sans">
              Create an account
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};
