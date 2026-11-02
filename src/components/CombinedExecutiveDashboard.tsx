/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState } from 'react';
import { 
  ResponsiveContainer, 
  BarChart, 
  Bar, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  Legend, 
  PieChart, 
  Pie, 
  Cell 
} from 'recharts';
import { 
  BarChart3, 
  Users, 
  HeartHandshake, 
  CheckSquare, 
  Building2, 
  AlertTriangle, 
  Lightbulb, 
  UserCheck, 
  HelpCircle,
  TrendingDown,
  Activity,
  ArrowRight,
  ShieldCheck,
  EyeOff,
  BrainCircuit
} from 'lucide-react';
import { PatientFeedbackRow, AnalyticsReport, HumanReviewDecision } from '../types';

interface CombinedExecutiveDashboardProps {
  analyticsReport: AnalyticsReport;
  humanReviews: HumanReviewDecision[];
  onApproveReview: (rowId: string) => void;
  onRejectReview: (rowId: string) => void;
}

const COLORS = ['#0052cc', '#5e4db9', '#004b59', '#ff9800', '#ba1a1a', '#4633a0'];

export default function CombinedExecutiveDashboard({
  analyticsReport,
  humanReviews,
  onApproveReview,
  onRejectReview
}: CombinedExecutiveDashboardProps) {
  const [activeTab, setActiveTab] = useState<'kpis' | 'nlp' | 'problems' | 'equity' | 'opportunities' | 'cross-agent'>('kpis');

  const {
    executiveOverview,
    satisfactionInsights,
    nlpAnalysis,
    hiddenProblems,
    equityAndAccessibility,
    riskMonitoring,
    aiOpportunities,
    executiveRecommendations
  } = analyticsReport;

  // Custom cell tooltip
  const CustomTooltip = ({ active, payload, label }: any) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-gray-900 text-white text-xs p-3 rounded-lg border border-gray-800 shadow-md">
          <p className="font-bold">{label}</p>
          <p className="text-blue-400 mt-0.5">Rating: {payload[0].value}/5</p>
        </div>
      );
    }
    return null;
  };

  return (
    <div className="space-y-8" id="combined-executive-dashboard-container">
      {/* Title Header */}
      <div>
        <h2 className="text-xl font-bold text-gray-900 tracking-tight">Clinical Executive Oversight Dashboard</h2>
        <p className="text-gray-500 text-xs mt-1">
          Consolidated hospital-wide patient satisfaction metrics, qualitative NLP trends, and cross-agent consensus reports.
        </p>
      </div>

      {/* SECTION 1: KPI cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-6" id="overview-kpi-cards">
        <div className="bg-white border border-gray-100 p-5 rounded-2xl shadow-[0_2px_8px_rgba(0,0,0,0.02)]">
          <span className="text-[10px] font-bold text-gray-400 uppercase tracking-wider block mb-1">Total Comments Analyzed</span>
          <div className="flex items-baseline gap-2">
            <span className="text-2xl font-bold text-gray-900">{executiveOverview.totalCommentsAnalyzed}</span>
            <span className="text-[10px] text-emerald-600 font-bold bg-emerald-50 px-1.5 py-0.5 rounded">100% Ingested</span>
          </div>
          <Users className="w-4 h-4 text-gray-400 mt-2" />
        </div>

        <div className="bg-white border border-gray-100 p-5 rounded-2xl shadow-[0_2px_8px_rgba(0,0,0,0.02)]">
          <span className="text-[10px] font-bold text-gray-400 uppercase tracking-wider block mb-1">Average Satisfaction Score</span>
          <div className="flex items-baseline gap-2">
            <span className="text-2xl font-bold text-[#0052cc]">{executiveOverview.averageSatisfactionScore}/5</span>
            <span className="text-[10px] text-red-600 font-bold bg-red-50 px-1.5 py-0.5 rounded">Needs Audit</span>
          </div>
          <HeartHandshake className="w-4 h-4 text-[#0052cc] mt-2" />
        </div>

        <div className="bg-white border border-gray-100 p-5 rounded-2xl shadow-[0_2px_8px_rgba(0,0,0,0.02)]">
          <span className="text-[10px] font-bold text-gray-400 uppercase tracking-wider block mb-1">Avg Communication Rating</span>
          <div className="flex items-baseline gap-2">
            <span className="text-2xl font-bold text-[#5e4db9]">{executiveOverview.averageCommunicationRating}/5</span>
            <span className="text-[10px] text-gray-400 font-semibold bg-gray-50 px-1.5 py-0.5 rounded">Median Baseline</span>
          </div>
          <Activity className="w-4 h-4 text-[#5e4db9] mt-2" />
        </div>

        <div className="bg-white border border-gray-100 p-5 rounded-2xl shadow-[0_2px_8px_rgba(0,0,0,0.02)]">
          <span className="text-[10px] font-bold text-gray-400 uppercase tracking-wider block mb-1">Follow-Up Compliance</span>
          <div className="flex items-baseline gap-2">
            <span className="text-2xl font-bold text-emerald-700">{executiveOverview.followUpComplianceRate}%</span>
            <span className="text-[10px] text-emerald-600 font-bold bg-emerald-50 px-1.5 py-0.5 rounded">Compliance Target</span>
          </div>
          <CheckSquare className="w-4 h-4 text-emerald-600 mt-2" />
        </div>

        <div className="bg-white border border-gray-100 p-5 rounded-2xl shadow-[0_2px_8px_rgba(0,0,0,0.02)]">
          <span className="text-[10px] font-bold text-gray-400 uppercase tracking-wider block mb-1">Service Lines Monitored</span>
          <div className="flex items-baseline gap-2">
            <span className="text-2xl font-bold text-[#004b59]">{executiveOverview.serviceLinesCount}</span>
            <span className="text-[10px] text-gray-500 font-semibold">Active Units</span>
          </div>
          <Building2 className="w-4 h-4 text-[#004b59] mt-2" />
        </div>
      </div>

      {/* Sub-tab navigation */}
      <div className="border-b border-gray-100 flex gap-1 overflow-x-auto" id="executive-tabs">
        {[
          { id: 'kpis', name: 'Satisfaction Metrics' },
          { id: 'nlp', name: 'NLP & Theme Insights' },
          { id: 'problems', name: 'Hidden Bottlenecks' },
          { id: 'equity', name: 'Equity & Accessibility' },
          { id: 'opportunities', name: 'AI Roadmaps' },
          { id: 'cross-agent', name: 'Cross-Agent Alignment' }
        ].map(tab => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id as any)}
            className={`px-4 py-3 text-xs font-bold transition-all border-b-2 -mb-px whitespace-nowrap ${
              activeTab === tab.id
                ? 'border-[#0052cc] text-[#0052cc]'
                : 'border-transparent text-gray-400 hover:text-gray-600'
            }`}
            id={`exec-tab-${tab.id}`}
          >
            {tab.name}
          </button>
        ))}
      </div>

      {/* SECTION 2: Satisfaction Insights Tab */}
      {activeTab === 'kpis' && (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8" id="satisfaction-metrics-grids">
          {/* Chart 1: Satisfaction distribution */}
          <div className="bg-white border border-gray-100 p-6 rounded-2xl shadow-sm space-y-4">
            <div className="flex justify-between items-center border-b border-gray-50 pb-2">
              <span className="font-bold text-xs text-gray-900 uppercase tracking-wider">Satisfaction distribution score</span>
              <span className="text-[10px] text-gray-400">Rating index</span>
            </div>
            <div className="h-64">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={satisfactionInsights.distribution}>
                  <CartesianGrid strokeDasharray="3 3" vertical={false} />
                  <XAxis dataKey="score" tick={{ fontSize: 10 }} />
                  <YAxis allowDecimals={false} tick={{ fontSize: 10 }} />
                  <Tooltip cursor={{ fill: '#0052cc/5' }} />
                  <Bar dataKey="count" fill="#0052cc" radius={[4, 4, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>

          {/* Chart 2: Satisfaction by service line */}
          <div className="bg-white border border-gray-100 p-6 rounded-2xl shadow-sm space-y-4">
            <div className="flex justify-between items-center border-b border-gray-50 pb-2">
              <span className="font-bold text-xs text-gray-900 uppercase tracking-wider">Satisfaction by clinic service line</span>
              <span className="text-[10px] text-gray-400">Average rating</span>
            </div>
            <div className="h-64">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={satisfactionInsights.byServiceLine} layout="vertical">
                  <CartesianGrid strokeDasharray="3 3" horizontal={false} />
                  <XAxis type="number" domain={[0, 5]} tick={{ fontSize: 10 }} />
                  <YAxis type="category" dataKey="serviceLine" width={100} tick={{ fontSize: 10 }} />
                  <Tooltip content={<CustomTooltip />} />
                  <Bar dataKey="score" fill="#5e4db9" radius={[0, 4, 4, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>

          {/* Chart 3: Satisfaction by visit type */}
          <div className="bg-white border border-gray-100 p-6 rounded-2xl shadow-sm space-y-4">
            <div className="flex justify-between items-center border-b border-gray-50 pb-2">
              <span className="font-bold text-xs text-gray-900 uppercase tracking-wider">Satisfaction by appointment visit type</span>
              <span className="text-[10px] text-gray-400">Average rating</span>
            </div>
            <div className="h-64">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={satisfactionInsights.byVisitType}>
                  <CartesianGrid strokeDasharray="3 3" vertical={false} />
                  <XAxis dataKey="visitType" tick={{ fontSize: 10 }} />
                  <YAxis domain={[0, 5]} tick={{ fontSize: 10 }} />
                  <Tooltip content={<CustomTooltip />} />
                  <Bar dataKey="score" fill="#004b59" radius={[4, 4, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>

          {/* Chart 4: Satisfaction by persona */}
          <div className="bg-white border border-gray-100 p-6 rounded-2xl shadow-sm space-y-4">
            <div className="flex justify-between items-center border-b border-gray-50 pb-2">
              <span className="font-bold text-xs text-gray-900 uppercase tracking-wider">Satisfaction by cohort patient persona</span>
              <span className="text-[10px] text-gray-400">Average rating</span>
            </div>
            <div className="h-64">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={satisfactionInsights.byPersona} layout="vertical">
                  <CartesianGrid strokeDasharray="3 3" horizontal={false} />
                  <XAxis type="number" domain={[0, 5]} tick={{ fontSize: 10 }} />
                  <YAxis type="category" dataKey="persona" width={120} tick={{ fontSize: 10 }} />
                  <Tooltip content={<CustomTooltip />} />
                  <Bar dataKey="score" fill="#ff9800" radius={[0, 4, 4, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>
        </div>
      )}

      {/* SECTION 3: NLP Analysis Tab */}
      {activeTab === 'nlp' && (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8" id="nlp-analysis-grids">
          {/* Themes distribution Pie chart */}
          <div className="bg-white border border-gray-100 p-6 rounded-2xl shadow-sm space-y-4 lg:col-span-1">
            <div className="border-b border-gray-50 pb-2">
              <span className="font-bold text-xs text-gray-900 uppercase tracking-wider block">Primary Feedback Themes</span>
              <p className="text-[10px] text-gray-400 mt-0.5">Classification ratio across comments</p>
            </div>
            <div className="h-64 flex flex-col justify-between">
              <div className="h-44 relative">
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie
                      data={nlpAnalysis.themeDistribution}
                      cx="50%"
                      cy="50%"
                      innerRadius={50}
                      outerRadius={70}
                      paddingAngle={4}
                      dataKey="percentage"
                    >
                      {nlpAnalysis.themeDistribution.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                      ))}
                    </Pie>
                    <Tooltip formatter={(value) => `${value}%`} />
                  </PieChart>
                </ResponsiveContainer>
              </div>

              {/* Custom Legend */}
              <div className="grid grid-cols-2 gap-1.5 text-[9px] font-semibold text-gray-500 font-mono leading-tight">
                {nlpAnalysis.themeDistribution.map((theme, index) => (
                  <div key={theme.theme} className="flex items-center gap-1.5 truncate">
                    <span className="w-1.5 h-1.5 rounded-full shrink-0" style={{ backgroundColor: COLORS[index % COLORS.length] }}></span>
                    <span className="truncate">{theme.theme}: {theme.percentage}%</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Keywords Cloud Panel */}
          <div className="bg-white border border-gray-100 p-6 rounded-2xl shadow-sm space-y-4 lg:col-span-2">
            <div className="border-b border-gray-50 pb-2">
              <span className="font-bold text-xs text-gray-900 uppercase tracking-wider block">Frequently occurring comment keywords</span>
              <p className="text-[10px] text-gray-400 mt-0.5">NLP token count analysis</p>
            </div>
            <div className="h-64 flex items-center justify-center bg-gray-50/50 rounded-xl p-6">
              <div className="flex flex-wrap gap-4 items-center justify-center max-w-md">
                {nlpAnalysis.keywords.map((word) => {
                  const size = 10 + word.value * 2;
                  return (
                    <span
                      key={word.text}
                      className="font-bold tracking-tight rounded-lg hover:bg-[#0052cc]/5 px-2 py-0.5 transition-colors font-mono cursor-default"
                      style={{ fontSize: `${size}px`, color: COLORS[word.value % COLORS.length] }}
                    >
                      {word.text} <span className="text-[9px] font-normal text-gray-400 font-sans">({word.value})</span>
                    </span>
                  );
                })}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* SECTION 4: Hidden Organizational Problems Tab */}
      {activeTab === 'problems' && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8" id="problems-grids">
          {/* High complaint service lines */}
          <div className="bg-white border border-gray-100 p-6 rounded-2xl shadow-sm space-y-4">
            <h5 className="font-bold text-xs text-red-800 uppercase tracking-wider flex items-center gap-2">
              <TrendingDown className="w-4 h-4 text-red-600" />
              Service lines with abnormally high complaints
            </h5>

            <div className="space-y-3.5">
              {hiddenProblems.highComplaintServiceLines.map((sl, idx) => (
                <div key={idx} className="bg-red-50/50 border border-red-100 p-3.5 rounded-xl flex items-start gap-3">
                  <AlertTriangle className="w-4 h-4 text-red-500 mt-0.5 shrink-0" />
                  <div>
                    <span className="font-bold text-xs text-red-900">{sl.serviceLine} ({sl.count} filings)</span>
                    <p className="text-[11px] text-red-700 mt-0.5 leading-normal">{sl.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Operational bottlenecks log */}
          <div className="bg-white border border-gray-100 p-6 rounded-2xl shadow-sm space-y-4">
            <h5 className="font-bold text-xs text-gray-900 uppercase tracking-wider">Communication &amp; Technology Bottlenecks</h5>
            
            <div className="space-y-2.5 text-xs text-gray-600">
              <span className="text-[9px] font-bold text-gray-400 block uppercase">Discharge / Follow-up failures</span>
              {hiddenProblems.communicationBottlenecks.map((bot, idx) => (
                <div key={idx} className="flex items-start gap-2 bg-gray-50 p-2.5 rounded-lg border border-gray-100 leading-normal">
                  <span className="w-1.5 h-1.5 bg-[#5e4db9] rounded-full mt-1.5 shrink-0"></span>
                  <p>{bot}</p>
                </div>
              ))}

              <span className="text-[9px] font-bold text-gray-400 block uppercase pt-2">Patient Portal lockout errors</span>
              {hiddenProblems.technologyIssues.map((tech, idx) => (
                <div key={idx} className="flex items-start gap-2 bg-gray-50 p-2.5 rounded-lg border border-gray-100 leading-normal">
                  <span className="w-1.5 h-1.5 bg-[#0052cc] rounded-full mt-1.5 shrink-0"></span>
                  <p>{tech}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* SECTION 6: Healthcare Equity and Accessibility Tab */}
      {activeTab === 'equity' && (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8" id="equity-grids">
          {/* Accessibility Scorecard */}
          <div className="bg-white border border-gray-100 p-6 rounded-2xl shadow-sm space-y-4 md:col-span-1">
            <h5 className="font-bold text-xs text-gray-900 uppercase tracking-wider">Demographic Disparity score</h5>
            
            <div className="space-y-4 font-medium text-xs">
              {equityAndAccessibility.personaSatisfaction.map((ps) => (
                <div key={ps.persona} className="space-y-1.5">
                  <div className="flex justify-between items-center">
                    <span className="text-gray-700 font-bold">{ps.persona}</span>
                    <span className="text-[#0052cc] font-bold font-mono">{ps.satisfaction}/5 Rating</span>
                  </div>
                  <div className="w-full bg-gray-100 h-2 rounded-full overflow-hidden">
                    <div className="bg-[#ff9800] h-full" style={{ width: `${(ps.satisfaction / 5) * 100}%` }}></div>
                  </div>
                  <span className="text-[9px] text-gray-400 block font-mono">Barriers logged: {ps.barrierCount} cases</span>
                </div>
              ))}
            </div>
          </div>

          {/* Core Equity Barriers List */}
          <div className="bg-white border border-gray-100 p-6 rounded-2xl shadow-sm space-y-4 md:col-span-2">
            <h5 className="font-bold text-xs text-indigo-900 uppercase tracking-wider">Civil Rights, Language, and Disability Barriers</h5>
            
            <div className="space-y-3.5 text-xs text-gray-600">
              {/* Accessibility */}
              <div className="space-y-1.5">
                <span className="text-[9px] font-bold text-gray-400 block uppercase">Blind screen-reader &amp; physical ADA barriers</span>
                {equityAndAccessibility.accessibilityConcerns.map((acc, idx) => (
                  <p key={idx} className="bg-indigo-50/40 p-2.5 rounded-lg border border-indigo-100/50 leading-normal italic text-indigo-800">
                    "{acc}"
                  </p>
                ))}
              </div>

              {/* Language */}
              <div className="space-y-1.5 pt-2">
                <span className="text-[9px] font-bold text-gray-400 block uppercase">Language access (Medical Interpreter failure)</span>
                {equityAndAccessibility.languageBarriers.map((lan, idx) => (
                  <p key={idx} className="bg-red-50/40 p-2.5 rounded-lg border border-red-100/50 leading-normal italic text-red-800 font-medium">
                    "{lan}"
                  </p>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* SECTION 8: AI Opportunities & Recommendations Tab */}
      {activeTab === 'opportunities' && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8" id="ai-opportunities-grids">
          {/* Hospital Priorities list */}
          <div className="bg-white border border-gray-100 p-6 rounded-2xl shadow-sm space-y-4">
            <h5 className="font-bold text-xs text-gray-900 uppercase tracking-wider flex items-center gap-1.5">
              <Lightbulb className="w-4 h-4 text-amber-500" />
              Primary executive quality-improvement priorities
            </h5>

            <div className="space-y-3 font-semibold text-xs text-gray-700">
              {executiveRecommendations.priorities.map((prior, idx) => (
                <div key={idx} className="flex items-start gap-3 bg-gray-50 hover:bg-gray-100/50 p-3.5 rounded-xl border border-gray-100 leading-normal transition-colors">
                  <span className="w-5 h-5 bg-[#0052cc]/10 text-[#0052cc] rounded-full flex items-center justify-center font-bold font-mono text-[10px] shrink-0 mt-0.5">
                    {idx + 1}
                  </span>
                  <p className="pt-0.5">{prior}</p>
                </div>
              ))}
            </div>
          </div>

          {/* AI Roadmap Opportunities */}
          <div className="bg-white border border-gray-100 p-6 rounded-2xl shadow-sm space-y-4">
            <h5 className="font-bold text-xs text-blue-900 uppercase tracking-wider flex items-center gap-1.5">
              <BrainCircuit className="w-4 h-4 text-[#0052cc]" />
              AI expansion opportunities &amp; expected organizational impact
            </h5>

            <div className="space-y-4 text-xs">
              {aiOpportunities.map((opp, idx) => (
                <div key={idx} className="border-l-4 border-[#0052cc] pl-4 space-y-1 py-1 bg-blue-50/10 rounded-r-lg pr-2.5">
                  <span className="font-bold text-[#0052cc] text-sm block">{opp.name}</span>
                  <p className="text-gray-600 font-medium leading-relaxed">{opp.purpose}</p>
                  <p className="text-[10px] text-emerald-700 font-mono italic font-bold">Expected Impact: {opp.impact}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Comparison and Joint Cross-Agent Insights Tab */}
      {activeTab === 'cross-agent' && (
        <div className="space-y-6" id="cross-agent-comparison-panel">
          {/* 6-Agent Consensus Matrix Card */}
          <div className="bg-gradient-to-r from-blue-900 to-indigo-900 rounded-2xl p-6 text-white shadow-md">
            <div className="flex items-center gap-3 mb-2">
              <span className="p-2 bg-white/10 rounded-xl">
                <BrainCircuit className="w-5 h-5 text-blue-300" />
              </span>
              <div>
                <h4 className="font-bold text-base">Six-Agent Unified Synthesis Matrix</h4>
                <p className="text-xs text-blue-200">
                  Cross-validation across all 6 specialized healthcare agents: Julian Vance (Insight), Elena Rodriguez (Monitoring), Marcus Thorne (Triage), Dr. Arthur Sterling (Decision Support), Sarah Jenkins (Analytics), and Dr. Maya Lin (Communication Quality).
                </p>
              </div>
            </div>
            
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3 mt-4 pt-4 border-t border-white/10 text-xs">
              <div className="bg-white/10 p-3 rounded-xl">
                <span className="text-[10px] text-blue-200 block uppercase font-mono">Agent 1: Insight</span>
                <span className="font-bold text-white text-sm">Theme &amp; Sentiment</span>
                <p className="text-[11px] text-blue-100 mt-1">Identifies core drivers &amp; emotional tones</p>
              </div>
              <div className="bg-white/10 p-3 rounded-xl">
                <span className="text-[10px] text-blue-200 block uppercase font-mono">Agent 2: Monitoring</span>
                <span className="font-bold text-white text-sm">Equity &amp; Safety</span>
                <p className="text-[11px] text-blue-100 mt-1">Flags vulnerability &amp; compliance risks</p>
              </div>
              <div className="bg-white/10 p-3 rounded-xl">
                <span className="text-[10px] text-blue-200 block uppercase font-mono">Agent 3: Triage</span>
                <span className="font-bold text-white text-sm">Severity &amp; Route</span>
                <p className="text-[11px] text-blue-100 mt-1">Assigns urgency levels 1-4 &amp; target team</p>
              </div>
              <div className="bg-white/10 p-3 rounded-xl">
                <span className="text-[10px] text-blue-200 block uppercase font-mono">Agent 4: Decision</span>
                <span className="font-bold text-white text-sm">Management Plan</span>
                <p className="text-[11px] text-blue-100 mt-1">Top alert, priorities &amp; action mandates</p>
              </div>
              <div className="bg-white/10 p-3 rounded-xl">
                <span className="text-[10px] text-blue-200 block uppercase font-mono">Agent 5: Analytics</span>
                <span className="font-bold text-white text-sm">Systemic Trends</span>
                <p className="text-[11px] text-blue-100 mt-1">NLP keywords, KPIs &amp; AI roadmap</p>
              </div>
              <div className="bg-white/10 p-3 rounded-xl">
                <span className="text-[10px] text-blue-200 block uppercase font-mono">Agent 6: Comm Eval</span>
                <span className="font-bold text-white text-sm">Literacy &amp; Tone</span>
                <p className="text-[11px] text-blue-100 mt-1">8 quality scores &amp; 6th-grade rewrite</p>
              </div>
            </div>
          </div>

          {/* Joint consensus, conflicts, high priority card */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* Supported findings across more than one agent */}
            <div className="bg-white border border-gray-100 p-6 rounded-2xl shadow-sm space-y-4">
              <h5 className="font-bold text-xs text-emerald-800 uppercase tracking-wider flex items-center gap-1.5">
                <CheckSquare className="w-4 h-4 text-emerald-600" />
                Findings supported by multiple agents
              </h5>

              <ul className="space-y-3.5 text-xs text-gray-600">
                <li className="flex items-start gap-2.5 leading-normal">
                  <span className="w-1.5 h-1.5 mt-1.5 rounded-full bg-emerald-500 shrink-0"></span>
                  <div>
                    <strong className="text-gray-900 block">Severe ED Hallway Care Delay (PAT-002):</strong>
                    Insight (Julian) and Monitoring (Elena) both flagged patient abandonment risk. Triage (Marcus) computed a Level 4 severity index. Decision Support (Dr. Sterling) issued a Top Management Alert requiring an immediate Emergency Department capacity review within 24 hours. Communication Evaluator (Dr. Lin) flagged acute empathy breakdown and high risk for adverse outcomes.
                  </div>
                </li>
                <li className="flex items-start gap-2.5 leading-normal">
                  <span className="w-1.5 h-1.5 mt-1.5 rounded-full bg-emerald-500 shrink-0"></span>
                  <div>
                    <strong className="text-gray-900 block">Geriatric Outpatient Discharge Void (PAT-003):</strong>
                    Insight flagged post-discharge care discrepancies, Monitoring classified it as geriatric burden, Triage routed to Nursing Leadership, Decision Support identified a high 30-day readmission risk, and Communication Evaluator proved that the discharge instructions had a 12th-grade reading level filled with medical jargon, demanding immediate conversion to a 6th-grade teach-back protocol.
                  </div>
                </li>
              </ul>
            </div>

            {/* Conflicting Interpretations */}
            <div className="bg-white border border-gray-100 p-6 rounded-2xl shadow-sm space-y-4">
              <h5 className="font-bold text-xs text-amber-800 uppercase tracking-wider flex items-center gap-1.5">
                <EyeOff className="w-4 h-4 text-amber-600" />
                Related Patterns &amp; Conflicting Interpretations
              </h5>

              <div className="space-y-3.5 text-xs text-gray-600 leading-relaxed">
                <div className="bg-amber-50/50 p-4 rounded-xl border border-amber-100">
                  <strong className="text-amber-900 block mb-1">Billing Miscoding &amp; Conduct (PAT-004):</strong>
                  The Insight and Analytics agents classified this comment under the "Billing" theme. However, Marcus Thorne (Triage) and Dr. Sterling (Decision Support) highlighted that patient portal non-usage combined with aggressive verbal collection calls elevated this to a human-relations risk, recommending supervisory de-escalation coaching over simple charge re-coding.
                </div>
                <div className="bg-amber-50/50 p-4 rounded-xl border border-amber-100">
                  <strong className="text-amber-900 block mb-1">Pediatric Hygiene Standard Breach (PAT-008):</strong>
                  Monitoring marked this as a moderate experience complaint, whereas Triage and Decision Support upgraded it to High Clinical Risk due to vulnerable pediatric populations, requiring immediate Infection Prevention peer audits and nursing handoff remediation.
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* SECTION 7 & 10: AI Risk Monitoring & Human Review Queue */}
      <div className="bg-white border border-gray-100 rounded-2xl p-6 shadow-sm space-y-6" id="human-review-queue-panel">
        <div>
          <h4 className="text-sm font-bold text-gray-900 flex items-center gap-1.5">
            <UserCheck className="w-4 h-4 text-[#0052cc]" />
            Hospital Clinical Quality Human-Review Queue
          </h4>
          <p className="text-xs text-gray-400 mt-1">
            HIPAA Safeguard: AI observations must receive verified approval by clinical executives before operational or disciplinary escalation.
          </p>
        </div>

        {humanReviews.length === 0 ? (
          <div className="text-center py-8 text-xs text-gray-400 font-medium">
            Review queue is empty. Clean clinical operations validated.
          </div>
        ) : (
          <div className="space-y-4">
            {humanReviews.map((rev) => (
              <div 
                key={rev.rowId} 
                className={`border p-5 rounded-2xl space-y-4 transition-all relative ${
                  rev.status === 'Approved'
                    ? 'border-emerald-200 bg-emerald-50/10'
                    : rev.status === 'Rejected'
                    ? 'border-red-200 bg-red-50/10'
                    : 'border-amber-200 bg-amber-50/15'
                }`}
                id={`review-row-${rev.rowId}`}
              >
                <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3">
                  <div className="flex items-center gap-2.5">
                    <span className="font-mono text-[10px] font-bold px-2 py-0.5 bg-gray-100 text-gray-500 rounded">
                      {rev.rowId}
                    </span>
                    <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${
                      rev.priority === 'Critical' ? 'bg-red-500 text-white animate-pulse' : 'bg-amber-100 text-amber-800'
                    }`}>
                      {rev.priority} Priority Case
                    </span>
                  </div>

                  <span className="text-[11px] font-mono font-bold text-gray-400">
                    Audit Status: {rev.status}
                  </span>
                </div>

                <div className="text-xs space-y-2">
                  <div className="bg-white p-3 rounded-xl border border-gray-100 italic text-gray-600">
                    "{rev.comment}"
                  </div>
                  <div>
                    <span className="font-bold text-red-900">AI Flagged Issue: </span>
                    <span className="text-gray-700 leading-normal">{rev.description}</span>
                  </div>
                  <div>
                    <span className="font-bold text-indigo-900">Compliance Evidence: </span>
                    <span className="text-gray-500 italic leading-normal">{rev.evidence}</span>
                  </div>
                </div>

                {rev.status === 'Pending' ? (
                  <div className="flex justify-end gap-2.5 pt-2">
                    <button
                      onClick={() => onRejectReview(rev.rowId)}
                      className="text-xs font-bold text-gray-500 hover:text-gray-700 bg-white border border-gray-200 px-3 py-1.5 rounded-lg transition-colors"
                      id={`btn-reject-${rev.rowId}`}
                    >
                      Archive / Dismiss
                    </button>
                    <button
                      onClick={() => onApproveReview(rev.rowId)}
                      className="text-xs font-bold bg-[#0052cc] hover:bg-[#003d9b] text-white px-3.5 py-1.5 rounded-lg transition-colors flex items-center gap-1 shadow-sm"
                      id={`btn-approve-${rev.rowId}`}
                    >
                      <ShieldCheck className="w-3.5 h-3.5" />
                      Approve Escalation
                    </button>
                  </div>
                ) : (
                  <div className="flex justify-between items-center bg-white p-3 rounded-xl border border-gray-100/60 text-xs font-semibold">
                    <span className={rev.status === 'Approved' ? 'text-emerald-700' : 'text-red-600'}>
                      Decision: {rev.status === 'Approved' ? 'Approved & Escalated to Department Line' : 'Archived / Human Override applied'}
                    </span>
                    <span className="text-gray-400 font-mono text-[10px]">Audited by: {rev.reviewedBy} at 10-Jul-2026</span>
                  </div>
                )}
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Medical Legal Disclaimer notice */}
      <div className="bg-gray-50 p-4 rounded-xl border border-gray-100 text-[10px] text-gray-400 font-medium leading-relaxed text-center">
        Disclaimer Notice: Healthcare AI agents provide advisory summaries and diagnostic keyword classification to facilitate executive quality audits. They do not independently generate clinical diagnoses, treatment decisions, patient care pathways, or official employment actions. Human executive approval is mandatory.
      </div>
    </div>
  );
}
