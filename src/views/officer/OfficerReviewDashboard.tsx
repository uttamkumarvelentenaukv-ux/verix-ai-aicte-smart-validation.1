import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import {
  FileText,
  Clock,
  AlertTriangle,
  Link,
  ShieldCheck,
  ChevronRight,
  MessageSquare,
  Search,
  Filter,
  CheckCircle2,
  FileSearch,
  AlertCircle,
  Eye,
} from 'lucide-react';
import { ApplicationRecord } from '../../types';

interface Props {
  onOpenClarificationModal: (appId: string, docName: string) => void;
  onOpenDocumentPreview: (docId: string) => void;
}

export const OfficerReviewDashboard: React.FC<Props> = ({
  onOpenClarificationModal,
  onOpenDocumentPreview,
}) => {
  const {
    applications,
    selectedApplicationId,
    setSelectedApplicationId,
    setCurrentView,
    recordOfficialDecision,
    findings,
  } = useApp();

  const [selectedAppRef, setSelectedAppRef] = useState<string>(selectedApplicationId || 'PROT-2026-005');
  const [observationText, setObservationText] = useState('');
  const [showObservationInput, setShowObservationInput] = useState(false);
  const [officialFindingsNotes, setOfficialFindingsNotes] = useState<string>('None recorded yet. A reason is required to save any action.');

  const selectedApp = applications.find((a) => a.id === selectedAppRef || a.referenceNumber === selectedAppRef) || applications[0];

  const handleRecordObservation = () => {
    if (!observationText.trim()) {
      alert('Please enter an observation note first.');
      return;
    }
    setOfficialFindingsNotes(observationText);
    recordOfficialDecision(selectedApp.id, 'Pending Review', observationText);
    alert('Official observation recorded to audit trail.');
    setShowObservationInput(false);
    setObservationText('');
  };

  const handleRecommendInspection = () => {
    recordOfficialDecision(selectedApp.id, 'Pending Review', 'Physical Scrutiny Inspection Recommended by AICTE Official.');
    alert(`Physical verification inspection flagged for ${selectedApp.institutionName}. Added to Regional Inspection Roster.`);
  };

  const handleRecordDecision = () => {
    recordOfficialDecision(selectedApp.id, 'AICTE Approved', 'Official scrutiny completed successfully with conditions satisfied.');
    alert(`Regulatory Approval recorded for ${selectedApp.institutionName}.`);
  };

  return (
    <div className="max-w-7xl mx-auto space-y-6">
      {/* Breadcrumb & Header (Matches Image 5) */}
      <div>
        <p className="text-xs font-semibold text-slate-500 uppercase tracking-wider">Home / Review Queue</p>
        <h1 className="text-2xl font-black text-slate-800 tracking-tight mt-1">Official Review Dashboard</h1>
        <p className="text-xs text-slate-500">
          Review application evidence, validation findings, unresolved issues, and pending actions.
        </p>
      </div>

      {/* 4 Stat Cards (Matches Image 5) */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {/* Assigned */}
        <div className="bg-white rounded-2xl p-5 border border-slate-200/80 shadow-xs flex items-center space-x-4">
          <div className="w-12 h-12 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center">
            <FileText className="w-6 h-6" />
          </div>
          <div>
            <p className="text-2xl font-black text-slate-800">18</p>
            <p className="text-xs text-slate-500 font-medium">Assigned</p>
          </div>
        </div>

        {/* Pending Review */}
        <div className="bg-white rounded-2xl p-5 border border-slate-200/80 shadow-xs flex items-center space-x-4">
          <div className="w-12 h-12 rounded-xl bg-rose-50 text-rose-600 flex items-center justify-center">
            <Clock className="w-6 h-6" />
          </div>
          <div>
            <p className="text-2xl font-black text-slate-800">7</p>
            <p className="text-xs text-slate-500 font-medium">Pending Review</p>
          </div>
        </div>

        {/* Flagged */}
        <div className="bg-white rounded-2xl p-5 border border-slate-200/80 shadow-xs flex items-center space-x-4">
          <div className="w-12 h-12 rounded-xl bg-amber-50 text-amber-600 flex items-center justify-center">
            <AlertTriangle className="w-6 h-6" />
          </div>
          <div>
            <p className="text-2xl font-black text-slate-800">3</p>
            <p className="text-xs text-slate-500 font-medium">Flagged</p>
          </div>
        </div>

        {/* Verification Pending */}
        <div className="bg-white rounded-2xl p-5 border border-slate-200/80 shadow-xs flex items-center space-x-4">
          <div className="w-12 h-12 rounded-xl bg-amber-50 text-amber-600 flex items-center justify-center">
            <Link className="w-6 h-6" />
          </div>
          <div>
            <p className="text-2xl font-black text-slate-800">4</p>
            <p className="text-xs text-slate-500 font-medium">Verification Pending</p>
          </div>
        </div>
      </div>

      {/* Main Split Grid (Matches Image 5) */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left Column: Review Queue Table (8 cols) */}
        <div className="lg:col-span-8 bg-white rounded-2xl p-5 border border-slate-200/80 shadow-xs space-y-4 flex flex-col justify-between">
          <div>
            <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-3 border-b border-slate-100 gap-2">
              <span className="text-base font-bold text-slate-800">Review queue</span>
              <span className="text-[11px] font-semibold text-slate-500 bg-slate-100 px-2.5 py-1 rounded-full">
                • Priority = urgency, not fraud risk
              </span>
            </div>

            <div className="overflow-x-auto mt-2">
              <table className="w-full text-left text-xs">
                <thead>
                  <tr className="border-b border-slate-100 text-slate-400 font-semibold">
                    <th className="pb-2.5">Application</th>
                    <th className="pb-2.5">Institution</th>
                    <th className="pb-2.5 text-center">Findings</th>
                    <th className="pb-2.5">Verification</th>
                    <th className="pb-2.5 text-right">Priority</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {applications.map((app) => {
                    const isSelected = app.id === selectedAppRef || app.referenceNumber === selectedAppRef;
                    return (
                      <tr
                        key={app.id}
                        onClick={() => {
                          setSelectedAppRef(app.id);
                          setSelectedApplicationId(app.id);
                        }}
                        className={`cursor-pointer transition ${
                          isSelected ? 'bg-purple-50/70 font-semibold' : 'hover:bg-slate-50'
                        }`}
                      >
                        <td className="py-3 font-mono font-bold text-slate-800">{app.referenceNumber}</td>
                        <td className="py-3 font-medium text-slate-700 max-w-[180px] truncate">
                          {app.institutionName}
                        </td>
                        <td className="py-3 text-center font-bold text-slate-800">
                          {app.majorIssues + app.minorIssues}
                        </td>
                        <td className="py-3">
                          {app.id === 'PROT-2026-005' ? (
                            <span className="inline-flex items-center px-2 py-0.5 rounded-full text-[10px] font-bold bg-purple-50 text-purple-700">
                              <span className="w-1.5 h-1.5 rounded-full bg-purple-500 mr-1.5" />
                              Manual Review
                            </span>
                          ) : app.id === 'PROT-2026-003' ? (
                            <span className="inline-flex items-center px-2 py-0.5 rounded-full text-[10px] font-bold bg-amber-50 text-amber-700">
                              <span className="w-1.5 h-1.5 rounded-full bg-amber-500 mr-1.5" />
                              Pending
                            </span>
                          ) : (
                            <span className="inline-flex items-center px-2 py-0.5 rounded-full text-[10px] font-bold bg-emerald-50 text-emerald-700">
                              <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 mr-1.5" />
                              Verified (demo)
                            </span>
                          )}
                        </td>
                        <td className="py-3 text-right">
                          <span
                            className={`inline-flex items-center text-[11px] font-bold ${
                              app.priority === 'High'
                                ? 'text-rose-600'
                                : app.priority === 'Medium'
                                ? 'text-amber-600'
                                : 'text-blue-600'
                            }`}
                          >
                            <span
                              className={`w-1.5 h-1.5 rounded-full mr-1.5 ${
                                app.priority === 'High'
                                  ? 'bg-rose-500'
                                  : app.priority === 'Medium'
                                  ? 'bg-amber-500'
                                  : 'bg-blue-500'
                              }`}
                            />
                            {app.priority}
                          </span>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </div>

          {/* Table Footnote */}
          <p className="text-[11px] text-slate-400 pt-3 border-t border-slate-100">
            High: multiple unresolved issues and review overdue. Medium: pending verification. Low: routine, no automated findings.
          </p>
        </div>

        {/* Right Column: Case Scrutiny Details & Actions (4 cols - Matches Image 5) */}
        <div className="lg:col-span-4 space-y-4">
          <div className="bg-white rounded-2xl p-5 border border-slate-200/80 shadow-xs space-y-4">
            <div className="border-b border-slate-100 pb-2 flex items-center justify-between">
              <span className="text-base font-black text-slate-800">{selectedApp.referenceNumber}</span>
              <span className="text-xs font-semibold text-slate-400">{selectedApp.city}</span>
            </div>

            {/* AI Findings (Advisory) Card */}
            <div className="bg-slate-50 rounded-xl p-4 border border-slate-200 space-y-1.5 text-xs">
              <p className="font-bold text-slate-700">AI findings (advisory)</p>
              <p className="text-slate-600 text-[11px] leading-relaxed">
                {selectedApp.id === 'PROT-2026-005'
                  ? 'Certificate identifier differs. This is an anomaly requiring verification, not proof of forgery.'
                  : selectedApp.id === 'VERIX-2025-00124'
                  ? 'Signature vector in land title deed diverges from on-file signatory vector. Advisory flag for manual scrutiny.'
                  : 'All mandatory checklist criteria verified by AI preliminary check. Routine approval eligible.'}
              </p>
            </div>

            {/* Official Findings Card */}
            <div className="bg-slate-50 rounded-xl p-4 border border-slate-200 space-y-1.5 text-xs">
              <p className="font-bold text-slate-700">Official findings</p>
              <p className="text-slate-600 text-[11px] leading-relaxed">{officialFindingsNotes}</p>
            </div>

            {/* Observation Input (when opened) */}
            {showObservationInput && (
              <div className="space-y-2 p-3 bg-purple-50 rounded-xl border border-purple-200 text-xs">
                <p className="font-bold text-purple-900">Record Regulatory Scrutiny Observation</p>
                <textarea
                  value={observationText}
                  onChange={(e) => setObservationText(e.target.value)}
                  placeholder="Enter observation rationale for audit trail..."
                  className="w-full p-2 bg-white rounded-lg border border-purple-200 text-xs focus:outline-hidden focus:ring-2 focus:ring-purple-400"
                  rows={3}
                />
                <div className="flex justify-end space-x-2">
                  <button
                    onClick={() => setShowObservationInput(false)}
                    className="px-2.5 py-1 text-slate-500 hover:text-slate-700"
                  >
                    Cancel
                  </button>
                  <button
                    onClick={handleRecordObservation}
                    className="px-3 py-1 bg-purple-700 text-white rounded-lg font-bold"
                  >
                    Save Note
                  </button>
                </div>
              </div>
            )}

            {/* 4 Action Buttons (Matches Image 5) */}
            <div className="space-y-2.5 pt-2">
              <button
                onClick={() => onOpenClarificationModal(selectedApp.id, 'Certificate of Incorporation / Land Deed')}
                className="w-full py-2.5 px-4 rounded-xl bg-[#8c1d8c] hover:bg-[#741674] text-white font-bold text-xs tracking-wide shadow-sm transition"
              >
                Request Clarification
              </button>

              <button
                onClick={() => setShowObservationInput(!showObservationInput)}
                className="w-full py-2.5 px-4 rounded-xl bg-white hover:bg-slate-50 border border-slate-200 text-slate-700 font-semibold text-xs transition"
              >
                Record Observation
              </button>

              <button
                onClick={handleRecommendInspection}
                className="w-full py-2.5 px-4 rounded-xl bg-white hover:bg-slate-50 border border-slate-200 text-slate-700 font-semibold text-xs transition"
              >
                Recommend Inspection
              </button>

              <button
                onClick={handleRecordDecision}
                className="w-full py-2.5 px-4 rounded-xl bg-white hover:bg-slate-50 border border-slate-200 text-slate-700 font-semibold text-xs transition"
              >
                Record Decision
              </button>
            </div>

            {/* Link to Full Scrutiny Workspace */}
            <button
              onClick={() => {
                setSelectedApplicationId(selectedApp.id);
                setCurrentView('officer_scrutiny');
              }}
              className="w-full mt-2 py-2 text-xs font-bold text-purple-700 hover:text-purple-800 text-center block transition"
            >
              Open Full Document Scrutiny Workspace →
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
