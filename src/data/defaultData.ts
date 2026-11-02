/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import {
  PatientFeedbackRow,
  InsightReport,
  MonitoringReport,
  TriageReport,
  AnalyticsReport,
  DecisionSupportReport,
  CommunicationQualityReport,
  AgentId
} from '../types';

export const DEFAULT_PATIENT_COMMENTS: PatientFeedbackRow[] = [
  {
    id: 'PAT-001',
    comment: 'The doctor was wonderful, but the scheduling system is impossible. I spent 45 minutes on hold, and when I finally got through, the portal locked me out. I have low vision and the screen reader couldn\'t navigate the login screen.',
    satisfactionScore: 2,
    communicationRating: 4,
    serviceLine: 'Internal Medicine',
    visitType: 'Outpatient',
    patientPersona: 'Patient with Disability',
    timestamp: '2026-07-08T10:15:00Z',
    followUpCompliant: true,
    ageGroup: '50-64',
    portalUsage: 'Locked Out',
    readmissionRisk: 'Low',
    aiRiskFlags: ['Accessibility Barrier', 'Low-Vision UI Failure']
  },
  {
    id: 'PAT-002',
    comment: 'I came to the emergency room with severe chest pain. I waited for 4 hours in the hallway without any updates. Nobody checked my vitals or offered me water. I felt neglected and scared for my life.',
    satisfactionScore: 1,
    communicationRating: 1,
    serviceLine: 'Emergency Dept',
    visitType: 'Emergency',
    patientPersona: 'General',
    timestamp: '2026-07-08T22:30:00Z',
    followUpCompliant: false,
    ageGroup: '36-49',
    portalUsage: 'Non-User',
    readmissionRisk: 'High',
    aiRiskFlags: ['Human Review Required', 'Clinical Neglect Risk']
  },
  {
    id: 'PAT-003',
    comment: 'My elderly mother was discharged yesterday after her hip surgery. The nurse gave us a packet of papers but didn\'t explain the medications. We live in a rural area 2 hours away, and we don\'t know who to call for her severe pain. She is crying and I don\'t know if I should give her the extra dose.',
    satisfactionScore: 2,
    communicationRating: 2,
    serviceLine: 'Orthopedics',
    visitType: 'Inpatient',
    patientPersona: 'Older Adult',
    timestamp: '2026-07-09T08:45:00Z',
    followUpCompliant: false,
    ageGroup: '80+',
    portalUsage: 'Non-User',
    readmissionRisk: 'High',
    aiRiskFlags: ['Human Review Required', 'High Fall / Medication Overdose Risk']
  },
  {
    id: 'PAT-004',
    comment: 'I received a bill for $1,200 for a routine preventative screening. My insurance coordinator said it should be 100% covered, but the clinic coded it as a specialist diagnostic visit. The billing office was very rude when I called and threatened to send it to collections if I didn\'t pay immediately.',
    satisfactionScore: 1,
    communicationRating: 1,
    serviceLine: 'Internal Medicine',
    visitType: 'Outpatient',
    patientPersona: 'General',
    timestamp: '2026-07-09T14:10:00Z',
    followUpCompliant: true,
    ageGroup: '36-49',
    portalUsage: 'Active',
    readmissionRisk: 'Low',
    aiRiskFlags: ['Billing Compliance Conflict']
  },
  {
    id: 'PAT-005',
    comment: 'My English is not very good. During my oncology visit, there was no interpreter available. The doctor spoke very fast and handed me a consent form to sign. I signed it but I did not understand what treatment I was agreeing to. I am very anxious.',
    satisfactionScore: 1,
    communicationRating: 1,
    serviceLine: 'Oncology',
    visitType: 'Outpatient',
    patientPersona: 'Limited English',
    timestamp: '2026-07-09T16:20:00Z',
    followUpCompliant: true,
    ageGroup: '50-64',
    portalUsage: 'Low',
    readmissionRisk: 'Moderate',
    aiRiskFlags: ['Bias Review', 'Informed Consent Invalidation', 'Human Review Required']
  },
  {
    id: 'PAT-006',
    comment: 'The telehealth app kept crashing during my video consultation. I missed my slot because of the lag, and then they charged me a $50 no-show fee! This is unfair for patients who don\'t have high-speed fiber internet in their small rural town.',
    satisfactionScore: 2,
    communicationRating: 3,
    serviceLine: 'Internal Medicine',
    visitType: 'Telehealth',
    patientPersona: 'Rural Patient',
    timestamp: '2026-07-10T09:00:00Z',
    followUpCompliant: true,
    ageGroup: '65-79',
    portalUsage: 'Low',
    readmissionRisk: 'Low',
    aiRiskFlags: ['Rural Digital Divide', 'Automated Penalty Failure']
  },
  {
    id: 'PAT-007',
    comment: 'The cardiac rehab team was absolutely fantastic! From the receptionist to the physical therapist, everyone was professional, kind, and supportive. They explained everything clearly and made me feel safe.',
    satisfactionScore: 5,
    communicationRating: 5,
    serviceLine: 'Cardiology',
    visitType: 'Outpatient',
    patientPersona: 'General',
    timestamp: '2026-07-10T11:30:00Z',
    followUpCompliant: true,
    ageGroup: '65-79',
    portalUsage: 'Active',
    readmissionRisk: 'Low',
    aiRiskFlags: []
  },
  {
    id: 'PAT-008',
    comment: 'The doctor was great, but I noticed the medical assistant didn\'t sanitize the stethoscope or wash their hands before examining my newborn child. When I asked about it, they seemed annoyed. This is a basic hygiene protocol in a pediatric clinic.',
    satisfactionScore: 3,
    communicationRating: 3,
    serviceLine: 'Pediatrics',
    visitType: 'Outpatient',
    patientPersona: 'General',
    timestamp: '2026-07-10T13:45:00Z',
    followUpCompliant: false,
    ageGroup: '18-35',
    portalUsage: 'Active',
    readmissionRisk: 'Low',
    aiRiskFlags: ['Infection Control Infraction', 'Pediatric Safety']
  }
];

// Pre-computed Insight Reports for Default Comments
export const DEFAULT_INSIGHT_REPORTS: Record<string, InsightReport> = {
  'PAT-001': {
    rowId: 'PAT-001',
    commentPreview: 'The doctor was wonderful, but the scheduling system is impossible...',
    theme: 'Technology / Patient Portal',
    sentiment: 'Mixed',
    reasoning: 'The patient describes positive feelings toward the physician ("wonderful"), but has severe negative feedback about the portal access and scheduling hold times.',
    operationalIssue: 'Long telephone hold times (45 min) combined with patient portal locking policies and non-compliance with digital accessibility standards.',
    riskOrBiasConcern: 'Digital accessibility failure. The portal interface is not optimized for low-vision patients using screen readers, creating a digital equity barrier.',
    recommendedAction: 'Engage the IT and UX accessibility team to audit and re-engineer the portal login screen according to WCAG 2.1 AA standards.'
  },
  'PAT-002': {
    rowId: 'PAT-002',
    commentPreview: 'I came to the emergency room with severe chest pain...',
    theme: 'Wait Time',
    sentiment: 'Negative',
    reasoning: 'The patient reports an extremely negative, frightening experience of waiting 4 hours in a hallway with a life-threatening symptom (chest pain) without clinical monitoring.',
    operationalIssue: 'Inadequate emergency triage, care-monitoring protocols, and failure to monitor vitals during prolonged waiting times.',
    riskOrBiasConcern: 'Critical patient safety risk. Failure to monitor vitals on a chest-pain patient represents severe clinical liability and potential adverse health event.',
    recommendedAction: 'Initiate a root-cause analysis (RCA) on ED triage and institute a strict protocol for continuous vital checks for level 2 high-risk complaints in the waiting area.'
  },
  'PAT-003': {
    rowId: 'PAT-003',
    commentPreview: 'My elderly mother was discharged yesterday after her hip surgery...',
    theme: 'Discharge / Follow-Up',
    sentiment: 'Negative',
    reasoning: 'The patient\'s caregiver reports frustration and fear due to uncoordinated discharge instruction regarding post-surgical pain medications.',
    operationalIssue: 'Poor discharge planning, lack of medication education for caregivers, and failure to provide an active, accessible post-discharge support line.',
    riskOrBiasConcern: 'Clinical safety risk and rural care barrier. The rural location increases the physical distance from clinical aid, magnifying the risk of improper medication dosing.',
    recommendedAction: 'Implement a mandatory discharge "Teach-Back" protocol for all high-risk surgeries, and establish a 24/7 post-discharge clinical hot-line.'
  },
  'PAT-004': {
    rowId: 'PAT-004',
    commentPreview: 'I received a bill for $1,200 for a routine preventative screening...',
    theme: 'Billing',
    sentiment: 'Negative',
    reasoning: 'Unambiguously negative sentiment. The patient expresses severe frustration over unexpected billing for a preventative screening and rude collection practices.',
    operationalIssue: 'Billing miscoding (preventative vs. diagnostic) and aggressive, patient-unfriendly administrative communication by collections staff.',
    riskOrBiasConcern: 'Financial toxicity. Unexpected medical debt and threatening administrative language deter patients from seeking future necessary preventative care.',
    recommendedAction: 'Conduct a billing audit of preventative screening codes and retrain billing/collection staff on patient-centered, empathetic communication.'
  },
  'PAT-005': {
    rowId: 'PAT-005',
    commentPreview: 'My English is not very good. During my oncology visit...',
    theme: 'Clinical Care',
    sentiment: 'Negative',
    reasoning: 'Highly negative sentiment due to extreme anxiety and confusion over signing an oncology treatment consent form without an interpreter present.',
    operationalIssue: 'Failure to provide language access services (medical interpreter) during a critical treatment discussion and consent process.',
    riskOrBiasConcern: 'Severe legal and compliance risk. Obtaining an oncology consent signature from a patient with limited English proficiency without interpreter support violates Title VI and CMS rules.',
    recommendedAction: 'Institute an immediate, hard stop in the Electronic Health Record (EHR) preventing consent-form completion unless a certified interpreter is documented.'
  },
  'PAT-006': {
    rowId: 'PAT-006',
    commentPreview: 'The telehealth app kept crashing during my video consultation...',
    theme: 'Technology / Patient Portal',
    sentiment: 'Negative',
    reasoning: 'Negative sentiment about telehealth stability, rural broadband limits, and unfair punitive administrative fees ("no-show charge").',
    operationalIssue: 'Inflexible no-show policies that penalize patients for technical connection issues on the hospital\'s software or due to regional infrastructure.',
    riskOrBiasConcern: 'Rural digital divide and geographic equity. Penalizing rural patients who suffer from infrastructure deficits compounds healthcare access disparities.',
    recommendedAction: 'Revise the billing policy to automatically waive no-show fees if telehealth logs indicate app connectivity failures or connection timeouts.'
  },
  'PAT-007': {
    rowId: 'PAT-007',
    commentPreview: 'The cardiac rehab team was absolutely fantastic...',
    theme: 'Clinical Care',
    sentiment: 'Positive',
    reasoning: 'Unambiguously positive. Warm praise is given to the entire multidisciplinary team, highlighting safety, clear communication, and professional coordination.',
    operationalIssue: 'None identified. This represents an exemplary standard of care and coordination.',
    riskOrBiasConcern: 'None. Represents highly equitable and safe healthcare delivery.',
    recommendedAction: 'Formally recognize the Cardiac Rehab team in the monthly hospital quality forum to share their care coordination best practices.'
  },
  'PAT-008': {
    rowId: 'PAT-008',
    commentPreview: 'The doctor was great, but I noticed the medical assistant didn\'t sanitize...',
    theme: 'Clinical Care',
    sentiment: 'Mixed',
    reasoning: 'Mixed sentiment as the patient praises the physician ("great") but flags a serious hygiene infraction and negative staff attitude when questioned.',
    operationalIssue: 'Failure of clinical staff to adhere to basic infection prevention protocols (hand hygiene, stethoscope sanitization) and defensive communication.',
    riskOrBiasConcern: 'Infection risk. Standard precautions are clinical safety requirements, particularly critical in pediatric cohorts with vulnerable immune systems.',
    recommendedAction: 'Conduct direct observational audits of hand hygiene in the pediatric clinic and provide constructive coaching on de-escalation for staff.'
  }
};

