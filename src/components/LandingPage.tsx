/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { motion } from 'motion/react';
import { 
  CheckSquare, 
  Square, 
  BrainCircuit, 
  Sparkles, 
  AlertTriangle,
  Play,
  ArrowRight,
  UserCheck,
  CheckCircle,
  HelpCircle,
  Database,
  SlidersHorizontal
} from 'lucide-react';
import { AgentId, AgentStatus, SharedActivity } from '../types';

interface AgentCardInfo {
  id: AgentId;
  agentNumber: number;
  name: string;
  title: string;
  role: string;
  avatar: string;
  bgImage: string;
  desc: string;
  recentActivities: string[];
}

const AGENTS_LIST: AgentCardInfo[] = [
  {
    id: 'insight',
    agentNumber: 1,
    name: 'Julian Vance',
    title: 'Patient Feedback Insight Agent',
    role: 'Sentiment & Theme Classifier',
    avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80',
    bgImage: 'https://images.unsplash.com/photo-1497366216548-37526070297c?w=600&auto=format&fit=crop&q=80',
    desc: 'Analyzes patient comments to extract core themes, evaluate sentiment, reasoning, operational breakdowns, and flags accessibility or clinical bias concerns.',
    recentActivities: [
      'Analyzed low-vision portal accessibility hold comments.',
      'Identified billing miscoding trends in preventative oncology screenings.'
    ]
  },
  {
    id: 'monitoring',
    agentNumber: 2,
    name: 'Elena Rodriguez',
    title: 'Patient Experience Monitoring Agent',
    role: 'Clinical Risk & Equity Auditor',
    avatar: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?w=150&auto=format&fit=crop&q=80',
    bgImage: 'https://images.unsplash.com/photo-1497215728101-856f4ea42174?w=600&auto=format&fit=crop&q=80',
    desc: 'Monitors ongoing customer surveys to isolate primary/secondary themes, evaluate patient safety hazards, assign precise risk levels, and establish action plans.',
    recentActivities: [
      'Assessed severity risks on emergency room cardiac hallway delay comments.',
      'Drafted rural healthcare equity and digital literacy guidelines.'
    ]
  },
  {
    id: 'triage',
    agentNumber: 3,
    name: 'Marcus Thorne',
    title: 'Complaint Triage Assistant',
    role: 'Complaint Incident Triage Officer',
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&auto=format&fit=crop&q=80',
    bgImage: 'https://images.unsplash.com/photo-1497366811353-6870744d04b2?w=600&auto=format&fit=crop&q=80',
    desc: 'Triages patient grievances into 4 severity levels, categorizes clinical and legal compliance risks, and routes priority cases to 10 hospital departments.',
    recentActivities: [
      'Routed informed consent translation failures directly to compliance directors.',
      'Flagged pediatric clinical assistant sanitization standard breaches.'
    ]
  },
  {
    id: 'decision-support',
    agentNumber: 4,
    name: 'Dr. Arthur Sterling',
    title: 'Hospital Manager Decision Support Agent',
    role: 'Hospital Operations Director',
    avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&auto=format&fit=crop&q=80',
    bgImage: 'https://images.unsplash.com/photo-1577495508048-b635879837f1?w=600&auto=format&fit=crop&q=80',
    desc: 'Transforms patient data into clear managerial insights, evaluates patient personas, age groups, service lines, portal usage, readmission risk, and AI risk flags.',
    recentActivities: [
      'Prioritized emergency hallway overflow alerts and vital checks protocol.',
      'Evaluated Title VI interpreter compliance and AI bias review triggers.'
    ]
  },
  {
    id: 'analytics',
    agentNumber: 5,
    name: 'Sarah Jenkins',
    title: 'Healthcare Analytics Agent',
    role: 'Executive Intelligence Specialist',
    avatar: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=150&auto=format&fit=crop&q=80',
    bgImage: 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=600&auto=format&fit=crop&q=80',
    desc: 'Aggregates patient experiences across the cohort to construct executive KPI dashboards, track satisfaction by service line, identify systemic bottlenecks, and roadmap AI solutions.',
    recentActivities: [
      'Compiled patient satisfaction index metrics across 6 major hospital service lines.',
      'Designed long-term AI-driven patient discharge and billing assistant proposals.'
    ]
  },
  {
    id: 'communication-evaluator',
    agentNumber: 6,
    name: 'Dr. Maya Lin',
    title: 'Healthcare Communication Quality Evaluator',
    role: 'Clinical Communication Specialist',
    avatar: 'https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e?w=150&auto=format&fit=crop&q=80',
    bgImage: 'https://images.unsplash.com/photo-1517502884422-41eaead166d4?w=600&auto=format&fit=crop&q=80',
    desc: 'Evaluates healthcare communications on 8 quality dimensions (Clarity, Empathy, Actionability, etc.), audits health literacy, and rewrites communications to a 6th-grade reading level.',
    recentActivities: [
      'Scored 8-dimension clinical communication quality radar metrics across encounters.',
      'Rewrote complex surgical discharge instructions to a 6th-grade reading level.'
    ]
  }
];

