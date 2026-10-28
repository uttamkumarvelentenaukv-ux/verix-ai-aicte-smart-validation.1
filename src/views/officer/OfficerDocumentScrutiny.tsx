import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import {
  ArrowLeft,
  ShieldAlert,
  CheckCircle2,
  AlertTriangle,
  ZoomIn,
  ZoomOut,
  Maximize2,
  FileText,
  Eye,
  MessageSquare,
  Check,
  X,
  FileSearch,
} from 'lucide-react';

interface Props {
  onOpenClarificationModal: (appId: string, docName: string) => void;
}

export const OfficerDocumentScrutiny: React.FC<Props> = ({ onOpenClarificationModal }) => {
  const {
    applications,
    selectedApplicationId,
    documents,
    findings,
    updateFindingStatus,
    setCurrentView,
  } = useApp();

  const currentApp = applications.find((a) => a.id === selectedApplicationId) || applications[0];
  const appDocs = documents.filter((d) => d.applicationId === currentApp.id || d.applicationId === 'VERIX-2025-00124');
  const [selectedDocId, setSelectedDocId] = useState<string>(appDocs[3]?.id || appDocs[0]?.id || 'doc-4');
  const [showOverlay, setShowOverlay] = useState<boolean>(true);
  const [dismissReason, setDismissReason] = useState<string>('');
  const [showDismissInput, setShowDismissInput] = useState<boolean>(false);

  const activeDoc = appDocs.find((d) => d.id === selectedDocId) || appDocs[0];
  const activeFindings = findings.filter((f) => f.documentId === activeDoc?.id || f.documentName === activeDoc?.fileName);

  const handleDismissFinding = (findingId: string) => {
    if (!dismissReason.trim()) {
      alert('A valid regulatory explanation is required to dismiss an AI-generated anomaly flag.');
      return;
    }
    updateFindingStatus(findingId, 'Dismissed', dismissReason);
    setShowDismissInput(false);
    setDismissReason('');
    alert('Finding dismissed and logged to audit trail.');
  };

  const handleConfirmFinding = (findingId: string) => {
    updateFindingStatus(findingId, 'Confirmed', 'Confirmed by AICTE Scrutiny Officer following manual evidence inspection.');
    alert('Finding confirmed. Case flagged for statutory review.');
  };

  return (
    <div className="max-w-7xl mx-auto space-y-5">
      {/* Top Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-3 border-b border-slate-200 gap-3">
        <div>
          <button
            onClick={() => setCurrentView('officer_dashboard')}
            className="inline-flex items-center space-x-1.5 text-xs font-semibold text-purple-700 hover:text-purple-800 mb-1"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            <span>Back to Review Queue</span>
          </button>
          <div className="flex items-center space-x-3">
            <h1 className="text-2xl font-black text-slate-800 tracking-tight">Document Scrutiny Workspace</h1>
            <span className="px-2.5 py-0.5 rounded-full text-xs font-mono font-bold bg-purple-50 text-purple-700 border border-purple-200">
              {currentApp.referenceNumber}
            </span>
          </div>
          <p className="text-xs text-slate-500 mt-0.5">
            {currentApp.institutionName} • Category: {currentApp.category}
          </p>
        </div>

        <div className="flex items-center space-x-3 text-xs">
          <label className="flex items-center space-x-2 cursor-pointer bg-white px-3 py-2 rounded-xl border border-slate-200 shadow-2xs">
            <input
              type="checkbox"
              checked={showOverlay}
              onChange={(e) => setShowOverlay(e.target.checked)}
              className="rounded text-purple-600 focus:ring-purple-500"
            />
            <span className="font-semibold text-slate-700">Show AI Anomaly Bounding Box</span>
          </label>
        </div>
      </div>

      {/* 3-Pane Scrutiny Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-5">
        {/* Pane 1: Document Checklist (3 cols) */}
        <div className="lg:col-span-3 bg-white rounded-2xl p-4 border border-slate-200/80 shadow-xs space-y-3">
          <p className="text-xs font-bold uppercase tracking-wider text-slate-400">Application Documents</p>
          <div className="space-y-1.5 max-h-[600px] overflow-y-auto">
            {appDocs.map((doc) => {
              const isSelected = doc.id === activeDoc?.id;
              const hasAlert = findings.some((f) => f.documentId === doc.id && f.status === 'Detected');
              return (
                <button
                  key={doc.id}
                  onClick={() => setSelectedDocId(doc.id)}
                  className={`w-full text-left p-3 rounded-xl transition flex items-center justify-between text-xs ${
                    isSelected
                      ? 'bg-purple-600 text-white font-semibold shadow-xs'
                      : 'hover:bg-slate-50 text-slate-700 border border-transparent'
                  }`}
                >
                  <div className="truncate mr-2">
                    <p className="truncate font-bold leading-tight">{doc.name}</p>
                    <p className={`text-[10px] mt-0.5 truncate ${isSelected ? 'text-purple-200' : 'text-slate-400'}`}>
                      {doc.fileName || 'Pending upload'}
                    </p>
                  </div>
                  {hasAlert && (
                    <span
                      className={`w-2 h-2 rounded-full shrink-0 ${
                        isSelected ? 'bg-amber-300' : 'bg-rose-500 animate-pulse'
                      }`}
                      title="Anomaly detected"
                    />
                  )}
                </button>
              );
            })}
          </div>
        </div>

        {/* Pane 2: High-Res Document Preview with Bounding Box (5 cols) */}
        <div className="lg:col-span-5 bg-slate-900 rounded-2xl p-4 border border-slate-800 shadow-md flex flex-col justify-between text-white">
          <div className="flex items-center justify-between text-xs pb-3 border-b border-slate-800 text-slate-400">
            <span className="font-semibold text-slate-200 truncate">{activeDoc?.fileName || activeDoc?.name}</span>
            <span>Page 1 of 3</span>
          </div>

          {/* Document Canvas Rendering */}
          <div className="my-3 flex-1 bg-white rounded-xl p-6 text-slate-800 font-serif text-[11px] leading-relaxed relative flex flex-col justify-between shadow-lg min-h-[420px]">
            {/* AI Bounding Box Overlay for Anomaly */}
            {showOverlay && activeDoc?.previewType === 'land_deed' && (
              <div className="absolute bottom-6 right-6 w-36 h-20 border-2 border-dashed border-rose-500 bg-rose-500/10 rounded-lg p-1.5 pointer-events-none flex flex-col justify-between">
                <span className="bg-rose-600 text-white text-[9px] font-sans font-bold px-1.5 py-0.5 rounded w-fit">
                  Anomaly: Signatory Mismatch (0.61)
                </span>
                <span className="text-rose-700 font-sans text-[8px] font-bold">APH Clause 3.2</span>
              </div>
            )}

            {/* Document Header */}
            <div className="text-center border-b border-slate-200 pb-3">
              <p className="text-[10px] font-bold uppercase tracking-widest text-slate-500">Government of Chhattisgarh</p>
              <p className="text-xs font-black tracking-wide text-blue-900 uppercase mt-0.5">
                {activeDoc?.type || 'Statutory Record'}
              </p>
              <p className="text-[9px] text-slate-400 font-sans">Revenue & Regulatory Documentation Portal</p>
            </div>

            {/* Document Extracted Fields in Scrutiny */}
            <div className="my-4 bg-slate-50 p-3 rounded-lg border border-slate-200 font-mono text-[10px] space-y-1.5 text-slate-700">
              <p>
                <strong>Institution:</strong> {currentApp.institutionName}
              </p>
              <p>
                <strong>Permanent ID:</strong> {currentApp.aisheCode}
              </p>
              {activeDoc?.extractedFields &&
                Object.entries(activeDoc.extractedFields).map(([key, val]) => (
                  <p key={key}>
                    <strong>{key}:</strong> {String(val)}
                  </p>
                ))}
            </div>

            {/* Signatures & Seal */}
            <div className="pt-3 border-t border-slate-200 flex items-center justify-between">
              <div className="w-14 h-14 rounded-full border-2 border-dashed border-blue-700 flex items-center justify-center text-blue-800 font-sans font-bold text-[8px] transform -rotate-12">
                OFFICIAL SEAL
              </div>
              <div className="text-right">
                <div className="w-24 border-b border-slate-400 font-cursive text-[12px] text-slate-700">
                  Authorized Signatory
                </div>
                <p className="text-[8px] text-slate-400 font-sans mt-0.5">Sub-Registrar Revenue Office</p>
              </div>
            </div>
          </div>

          {/* Bottom Zoom & Page Controls */}
          <div className="flex items-center justify-between text-xs text-slate-400 pt-2 border-t border-slate-800">
            <span>OCR Confidence: 98.4%</span>
            <div className="flex items-center space-x-3">
              <button className="hover:text-white" title="Zoom Out">
                <ZoomOut className="w-4 h-4" />
              </button>
              <span>100%</span>
              <button className="hover:text-white" title="Zoom In">
                <ZoomIn className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>

        {/* Pane 3: Scrutiny Actions & Anomaly Findings (4 cols) */}
        <div className="lg:col-span-4 bg-white rounded-2xl p-5 border border-slate-200/80 shadow-xs space-y-4 flex flex-col justify-between">
          <div className="space-y-4">
            <div className="border-b border-slate-100 pb-3">
              <p className="text-xs font-bold uppercase tracking-wider text-slate-400">AICTE Regulatory Findings</p>
              <h3 className="text-sm font-black text-slate-800 mt-1">{activeDoc?.name}</h3>
            </div>

            {activeFindings.length > 0 ? (
              activeFindings.map((finding) => (
                <div
                  key={finding.id}
                  className={`p-4 rounded-xl border text-xs space-y-2.5 ${
                    finding.severity === 'Major'
                      ? 'bg-rose-50/70 border-rose-200'
                      : 'bg-amber-50/70 border-amber-200'
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <span className="font-black text-slate-800">{finding.title}</span>
                    <span
                      className={`px-2 py-0.5 rounded text-[10px] font-bold ${
                        finding.severity === 'Major'
                          ? 'bg-rose-200 text-rose-900'
                          : 'bg-amber-200 text-amber-900'
                      }`}
                    >
                      {finding.severity}
                    </span>
                  </div>

                  <p className="text-slate-700 leading-relaxed">{finding.description}</p>

                  <div className="bg-white/80 p-2.5 rounded-lg border border-slate-200/60 font-mono text-[11px] space-y-1">
                    <p>
                      <strong>Evidence:</strong> {finding.evidence}
                    </p>
                    <p>
                      <strong>Expected:</strong> {finding.expected}
                    </p>
                    <p className="text-[10px] text-slate-500">
                      <strong>Clause:</strong> {finding.clauseReference}
                    </p>
                  </div>

                  <div className="flex items-center justify-between text-[11px] text-slate-500">
                    <span>Status: <strong className="text-slate-800">{finding.status}</strong></span>
                    <span>Confidence: {(finding.confidence * 100).toFixed(0)}%</span>
                  </div>

                  {/* Scrutiny Decision Buttons */}
                  <div className="grid grid-cols-2 gap-2 pt-2 border-t border-slate-200/60">
                    <button
                      onClick={() => handleConfirmFinding(finding.id)}
                      className="py-1.5 px-2 bg-rose-600 hover:bg-rose-700 text-white rounded-lg font-bold text-center transition flex items-center justify-center space-x-1"
                    >
                      <Check className="w-3.5 h-3.5" />
                      <span>Confirm Flag</span>
                    </button>
                    <button
                      onClick={() => setShowDismissInput(true)}
                      className="py-1.5 px-2 bg-white hover:bg-slate-50 border border-slate-200 text-slate-700 rounded-lg font-semibold text-center transition flex items-center justify-center space-x-1"
                    >
                      <X className="w-3.5 h-3.5" />
                      <span>Dismiss Flag</span>
                    </button>
                  </div>

                  {showDismissInput && (
                    <div className="p-3 bg-white rounded-xl border border-slate-300 space-y-2 mt-2">
                      <p className="font-bold text-slate-800 text-[11px]">Mandatory Dismissal Rationale</p>
                      <textarea
                        value={dismissReason}
                        onChange={(e) => setDismissReason(e.target.value)}
                        placeholder="State reason for dismissing this automated AI flag..."
                        className="w-full p-2 bg-slate-50 rounded border border-slate-200 text-[11px]"
                        rows={2}
                      />
                      <div className="flex justify-end space-x-2">
                        <button
                          onClick={() => setShowDismissInput(false)}
                          className="px-2 py-0.5 text-slate-500 hover:text-slate-700"
                        >
                          Cancel
                        </button>
                        <button
                          onClick={() => handleDismissFinding(finding.id)}
                          className="px-2.5 py-1 bg-slate-900 text-white rounded font-bold"
                        >
                          Confirm Dismissal
                        </button>
                      </div>
                    </div>
                  )}
                </div>
              ))
            ) : (
              <div className="p-4 rounded-xl bg-emerald-50 border border-emerald-200 text-xs text-emerald-800 space-y-1">
                <p className="font-bold">No active anomalies flagged</p>
                <p className="text-[11px] text-emerald-700">Document matches checklist requirements and format guidelines.</p>
              </div>
            )}

            {/* Quick Clarification Dispatch Button */}
            <button
              onClick={() => onOpenClarificationModal(currentApp.id, activeDoc?.name || 'Document')}
              className="w-full py-2.5 px-4 rounded-xl bg-purple-700 hover:bg-purple-800 text-white font-bold text-xs shadow-xs transition flex items-center justify-center space-x-1.5"
            >
              <MessageSquare className="w-3.5 h-3.5" />
              <span>Request Official Clarification</span>
            </button>
          </div>

          <p className="text-[10px] text-slate-400 text-center leading-relaxed">
            Statutory decision-support mode. Automated OCR bounding boxes represent preliminary algorithmic matches.
          </p>
        </div>
      </div>
    </div>
  );
};