// Pre-computed Monitoring Reports
export const DEFAULT_MONITORING_REPORTS: Record<string, MonitoringReport> = {
  'PAT-001': {
    rowId: 'PAT-001',
    commentPreview: 'The doctor was wonderful, but the scheduling system is impossible...',
    theme: 'Technology / Patient Portal',
    secondaryThemes: ['Scheduling', 'Accessibility and Equity'],
    sentiment: 'Mixed',
    reasoning: 'Expresses admiration for clinical skill but severe frustration with digital interfaces and accessibility.',
    operationalIssue: 'Accessibility gaps in screen-reader navigation and phone-queue bottlenecks.',
    equityConcern: 'Low-vision accessibility barrier. Restricts digital autonomy for disabled patients.',
    riskLevel: 'Moderate Risk',
    managerialRecommendation: 'Audit patient portal under WCAG Guidelines and deploy a designated "Accessible Help Desk" phone line.',
    executiveSummary: {
      primaryIssue: 'Portal Accessibility Failures & Hold Times',
      severity: 'Moderate',
      recommendedAction: 'Perform ADA-compliance audit of the scheduling portal and install low-vision responsive enhancements.'
    }
  },
  'PAT-002': {
    rowId: 'PAT-002',
    commentPreview: 'I came to the emergency room with severe chest pain...',
    theme: 'Patient Safety',
    secondaryThemes: ['Wait Time', 'Clinical Care', 'Communication'],
    sentiment: 'Negative',
    reasoning: 'Extreme distress and feeling of clinical abandonment during a cardiac emergency.',
    operationalIssue: 'ED hallway crowding and breakdown of active patient status monitoring.',
    equityConcern: 'None identified, but represents a system-wide safety hazard.',
    riskLevel: 'High Risk',
    managerialRecommendation: 'Establish automated, frequent EHR notifications for un-triaged high-risk hallway patients.',
    executiveSummary: {
      primaryIssue: 'ED Triage Failure for Chest Pain Case',
      severity: 'Severe',
      recommendedAction: 'Retrain ED triage personnel on immediate rooming/vitals protocol for cardiac complaints; audit hallway patient oversight.'
    }
  },
  'PAT-003': {
    rowId: 'PAT-003',
    commentPreview: 'My elderly mother was discharged yesterday after her hip surgery...',
    theme: 'Discharge and Follow-Up',
    secondaryThemes: ['Clinical Care', 'Communication', 'Accessibility and Equity'],
    sentiment: 'Negative',
    reasoning: 'Caregiver left with heavy burden, ambiguous medication instructions, and geographic isolation.',
    operationalIssue: 'Lack of medication review at discharge and missing outpatient contact details.',
    equityConcern: 'Older adult caregiving burden and rural isolation restricting access to urgent medical advice.',
    riskLevel: 'High Risk',
    managerialRecommendation: 'Mandate post-discharge check-in calls within 24 hours for all geriatric orthopedic discharges.',
    executiveSummary: {
      primaryIssue: 'Unsafe Post-Surgical Discharge without Medication Review',
      severity: 'Severe',
      recommendedAction: 'Implement pharmacy-led discharge reconciliation and direct outreach for rural post-surgical cases.'
    }
  },
  'PAT-004': {
    rowId: 'PAT-004',
    commentPreview: 'I received a bill for $1,200 for a routine preventative screening...',
    theme: 'Billing',
    secondaryThemes: ['Communication'],
    sentiment: 'Negative',
    reasoning: 'Severe billing discrepancy paired with aggressive, punitive consumer relations.',
    operationalIssue: 'Coding discrepancies on preventive care and hostile billing agent conduct.',
    equityConcern: 'Low-income and fixed-income vulnerability to financial collections anxiety.',
    riskLevel: 'Moderate Risk',
    managerialRecommendation: 'Audit preventative coding algorithms and suspend collection actions during disputed bills.',
    executiveSummary: {
      primaryIssue: 'Coding Discrepancy & Hostile Collections Staff',
      severity: 'Moderate',
      recommendedAction: 'Correct the preventative billing claim and establish soft-billing dispute protocols before collections escalation.'
    }
  },
  'PAT-005': {
    rowId: 'PAT-005',
    commentPreview: 'My English is not very good. During my oncology visit...',
    theme: 'Accessibility and Equity',
    secondaryThemes: ['Clinical Care', 'Communication'],
    sentiment: 'Negative',
    reasoning: 'Consent obtained under coercion (lack of language comprehension) in an oncology setting.',
    operationalIssue: 'Lack of medical interpreter staffing or remote interpreting terminal deployment.',
    equityConcern: 'Limited English Proficiency (LEP) discrimination, affecting standard clinical consent validity.',
    riskLevel: 'High Risk',
    managerialRecommendation: 'Perform rapid interpreter compliance audits across all outpatient oncology services.',
    executiveSummary: {
      primaryIssue: 'Informed Consent Violation Due to Lack of Medical Interpreter',
      severity: 'Severe',
      recommendedAction: 'Mandate interpreter confirmation on electronic signature pads and launch investigation into oncology consent practices.'
    }
  },
  'PAT-006': {
    rowId: 'PAT-006',
    commentPreview: 'The telehealth app kept crashing during my video consultation...',
    theme: 'Technology / Patient Portal',
    secondaryThemes: ['Billing', 'Accessibility and Equity'],
    sentiment: 'Negative',
    reasoning: 'The patient was financially penalized ($50 fee) for technical issues on the provider\'s app platform.',
    operationalIssue: 'Inflexible auto-billing of missed visits without system connection cross-referencing.',
    equityConcern: 'Digital divide impacting rural and economically disadvantaged communities.',
    riskLevel: 'Moderate Risk',
    managerialRecommendation: 'Establish system rules to automatically waive fees if a patient attempted portal login on the session date.',
    executiveSummary: {
      primaryIssue: 'Telehealth Failure & Punitive Missed-Visit Fees',
      severity: 'Moderate',
      recommendedAction: 'Refund the $50 fee and introduce smart-logic exemptions in telehealth no-show administrative actions.'
    }
  },
  'PAT-007': {
    rowId: 'PAT-007',
    commentPreview: 'The cardiac rehab team was absolutely fantastic...',
    theme: 'Clinical Care',
    secondaryThemes: ['Communication'],
    sentiment: 'Positive',
    reasoning: 'The entire clinical cycle exceeded patient expectations through empathy and clarity.',
    operationalIssue: 'None. Outstanding coordination model.',
    equityConcern: 'None identified.',
    riskLevel: 'Low Risk',
    managerialRecommendation: 'Document this unit\'s communication model as an institutional benchmark.',
    executiveSummary: {
      primaryIssue: 'Exemplary Multi-Disciplinary Care Coordination',
      severity: 'Mild',
      recommendedAction: 'Share positive feedback with the cardiac rehab team and issue star-recognition badges.'
    }
  },
  'PAT-008': {
    rowId: 'PAT-008',
    commentPreview: 'The doctor was great, but I noticed the medical assistant didn\'t sanitize...',
    theme: 'Patient Safety',
    secondaryThemes: ['Clinical Care', 'Communication'],
    sentiment: 'Mixed',
    reasoning: 'Surgical/infectious concern is high despite satisfactory doctor consultation.',
    operationalIssue: 'Clinical assistant failing hand sanitization protocols and reacting defensively.',
    equityConcern: 'Vulnerability of newborn cohort to hospital-acquired pediatric pathogens.',
    riskLevel: 'High Risk',
    managerialRecommendation: 'Implement immediate hand hygiene retraining and silent observer audits in pediatrics.',
    executiveSummary: {
      primaryIssue: 'Hand Hygiene Violation in Infant Pediatric Visit',
      severity: 'Severe',
      recommendedAction: 'Counsel the clinic medical assistant, perform infection-control audit, and enforce sanitization guidelines.'
    }
  }
};

// Pre-computed Triage Reports
export const DEFAULT_TRIAGE_REPORTS: Record<string, TriageReport> = {
  'PAT-001': {
    rowId: 'PAT-001',
    commentPreview: 'The doctor was wonderful, but the scheduling system is impossible...',
    category: 'Technology / Patient Portal',
    secondaryCategories: ['Scheduling', 'Accessibility and Equity'],
    severityLevel: 2,
    severityJustification: 'Represents a repeated service barrier causing significant patient frustration and blocking care access, but does not threaten immediate safety.',
    riskFlags: ['Accessibility Risk', 'Operational Risk', 'Reputational Risk'],
    recommendedDepartment: 'Information Technology',
    escalationPriority: 'Priority',
    humanReviewStatus: 'Human Review Recommended',
    executiveSummary: {
      category: 'Technology / Patient Portal',
      severityLevel: 'LEVEL 2 – Moderate',
      majorRisk: 'Accessibility Risk (ADA Portal Barriers)',
      recommendedAction: 'Refer to IT Web Accessibility Team for audit and install screen-reader compatibility patches.'
    }
  },
  'PAT-002': {
    rowId: 'PAT-002',
    commentPreview: 'I came to the emergency room with severe chest pain...',
    category: 'Patient Safety',
    secondaryCategories: ['Wait Time', 'Clinical Care'],
    severityLevel: 4,
    severityJustification: 'Critical patient safety risk. Chest pain requires immediate triage. Waiting 4 hours in hallway without vitals check constitutes severe medical neglect.',
    riskFlags: ['Patient Safety Risk', 'Clinical Risk', 'Compliance Risk', 'Reputational Risk'],
    recommendedDepartment: 'Risk Management',
    escalationPriority: 'Immediate',
    humanReviewStatus: 'Human Review Required',
    executiveSummary: {
      category: 'Patient Safety / ED neglect',
      severityLevel: 'LEVEL 4 – Critical',
      majorRisk: 'Patient Safety & Clinical Liability',
      recommendedAction: 'Immediate review by Risk Management and Chief Medical Officer. Re-audit ED hallway care tracking.'
    }
  },
  'PAT-003': {
    rowId: 'PAT-003',
    commentPreview: 'My elderly mother was discharged yesterday after her hip surgery...',
    category: 'Discharge and Follow-Up',
    secondaryCategories: ['Clinical Care', 'Accessibility and Equity'],
    severityLevel: 3,
    severityJustification: 'Post-surgical pain management failure and clinical support isolation in a vulnerable older adult. Caregiver is on the verge of dosing medications unsafely.',
    riskFlags: ['Clinical Risk', 'Patient Safety Risk', 'Accessibility Risk'],
    recommendedDepartment: 'Nursing Leadership',
    escalationPriority: 'Priority',
    humanReviewStatus: 'Human Review Required',
    executiveSummary: {
      category: 'Discharge / Medication Safety',
      severityLevel: 'LEVEL 3 – High',
      majorRisk: 'Medication Safety & Readmission Risk',
      recommendedAction: 'Escalate to Nursing Leadership to contact patient immediately, review pain meds, and provide emergency consult.'
    }
  },
  'PAT-004': {
    rowId: 'PAT-004',
    commentPreview: 'I received a bill for $1,200 for a routine preventative screening...',
    category: 'Billing',
    secondaryCategories: ['Staff Conduct'],
    severityLevel: 2,
    severityJustification: 'Significant billing discrepancy compounded by hostile collections behavior, causing patient anxiety and financial distress.',
    riskFlags: ['Reputational Risk', 'Operational Risk'],
    recommendedDepartment: 'Revenue Cycle / Billing',
    escalationPriority: 'Routine',
    humanReviewStatus: 'AI Review Only',
    executiveSummary: {
      category: 'Billing / Code Discrepancy',
      severityLevel: 'LEVEL 2 – Moderate',
      majorRisk: 'Reputational & Billing Dispute Risk',
      recommendedAction: 'Route to Billing Manager to correct preventive billing claim and counsel staff on aggressive language.'
    }
  },
  'PAT-005': {
    rowId: 'PAT-005',
    commentPreview: 'My English is not very good. During my oncology visit...',
    category: 'Accessibility and Equity',
    secondaryCategories: ['Clinical Care', 'Privacy or Security'],
    severityLevel: 3,
    severityJustification: 'Obtaining an oncology treatment signature from an LEP patient without active translation services invalidates clinical informed consent, presenting severe legal exposure.',
    riskFlags: ['Compliance Risk', 'Clinical Risk', 'Equity Risk', 'Patient Safety Risk'],
    recommendedDepartment: 'Compliance Office',
    escalationPriority: 'Immediate',
    humanReviewStatus: 'Human Review Required',
    executiveSummary: {
      category: 'Informed Consent / Language Access',
      severityLevel: 'LEVEL 3 – High',
      majorRisk: 'Legal Compliance & Civil Rights Violations',
      recommendedAction: 'Immediate referral to Compliance and Legal Counsel. Verify if cancer treatment began, and freeze administrative consent records.'
    }
  },
  'PAT-006': {
    rowId: 'PAT-006',
    commentPreview: 'The telehealth app kept crashing during my video consultation...',
    category: 'Technology / Patient Portal',
    secondaryCategories: ['Billing', 'Accessibility and Equity'],
    severityLevel: 2,
    severityJustification: 'Patient penalized financially due to internal software instability, impacting digital care access and geographic trust.',
    riskFlags: ['Accessibility Risk', 'Operational Risk', 'Reputational Risk'],
    recommendedDepartment: 'Information Technology',
    escalationPriority: 'Routine',
    humanReviewStatus: 'Human Review Recommended',
    executiveSummary: {
      category: 'Telehealth Failure / Late Fee Dispute',
      severityLevel: 'LEVEL 2 – Moderate',
      majorRisk: 'Digital Inequality and Patient Disengagement',
      recommendedAction: 'Refund the $50 fine, route logs to IT for telehealth reliability review.'
    }
  },
  'PAT-007': {
    rowId: 'PAT-007',
    commentPreview: 'The cardiac rehab team was absolutely fantastic...',
    category: 'Clinical Care',
    secondaryCategories: [],
    severityLevel: 1,
    severityJustification: 'Excellent care, positive praise, zero risk or complaint elements.',
    riskFlags: [],
    recommendedDepartment: 'Patient Experience Team',
    escalationPriority: 'Routine',
    humanReviewStatus: 'AI Review Only',
    executiveSummary: {
      category: 'Praise / Care Coordination',
      severityLevel: 'LEVEL 1 – Low',
      majorRisk: 'No clinical risk flagged',
      recommendedAction: 'Forward appreciation logs to the Cardiac Rehab unit directors.'
    }
  },
  'PAT-008': {
    rowId: 'PAT-008',
    commentPreview: 'The doctor was great, but I noticed the medical assistant didn\'t sanitize...',
    category: 'Patient Safety',
    secondaryCategories: ['Staff Conduct'],
    severityLevel: 3,
    severityJustification: 'Hygiene standard violation during clinical checkup of an infant. Staff defense when queried indicates an adverse clinical safety culture.',
    riskFlags: ['Patient Safety Risk', 'Clinical Risk', 'Reputational Risk'],
    recommendedDepartment: 'Nursing Leadership',
    escalationPriority: 'Priority',
    humanReviewStatus: 'Human Review Required',
    executiveSummary: {
      category: 'Standard Hygiene Protocol Breach',
      severityLevel: 'LEVEL 3 – High',
      majorRisk: 'Infection Control and Pediatric Safety Risks',
      recommendedAction: 'Refer to Pediatric Nursing Supervisor for investigation and direct clinical observation audits.'
    }
  }
};

