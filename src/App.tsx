/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState, useEffect, useRef } from 'react';
import Sidebar from './components/Sidebar';
import Header from './components/Header';
import LandingPage from './components/LandingPage';
import DataUploadScreen from './components/DataUploadScreen';
import AgentConfigScreen from './components/AgentConfigScreen';
import LiveProcessingScreen from './components/LiveProcessingScreen';
import AgentResultsDashboard from './components/AgentResultsDashboard';
import CombinedExecutiveDashboard from './components/CombinedExecutiveDashboard';

import { 
  DEFAULT_PATIENT_COMMENTS, 
  PRE_COMPUTED_INSIGHTS, 
  PRE_COMPUTED_MONITORING, 
  PRE_COMPUTED_TRIAGE, 
  PRE_COMPUTED_DECISION_SUPPORT,
  PRE_COMPUTED_COMMUNICATION_QUALITY,
  PRE_COMPUTED_ANALYTICS,
  generateDynamicReports
} from './data/defaultData';

import { 
  PatientFeedbackRow, 
  AgentId, 
  AgentStatus, 
  SharedActivity, 
  InsightReport, 
  MonitoringReport, 
  TriageReport, 
  DecisionSupportReport,
  CommunicationQualityReport,
  AnalyticsReport,
  HumanReviewDecision
} from './types';

