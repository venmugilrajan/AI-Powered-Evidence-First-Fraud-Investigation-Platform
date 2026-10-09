import React, { useState } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { Link } from 'react-router-dom';
import { 
  History, 
  Search, 
  Trash2, 
  Filter, 
  ExternalLink, 
  ShieldAlert,
  ArrowRight,
  Sparkles
} from 'lucide-react';
import { fetchInvestigations, deleteInvestigation } from '../services/api';

export const HistoryPage: React.FC = () => {
  const queryClient = useQueryClient();
  const [searchTerm, setSearchTerm] = useState('');
  const [filterRisk, setFilterRisk] = useState<string>('ALL');

  const { data: investigations = [], isLoading } = useQuery({
    queryKey: ['investigationsList'],
    queryFn: () => fetchInvestigations()
  });

  const deleteMutation = useMutation({
    mutationFn: (id: string) => deleteInvestigation(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['investigationsList'] });
      queryClient.invalidateQueries({ queryKey: ['dashboardStats'] });
    }
  });

  const filtered = investigations.filter((inv) => {
    const matchesSearch = inv.title.toLowerCase().includes(searchTerm.toLowerCase()) || 
                          inv.context_type.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          inv.id.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesRisk = filterRisk === 'ALL' || inv.risk_level === filterRisk;
    return matchesSearch && matchesRisk;
  });

  return (
    <div className="space-y-6 pb-16">
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 pb-4 border-b border-slate-200">
        <div>
          <h1 className="text-2xl font-bold text-slate-900 tracking-tight">Investigation Case Archive</h1>
          <p className="text-sm text-slate-500 mt-1">
            Browse, search, and review previously analyzed fraud submissions.
          </p>
        </div>
        <Link
          to="/investigate/new"
          className="inline-flex items-center space-x-2 px-4 py-2 rounded-lg text-xs font-semibold bg-blue-600 hover:bg-blue-700 text-white shadow-xs transition-all cursor-pointer"
        >
          <span>New Investigation</span>
        </Link>
      </div>

      {/* Filter and Search Bar */}
      <div className="flex flex-col sm:flex-row items-center gap-3">
        <div className="relative flex-1 w-full">
          <Search className="w-4 h-4 absolute left-3 top-3 text-slate-400" />
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Search by case title, context, or case ID..."
            className="w-full pl-9 pr-4 py-2 bg-white border border-slate-300 rounded-lg text-sm text-slate-900 placeholder-slate-400 focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 shadow-xs"
          />
        </div>

        <div className="flex items-center gap-2 w-full sm:w-auto">
          <Filter className="w-4 h-4 text-slate-400 hidden sm:block" />
          <select
            value={filterRisk}
            onChange={(e) => setFilterRisk(e.target.value)}
            className="px-3 py-2 bg-white border border-slate-300 rounded-lg text-xs font-medium text-slate-700 focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 shadow-xs w-full sm:w-auto"
          >
            <option value="ALL">All Risk Levels</option>
            <option value="CRITICAL">Critical Only</option>
            <option value="HIGH">High Only</option>
            <option value="MODERATE">Moderate Only</option>
            <option value="LOW">Low Only</option>
          </select>
        </div>
      </div>

      {/* List / Table */}
      {isLoading ? (
        <div className="py-20 text-center text-slate-500 text-sm">
          Loading case archive...
        </div>
      ) : filtered.length === 0 ? (
        <div className="p-12 text-center rounded-xl bg-white border border-slate-200 shadow-xs space-y-3">
          <ShieldAlert className="w-8 h-8 text-slate-400 mx-auto" />
          <h3 className="text-sm font-semibold text-slate-900">No Investigations Found</h3>
          <p className="text-xs text-slate-500">
            {searchTerm || filterRisk !== 'ALL' ? 'Try adjusting your search criteria.' : 'Create your first investigation case.'}
          </p>
        </div>
      ) : (
        <div className="bg-white border border-slate-200 rounded-xl shadow-xs overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-left text-sm">
              <thead className="bg-slate-50 text-slate-500 text-xs uppercase font-semibold border-b border-slate-200">
                <tr>
                  <th className="py-3 px-4">Case Title</th>
                  <th className="py-3 px-4">Context</th>
                  <th className="py-3 px-4">Assessed Risk</th>
                  <th className="py-3 px-4">Score</th>
                  <th className="py-3 px-4">Created Date</th>
                  <th className="py-3 px-4 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {filtered.map((inv) => (
                  <tr key={inv.id} className="hover:bg-slate-50 transition-colors">
                    <td className="py-3 px-4 font-medium text-slate-900">
                      <div className="flex items-center gap-2">
                        <Link to={`/investigations/${inv.id}`} className="hover:text-blue-600 font-semibold">
                          {inv.title}
                        </Link>
                        {inv.is_demo && (
                          <span className="text-[10px] font-mono px-1.5 py-0.5 rounded bg-amber-50 text-amber-700 border border-amber-200 font-semibold">
                            DEMO
                          </span>
                        )}
                      </div>
                      <div className="text-[10px] font-mono text-slate-400 mt-0.5">{inv.id}</div>
                    </td>
                    <td className="py-3 px-4 text-slate-600 capitalize">{inv.context_type}</td>
                    <td className="py-3 px-4">
                      {inv.risk_level ? (
                        <span className={`text-xs px-2 py-0.5 rounded font-semibold font-mono ${
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
                    <td className="py-3 px-4 text-slate-500 text-xs">
                      {new Date(inv.created_at).toLocaleDateString()}
                    </td>
                    <td className="py-3 px-4 text-right space-x-2">
                      <Link
                        to={`/investigations/${inv.id}`}
                        className="inline-flex items-center px-2.5 py-1 rounded bg-slate-100 hover:bg-slate-200 text-blue-600 hover:text-blue-700 text-xs font-semibold transition-colors"
                      >
                        Inspect
                      </Link>
                      <button
                        onClick={() => {
                          if (confirm('Permanently delete this case and its evidence records?')) {
                            deleteMutation.mutate(inv.id);
                          }
                        }}
                        className="p-1 rounded bg-slate-50 hover:bg-red-50 text-slate-400 hover:text-red-600 border border-slate-200 hover:border-red-200 transition-colors cursor-pointer"
                        title="Delete Case"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
};