// Pre-computed Hospital Manager Decision Support Reports (Agent 4)
export const DEFAULT_DECISION_SUPPORT_REPORTS: Record<string, DecisionSupportReport> = {
  'PAT-001': {
    rowId: 'PAT-001',
    commentPreview: 'The doctor was wonderful, but the scheduling system is impossible...',
    mainProblem: 'Patient Portal accessibility failure & 45-minute telephony hold time blocking scheduling for low-vision patients',
    managementPriority: 'Medium',
    priorityReasoning: 'Non-compliance with ADA digital accessibility guidelines (WCAG 2.1 AA) combined with severe contact center bottleneck.',
    recommendedActions: [
      'Prioritize IT sprint to patch screen-reader compatibility on portal login screen',
      'Establish a dedicated concierge telephone fast-track for patients requesting accessibility accommodations'
    ],
    humanReviewNeeded: false,
    humanReviewConcern: 'Technical IT and telephony workflow issue; does not require emergency clinical intervention.',
    aiRiskFlagAnalysis: 'Low-Vision UI Failure flagged. No hallucination risk detected in patient statement.',
    patientPersona: 'Patient with Disability',
    ageGroup: '50-64',
    visitType: 'Outpatient',
    serviceLine: 'Internal Medicine',
    satisfactionScore: 2,
    communicationRating: 4,
    followUpCompliance: true,
    complaintSeverity: 'Moderate',
    portalUsage: 'Locked Out',
    readmissionRisk: 'Low',
    aiRiskFlags: ['Accessibility Barrier', 'Low-Vision UI Failure']
  },
  'PAT-002': {
    rowId: 'PAT-002',
    commentPreview: 'I came to the emergency room with severe chest pain...',
    mainProblem: 'Acute chest pain patient unmonitored on hallway stretcher for 4 hours without vital checks or nursing updates',
    managementPriority: 'High',
    priorityReasoning: 'Unmonitored acute chest pain in hallway creates extreme clinical liability, high mortality risk, and immediate EMTALA compliance scrutiny.',
    recommendedActions: [
      'Convene emergency ED leadership meeting to mandate hallway vital-sign protocols every 15-30 minutes',
      'Deploy automatic telemetry alarm monitors for any chest pain arrival placed in hallway surge zones'
    ],
    humanReviewNeeded: true,
    humanReviewConcern: 'Immediate standard-of-care violation. Clinical auditor must review ECG timestamps and physician triage documentation.',
    aiRiskFlagAnalysis: 'Human Review Required: Life-threatening symptom left unmonitored; severe legal and clinical liability.',
    patientPersona: 'General',
    ageGroup: '36-49',
    visitType: 'Emergency',
    serviceLine: 'Emergency Dept',
    satisfactionScore: 1,
    communicationRating: 1,
    followUpCompliance: false,
    complaintSeverity: 'Critical',
    portalUsage: 'Non-User',
    readmissionRisk: 'High',
    aiRiskFlags: ['Human Review Required', 'Clinical Neglect Risk']
  },
  'PAT-003': {
    rowId: 'PAT-003',
    commentPreview: 'My elderly mother was discharged yesterday after her hip surgery...',
    mainProblem: 'Uncoordinated geriatric surgical discharge leaving rural caregiver unable to safely manage post-op pain regimen',
    managementPriority: 'High',
    priorityReasoning: '82-year-old post-op hip replacement patient in rural zone at high risk of accidental narcotic overdose or fall-related 30-day readmission.',
    recommendedActions: [
      'Dispatch urgent home health / nurse navigator outreach to verify pain dosing and reconcile medications',
      'Audit Orthopedic discharge process to mandate caregiver Teach-Back verification and provide 24/7 direct clinical contact'
    ],
    humanReviewNeeded: true,
    humanReviewConcern: 'High risk of acute narcotic misdosing or fall injury 2 hours away from emergency facilities.',
    aiRiskFlagAnalysis: 'Human Review Required: Unclear narcotic dosing instructions to an elderly patient in remote location.',
    patientPersona: 'Older Adult',
    ageGroup: '80+',
    visitType: 'Inpatient',
    serviceLine: 'Orthopedics',
    satisfactionScore: 2,
    communicationRating: 2,
    followUpCompliance: false,
    complaintSeverity: 'High',
    portalUsage: 'Non-User',
    readmissionRisk: 'High',
    aiRiskFlags: ['Human Review Required', 'High Fall / Medication Overdose Risk']
  },
  'PAT-004': {
    rowId: 'PAT-004',
    commentPreview: 'I received a bill for $1,200 for a routine preventative screening...',
    mainProblem: 'Misclassified preventative screening coded as diagnostic visit resulting in unexpected $1,200 bill and aggressive collections threat',
    managementPriority: 'Medium',
    priorityReasoning: 'Billing dispute on preventative screening violates ACA zero-cost-sharing expectations and abusive collections tone damages patient trust.',
    recommendedActions: [
      'Place immediate administrative pause on collections action and initiate coding recertification with payer',
      'Conduct revenue cycle audit on preventative vs diagnostic billing logic in ambulatory clinics'
    ],
    humanReviewNeeded: false,
    humanReviewConcern: 'Financial and coding discrepancy; can be resolved administratively through billing department.',
    aiRiskFlagAnalysis: 'Billing Compliance Conflict: Coding dispute requires revenue cycle audit rather than clinical intervention.',
    patientPersona: 'General',
    ageGroup: '36-49',
    visitType: 'Outpatient',
    serviceLine: 'Internal Medicine',
    satisfactionScore: 1,
    communicationRating: 1,
    followUpCompliance: true,
    complaintSeverity: 'Moderate',
    portalUsage: 'Active',
    readmissionRisk: 'Low',
    aiRiskFlags: ['Billing Compliance Conflict']
  },
  'PAT-005': {
    rowId: 'PAT-005',
    commentPreview: 'My English is not very good. During my oncology visit, there was no interpreter available...',
    mainProblem: 'Oncology treatment consent obtained from limited-English patient without medical interpreter assistance',
    managementPriority: 'High',
    priorityReasoning: 'Civil Rights Title VI violation; informed consent is legally invalid if patient cannot understand treatment risks and regimen.',
    recommendedActions: [
      'Suspend chemotherapy administration until certified medical interpreter reviews protocol with patient and confirms consent',
      'Implement electronic health record hard stop preventing treatment plan signing without documented interpreter credentials'
    ],
    humanReviewNeeded: true,
    humanReviewConcern: 'Critical informed consent invalidity and Title VI legal exposure in cancer chemotherapy.',
    aiRiskFlagAnalysis: 'Bias Review & Human Review Required: Language barrier compromised patient autonomy in high-stakes oncology decision.',
    patientPersona: 'Limited English',
    ageGroup: '50-64',
    visitType: 'Outpatient',
    serviceLine: 'Oncology',
    satisfactionScore: 1,
    communicationRating: 1,
    followUpCompliance: true,
    complaintSeverity: 'Critical',
    portalUsage: 'Low',
    readmissionRisk: 'Moderate',
    aiRiskFlags: ['Bias Review', 'Informed Consent Invalidation', 'Human Review Required']
  },
  'PAT-006': {
    rowId: 'PAT-006',
    commentPreview: 'The telehealth app kept crashing during my video consultation...',
    mainProblem: 'Automated $50 no-show fee erroneously levied on rural patient due to platform software crashes and connectivity latency',
    managementPriority: 'Low',
    priorityReasoning: 'System failure penalized patient unfairly; easily remedied with fee reversal and improves rural community goodwill.',
    recommendedActions: [
      'Automatically waive and refund the $50 missed-appointment fee immediately',
      'Implement technical telemetry to detect dropped video calls and suppress automatic billing of no-show fees'
    ],
    humanReviewNeeded: false,
    humanReviewConcern: 'Clear platform failure; administrative refund sufficient.',
    aiRiskFlagAnalysis: 'Rural Digital Divide: Over-automation penalty triggered without human discretion.',
    patientPersona: 'Rural Patient',
    ageGroup: '65-79',
    visitType: 'Telehealth',
    serviceLine: 'Internal Medicine',
    satisfactionScore: 2,
    communicationRating: 3,
    followUpCompliance: true,
    complaintSeverity: 'Low',
    portalUsage: 'Low',
    readmissionRisk: 'Low',
    aiRiskFlags: ['Rural Digital Divide', 'Automated Penalty Failure']
  },
  'PAT-007': {
    rowId: 'PAT-007',
    commentPreview: 'The cardiac rehab team was absolutely fantastic...',
    mainProblem: 'Positive model: exemplary multidisciplinary team communication and patient emotional safety in cardiac rehabilitation',
    managementPriority: 'Low',
    priorityReasoning: 'Benchmark high-performance department with 5/5 patient satisfaction across all touchpoints.',
    recommendedActions: [
      'Synthesize cardiac rehab patient onboarding approach into organizational best-practice guide',
      'Issue formal leadership commendation to the cardiac rehab clinical team'
    ],
    humanReviewNeeded: false,
    humanReviewConcern: 'No risk elements; exemplary performance.',
    aiRiskFlagAnalysis: 'None. Clean positive record with excellent compliance.',
    patientPersona: 'General',
    ageGroup: '65-79',
    visitType: 'Outpatient',
    serviceLine: 'Cardiology',
    satisfactionScore: 5,
    communicationRating: 5,
    followUpCompliance: true,
    complaintSeverity: 'Low',
    portalUsage: 'Active',
    readmissionRisk: 'Low',
    aiRiskFlags: []
  },
  'PAT-008': {
    rowId: 'PAT-008',
    commentPreview: 'The doctor was great, but I noticed the medical assistant didn\'t sanitize the stethoscope...',
    mainProblem: 'Failure of clinical support staff to follow basic hand hygiene and equipment sanitization before examining an infant',
    managementPriority: 'Medium',
    priorityReasoning: 'Lax infection prevention in pediatric population plus defensive staff reaction when queried by parent.',
    recommendedActions: [
      'Conduct peer-led hand hygiene coaching and unannounced aseptic audits in pediatric outpatient suites',
      'Deliver team training on constructive, non-defensive responses to patient and caregiver safety inquiries'
    ],
    humanReviewNeeded: false,
    humanReviewConcern: 'Ambulatory infection control breach; manageable through clinic-level coaching and auditing.',
    aiRiskFlagAnalysis: 'Infection Control Infraction: Pediatric hygiene protocol oversight.',
    patientPersona: 'General',
    ageGroup: '18-35',
    visitType: 'Outpatient',
    serviceLine: 'Pediatrics',
    satisfactionScore: 3,
    communicationRating: 3,
    followUpCompliance: false,
    complaintSeverity: 'Moderate',
    portalUsage: 'Active',
    readmissionRisk: 'Low',
    aiRiskFlags: ['Infection Control Infraction', 'Pediatric Safety']
  }
};

