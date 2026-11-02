/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { motion } from 'motion/react';
import { 
  Activity, 
  CheckCircle2, 
  XCircle, 
  Play, 
  RotateCcw, 
  Terminal, 
  BrainCircuit, 
  Timer,
  AlertTriangle,
  StopCircle,
  FileSpreadsheet
} from 'lucide-react';
import { AgentId, AgentStatus, SharedActivity } from '../types';

interface AgentDetails {
  id: AgentId;
  name: string;
  role: string;
  avatar: string;
}

const AGENTS_INFO: Record<AgentId, AgentDetails> = {
  insight: {
    id: 'insight',
    name: 'Julian Vance',
    role: 'Patient Feedback Insight Agent',
    avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80'
  },
  monitoring: {
    id: 'monitoring',
    name: 'Elena Rodriguez',
    role: 'Patient Experience Monitoring Agent',
    avatar: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?w=150&auto=format&fit=crop&q=80'
  },
  triage: {
    id: 'triage',
    name: 'Marcus Thorne',
    role: 'Complaint Triage Assistant',
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&auto=format&fit=crop&q=80'
  },
  'decision-support': {
    id: 'decision-support',
    name: 'Dr. Arthur Sterling',
    role: 'Hospital Manager Decision Support Agent',
    avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&auto=format&fit=crop&q=80'
  },
  analytics: {
    id: 'analytics',
    name: 'Sarah Jenkins',
    role: 'Healthcare Analytics Agent',
    avatar: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=150&auto=format&fit=crop&q=80'
  },
  'communication-evaluator': {
    id: 'communication-evaluator',
    name: 'Dr. Maya Lin',
    role: 'Healthcare Communication Quality Evaluator',
    avatar: 'https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e?w=150&auto=format&fit=crop&q=80'
  }
};

interface LiveProcessingScreenProps {
  agentStatuses: Record<AgentId, AgentStatus>;
  agentProgress: Record<AgentId, number>;
  selectedAgents: Record<AgentId, boolean>;
  activities: SharedActivity[];
  onCancelAgent: (id: AgentId) => void;
  onRerunAgent: (id: AgentId) => void;
  onEnterResults: () => void;
}

