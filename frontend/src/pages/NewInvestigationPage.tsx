import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  FileSearch, 
  Sparkles, 
  ShieldCheck, 
  AlertCircle, 
  Lock, 
  HelpCircle,
  Package,
  Briefcase,
  CreditCard,
  CheckCircle2
} from 'lucide-react';
import { createInvestigation } from '../services/api';

const DEMO_PRESETS = [
  {
    title: 'Suspicious Postal Redelivery Fee',
    context_type: 'delivery',
    claimed_org: 'USPS',
    text: 'USPS Notice: Your parcel #940011 is delayed due to an incorrect address. Pay $1.99 redelivery fee within 24 hours at http://usps-redelivery-fee-update.top or package will be returned to sender.',
    url: 'http://usps-redelivery-fee-update.top',
    desc: 'Classic delivery impersonation with urgent fee and mismatched TLD.'
  },
  {
    title: 'High-Paying Part-Time Job Offer',
    context_type: 'employment',
    claimed_org: 'Amazon Recruitment',
    text: 'Hello! I am Sarah from Amazon Recruitment HR. You have been shortlisted for an online task rating role paying $300-$500 daily. Immediate start. Contact our manager on Telegram @amazon_hr_tasks to verify your slot.',
    url: '',
    desc: 'Recruitment scam redirecting to Telegram with unverified daily salary.'
  },
  {
    title: 'Urgent Bank KYC / Account Freeze Alert',
    context_type: 'banking',
    claimed_org: 'HDFC Bank',
    text: 'Dear Customer, your HDFC bank netbanking access has been frozen due to expired PAN KYC. Update immediately at http://secure-login-hdfc-kyc.com or send verification to 9876543210@okhdfcbank to prevent penalty.',
    url: 'http://secure-login-hdfc-kyc.com',
    payment_handle: '9876543210@okhdfcbank',
    desc: 'Banking credential harvesting targeting netbanking login.'
  },
  {
    title: 'Legitimate Official Delivery Notification',
    context_type: 'delivery',
    claimed_org: 'USPS',
    text: 'USPS tracking update: Package #940011 has departed our sorting hub in Chicago, IL. Track updates online at https://usps.com/tracking or through your mobile app.',
    url: 'https://usps.com',
    desc: 'Clean control sample pointing directly to authentic official domain.'
  }
];

