/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState } from 'react';
import { 
  CheckSquare, 
  Square, 
  Play, 
  Sliders, 
  CheckCircle, 
  AlertCircle,
  Users,
  Database,
  FileCode,
  X,
  ExternalLink
} from 'lucide-react';
import { AgentId } from '../types';
import { AGENT_DEFINITIONS, AgentDefinition } from '../data/defaultData';

interface AgentConfigScreenProps {
  selectedAgents: Record<AgentId, boolean>;
  onToggleAgent: (id: AgentId) => void;
  onStartAnalysis: (options: any) => void;
  hasData: boolean;
  onLoadDefaultDataset: () => void;
}

export default function AgentConfigScreen({
  selectedAgents,
  onToggleAgent,
  onStartAnalysis,
  hasData,
  onLoadDefaultDataset
}: AgentConfigScreenProps) {
  // Parameters State
  const [complianceCheck, setComplianceCheck] = useState(true);
  const [reportDepth, setReportDepth] = useState<'Standard' | 'Exhaustive'>('Exhaustive');
  const [routingDept, setRoutingDept] = useState<'All' | 'Priority Only'>('All');
  const [languageScope, setLanguageScope] = useState<'English Only' | 'Multi-lingual Translation'>('Multi-lingual Translation');
  
  // Prompt Modal Inspector
  const [inspectingAgent, setInspectingAgent] = useState<AgentDefinition | null>(null);

  const handleStartClick = () => {
    onStartAnalysis({
      complianceCheck,
      reportDepth,
      routingDept,
      languageScope
    });
  };

  const handleSelectAll = () => {
    AGENT_DEFINITIONS.forEach(a => {
      if (!selectedAgents[a.id]) onToggleAgent(a.id);
    });
  };

  const handleClearAll = () => {
    AGENT_DEFINITIONS.forEach(a => {
      if (selectedAgents[a.id]) onToggleAgent(a.id);
    });
  };

  const selectedCount = Object.values(selectedAgents).filter(Boolean).length;

  return (
    <div className="space-y-8" id="agent-config-screen-container">
      {/* Page Title */}
      <div>
        <h2 className="text-xl font-bold text-gray-900 tracking-tight">Agent Selection &amp; Task Parameters</h2>
        <p className="text-gray-500 text-xs mt-1">
          Select which clinical AI agents should be activated to analyze the ingested dataset. All 6 specialist agents run concurrently and independently, generating structured quality-improvement audit results.
        </p>
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-3 gap-8">
        
        {/* Left 2 Columns: Agent Selection Cards */}
        <div className="xl:col-span-2 space-y-6">
          <div className="flex justify-between items-center bg-white p-4 rounded-xl border border-gray-100 shadow-sm">
            <span className="text-xs font-bold text-gray-800 flex items-center gap-2">
              <Users className="w-4 h-4 text-[#0052cc]" />
              Select Agents to Activate ({selectedCount} of {AGENT_DEFINITIONS.length})
            </span>
            <div className="flex gap-2">
              <button
                onClick={handleSelectAll}
                className="text-xs font-semibold text-[#0052cc] bg-blue-50 px-2.5 py-1.5 rounded-lg hover:bg-blue-100 transition-colors"
                id="btn-select-all-agents"
              >
                Select All
              </button>
              <button
                onClick={handleClearAll}
                className="text-xs font-semibold text-gray-500 bg-gray-50 px-2.5 py-1.5 rounded-lg hover:bg-gray-100 transition-colors"
                id="btn-clear-all-agents"
              >
                Clear All
              </button>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-5" id="config-agents-grid">
            {AGENT_DEFINITIONS.map((agent) => {
              const isSelected = selectedAgents[agent.id];
              return (
                <div
                  key={agent.id}
                  className={`bg-white rounded-2xl p-5 border transition-all duration-200 flex flex-col relative ${
                    isSelected 
                      ? 'border-[#0052cc] ring-2 ring-[#0052cc]/10 shadow-md shadow-blue-500/5' 
                      : 'border-gray-100 shadow-sm hover:border-gray-200 hover:shadow-md'
                  }`}
                  id={`config-card-${agent.id}`}
                >
                  {/* Selected Indicator Checkmark */}
                  <button
                    onClick={() => onToggleAgent(agent.id)}
                    className="absolute top-4 right-4 text-[#0052cc] hover:opacity-80 transition-opacity"
                    title={isSelected ? 'Deactivate agent' : 'Activate agent'}
                  >
                    {isSelected ? (
                      <CheckSquare className="w-5.5 h-5.5" />
                    ) : (
                      <Square className="w-5.5 h-5.5 text-gray-300" />
                    )}
                  </button>

                  {/* Header Portrait */}
                  <div className="flex items-center gap-3.5 mb-3.5 pr-8">
                    <div className="w-12 h-12 rounded-xl overflow-hidden border border-gray-100 shadow-sm shrink-0">
                      <img className="w-full h-full object-cover" src={agent.avatar} alt={agent.name} referrerPolicy="no-referrer" />
                    </div>
                    <div>
                      <div className="flex items-center gap-1.5">
                        <span className="text-[10px] font-bold bg-blue-50 text-[#0052cc] px-1.5 py-0.5 rounded">
                          Agent #{agent.agentNumber}
                        </span>
                        <h4 className="font-bold text-gray-900 text-sm leading-tight">{agent.title}</h4>
                      </div>
                      <p className="text-[10px] text-gray-500 font-medium mt-0.5">{agent.name} • <span className="text-[#0052cc] font-semibold">{agent.role}</span></p>
                    </div>
                  </div>

                  {/* Tagline / Summary */}
                  <p className="text-[11px] text-gray-600 line-clamp-2 mb-3 bg-gray-50/80 p-2 rounded-lg border border-gray-100/60 leading-relaxed">
                    {agent.tagline}
                  </p>

                  {/* Tasks List */}
                  <div className="space-y-1.5 text-xs text-gray-500 flex-1 mb-4">
                    <p className="text-[10px] font-bold uppercase tracking-wider text-gray-400">Core Tasks</p>
                    <ul className="space-y-1.5">
                      {agent.tasks.slice(0, 3).map((task, idx) => (
                        <li key={idx} className="flex items-start gap-1.5 text-[11px] text-gray-600">
                          <span className="w-1.5 h-1.5 mt-1 rounded-full bg-[#0052cc] shrink-0"></span>
                          <span className="line-clamp-2 leading-snug">{task}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* Action Bar inside card */}
                  <div className="pt-3 border-t border-gray-100 flex items-center justify-between mt-auto">
                    <button
                      onClick={() => setInspectingAgent(agent)}
                      className="text-[11px] font-semibold text-[#0052cc] hover:text-[#003d9b] flex items-center gap-1 transition-colors"
                    >
                      <FileCode className="w-3.5 h-3.5" />
                      View Official Prompt
                    </button>
                    <button
                      onClick={() => onToggleAgent(agent.id)}
                      className={`text-[11px] font-semibold px-2.5 py-1 rounded-lg transition-colors ${
                        isSelected 
                          ? 'bg-blue-50 text-[#0052cc]' 
                          : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                      }`}
                    >
                      {isSelected ? 'Enabled' : 'Disabled'}
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Right Column: Ingestion Options & Trigger Panel */}
        <div className="xl:col-span-1 space-y-6">
          <div className="bg-white border border-gray-100 shadow-sm rounded-2xl p-6 space-y-6" id="options-panel">
            <h4 className="text-xs font-bold text-gray-900 uppercase tracking-wider flex items-center gap-2">
              <Sliders className="w-4 h-4 text-[#0052cc]" />
              Analysis Parameters &amp; Options
            </h4>

            {/* In-Browser Settings Options */}
            <div className="space-y-4 text-xs" id="config-parameters-inputs">
              {/* Compliance screening parameter */}
              <div className="space-y-1.5">
                <label className="font-bold text-gray-700 block">Civil Rights &amp; Consent Compliance Checks</label>
                <div className="flex items-center justify-between bg-gray-50 p-3 rounded-xl border border-gray-100">
                  <span className="text-[11px] text-gray-500">Scan for Title VI interpreter &amp; informed consent standard failures</span>
                  <input
                    type="checkbox"
                    checked={complianceCheck}
                    onChange={(e) => setComplianceCheck(e.target.checked)}
                    className="w-4 h-4 text-[#0052cc] rounded focus:ring-1 focus:ring-[#0052cc]/20 border-gray-300"
                    id="checkbox-compliance-screening"
                  />
                </div>
              </div>

              {/* Analysis Depth parameter */}
              <div className="space-y-1.5">
                <label className="font-bold text-gray-700 block">Report Output Depth</label>
                <div className="grid grid-cols-2 gap-2">
                  {(['Standard', 'Exhaustive'] as const).map((opt) => (
                    <button
                      key={opt}
                      onClick={() => setReportDepth(opt)}
                      className={`py-2 rounded-lg border font-semibold transition-colors text-[11px] ${
                        reportDepth === opt
                          ? 'border-[#0052cc] bg-[#dae2ff] text-[#001848]'
                          : 'border-gray-200 hover:bg-gray-50 text-gray-600 bg-white'
                      }`}
                      id={`btn-depth-${opt}`}
                    >
                      {opt}
                    </button>
                  ))}
                </div>
              </div>

              {/* Routing threshold parameter */}
              <div className="space-y-1.5">
                <label className="font-bold text-gray-700 block">Triage Escalation Routing scope</label>
                <div className="grid grid-cols-2 gap-2">
                  {(['All', 'Priority Only'] as const).map((opt) => (
                    <button
                      key={opt}
                      onClick={() => setRoutingDept(opt)}
                      className={`py-2 rounded-lg border font-semibold transition-colors text-[11px] ${
                        routingDept === opt
                          ? 'border-[#0052cc] bg-[#dae2ff] text-[#001848]'
                          : 'border-gray-200 hover:bg-gray-50 text-gray-600 bg-white'
                      }`}
                      id={`btn-routing-${opt}`}
                    >
                      {opt}
                    </button>
                  ))}
                </div>
              </div>

              {/* Language support parameter */}
              <div className="space-y-1.5">
                <label className="font-bold text-gray-700 block">Language &amp; Translation Scope</label>
                <select
                  value={languageScope}
                  onChange={(e) => setLanguageScope(e.target.value as any)}
                  className="w-full bg-gray-50 border border-gray-200 rounded-lg p-2 text-[11px] focus:ring-1 focus:ring-[#0052cc]/20 outline-none text-gray-700"
                  id="select-language-scope"
                >
                  <option value="English Only">English Only</option>
                  <option value="Multi-lingual Translation">Multi-lingual Translation (LEP translation)</option>
                </select>
              </div>
            </div>

            {/* Run Concurrent Workflows Panel */}
            <div className="pt-4 border-t border-gray-50 space-y-4">
              {hasData ? (
                <div className="space-y-3">
                  <div className="bg-emerald-50 text-emerald-800 text-[11px] p-3 rounded-xl border border-emerald-100 flex items-start gap-2 font-medium">
                    <CheckCircle className="w-4 h-4 shrink-0 text-emerald-600 mt-0.5" />
                    <span>Inbound clinical cohort dataset verified. Ready for 6-agent parallel processing execution.</span>
                  </div>
                  
                  <button
                    onClick={handleStartClick}
                    disabled={selectedCount === 0}
                    className={`w-full py-3.5 rounded-xl font-bold tracking-wide text-xs transition-all flex items-center justify-center gap-2 shadow-md ${
                      selectedCount === 0
                        ? 'bg-gray-100 text-gray-400 cursor-not-allowed shadow-none border border-gray-100'
                        : 'bg-[#0052cc] hover:bg-[#003d9b] text-white shadow-blue-500/10 active:scale-95'
                    }`}
                    id="btn-start-analysis"
                  >
                    <Play className="w-4 h-4" />
                    Launch {selectedCount} Activated Agents Concurrently
                  </button>
                </div>
              ) : (
                <div className="space-y-3 text-center">
                  <div className="bg-amber-50 text-amber-800 text-[11px] p-3 rounded-xl border border-amber-200 text-left flex items-start gap-2 leading-relaxed font-medium">
                    <AlertCircle className="w-4 h-4 text-amber-600 shrink-0 mt-0.5" />
                    <span>Spreadsheet dataset required before initiating clinical AI analysis. Click below to instantly load our 8 pre-scrubbed default patient logs.</span>
                  </div>
                  
                  <button
                    onClick={onLoadDefaultDataset}
                    className="w-full bg-white hover:bg-gray-50 text-[#0052cc] border border-amber-200 py-2.5 rounded-xl text-xs font-bold transition-colors flex items-center justify-center gap-1.5"
                    id="btn-inject-default-config"
                  >
                    <Database className="w-4 h-4" />
                    Inject Verified Clinic Dataset
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Official Prompt Inspector Modal */}
      {inspectingAgent && (
        <div className="fixed inset-0 z-50 bg-black/40 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl max-w-2xl w-full max-h-[85vh] flex flex-col shadow-2xl border border-gray-200 overflow-hidden animate-in fade-in zoom-in-95 duration-150">
            {/* Modal Header */}
            <div className="p-4 border-b border-gray-100 flex items-center justify-between bg-gray-50">
              <div className="flex items-center gap-3">
                <img src={inspectingAgent.avatar} alt={inspectingAgent.name} className="w-9 h-9 rounded-lg object-cover border" />
                <div>
                  <h3 className="font-bold text-gray-900 text-sm">Agent #{inspectingAgent.agentNumber}: {inspectingAgent.title}</h3>
                  <p className="text-[11px] text-gray-500">{inspectingAgent.name} • {inspectingAgent.role}</p>
                </div>
              </div>
              <button
                onClick={() => setInspectingAgent(null)}
                className="p-1.5 rounded-lg text-gray-400 hover:text-gray-700 hover:bg-gray-100 transition-colors"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {/* Modal Content */}
            <div className="p-6 overflow-y-auto space-y-4 text-xs">
              <div>
                <span className="font-bold text-gray-800 text-[11px] uppercase tracking-wider block mb-1">Agent Role &amp; Purpose</span>
                <p className="text-gray-600 bg-blue-50/50 p-3 rounded-xl border border-blue-100/60 leading-relaxed">
                  {inspectingAgent.summary}
                </p>
              </div>

              <div>
                <span className="font-bold text-gray-800 text-[11px] uppercase tracking-wider block mb-1">Official System Prompt</span>
                <pre className="font-mono text-[11px] bg-gray-900 text-gray-100 p-4 rounded-xl whitespace-pre-wrap leading-relaxed overflow-x-auto max-h-56">
                  {inspectingAgent.systemPrompt}
                </pre>
              </div>

              <div>
                <span className="font-bold text-gray-800 text-[11px] uppercase tracking-wider block mb-1">Clinical Constraints</span>
                <p className="text-gray-600 bg-amber-50/60 p-3 rounded-xl border border-amber-200/60 leading-relaxed">
                  {inspectingAgent.constraints}
                </p>
              </div>

              <div>
                <span className="font-bold text-gray-800 text-[11px] uppercase tracking-wider block mb-1">Canvas Output Requirement</span>
                <p className="text-gray-600 bg-emerald-50/60 p-3 rounded-xl border border-emerald-200/60 leading-relaxed">
                  {inspectingAgent.outputFormat}
                </p>
              </div>
            </div>

            {/* Modal Footer */}
            <div className="p-4 border-t border-gray-100 bg-gray-50 flex justify-end">
              <button
                onClick={() => setInspectingAgent(null)}
                className="px-4 py-2 bg-[#0052cc] text-white rounded-xl text-xs font-semibold hover:bg-[#003d9b] transition-colors"
              >
                Close Inspector
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