export default function App() {
  // Navigation State
  const [activeScreen, setActiveScreen] = useState<'landing' | 'upload' | 'config' | 'live' | 'dashboard' | 'executive'>('landing');
  
  // Patient Dataset
  const [uploadedData, setUploadedData] = useState<PatientFeedbackRow[]>([]);
  
  // 6-Agent Selection & Execution Progress State
  const [selectedAgents, setSelectedAgents] = useState<Record<AgentId, boolean>>({
    insight: true,
    monitoring: true,
    triage: true,
    'decision-support': true,
    analytics: true,
    'communication-evaluator': true
  });

  const [agentStatuses, setAgentStatuses] = useState<Record<AgentId, AgentStatus>>({
    insight: 'Idle',
    monitoring: 'Idle',
    triage: 'Idle',
    'decision-support': 'Idle',
    analytics: 'Idle',
    'communication-evaluator': 'Idle'
  });

  const [agentProgress, setAgentProgress] = useState<Record<AgentId, number>>({
    insight: 0,
    monitoring: 0,
    triage: 0,
    'decision-support': 0,
    analytics: 0,
    'communication-evaluator': 0
  });

  const [activities, setActivities] = useState<SharedActivity[]>([]);

  // Reports data for all 6 agents
  const [insightReports, setInsightReports] = useState<Record<string, InsightReport>>({});
  const [monitoringReports, setMonitoringReports] = useState<Record<string, MonitoringReport>>({});
  const [triageReports, setTriageReports] = useState<Record<string, TriageReport>>({});
  const [decisionSupportReports, setDecisionSupportReports] = useState<Record<string, DecisionSupportReport>>({});
  const [communicationQualityReports, setCommunicationQualityReports] = useState<Record<string, CommunicationQualityReport>>({});
  const [analyticsReport, setAnalyticsReport] = useState<AnalyticsReport>(PRE_COMPUTED_ANALYTICS);

  // Human Review Queue
  const [humanReviews, setHumanReviews] = useState<HumanReviewDecision[]>([]);

  // Simulation Interval Ref
  const intervalRef = useRef<NodeJS.Timeout | null>(null);

  // Load default hospital baseline dataset
  const handleLoadDefaultDataset = () => {
    setUploadedData(DEFAULT_PATIENT_COMMENTS);
    setInsightReports(PRE_COMPUTED_INSIGHTS);
    setMonitoringReports(PRE_COMPUTED_MONITORING);
    setTriageReports(PRE_COMPUTED_TRIAGE);
    setDecisionSupportReports(PRE_COMPUTED_DECISION_SUPPORT);
    setCommunicationQualityReports(PRE_COMPUTED_COMMUNICATION_QUALITY);
    setAnalyticsReport(PRE_COMPUTED_ANALYTICS);

    // Initial human reviews from default dataset
    setHumanReviews([
      {
        rowId: 'PAT-002',
        comment: 'I came to the emergency room with severe chest pain. I waited for 4 hours in the hallway without any updates. Nobody checked my vitals or offered me water. I felt neglected and scared for my life.',
        priority: 'Critical',
        status: 'Pending',
        description: 'Patient abandonment risk accompanied by suspected standard-of-care breach and severe communication failure in high-acuity chest pain corridor.',
        evidence: 'Reported 4-hour delay in corridor stretcher with unresolved acute ischemic chest pain symptoms.',
        reviewedBy: 'Staff Clinical Auditor'
      },
      {
        rowId: 'PAT-003',
        comment: 'My elderly mother was discharged yesterday after her hip surgery. The nurse gave us a packet of papers but didn\'t explain the medications. We live in a rural area 2 hours away, and we don\'t know who to call for her severe pain. She is crying and I don\'t know if I should give her the extra dose.',
        priority: 'High',
        status: 'Pending',
        description: 'Geriatric patient safety breach. Risk of catastrophic fall and medication non-compliance during transition of care.',
        evidence: '82-year-old high-fall-risk outpatient discharged to external environment unaccompanied and lacking medication reconciling.',
        reviewedBy: 'Staff Clinical Auditor'
      },
      {
        rowId: 'PAT-005',
        comment: 'My English is not very good. During my oncology visit, there was no interpreter available. The doctor spoke very fast and handed me a consent form to sign. I signed it but I did not understand what treatment I was agreeing to. I am very anxious.',
        priority: 'Critical',
        status: 'Pending',
        description: 'Title VI Civil Rights violation and invalid informed consent for oncology chemotherapy.',
        evidence: 'Certified medical interpreter unavailable; non-English-speaking patient coerced to sign clinical consent without comprehension.',
        reviewedBy: 'Compliance Director'
      }
    ]);
  };

  // Clear dataset
  const handleClearData = () => {
    setUploadedData([]);
    setInsightReports({});
    setMonitoringReports({});
    setTriageReports({});
    setDecisionSupportReports({});
    setCommunicationQualityReports({});
    setHumanReviews([]);
  };

  // Toggle single agent
  const handleToggleAgent = (id: AgentId) => {
    setSelectedAgents(prev => ({
      ...prev,
      [id]: !prev[id]
    }));
  };

  // Launch pipeline simulated analysis across all activated agents
  const handleStartAnalysis = () => {
    // Transition screen
    setActiveScreen('live');

    // Reset status and progress
    const nextStatuses = { ...agentStatuses };
    const nextProgress = { ...agentProgress };
    const nextActivities: SharedActivity[] = [];

    (Object.keys(selectedAgents) as AgentId[]).forEach(id => {
      if (selectedAgents[id]) {
        nextStatuses[id] = 'Processing';
        nextProgress[id] = 0;
        nextActivities.push({
          id: `act-${Date.now()}-${id}`,
          agentId: id,
          currentStep: 'Initializing system sequence & parameters...',
          timestamp: new Date().toLocaleTimeString()
        });
      } else {
        nextStatuses[id] = 'Idle';
        nextProgress[id] = 0;
      }
    });

    setAgentStatuses(nextStatuses);
    setAgentProgress(nextProgress);
    setActivities(nextActivities);

    // Clear previous simulation if any
    if (intervalRef.current) clearInterval(intervalRef.current);

    // Start live interval
    intervalRef.current = setInterval(() => {
      setAgentProgress(prevProgress => {
        const updatedProgress = { ...prevProgress };
        let allDone = true;

        (Object.keys(selectedAgents) as AgentId[]).forEach(id => {
          if (selectedAgents[id] && updatedProgress[id] < 100) {
            allDone = false;
            // Increments progress
            const increment = Math.floor(Math.random() * 8) + 4;
            const newProg = Math.min(100, updatedProgress[id] + increment);
            updatedProgress[id] = newProg;

            // Generate agent-specific task step descriptions matching the exact prompts
            let step = 'Analyzing core qualitative parameters...';
            if (id === 'insight') {
              if (newProg < 25) step = 'Step 1: Classifying primary themes (Communication, Wait Time, Billing)...';
              else if (newProg < 50) step = 'Step 2 & 3: Computing sentiments and clinical reasoning...';
              else if (newProg < 75) step = 'Step 4 & 5: Identifying operational bottlenecks and bias concerns...';
              else if (newProg < 100) step = 'Step 6: Formulating managerial recommendations...';
              else step = 'Interactive insight dashboard synchronized!';
            } else if (id === 'monitoring') {
              if (newProg < 25) step = 'Step 1: Multi-level primary & secondary theme classification...';
              else if (newProg < 50) step = 'Step 2 & 3: Reviewing vulnerable cohorts (older adults, rural, LEP)...';
              else if (newProg < 75) step = 'Step 4: Assessing organizational risk (Low, Moderate, High)...';
              else if (newProg < 100) step = 'Step 5: Drafting executive quality summary and recommendations...';
              else step = 'Continuous experience monitoring audit finalized!';
            } else if (id === 'triage') {
              if (newProg < 25) step = 'Step 1: Complaint categorization across 10 grievance domains...';
              else if (newProg < 50) step = 'Step 2: Assigning severity levels 1 (Low) to 4 (Critical)...';
              else if (newProg < 75) step = 'Step 3: Detecting clinical, compliance, and safety risk flags...';
              else if (newProg < 100) step = 'Step 4: Formulating escalation routing to 10 specialized departments...';
              else step = 'Incident triage routing pathways established!';
            } else if (id === 'decision-support') {
              if (newProg < 25) step = 'Task 1: Parsing patient demographics, age groups, service lines & portal usage...';
              else if (newProg < 50) step = 'Task 2: Identifying main operational problems & readmission risks...';
              else if (newProg < 75) step = 'Task 3 & 4: Scoring management priority & evaluating AI Risk Flags...';
              else if (newProg < 100) step = 'Task 5: Synthesizing top management alerts and bottom action items...';
              else step = 'Decision support intelligence canvas synchronized!';
            } else if (id === 'analytics') {
              if (newProg < 25) step = 'Section 1 & 2: Aggregating KPI overview and satisfaction distributions...';
              else if (newProg < 50) step = 'Section 3: Conducting NLP keyword analysis and theme distribution...';
              else if (newProg < 75) step = 'Section 4 & 5: Uncovering hidden bottlenecks and AI risk traps...';
              else if (newProg < 100) step = 'Section 6: Formulating top 5 priorities, quick wins & AI opportunities...';
              else step = 'Executive C-Suite analytics compiled!';
            } else if (id === 'communication-evaluator') {
              if (newProg < 25) step = 'Step 1: Identifying communication purpose & care delivery context...';
              else if (newProg < 50) step = 'Step 2: Scoring 8 dimensions (Clarity, Empathy, Actionability, etc.)...';
              else if (newProg < 75) step = 'Step 3 & 5: Health literacy audit (jargon, grade level) & risk assessment...';
              else if (newProg < 100) step = 'Step 6 & 7: Generating 6th-grade rewritten patient communications...';
              else step = 'Communication quality evaluation & rewrites completed!';
            }

            // Append/update activities state
            setActivities(prevAct => {
              const otherActs = prevAct.filter(a => a.agentId !== id);
              return [
                ...otherActs,
                {
                  id: `act-${id}`,
                  agentId: id,
                  currentStep: step,
                  timestamp: new Date().toLocaleTimeString()
                }
              ];
            });

            if (newProg === 100) {
              setAgentStatuses(prevStat => ({
                ...prevStat,
                [id]: 'Completed'
              }));
            }
          }
        });

        if (allDone) {
          if (intervalRef.current) clearInterval(intervalRef.current);
          
          // Generate final analytical data dynamically from actual loaded rows!
          const activeRows = uploadedData.length > 0 ? uploadedData : DEFAULT_PATIENT_COMMENTS;
          const compiled = generateDynamicReports(activeRows);
          
          setInsightReports(compiled.insights);
          setMonitoringReports(compiled.monitoring);
          setTriageReports(compiled.triage);
          setDecisionSupportReports(compiled.decisionSupport);
          setCommunicationQualityReports(compiled.communicationQuality);
          setAnalyticsReport(compiled.analytics);

          // Populate pending human reviews based on generated triage alerts and decision support triggers
          const reviews: HumanReviewDecision[] = [];
          Object.entries(compiled.triage).forEach(([rowId, rep]) => {
            if (rep.humanReviewStatus === 'Human Review Required' || rep.severityLevel >= 3) {
              const parentRow = activeRows.find(r => r.id === rowId);
              reviews.push({
                rowId,
                comment: parentRow?.comment || '',
                priority: rep.severityLevel === 4 ? 'Critical' : 'High',
                status: 'Pending',
                description: rep.severityJustification,
                evidence: `Reported severe incident: ${rep.category}. Departmental Routing priority configured as ${rep.escalationPriority}.`,
                reviewedBy: 'Staff Clinical Auditor'
              });
            }
          });
          setHumanReviews(reviews);
        }

        return updatedProgress;
      });
    }, 180);
  };

  // Clean up interval on unmount
  useEffect(() => {
    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
    };
  }, []);

  // Cancel running agent
  const handleCancelAgent = (id: AgentId) => {
    setAgentStatuses(prev => ({ ...prev, [id]: 'Idle' }));
    setAgentProgress(prev => ({ ...prev, [id]: 0 }));
  };

  // Rerun single agent
  const handleRerunAgent = (id: AgentId) => {
    setAgentStatuses(prev => ({ ...prev, [id]: 'Processing' }));
    setAgentProgress(prev => ({ ...prev, [id]: 0 }));
    let prog = 0;
    const rerunInterval = setInterval(() => {
      prog += 10;
      setAgentProgress(prev => ({ ...prev, [id]: Math.min(100, prog) }));
      if (prog >= 100) {
        clearInterval(rerunInterval);
        setAgentStatuses(prev => ({ ...prev, [id]: 'Completed' }));
      }
    }, 120);
  };

  // Human Review Decisions Actions
  const handleApproveReview = (rowId: string) => {
    setHumanReviews(prev => prev.map(r => r.rowId === rowId ? { ...r, status: 'Approved', reviewedBy: 'Medical Director Dr. Carter' } : r));
  };

  const handleRejectReview = (rowId: string) => {
    setHumanReviews(prev => prev.map(r => r.rowId === rowId ? { ...r, status: 'Rejected', reviewedBy: 'Medical Director Dr. Carter' } : r));
  };

  const hasData = uploadedData.length > 0;

  const currentScreenId = 
    activeScreen === 'landing' ? 'office' :
    activeScreen === 'upload' ? 'upload' :
    activeScreen === 'config' ? 'config' :
    activeScreen === 'live' ? 'processing' :
    activeScreen === 'dashboard' ? 'individual' :
    'executive';

  const handleScreenChange = (screen: any) => {
    const screenMap: any = {
      office: 'landing',
      upload: 'upload',
      config: 'config',
      processing: 'live',
      individual: 'dashboard',
      executive: 'executive',
      'human-review': 'executive'
    };
    setActiveScreen(screenMap[screen]);
  };

  return (
    <div className="flex h-screen bg-[#f8fafc]" id="app-main-layout">
      {/* 1. Global Left Sidebar */}
      <Sidebar 
        currentScreen={currentScreenId as any} 
        onScreenChange={handleScreenChange} 
        selectedCount={Object.values(selectedAgents).filter(Boolean).length}
        hasData={hasData}
        activeProcessingCount={Object.values(agentStatuses).filter(s => s === 'Processing').length}
      />

      {/* Main Panel Side */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* 2. Unified Header */}
        <Header 
          searchTerm="" 
          onSearchChange={() => {}} 
          currentUserEmail="executive.auditor@clinicalhq.org" 
          hasWarnings={humanReviews.some(r => r.status === 'Pending')} 
          onWarningsClick={() => setActiveScreen('executive')} 
          totalComments={uploadedData.length} 
        />

        {/* 3. Screen View Renderer */}
        <main className="flex-1 overflow-y-auto p-8" id="main-content-canvas">
          {activeScreen === 'landing' && (
            <LandingPage 
              agentStatuses={agentStatuses}
              agentProgress={agentProgress}
              selectedAgents={selectedAgents}
              onToggleAgent={handleToggleAgent}
              onEnterAgentWorkspace={() => setActiveScreen('dashboard')}
              activities={activities}
              hasData={hasData}
              onLoadDefaultDataset={handleLoadDefaultDataset}
              onEnterConfig={() => setActiveScreen('config')}
            />
          )}

          {activeScreen === 'upload' && (
            <DataUploadScreen 
              hasData={hasData}
              data={uploadedData}
              onDataLoaded={setUploadedData}
              onClearData={handleClearData}
              onLoadDefaultDataset={handleLoadDefaultDataset}
            />
          )}

          {activeScreen === 'config' && (
            <AgentConfigScreen 
              selectedAgents={selectedAgents}
              onToggleAgent={handleToggleAgent}
              onStartAnalysis={handleStartAnalysis}
              hasData={hasData}
              onLoadDefaultDataset={handleLoadDefaultDataset}
            />
          )}

          {activeScreen === 'live' && (
            <LiveProcessingScreen 
              agentStatuses={agentStatuses}
              agentProgress={agentProgress}
              selectedAgents={selectedAgents}
              activities={activities}
              onCancelAgent={handleCancelAgent}
              onRerunAgent={handleRerunAgent}
              onEnterResults={() => setActiveScreen('dashboard')}
            />
          )}

          {activeScreen === 'dashboard' && (
            <AgentResultsDashboard 
              data={uploadedData.length > 0 ? uploadedData : DEFAULT_PATIENT_COMMENTS}
              insightReports={insightReports}
              monitoringReports={monitoringReports}
              triageReports={triageReports}
              decisionSupportReports={decisionSupportReports}
              communicationQualityReports={communicationQualityReports}
              analyticsReport={analyticsReport}
              onNavigateToExecutive={() => setActiveScreen('executive')}
            />
          )}

          {activeScreen === 'executive' && (
            <CombinedExecutiveDashboard 
              analyticsReport={analyticsReport}
              humanReviews={humanReviews}
              onApproveReview={handleApproveReview}
              onRejectReview={handleRejectReview}
            />
          )}
        </main>
      </div>
    </div>
  );
}
