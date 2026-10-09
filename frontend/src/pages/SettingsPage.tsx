import React from 'react';
import { useQuery } from '@tanstack/react-query';
import { fetchIntegrationStatus } from '../services/api';
import { 
  Settings, 
  Cpu, 
  ShieldCheck, 
  TestTube, 
  Globe, 
  CheckCircle2, 
  XCircle,
  AlertCircle
} from 'lucide-react';

export const SettingsPage: React.FC = () => {
  const { data: status, isLoading } = useQuery({
    queryKey: ['integrationStatus'],
    queryFn: fetchIntegrationStatus
  });

  return (
    <div className="max-w-4xl mx-auto space-y-8 pb-16">
      <div>
        <h1 className="text-2xl font-bold text-slate-900 tracking-tight">System Settings & Threat Feeds</h1>
        <p className="text-sm text-slate-500 mt-1">
          Inspect configured AI engines, threat-intelligence provider adapters, and sandbox demonstration modes.
        </p>
      </div>

      <div className="space-y-6">
        {/* AI Engine Status */}
        <div className="p-6 rounded-xl bg-white border border-slate-200 shadow-xs space-y-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="p-2.5 rounded-lg bg-blue-50 text-blue-600 border border-blue-200">
                <Cpu className="w-5 h-5" />
              </div>
              <div>
                <h3 className="text-base font-semibold text-slate-900">AI Language Reasoning Engine</h3>
                <p className="text-xs text-slate-500">Claims extraction and natural language deconstruction.</p>
              </div>
            </div>
            <span className="text-xs font-mono uppercase px-2.5 py-1 rounded bg-blue-50 text-blue-700 border border-blue-200 font-semibold">
              Provider: {status?.ai_provider || 'DEMO / DETERMINISTIC'}
            </span>
          </div>

          <div className="p-4 rounded-lg bg-slate-50 border border-slate-200 text-xs text-slate-700 leading-relaxed">
            <div className="flex items-center gap-2 mb-2 font-semibold text-slate-900">
              {status?.ai_available ? (
                <>
                  <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                  <span>Configured & Operational</span>
                </>
              ) : (
                <>
                  <AlertCircle className="w-4 h-4 text-amber-600" />
                  <span>Degraded to Deterministic / Demo Rules</span>
                </>
              )}
            </div>
            Supports Mistral AI (MISTRAL_API_KEY), Google Gemini (GEMINI_API_KEY) and OpenAI (OPENAI_API_KEY) via environment variables. When external keys are absent, TrustTrace automatically switches to its deterministic forensic claim engine without crashing or degrading core security checks.
          </div>
        </div>

        {/* Threat Intelligence Integrations */}
        <div className="p-6 rounded-xl bg-white border border-slate-200 shadow-xs space-y-4">
          <div className="flex items-center gap-3">
            <div className="p-2.5 rounded-lg bg-indigo-50 text-indigo-600 border border-indigo-200">
              <Globe className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-base font-semibold text-slate-900">Threat Intelligence Providers</h3>
              <p className="text-xs text-slate-500">External reputation lookups with strict SSRF defenses.</p>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="p-4 rounded-lg bg-slate-50 border border-slate-200 flex items-center justify-between">
              <div>
                <div className="text-sm font-semibold text-slate-900">Google Safe Browsing</div>
                <div className="text-[11px] text-slate-500">Phishing & Malware Web API</div>
              </div>
              <span className={`text-[10px] font-mono px-2 py-0.5 rounded font-bold ${
                status?.threat_intel_safebrowsing_active 
                  ? 'bg-emerald-50 text-emerald-700 border border-emerald-200' 
                  : 'bg-slate-200 text-slate-600'
              }`}>
                {status?.threat_intel_safebrowsing_active ? 'LIVE ACTIVE' : 'UNCONFIGURED (FALLBACK)'}
              </span>
            </div>

            <div className="p-4 rounded-lg bg-slate-50 border border-slate-200 flex items-center justify-between">
              <div>
                <div className="text-sm font-semibold text-slate-900">URLhaus by abuse.ch</div>
                <div className="text-[11px] text-slate-500">Malicious URL Database</div>
              </div>
              <span className={`text-[10px] font-mono px-2 py-0.5 rounded font-bold ${
                status?.threat_intel_urlhaus_active 
                  ? 'bg-emerald-50 text-emerald-700 border border-emerald-200' 
                  : 'bg-slate-200 text-slate-600'
              }`}>
                {status?.threat_intel_urlhaus_active ? 'LIVE ACTIVE' : 'SYNTHETIC LAB MODE'}
              </span>
            </div>
          </div>
        </div>

        {/* Demonstration Mode & Transparency */}
        <div className="p-6 rounded-xl bg-white border border-slate-200 shadow-xs space-y-4">
          <div className="flex items-center gap-3">
            <div className="p-2.5 rounded-lg bg-amber-50 text-amber-600 border border-amber-200">
              <TestTube className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-base font-semibold text-slate-900">Demonstration & Evaluation Lab</h3>
              <p className="text-xs text-slate-500">Zero-cost synthetic benchmarking.</p>
            </div>
          </div>

          <div className="p-4 rounded-lg bg-slate-50 border border-slate-200 space-y-2 text-xs text-slate-700">
            <p>
              In demonstration mode, synthetic benchmark feeds simulate threat-intelligence outcomes for controlled evaluations.
            </p>
            <div className="p-3 rounded-lg bg-amber-50 border border-amber-200 text-amber-800 flex items-center gap-2 text-xs">
              <AlertCircle className="w-4 h-4 shrink-0 text-amber-600" />
              <span>Simulated results are always visibly labeled with a [SIMULATED] badge in reports and case dossiers to prevent misleading conclusions.</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
