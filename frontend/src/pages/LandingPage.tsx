import React from 'react';
import { Link } from 'react-router-dom';
import { 
  ShieldAlert, 
  FileCheck2, 
  Network, 
  Scale, 
  Lock, 
  ArrowRight, 
  CheckCircle2, 
  AlertTriangle,
  HelpCircle,
  Eye
} from 'lucide-react';

export const LandingPage: React.FC = () => {
  return (
    <div className="space-y-16 pb-16">
      {/* Hero Section */}
      <section className="pt-8 text-center max-w-4xl mx-auto px-4">
        <h1 className="text-4xl sm:text-6xl font-extrabold tracking-tight text-slate-900 mb-6 leading-tight">
          Investigate Suspicious Messages <br />
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 via-indigo-600 to-sky-600">
            Before You Send Money or Trust An Identity
          </span>
        </h1>
        <p className="text-lg text-slate-600 max-w-2xl mx-auto mb-8 leading-relaxed">
          Not a generic scam classifier. TrustTrace systematically extracts discrete claims, inspects infrastructure indicators, verifies identity contradictions, and generates defensible evidence graphs with actionable next steps.
        </p>
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <Link
            to="/investigate/new"
            className="w-full sm:w-auto inline-flex items-center justify-center space-x-2 px-6 py-3 rounded-lg text-base font-semibold bg-blue-600 hover:bg-blue-700 text-white shadow-md shadow-blue-500/20 transition-all hover:shadow-lg"
          >
            <span>Start Investigation</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
          <Link
            to="/dashboard"
            className="w-full sm:w-auto inline-flex items-center justify-center space-x-2 px-6 py-3 rounded-lg text-base font-medium bg-white hover:bg-slate-50 text-slate-700 border border-slate-300 shadow-xs transition-colors"
          >
            <Eye className="w-4 h-4 text-slate-500" />
            <span>View Forensics Dashboard</span>
          </Link>
        </div>
      </section>

      {/* Core Differentiator Grid */}
      <section className="max-w-7xl mx-auto px-4">
        <div className="text-center mb-10">
          <h2 className="text-2xl sm:text-3xl font-bold text-slate-900">The Six Core Forensics Questions</h2>
          <p className="text-slate-500 mt-2 text-sm max-w-xl mx-auto">
            Traditional tools give you an arbitrary "85% Scam" verdict. TrustTrace answers the questions that matter in real-world fraud investigations:
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="p-6 rounded-xl bg-white border border-slate-200 shadow-xs hover:shadow-md transition-shadow">
            <div className="w-10 h-10 rounded-lg bg-blue-50 text-blue-600 flex items-center justify-center mb-4 border border-blue-100">
              <FileCheck2 className="w-5 h-5" />
            </div>
            <h3 className="text-lg font-bold text-slate-900 mb-2">1. Discrete Claim Extraction</h3>
            <p className="text-sm text-slate-600 leading-relaxed">
              Deconstructs untrusted communications into testable assertions (claimed package hold, urgency penalty, payment demand).
            </p>
          </div>

          <div className="p-6 rounded-xl bg-white border border-slate-200 shadow-xs hover:shadow-md transition-shadow">
            <div className="w-10 h-10 rounded-lg bg-red-50 text-red-600 flex items-center justify-center mb-4 border border-red-100">
              <Scale className="w-5 h-5" />
            </div>
            <h3 className="text-lg font-bold text-slate-900 mb-2">2. Contradiction Analysis</h3>
            <p className="text-sm text-slate-600 leading-relaxed">
              Proves identity mismatch directly: when claimed authority is "USPS" but target destination resolves to an unauthorized ".top" or bare IP domain.
            </p>
          </div>

          <div className="p-6 rounded-xl bg-white border border-slate-200 shadow-xs hover:shadow-md transition-shadow">
            <div className="w-10 h-10 rounded-lg bg-indigo-50 text-indigo-600 flex items-center justify-center mb-4 border border-indigo-100">
              <Network className="w-5 h-5" />
            </div>
            <h3 className="text-lg font-bold text-slate-900 mb-2">3. Evidence Correlation Graph</h3>
            <p className="text-sm text-slate-600 leading-relaxed">
              Visual interactive graph mapping nodes between entities, claims, indicators, lookups, and contradictions.
            </p>
          </div>

          <div className="p-6 rounded-xl bg-white border border-slate-200 shadow-xs hover:shadow-md transition-shadow">
            <div className="w-10 h-10 rounded-lg bg-amber-50 text-amber-600 flex items-center justify-center mb-4 border border-amber-100">
              <AlertTriangle className="w-5 h-5" />
            </div>
            <h3 className="text-lg font-bold text-slate-900 mb-2">4. Transparent Risk Scoring</h3>
            <p className="text-sm text-slate-600 leading-relaxed">
              Documented, deterministic severity weights and evidence confidence coverage rather than an unverifiable black box.
            </p>
          </div>

          <div className="p-6 rounded-xl bg-white border border-slate-200 shadow-xs hover:shadow-md transition-shadow">
            <div className="w-10 h-10 rounded-lg bg-sky-50 text-sky-600 flex items-center justify-center mb-4 border border-sky-100">
              <HelpCircle className="w-5 h-5" />
            </div>
            <h3 className="text-lg font-bold text-slate-900 mb-2">5. Honest Uncertainty Reporting</h3>
            <p className="text-sm text-slate-600 leading-relaxed">
              Explicitly categorizes what remains unverified. Absence of a threat-intel match is never misrepresented as proof of safety.
            </p>
          </div>

          <div className="p-6 rounded-xl bg-white border border-slate-200 shadow-xs hover:shadow-md transition-shadow">
            <div className="w-10 h-10 rounded-lg bg-emerald-50 text-emerald-600 flex items-center justify-center mb-4 border border-emerald-100">
              <Lock className="w-5 h-5" />
            </div>
            <h3 className="text-lg font-bold text-slate-900 mb-2">6. Actionable Response Playbook</h3>
            <p className="text-sm text-slate-600 leading-relaxed">
              Generates personalized verification checklists linked to exact findings, including independent official channel verification and incident response steps.
            </p>
          </div>
        </div>
      </section>

      {/* Security and Privacy Assurance */}
      <section className="max-w-4xl mx-auto px-4 p-8 rounded-2xl bg-white border border-slate-200 shadow-sm">
        <div className="flex items-start space-x-4">
          <div className="p-3 bg-blue-50 border border-blue-200 rounded-xl text-blue-600">
            <Lock className="w-6 h-6" />
          </div>
          <div>
            <h3 className="text-lg font-bold text-slate-900 mb-1">SSRF Defense & Privacy Isolation</h3>
            <p className="text-sm text-slate-600 leading-relaxed mb-4">
              TrustTrace never runs browser sandboxes or downloads untrusted binaries on user targets. Outbound network checks enforce strict RFC 1918 / Cloud Metadata (169.254.169.254) blocking. Client phone numbers and personal emails can be automatically redacted before AI extraction.
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs font-medium text-slate-700">
              <div className="flex items-center space-x-1.5">
                <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                <span>Zero Execution of Untrusted URLs</span>
              </div>
              <div className="flex items-center space-x-1.5">
                <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                <span>Transparent Simulated Demo Lab Fallback</span>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};
