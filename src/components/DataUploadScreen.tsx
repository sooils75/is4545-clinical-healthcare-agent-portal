/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState, useRef, DragEvent, ChangeEvent } from 'react';
import { 
  Upload, 
  FileText, 
  CheckCircle, 
  AlertTriangle, 
  Trash2, 
  ShieldCheck, 
  Database,
  Info,
  TableProperties
} from 'lucide-react';
import { PatientFeedbackRow } from '../types';

interface DataUploadScreenProps {
  hasData: boolean;
  data: PatientFeedbackRow[];
  onDataLoaded: (rows: PatientFeedbackRow[]) => void;
  onClearData: () => void;
  onLoadDefaultDataset: () => void;
}

export default function DataUploadScreen({
  hasData,
  data,
  onDataLoaded,
  onClearData,
  onLoadDefaultDataset
}: DataUploadScreenProps) {
  const [isDragging, setIsDragging] = useState(false);
  const [parseError, setParseError] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Parse CSV helper
  const handleParseCsv = (text: string) => {
    try {
      const lines = text.split('\n').map(line => line.trim()).filter(line => line.length > 0);
      if (lines.length < 2) {
        throw new Error('CSV must contain a header row and at least one data row.');
      }

      // Read Header Columns
      const headers = lines[0].split(',').map(h => h.trim().replace(/^["']|["']$/g, '').toLowerCase());
      
      // Determine indices
      const commentIdx = headers.findIndex(h => h.includes('comment') || h.includes('feedback') || h.includes('text'));
      const satisfactionIdx = headers.findIndex(h => h.includes('satisfaction') || h.includes('score') || h.includes('rating'));
      const commIdx = headers.findIndex(h => h.includes('comm') || h.includes('talk') || h.includes('clarity'));
      const serviceIdx = headers.findIndex(h => h.includes('service') || h.includes('dept') || h.includes('line') || h.includes('department'));
      const visitIdx = headers.findIndex(h => h.includes('visit') || h.includes('type') || h.includes('cohort'));
      const personaIdx = headers.findIndex(h => h.includes('persona') || h.includes('patient') || h.includes('equity') || h.includes('disability'));

      if (commentIdx === -1) {
        throw new Error('Could not identify a feedback "comment" column in the uploaded CSV header.');
      }

      const rows: PatientFeedbackRow[] = [];

      for (let i = 1; i < lines.length; i++) {
        // Simple comma split handling potential quotes
        const rawCols = lines[i].split(',');
        const cols: string[] = [];
        let insideQuotes = false;
        let currentField = '';

        for (let charIdx = 0; charIdx < lines[i].length; charIdx++) {
          const char = lines[i][charIdx];
          if (char === '"' || char === "'") {
            insideQuotes = !insideQuotes;
          } else if (char === ',' && !insideQuotes) {
            cols.push(currentField.trim());
            currentField = '';
          } else {
            currentField += char;
          }
        }
        cols.push(currentField.trim());

        // Parse fields or substitute sensible defaults
        const cleanComment = cols[commentIdx]?.replace(/^["']|["']$/g, '') || '';
        if (!cleanComment) continue;

        const satisfaction = satisfactionIdx !== -1 ? parseInt(cols[satisfactionIdx]) || 3 : 3;
        const commRating = commIdx !== -1 ? parseInt(cols[commIdx]) || 3 : 3;
        const serviceLine = serviceIdx !== -1 ? cols[serviceIdx]?.replace(/^["']|["']$/g, '') || 'General Practice' : 'General Practice';
        const visitType = visitIdx !== -1 ? cols[visitIdx]?.replace(/^["']|["']$/g, '') || 'Outpatient' : 'Outpatient';
        const patientPersona = personaIdx !== -1 ? cols[personaIdx]?.replace(/^["']|["']$/g, '') || 'General' : 'General';

        rows.push({
          id: `UPL-${100 + i}`,
          comment: cleanComment,
          satisfactionScore: Math.min(5, Math.max(1, satisfaction)),
          communicationRating: Math.min(5, Math.max(1, commRating)),
          serviceLine,
          visitType,
          patientPersona,
          timestamp: new Date().toISOString(),
          followUpCompliant: Math.random() > 0.35 // Simulated baseline compliance flag
        });
      }

      if (rows.length === 0) {
        throw new Error('No valid patient comment rows could be extracted from this file.');
      }

      onDataLoaded(rows);
      setParseError(null);
    } catch (err: any) {
      setParseError(err.message || 'Fatal error parsing file. Please check formatting.');
    }
  };

  // Drag-and-drop actions
  const handleDragOver = (e: DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = () => {
    setIsDragging(false);
  };

  const handleDrop = (e: DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragging(false);
    const file = e.dataTransfer.files[0];
    if (file) {
      readFile(file);
    }
  };

  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      readFile(file);
    }
  };

  const readFile = (file: File) => {
    const reader = new FileReader();
    reader.onload = (event) => {
      const text = event.target?.result as string;
      handleParseCsv(text);
    };
    reader.readAsText(file);
  };

  const triggerFileSelect = () => {
    fileInputRef.current?.click();
  };

  // Analyze quality and potential patient risks in loaded rows
  const getQualityAlerts = () => {
    const alerts: { text: string; type: 'warning' | 'info' | 'privacy' }[] = [];
    
    // Check de-identification safeguards
    const hasNames = data.some(r => /\b(John|Jane|Smith|Mary|David|James|Sarah|Robert|Michael)\b/i.test(r.comment));
    if (hasNames) {
      alerts.push({
        text: 'Potential PII Warning: Identified common human names inside comment texts. Confirm de-identification scrub is complete before proceeding.',
        type: 'privacy'
      });
    }

    const hasLowSatisfaction = data.filter(r => r.satisfactionScore <= 2).length;
    if (hasLowSatisfaction > 0) {
      alerts.push({
        text: `Identified ${hasLowSatisfaction} severe dissatisfaction ratings (score <= 2). Ensure triage agents are activated to route alerts promptly.`,
        type: 'warning'
      });
    }

    const hasAccessibilityDisparities = data.some(r => r.patientPersona !== 'General');
    if (hasAccessibilityDisparities) {
      alerts.push({
        text: 'Demographic Personas Detected: Dataset includes equity groups (rural, low vision, older adults). Ensure Accessibility checking is configured.',
        type: 'info'
      });
    }

    return alerts;
  };

  return (
    <div className="space-y-8" id="data-upload-screen-container">
      {/* Title Header */}
      <div>
        <h2 className="text-xl font-bold text-gray-900 tracking-tight">Qualitative Dataset Ingestion &amp; Schema Audit</h2>
        <p className="text-gray-500 text-xs mt-1">
          Upload and validate clinical patient feedback spreadsheets. Verify detected headers, schemas, and patient data de-identification safety checkpoints before activating clinical AI agents.
        </p>
      </div>

      {/* Main Drag & Drop and Preview Interface */}
      <div className="grid grid-cols-1 xl:grid-cols-3 gap-8">
        
        {/* Left Side: Upload Box & Alerts */}
        <div className="xl:col-span-1 space-y-6">
          <div
            onDragOver={handleDragOver}
            onDragLeave={handleDragLeave}
            onDrop={handleDrop}
            onClick={triggerFileSelect}
            className={`border-2 border-dashed rounded-2xl p-8 flex flex-col items-center justify-center text-center cursor-pointer transition-all duration-150 ${
              isDragging 
                ? 'border-[#0052cc] bg-blue-50/50' 
                : hasData 
                ? 'border-emerald-200 bg-emerald-50/20 hover:bg-emerald-50/40' 
                : 'border-gray-200 bg-gray-50/40 hover:bg-gray-50/80 hover:border-gray-300'
            }`}
            id="drag-drop-zone"
          >
            <input
              type="file"
              ref={fileInputRef}
              onChange={handleFileChange}
              accept=".csv"
              className="hidden"
              id="csv-file-input"
            />
            {hasData ? (
              <div className="space-y-4">
                <div className="w-12 h-12 bg-emerald-100 rounded-full flex items-center justify-center text-emerald-600 mx-auto">
                  <CheckCircle className="w-6 h-6" />
                </div>
                <div>
                  <h4 className="text-sm font-bold text-gray-900">Spreadsheet Audited Successfully</h4>
                  <p className="text-xs text-gray-400 mt-1">{data.length} records parsed securely inside the browser.</p>
                </div>
                <div className="bg-white px-3 py-1.5 rounded-lg border border-emerald-100 text-[10px] font-bold text-emerald-700 flex items-center gap-1.5 w-fit mx-auto shadow-sm">
                  <ShieldCheck className="w-3.5 h-3.5" />
                  Local In-Browser Parsing Secure
                </div>
              </div>
            ) : (
              <div className="space-y-4">
                <div className="w-12 h-12 bg-[#0052cc]/5 rounded-full flex items-center justify-center text-[#0052cc] mx-auto">
                  <Upload className="w-6 h-6" />
                </div>
                <div>
                  <h4 className="text-sm font-bold text-gray-900">Drag &amp; Drop patient CSV here</h4>
                  <p className="text-xs text-gray-400 mt-1">or click to browse local files</p>
                </div>
                <div className="text-[10px] text-gray-400 border border-gray-100 bg-white/80 px-2.5 py-1 rounded-full">
                  Supports standard comma-separated feedback schemas
                </div>
              </div>
            )}
          </div>

          {/* Quick-Load Default Clinical Benchmarks Card */}
          {!hasData && (
            <div className="bg-white border border-gray-100 rounded-2xl p-6 space-y-4 shadow-sm" id="quick-load-card">
              <div className="flex items-start gap-3">
                <Database className="w-5 h-5 text-[#0052cc] mt-0.5" />
                <div>
                  <h4 className="text-xs font-bold text-gray-900">Load Hospital Sample Dataset</h4>
                  <p className="text-[11px] text-gray-500 mt-0.5">
                    Don't have a CSV handy? Populate the workstation immediately with our pre-loaded, clinical sample feedback dataset containing 8 diverse patient personas and wait-time scenarios.
                  </p>
                </div>
              </div>
              <button
                onClick={onLoadDefaultDataset}
                className="w-full bg-[#dae2ff] hover:bg-[#c4d2ff] text-[#003d9b] py-2.5 rounded-xl text-xs font-semibold tracking-wide transition-colors flex items-center justify-center gap-1.5"
                id="btn-load-sample-upload"
              >
                <Database className="w-4 h-4" />
                Inject 8 Verified Sample Records
              </button>
            </div>
          )}

          {/* Errors, Logs, Actions */}
          {parseError && (
            <div className="bg-red-50 border border-red-100 p-4 rounded-2xl flex items-start gap-3 text-xs text-red-700" id="parse-error-panel">
              <AlertTriangle className="w-4 h-4 mt-0.5 text-red-500 shrink-0" />
              <div>
                <span className="font-bold">Parsing Failure</span>
                <p className="mt-1 leading-normal font-mono">{parseError}</p>
              </div>
            </div>
          )}

          {hasData && (
            <div className="bg-white border border-gray-100 rounded-2xl p-5 flex justify-between items-center shadow-sm" id="data-loaded-actions">
              <div className="flex items-center gap-2">
                <FileText className="w-5 h-5 text-[#0052cc]" />
                <div className="text-left">
                  <span className="text-xs font-bold text-gray-900">Active Datasource</span>
                  <p className="text-[10px] text-gray-400 mt-0.5">Checked &amp; compiled</p>
                </div>
              </div>
              <button
                onClick={onClearData}
                className="p-2 text-red-500 hover:bg-red-50 rounded-lg transition-colors border border-red-100/50"
                title="Wipe Local Ingested Rows"
                id="btn-clear-dataset"
              >
                <Trash2 className="w-4 h-4" />
              </button>
            </div>
          )}
        </div>

        {/* Right Side: Data Schema Audit & Privacy Warnings */}
        <div className="xl:col-span-2 space-y-6">
          {/* HIPAA & Privacy Safeguard Callout */}
          <div className="bg-indigo-50/50 border border-indigo-100 p-5 rounded-2xl space-y-3" id="hipaa-privacy-notice">
            <h4 className="text-xs font-bold text-indigo-900 flex items-center gap-2">
              <ShieldCheck className="w-4 h-4 text-indigo-600" />
              Clinical Privacy &amp; De-identification Protocols
            </h4>
            <p className="text-[11px] text-indigo-700 leading-normal">
              <strong>De-identification Notice:</strong> Under standard HIPAA regulations, healthcare quality-improvement tasks must utilize de-identified, synthetic, or strictly authorized clinical cohorts. Do not upload patient names, phone numbers, SSNs, or addresses in comments. All parsing and analytics on this screen run <strong>100% locally in your secure sandbox browser</strong>—no medical records are exported.
            </p>
            <div className="text-[10px] text-indigo-500 bg-white/70 px-3 py-1.5 rounded-lg border border-indigo-100 font-semibold flex items-center gap-1.5 w-fit">
              <Info className="w-3.5 h-3.5 text-indigo-600" />
              Compliance Rule: Diagnostic, legal, or final clinical outcomes require human medical review.
            </div>
          </div>

          {/* Validation Checklist / Schema Detected */}
          {hasData && (
            <div className="bg-white border border-gray-100 rounded-2xl p-6 space-y-4 shadow-sm" id="schema-audit-panel">
              <h4 className="text-xs font-bold text-gray-900 uppercase tracking-wider flex items-center gap-2">
                <TableProperties className="w-4 h-4 text-[#0052cc]" />
                Column Schema &amp; Data Types Audited
              </h4>

              <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 text-xs">
                <div className="bg-gray-50 p-3 rounded-xl border border-gray-100 text-center">
                  <span className="text-[10px] font-bold text-gray-400 block mb-1">RECORD COUNT</span>
                  <span className="font-mono font-bold text-gray-800 text-sm">{data.length} comments</span>
                </div>
                <div className="bg-gray-50 p-3 rounded-xl border border-gray-100 text-center">
                  <span className="text-[10px] font-bold text-gray-400 block mb-1">SATISFACTION SCALE</span>
                  <span className="font-mono font-bold text-gray-800 text-sm">1 - 5 (Integer)</span>
                </div>
                <div className="bg-gray-50 p-3 rounded-xl border border-gray-100 text-center">
                  <span className="text-[10px] font-bold text-gray-400 block mb-1">COMMUNICATION RATIO</span>
                  <span className="font-mono font-bold text-gray-800 text-sm">1 - 5 (Integer)</span>
                </div>
                <div className="bg-gray-50 p-3 rounded-xl border border-gray-100 text-center">
                  <span className="text-[10px] font-bold text-gray-400 block mb-1">SERVICE REPRESENTATION</span>
                  <span className="font-mono font-bold text-gray-800 text-sm">Multi-Line</span>
                </div>
              </div>

              {/* Quality Audit Alerts list */}
              {getQualityAlerts().length > 0 && (
                <div className="space-y-2 pt-2">
                  <span className="text-[10px] font-bold text-gray-400 uppercase tracking-wider block">Auditor Observations</span>
                  {getQualityAlerts().map((al, idx) => (
                    <div 
                      key={idx} 
                      className={`text-xs p-3 rounded-xl border flex items-start gap-2.5 leading-relaxed font-medium ${
                        al.type === 'privacy'
                          ? 'bg-amber-50 border-amber-200 text-amber-800'
                          : al.type === 'warning'
                          ? 'bg-red-50 border-red-200 text-red-800'
                          : 'bg-blue-50 border-blue-200 text-blue-800'
                      }`}
                    >
                      <AlertTriangle className={`w-4 h-4 shrink-0 mt-0.5 ${al.type === 'privacy' || al.type === 'warning' ? 'text-amber-600' : 'text-blue-600'}`} />
                      <span>{al.text}</span>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}
        </div>
      </div>

      {/* CSV Preview Table */}
      {hasData && (
        <div className="bg-white border border-gray-100 rounded-2xl p-6 shadow-sm space-y-4" id="csv-preview-table-panel">
          <div className="flex justify-between items-center">
            <div>
              <h4 className="text-sm font-bold text-gray-900">Ingested Spreadsheet Ingress Preview</h4>
              <p className="text-xs text-gray-400">First-level view of qualitative rows loaded into workspace state.</p>
            </div>
            <span className="text-xs font-semibold text-gray-400">
              Showing {data.length} records
            </span>
          </div>

          <div className="overflow-x-auto max-h-96">
            <table className="w-full text-left text-xs text-gray-500" id="preview-data-table">
              <thead>
                <tr className="border-b border-gray-50 text-gray-400 font-semibold text-[10px] uppercase tracking-wider bg-gray-50/50">
                  <th className="p-3">ID</th>
                  <th className="p-3">Patient Comment Text</th>
                  <th className="p-3 text-center">Satisfaction</th>
                  <th className="p-3 text-center">Comm. Rating</th>
                  <th className="p-3">Service Line</th>
                  <th className="p-3">Visit Type</th>
                  <th className="p-3">Equity Persona</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-50 font-medium">
                {data.map((row) => (
                  <tr key={row.id} className="hover:bg-gray-50/50 transition-colors">
                    <td className="p-3 font-mono font-bold text-gray-400">{row.id}</td>
                    <td className="p-3 text-gray-700 max-w-sm truncate" title={row.comment}>
                      {row.comment}
                    </td>
                    <td className="p-3 text-center">
                      <span className={`px-2 py-0.5 rounded-full text-[10px] font-bold ${
                        row.satisfactionScore >= 4 
                          ? 'bg-emerald-50 text-emerald-700' 
                          : row.satisfactionScore === 3 
                          ? 'bg-gray-100 text-gray-600' 
                          : 'bg-red-50 text-red-700'
                      }`}>
                        {row.satisfactionScore}/5
                      </span>
                    </td>
                    <td className="p-3 text-center">
                      <span className={`px-2 py-0.5 rounded-full text-[10px] font-bold ${
                        row.communicationRating >= 4 
                          ? 'bg-emerald-50 text-emerald-700' 
                          : 'bg-gray-100 text-gray-600'
                      }`}>
                        {row.communicationRating}/5
                      </span>
                    </td>
                    <td className="p-3 text-gray-600">{row.serviceLine}</td>
                    <td className="p-3 text-gray-500">{row.visitType}</td>
                    <td className="p-3 text-gray-600 font-bold">
                      <span className={`px-2 py-0.5 rounded-full text-[10px] ${
                        row.patientPersona !== 'General' 
                          ? 'bg-purple-50 text-purple-700 border border-purple-100' 
                          : 'bg-gray-50 text-gray-500'
                      }`}>
                        {row.patientPersona}
                      </span>
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
}