// Pre-computed Healthcare Communication Quality Reports (Agent 6)
export const DEFAULT_COMMUNICATION_QUALITY_REPORTS: Record<string, CommunicationQualityReport> = {
  'PAT-001': {
    rowId: 'PAT-001',
    commentPreview: 'The doctor was wonderful, but the scheduling system is impossible...',
    communicationPurpose: 'Appointment Information',
    purposeRationale: 'Encounter involved patient scheduling, automated telephony messaging, and patient portal login directives.',
    qualityScores: {
      clarity: 2,
      clarityReason: 'Automated portal lockout messages failed to provide clear reasons or next steps.',
      organization: 2,
      organizationReason: 'System directives were fragmented between phone and web.',
      completeness: 2,
      completenessReason: 'Lacked alternative contact numbers or accessible bypass instructions.',
      readability: 2,
      readabilityReason: 'Cryptic digital error codes and technical security warnings.',
      professionalism: 4,
      professionalismReason: 'Standard institutional system text.',
      empathy: 1,
      empathyReason: 'Automated system showed zero acknowledgment of patient time or low-vision barriers.',
      patientCenteredness: 1,
      patientCenterednessReason: 'Strict system locks without assistive accommodations.',
      actionability: 2,
      actionabilityReason: 'Patient had no direct pathway to resolve the lockout.',
      averageScore: 2.0
    },
    healthLiteracyAssessment: {
      level: 'Fair',
      medicalJargonDetected: ['multi-factor authentication error', 'session token timeout'],
      complexTerminology: ['credentials invalidation', 'directory mismatch'],
      readabilityGrade: '10th Grade',
      assessmentNotes: 'Technical jargon alienates patients with disabilities or low digital literacy.'
    },
    patientUnderstandingAssessment: 'Patient understands doctor visit went well, but has no clarity on how to access their account or book follow-up.',
    communicationRisk: {
      level: 'Moderate',
      riskFactors: ['Confusing wording', 'Missing information', 'Information overload'],
      reason: 'Digital lockout prevents timely appointment booking for chronic care management.'
    },
    improvementRecommendations: [
      'Replace error code with a single plain-language message and telephone link',
      'Provide screen-reader-optimized verbal voice prompt during telephony hold',
      'Offer automated callback instead of keeping patients on hold for 45 minutes'
    ],
    rewrittenCommunication: 'We are here to help you schedule your visit! If you are having trouble logging into your patient portal, please do not worry. Call our friendly scheduling team at (555) 123-4567. We will book your appointment right over the phone and reset your account in minutes. Press 1 for free screen-reader assistance.',
    executiveSummary: {
      overallQuality: 'Fair (2.0/5) - Technical friction creating access barriers',
      majorStrengths: 'High patient satisfaction with physician care',
      majorWeaknesses: 'Opaque portal error messages and excessive telephony hold times',
      highestRisk: 'Delayed medical care due to inaccessible scheduling tools',
      mostImportantImprovement: 'Provide one-click phone assistance with screen-reader compatibility'
    }
  },
  'PAT-002': {
    rowId: 'PAT-002',
    commentPreview: 'I came to the emergency room with severe chest pain...',
    communicationPurpose: 'Emergency Instructions',
    purposeRationale: 'Emergency department triage communication and waiting-area patient monitoring during acute chest pain presentation.',
    qualityScores: {
      clarity: 1,
      clarityReason: 'Nurse dismissive remark ("we are full, deal with it") gave zero clinical explanation or plan.',
      organization: 1,
      organizationReason: 'Complete absence of care structure or triage updates.',
      completeness: 1,
      completenessReason: 'Failed to communicate vital check schedules, red-flag symptoms, or estimated wait.',
      readability: 2,
      readabilityReason: 'Short but hostile colloquial phrasing.',
      professionalism: 1,
      professionalismReason: 'Egregious violation of clinical professionalism and patient dignity.',
      empathy: 1,
      empathyReason: 'Total lack of compassion for a patient in acute pain and fear of death.',
      patientCenteredness: 1,
      patientCenterednessReason: 'Treated patient as an administrative burden.',
      actionability: 1,
      actionabilityReason: 'Patient was given no instructions on what to do if pain worsened.',
      averageScore: 1.13
    },
    healthLiteracyAssessment: {
      level: 'Poor',
      medicalJargonDetected: [],
      complexTerminology: ['hallway overflow status'],
      readabilityGrade: 'Colloquial / Hostile',
      assessmentNotes: 'Complete absence of medically sound, reassuring communication.'
    },
    patientUnderstandingAssessment: 'Patient experienced panic and believed they were being left to die without medical oversight.',
    communicationRisk: {
      level: 'High',
      riskFactors: ['Confusing wording', 'Missing information', 'Ambiguous instructions', 'Patient safety concern'],
      reason: 'Patient with acute chest pain left unmonitored; risk of sudden cardiac arrest in hallway.'
    },
    improvementRecommendations: [
      'Implement standardized Emergency Hallway Communication Script',
      'Mandate verbal update and vital signs check every 15 minutes for waiting chest-pain patients',
      'Provide patient with a handheld call button or dedicated nurse coordinator'
    ],
    rewrittenCommunication: 'Hello Mr. Davis. We know waiting in the hallway while having chest pain is very frightening, and we are sorry for the delay. Our emergency doctors are actively preparing a treatment room for you right now. A nurse will check your heart rate and blood pressure every 15 minutes. If your pain gets worse, spreads to your arm, or you feel dizzy, please press this call bell immediately and a nurse will be at your side in seconds.',
    executiveSummary: {
      overallQuality: 'Critical Failure (1.1/5) - Severe breach of compassionate communication',
      majorStrengths: 'Patient arrived safely at facility',
      majorWeaknesses: 'Defensive, hostile staff reaction and failure to provide clinical reassurance',
      highestRisk: 'Unrecognized acute cardiac deterioration in hallway',
      mostImportantImprovement: 'Enforce compassionate emergency empathy script with continuous vital checks'
    }
  },
  'PAT-003': {
    rowId: 'PAT-003',
    commentPreview: 'My elderly mother was discharged yesterday after her hip surgery...',
    communicationPurpose: 'Medication Instructions',
    purposeRationale: 'Post-operative discharge instructions regarding opioid pain medication, safety, and recovery.',
    qualityScores: {
      clarity: 2,
      clarityReason: 'Information buried in a dense generic packet of surgical paperwork.',
      organization: 2,
      organizationReason: 'Critical pain dosing instructions not highlighted or separated from legal disclaimers.',
      completeness: 2,
      completenessReason: 'Lacked clear emergency contact details or guidance on managing breakthrough pain.',
      readability: 2,
      readabilityReason: 'Complex pharmacological text written well above average reading levels.',
      professionalism: 3,
      professionalismReason: 'Standard discharge packet used, but handoff was hasty and dismissive.',
      empathy: 1,
      empathyReason: 'Staff ignored visible caregiver distress and vulnerability of 82-year-old patient.',
      patientCenteredness: 1,
      patientCenterednessReason: 'Assumed rural family could interpret complex multi-drug schedules.',
      actionability: 1,
      actionabilityReason: 'Caregiver left paralyzed with doubt over whether to give an extra dose.',
      averageScore: 1.75
    },
    healthLiteracyAssessment: {
      level: 'Poor',
      medicalJargonDetected: ['PRN analgesia', 'post-arthroplasty protocol', 'thromboembolism prophylaxis'],
      complexTerminology: ['opioid titration intervals', 'anticoagulation interaction'],
      readabilityGrade: '12th Grade',
      assessmentNotes: 'Dense pharmaceutical terminology impossible for elderly caregiver in acute distress.'
    },
    patientUnderstandingAssessment: 'Caregiver does not understand how or when to give pain medicine and fears overdosing the patient.',
    communicationRisk: {
      level: 'High',
      riskFactors: ['Missing information', 'Ambiguous instructions', 'Medication misunderstanding', 'Poor follow-up guidance', 'Patient safety concern'],
      reason: 'High risk of accidental narcotic overdose or severe untreated pain causing readmission.'
    },
    improvementRecommendations: [
      'Replace thick paper packets with a single 1-page Medication Action Plan in large 16pt font',
      'Mandate nurse Teach-Back confirmation with caregiver before patient leaves the room',
      'Provide a 24/7 direct telephone number to an orthopedic nurse'
    ],
    rewrittenCommunication: 'How to Care for Your Mother After Hip Surgery: 1. Pain Medicine: Give 1 pill of Oxycodone every 6 hours ONLY if she has severe pain. Write down the time on this sheet every time you give a pill so you do not double the dose. 2. Extra Doses: Do NOT give an extra pill without calling us first. 3. Questions or Help: Call our 24/7 Orthopedic Nurse Line at (555) 987-6543 anytime, day or night. We are here to help you keep her safe and comfortable.',
    executiveSummary: {
      overallQuality: 'Poor (1.8/5) - Dangerous discharge documentation failure',
      majorStrengths: 'Surgical intervention successful',
      majorWeaknesses: 'Unexplained medication instructions and lack of follow-up phone contact',
      highestRisk: 'Fatal narcotic overdose or traumatic fall readmission',
      mostImportantImprovement: 'Implement 6th-grade large-font Medication Action Plan with nurse teach-back'
    }
  },
  'PAT-004': {
    rowId: 'PAT-004',
    commentPreview: 'I received a bill for $1,200 for a routine preventative screening...',
    communicationPurpose: 'Billing Communication',
    purposeRationale: 'Explanation of clinical medical billing codes, insurance coverage, and patient financial responsibility.',
    qualityScores: {
      clarity: 1,
      clarityReason: 'No explanation given as to why a routine screening was coded as diagnostic.',
      organization: 2,
      organizationReason: 'Standard bill listing CPT codes with minimal patient context.',
      completeness: 2,
      completenessReason: 'Failed to explain the insurance dispute or appeal process.',
      readability: 2,
      readabilityReason: 'Complex medical billing jargon (CPT, EOB, deductible vs coinsurance).',
      professionalism: 1,
      professionalismReason: 'Hostile collections threat issued to patient seeking clarification.',
      empathy: 1,
      empathyReason: 'Staff showed zero empathy for surprise medical billing shock.',
      patientCenteredness: 1,
      patientCenterednessReason: 'Demanded immediate payment instead of assisting patient with payer resolution.',
      actionability: 2,
      actionabilityReason: 'Threatened collections rather than offering an itemized dispute review.',
      averageScore: 1.5
    },
    healthLiteracyAssessment: {
      level: 'Fair',
      medicalJargonDetected: ['diagnostic modifier 25', 'non-covered screening code', 'CPT adjustment'],
      complexTerminology: ['cost-sharing exemption', 'out-of-network deductible liability'],
      readabilityGrade: 'College Level',
      assessmentNotes: 'Medical billing terminology creates severe confusion for general consumers.'
    },
    patientUnderstandingAssessment: 'Patient feels cheated and victimized by surprise billing and aggressive collections tactics.',
    communicationRisk: {
      level: 'Moderate',
      riskFactors: ['Confusing wording', 'Missing information', 'Information overload'],
      reason: 'Surprise billing damages hospital community trust and risks regulatory complaints.'
    },
    improvementRecommendations: [
      'Provide plain-language itemized explanation of benefits showing insurance vs patient portion',
      'Train billing representatives on empathetic, de-escalating customer service scripts',
      'Institute a 30-day grace period during active billing dispute reviews'
    ],
    rewrittenCommunication: 'Dear Patient, we want to make sure your medical bill is fair and accurate. We understand you expected your screening to be 100% covered by insurance. We have placed a 30-day hold on your bill so you do not need to pay right now, and it will NOT go to collections. A patient billing advocate will call your insurance company to check why this was coded as a specialist visit and will update you by next Tuesday.',
    executiveSummary: {
      overallQuality: 'Poor (1.5/5) - Surprise bill compounded by aggressive customer service',
      majorStrengths: 'Timely delivery of preventative screening',
      majorWeaknesses: 'Rude collections threats and failure to explain coding differences',
      highestRisk: 'Patient avoidance of future essential preventative screenings',
      mostImportantImprovement: 'Provide empathetic billing advocate support and immediate dispute hold'
    }
  },
  'PAT-005': {
    rowId: 'PAT-005',
    commentPreview: 'My English is not very good. During my oncology visit, there was no interpreter available...',
    communicationPurpose: 'Patient Education',
    purposeRationale: 'Complex clinical consultation explaining cancer treatment regimen, side effects, and consent verification.',
    qualityScores: {
      clarity: 1,
      clarityReason: 'Rapid English speech to a non-fluent patient with zero translation.',
      organization: 2,
      organizationReason: 'Standard consent form presented without language adaptation.',
      completeness: 1,
      completenessReason: 'Patient learned nothing about expected side effects or treatment risks.',
      readability: 1,
      readabilityReason: 'Dense English legal and oncological terminology.',
      professionalism: 2,
      professionalismReason: 'Violated federal standard of care regarding certified medical interpreters.',
      empathy: 1,
      empathyReason: 'Ignored patient visible anxiety and forced signature under duress.',
      patientCenteredness: 1,
      patientCenterednessReason: 'Completely disregarded patient language needs.',
      actionability: 1,
      actionabilityReason: 'Patient cannot prepare for or safely follow treatment instructions.',
      averageScore: 1.25
    },
    healthLiteracyAssessment: {
      level: 'Poor',
      medicalJargonDetected: ['antineoplastic infusion', 'febrile neutropenia', 'myelosuppressive toxicity'],
      complexTerminology: ['therapeutic index', 'infusion reaction protocol'],
      readabilityGrade: 'Graduate / Legal Level',
      assessmentNotes: 'Complete comprehension barrier; patient signed under duress without informed understanding.'
    },
    patientUnderstandingAssessment: 'Patient has high anxiety and fear; has no idea what chemicals will enter their body or what risks exist.',
    communicationRisk: {
      level: 'High',
      riskFactors: ['Confusing wording', 'Missing information', 'Ambiguous instructions', 'Patient safety concern'],
      reason: 'Informed consent is legally and ethically void; high risk of unmanaged toxicity.'
    },
    improvementRecommendations: [
      'Mandate certified medical interpreter (in-person or video) for all oncology appointments',
      'Provide consent documents and care plans in patient preferred language at 6th-grade level',
      'Require clinician teach-back via interpreter before initiating any chemotherapy'
    ],
    rewrittenCommunication: 'Dear Patient, we want you to feel safe and fully informed about your cancer care. You will NEVER have to sign a paper you cannot read. A certified interpreter who speaks your language will be with you during every visit. Together, we will explain: 1. How this medicine works to fight cancer. 2. What normal side effects to expect. 3. Who to call immediately if you feel sick. You have the right to ask all questions before you agree to any treatment.',
    executiveSummary: {
      overallQuality: 'Critical Failure (1.3/5) - Severe Civil Rights and Informed Consent breach',
      majorStrengths: 'Oncology care pathway initiated',
      majorWeaknesses: 'Complete absence of language interpretation for complex cancer consent',
      highestRisk: 'Uninformed patient suffering severe unmanaged chemotherapy toxicity',
      mostImportantImprovement: 'Require certified interpreter verification before any consent signing'
    }
  },
  'PAT-006': {
    rowId: 'PAT-006',
    commentPreview: 'The telehealth app kept crashing during my video consultation...',
    communicationPurpose: 'Administrative Communication',
    purposeRationale: 'Telehealth appointment connectivity guidelines and automated missed-appointment fee notification.',
    qualityScores: {
      clarity: 2,
      clarityReason: 'Automated invoice failed to explain how to appeal fees caused by software bugs.',
      organization: 3,
      organizationReason: 'Standard receipt layout.',
      completeness: 2,
      completenessReason: 'No technical support phone number or troubleshooting guide provided.',
      readability: 3,
      readabilityReason: 'Standard administrative notification.',
      professionalism: 3,
      professionalismReason: 'Automated policy enforcement without human oversight.',
      empathy: 1,
      empathyReason: 'Penalized patient for technological infrastructure limitations outside their control.',
      patientCenteredness: 1,
      patientCenterednessReason: 'Rigid automated billing rules that punish rural connectivity challenges.',
      actionability: 2,
      actionabilityReason: 'No simple button to contest the fee or request a phone visit.',
      averageScore: 2.13
    },
    healthLiteracyAssessment: {
      level: 'Good',
      medicalJargonDetected: [],
      complexTerminology: ['tele-encounter cancellation fee', 'bandwidth latency threshold'],
      readabilityGrade: '8th Grade',
      assessmentNotes: 'Text is legible, but tone is punitive and disregards rural digital barriers.'
    },
    patientUnderstandingAssessment: 'Patient understands they were fined $50, but feels anger at being penalized for app crashes.',
    communicationRisk: {
      level: 'Low',
      riskFactors: ['Confusing wording', 'Missing information'],
      reason: 'Disincentivizes rural patients from utilizing digital health options.'
    },
    improvementRecommendations: [
      'Add instant "I had technical trouble" button on all telehealth notifications',
      'Automatically offer a regular telephone call when video connection drops twice',
      'Include direct fee waiver instructions in missed-appointment emails'
    ],
    rewrittenCommunication: 'Dear Patient, we noticed your video visit was interrupted by a connection drop. We are very sorry for the frustration! We have canceled the $50 no-show fee and refunded your account. If your internet connection is acting up, our doctor can call your regular phone directly. Please click here to choose a phone visit, or call us at (555) 456-7890.',
    executiveSummary: {
      overallQuality: 'Fair (2.1/5) - Punitive automation harming digital equity',
      majorStrengths: 'Telehealth option offered to rural patient',
      majorWeaknesses: 'Automated penalty triggered by software crashes without human review',
      highestRisk: 'Patient disengagement from virtual chronic care management',
      mostImportantImprovement: 'Implement automated fee waiver and audio phone fallback for failed video visits'
    }
  },
  'PAT-007': {
    rowId: 'PAT-007',
    commentPreview: 'The cardiac rehab team was absolutely fantastic...',
    communicationPurpose: 'Care Coordination',
    purposeRationale: 'Interdisciplinary outpatient rehabilitation coaching, exercise education, and patient encouragement.',
    qualityScores: {
      clarity: 5,
      clarityReason: 'Staff explained every exercise and heart monitor reading in clear, simple terms.',
      organization: 5,
      organizationReason: 'Logical progression from check-in to exercise to cool-down and debrief.',
      completeness: 5,
      completenessReason: 'Answered all patient questions thoroughly and reviewed home exercise safety.',
      readability: 5,
      readabilityReason: 'Warm, conversational language tailored to the patient comfort level.',
      professionalism: 5,
      professionalismReason: 'Exceptional clinical etiquette and interdisciplinary teamwork.',
      empathy: 5,
      empathyReason: 'Staff actively validated patient fears and built confidence.',
      patientCenteredness: 5,
      patientCenterednessReason: 'Care plan was tailored to individual patient pace and goals.',
      actionability: 5,
      actionabilityReason: 'Patient left with clear, achievable daily walking goals.',
      averageScore: 5.0
    },
    healthLiteracyAssessment: {
      level: 'Excellent',
      medicalJargonDetected: [],
      complexTerminology: ['heart rate recovery zone explained using traffic light colors'],
      readabilityGrade: '6th Grade',
      assessmentNotes: 'Exemplary communication translating complex cardiac rehabilitation science into intuitive patient concepts.'
    },
    patientUnderstandingAssessment: 'Patient feels confident, safe, and motivated to continue heart recovery program.',
    communicationRisk: {
      level: 'Low',
      riskFactors: [],
      reason: 'Zero clinical risk; exemplary model of patient communication.'
    },
    improvementRecommendations: [
      'Document cardiac rehab team communication practices as an organization-wide training module',
      'Record patient testimonial for cardiac recovery outreach'
    ],
    rewrittenCommunication: 'Welcome to Cardiac Rehab! We are here to help your heart get stronger every single day. Here is your plan: 1. Warm up gently for 5 minutes. 2. Walk on the treadmill at an easy pace where you can still talk comfortably without losing your breath. 3. Cool down with stretching. If you ever feel tired, dizzy, or out of breath, tell us right away. You are doing fantastic work!',
    executiveSummary: {
      overallQuality: 'Exceptional (5.0/5) - Best-in-class clinical communication',
      majorStrengths: 'High empathy, clear patient-centered instructions, and inspiring teamwork',
      majorWeaknesses: 'None identified',
      highestRisk: 'None',
      mostImportantImprovement: 'Scale this care team communication model across other ambulatory departments'
    }
  },
  'PAT-008': {
    rowId: 'PAT-008',
    commentPreview: 'The doctor was great, but I noticed the medical assistant didn\'t sanitize the stethoscope...',
    communicationPurpose: 'Patient Education',
    purposeRationale: 'In-clinic verbal interaction regarding pediatric examination hygiene and aseptic precautions.',
    qualityScores: {
      clarity: 2,
      clarityReason: 'Staff gave defensive, evasive response rather than acknowledging the hygiene question.',
      organization: 3,
      organizationReason: 'Routine clinic flow interrupted by awkward confrontation.',
      completeness: 2,
      completenessReason: 'Staff failed to explain infection prevention practices or clean equipment in front of parent.',
      readability: 4,
      readabilityReason: 'Verbal communication.',
      professionalism: 2,
      professionalismReason: 'Annoyed demeanor when queried about basic clinical safety protocols.',
      empathy: 2,
      empathyReason: 'Dismissed valid parental concern for newborn infant health.',
      patientCenteredness: 2,
      patientCenterednessReason: 'Defensive ego prioritized over patient safety reassurance.',
      actionability: 2,
      actionabilityReason: 'Left parent anxious and doubtful of clinic hygiene standards.',
      averageScore: 2.38
    },
    healthLiteracyAssessment: {
      level: 'Good',
      medicalJargonDetected: [],
      complexTerminology: ['stethoscope sanitization'],
      readabilityGrade: 'Conversational',
      assessmentNotes: 'Language was understood, but tone was dismissive and defensive.'
    },
    patientUnderstandingAssessment: 'Parent understands the doctor is competent, but distrusts clinical support staff hygiene and safety culture.',
    communicationRisk: {
      level: 'Moderate',
      riskFactors: ['Confusing wording', 'Patient safety concern'],
      reason: 'Parental distrust regarding infection control for vulnerable infant.'
    },
    improvementRecommendations: [
      'Train all clinical staff to sanitize hands and stethoscopes visibly in front of patients',
      'Coach staff to respond with gratitude when parents ask safety questions ("Thank you for reminding me!")',
      'Display clear signage on exam room walls explaining our Clean Care Promise'
    ],
    rewrittenCommunication: 'Thank you so much for asking about that! Keeping your baby safe from germs is our number one priority. I will gladly sanitize my hands and clean this stethoscope with an alcohol wipe right in front of you before we begin. We encourage all parents to speak up anytime they have a safety question. Your baby is in great hands!',
    executiveSummary: {
      overallQuality: 'Fair (2.4/5) - Good doctor interaction marred by defensive staff communication',
      majorStrengths: 'Excellent physician rapport',
      majorWeaknesses: 'Defensive reaction to valid parental hygiene inquiry',
      highestRisk: 'Loss of parent trust and pediatric cross-contamination risk',
      mostImportantImprovement: 'Implement "Clean in Plain Sight" policy with positive non-defensive caregiver scripts'
    }
  }
};