export default function LiveProcessingScreen({
  agentStatuses,
  agentProgress,
  selectedAgents,
  activities,
  onCancelAgent,
  onRerunAgent,
  onEnterResults
}: LiveProcessingScreenProps) {
  
  const getStatusIcon = (status: AgentStatus) => {
    switch (status) {
      case 'Processing':
        return <BrainCircuit className="w-5 h-5 text-blue-600 animate-spin" />;
      case 'Completed':
        return <CheckCircle2 className="w-5 h-5 text-emerald-600 animate-bounce" />;
      case 'Error':
        return <XCircle className="w-5 h-5 text-red-600" />;
      default:
        return <Timer className="w-5 h-5 text-gray-400" />;
    }
  };

  const getStatusColorClass = (status: AgentStatus) => {
    switch (status) {
      case 'Processing':
        return 'border-blue-200 bg-blue-50/50 text-blue-800';
      case 'Completed':
        return 'border-emerald-200 bg-emerald-50/50 text-emerald-800';
      case 'Error':
        return 'border-red-200 bg-red-50/50 text-red-800';
      default:
        return 'border-gray-200 bg-gray-50/50 text-gray-500';
    }
  };

  const activeAgents = Object.keys(selectedAgents).filter(id => selectedAgents[id as AgentId]) as AgentId[];
  const isAnyRunning = Object.values(agentStatuses).some(status => status === 'Processing');
  const allCompleted = activeAgents.every(id => agentStatuses[id] === 'Completed' || agentStatuses[id] === 'Error');

  return (
    <div className="space-y-8" id="live-processing-screen-container">
      {/* Title Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h2 className="text-xl font-bold text-gray-900 tracking-tight">Active Hospital Pipeline Status</h2>
          <p className="text-gray-500 text-xs mt-1">
            Real-time visual monitoring of selected clinical agents executing simultaneous qualitative evaluations of the patient cohort.
          </p>
        </div>

        {allCompleted && (
          <button
            onClick={onEnterResults}
            className="bg-[#0052cc] hover:bg-[#003d9b] text-white px-5 py-2.5 rounded-xl text-xs font-semibold tracking-wide transition-all active:scale-95 flex items-center gap-1.5 shadow-md shadow-blue-500/10"
            id="btn-view-results-live"
          >
            <FileSpreadsheet className="w-4 h-4" />
            Navigate to Dashboard Results
          </button>
        )}
      </div>

      {/* Grid of activated processors */}
      {activeAgents.length === 0 ? (
        <div className="bg-white border border-gray-100 p-8 rounded-2xl text-center shadow-sm space-y-4" id="empty-processing-notice">
          <Activity className="w-10 h-10 text-gray-300 mx-auto" />
          <div className="max-w-md mx-auto">
            <h4 className="text-sm font-bold text-gray-900">No Activated Agents In Queue</h4>
            <p className="text-xs text-gray-400 mt-1">
              Please go back to the Virtual Office landing page or Configuration screen to select the AI specialists you want to run.
            </p>
          </div>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6" id="live-processors-grid">
          {activeAgents.map((id) => {
            const agent = AGENTS_INFO[id];
            const status = agentStatuses[id];
            const progress = agentProgress[id];
            const activity = activities.find(a => a.agentId === id);
            const isProcessing = status === 'Processing';

            return (
              <div
                key={id}
                className={`bg-white rounded-2xl border p-6 flex flex-col space-y-5 shadow-sm transition-all relative ${
                  isProcessing ? 'border-blue-200 shadow-md shadow-blue-500/5' : 'border-gray-100'
                }`}
                id={`live-room-${id}`}
              >
                {/* Header Row */}
                <div className="flex justify-between items-start gap-4">
                  <div className="flex items-center gap-3.5">
                    {/* Animated Avatar Box */}
                    <div className="relative">
                      <div className={`w-14 h-14 rounded-2xl overflow-hidden border-2 border-white shadow-md relative ${
                        isProcessing ? 'ring-4 ring-blue-400/50 animate-pulse' : 'ring-1 ring-gray-100'
                      }`}>
                        <img className="w-full h-full object-cover" src={agent.avatar} alt={agent.name} referrerPolicy="no-referrer" />
                      </div>
                      <span className="absolute -bottom-1 -right-1 p-1 rounded-full bg-white shadow-sm border border-gray-100">
                        {getStatusIcon(status)}
                      </span>
                    </div>
                    <div>
                      <h4 className="font-bold text-gray-900 text-sm">{agent.name}</h4>
                      <span className="text-[10px] text-gray-400 font-medium">{agent.role}</span>
                    </div>
                  </div>

                  {/* Operational controls for this single agent */}
                  <div className="flex items-center gap-1.5">
                    {isProcessing ? (
                      <button
                        onClick={() => onCancelAgent(id)}
                        className="p-1.5 text-red-500 hover:bg-red-50 rounded-lg transition-colors"
                        title="Cancel Analysis"
                        id={`btn-cancel-${id}`}
                      >
                        <StopCircle className="w-5 h-5" />
                      </button>
                    ) : (
                      <button
                        onClick={() => onRerunAgent(id)}
                        className="p-1.5 text-gray-500 hover:bg-gray-50 rounded-lg transition-colors"
                        title="Rerun Agent"
                        id={`btn-rerun-${id}`}
                      >
                        <RotateCcw className="w-5 h-5" />
                      </button>
                    )}
                  </div>
                </div>

                {/* Progress Indicators & Progress Stage logs */}
                <div className="space-y-2">
                  <div className="flex justify-between items-center text-xs">
                    <span className="text-gray-400 font-bold uppercase tracking-wide text-[10px]">Processing Stage</span>
                    <span className="font-mono font-bold text-[#0052cc]">{progress}%</span>
                  </div>
                  
                  {/* Visual Progress bar */}
                  <div className="w-full bg-gray-100 h-2 rounded-full overflow-hidden">
                    <motion.div
                      className="bg-[#0052cc] h-full rounded-full"
                      initial={{ width: 0 }}
                      animate={{ width: `${progress}%` }}
                      transition={{ duration: 0.3 }}
                    ></motion.div>
                  </div>

                  <div className="flex justify-between text-[10px] text-gray-400">
                    <span>Stage: {Math.min(4, Math.ceil(progress / 25))}/4</span>
                    <span>Remaining: {isProcessing ? `${Math.ceil((100 - progress) / 10)}s est.` : 'Done'}</span>
                  </div>
                </div>

                {/* Rolling clinical audit terminal log */}
                <div className="bg-gray-900 rounded-xl p-4 font-mono text-[10px] text-gray-300 space-y-1.5 border border-gray-800 flex-1 flex flex-col justify-between min-h-[140px]" id={`terminal-${id}`}>
                  <div className="flex items-center gap-1.5 border-b border-gray-800 pb-2 text-gray-500 font-semibold uppercase text-[8px] tracking-wider mb-2">
                    <Terminal className="w-3.5 h-3.5 text-blue-500" />
                    <span>Specialist Agent Terminal Audit Log</span>
                  </div>

                  <div className="space-y-1 flex-1 overflow-y-auto max-h-24 leading-normal">
                    <div className="text-gray-500">SYS_INIT_SEQUENCE: SUCCESS</div>
                    <div className="text-gray-500">INGESTED_ROWS: SECURED</div>
                    {progress >= 20 && <div className="text-emerald-400">AUDITING: HIPAA PII De-identification Scrub Check</div>}
                    {progress >= 40 && <div className="text-blue-400">EVALUATING: Qualitative Sentiment Parameters</div>}
                    {progress >= 60 && <div className="text-purple-400">CHECKING: Hospital Civil Rights &amp; Consent Protocols</div>}
                    {progress >= 80 && <div className="text-amber-400">DRAFTING: Actionable Managerial Interventions</div>}
                    {progress === 100 && <div className="text-emerald-400 font-bold">ANALYSIS_COMPILED: Executive Report Generated</div>}
                    
                    {/* Live typing indicator */}
                    {isProcessing && (
                      <div className="flex items-center gap-1 text-blue-400 text-[9px] mt-1 italic animate-pulse">
                        <span className="w-1.5 h-1.5 bg-blue-500 rounded-full animate-bounce"></span>
                        <span>{activity?.currentStep || 'Analyzing...'}</span>
                      </div>
                    )}
                  </div>

                  {status === 'Completed' && (
                    <div className="mt-2 pt-2 border-t border-gray-800/80 text-[10px] text-emerald-400 flex items-center gap-1.5 font-bold">
                      <CheckCircle2 className="w-3.5 h-3.5" />
                      Report successfully synchronized to Clinical HQ Dashboard.
                    </div>
                  )}

                  {status === 'Error' && (
                    <div className="mt-2 pt-2 border-t border-gray-800/80 text-[10px] text-red-400 flex items-center gap-1.5 font-bold">
                      <AlertTriangle className="w-3.5 h-3.5 text-red-500" />
                      Execution aborted. Missing data constraints.
                    </div>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      )}

      {/* Central Pipeline Summary Board */}
      <div className="bg-white border border-gray-100 shadow-sm rounded-2xl p-6" id="processing-pipeline-board">
        <h4 className="text-sm font-bold text-gray-900 mb-4">Pipeline Cohesion &amp; Synchronization Tracker</h4>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 text-xs text-gray-500 font-medium">
          <div className="bg-gray-50 border border-gray-100 p-4 rounded-xl flex items-center gap-3">
            <span className="w-3 h-3 bg-blue-500 rounded-full animate-ping"></span>
            <div>
              <span className="text-gray-400 text-[10px] uppercase font-bold block mb-0.5">Simultaneous Tasks</span>
              <span className="font-bold text-gray-800 text-sm">
                {activeAgents.filter(id => agentStatuses[id] === 'Processing').length} Active Processes
              </span>
            </div>
          </div>

          <div className="bg-gray-50 border border-gray-100 p-4 rounded-xl flex items-center gap-3">
            <span className="w-3 h-3 bg-emerald-500 rounded-full"></span>
            <div>
              <span className="text-gray-400 text-[10px] uppercase font-bold block mb-0.5">Success Ratio</span>
              <span className="font-bold text-gray-800 text-sm">
                {activeAgents.filter(id => agentStatuses[id] === 'Completed').length} / {activeAgents.length} Completed
              </span>
            </div>
          </div>

          <div className="bg-gray-50 border border-gray-100 p-4 rounded-xl flex items-center gap-3">
            <span className="w-3 h-3 bg-purple-500 rounded-full animate-pulse"></span>
            <div>
              <span className="text-gray-400 text-[10px] uppercase font-bold block mb-0.5">Pipeline State</span>
              <span className="font-bold text-gray-800 text-sm">
                {isAnyRunning ? 'Active Execution' : (allCompleted ? 'Completed (Awaiting Review)' : 'Idle Queue')}
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
