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
  Sparkles,
  Layers,
  Search,
  ShieldCheck,
  ChevronRight
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
          <div className="w-9 h-9 border-2 border-[#182B1B] border-t-transparent rounded-full animate-spin mx-auto"></div>
          <p className="text-xs font-mono uppercase tracking-wider text-[#736B59]">Correlating forensic telemetry...</p>
        </div>
      </div>
    );
  }

  if (isError || !stats) {
    return (
      <div className="p-8 text-center bg-[#FDEEEE] border border-[#F6CACA] rounded-2xl max-w-xl mx-auto my-12">
        <AlertTriangle className="w-8 h-8 text-[#A62626] mx-auto mb-3" />
        <h3 className="font-serif text-lg font-bold text-[#171A1C]">Failed to connect to backend engine</h3>
        <p className="text-xs text-[#5F5849] mt-1 font-sans">Please ensure the FastAPI service is running on port 8000.</p>
      </div>
    );
  }

  const riskChartData = [
    { name: 'Critical', count: stats.risk_distribution.CRITICAL || 0, color: '#A62626' },
    { name: 'High', count: stats.risk_distribution.HIGH || 0, color: '#C95D22' },
    { name: 'Moderate', count: stats.risk_distribution.MODERATE || 0, color: '#A66F17' },
    { name: 'Low', count: stats.risk_distribution.LOW || 0, color: '#245229' },
    { name: 'Insufficient', count: stats.risk_distribution.INSUFFICIENT_EVIDENCE || 0, color: '#7D7667' },
  ];

  return (
    <div className="space-y-10 pb-16">
      
      {/* Top Banner / Operations Header */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 pb-6 border-b border-[#E4DFD3]">
        <div>
          <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-[#EFECE3] border border-[#DDD7C7] text-[#474235] text-[11px] font-mono font-medium mb-2">
            <span className="w-2 h-2 rounded-full bg-[#245229] inline-block animate-pulse" />
            <span>Telemetry Operational</span>
          </div>
          <h1 className="font-serif text-3xl sm:text-4xl font-bold text-[#171A1C] tracking-tight">
            Investigation Operations Center
          </h1>
          <p className="text-xs sm:text-sm text-[#5F5849] mt-1 font-sans">
            Real-time fraud telemetry and verified case findings aggregated strictly from authentic database records.
          </p>
        </div>
        
        <div className="flex items-center gap-3">
          <Link
            to="/investigate/new"
            className="inline-flex items-center space-x-2 px-5 py-2.5 rounded-full text-xs font-semibold bg-[#182B1B] hover:bg-[#253D29] text-[#FAF8F5] shadow-sm transition-all cursor-pointer"
          >
            <FileSearch className="w-3.5 h-3.5 text-[#C4DDBC]" />
            <span>New Investigation</span>
          </Link>
        </div>
      </div>

      {/* Metric Cards - Editorial Luxury High-Contrast Style */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
        
        <div className="p-6 rounded-2xl bg-[#182B1B] text-[#FAF8F5] border border-[#2B472F] shadow-md relative overflow-hidden">
          <div className="absolute top-0 right-0 w-32 h-32 bg-[#2B4E32]/20 rounded-full blur-2xl pointer-events-none" />
          <div className="flex items-center justify-between">
            <span className="text-[11px] font-mono uppercase tracking-wider text-[#8FA88D]">Total Ingested Cases</span>
            <Activity className="w-4 h-4 text-[#8FA88D]" />
          </div>
          <div className="mt-4 flex items-baseline gap-2">
            <span className="font-serif text-4xl font-bold text-white">{stats.total_investigations}</span>
            <span className="text-xs font-mono text-[#8FA88D]">active dossiers</span>
          </div>
          <div className="mt-4 pt-3 border-t border-[#2C4830] text-[11px] font-mono text-[#A8C4A6] flex items-center justify-between">
            <span>Persistence: Postgres DB</span>
            <span>Audited</span>
          </div>
        </div>

        <div className="p-6 rounded-2xl bg-[#FAF8F5] border border-[#E4DFD3] shadow-xs">
          <div className="flex items-center justify-between">
            <span className="text-[11px] font-mono uppercase tracking-wider text-[#736B59]">Fully Correlated</span>
            <CheckCircle className="w-4 h-4 text-[#245229]" />
          </div>
          <div className="mt-4 flex items-baseline gap-2">
            <span className="font-serif text-4xl font-bold text-[#171A1C]">{stats.completed_investigations}</span>
            <span className="text-xs font-mono text-[#736B59]">completed</span>
          </div>
          <div className="mt-4 pt-3 border-t border-[#EAE5D8] text-[11px] font-mono text-[#5F5849] flex items-center justify-between">
            <span>Evidence Graph: Built</span>
            <span>100% Provenance</span>
          </div>
        </div>

        <div className="p-6 rounded-2xl bg-[#FAF8F5] border border-[#E4DFD3] shadow-xs">
          <div className="flex items-center justify-between">
            <span className="text-[11px] font-mono uppercase tracking-wider text-[#736B59]">In-Flight Pipeline</span>
            <Clock className="w-4 h-4 text-[#A66F17]" />
          </div>
          <div className="mt-4 flex items-baseline gap-2">
            <span className="font-serif text-4xl font-bold text-[#171A1C]">{stats.analyzing_investigations}</span>
            <span className="text-xs font-mono text-[#736B59]">scanning</span>
          </div>
          <div className="mt-4 pt-3 border-t border-[#EAE5D8] text-[11px] font-mono text-[#5F5849] flex items-center justify-between">
            <span>Async Workers</span>
            <span>Healthy</span>
          </div>
        </div>

      </div>

      {/* Analytics Row */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        
        {/* Risk Distribution Chart */}
        <div className="p-6 rounded-2xl bg-[#FAF8F5] border border-[#E4DFD3] shadow-xs flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between mb-1">
              <h3 className="font-serif text-lg font-bold text-[#171A1C]">Observed Risk Distribution</h3>
              <span className="text-[10px] font-mono uppercase px-2 py-0.5 rounded-full bg-[#EFECE3] text-[#5F5849]">Severity Tiers</span>
            </div>
            <p className="text-xs text-[#5F5849] mb-6 font-sans">Computed from verified indicators and contradiction severity.</p>
          </div>
          
          <div className="h-64 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={riskChartData}>
                <XAxis dataKey="name" stroke="#8C8472" fontSize={11} tickLine={false} />
                <YAxis stroke="#8C8472" fontSize={11} tickLine={false} allowDecimals={false} />
                <Tooltip 
                  contentStyle={{ 
                    backgroundColor: '#FAF8F5', 
                    borderColor: '#DDD7C7', 
                    borderRadius: '12px', 
                    color: '#171A1C', 
                    fontSize: '12px',
                    boxShadow: '0 8px 16px -4px rgba(0,0,0,0.06)' 
                  }}
                />
                <Bar dataKey="count" radius={[6, 6, 0, 0]}>
                  {riskChartData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Common Observed Indicators */}
        <div className="p-6 rounded-2xl bg-[#FAF8F5] border border-[#E4DFD3] shadow-xs">
          <div className="flex items-center justify-between mb-1">
            <h3 className="font-serif text-lg font-bold text-[#171A1C]">Frequent Observed Indicators</h3>
            <span className="text-[10px] font-mono uppercase px-2 py-0.5 rounded-full bg-[#EFECE3] text-[#5F5849]">Heuristics</span>
          </div>
          <p className="text-xs text-[#5F5849] mb-4 font-sans">Most prevalent heuristics flagged across analyzed submissions.</p>

          {stats.common_indicators.length === 0 ? (
            <div className="py-14 text-center text-[#8C8472] text-xs font-mono">
              No indicators recorded yet. Run your first investigation to see real telemetry.
            </div>
          ) : (
            <div className="space-y-2.5">
              {stats.common_indicators.map((ind, i) => (
                <div key={i} className="flex items-center justify-between p-3 rounded-xl bg-[#F4F1EA] border border-[#E4DFD3]">
                  <div className="flex items-center space-x-3">
                    <span className="w-6 h-6 rounded-full bg-[#E2DDCF] text-[#3D382E] text-xs flex items-center justify-center font-mono font-semibold">
                      #{i + 1}
                    </span>
                    <span className="text-xs font-medium text-[#171A1C]">{ind.title}</span>
                  </div>
                  <span className="text-[11px] font-mono px-2.5 py-0.5 rounded-full bg-[#E8EFE5] text-[#245229] border border-[#CADBC6] font-medium">
                    {ind.count} occurrences
                  </span>
                </div>
              ))}
            </div>
          )}
        </div>

      </div>

      {/* Recent Investigations Table */}
      <div className="p-6 rounded-2xl bg-[#FAF8F5] border border-[#E4DFD3] shadow-xs">
        <div className="flex items-center justify-between mb-5">
          <div>
            <h3 className="font-serif text-lg font-bold text-[#171A1C]">Recent Investigations</h3>
            <p className="text-xs text-[#5F5849] font-sans">Directly accessible case dossiers with authentic evidence records.</p>
          </div>
          <Link to="/history" className="text-xs font-mono font-semibold text-[#182B1B] hover:text-[#2E5E35] flex items-center gap-1">
            <span>View All</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>

        {stats.recent_investigations.length === 0 ? (
          <div className="text-center py-14 border border-dashed border-[#DDD7C7] rounded-xl bg-[#F8F6F0]">
            <FileSearch className="w-8 h-8 text-[#8C8472] mx-auto mb-2" />
            <p className="text-xs text-[#5F5849] font-mono">No investigations found in database.</p>
            <Link
              to="/investigate/new"
              className="mt-3 inline-flex items-center gap-1.5 text-xs font-medium text-[#182B1B] hover:underline"
            >
              <span>Launch a synthetic demo scenario</span>
              <ArrowRight className="w-3 h-3" />
            </Link>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs font-sans">
              <thead className="text-[11px] uppercase font-mono bg-[#EFECE3] text-[#5F5849] border-b border-[#DDD7C7]">
                <tr>
                  <th className="py-3 px-4 font-semibold">Title</th>
                  <th className="py-3 px-4 font-semibold">Context</th>
                  <th className="py-3 px-4 font-semibold">Status</th>
                  <th className="py-3 px-4 font-semibold">Assessed Risk</th>
                  <th className="py-3 px-4 font-semibold">Score</th>
                  <th className="py-3 px-4 text-right font-semibold">Action</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#EAE5D8]">
                {stats.recent_investigations.map((inv) => (
                  <tr key={inv.id} className="hover:bg-[#F3EFE6] transition-colors">
                    <td className="py-3.5 px-4 font-medium text-[#171A1C]">
                      <div className="flex items-center gap-2">
                        <span className="font-semibold">{inv.title}</span>
                        {inv.is_demo && (
                          <span className="text-[10px] font-mono px-1.5 py-0.5 rounded bg-[#FEF6E9] text-[#A66F17] border border-[#F9E2BC] font-semibold">
                            DEMO
                          </span>
                        )}
                      </div>
                    </td>
                    <td className="py-3.5 px-4 text-[#5F5849] capitalize font-mono text-[11px]">{inv.context_type}</td>
                    <td className="py-3.5 px-4">
                      <span className="text-[11px] px-2.5 py-0.5 rounded-full font-mono bg-[#EAE5D8] text-[#3D382E] border border-[#DDD7C7] font-medium">
                        {inv.status}
                      </span>
                    </td>
                    <td className="py-3.5 px-4">
                      {inv.risk_level ? (
                        <span className={`text-[11px] px-2.5 py-0.5 rounded-full font-semibold font-mono ${
                          inv.risk_level === 'CRITICAL' ? 'bg-[#FDEEEE] text-[#A62626] border border-[#F6CACA]' :
                          inv.risk_level === 'HIGH' ? 'bg-[#FFF2EA] text-[#C95D22] border border-[#FED4BD]' :
                          inv.risk_level === 'MODERATE' ? 'bg-[#FEF6E9] text-[#A66F17] border border-[#F9E2BC]' :
                          'bg-[#E8EFE5] text-[#245229] border border-[#CADBC6]'
                        }`}>
                          {inv.risk_level}
                        </span>
                      ) : (
                        <span className="text-xs text-[#8C8472] font-mono">In Progress</span>
                      )}
                    </td>
                    <td className="py-3.5 px-4 font-mono text-[#3D382E] font-medium">
                      {inv.risk_score !== undefined && inv.risk_score !== null ? `${inv.risk_score}/100` : '—'}
                    </td>
                    <td className="py-3.5 px-4 text-right">
                      <Link
                        to={`/investigations/${inv.id}`}
                        className="text-xs font-semibold text-[#182B1B] hover:text-[#2E5E35] inline-flex items-center gap-1"
                      >
                        <span>Inspect Dossier</span>
                        <ArrowRight className="w-3 h-3" />
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