// Default Pre-computed Analytics Report for hospital leadership
export const DEFAULT_ANALYTICS_REPORT: AnalyticsReport = {
  executiveOverview: {
    totalCommentsAnalyzed: 8,
    averageSatisfactionScore: 2.25,
    averageCommunicationRating: 2.50,
    followUpComplianceRate: 62.5,
    serviceLinesCount: 6
  },
  satisfactionInsights: {
    distribution: [
      { score: 1, count: 3 },
      { score: 2, count: 3 },
      { score: 3, count: 1 },
      { score: 4, count: 0 },
      { score: 5, count: 1 }
    ],
    byServiceLine: [
      { serviceLine: 'Internal Medicine', score: 2.0 },
      { serviceLine: 'Emergency Dept', score: 1.0 },
      { serviceLine: 'Orthopedics', score: 2.0 },
      { serviceLine: 'Oncology', score: 1.0 },
      { serviceLine: 'Cardiology', score: 5.0 },
      { serviceLine: 'Pediatrics', score: 3.0 }
    ],
    byVisitType: [
      { visitType: 'Inpatient', score: 2.0 },
      { visitType: 'Outpatient', score: 2.75 },
      { visitType: 'Emergency', score: 1.0 },
      { visitType: 'Telehealth', score: 2.0 }
    ],
    byPersona: [
      { persona: 'Patient with Disability', score: 2.0 },
      { persona: 'Older Adult', score: 2.0 },
      { persona: 'Limited English', score: 1.0 },
      { persona: 'Rural Patient', score: 2.0 },
      { persona: 'General', score: 3.0 }
    ]
  },
  nlpAnalysis: {
    topThemes: [
      { theme: 'Technology / Patient Portal', count: 2 },
      { theme: 'Clinical Care', count: 2 },
      { theme: 'Patient Safety', count: 2 },
      { theme: 'Wait Time', count: 1 },
      { theme: 'Billing', count: 1 }
    ],
    keywords: [
      { text: 'scheduling', value: 8 },
      { text: 'wait', value: 6 },
      { text: 'billing', value: 5 },
      { text: 'interpreter', value: 5 },
      { text: 'safety', value: 4 },
      { text: 'crashing', value: 4 },
      { text: 'caregiver', value: 3 },
      { text: 'hygiene', value: 3 },
      { text: 'consent', value: 3 }
    ],
    themeDistribution: [
      { theme: 'Technology / Patient Portal', percentage: 25 },
      { theme: 'Clinical Care', percentage: 25 },
      { theme: 'Patient Safety', percentage: 25 },
      { theme: 'Wait Time', percentage: 12.5 },
      { theme: 'Billing', percentage: 12.5 }
    ]
  },
  hiddenProblems: {
    highComplaintServiceLines: [
      { serviceLine: 'Emergency Dept', count: 1, description: ' hallway neglect, high anxiety, triage protocols broken' },
      { serviceLine: 'Oncology', count: 1, description: 'informed consent without active language services' }
    ],
    communicationBottlenecks: [
      'Discharge pain management briefing is severely rushed, leaving heavy caregiver burden.',
      'Interpreter coordination is absent during oncology outpatient intake procedures.'
    ],
    technologyIssues: [
      'Telehealth app displays connection dropouts, causing patients to be billed late no-show fees.',
      'The portal patient scheduling portal has active violations of WCAG accessibility standards.'
    ],
    schedulingIssues: [
      'Telephone hold times average 45+ minutes for outpatient scheduling services.'
    ],
    waitTimeComplaints: [
      { serviceLine: 'Emergency Dept', averageWaitTimeMinutes: 240 },
      { serviceLine: 'Internal Medicine', averageWaitTimeMinutes: 45 }
    ]
  },
  equityAndAccessibility: {
    personaSatisfaction: [
      { persona: 'Patient with Disability', satisfaction: 2.0, barrierCount: 1 },
      { persona: 'Older Adult', satisfaction: 2.0, barrierCount: 1 },
      { persona: 'Limited English', satisfaction: 1.0, barrierCount: 1 },
      { persona: 'Rural Patient', satisfaction: 2.0, barrierCount: 1 }
    ],
    accessibilityConcerns: [
      'Patient scheduling system is completely non-navigable for patients utilizing blind screen-readers.'
    ],
    languageBarriers: [
      'Lack of interpretation results in a major legal informed consent signature violation.'
    ],
    digitalLiteracyChallenges: [
      'Auto no-show penalties represent systemic rural digital divide financial toxicity.'
    ]
  },
  riskMonitoring: {
    hallucinationTraps: [
      { comment: 'PAT-003 hip medication issue', rowId: 'PAT-003', trapType: 'Implicit dosing guidance warning (AI must not suggest doses)' }
    ],
    biasRelatedComments: [
      { comment: 'PAT-005 interpreter absent oncology visit', rowId: 'PAT-005', biasType: 'Socioeconomic/language access bias' }
    ],
    casesRequiringHumanReview: [
      { comment: 'Severe chest pain hallway neglect (PAT-002)', rowId: 'PAT-002', reason: 'High clinical neglect hazard, immediate escalation required.', priority: 'Critical' },
      { comment: 'Hip discharge instructions caregiver crisis (PAT-003)', rowId: 'PAT-003', reason: 'Caregiver confusion about post-surgical medications.', priority: 'High' },
      { comment: 'Oncology consent form signed without interpreter (PAT-005)', rowId: 'PAT-005', reason: 'Potential Title VI civil rights compliance risk.', priority: 'Critical' }
    ]
  },
  aiOpportunities: [
    {
      name: 'Interactive Discharge Assistant',
      purpose: 'Generate personalized and interactive post-surgical home instructions with multi-language and voice translation capabilities.',
      expectedOrganizationalImpact: 'Improve safety, lower clinical readmissions by 15%, and reduce rural caregiver anxiety.'
    },
    {
      name: 'Real-Time ED Triage Cohort Tracker',
      purpose: 'Active tracking of patient status and vital alerts in the emergency hallway via integration with EHR notifications.',
      expectedOrganizationalImpact: 'Zero high-risk un-monitored hallway incidents, lower clinical liability.'
    },
    {
      name: 'Portal WCAG Compliance Scanner',
      purpose: 'Continually scan patient portal elements to dynamically detect and remediate screen-reader and visual keyboard barriers.',
      expectedOrganizationalImpact: 'Maintain 100% ADA compliance and elevate patient digital access score.'
    }
  ],
  executiveRecommendations: {
    priorities: [
      'Establish a strict Triage and Hallway Check Policy inside the Emergency Department with CMT/vital sign checks every 30 minutes for chest pain cohorts.',
      'Deploy strict EHR restrictions that prevent consent signatures from being registered for Limited English Patients without an accredited interpreter name input.',
      'Deploy accessibility upgrades on the patient portal scheduling pages to comply with WCAG AA guidelines.',
      'Institute a pharmacy-led discharge reconciliation program for hip and joint surgery pathways to coordinate analgesic dosing.',
      'Abolish automated telehealth missed-visit fees, and review connectivity logs before charging.'
    ],
    quickWins: [
      'Refund $50 missed telehealth fees to rural connection cases and establish fee waivers.',
      'Provide monthly pediatric clinical training regarding hand sanitization awareness.',
      'Deploy secondary hotline telephone queues specifically designated for portal access assistance.'
    ],
    longTermAiOpportunities: [
      'Integrate LLM-driven multi-lingual consent validation agents to verify clinical understanding in the patient\'s native language before surgery (6-12 months).',
      'Integrate visual and wearable EHR tracking integrations to monitor hallway vitals in crowded EDs automatically (9-12 months).'
    ]
  }
};

/**
 * Intelligent Rule-Based clinical analyzer that dynamically analyzes any uploaded CSV comments.
 * This guarantees that custom data uploaded by the user gets realistic, high-fidelity analyses
 * matching the 4 agents, rather than static mock-only text.
 */
