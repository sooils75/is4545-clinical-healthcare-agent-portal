/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

export type AgentId = 
  | 'insight' 
  | 'monitoring' 
  | 'triage' 
  | 'decision-support' 
  | 'analytics' 
  | 'communication-evaluator';

export type AgentStatus = 'Idle' | 'Selected' | 'Processing' | 'Completed' | 'Error';

export interface PatientFeedbackRow {
  id: string;
  comment: string;
  satisfactionScore: number; // 1-5
  communicationRating: number; // 1-5
  serviceLine: string; // e.g. "Cardiology", "Emergency Dept", "Pediatrics", "Internal Medicine", "Outpatient Surgery"
  visitType: string; // e.g. "Inpatient", "Outpatient", "Telehealth", "Emergency"
  patientPersona: string; // "Older Adult" | "Rural Patient" | "Patient with Disability" | "Limited English" | "Low Digital Literacy" | "General"
  timestamp: string;
  followUpCompliant: boolean;
  ageGroup?: string; // e.g. "18-35", "36-64", "65-79", "80+"
  portalUsage?: 'Active' | 'Low' | 'Non-User' | 'Locked Out';
  readmissionRisk?: 'Low' | 'Moderate' | 'High';
  aiRiskFlags?: string[]; // e.g. ["Hallucination Risk", "Bias Review", "Human Review Required"]
}

// 1. Patient Feedback Insight Output
export interface InsightReport {
  rowId: string;
  commentPreview: string;
  theme: 'Communication' | 'Scheduling' | 'Wait Time' | 'Technology / Patient Portal' | 'Billing' | 'Clinical Care' | 'Discharge / Follow-Up' | 'Accessibility / Equity' | 'Mixed or Ambiguous';
  sentiment: 'Positive' | 'Negative' | 'Neutral' | 'Mixed';
  reasoning: string;
  operationalIssue: string;
  riskOrBiasConcern: string;
  recommendedAction: string;
}

// 2. Patient Experience Monitoring Output
export interface MonitoringReport {
  rowId: string;
  commentPreview: string;
  theme: 'Communication' | 'Scheduling' | 'Wait Time' | 'Technology / Patient Portal' | 'Billing' | 'Clinical Care' | 'Discharge and Follow-Up' | 'Accessibility and Equity' | 'Patient Safety' | 'Mixed or Ambiguous';
  secondaryThemes: string[];
  sentiment: 'Positive' | 'Negative' | 'Neutral' | 'Mixed';
  reasoning: string;
  operationalIssue: string;
  equityConcern: string;
  riskLevel: 'Low' | 'Moderate' | 'High' | 'Low Risk' | 'Moderate Risk' | 'High Risk';
  managerialRecommendation: string;
  executiveSummary: {
    primaryIssue: string;
    severity: 'Mild' | 'Moderate' | 'Severe';
    recommendedAction: string;
  };
}

// 3. Complaint Triage Output
export interface TriageReport {
  rowId: string;
  commentPreview: string;
  category: 'Communication' | 'Scheduling' | 'Wait Time' | 'Technology / Patient Portal' | 'Billing' | 'Clinical Care' | 'Discharge and Follow-Up' | 'Accessibility and Equity' | 'Patient Safety' | 'Privacy or Security' | 'Staff Conduct' | 'Other';
  secondaryCategories: string[];
  severityLevel: 1 | 2 | 3 | 4; // LEVEL 1: Low, LEVEL 2: Moderate, LEVEL 3: High, LEVEL 4: Critical
  severityJustification: string;
  riskFlags: string[]; // Patient Safety Risk, Clinical Risk, Compliance Risk, Privacy Risk, Accessibility Risk, Equity Risk, Reputational Risk, Operational Risk
  recommendedDepartment: 'Patient Experience Team' | 'Nursing Leadership' | 'Physician Leadership' | 'Quality Improvement Team' | 'Compliance Office' | 'Information Technology' | 'Revenue Cycle / Billing' | 'Accessibility Coordinator' | 'Risk Management' | 'Executive Review';
  escalationPriority: 'Routine' | 'Priority' | 'Immediate';
  humanReviewStatus: 'AI Review Only' | 'Human Review Recommended' | 'Human Review Required';
  executiveSummary: {
    category: string;
    severityLevel: string;
    majorRisk: string;
    recommendedAction: string;
  };
}

