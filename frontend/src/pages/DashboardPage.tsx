import React from 'react';
import { useQuery } from '@tanstack/react-query';
import { Link } from 'react-router-dom';
import { 
  ShieldAlert, 
  CheckCircle, 
  Clock, 
  AlertTriangle, 
  Activity, 
  ArrowRight,
  TrendingUp,
  FileSearch,
  Sparkles
} from 'lucide-react';
import { fetchDashboardStats } from '../services/api';
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, Cell } from 'recharts';

export const DashboardPage: React.FC = () => {
  const { data: stats, isLoading, isError } = useQuery({
    queryKey: ['dashboardStats'],
    queryFn: fetchDashboardStats
  });

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-[60vh]">
        <div className="text-center space-y-3">
          <div className="w-8 h-8 border-2 border-blue-600 border-t-transparent rounded-full animate-spin mx-auto"></div>
          <p className="text-sm text-slate-500 font-medium">Loading forensics telemetry...</p>
        </div>
      </div>
    );
  }

  if (isError || !stats) {
    return (
      <div className="p-8 text-center bg-red-50 border border-red-200 rounded-xl max-w-xl mx-auto my-12">
        <AlertTriangle className="w-8 h-8 text-red-500 mx-auto mb-3" />
        <h3 className="text-lg font-semibold text-slate-900">Failed to connect to backend engine</h3>
        <p className="text-sm text-slate-600 mt-1">Please ensure the FastAPI service is running on port 8000.</p>
      </div>
    );
  }

  const riskChartData = [
    { name: 'Critical', count: stats.risk_distribution.CRITICAL || 0, color: '#ef4444' },
    { name: 'High', count: stats.risk_distribution.HIGH || 0, color: '#f97316' },
    { name: 'Moderate', count: stats.risk_distribution.MODERATE || 0, color: '#eab308' },
    { name: 'Low', count: stats.risk_distribution.LOW || 0, color: '#22c55e' },
    { name: 'Insufficient', count: stats.risk_distribution.INSUFFICIENT_EVIDENCE || 0, color: '#94a3b8' },
  ];

  return (
    <div className="space-y-8 pb-12">
      {/* Top Banner */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 pb-6 border-b border-slate-200">
        <div>
          <h1 className="text-2xl font-bold text-slate-900 tracking-tight">Investigation Operations Center</h1>
          <p className="text-sm text-slate-500 mt-1">
            Real-time fraud telemetry and verified case findings aggregated strictly from authentic database records.
          </p>
        </div>
        <div className="flex items-center gap-3">
          <Link
            to="/investigate/new"
            className="inline-flex items-center space-x-2 px-4 py-2 rounded-lg text-sm font-semibold bg-blue-600 hover:bg-blue-700 text-white shadow-xs transition-all cursor-pointer"
          >
            <FileSearch className="w-4 h-4" />
            <span>New Investigation</span>
          </Link>
        </div>
      </div>

      {/* Metric Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
        <div className="p-5 rounded-xl bg-white border border-slate-200 shadow-xs">
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold text-slate-500 uppercase tracking-wider">Total Ingested Cases</span>
            <Activity className="w-4 h-4 text-blue-600" />
          </div>
          <div className="mt-2 flex items-baseline gap-2">
            <span className="text-3xl font-extrabold text-slate-900">{stats.total_investigations}</span>
            <span className="text-xs text-slate-500 font-medium">cases</span>
          </div>
        </div>

        <div className="p-5 rounded-xl bg-white border border-slate-200 shadow-xs">
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold text-slate-500 uppercase tracking-wider">Fully Correlated</span>
            <CheckCircle className="w-4 h-4 text-emerald-600" />
          </div>
          <div className="mt-2 flex items-baseline gap-2">
            <span className="text-3xl font-extrabold text-slate-900">{stats.completed_investigations}</span>
            <span className="text-xs text-slate-500 font-medium">completed</span>
          </div>
        </div>

        <div className="p-5 rounded-xl bg-white border border-slate-200 shadow-xs">
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold text-slate-500 uppercase tracking-wider">In-Flight Pipeline</span>
            <Clock className="w-4 h-4 text-amber-600" />
          </div>
          <div className="mt-2 flex items-baseline gap-2">
            <span className="text-3xl font-extrabold text-slate-900">{stats.analyzing_investigations}</span>
            <span className="text-xs text-slate-500 font-medium">active</span>
          </div>
        </div>
      </div>

      {/* Analytics Row */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Risk Distribution Chart */}
        <div className="p-6 rounded-xl bg-white border border-slate-200 shadow-xs flex flex-col justify-between">
          <div>
            <h3 className="text-base font-semibold text-slate-900 mb-1">Observed Risk Distribution</h3>
            <p className="text-xs text-slate-500 mb-6">Computed from verified indicators and contradiction severity.</p>
          </div>
          <div className="h-60 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={riskChartData}>
                <XAxis dataKey="name" stroke="#94a3b8" fontSize={12} tickLine={false} />
                <YAxis stroke="#94a3b8" fontSize={12} tickLine={false} allowDecimals={false} />
                <Tooltip 
                  contentStyle={{ backgroundColor: '#ffffff', borderColor: '#e2e8f0', borderRadius: '8px', color: '#0f172a', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }}
                />
                <Bar dataKey="count" radius={[4, 4, 0, 0]}>
                  {riskChartData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Common Observed Indicators */}
        <div className="p-6 rounded-xl bg-white border border-slate-200 shadow-xs">
          <h3 className="text-base font-semibold text-slate-900 mb-1">Frequent Observed Indicators</h3>
          <p className="text-xs text-slate-500 mb-4">Most prevalent heuristics flagged across analyzed submissions.</p>

          {stats.common_indicators.length === 0 ? (
            <div className="py-12 text-center text-slate-400 text-sm">
              No indicators recorded yet. Run your first investigation to see real telemetry.
            </div>
          ) : (
            <div className="space-y-3">
              {stats.common_indicators.map((ind, i) => (
                <div key={i} className="flex items-center justify-between p-3 rounded-lg bg-slate-50 border border-slate-200">
                  <div className="flex items-center space-x-3">
                    <span className="w-6 h-6 rounded-full bg-slate-200 text-slate-700 text-xs flex items-center justify-center font-mono font-medium">
                      #{i + 1}
                    </span>
                    <span className="text-sm font-medium text-slate-800">{ind.title}</span>
                  </div>
                  <span className="text-xs font-mono px-2 py-0.5 rounded bg-blue-50 text-blue-700 border border-blue-200 font-medium">
                    {ind.count} occurrences
                  </span>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Recent Investigations Table */}
      <div className="p-6 rounded-xl bg-white border border-slate-200 shadow-xs">
        <div className="flex items-center justify-between mb-4">
          <div>
            <h3 className="text-base font-semibold text-slate-900">Recent Investigations</h3>
            <p className="text-xs text-slate-500">Directly accessible case dossiers.</p>
          </div>
          <Link to="/history" className="text-xs font-semibold text-blue-600 hover:text-blue-700 flex items-center gap-1">
            <span>View All</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>

        {stats.recent_investigations.length === 0 ? (
          <div className="text-center py-12 border border-dashed border-slate-200 rounded-lg">
            <FileSearch className="w-8 h-8 text-slate-400 mx-auto mb-2" />
            <p className="text-sm text-slate-500">No investigations yet.</p>
            <Link
              to="/investigate/new"
              className="mt-3 inline-flex items-center gap-1.5 text-xs font-semibold text-blue-600 hover:text-blue-700"
            >
              <span>Launch a synthetic demo scenario</span>
              <ArrowRight className="w-3 h-3" />
            </Link>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left text-sm">
              <thead className="text-xs uppercase bg-slate-50 text-slate-500 border-b border-slate-200 font-semibold">
                <tr>
                  <th className="py-3 px-4">Title</th>
                  <th className="py-3 px-4">Context</th>
                  <th className="py-3 px-4">Status</th>
                  <th className="py-3 px-4">Assessed Risk</th>
                  <th className="py-3 px-4">Score</th>
                  <th className="py-3 px-4 text-right">Action</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {stats.recent_investigations.map((inv) => (
                  <tr key={inv.id} className="hover:bg-slate-50 transition-colors">
                    <td className="py-3 px-4 font-medium text-slate-900">
                      <div className="flex items-center gap-2">
                        <span>{inv.title}</span>
                        {inv.is_demo && (
                          <span className="text-[10px] font-mono px-1.5 py-0.5 rounded bg-amber-50 text-amber-700 border border-amber-200 font-semibold">
                            DEMO
                          </span>
                        )}
                      </div>
                    </td>
                    <td className="py-3 px-4 text-slate-600 capitalize">{inv.context_type}</td>
                    <td className="py-3 px-4">
                      <span className="text-xs px-2 py-0.5 rounded font-mono bg-slate-100 text-slate-700 border border-slate-200 font-medium">
                        {inv.status}
                      </span>
                    </td>
                    <td className="py-3 px-4">
                      {inv.risk_level ? (
                        <span className={`text-xs px-2 py-0.5 rounded font-semibold ${
                          inv.risk_level === 'CRITICAL' ? 'bg-red-50 text-red-700 border border-red-200' :
                          inv.risk_level === 'HIGH' ? 'bg-orange-50 text-orange-700 border border-orange-200' :
                          inv.risk_level === 'MODERATE' ? 'bg-amber-50 text-amber-700 border border-amber-200' :
                          'bg-emerald-50 text-emerald-700 border border-emerald-200'
                        }`}>
                          {inv.risk_level}
                        </span>
                      ) : (
                        <span className="text-xs text-slate-400">In Progress</span>
                      )}
                    </td>
                    <td className="py-3 px-4 font-mono text-slate-700 font-medium">
                      {inv.risk_score !== undefined && inv.risk_score !== null ? `${inv.risk_score}/100` : '—'}
                    </td>
                    <td className="py-3 px-4 text-right">
                      <Link
                        to={`/investigations/${inv.id}`}
                        className="text-xs font-semibold text-blue-600 hover:text-blue-700"
                      >
                        Inspect Dossier &rarr;
                      </Link>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
};