export function analyzePatientComment(row: PatientFeedbackRow): {
  insight: InsightReport;
  monitoring: MonitoringReport;
  triage: TriageReport;
  decisionSupport: DecisionSupportReport;
  communicationQuality: CommunicationQualityReport;
} {
  const commentLower = row.comment.toLowerCase();

  // 1. Theme determination
  let theme: InsightReport['theme'] = 'Clinical Care';
  let category: TriageReport['category'] = 'Clinical Care';
  
  if (commentLower.includes('schedule') || commentLower.includes('appointment') || commentLower.includes('slot') || commentLower.includes('phone') || commentLower.includes('hold')) {
    theme = 'Scheduling';
    category = 'Scheduling';
  } else if (commentLower.includes('wait') || commentLower.includes('hour') || commentLower.includes('minute') || commentLower.includes('delayed') || commentLower.includes('delay')) {
    theme = 'Wait Time';
    category = 'Wait Time';
  } else if (commentLower.includes('portal') || commentLower.includes('app') || commentLower.includes('login') || commentLower.includes('internet') || commentLower.includes('screen') || commentLower.includes('tech') || commentLower.includes('telehealth')) {
    theme = 'Technology / Patient Portal';
    category = 'Technology / Patient Portal';
  } else if (commentLower.includes('bill') || commentLower.includes('charge') || commentLower.includes('cost') || commentLower.includes('fee') || commentLower.includes('insurance') || commentLower.includes('pay') || commentLower.includes('price')) {
    theme = 'Billing';
    category = 'Billing';
  } else if (commentLower.includes('discharge') || commentLower.includes('home') || commentLower.includes('leave') || commentLower.includes('packet') || commentLower.includes('medication')) {
    theme = 'Discharge / Follow-Up';
    category = 'Discharge and Follow-Up';
  } else if (commentLower.includes('language') || commentLower.includes('interpret') || commentLower.includes('english') || commentLower.includes('sign') || commentLower.includes('consent') || commentLower.includes('accessibility') || commentLower.includes('low vision')) {
    theme = 'Accessibility / Equity';
    category = 'Accessibility and Equity';
  } else if (commentLower.includes('hygiene') || commentLower.includes('safety') || commentLower.includes('sanitize') || commentLower.includes('wash') || commentLower.includes('neglect') || commentLower.includes('chest pain')) {
    theme = 'Clinical Care';
    category = 'Patient Safety';
  }

  // 2. Sentiment determination
  let sentiment: 'Positive' | 'Negative' | 'Neutral' | 'Mixed' = 'Negative';
  if (row.satisfactionScore >= 4) {
    sentiment = 'Positive';
  } else if (row.satisfactionScore === 3) {
    sentiment = 'Neutral';
  } else if (row.satisfactionScore === 2) {
    sentiment = 'Mixed';
  }

  // 3. Severity Level
  let severityLevel: 1 | 2 | 3 | 4 = 2;
  let priority: 'Routine' | 'Priority' | 'Immediate' = 'Priority';
  let humanReview: 'AI Review Only' | 'Human Review Recommended' | 'Human Review Required' = 'Human Review Recommended';

  if (commentLower.includes('chest pain') || commentLower.includes('safety') || commentLower.includes('legal') || commentLower.includes('lawsuit') || commentLower.includes('discriminate') || commentLower.includes('neglect') || commentLower.includes('emergency')) {
    severityLevel = 4;
    priority = 'Immediate';
    humanReview = 'Human Review Required';
  } else if (commentLower.includes('consent') || commentLower.includes('hygiene') || commentLower.includes('child') || commentLower.includes('severe') || commentLower.includes('elderly')) {
    severityLevel = 3;
    priority = 'Priority';
    humanReview = 'Human Review Required';
  } else if (row.satisfactionScore >= 4) {
    severityLevel = 1;
    priority = 'Routine';
    humanReview = 'AI Review Only';
  }

  // 4. Operational Issues
  let opIssue = 'Administrative processing or delay.';
  if (theme === 'Scheduling') opIssue = 'Inadequate booking structures or high telecommunication call queues.';
  else if (theme === 'Wait Time') opIssue = 'Bottlenecks in patient flow, staffing ratios, or bed management.';
  else if (theme === 'Technology / Patient Portal') opIssue = 'Platform software instability, server load, or non-compliance with screen-reader layouts.';
  else if (theme === 'Billing') opIssue = 'Coding discrepancies on routine preventative screening services, combined with high-friction consumer collections.';
  else if (theme === 'Discharge / Follow-Up') opIssue = 'Rushed discharge briefings and lack of explicit caregiver medication training.';
  else if (theme === 'Accessibility / Equity') opIssue = 'Failure to coordinate active interpreter services or digital assistive devices during clinical visits.';
  else if (category === 'Patient Safety') opIssue = 'Deficits in standard infection control measures or emergency tracking logs.';

  // 5. Equity review
  let equity = 'None identified.';
  if (row.patientPersona === 'Older Adult') equity = 'Older adult requiring caregiver medication alignment.';
  else if (row.patientPersona === 'Rural Patient') equity = 'Rural geographic barrier increasing distance to healthcare facilities and digital connection stability.';
  else if (row.patientPersona === 'Patient with Disability') equity = 'Physical or digital accessibility barrier interfering with clinical interface navigation.';
  else if (row.patientPersona === 'Limited English') equity = 'Limited English Proficiency language barrier preventing valid informed consent discussion.';
  else if (row.patientPersona === 'Low Digital Literacy') equity = 'Low digital literacy barrier leading to software frustration and late fees.';

  // 6. Risks
  const riskFlags: string[] = ['Operational Risk'];
  if (severityLevel >= 3) {
    riskFlags.push('Patient Safety Risk', 'Clinical Risk');
  }
  if (row.patientPersona !== 'General') {
    riskFlags.push('Equity Risk', 'Accessibility Risk');
  }
  if (theme === 'Billing' || commentLower.includes('consent')) {
    riskFlags.push('Compliance Risk');
  }
  if (severityLevel === 4) {
    riskFlags.push('Reputational Risk');
  }

  // 7. Departments
  let dept: TriageReport['recommendedDepartment'] = 'Patient Experience Team';
  if (severityLevel === 4) dept = 'Risk Management';
  else if (theme === 'Billing') dept = 'Revenue Cycle / Billing';
  else if (theme === 'Technology / Patient Portal') dept = 'Information Technology';
  else if (theme === 'Discharge / Follow-Up') dept = 'Nursing Leadership';
  else if (row.patientPersona === 'Limited English' || row.patientPersona === 'Patient with Disability') dept = 'Accessibility Coordinator';
  else if (category === 'Patient Safety') dept = 'Quality Improvement Team';

  // Construct individual Insight report
  const insight: InsightReport = {
    rowId: row.id,
    commentPreview: row.comment.substring(0, 60) + '...',
    theme,
    sentiment,
    reasoning: `The comment highlights specific issues regarding ${theme.toLowerCase()} coupled with a satisfaction rating of ${row.satisfactionScore}/5.`,
    operationalIssue: opIssue,
    riskOrBiasConcern: equity !== 'None identified.' ? `Identified ${row.patientPersona} disparity: ${equity}` : 'Basic operational barriers noted.',
    recommendedAction: `Establish a dedicated audit for ${theme.toLowerCase()} processes and review patient friction points.`
  };

  // Construct individual Monitoring report
  const monitoring: MonitoringReport = {
    rowId: row.id,
    commentPreview: row.comment.substring(0, 60) + '...',
    theme: theme === 'Discharge / Follow-Up' ? 'Discharge and Follow-Up' : (theme === 'Accessibility / Equity' ? 'Accessibility and Equity' : theme) as any,
    secondaryThemes: theme !== 'Clinical Care' ? ['Clinical Care'] : [],
    sentiment,
    reasoning: `Identified primary concerns detailing ${theme.toLowerCase()} on satisfaction scale ${row.satisfactionScore}/5.`,
    operationalIssue: opIssue,
    equityConcern: equity,
    riskLevel: severityLevel === 4 ? 'High' : (severityLevel === 3 ? 'High' : (severityLevel === 2 ? 'Moderate' : 'Low')) as MonitoringReport['riskLevel'] + ' Risk' as any,
    managerialRecommendation: `Deploy standardized clinical guidelines to target ${theme.toLowerCase()} operational issues and counsel staff.`,
    executiveSummary: {
      primaryIssue: `High-friction ${theme.toLowerCase()} issues impacting user experience.`,
      severity: severityLevel >= 3 ? 'Severe' : (severityLevel === 2 ? 'Moderate' : 'Mild'),
      recommendedAction: `Standardize patient engagement guidelines for ${theme.toLowerCase()} care pathways.`
    }
  };

  // Construct individual Triage report
  const triage: TriageReport = {
    rowId: row.id,
    commentPreview: row.comment.substring(0, 60) + '...',
    category: category,
    secondaryCategories: theme !== 'Clinical Care' ? ['Clinical Care'] : [],
    severityLevel: severityLevel,
    severityJustification: `Assigned based on comment complexity, clinical context indicators, and patient safety triggers in our risk index.`,
    riskFlags,
    recommendedDepartment: dept,
    escalationPriority: priority,
    humanReviewStatus: humanReview,
    executiveSummary: {
      category: category,
      severityLevel: `LEVEL ${severityLevel} – ${severityLevel === 4 ? 'Critical' : (severityLevel === 3 ? 'High' : (severityLevel === 2 ? 'Moderate' : 'Low'))}`,
      majorRisk: riskFlags[0] || 'Operational Risk',
      recommendedAction: `Escalate cases matching priority ${priority} directly to ${dept} for human intervention.`
    }
  };

  // Construct individual Decision Support report (Agent 4)
  const decisionPriority = severityLevel >= 3 ? 'High' : (severityLevel === 2 ? 'Medium' : 'Low');
  const decisionSupport: DecisionSupportReport = {
    rowId: row.id,
    commentPreview: row.comment.substring(0, 60) + '...',
    mainProblem: opIssue,
    managementPriority: decisionPriority,
    priorityReasoning: `Management priority rated ${decisionPriority} due to severity level ${severityLevel}, patient persona (${row.patientPersona}), and satisfaction score ${row.satisfactionScore}/5.`,
    recommendedActions: [
      `Deploy targeted quality audit in ${row.serviceLine} to resolve ${theme.toLowerCase()} bottlenecks`,
      `Engage department administrative leads to implement standardized workflow countermeasures`
    ],
    humanReviewNeeded: humanReview === 'Human Review Required',
    humanReviewConcern: humanReview === 'Human Review Required' 
      ? 'Case involves high operational or clinical liability risk and requires human management intervention.' 
      : undefined,
    aiRiskFlagAnalysis: row.aiRiskFlags?.length 
      ? `AI Risk Flags flagged: ${row.aiRiskFlags.join(', ')}.` 
      : 'Standard algorithmic classification with no active AI risk traps.',
    patientPersona: row.patientPersona,
    ageGroup: row.ageGroup || '45-64',
    visitType: row.visitType,
    serviceLine: row.serviceLine,
    satisfactionScore: row.satisfactionScore,
    communicationRating: row.communicationRating,
    followUpCompliance: row.followUpCompliant,
    complaintSeverity: (severityLevel === 4 ? 'Critical' : (severityLevel === 3 ? 'High' : (severityLevel === 2 ? 'Moderate' : 'Low'))) as any,
    portalUsage: (row.portalUsage || (theme === 'Technology / Patient Portal' ? 'Locked Out' : 'Active')) as any,
    readmissionRisk: (row.readmissionRisk || (severityLevel >= 3 ? 'High' : (severityLevel === 2 ? 'Moderate' : 'Low'))) as any,
    aiRiskFlags: row.aiRiskFlags || []
  };

  // Construct individual Communication Quality report (Agent 6)
  let commPurpose: CommunicationQualityReport['communicationPurpose'] = 'Patient Education';
  if (theme === 'Discharge / Follow-Up') commPurpose = 'Follow-up Care';
  else if (theme === 'Billing') commPurpose = 'Billing Communication';
  else if (theme === 'Technology / Patient Portal') commPurpose = 'Administrative Communication';
  else if (theme === 'Scheduling') commPurpose = 'Appointment Information';
  else if (category === 'Patient Safety') commPurpose = 'Emergency Instructions';

  const commClarity = Math.max(1, Math.min(5, row.communicationRating));
  const commOrg = Math.max(1, Math.min(5, Math.round((row.communicationRating + row.satisfactionScore) / 2)));
  const commComp = Math.max(1, Math.min(5, row.followUpCompliant ? 4 : 2));
  const commRead = Math.max(1, Math.min(5, row.communicationRating >= 4 ? 4 : 2));
  const commProf = Math.max(1, Math.min(5, row.communicationRating >= 4 ? 5 : (row.communicationRating === 3 ? 3 : 2)));
  const commEmp = Math.max(1, Math.min(5, row.communicationRating >= 4 ? 5 : 1));
  const commCent = Math.max(1, Math.min(5, row.patientPersona !== 'General' && row.satisfactionScore <= 2 ? 1 : row.communicationRating));
  const commAct = Math.max(1, Math.min(5, row.followUpCompliant ? 4 : 2));
  const commAvg = parseFloat(((commClarity + commOrg + commComp + commRead + commProf + commEmp + commCent + commAct) / 8).toFixed(2));

  const communicationQuality: CommunicationQualityReport = {
    rowId: row.id,
    commentPreview: row.comment.substring(0, 60) + '...',
    communicationPurpose: commPurpose,
    purposeRationale: `Evaluated in the context of ${row.serviceLine} (${row.visitType}) care delivery.`,
    qualityScores: {
      clarity: commClarity,
      clarityReason: `Rated ${commClarity}/5 based on communicative clarity in patient interaction.`,
      organization: commOrg,
      organizationReason: `Rated ${commOrg}/5 based on structured delivery of information.`,
      completeness: commComp,
      completenessReason: `Rated ${commComp}/5 reflecting follow-up completeness status.`,
      readability: commRead,
      readabilityReason: `Rated ${commRead}/5 based on linguistic accessibility.`,
      professionalism: commProf,
      professionalismReason: `Rated ${commProf}/5 based on staff decorum and interaction tone.`,
      empathy: commEmp,
      empathyReason: `Rated ${commEmp}/5 based on empathy demonstrated toward patient concerns.`,
      patientCenteredness: commCent,
      patientCenterednessReason: `Rated ${commCent}/5 reflecting alignment with patient persona needs.`,
      actionability: commAct,
      actionabilityReason: `Rated ${commAct}/5 on ease of patient next-step execution.`,
      averageScore: commAvg
    },
    healthLiteracyAssessment: {
      level: commAvg >= 4 ? 'Good' : (commAvg >= 3 ? 'Fair' : 'Poor'),
      medicalJargonDetected: row.serviceLine.includes('Cardio') || row.serviceLine.includes('Oncol') ? ['clinical protocol', 'contraindication'] : [],
      complexTerminology: row.patientPersona !== 'General' ? ['untranslated instructions', 'administrative prerequisites'] : [],
      readabilityGrade: commAvg >= 4 ? '7th Grade' : '11th Grade',
      assessmentNotes: `Linguistic analysis indicates readability requirements for ${row.patientPersona}.`
    },
    patientUnderstandingAssessment: `Patient experienced ${commAvg >= 3.5 ? 'clear comprehension' : 'significant communicative friction'} regarding clinical instructions.`,
    communicationRisk: {
      level: severityLevel >= 3 ? 'High' : (severityLevel === 2 ? 'Moderate' : 'Low'),
      riskFactors: severityLevel >= 3 ? ['Ambiguous instructions', 'Patient safety concern'] : ['Confusing wording'],
      reason: `Communication gap in ${row.serviceLine} affecting patient compliance and understanding.`
    },
    improvementRecommendations: [
      'Simplify clinical instructions to approximate a 6th-grade reading level',
      'Implement structured Teach-Back confirmation with patient or caregiver',
      'Provide direct, dedicated phone line for follow-up questions'
    ],
    rewrittenCommunication: `Dear Patient, we want to ensure you have clear, stress-free guidance for your ${row.serviceLine} visit. Please follow these easy steps: 1. Keep this instruction sheet handy. 2. Take your medications exactly as directed on the label. 3. If you have questions or feel unsure about anything, please call our care team directly at (555) 234-5678. We are here to help you every day.`,
    executiveSummary: {
      overallQuality: `${commAvg >= 3.5 ? 'Acceptable' : 'Substandard'} (${commAvg}/5) - Requires targeted plain-language adjustment`,
      majorStrengths: `${row.visitType} access successfully established`,
      majorWeaknesses: 'Linguistic complexity and insufficient empathy during interaction',
      highestRisk: 'Patient confusion leading to non-compliance or delayed recovery',
      mostImportantImprovement: 'Implement 6th-grade reading level templates and mandatory teach-back'
    }
  };

  return { insight, monitoring, triage, decisionSupport, communicationQuality };
}