// 4. Hospital Manager Decision Support Output
export interface DecisionSupportReport {
  rowId: string;
  commentPreview: string;
  mainProblem: string;
  managementPriority: 'Low' | 'Medium' | 'High';
  priorityReasoning: string;
  recommendedActions: string[];
  humanReviewNeeded: boolean;
  humanReviewConcern?: string;
  aiRiskFlagAnalysis?: string;
  patientPersona: string;
  ageGroup: string;
  visitType: string;
  serviceLine: string;
  satisfactionScore: number;
  communicationRating: number;
  followUpCompliance: boolean;
  complaintSeverity: 'Low' | 'Moderate' | 'High' | 'Critical';
  portalUsage: 'Active' | 'Low' | 'Non-User' | 'Locked Out';
  readmissionRisk: 'Low' | 'Moderate' | 'High';
  aiRiskFlags: string[];
}

// 5. Healthcare Analytics Output
export interface AnalyticsReport {
  executiveOverview: {
    totalCommentsAnalyzed: number;
    averageSatisfactionScore: number;
    averageCommunicationRating: number;
    followUpComplianceRate: number; // 0-100 percentage
    serviceLinesCount: number;
  };
  satisfactionInsights: {
    distribution: { score: number; count: number }[];
    byServiceLine: { serviceLine: string; score: number }[];
    byVisitType: { visitType: string; score: number }[];
    byPersona: { persona: string; score: number }[];
  };
  nlpAnalysis: {
    topThemes: { theme: string; count: number }[];
    keywords: { text: string; value: number }[];
    themeDistribution: { theme: string; percentage: number }[];
  };
  hiddenProblems: {
    highComplaintServiceLines: { serviceLine: string; count: number; description: string }[];
    communicationBottlenecks: string[];
    technologyIssues: string[];
    schedulingIssues: string[];
    waitTimeComplaints: { serviceLine: string; averageWaitTimeMinutes: number }[];
  };
  equityAndAccessibility: {
    personaSatisfaction: { persona: string; satisfaction: number; barrierCount: number }[];
    accessibilityConcerns: string[];
    languageBarriers: string[];
    digitalLiteracyChallenges: string[];
  };
  riskMonitoring: {
    hallucinationTraps: { comment: string; rowId: string; trapType: string }[];
    biasRelatedComments: { comment: string; rowId: string; biasType: string }[];
    casesRequiringHumanReview: { comment: string; rowId: string; reason: string; priority: 'High' | 'Critical' }[];
  };
  aiOpportunities: {
    name: string;
    purpose: string;
    impact?: string;
    expectedOrganizationalImpact?: string;
  }[];
  executiveRecommendations: {
    priorities: string[];
    quickWins: string[];
    longTermAiOpportunities: string[];
  };
}

// 6. Healthcare Communication Quality Evaluator Output
export interface CommunicationQualityReport {
  rowId: string;
  commentPreview: string;
  communicationPurpose: 
    | 'Patient Education'
    | 'Appointment Information'
    | 'Medication Instructions'
    | 'Follow-up Care'
    | 'Care Coordination'
    | 'Administrative Communication'
    | 'Billing Communication'
    | 'Health Promotion'
    | 'Emergency Instructions'
    | 'Other';
  purposeRationale: string;
  qualityScores: {
    clarity: number; // 1-5
    clarityReason: string;
    organization: number; // 1-5
    organizationReason: string;
    completeness: number; // 1-5
    completenessReason: string;
    readability: number; // 1-5
    readabilityReason: string;
    professionalism: number; // 1-5
    professionalismReason: string;
    empathy: number; // 1-5
    empathyReason: string;
    patientCenteredness: number; // 1-5
    patientCenterednessReason: string;
    actionability: number; // 1-5
    actionabilityReason: string;
    averageScore: number;
  };
  healthLiteracyAssessment: {
    level: 'Excellent' | 'Good' | 'Fair' | 'Poor';
    medicalJargonDetected: string[];
    complexTerminology: string[];
    readabilityGrade: string; // e.g. "6th Grade", "10th Grade", "College Level"
    assessmentNotes: string;
  };
  patientUnderstandingAssessment: string;
  communicationRisk: {
    level: 'Low' | 'Moderate' | 'High';
    riskFactors: string[];
    reason: string;
  };
  improvementRecommendations: string[];
  rewrittenCommunication: string;
  executiveSummary: {
    overallQuality: string;
    majorStrengths: string;
    majorWeaknesses: string;
    highestRisk: string;
    mostImportantImprovement: string;
  };
}

export interface SharedActivity {
  id?: string;
  agentId: AgentId;
  agentName?: string;
  status?: AgentStatus;
  progress?: number;
  currentStep: string;
  timestamp: string;
}

export interface HumanReviewDecision {
  rowId: string;
  comment: string;
  agentId?: AgentId;
  findingType?: string;
  priority?: 'High' | 'Critical';
  description: string;
  evidence: string;
  status: 'Pending' | 'Approved' | 'Rejected';
  decisionNotes?: string;
  reviewedBy: string;
  reviewedAt?: string;
}