export const NewInvestigationPage: React.FC = () => {
  const navigate = useNavigate();

  const [title, setTitle] = useState('');
  const [contextType, setContextType] = useState('delivery');
  const [claimedOrg, setClaimedOrg] = useState('');
  const [rawText, setRawText] = useState('');
  const [rawUrl, setRawUrl] = useState('');
  const [paymentHandle, setPaymentHandle] = useState('');
  const [notes, setNotes] = useState('');
  const [redactPii, setRedactPii] = useState(true);
  const [isDemoScenario, setIsDemoScenario] = useState(false);

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleApplyPreset = (preset: typeof DEMO_PRESETS[0]) => {
    setTitle(preset.title);
    setContextType(preset.context_type);
    setClaimedOrg(preset.claimed_org);
    setRawText(preset.text);
    setRawUrl(preset.url);
    setPaymentHandle(preset.payment_handle || '');
    setIsDemoScenario(true);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    if (!rawText.trim() && !rawUrl.trim() && !paymentHandle.trim()) {
      setError('Please provide at least a message body, target URL, or payment identifier.');
      return;
    }

    setIsSubmitting(true);
    try {
      const inv = await createInvestigation({
        title: title.trim() || undefined,
        context_type: contextType,
        raw_text: rawText.trim() || undefined,
        raw_url: rawUrl.trim() || undefined,
        claimed_organization: claimedOrg.trim() || undefined,
        payment_handle: paymentHandle.trim() || undefined,
        notes: notes.trim() || undefined,
        enable_pii_redaction: redactPii,
        is_demo_scenario: isDemoScenario
      });

      navigate(`/investigations/${inv.id}`);
    } catch (err: any) {
      setError(err.message || 'Investigation submission failed');
      setIsSubmitting(false);
    }
  };

  return (
    <div className="max-w-4xl mx-auto space-y-8 pb-16">
      {/* Page Header */}
      <div>
        <h1 className="text-2xl font-bold text-slate-900 tracking-tight">New Forensic Investigation</h1>
        <p className="text-sm text-slate-500 mt-1">
          Submit suspicious communication text, links, or payment handles for multi-stage forensic deconstruction.
        </p>
      </div>

      {/* Preset Scenarios Carousel/Pills */}
      <div className="p-5 rounded-xl bg-white border border-slate-200 shadow-xs">
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center gap-2">
            <Sparkles className="w-4 h-4 text-amber-500" />
            <h2 className="text-xs font-semibold uppercase tracking-wider text-slate-700">
              Try a Synthetic Benchmark Scenario
            </h2>
          </div>
          <span className="text-[10px] text-slate-400 font-mono font-medium">1-CLICK BENCHMARKS</span>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          {DEMO_PRESETS.map((p, i) => (
            <button
              key={i}
              type="button"
              onClick={() => handleApplyPreset(p)}
              className="text-left p-3.5 rounded-lg bg-slate-50 hover:bg-blue-50/60 border border-slate-200 hover:border-blue-300 transition-all group cursor-pointer"
            >
              <div className="font-medium text-xs text-blue-600 group-hover:text-blue-700 flex items-center justify-between">
                <span>{p.title}</span>
                <span className="text-[10px] px-2 py-0.5 rounded bg-white text-slate-600 border border-slate-200 font-medium">
                  {p.claimed_org}
                </span>
              </div>
              <p className="text-[11px] text-slate-600 mt-1.5 line-clamp-2 leading-relaxed">{p.desc}</p>
            </button>
          ))}
        </div>
      </div>

      {/* Form Container */}
      <form onSubmit={handleSubmit} className="p-6 rounded-xl bg-white border border-slate-200 shadow-xs space-y-6">
        {error && (
          <div className="p-3.5 rounded-lg bg-red-50 border border-red-200 text-red-700 text-sm flex items-center gap-2">
            <AlertCircle className="w-4 h-4 shrink-0 text-red-500" />
            <span>{error}</span>
          </div>
        )}

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
          {/* Title */}
          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-1.5">
              Case Title (Optional)
            </label>
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="e.g., Suspicious Delivery Fee SMS"
              className="w-full px-3 py-2 bg-slate-50/50 border border-slate-300 rounded-lg text-sm text-slate-900 placeholder-slate-400 focus:outline-none focus:bg-white focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-colors"
            />
          </div>

          {/* Context Selector */}
          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-1.5">
              Investigation Context
            </label>
            <select
              value={contextType}
              onChange={(e) => setContextType(e.target.value)}
              className="w-full px-3 py-2 bg-slate-50/50 border border-slate-300 rounded-lg text-sm text-slate-900 focus:outline-none focus:bg-white focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-colors"
            >
              <option value="delivery">Package / Courier Delivery</option>
              <option value="banking">Banking & Payment Alert</option>
              <option value="employment">Job Offer / Recruitment</option>
              <option value="marketplace">Online Marketplace / Shopping</option>
              <option value="general">General Suspicious Message</option>
            </select>
          </div>
        </div>

        {/* Claimed Organization */}
        <div>
          <label className="block text-xs font-semibold text-slate-700 mb-1.5">
            Claimed Sender or Organization
          </label>
          <input
            type="text"
            value={claimedOrg}
            onChange={(e) => setClaimedOrg(e.target.value)}
            placeholder="e.g., USPS, Amazon, HDFC Bank, PayPal"
            className="w-full px-3 py-2 bg-slate-50/50 border border-slate-300 rounded-lg text-sm text-slate-900 placeholder-slate-400 focus:outline-none focus:bg-white focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-colors"
          />
          <span className="text-[11px] text-slate-500 mt-1 block">
            Used by the verification engine to cross-reference official domain authoritative registries.
          </span>
        </div>

        {/* Raw Text Body */}
        <div>
          <label className="block text-xs font-semibold text-slate-700 mb-1.5">
            Suspicious Message / Email Text Body
          </label>
          <textarea
            rows={5}
            value={rawText}
            onChange={(e) => setRawText(e.target.value)}
            placeholder="Paste raw SMS, email body, WhatsApp message, or direct message..."
            className="w-full px-3 py-2 bg-slate-50/50 border border-slate-300 rounded-lg text-sm text-slate-900 placeholder-slate-400 focus:outline-none focus:bg-white focus:border-blue-500 focus:ring-1 focus:ring-blue-500 font-mono text-xs transition-colors"
          />
        </div>

        {/* Additional Inputs (URL + Payment) */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-1.5">
              Embedded URL / Link (Optional)
            </label>
            <input
              type="text"
              value={rawUrl}
              onChange={(e) => setRawUrl(e.target.value)}
              placeholder="http://..."
              className="w-full px-3 py-2 bg-slate-50/50 border border-slate-300 rounded-lg text-xs text-slate-900 placeholder-slate-400 focus:outline-none focus:bg-white focus:border-blue-500 focus:ring-1 focus:ring-blue-500 font-mono transition-colors"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-1.5">
              Payment Handle / UPI / VPA (Optional)
            </label>
            <input
              type="text"
              value={paymentHandle}
              onChange={(e) => setPaymentHandle(e.target.value)}
              placeholder="e.g. merchant@upi or user@okhdfcbank"
              className="w-full px-3 py-2 bg-slate-50/50 border border-slate-300 rounded-lg text-xs text-slate-900 placeholder-slate-400 focus:outline-none focus:bg-white focus:border-blue-500 focus:ring-1 focus:ring-blue-500 font-mono transition-colors"
            />
          </div>
        </div>

        {/* Privacy & Redaction Guard */}
        <div className="p-4 rounded-lg bg-slate-50 border border-slate-200 flex items-start justify-between gap-4">
          <div className="flex items-start gap-3">
            <Lock className="w-4 h-4 text-emerald-600 mt-0.5 shrink-0" />
            <div>
              <div className="text-xs font-semibold text-slate-800">
                Pre-Execution PII Redaction Guard
              </div>
              <div className="text-[11px] text-slate-500 mt-0.5">
                Automatically masks recipient phone numbers and obfuscates personal email handles before sending data to third-party LLM APIs.
              </div>
            </div>
          </div>
          <label className="relative inline-flex items-center cursor-pointer">
            <input
              type="checkbox"
              checked={redactPii}
              onChange={(e) => setRedactPii(e.target.checked)}
              className="sr-only peer"
            />
            <div className="w-9 h-5 bg-slate-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-slate-300 after:border after:rounded-full after:h-4 after:w-4 after:transition-all peer-checked:bg-blue-600"></div>
          </label>
        </div>

        {/* Submit Actions */}
        <div className="flex items-center justify-end gap-3 pt-3 border-t border-slate-100">
          <button
            type="submit"
            disabled={isSubmitting}
            className="inline-flex items-center space-x-2 px-6 py-2.5 rounded-lg text-sm font-semibold bg-blue-600 hover:bg-blue-700 text-white shadow-xs disabled:opacity-50 transition-all cursor-pointer"
          >
            {isSubmitting ? (
              <>
                <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                <span>Executing Pipeline...</span>
              </>
            ) : (
              <>
                <FileSearch className="w-4 h-4" />
                <span>Launch Investigation</span>
              </>
            )}
          </button>
        </div>
      </form>
    </div>
  );
};