interface LandingPageProps {
  agentStatuses: Record<AgentId, AgentStatus>;
  agentProgress: Record<AgentId, number>;
  selectedAgents: Record<AgentId, boolean>;
  onToggleAgent: (id: AgentId) => void;
  onEnterAgentWorkspace: (id: AgentId) => void;
  activities: SharedActivity[];
  hasData: boolean;
  onLoadDefaultDataset: () => void;
  onEnterConfig: () => void;
}

export default function LandingPage({
  agentStatuses,
  agentProgress,
  selectedAgents,
  onToggleAgent,
  onEnterAgentWorkspace,
  activities,
  hasData,
  onLoadDefaultDataset,
  onEnterConfig
}: LandingPageProps) {

  // Return status styling details
  const getStatusBadge = (status: AgentStatus) => {
    switch (status) {
      case 'Processing':
        return {
          color: 'bg-blue-50 text-blue-700 border-blue-200',
          dot: 'bg-blue-500 animate-ping',
          text: 'Processing'
        };
      case 'Completed':
        return {
          color: 'bg-emerald-50 text-emerald-700 border-emerald-200',
          dot: 'bg-emerald-500',
          text: 'Completed'
        };
      case 'Selected':
        return {
          color: 'bg-[#e5deff] text-[#341d8d] border-[#9f8eff]/30',
          dot: 'bg-purple-500 animate-pulse',
          text: 'Selected'
        };
      case 'Error':
        return {
          color: 'bg-red-50 text-red-700 border-red-200',
          dot: 'bg-red-500',
          text: 'Error'
        };
      default:
        return {
          color: 'bg-gray-50 text-gray-600 border-gray-200',
          dot: 'bg-gray-400',
          text: 'Idle'
        };
    }
  };

  return (
    <div className="space-y-8" id="landing-page-container">
      {/* Intro Hero Section */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 bg-white p-6 rounded-2xl border border-gray-100 shadow-sm" id="landing-hero">
        <div className="max-w-2xl">
          <div className="flex items-center gap-2 text-xs font-semibold text-[#0052cc] mb-1.5 uppercase tracking-wider">
            <Sparkles className="w-3.5 h-3.5 text-amber-500" />
            Clinical Quality Improvement Portal
          </div>
          <h2 className="text-2xl font-bold text-gray-900 tracking-tight">Executive Management Offices</h2>
          <p className="text-gray-500 text-sm mt-1">
            Real-time status of clinical AI specialists across the virtual headquarters. Each agent operates independently or concurrently to evaluate patient feedback, triage complaints, and compute hospital-wide quality insights.
          </p>
        </div>

        {/* Dataset Status Callout */}
        <div className="flex flex-col gap-2 min-w-[220px]" id="landing-data-status">
          {hasData ? (
            <div className="bg-emerald-50 border border-emerald-100 p-3 rounded-xl flex items-start gap-2.5">
              <CheckCircle className="w-4 h-4 text-emerald-600 mt-0.5" />
              <div>
                <span className="text-xs font-bold text-emerald-800">Dataset Active</span>
                <p className="text-[10px] text-emerald-600 mt-0.5">Patient comments are verified and ready for audit.</p>
              </div>
            </div>
          ) : (
            <div className="bg-amber-50 border border-amber-100 p-3 rounded-xl flex flex-col gap-2">
              <div className="flex items-start gap-2.5">
                <AlertTriangle className="w-4 h-4 text-amber-600 mt-0.5" />
                <div>
                  <span className="text-xs font-bold text-amber-800">No Dataset Uploaded</span>
                  <p className="text-[10px] text-amber-600 mt-0.5">Please upload a feedback CSV or load our default clinical sample.</p>
                </div>
              </div>
              <button
                onClick={onLoadDefaultDataset}
                className="w-full bg-white hover:bg-gray-50 text-[#0052cc] border border-amber-200 py-1.5 rounded-lg text-[10px] font-bold tracking-wide transition-colors flex items-center justify-center gap-1"
                id="btn-load-sample"
              >
                <Database className="w-3 h-3" />
                Load Sample Dataset
              </button>
            </div>
          )}
        </div>
      </div>

      {/* Grid of six specialized offices */}
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6" id="virtual-offices-grid">
        {AGENTS_LIST.map((agent) => {
          const status = agentStatuses[agent.id];
          const progress = agentProgress[agent.id];
          const isSelected = selectedAgents[agent.id];
          const badge = getStatusBadge(status);
          const isProcessing = status === 'Processing';

          return (
            <div
              key={agent.id}
              className="group bg-white rounded-2xl overflow-hidden border border-gray-100 shadow-[0_2px_8px_rgba(0,0,0,0.02)] hover:shadow-[0_8px_24px_rgba(0,0,0,0.06)] hover:-translate-y-1 transition-all duration-300 flex flex-col cursor-pointer"
              onClick={() => onEnterAgentWorkspace(agent.id)}
              id={`office-room-${agent.id}`}
            >
              {/* Room Visual Canvas */}
              <div className="h-44 relative overflow-hidden bg-gray-50">
                <div
                  className="w-full h-full bg-cover bg-center group-hover:scale-105 transition-transform duration-700 opacity-90"
                  style={{ backgroundImage: `url(${agent.bgImage})` }}
                  title={`${agent.name}'s Virtual Room`}
                ></div>

                {/* Enter Hover Overlay */}
                <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity duration-200 flex items-center justify-center">
                  <span className="bg-white/95 text-xs text-[#0052cc] font-bold px-4 py-2 rounded-full shadow-md flex items-center gap-1.5 transition-transform duration-200 group-hover:scale-105">
                    Enter Workspace <ArrowRight className="w-3.5 h-3.5" />
                  </span>
                </div>

                {/* Agent Index Badge */}
                <div className="absolute top-3 left-3 bg-white/90 backdrop-blur-md px-2.5 py-0.5 rounded-full text-[10px] font-bold text-gray-800 shadow-sm border border-gray-100">
                  Agent #{agent.agentNumber}
                </div>

                {/* Status Indicator Chip */}
                <div className={`absolute top-3 right-3 backdrop-blur-md px-2.5 py-1 rounded-full flex items-center gap-1.5 shadow-sm border ${badge.color}`}>
                  <span className={`w-1.5 h-1.5 rounded-full ${badge.dot}`}></span>
                  <span className="text-[11px] font-semibold">{badge.text}</span>
                </div>

                {/* Live Analysis Progress Bar */}
                {isProcessing && (
                  <div className="absolute bottom-0 left-0 w-full bg-blue-500/10 h-1.5">
                    <motion.div
                      className="bg-[#0052cc] h-full"
                      initial={{ width: 0 }}
                      animate={{ width: `${progress}%` }}
                      transition={{ duration: 0.5 }}
                    ></motion.div>
                  </div>
                )}
              </div>

              {/* Card Body and Controls */}
              <div className="p-5 flex-1 flex flex-col">
                <div className="flex items-start justify-between gap-3 mb-3">
                  {/* Portrait Avatar */}
                  <div className="flex items-center gap-3">
                    <div className="relative">
                      {/* Avatar container with conditional glowing pulse border when working */}
                      <div className={`w-12 h-12 rounded-xl overflow-hidden border-2 border-white shadow-md relative ${
                        isProcessing ? 'ring-4 ring-blue-400/50 animate-pulse' : 'ring-1 ring-gray-100'
                      }`}>
                        <img className="w-full h-full object-cover" src={agent.avatar} alt={agent.name} referrerPolicy="no-referrer" />
                      </div>
                      {/* Avatar animated typing micro-dot when processing */}
                      {isProcessing && (
                        <span className="absolute -bottom-1 -right-1 w-4 h-4 bg-[#0052cc] rounded-full border-2 border-white flex items-center justify-center shadow">
                          <BrainCircuit className="w-2 h-2 text-white animate-spin" />
                        </span>
                      )}
                    </div>
                    <div>
                      <h3 className="font-bold text-gray-900 group-hover:text-[#0052cc] transition-colors text-sm">{agent.title}</h3>
                      <p className="text-[11px] text-gray-500 font-medium">{agent.name} • <span className="text-[#0052cc] font-semibold">{agent.role}</span></p>
                    </div>
                  </div>

                  {/* Activation Checkbox - Prevent click bubble to room entry */}
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      onToggleAgent(agent.id);
                    }}
                    className="p-1 rounded-lg hover:bg-gray-50 text-gray-400 hover:text-gray-600 transition-colors"
                    title={isSelected ? 'Deselect Agent' : 'Select Agent'}
                    id={`btn-select-${agent.id}`}
                  >
                    {isSelected ? (
                      <CheckSquare className="w-5 h-5 text-[#0052cc]" />
                    ) : (
                      <Square className="w-5 h-5 text-gray-300" />
                    )}
                  </button>
                </div>

                {/* Primary Functions Description */}
                <p className="text-gray-500 text-xs leading-relaxed flex-1">{agent.desc}</p>

                {/* Recent Activities Section */}
                <div className="bg-gray-50/70 rounded-xl p-4 mt-4 border border-gray-100/50">
                  <div className="flex items-center gap-1.5 mb-2.5">
                    <span className="text-[10px] font-bold tracking-wider text-gray-400 uppercase">Analytical Focus</span>
                  </div>
                  <ul className="space-y-1.5 text-xs text-gray-500">
                    {agent.recentActivities.map((act, idx) => (
                      <li key={idx} className="flex items-start gap-2">
                        <span className="w-1.5 h-1.5 mt-1.5 rounded-full bg-[#0052cc]/30 shrink-0"></span>
                        <span className="leading-tight">{act}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Concurrent Task Execution Trigger Panel */}
      <div className="bg-[#f3f4f6] border border-gray-200/60 rounded-2xl p-6 flex flex-col sm:flex-row justify-between items-center gap-4" id="concurrent-trigger-panel">
        <div className="text-center sm:text-left">
          <h4 className="text-sm font-bold text-gray-800 flex items-center gap-2 justify-center sm:justify-start">
            <BrainCircuit className="w-4 h-4 text-[#0052cc]" />
            Concurrent Analysis Workflows
          </h4>
          <p className="text-xs text-gray-500 mt-1">
            Configure analytical options, select multiple AI specialists, and initiate simultaneous parallel evaluation pipelines.
          </p>
        </div>
        <button
          onClick={onEnterConfig}
          className="bg-[#0052cc] hover:bg-[#003d9b] text-white px-5 py-2.5 rounded-xl text-xs font-semibold tracking-wide transition-all active:scale-95 flex items-center gap-1.5 shadow-md shadow-blue-500/10"
          id="btn-goto-config"
        >
          <SlidersHorizontal className="w-3.5 h-3.5" />
          Configure Task Parameters
        </button>
      </div>

      {/* Shared Activity Panel */}
      <div className="bg-white border border-gray-100 shadow-sm rounded-2xl p-6" id="shared-activity-panel">
        <div className="flex justify-between items-center mb-4">
          <div>
            <h4 className="text-sm font-bold text-gray-900">Virtual HQ Operational Logs</h4>
            <p className="text-xs text-gray-400">Continuous tracking of clinical agents, task progress, and live security audits.</p>
          </div>
          <span className="text-[10px] bg-blue-50 text-blue-700 px-2.5 py-1 rounded-full font-bold">
            Shared Pipeline
          </span>
        </div>

        {activities.length === 0 ? (
          <div className="text-center py-6 text-xs text-gray-400 font-medium">
            No active processing tasks. Select and run agents to generate operational audit logs.
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs text-gray-500" id="activity-table">
              <thead>
                <tr className="border-b border-gray-50 text-gray-400 font-semibold text-[10px] uppercase tracking-wider">
                  <th className="pb-2.5">Clinical Agent</th>
                  <th className="pb-2.5">Current Status</th>
                  <th className="pb-2.5">Progress Stage</th>
                  <th className="pb-2.5">Analytical Step</th>
                  <th className="pb-2.5">Timestamp</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-50 font-medium">
                {activities.map((act) => (
                  <tr key={act.agentId} className="hover:bg-gray-50/50 transition-colors">
                    <td className="py-3 font-bold text-gray-700 flex items-center gap-2">
                      <span className="w-1.5 h-1.5 rounded-full bg-blue-500 animate-pulse"></span>
                      {act.agentName}
                    </td>
                    <td className="py-3">
                      <span className={`px-2 py-0.5 rounded-full text-[10px] font-bold border ${getStatusBadge(act.status).color}`}>
                        {act.status}
                      </span>
                    </td>
                    <td className="py-3">
                      <div className="flex items-center gap-2">
                        <div className="w-20 bg-gray-100 rounded-full h-1.5 overflow-hidden">
                          <div className="bg-[#0052cc] h-full" style={{ width: `${act.progress}%` }}></div>
                        </div>
                        <span className="text-[10px] font-mono text-gray-400">{act.progress}%</span>
                      </div>
                    </td>
                    <td className="py-3 text-gray-600 italic">
                      {act.currentStep || 'Initializing specialist models...'}
                    </td>
                    <td className="py-3 text-gray-400 font-mono text-[10px]">
                      {act.timestamp}
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
}