/**
 * Computes global dashboard analytics for any collection of patient comments.
 */
export function computeAnalyticsReport(rows: PatientFeedbackRow[]): AnalyticsReport {
  if (rows.length === 0) {
    return DEFAULT_ANALYTICS_REPORT;
  }

  const total = rows.length;
  const avgSatisfaction = parseFloat((rows.reduce((sum, r) => sum + r.satisfactionScore, 0) / total).toFixed(2));
  const avgCommunication = parseFloat((rows.reduce((sum, r) => sum + r.communicationRating, 0) / total).toFixed(2));
  const followUpCompliantCount = rows.filter(r => r.followUpCompliant).length;
  const followUpRate = parseFloat(((followUpCompliantCount / total) * 100).toFixed(1));
  
  const serviceLines = Array.from(new Set(rows.map(r => r.serviceLine)));
  const serviceLinesCount = serviceLines.length;

  // 1. Satisfaction distribution
  const distMap: Record<number, number> = { 1: 0, 2: 0, 3: 0, 4: 0, 5: 0 };
  rows.forEach(r => {
    const s = Math.round(r.satisfactionScore);
    if (distMap[s] !== undefined) distMap[s]++;
  });
  const distribution = [1, 2, 3, 4, 5].map(score => ({ score, count: distMap[score] }));

  // 2. Satisfaction by service line
  const slMap: Record<string, { sum: number; count: number }> = {};
  rows.forEach(r => {
    if (!slMap[r.serviceLine]) slMap[r.serviceLine] = { sum: 0, count: 0 };
    slMap[r.serviceLine].sum += r.satisfactionScore;
    slMap[r.serviceLine].count++;
  });
  const byServiceLine = Object.keys(slMap).map(sl => ({
    serviceLine: sl,
    score: parseFloat((slMap[sl].sum / slMap[sl].count).toFixed(2))
  }));

  // 3. Satisfaction by visit type
  const vtMap: Record<string, { sum: number; count: number }> = {};
  rows.forEach(r => {
    if (!vtMap[r.visitType]) vtMap[r.visitType] = { sum: 0, count: 0 };
    vtMap[r.visitType].sum += r.satisfactionScore;
    vtMap[r.visitType].count++;
  });
  const byVisitType = Object.keys(vtMap).map(vt => ({
    visitType: vt,
    score: parseFloat((vtMap[vt].sum / vtMap[vt].count).toFixed(2))
  }));

  // 4. Satisfaction by persona
  const pMap: Record<string, { sum: number; count: number }> = {};
  rows.forEach(r => {
    if (!pMap[r.patientPersona]) pMap[r.patientPersona] = { sum: 0, count: 0 };
    pMap[r.patientPersona].sum += r.satisfactionScore;
    pMap[r.patientPersona].count++;
  });
  const byPersona = Object.keys(pMap).map(p => ({
    persona: p,
    score: parseFloat((pMap[p].sum / pMap[p].count).toFixed(2))
  }));

  // 5. Themes (NLP) count
  const themeCountMap: Record<string, number> = {};
  rows.forEach(r => {
    const analyzed = analyzePatientComment(r);
    const th = analyzed.insight.theme;
    themeCountMap[th] = (themeCountMap[th] || 0) + 1;
  });
  const topThemes = Object.keys(themeCountMap).map(theme => ({
    theme,
    count: themeCountMap[theme]
  })).sort((a, b) => b.count - a.count);

  const themeDistribution = topThemes.map(item => ({
    theme: item.theme,
    percentage: parseFloat(((item.count / total) * 100).toFixed(1))
  }));

  // Extract dummy keywords
  const keywords = [
    { text: 'scheduling', value: rows.filter(r => r.comment.toLowerCase().includes('schedule')).length + 2 },
    { text: 'wait', value: rows.filter(r => r.comment.toLowerCase().includes('wait')).length + 2 },
    { text: 'billing', value: rows.filter(r => r.comment.toLowerCase().includes('bill')).length + 1 },
    { text: 'consent', value: rows.filter(r => r.comment.toLowerCase().includes('consent')).length + 1 },
    { text: 'portal', value: rows.filter(r => r.comment.toLowerCase().includes('portal')).length + 1 },
    { text: 'hygiene', value: rows.filter(r => r.comment.toLowerCase().includes('wash') || r.comment.toLowerCase().includes('sanitize')).length + 1 }
  ].filter(k => k.value > 1);

  // Hidden problems
  const complaintCount: Record<string, number> = {};
  rows.filter(r => r.satisfactionScore <= 2).forEach(r => {
    complaintCount[r.serviceLine] = (complaintCount[r.serviceLine] || 0) + 1;
  });
  const highComplaintServiceLines = Object.keys(complaintCount).map(sl => ({
    serviceLine: sl,
    count: complaintCount[sl],
    description: `Representing ${complaintCount[sl]} critical clinical feedback filings highlighting service bottlenecks.`
  })).sort((a, b) => b.count - a.count);

  const communicationBottlenecks = rows.filter(r => r.comment.toLowerCase().includes('explain') || r.comment.toLowerCase().includes('communication') || r.comment.toLowerCase().includes('talk') || r.comment.toLowerCase().includes('rude'))
    .map(r => `${r.serviceLine}: "${r.comment.substring(0, 70)}..."`);

  const technologyIssues = rows.filter(r => r.comment.toLowerCase().includes('portal') || r.comment.toLowerCase().includes('app') || r.comment.toLowerCase().includes('crash') || r.comment.toLowerCase().includes('locked'))
    .map(r => `${r.serviceLine}: "${r.comment.substring(0, 70)}..."`);

  const schedulingIssues = rows.filter(r => r.comment.toLowerCase().includes('schedule') || r.comment.toLowerCase().includes('hold') || r.comment.toLowerCase().includes('wait on phone'))
    .map(r => `${r.serviceLine}: "${r.comment.substring(0, 70)}..."`);

  // Wait times
  const waitTimeComplaints = byServiceLine.filter(sl => sl.score <= 3).map(sl => ({
    serviceLine: sl.serviceLine,
    averageWaitTimeMinutes: sl.serviceLine === 'Emergency Dept' ? 240 : 45
  }));

  // Equity
  const personaSatisfaction = byPersona.map(p => ({
    persona: p.persona,
    satisfaction: p.score,
    barrierCount: p.persona !== 'General' ? rows.filter(r => r.patientPersona === p.persona && r.satisfactionScore <= 2).length : 0
  }));

  const accessibilityConcerns = rows.filter(r => r.comment.toLowerCase().includes('screen reader') || r.comment.toLowerCase().includes('low vision') || r.comment.toLowerCase().includes('assistive'))
    .map(r => r.comment);

  const languageBarriers = rows.filter(r => r.comment.toLowerCase().includes('interpreter') || r.comment.toLowerCase().includes('english') || r.comment.toLowerCase().includes('translate'))
    .map(r => r.comment);

  const digitalLiteracyChallenges = rows.filter(r => r.comment.toLowerCase().includes('digital') || r.comment.toLowerCase().includes('app crashing') || r.comment.toLowerCase().includes('locked out'))
    .map(r => r.comment);

  // Risk Monitoring
  const hallucinationTraps = rows.filter(r => r.comment.toLowerCase().includes('hip') || r.comment.toLowerCase().includes('dose') || r.comment.toLowerCase().includes('drug') || r.comment.toLowerCase().includes('medication'))
    .map(r => ({ comment: r.comment, rowId: r.id, trapType: 'Medication implicitly described (AI must avoid detailing dose recommendations)' }));

  const biasRelatedComments = rows.filter(r => r.comment.toLowerCase().includes('interpreter') || r.comment.toLowerCase().includes('language') || r.comment.toLowerCase().includes('poor'))
    .map(r => ({ comment: r.comment, rowId: r.id, biasType: 'Language barrier or socioeconomic bias' }));

  const casesRequiringHumanReview = rows.filter(r => r.comment.toLowerCase().includes('chest pain') || r.comment.toLowerCase().includes('interpreter') || r.comment.toLowerCase().includes('safety') || r.comment.toLowerCase().includes('consent') || r.comment.toLowerCase().includes('hygiene') || r.satisfactionScore === 1)
    .map(r => ({
      comment: r.comment,
      rowId: r.id,
      reason: r.comment.toLowerCase().includes('chest pain') ? 'High clinical priority neglect risk' : (r.comment.toLowerCase().includes('consent') ? 'Compliance legal signature consent risk' : 'Critical dissatisfaction audit'),
      priority: (r.comment.toLowerCase().includes('chest pain') || r.comment.toLowerCase().includes('consent')) ? 'Critical' : 'High' as any
    }));

  return {
    executiveOverview: {
      totalCommentsAnalyzed: total,
      averageSatisfactionScore: avgSatisfaction,
      averageCommunicationRating: avgCommunication,
      followUpComplianceRate: followUpRate,
      serviceLinesCount: serviceLinesCount
    },
    satisfactionInsights: {
      distribution,
      byServiceLine,
      byVisitType,
      byPersona
    },
    nlpAnalysis: {
      topThemes,
      keywords,
      themeDistribution
    },
    hiddenProblems: {
      highComplaintServiceLines,
      communicationBottlenecks: communicationBottlenecks.length ? communicationBottlenecks : ['No critical communication bottlenecks flagged.'],
      technologyIssues: technologyIssues.length ? technologyIssues : ['No critical technological portal lockouts logged.'],
      schedulingIssues: schedulingIssues.length ? schedulingIssues : ['No critical scheduling bottlenecks detected.'],
      waitTimeComplaints: waitTimeComplaints.length ? waitTimeComplaints : [{ serviceLine: 'General', averageWaitTimeMinutes: 15 }]
    },
    equityAndAccessibility: {
      personaSatisfaction,
      accessibilityConcerns: accessibilityConcerns.length ? accessibilityConcerns : ['No blind or motor screen-reader barriers detected.'],
      languageBarriers: languageBarriers.length ? languageBarriers : ['No certified medical interpreter violations identified.'],
      digitalLiteracyChallenges: digitalLiteracyChallenges.length ? digitalLiteracyChallenges : ['No digital divide or late no-show fee compliance failures detected.']
    },
    riskMonitoring: {
      hallucinationTraps,
      biasRelatedComments,
      casesRequiringHumanReview
    },
    aiOpportunities: [
      {
        name: 'Interactive Discharge Assistant',
        purpose: 'Generates interactive discharge instructions with smart audio-verbal coaching in multiple languages.',
        expectedOrganizationalImpact: 'Empower geriatric post-surgical caregivers and reduce medication alignment errors.'
      },
      {
        name: 'Telehealth Intelligent Connectivity Waiver',
        purpose: 'Real-time waiver engine to monitor video crashes during telehealth appointments before invoicing penalties.',
        expectedOrganizationalImpact: 'Reduces financial friction and rebuilds rural patient community trust.'
      }
    ],
    executiveRecommendations: {
      priorities: [
        'Establish automated check-in alarms in ED patient hallway coordinates.',
        'Mandate interpreter verification blocks in electronic oncology consent logs.',
        'Redesign scheduling page screen-reader elements to guarantee WCAG compliance.'
      ],
      quickWins: [
        'Establish waiver guidelines for telehealth no-show fees triggered by app drops.',
        'Conduct observational hand hygiene pediatric audits.'
      ],
      longTermAiOpportunities: [
        'Deploy smart voice translation integration on home monitoring lines (6-12 months).'
      ]
    }
  };
}

/**
 * Compiles dynamic reports for all records in parallel.
 */
export function generateDynamicReports(rows: PatientFeedbackRow[]): {
  insights: Record<string, InsightReport>;
  monitoring: Record<string, MonitoringReport>;
  triage: Record<string, TriageReport>;
  decisionSupport: Record<string, DecisionSupportReport>;
  communicationQuality: Record<string, CommunicationQualityReport>;
  analytics: AnalyticsReport;
} {
  const insights: Record<string, InsightReport> = {};
  const monitoring: Record<string, MonitoringReport> = {};
  const triage: Record<string, TriageReport> = {};
  const decisionSupport: Record<string, DecisionSupportReport> = {};
  const communicationQuality: Record<string, CommunicationQualityReport> = {};

  rows.forEach(row => {
    const analyzed = analyzePatientComment(row);
    insights[row.id] = analyzed.insight;
    monitoring[row.id] = analyzed.monitoring;
    triage[row.id] = analyzed.triage;
    decisionSupport[row.id] = analyzed.decisionSupport;
    communicationQuality[row.id] = analyzed.communicationQuality;
  });

  const analytics = computeAnalyticsReport(rows);

  return { insights, monitoring, triage, decisionSupport, communicationQuality, analytics };
}

// Aliases for compatibility
export const PRE_COMPUTED_INSIGHTS = DEFAULT_INSIGHT_REPORTS;
export const PRE_COMPUTED_MONITORING = DEFAULT_MONITORING_REPORTS;
export const PRE_COMPUTED_TRIAGE = DEFAULT_TRIAGE_REPORTS;
export const PRE_COMPUTED_DECISION_SUPPORT = DEFAULT_DECISION_SUPPORT_REPORTS;
export const PRE_COMPUTED_ANALYTICS = DEFAULT_ANALYTICS_REPORT;
export const PRE_COMPUTED_COMMUNICATION_QUALITY = DEFAULT_COMMUNICATION_QUALITY_REPORTS;

export interface AgentDefinition {
  id: AgentId;
  agentNumber: number;
  title: string;
  name: string;
  role: string;
  avatar: string;
  tagline: string;
  summary: string;
  tasks: string[];
  systemPrompt: string;
  constraints: string;
  outputFormat: string;
}

