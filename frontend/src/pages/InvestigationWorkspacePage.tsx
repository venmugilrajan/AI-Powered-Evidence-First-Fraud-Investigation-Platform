import React, { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import { 
  fetchInvestigationDetail, 
  fetchEvidenceGraph, 
  exportInvestigationReport 
} from '../services/api';
import { 
  ShieldAlert, 
  CheckCircle, 
  AlertTriangle, 
  FileText, 
  Network, 
  Scale, 
  Download, 
  ArrowLeft,
  Info,
  Clock,
  Sparkles,
  ExternalLink,
  HelpCircle,
  X,
  Layers,
  ChevronRight,
  ShieldCheck
} from 'lucide-react';
import { ReactFlow, Background, Controls } from '@xyflow/react';
import '@xyflow/react/dist/style.css';

export const InvestigationWorkspacePage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [activeTab, setActiveTab] = useState<'overview' | 'graph' | 'claims' | 'indicators' | 'lookups' | 'report'>('overview');
  const [selectedNode, setSelectedNode] = useState<any>(null);
  const [selectedEdge, setSelectedEdge] = useState<any>(null);

  const { data: inv, isLoading, isError } = useQuery({
    queryKey: ['investigation', id],
    queryFn: () => fetchInvestigationDetail(id!),
    enabled: !!id,
    refetchInterval: (data) => (data?.state?.data?.status === 'ANALYZING' ? 1000 : false)
  });

  const { data: graphData } = useQuery({
    queryKey: ['investigationGraph', id],
    queryFn: () => fetchEvidenceGraph(id!),
    enabled: !!id && activeTab === 'graph'
  });

  const handleExport = async (format: 'json' | 'markdown') => {
    if (!id) return;
    const content = await exportInvestigationReport(id, format);
    const blob = new Blob([content], { type: format === 'json' ? 'application/json' : 'text/markdown' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `trusttrace-case-${id}.${format === 'json' ? 'json' : 'md'}`;
    a.click();
    URL.revokeObjectURL(url);
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-[60vh]">
        <div className="text-center space-y-3">
          <div className="w-8 h-8 border-2 border-blue-500 border-t-transparent rounded-full animate-spin mx-auto"></div>
          <p className="text-sm text-slate-400 font-mono">Retrieving forensic evidence chain & correlation network...</p>
        </div>
      </div>
    );
  }

  if (isError || !inv) {
    return (
      <div className="p-8 text-center bg-red-950/20 border border-red-800/40 rounded-xl max-w-xl mx-auto my-12">
        <AlertTriangle className="w-8 h-8 text-red-400 mx-auto mb-3" />
        <h3 className="text-lg font-semibold text-white">Case Record Not Found</h3>
        <p className="text-sm text-slate-400 mt-1">Unable to locate investigation dossier for ID: {id}</p>
        <Link to="/history" className="mt-4 inline-block text-xs font-semibold text-blue-400 hover:text-blue-300">
          &larr; Back to History
        </Link>
      </div>
    );
  }

  const risk = inv.risk_assessment;

  return (
    <div className="space-y-6 pb-16">
      {/* Top Breadcrumb & Status Header */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 pb-4 border-b border-slate-200">
        <div className="flex items-center gap-3">
          <Link to="/history" className="p-2 rounded-lg bg-white border border-slate-200 hover:bg-slate-50 text-slate-500 hover:text-slate-900 transition-colors shadow-xs">
            <ArrowLeft className="w-4 h-4" />
          </Link>
          <div>
            <div className="flex items-center gap-2">
              <h1 className="text-xl font-bold text-slate-900 tracking-tight">{inv.title}</h1>
              {inv.is_demo && (
                <span className="text-[10px] font-mono px-1.5 py-0.5 rounded bg-amber-50 text-amber-700 border border-amber-200 font-semibold">
                  SIMULATED LAB DEMO
                </span>
              )}
            </div>
            <div className="flex items-center gap-2 text-xs text-slate-500 mt-0.5 font-mono">
              <span>ID: {inv.id}</span>
              <span>•</span>
              <span className="capitalize">{inv.context_type} context</span>
              <span>•</span>
              <span>{new Date(inv.created_at).toLocaleString()}</span>
            </div>
          </div>
        </div>

        {/* Action Controls */}
        <div className="flex items-center gap-2">
          <button
            onClick={() => handleExport('markdown')}
            className="inline-flex items-center space-x-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold bg-white hover:bg-slate-50 border border-slate-200 text-slate-700 transition-colors cursor-pointer shadow-xs"
          >
            <Download className="w-3.5 h-3.5" />
            <span>Export Markdown</span>
          </button>
          <button
            onClick={() => handleExport('json')}
            className="inline-flex items-center space-x-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold bg-white hover:bg-slate-50 border border-slate-200 text-slate-700 transition-colors cursor-pointer shadow-xs"
          >
            <Download className="w-3.5 h-3.5" />
            <span>Export JSON</span>
          </button>
        </div>
      </div>

      {/* Risk Executive Banner */}
      {risk && (
        <div className={`p-5 rounded-xl border flex flex-col md:flex-row items-start md:items-center justify-between gap-4 shadow-xs ${
          risk.risk_level === 'CRITICAL' ? 'bg-red-50 border-red-200 text-red-900' :
          risk.risk_level === 'HIGH' ? 'bg-orange-50 border-orange-200 text-orange-900' :
          risk.risk_level === 'MODERATE' ? 'bg-amber-50 border-amber-200 text-amber-900' :
          risk.risk_level === 'INSUFFICIENT_EVIDENCE' ? 'bg-slate-100 border-slate-200 text-slate-800' :
          'bg-emerald-50 border-emerald-200 text-emerald-900'
        }`}>
          <div className="space-y-1.5 max-w-3xl">
            <div className="flex items-center gap-2">
              <span className={`text-xs px-2.5 py-0.5 rounded font-bold uppercase tracking-wider ${
                risk.risk_level === 'CRITICAL' ? 'bg-red-600 text-white' :
                risk.risk_level === 'HIGH' ? 'bg-orange-600 text-white' :
                risk.risk_level === 'MODERATE' ? 'bg-amber-600 text-white' :
                risk.risk_level === 'INSUFFICIENT_EVIDENCE' ? 'bg-slate-600 text-white' :
                'bg-emerald-600 text-white'
              }`}>
                {risk.risk_level} OBSERVED RISK
              </span>
              <span className="text-xs text-slate-600 font-mono font-medium">
                Threat Index: {risk.risk_score}/100 • Corroboration Confidence: {Math.round(risk.evidence_confidence * 100)}%
              </span>
            </div>
            <p className="text-sm text-slate-800 leading-relaxed font-medium">
              {risk.executive_summary}
            </p>
          </div>

          <div className="flex md:flex-col items-center md:items-end gap-3 shrink-0">
            <div className="text-right">
              <div className="text-3xl font-black font-mono text-slate-900">
                {risk.risk_score}
                <span className="text-xs text-slate-500 font-normal">/100</span>
              </div>
              <div className="text-[10px] uppercase text-slate-500 font-semibold tracking-wider">
                Threat Severity Index
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Navigation Tabs (Scrollable on Mobile) */}
      <div className="border-b border-slate-200 flex space-x-1 sm:space-x-2 overflow-x-auto no-scrollbar pb-0.5">
        {[
          { key: 'overview', label: 'Overview', fullLabel: 'Executive Findings', icon: FileText },
          { key: 'graph', label: 'Evidence Graph', fullLabel: 'Evidence Graph & Provenance', icon: Network },
          { key: 'claims', label: `Claims (${inv.claims.length})`, fullLabel: `Claims (${inv.claims.length})`, icon: Scale },
          { key: 'indicators', label: `Indicators (${inv.indicators.length})`, fullLabel: `Indicators (${inv.indicators.length})`, icon: AlertTriangle },
          { key: 'lookups', label: `Lookups (${inv.lookups.length})`, fullLabel: `External Lookups (${inv.lookups.length})`, icon: ShieldAlert },
          { key: 'report', label: 'Dossier Report', fullLabel: 'Dossier Report', icon: FileText }
        ].map((tab) => {
          const Icon = tab.icon;
          const isActive = activeTab === tab.key;
          return (
            <button
              key={tab.key}
              onClick={() => setActiveTab(tab.key as any)}
              className={`flex items-center space-x-1.5 sm:space-x-2 py-2.5 sm:py-3 px-3 sm:px-4 border-b-2 text-xs font-semibold transition-colors cursor-pointer whitespace-nowrap shrink-0 ${
                isActive
                  ? 'border-blue-600 text-blue-600 bg-blue-50/50'
                  : 'border-transparent text-slate-500 hover:text-slate-800 hover:border-slate-300'
              }`}
            >
              <Icon className="w-3.5 h-3.5 shrink-0" />
              <span>{tab.label}</span>
            </button>
          );
        })}
      </div>

      {/* Tab Panels */}
      {/* 1. OVERVIEW */}
      {activeTab === 'overview' && (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2 space-y-6">
            {/* Score Breakdown Transparency Box */}
            {risk && risk.score_breakdown && risk.score_breakdown.length > 0 && (
              <div className="p-6 rounded-xl bg-white border border-slate-200 shadow-xs">
                <div className="flex items-center justify-between mb-3">
                  <h3 className="text-base font-semibold text-slate-900 flex items-center gap-2">
                    <Layers className="w-4 h-4 text-blue-600" />
                    <span>Transparent Score Attribution</span>
                  </h3>
                  <span className="text-xs text-slate-500 font-mono font-medium">Deduplicated Rules</span>
                </div>
                <p className="text-xs text-slate-500 mb-4">
                  Every point contributing to the {risk.risk_score}/100 Threat Index is explicitly attributed below:
                </p>
                <div className="space-y-2">
                  {risk.score_breakdown.map((item, idx) => (
                    <div key={idx} className="p-3.5 rounded-lg bg-slate-50 border border-slate-200 flex items-start justify-between gap-4">
                      <div>
                        <div className="flex items-center gap-2">
                          <span className="text-xs font-semibold text-slate-900">{item.title}</span>
                          <span className={`text-[10px] font-mono px-1.5 py-0.2 rounded font-bold ${
                            item.severity === 'CRITICAL' ? 'bg-red-50 text-red-700 border border-red-200' :
                            item.severity === 'HIGH' ? 'bg-orange-50 text-orange-700 border border-orange-200' :
                            item.severity === 'MEDIUM' ? 'bg-amber-50 text-amber-700 border border-amber-200' :
                            'bg-slate-100 text-slate-700'
                          }`}>
                            {item.severity}
                          </span>
                        </div>
                        <p className="text-xs text-slate-600 mt-1 leading-relaxed">{item.rationale}</p>
                      </div>
                      <span className="text-xs font-mono font-bold text-red-600 shrink-0">
                        +{item.points} pts
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Actionable Playbook */}
            <div className="p-6 rounded-xl bg-white border border-slate-200 shadow-xs">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-base font-semibold text-slate-900 flex items-center gap-2">
                  <CheckCircle className="w-4 h-4 text-emerald-600" />
                  <span>Personalized Actionable Playbook</span>
                </h3>
                <span className="text-xs text-slate-500 font-medium">Finding-Triggered</span>
              </div>

              <div className="space-y-3">
                {inv.recommendations.map((rec, i) => (
                  <div key={rec.id} className="p-4 rounded-lg bg-slate-50 border border-slate-200 space-y-1.5">
                    <div className="flex items-center justify-between">
                      <span className="text-sm font-semibold text-slate-900">{i + 1}. {rec.title}</span>
                      <span className={`text-[10px] font-mono px-2 py-0.5 rounded font-bold ${
                        rec.priority === 'HIGH' ? 'bg-red-50 text-red-700 border border-red-200' :
                        rec.priority === 'MEDIUM' ? 'bg-amber-50 text-amber-700 border border-amber-200' :
                        'bg-blue-50 text-blue-700 border border-blue-200'
                      }`}>
                        {rec.priority} PRIORITY
                      </span>
                    </div>
                    <p className="text-xs text-slate-700 leading-relaxed">{rec.description}</p>
                    <div className="text-[10px] text-slate-500 font-mono mt-1 pt-1 border-t border-slate-200">
                      Triggered by: {rec.triggered_by_finding}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Extracted Entities Table */}
            <div className="p-6 rounded-xl bg-white border border-slate-200 shadow-xs">
              <h3 className="text-base font-semibold text-slate-900 mb-3">Extracted Input Artifacts & Provenance</h3>
              <div className="overflow-x-auto">
                <table className="w-full text-left text-xs">
                  <thead className="bg-slate-50 text-slate-500 border-b border-slate-200 font-semibold">
                    <tr>
                      <th className="py-2.5 px-3">Type</th>
                      <th className="py-2.5 px-3">Value</th>
                      <th className="py-2.5 px-3">Extraction Provenance</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100 font-mono">
                    {inv.entities.map((e) => (
                      <tr key={e.id} className="hover:bg-slate-50">
                        <td className="py-2.5 px-3 text-blue-600 font-semibold">{e.entity_type}</td>
                        <td className="py-2.5 px-3 text-slate-900 font-medium">{e.value}</td>
                        <td className="py-2.5 px-3 text-slate-500">{e.source_context || 'message body'}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>

          {/* Right Column: Timeline & Methodology */}
          <div className="space-y-6">
            <div className="p-6 rounded-xl bg-white border border-slate-200 shadow-xs">
              <h3 className="text-base font-semibold text-slate-900 mb-4 flex items-center gap-2">
                <Clock className="w-4 h-4 text-blue-600" />
                <span>Forensic Investigation Audit Trail</span>
              </h3>
              <div className="space-y-4 relative before:absolute before:inset-0 before:left-2 before:w-0.5 before:bg-slate-200">
                {inv.events.map((ev, i) => (
                  <div key={i} className="relative pl-6 text-xs">
                    <span className="absolute left-1 top-1 w-2.5 h-2.5 rounded-full bg-blue-600 ring-4 ring-white"></span>
                    <div className="font-semibold text-slate-900">{ev.stage}</div>
                    <div className="text-slate-600 mt-0.5 leading-relaxed">{ev.message}</div>
                    <div className="text-[10px] font-mono text-slate-400 mt-0.5">
                      {new Date(ev.timestamp).toLocaleTimeString()}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {risk && (
              <div className="p-5 rounded-xl bg-slate-50 border border-slate-200 space-y-3">
                <div className="flex items-center gap-2 text-xs font-semibold text-slate-700 uppercase tracking-wider">
                  <Info className="w-3.5 h-3.5 text-blue-600" />
                  <span>Methodology & Caveats</span>
                </div>
                <p className="text-xs text-slate-600 leading-relaxed">
                  {risk.methodology_notes}
                </p>
                {risk.caveats && (
                  <ul className="text-[11px] text-slate-500 list-disc list-inside space-y-1">
                    {risk.caveats.map((c, i) => (
                      <li key={i}>{c}</li>
                    ))}
                  </ul>
                )}
              </div>
            )}
          </div>
        </div>
      )}

      {/* 2. SIGNATURE FEATURE: EVIDENCE GRAPH WITH LIVE INSPECTION PANEL */}
      {activeTab === 'graph' && (
        <div className="space-y-4">
          <div className="p-4 rounded-xl bg-white border border-slate-200 shadow-xs flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
            <div>
              <h3 className="text-base font-bold text-slate-900 flex items-center gap-2">
                <Network className="w-5 h-5 text-blue-600" />
                <span>Interactive Evidence Correlation Graph</span>
              </h3>
              <p className="text-xs text-slate-500 mt-0.5">
                Click any node or relationship edge to inspect its underlying evidence, source provenance, and confidence score.
              </p>
            </div>
            <div className="flex items-center gap-4 text-xs font-mono bg-slate-50 px-3 py-1.5 rounded-lg border border-slate-200 font-medium">
              <span className="flex items-center gap-1.5"><span className="w-2.5 h-2.5 rounded-full bg-blue-500"></span> Claim</span>
              <span className="flex items-center gap-1.5"><span className="w-2.5 h-2.5 rounded-full bg-red-500"></span> Contradiction</span>
              <span className="flex items-center gap-1.5"><span className="w-2.5 h-2.5 rounded-full bg-amber-500"></span> Indicator</span>
              <span className="flex items-center gap-1.5"><span className="w-2.5 h-2.5 rounded-full bg-emerald-500"></span> Threat Intel</span>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-4 gap-4">
            {/* React Flow Viewport (3 cols) */}
            <div className="lg:col-span-3 h-[600px] bg-slate-50 rounded-xl border border-slate-200 overflow-hidden relative shadow-xs">
              {graphData ? (
                <ReactFlow
                  nodes={graphData.nodes.map((n, i) => {
                    const nat = n.data?.evidence_nature;
                    const borderColor = 
                      nat === 'SUSPICIOUS' ? '#ef4444' :
                      nat === 'CONFIRMED' ? '#10b981' :
                      nat === 'ACTIONABLE' ? '#3b82f6' : '#94a3b8';
                    const nodeTitle = n.data?.title || n.data?.label || n.id;
                    const category = n.data?.node_category || n.type || 'SIGNAL';
                    const subtitle = n.data?.subtitle || n.data?.category || '';

                    return {
                      ...n,
                      position: { x: (i % 3) * 280 + 40, y: Math.floor(i / 3) * 170 + 40 },
                      data: {
                        ...n.data,
                        label: (
                          <div className="text-left w-full space-y-1">
                            <div className="flex items-center justify-between gap-1 text-[9px] font-mono">
                              <span className="font-semibold uppercase tracking-wider text-slate-500 truncate">{category}</span>
                              <span className={`px-1.5 py-0.2 rounded font-bold uppercase text-[8px] ${
                                nat === 'SUSPICIOUS' ? 'bg-red-100 text-red-700' :
                                nat === 'CONFIRMED' ? 'bg-emerald-100 text-emerald-700' :
                                nat === 'ACTIONABLE' ? 'bg-blue-100 text-blue-700' : 'bg-slate-100 text-slate-600'
                              }`}>{nat || 'INFO'}</span>
                            </div>
                            <div className="font-semibold text-xs text-slate-900 leading-snug line-clamp-2">
                              {nodeTitle}
                            </div>
                            {subtitle && (
                              <div className="text-[10px] text-slate-500 font-mono truncate">
                                {subtitle}
                              </div>
                            )}
                          </div>
                        )
                      },
                      style: {
                        background: '#ffffff',
                        color: '#0f172a',
                        border: `2px solid ${borderColor}`,
                        borderRadius: '12px',
                        padding: '12px',
                        fontSize: '11px',
                        boxShadow: '0 4px 12px -2px rgba(0, 0, 0, 0.08)',
                        width: 250,
                        cursor: 'pointer'
                      }
                    };
                  })}
                  edges={graphData.edges.map((e) => ({
                    ...e,
                    style: { stroke: e.animated ? '#ef4444' : '#94a3b8', strokeWidth: 2 },
                    labelStyle: { fill: '#475569', fontSize: 10, fontWeight: 600 }
                  }))}
                  onNodeClick={(_, node) => {
                    setSelectedNode(node);
                    setSelectedEdge(null);
                  }}
                  onEdgeClick={(_, edge) => {
                    setSelectedEdge(edge);
                    setSelectedNode(null);
                  }}
                  fitView
                >
                  <Background color="#cbd5e1" gap={16} />
                  <Controls />
                </ReactFlow>
              ) : (
                <div className="flex items-center justify-center h-full text-slate-400 text-xs font-medium">
                  Loading evidence correlation graph...
                </div>
              )}
            </div>

            {/* Inspector Sidebar (1 col) */}
            <div className="p-5 rounded-xl bg-white border border-slate-200 shadow-xs space-y-4 h-[600px] overflow-y-auto">
              <div className="flex items-center justify-between pb-3 border-b border-slate-200">
                <div className="text-xs font-bold uppercase tracking-wider text-slate-700">
                  Evidence Inspector
                </div>
                {(selectedNode || selectedEdge) && (
                  <button
                    onClick={() => { setSelectedNode(null); setSelectedEdge(null); }}
                    className="text-slate-400 hover:text-slate-700 p-1 cursor-pointer"
                  >
                    <X className="w-4 h-4" />
                  </button>
                )}
              </div>

              {selectedNode ? (
                <div className="space-y-3">
                  <div className="flex items-center gap-2">
                    <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-blue-50 text-blue-700 border border-blue-200 uppercase font-semibold">
                      {selectedNode.data?.node_category || selectedNode.type}
                    </span>
                    <span className={`text-[10px] font-mono px-2 py-0.5 rounded font-bold uppercase ${
                      selectedNode.data?.evidence_nature === 'SUSPICIOUS' ? 'bg-red-50 text-red-700 border border-red-200' :
                      selectedNode.data?.evidence_nature === 'CONFIRMED' ? 'bg-emerald-50 text-emerald-700 border border-emerald-200' :
                      'bg-slate-100 text-slate-700 border border-slate-200'
                    }`}>
                      {selectedNode.data?.evidence_nature || 'SIGNAL'}
                    </span>
                  </div>

                  <h4 className="text-sm font-bold text-slate-900">
                    {selectedNode.data?.title || selectedNode.data?.label}
                  </h4>

                  {selectedNode.data?.subtitle && (
                    <div className="text-xs text-slate-500 font-mono">
                      {selectedNode.data.subtitle}
                    </div>
                  )}

                  {selectedNode.data?.description && (
                    <p className="text-xs text-slate-700 leading-relaxed bg-slate-50 p-2.5 rounded border border-slate-200">
                      {selectedNode.data.description}
                    </p>
                  )}

                  {selectedNode.data?.rationale && (
                    <div className="text-xs text-slate-600 bg-slate-50 p-2.5 rounded border border-slate-200">
                      <span className="text-slate-800 block font-semibold mb-0.5">Verification Rationale:</span>
                      {selectedNode.data.rationale}
                    </div>
                  )}

                  {selectedNode.data?.detection_method && (
                    <div className="text-[11px] text-slate-500 font-mono">
                      Detection: {selectedNode.data.detection_method}
                    </div>
                  )}

                  {selectedNode.data?.limitations && (
                    <div className="text-[11px] text-amber-800 bg-amber-50 p-2 rounded border border-amber-200">
                      <strong>Limitation:</strong> {selectedNode.data.limitations}
                    </div>
                  )}

                  {selectedNode.data?.is_simulated && (
                    <div className="text-[10px] text-amber-800 font-mono bg-amber-50 p-2 rounded border border-amber-200 font-semibold">
                      [SIMULATED DATA]: Clearly identified for evaluation transparency.
                    </div>
                  )}
                </div>
              ) : selectedEdge ? (
                <div className="space-y-3">
                  <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-indigo-50 text-indigo-700 border border-indigo-200 uppercase font-semibold">
                    CORRELATION EDGE
                  </span>
                  <h4 className="text-sm font-bold text-slate-900 capitalize">
                    {selectedEdge.label || 'Relationship'}
                  </h4>
                  <div className="text-xs text-slate-700 bg-slate-50 p-3 rounded border border-slate-200 leading-relaxed">
                    <span className="text-slate-800 block font-semibold mb-1">Relationship Provenance:</span>
                    {selectedEdge.data?.explanation || 'Direct correlation established by the pipeline.'}
                  </div>
                  {selectedEdge.data?.confidence && (
                    <div className="text-xs font-mono text-slate-600 font-medium">
                      Confidence: {Math.round(selectedEdge.data.confidence * 100)}%
                    </div>
                  )}
                </div>
              ) : (
                <div className="text-center py-16 text-slate-400 text-xs space-y-2">
                  <Network className="w-8 h-8 mx-auto text-slate-300" />
                  <p>Click any node or relationship link in the graph to inspect its complete underlying evidence.</p>
                </div>
              )}
            </div>
          </div>
        </div>
      )}

      {/* 3. CLAIMS TAB */}
      {activeTab === 'claims' && (
        <div className="p-6 rounded-xl bg-white border border-slate-200 shadow-xs space-y-4">
          <div>
            <h3 className="text-base font-semibold text-slate-900">Extracted Discrete Claims</h3>
            <p className="text-xs text-slate-500">
              Testable assertions parsed from the communication, categorized and verified against independent corroboration.
            </p>
          </div>

          <div className="space-y-3">
            {inv.claims.map((c) => (
              <div key={c.id} className="p-4 rounded-lg bg-slate-50 border border-slate-200 space-y-2">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <span className="text-xs font-mono uppercase px-2 py-0.5 rounded bg-white text-slate-700 border border-slate-200 font-medium">
                      {c.category}
                    </span>
                    {c.extraction_source === 'AI_GENERATED' ? (
                      <span className="text-[10px] font-mono px-1.5 py-0.5 rounded bg-purple-50 text-purple-700 border border-purple-200 font-semibold" title="Extracted by LLM - Requires corroboration, not an established fact">
                        AI EXTRACTED
                      </span>
                    ) : (
                      <span className="text-[10px] font-mono px-1.5 py-0.5 rounded bg-blue-50 text-blue-700 border border-blue-200 font-semibold" title="Deterministic heuristic extraction">
                        DETERMINISTIC
                      </span>
                    )}
                    <span className="text-sm font-semibold text-slate-900">{c.claim_text}</span>
                  </div>
                  <span className={`text-xs px-2.5 py-0.5 rounded font-bold font-mono ${
                    c.status === 'CONTRADICTED' ? 'bg-red-50 text-red-700 border border-red-200' :
                    c.status === 'VERIFIED' ? 'bg-emerald-50 text-emerald-700 border border-emerald-200' :
                    'bg-slate-100 text-slate-600 border border-slate-200'
                  }`}>
                    {c.status}
                  </span>
                </div>
                <p className="text-xs text-slate-700 leading-relaxed">
                  <span className="text-slate-500 font-medium">Rationale / Evidence: </span>{c.rationale || 'Awaiting external corroboration.'}
                </p>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* 4. INDICATORS TAB */}
      {activeTab === 'indicators' && (
        <div className="p-6 rounded-xl bg-white border border-slate-200 shadow-xs space-y-4">
          <div>
            <h3 className="text-base font-semibold text-slate-900">Observed Indicators & Heuristics</h3>
            <p className="text-xs text-slate-500">
              Deterministic syntactic rules, domain anomalies, and psychological coercion triggers.
            </p>
          </div>

          <div className="space-y-3">
            {inv.indicators.map((ind) => (
              <div key={ind.id} className="p-4 rounded-lg bg-slate-50 border border-slate-200 space-y-2">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <span className={`text-xs px-2 py-0.5 rounded font-bold uppercase font-mono ${
                      ind.severity === 'CRITICAL' ? 'bg-red-50 text-red-700 border border-red-200' :
                      ind.severity === 'HIGH' ? 'bg-orange-50 text-orange-700 border border-orange-200' :
                      ind.severity === 'MEDIUM' ? 'bg-amber-50 text-amber-700 border border-amber-200' :
                      'bg-slate-100 text-slate-700'
                    }`}>
                      {ind.severity}
                    </span>
                    <span className="text-sm font-semibold text-slate-900">{ind.title}</span>
                  </div>
                  <span className="text-[10px] font-mono text-slate-500">{ind.detection_method}</span>
                </div>
                <p className="text-xs text-slate-700 leading-relaxed">{ind.description}</p>
                {ind.limitations && (
                  <div className="text-[11px] text-slate-600 bg-white p-2 rounded border border-slate-200">
                    <span className="font-semibold text-slate-700">Heuristic limitation: </span>
                    {ind.limitations}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      )}

      {/* 5. LOOKUPS TAB */}
      {activeTab === 'lookups' && (
        <div className="p-6 rounded-xl bg-white border border-slate-200 shadow-xs space-y-4">
          <div>
            <h3 className="text-base font-semibold text-slate-900">External Threat Intelligence Lookups</h3>
            <p className="text-xs text-slate-500">
              Reputation queries against live threat lists or transparent demonstration feeds.
            </p>
          </div>

          <div className="space-y-3">
            {inv.lookups.map((lkp) => (
              <div key={lkp.id} className="p-4 rounded-lg bg-slate-50 border border-slate-200 space-y-2">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <span className="text-xs font-mono text-blue-700 bg-blue-50 px-2 py-0.5 rounded border border-blue-200 font-semibold">
                      {lkp.provider}
                    </span>
                    <span className="text-sm font-mono text-slate-900 font-medium">{lkp.query_target}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    {lkp.is_simulated && (
                      <span className="text-[10px] font-mono px-1.5 py-0.5 rounded bg-amber-50 text-amber-700 border border-amber-200 font-semibold">
                        SIMULATED
                      </span>
                    )}
                    <span className={`text-xs px-2 py-0.5 rounded font-mono font-bold ${
                      lkp.status === 'MALICIOUS' ? 'bg-red-50 text-red-700 border border-red-200' :
                      lkp.status === 'SUSPICIOUS' ? 'bg-orange-50 text-orange-700 border border-orange-200' :
                      lkp.status === 'CLEAN' ? 'bg-emerald-50 text-emerald-700 border border-emerald-200' :
                      'bg-slate-100 text-slate-600 border border-slate-200'
                    }`}>
                      {lkp.status}
                    </span>
                  </div>
                </div>

                {/* Evidence Snippet / OSINT Finding */}
                {lkp.raw_response?.matched_evidence_snippet && (
                  <div className="p-3 bg-white rounded-md border border-slate-200 text-xs text-slate-800 space-y-1">
                    <div className="text-[10px] font-mono text-slate-500 uppercase tracking-wider font-semibold">
                      Matched Web/Community Evidence Snippet:
                    </div>
                    <p className="italic text-slate-700 leading-relaxed font-serif">
                      "{lkp.raw_response.matched_evidence_snippet}"
                    </p>
                  </div>
                )}

                {/* Infrastructure finding */}
                {lkp.raw_response?.finding && (
                  <div className="text-xs text-slate-700 bg-white p-2.5 rounded border border-slate-200">
                    <span className="font-semibold text-slate-900">Infrastructure Finding: </span>
                    {lkp.raw_response.finding}
                  </div>
                )}

                {/* Search Metadata & Source Link */}
                <div className="flex flex-col sm:flex-row sm:items-center justify-between text-[11px] text-slate-500 font-mono gap-1.5 pt-1 border-t border-slate-100">
                  {lkp.source_reference ? (
                    <div className="truncate">
                      <span>Source Link: </span>
                      {lkp.source_reference.startsWith('http') ? (
                        <a 
                          href={lkp.source_reference} 
                          target="_blank" 
                          rel="noreferrer noopener"
                          className="text-blue-600 hover:text-blue-800 underline font-medium"
                        >
                          {lkp.source_reference}
                        </a>
                      ) : (
                        <span>{lkp.source_reference}</span>
                      )}
                    </div>
                  ) : <div />}

                  {lkp.raw_response?.searched_engines && (
                    <div className="text-[10px] text-slate-400 shrink-0">
                      Engines Queried: {Array.isArray(lkp.raw_response.searched_engines) ? lkp.raw_response.searched_engines.join(', ') : lkp.raw_response.searched_engines}
                    </div>
                  )}
                </div>

                {/* Multi-source listings if available */}
                {lkp.raw_response?.all_sources && lkp.raw_response.all_sources.length > 1 && (
                  <div className="pt-2 border-t border-slate-100 space-y-1.5">
                    <div className="text-[10px] font-mono text-slate-500 uppercase tracking-wider font-semibold">
                      Corroborating Web Mentions:
                    </div>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                      {lkp.raw_response.all_sources.map((src: any, idx: number) => (
                        <a
                          key={idx}
                          href={src.url}
                          target="_blank"
                          rel="noreferrer noopener"
                          className="block p-2 rounded bg-white border border-slate-200 hover:border-blue-400 hover:shadow-xs transition-all text-[11px] group"
                        >
                          <div className="font-semibold text-slate-800 group-hover:text-blue-600 flex items-center justify-between">
                            <span>{src.platform}</span>
                            <span className="text-[9px] text-blue-500">View ↗</span>
                          </div>
                          <p className="text-[10px] text-slate-500 line-clamp-2 mt-0.5">
                            {src.snippet}
                          </p>
                        </a>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      )}

      {/* 6. REPORT TAB */}
      {activeTab === 'report' && (
        <div className="p-8 rounded-xl bg-white border border-slate-200 shadow-xs max-w-4xl mx-auto space-y-6">
          <div className="flex items-center justify-between pb-4 border-b border-slate-200">
            <div>
              <h2 className="text-lg font-bold text-slate-900">TrustTrace Case Dossier Snapshot</h2>
              <p className="text-xs text-slate-500 font-mono">CASE ID: {inv.id}</p>
            </div>
            <button
              onClick={() => handleExport('markdown')}
              className="px-3 py-1.5 rounded-lg bg-blue-600 hover:bg-blue-700 text-white text-xs font-semibold cursor-pointer shadow-xs"
            >
              Download Printable MD
            </button>
          </div>

          <div className="prose max-w-none text-sm text-slate-700 space-y-4">
            <div>
              <h4 className="text-sm font-bold uppercase text-slate-500 tracking-wider">Executive Finding</h4>
              <p className="text-base text-slate-900 font-medium mt-1 leading-relaxed">{risk?.executive_summary}</p>
            </div>

            <div className="grid grid-cols-2 gap-4 py-2 border-y border-slate-200 text-xs font-mono">
              <div>
                <span className="text-slate-500">Risk Assessment: </span>
                <span className="text-slate-900 font-bold">{risk?.risk_level} ({risk?.risk_score}/100)</span>
              </div>
              <div>
                <span className="text-slate-500">Critical Indicators: </span>
                <span className="text-slate-900 font-bold">{risk?.critical_indicators_count}</span>
              </div>
              <div>
                <span className="text-slate-500">Contradictions Flagged: </span>
                <span className="text-slate-900 font-bold">{risk?.contradictions_count}</span>
              </div>
              <div>
                <span className="text-slate-500">Evidence Coverage: </span>
                <span className="text-slate-900 font-bold">{Math.round((risk?.evidence_confidence || 0) * 100)}%</span>
              </div>
            </div>

            {risk?.score_breakdown && risk.score_breakdown.length > 0 && (
              <div>
                <h4 className="text-sm font-bold uppercase text-slate-500 tracking-wider">Itemized Threat Contributions</h4>
                <div className="space-y-1.5 mt-2">
                  {risk.score_breakdown.map((sb, i) => (
                    <div key={i} className="text-xs flex justify-between bg-slate-50 p-2.5 rounded border border-slate-200">
                      <span className="font-medium text-slate-800">{sb.title}</span>
                      <span className="font-mono font-bold text-red-600">+{sb.points} pts</span>
                    </div>
                  ))}
                </div>
              </div>
            )}

            <div>
              <h4 className="text-sm font-bold uppercase text-slate-500 tracking-wider">Disproven Assertions & Contradictions</h4>
              <ul className="list-disc list-inside space-y-1 text-xs text-slate-700 mt-2">
                {inv.claims.filter(c => c.status === 'CONTRADICTED').map((c, i) => (
                  <li key={i}><strong>{c.claim_text}:</strong> {c.rationale}</li>
                ))}
              </ul>
            </div>

            <div>
              <h4 className="text-sm font-bold uppercase text-slate-500 tracking-wider">Mandatory Next Steps</h4>
              <ol className="list-decimal list-inside space-y-1.5 text-xs text-slate-700 mt-2">
                {inv.recommendations.map((r, i) => (
                  <li key={i}><strong>{r.title}</strong>: {r.description}</li>
                ))}
              </ol>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