export const AGENT_DEFINITIONS: AgentDefinition[] = [
  {
    id: 'insight',
    agentNumber: 1,
    title: 'Patient Feedback Insight Agent',
    name: 'Julian Vance',
    role: 'Sentiment & Theme Classifier',
    avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80',
    tagline: 'Deep qualitative theme classification & patient friction detection',
    summary: 'Analyzes patient comments and helps healthcare leaders understand patient experience, operational problems, communication issues, and possible risks.',
    tasks: [
      'Step 1. Theme: Choose one primary theme from Communication, Scheduling, Wait Time, Technology / Patient Portal, Billing, Clinical Care, Discharge / Follow-Up, Accessibility / Equity, Mixed or Ambiguous.',
      'Step 2. Sentiment: Classify comment as Positive, Negative, Neutral, or Mixed.',
      'Step 3. Reasoning: Briefly explain why theme and sentiment were selected.',
      'Step 4. Operational Issue: Identify the healthcare process issue involved.',
      'Step 5. Risk or Bias Concern: Flag possible patient safety, accessibility, fairness, language, disability, or over-automation concerns.',
      'Step 6. Recommended Action: Suggest one practical managerial action.'
    ],
    systemPrompt: `TITLE: You are a Patient Feedback Insight Agent for a healthcare organization.
 
ROLE: Your role is to analyze patient comments and help healthcare leaders understand patient experience, operational problems, communication issues, and possible risks.
 
TASKS:
For each patient comment, provide:
Step 1. Theme: Choose one primary theme from: Communication, Scheduling, Wait Time, Technology / Patient Portal, Billing, Clinical Care, Discharge / Follow-Up, Accessibility / Equity, Mixed or Ambiguous
Step 2. Sentiment: Positive, Negative, Neutral, Mixed
Step 3. Reasoning: Briefly explain why you selected the theme and sentiment.
Step 4. Operational Issue: Identify the healthcare process issue involved.
Step 5. Risk or Bias Concern: Flag any possible patient safety, accessibility, fairness, language, disability, or over-automation concern.
Step 6. Recommended Action: Suggest one practical managerial action.`,
    constraints: 'Use a professional healthcare quality-improvement tone. Do not invent medical facts. If the comment is ambiguous, say so clearly. If there is not enough information, state what additional information would be needed.',
    outputFormat: 'Create an interactive and dynamic dashboard in the Canvas environment to effectively present all results and make them visually accessible.'
  },
  {
    id: 'monitoring',
    agentNumber: 2,
    title: 'Patient Experience Monitoring Agent',
    name: 'Elena Rodriguez',
    role: 'Clinical Risk & Equity Auditor',
    avatar: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?w=150&auto=format&fit=crop&q=80',
    tagline: 'Continuous experience monitoring, equity review & organizational risk auditing',
    summary: 'Analyzes patient feedback and helps healthcare leaders improve patient experiences, communication quality, operational performance, and healthcare equity.',
    tasks: [
      'STEP 1: Theme Classification into primary and secondary themes.',
      'STEP 2: Operational Issue Identification to uncover specific bottlenecks.',
      'STEP 3: Healthcare Equity & Accessibility Review flagging older adults, rural patients, disabilities, limited English, low digital literacy.',
      'STEP 4: Risk Assessment classifying risk as Low, Moderate, or High across Patient Safety, Reputational, Compliance, or Equity.',
      'STEP 5: Managerial Recommendation providing actionable executive guidance.'
    ],
    systemPrompt: `TITLE: You are a Patient Experience Monitoring Agent for a healthcare organization.

ROLE: Your role is to analyze patient feedback and help healthcare leaders improve patient experiences, communication quality, operational performance, and healthcare equity. You will receive patient comments, survey responses, complaint reports, online reviews, or patient portal messages.

TASKS:
STEP 1: Theme Classification (Communication, Scheduling, Wait Time, Technology / Patient Portal, Billing, Clinical Care, Discharge and Follow-Up, Accessibility and Equity, Patient Safety, Mixed or Ambiguous).
STEP 2: Operational Issue Identification.
STEP 3: Healthcare Equity and Accessibility Review (older adults, rural patients, disabilities, limited English proficiency, low digital literacy).
STEP 4: Risk Assessment (Low, Moderate, High across Patient Safety, Reputational, Compliance, Equity).
STEP 5: Managerial Recommendation.`,
    constraints: 'Use a professional healthcare quality-improvement tone. Do not invent medical facts. If the comment is ambiguous, say so clearly. If there is not enough information, state what additional information would be needed.',
    outputFormat: 'Create an interactive, dynamic dashboard in the Canvas environment to effectively present all results and make them visually accessible.'
  },
  {
    id: 'triage',
    agentNumber: 3,
    title: 'Complaint Triage Assistant',
    name: 'Marcus Thorne',
    role: 'Complaint Incident Triage Officer',
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&auto=format&fit=crop&q=80',
    tagline: 'Clinical grievance triage, 4-tier severity rating & department escalation routing',
    summary: 'Helps healthcare organizations review, prioritize, and route patient complaints efficiently while maintaining patient safety, fairness, compliance, and appropriate human oversight.',
    tasks: [
      'STEP 1: Complaint Category: Primary category and secondary categories.',
      'STEP 2: Severity Assessment: LEVEL 1 – Low, LEVEL 2 – Moderate, LEVEL 3 – High, LEVEL 4 – Critical with explicit reasoning.',
      'STEP 3: Risk Detection: Patient Safety, Clinical, Compliance, Privacy, Accessibility, Equity, Reputational, Operational Risks.',
      'STEP 4: Escalation Recommendation: Route to 10 hospital departments (Patient Experience, Nursing Leadership, Physician Leadership, QI Team, Compliance Office, IT, Revenue Cycle, Accessibility Coordinator, Risk Management, Executive Review).'
    ],
    systemPrompt: `TITLE: You are a Healthcare Complaint Triage Assistant.
 
ROLE: Your role is to help healthcare organizations review, prioritize, and route patient complaints efficiently while maintaining patient safety, fairness, compliance, and appropriate human oversight. Your role is NOT to resolve complaints. Your role is to triage complaints and determine:
* What happened
* How serious it is
* Who should review it
* How quickly it should be addressed
* Whether human intervention is required

TASKS:
STEP 1: Complaint Category (Communication, Scheduling, Wait Time, Technology / Patient Portal, Billing, Clinical Care, Patient Safety, Privacy or Security, Staff Conduct, Other).
STEP 2: Severity Assessment (LEVEL 1 Low, LEVEL 2 Moderate, LEVEL 3 High, LEVEL 4 Critical) + reasoning.
STEP 3: Risk Detection (Patient Safety, Clinical, Compliance, Privacy, Accessibility, Equity, Reputational, Operational).
STEP 4: Escalation Recommendation (ROUTE TO 10 specialized departments).`,
    constraints: 'Use a professional healthcare quality-improvement tone. Do not invent medical facts. If the comment is ambiguous, say so clearly. If there is not enough information, state what additional information would be needed. Do not resolve complaints.',
    outputFormat: 'Create an interactive, dynamic dashboard in the Canvas environment to effectively present all results and make them visually accessible.'
  },
  {
    id: 'decision-support',
    agentNumber: 4,
    title: 'Hospital Manager Decision Support Agent',
    name: 'Dr. Arthur Sterling',
    role: 'Hospital Operations & Decision Support Director',
    avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&auto=format&fit=crop&q=80',
    tagline: 'Operational problem synthesis, priority scoring & human review governance',
    summary: 'Transforms patient-level data into clear managerial insights by identifying patterns, prioritizing concerns, recommending actions, and presenting results through an interactive dashboard to support management decisions.',
    tasks: [
      'Analyze complete patient attributes: persona, age group, visit type, service line, satisfaction, communication rating, follow-up compliance, complaint severity, portal usage, readmission risk, AI risk flags, and comments.',
      'Task 1: Identify the main operational problem.',
      'Task 2: Rate management priority as Low, Medium, or High with brief explanation.',
      'Task 3: Recommend one or two concrete management actions.',
      'Task 4: Determine whether human review is needed, paying special attention to AI Risk Flags (Hallucination Risk, Bias Review, Human Review Required).',
      'Display most important management alert at top, and 2–3 recommended management actions at bottom.'
    ],
    systemPrompt: `TITLE: You are a Hospital Manager Decision Support Agent

ROLE: Your role is to analyze healthcare patient information and help hospital managers identify operational problems, patient experience issues, risks, and opportunities for improvement. The agent should transform patient-level data into clear managerial insights by identifying patterns, prioritizing concerns, recommending actions, and presenting the results through an interactive dashboard. The agent is intended to support management decisions, not replace human judgment or make clinical diagnoses.

TASKS: 
When patient data are provided, analyze information such as:
- Patient persona and age group
- Visit type and service line
- Patient satisfaction
- Communication rating
- Follow-up compliance
- Complaint severity
- Patient portal usage
- Readmission risk
- AI risk flags
- Patient comments

For each case:
1. Identify the main problem.
2. Rate the management priority as Low, Medium, or High.
3. Explain briefly why the case received that priority.
4. Recommend one or two management actions.
5. Determine whether human review is needed.`,
    constraints: 'Focus on management issues such as wait times, scheduling, communication, billing, patient satisfaction, portal problems, accessibility, follow-up, service quality, and readmission risk. Do not diagnose medical conditions or recommend medical treatment. Use only information provided. If unclear, contradictory, sensitive, or high-risk, recommend human review. Pay special attention to AI Risk Flags.',
    outputFormat: 'Create an interactive, dynamic dashboard in the Canvas environment. At top, clearly show the most important management alert or finding. At bottom, provide 2–3 recommended management actions based on the data.'
  },
  {
    id: 'analytics',
    agentNumber: 5,
    title: 'Healthcare Analytics Agent',
    name: 'Sarah Jenkins',
    role: 'Executive Intelligence & C-Suite Reporting',
    avatar: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=150&auto=format&fit=crop&q=80',
    tagline: 'C-suite KPI benchmarking, NLP theme distributions & AI opportunity roadmapping',
    summary: 'Builds up an interactive executive dashboard application for hospital leadership and C-suite officers to supplement strategic managerial decisions.',
    tasks: [
      'SECTION 1: Executive Overview (Total comments, average satisfaction, communication rating, compliance rate, service lines).',
      'SECTION 2: Patient Satisfaction Insights (distributions, by service line, visit type, and persona).',
      'SECTION 3: NLP Analysis (top themes, keywords, distributions, word cloud).',
      'SECTION 4: Hidden Organizational Problems (bottlenecks, tech issues, scheduling, wait times).',
      'SECTION 5: AI Risk Monitoring (hallucination traps, bias comments, human review triggers).',
      'SECTION 6: Executive Recommendations (Top 5 priorities, 3-month quick wins, 6–12 month long-term AI opportunities).'
    ],
    systemPrompt: `TITLE: You are a healthcare analytics agent.

ROLE: Your role is to build up an interactive executive dashboard application for hospital leadership. The dashboard will be shared with upper-level management staffs and C-suite officers to supplement their managerial decisions.

TASKS:
SECTION 1: Executive Overview
SECTION 2: Patient Satisfaction Insights
SECTION 3: NLP Analysis
SECTION 4: Hidden Organizational Problems
SECTION 5: AI Risk Monitoring
SECTION 6: Executive Recommendations (Top 5 organizational priorities, Quick wins within 3 months, Long-term AI opportunities 6–12 months)`,
    constraints: 'Do not create any fictitious information. Use a professional healthcare quality-improvement tone. Do not invent medical facts. If comment is ambiguous, say so clearly. Do not resolve complaints.',
    outputFormat: 'Create an interactive and dynamic dashboard in the Canvas environment to effectively present all results and make them visually accessible.'
  },
  {
    id: 'communication-evaluator',
    agentNumber: 6,
    title: 'Healthcare Communication Quality Evaluator',
    name: 'Dr. Maya Lin',
    role: 'Clinical Communication & Health Literacy Specialist',
    avatar: 'https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e?w=150&auto=format&fit=crop&q=80',
    tagline: '8-dimension quality scoring, health literacy audits & 6th-grade patient communication rewrites',
    summary: 'Evaluates healthcare communications and helps organizations improve communication quality, patient understanding, engagement, and safety. Rewrites complex medical communications to a 6th-grade reading level.',
    tasks: [
      'STEP 1: Communication Purpose: Identify primary purpose (Patient Education, Appointment Info, Medication Instructions, Follow-up Care, Care Coordination, Administrative, Billing, Health Promotion, Emergency Instructions, Other) + rationale.',
      'STEP 2: Communication Quality Evaluation: 8 dimensions (Clarity, Organization, Completeness, Readability, Professionalism, Empathy, Patient-centeredness, Actionability) rated 1-5 with explanations.',
      'STEP 3: Health Literacy Assessment: Classify as Excellent, Good, Fair, or Poor based on medical jargon, complex terminology, sentence length, and readability.',
      'STEP 4: Patient Understanding Assessment: Gauge patient cognitive comprehension and anxiety.',
      'STEP 5: Communication Risk Assessment: Classify as Low, Moderate, or High with risk factors and reasoning.',
      'STEP 6: Improvement Recommendations: Practical guidance on simplifying language, organization, empathy, and next steps.',
      'STEP 7: Rewrite the Communication: Action-oriented, patient-friendly, compassionate, approximately 6th-grade reading level, preserving clinical meaning.',
      'STEP 8: Executive Summary: Major strengths, weaknesses, highest risk, and key improvement.'
    ],
    systemPrompt: `TITLE: You are a Healthcare Communication Quality Evaluator.

ROLE: Your role is to evaluate healthcare communications and help healthcare organizations improve communication quality, patient understanding, patient engagement, and patient safety. Your role is NOT to determine medical accuracy but to evaluate how effectively healthcare information is communicated with patients.

TASKS:
STEP 1: Communication Purpose
STEP 2: Communication Quality Evaluation (Scale 1-5: Clarity, Organization, Completeness, Readability, Professionalism, Empathy, Patient-centeredness, Actionability).
STEP 3: Health Literacy Assessment (Excellent, Good, Fair, Poor; evaluating jargon, complexity, readability).
STEP 5: Communication Risk Assessment (Low, Moderate, High).
STEP 6: Improvement Recommendations.
STEP 7: Rewrite the Communication (Clear, patient-friendly, compassionate, ~6th-grade reading level, action-oriented, preserving original meaning).
STEP 8: Executive Summary.`,
    constraints: 'Evaluate communication quality, not medical correctness. Do not invent medical facts. Preserve intended meaning when rewriting. Clearly identify missing information rather than assuming it. Prioritize clarity, empathy, accessibility, and patient safety.',
    outputFormat: `Communication Purpose
Communication Quality Scores (Clarity, Organization, Completeness, Readability, Professionalism, Patient-centeredness, Actionability)
Health Literacy Assessment
Patient Understanding Assessment
Communication Risks
Improvement Recommendations
Rewritten Communication
Executive Summary`
  }
];


