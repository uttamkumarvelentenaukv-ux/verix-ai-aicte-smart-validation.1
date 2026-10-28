import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import {
  FileText,
  Clock,
  CheckCircle2,
  AlertTriangle,
  Brain,
  UploadCloud,
  ChevronRight,
  Eye,
  MoreVertical,
  Check,
  AlertCircle,
  FileCheck2,
  Building,
  GraduationCap,
  Sparkles,
  TrendingUp,
  Download,
} from 'lucide-react';

interface Props {
  onOpenDocumentPreview: (docId: string) => void;
  onOpenComplianceReport: () => void;
}

export const InstitutionDashboard: React.FC<Props> = ({ onOpenDocumentPreview, onOpenComplianceReport }) => {
  const { setCurrentView, documents, uploadDocumentItem, runValidationJob, selectedApplicationId } = useApp();
  const [dragActive, setDragActive] = useState(false);

  const handleSimulatedUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      const targetDoc = documents.find((d) => d.status === 'Needs Update' || d.status === 'In Review') || documents[0];
      uploadDocumentItem(targetDoc.id, file.name, `${(file.size / (1024 * 1024)).toFixed(1)} MB`);
      runValidationJob(selectedApplicationId);
    }
  };

  return (
    <div className="space-y-6 max-w-7xl mx-auto">
      {/* 5 Top Stat Cards (Matches Image 6) */}
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
        {/* Total Applications */}
        <div className="bg-white rounded-2xl p-4 border border-slate-200/80 shadow-xs flex items-center justify-between">
          <div>
            <p className="text-xs font-semibold text-slate-500">Total Applications</p>
            <div className="flex items-baseline space-x-2 mt-1">
              <span className="text-2xl font-black text-slate-800">248</span>
              <span className="text-[11px] font-bold text-emerald-600 flex items-center">
                <TrendingUp className="w-3 h-3 mr-0.5 inline" /> ↑ 12%
              </span>
            </div>
            <p className="text-[10px] text-slate-400 mt-0.5">This Month</p>
          </div>
          <div className="w-10 h-10 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center">
            <FileText className="w-5 h-5" />
          </div>
        </div>

        {/* Under Validation */}
        <div className="bg-white rounded-2xl p-4 border border-slate-200/80 shadow-xs flex items-center justify-between">
          <div>
            <p className="text-xs font-semibold text-slate-500">Under Validation</p>
            <div className="flex items-baseline space-x-2 mt-1">
              <span className="text-2xl font-black text-slate-800">56</span>
              <span className="text-[11px] font-bold text-amber-600 flex items-center">
                <TrendingUp className="w-3 h-3 mr-0.5 inline" /> ↑ 8%
              </span>
            </div>
            <p className="text-[10px] text-slate-400 mt-0.5">Pending Review</p>
          </div>
          <div className="w-10 h-10 rounded-xl bg-amber-50 text-amber-600 flex items-center justify-center">
            <Clock className="w-5 h-5" />
          </div>
        </div>

        {/* Approved */}
        <div className="bg-white rounded-2xl p-4 border border-slate-200/80 shadow-xs flex items-center justify-between">
          <div>
            <p className="text-xs font-semibold text-slate-500">Approved</p>
            <div className="flex items-baseline space-x-2 mt-1">
              <span className="text-2xl font-black text-slate-800">162</span>
              <span className="text-[11px] font-bold text-emerald-600 flex items-center">
                <TrendingUp className="w-3 h-3 mr-0.5 inline" /> ↑ 18%
              </span>
            </div>
            <p className="text-[10px] text-slate-400 mt-0.5">AICTE Approved</p>
          </div>
          <div className="w-10 h-10 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center">
            <CheckCircle2 className="w-5 h-5" />
          </div>
        </div>

        {/* Needs Clarification */}
        <div className="bg-white rounded-2xl p-4 border border-slate-200/80 shadow-xs flex items-center justify-between">
          <div>
            <p className="text-xs font-semibold text-slate-500">Needs Clarification</p>
            <div className="flex items-baseline space-x-2 mt-1">
              <span className="text-2xl font-black text-slate-800">24</span>
              <span className="text-[11px] font-bold text-rose-500 flex items-center">
                ↓ 6%
              </span>
            </div>
            <p className="text-[10px] text-slate-400 mt-0.5">Action Required</p>
          </div>
          <div className="w-10 h-10 rounded-xl bg-rose-50 text-rose-600 flex items-center justify-center">
            <AlertTriangle className="w-5 h-5" />
          </div>
        </div>

        {/* AI Accuracy */}
        <div className="bg-gradient-to-br from-indigo-700 via-indigo-800 to-purple-800 rounded-2xl p-4 text-white shadow-md flex items-center justify-between">
          <div>
            <p className="text-xs font-medium text-indigo-200">AI Accuracy</p>
            <p className="text-2xl font-black mt-1">96.2%</p>
            <p className="text-[10px] text-indigo-300 mt-0.5">Validation Accuracy</p>
          </div>
          <div className="w-10 h-10 rounded-xl bg-white/10 backdrop-blur-md flex items-center justify-center text-white">
            <Brain className="w-6 h-6" />
          </div>
        </div>
      </div>

      {/* Hero Welcome Banner (Matches Image 6) */}
      <div className="relative overflow-hidden rounded-2xl bg-gradient-to-r from-blue-900 via-indigo-900 to-slate-900 text-white p-6 shadow-md border border-blue-800/60">
        <div className="relative z-10 flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
          <div className="max-w-xl">
            <h1 className="text-2xl md:text-3xl font-extrabold tracking-tight">
              Welcome to <span className="text-blue-400">VERIX AI</span>
            </h1>
            <p className="text-sm font-semibold text-slate-200 mt-1">
              AI-Powered Document Validation for AICTE Approvals
            </p>
            <div className="flex flex-wrap items-center gap-3 mt-3 text-xs text-blue-200 font-medium">
              <span>• Secure</span>
              <span>• Transparent</span>
              <span>• AI-Driven</span>
              <span>• Efficient Scrutiny</span>
            </div>
          </div>

          {/* AICTE Crest Emblems */}
          <div className="flex items-center space-x-3 bg-white/10 backdrop-blur-md px-4 py-2.5 rounded-xl border border-white/15">
            <div className="w-10 h-10 rounded-full bg-amber-400/20 border border-amber-300/40 flex items-center justify-center text-amber-300 font-black text-xs">
              AICTE
            </div>
            <div className="text-left">
              <p className="text-xs font-bold leading-tight">All India Council for Technical Education</p>
              <p className="text-[10px] text-slate-300">अखिल भारतीय तकनीकी शिक्षा परिषद</p>
            </div>
          </div>
        </div>
      </div>

      {/* Middle Row: Start New App + Progress + Preliminary Findings (Matches Image 6) */}
      <div className="grid grid-cols-1 md:grid-cols-12 gap-6">
        {/* Start New Application Dropzone (4 cols) */}
        <div className="md:col-span-4 bg-white rounded-2xl p-5 border border-slate-200/80 shadow-xs flex flex-col justify-between">
          <div>
            <div className="flex items-center space-x-2 text-slate-800 font-bold text-sm mb-1">
              <UploadCloud className="w-4 h-4 text-blue-600" />
              <span>Start New Application</span>
            </div>
            <p className="text-xs text-slate-500 mb-4">
              Upload documents and let AI validate your application
            </p>

            <div
              onDragOver={(e) => {
                e.preventDefault();
                setDragActive(true);
              }}
              onDragLeave={() => setDragActive(false)}
              onDrop={(e) => {
                e.preventDefault();
                setDragActive(false);
                if (e.dataTransfer.files && e.dataTransfer.files[0]) {
                  const file = e.dataTransfer.files[0];
                  uploadDocumentItem('doc-1', file.name, `${(file.size / (1024 * 1024)).toFixed(1)} MB`);
                  runValidationJob(selectedApplicationId);
                }
              }}
              className={`border-2 border-dashed rounded-xl p-6 text-center transition ${
                dragActive ? 'border-blue-500 bg-blue-50/50' : 'border-slate-300 bg-slate-50/60'
              }`}
            >
              <UploadCloud className="w-10 h-10 text-blue-500 mx-auto mb-2" />
              <p className="text-xs font-bold text-slate-700">Drag & Drop your documents here</p>
              <p className="text-[11px] text-slate-400 mt-0.5 mb-3">or</p>
              <label className="inline-block px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white font-semibold text-xs rounded-xl shadow-xs cursor-pointer transition">
                <span>Choose Files</span>
                <input type="file" onChange={handleSimulatedUpload} className="hidden" accept=".pdf,.png,.jpg,.jpeg" />
              </label>
              <p className="text-[10px] text-slate-400 mt-3">
                Supported formats: PDF, JPG, PNG (Max 10MB each)
              </p>
            </div>
          </div>

          <button
            onClick={() => setCurrentView('new_application')}
            className="w-full mt-4 flex items-center justify-center space-x-1 py-2.5 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 font-semibold text-xs transition"
          >
            <span>Open Multi-Step Application Wizard</span>
            <ChevronRight className="w-3.5 h-3.5" />
          </button>
        </div>

        {/* Application Progress (4 cols) */}
        <div className="md:col-span-4 bg-white rounded-2xl p-5 border border-slate-200/80 shadow-xs flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between mb-4">
              <span className="text-sm font-bold text-slate-800">Application Progress</span>
              <span className="text-xs font-bold text-blue-600 bg-blue-50 px-2 py-0.5 rounded-full">
                Step 2 of 5
              </span>
            </div>

            <div className="space-y-3.5">
              <ProgressItem step="1" title="Institution Details" status="Completed" color="emerald" />
              <ProgressItem step="2" title="Document Upload" status="In Progress" color="blue" active />
              <ProgressItem step="3" title="AI Validation" status="Pending" color="slate" />
              <ProgressItem step="4" title="Compliance Check" status="Pending" color="slate" />
              <ProgressItem step="5" title="Final Submission" status="Pending" color="slate" />
            </div>
          </div>

          <div className="pt-4 border-t border-slate-100 mt-4 flex items-center justify-between text-xs text-slate-500">
            <span>Ref: {selectedApplicationId}</span>
            <button
              onClick={() => setCurrentView('new_application')}
              className="text-blue-600 hover:text-blue-700 font-semibold"
            >
              Resume Step 2 →
            </button>
          </div>
        </div>

        {/* AI Preliminary Findings (4 cols) */}
        <div className="md:col-span-4 bg-white rounded-2xl p-5 border border-slate-200/80 shadow-xs flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between mb-3">
              <div className="flex items-center space-x-2">
                <span className="px-1.5 py-0.5 rounded bg-blue-600 text-white font-bold text-[10px]">AI</span>
                <span className="text-sm font-bold text-slate-800">AI Preliminary Findings</span>
              </div>
              <button
                onClick={() => setCurrentView('validation_results')}
                className="text-xs text-blue-600 hover:text-blue-700 font-semibold flex items-center"
              >
                <span>View Details</span>
                <ChevronRight className="w-3.5 h-3.5" />
              </button>
            </div>

            <div className="space-y-3 text-xs">
              <div className="p-2.5 rounded-xl bg-slate-50 border border-slate-100 flex items-start space-x-2.5">
                <div className="w-5 h-5 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center shrink-0 mt-0.5">
                  <Check className="w-3.5 h-3.5" />
                </div>
                <div className="flex-1">
                  <p className="font-bold text-slate-800">Document Completeness</p>
                  <p className="text-[11px] text-slate-500">All required documents found (12/12)</p>
                </div>
              </div>

              <div className="p-2.5 rounded-xl bg-slate-50 border border-slate-100 flex items-start space-x-2.5">
                <div className="w-5 h-5 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center shrink-0 mt-0.5">
                  <Check className="w-3.5 h-3.5" />
                </div>
                <div className="flex-1">
                  <p className="font-bold text-slate-800">Data Consistency</p>
                  <p className="text-[11px] text-slate-500">Information matches across documents (98.4%)</p>
                </div>
              </div>

              <div className="p-2.5 rounded-xl bg-amber-50/70 border border-amber-200/80 flex items-start justify-between space-x-2">
                <div className="flex items-start space-x-2.5">
                  <div className="w-5 h-5 rounded-full bg-amber-100 text-amber-600 flex items-center justify-center shrink-0 mt-0.5">
                    <AlertTriangle className="w-3.5 h-3.5" />
                  </div>
                  <div>
                    <p className="font-bold text-slate-800">Anomaly Detection</p>
                    <p className="text-[11px] text-amber-700">1 potential issue detected (Signatory)</p>
                  </div>
                </div>
                <button
                  onClick={() => setCurrentView('validation_results')}
                  className="px-2.5 py-1 bg-white hover:bg-slate-50 text-slate-800 text-[11px] font-bold rounded-lg border border-slate-200 shadow-2xs"
                >
                  Review
                </button>
              </div>

              <div className="p-2.5 rounded-xl bg-slate-50 border border-slate-100 flex items-start space-x-2.5">
                <div className="w-5 h-5 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center shrink-0 mt-0.5">
                  <Check className="w-3.5 h-3.5" />
                </div>
                <div className="flex-1">
                  <p className="font-bold text-slate-800">Regulatory Compliance</p>
                  <p className="text-[11px] text-slate-500">Meets AICTE guidelines (2024-27)</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Row: Uploaded Documents Table + AI Validation Donut + Compliance Summary (Matches Image 6) */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Uploaded Documents Table (5 cols) */}
        <div className="lg:col-span-5 bg-white rounded-2xl p-5 border border-slate-200/80 shadow-xs flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between mb-3">
              <span className="text-sm font-bold text-slate-800">Uploaded Documents</span>
              <button
                onClick={() => setCurrentView('document_upload')}
                className="text-xs text-blue-600 hover:text-blue-700 font-semibold"
              >
                Add More
              </button>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs">
                <thead>
                  <tr className="border-b border-slate-100 text-slate-400 font-semibold">
                    <th className="pb-2">Document Name</th>
                    <th className="pb-2">Status</th>
                    <th className="pb-2 text-center">AI Check</th>
                    <th className="pb-2 text-right">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {documents.slice(0, 5).map((doc) => (
                    <tr key={doc.id} className="hover:bg-slate-50/80 transition">
                      <td className="py-2.5 pr-2">
                        <p className="font-bold text-slate-800 truncate max-w-[130px]">{doc.fileName || doc.name}</p>
                        <p className="text-[10px] text-slate-400">{doc.size || 'PDF'}</p>
                      </td>
                      <td className="py-2.5">
                        <span
                          className={`inline-block px-2 py-0.5 text-[10px] font-bold rounded-md ${
                            doc.status === 'Verified'
                              ? 'bg-emerald-50 text-emerald-700'
                              : doc.status === 'Needs Update'
                              ? 'bg-rose-50 text-rose-700'
                              : 'bg-amber-50 text-amber-700'
                          }`}
                        >
                          {doc.status}
                        </span>
                      </td>
                      <td className="py-2.5 text-center">
                        {doc.aiCheck === 'verified' ? (
                          <Check className="w-4 h-4 text-emerald-500 inline" />
                        ) : doc.aiCheck === 'warning' ? (
                          <AlertTriangle className="w-4 h-4 text-amber-500 inline" />
                        ) : (
                          <Clock className="w-4 h-4 text-blue-500 inline animate-spin" />
                        )}
                      </td>
                      <td className="py-2.5 text-right">
                        <button
                          onClick={() => onOpenDocumentPreview(doc.id)}
                          className="p-1 text-slate-500 hover:text-blue-600 rounded-lg hover:bg-slate-100 transition inline-block mr-1"
                          title="Preview Document and AI Pre-check"
                        >
                          <Eye className="w-3.5 h-3.5" />
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          <button
            onClick={() => setCurrentView('document_upload')}
            className="w-full mt-3 py-2 text-xs font-semibold text-center text-slate-600 hover:text-blue-600 bg-slate-50 hover:bg-slate-100 rounded-xl transition"
          >
            View All Documents in Centre →
          </button>
        </div>

        {/* AI Validation Results Donut (4 cols) */}
        <div className="lg:col-span-4 bg-white rounded-2xl p-5 border border-slate-200/80 shadow-xs flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between mb-3">
              <span className="text-sm font-bold text-slate-800">AI Validation Results</span>
              <button
                onClick={() => setCurrentView('validation_results')}
                className="text-xs text-blue-600 hover:text-blue-700 font-semibold"
              >
                View Full Report →
              </button>
            </div>

            {/* Circular Progress Donut Matching 87% */}
            <div className="flex items-center justify-between my-2">
              <div className="relative w-28 h-28 flex items-center justify-center">
                <svg className="w-full h-full transform -rotate-90" viewBox="0 0 100 100">
                  <circle cx="50" cy="50" r="40" stroke="#f1f5f9" strokeWidth="10" fill="transparent" />
                  <circle
                    cx="50"
                    cy="50"
                    r="40"
                    stroke="#10b981"
                    strokeWidth="10"
                    fill="transparent"
                    strokeDasharray="251.2"
                    strokeDashoffset={251.2 * (1 - 0.87)}
                    strokeLinecap="round"
                  />
                </svg>
                <div className="absolute text-center">
                  <span className="text-2xl font-black text-slate-800">87%</span>
                  <p className="text-[9px] text-slate-400 font-medium leading-none">Documents Validated</p>
                </div>
              </div>

              <div className="space-y-1.5 text-xs">
                <div className="flex items-center space-x-2">
                  <div className="w-2.5 h-2.5 rounded-full bg-emerald-500" />
                  <span className="text-slate-600">Valid Documents</span>
                  <span className="font-bold text-slate-800 ml-auto">12</span>
                </div>
                <div className="flex items-center space-x-2">
                  <div className="w-2.5 h-2.5 rounded-full bg-amber-500" />
                  <span className="text-slate-600">Minor Issues</span>
                  <span className="font-bold text-slate-800 ml-auto">2</span>
                </div>
                <div className="flex items-center space-x-2">
                  <div className="w-2.5 h-2.5 rounded-full bg-rose-500" />
                  <span className="text-slate-600">Major Issues</span>
                  <span className="font-bold text-slate-800 ml-auto">1</span>
                </div>
                <div className="flex items-center space-x-2">
                  <div className="w-2.5 h-2.5 rounded-full bg-slate-300" />
                  <span className="text-slate-600">Pending</span>
                  <span className="font-bold text-slate-800 ml-auto">0</span>
                </div>
              </div>
            </div>

            {/* Mini Metrics 4-grid */}
            <div className="grid grid-cols-4 gap-2 pt-3 border-t border-slate-100 text-center text-xs mt-3">
              <div>
                <p className="text-blue-600 font-black">98.4%</p>
                <p className="text-[10px] text-slate-400">OCR Extraction</p>
              </div>
              <div>
                <p className="text-indigo-600 font-black">95.1%</p>
                <p className="text-[10px] text-slate-400">Data Matching</p>
              </div>
              <div>
                <p className="text-emerald-600 font-black">92.7%</p>
                <p className="text-[10px] text-slate-400">Rule Compliance</p>
              </div>
              <div>
                <p className="text-rose-600 font-black">1</p>
                <p className="text-[10px] text-slate-400">Anomaly Flag</p>
              </div>
            </div>
          </div>
        </div>

        {/* Compliance Summary (3 cols) */}
        <div className="lg:col-span-3 bg-white rounded-2xl p-5 border border-slate-200/80 shadow-xs flex flex-col justify-between">
          <div>
            <p className="text-sm font-bold text-slate-800 mb-3">Compliance Summary</p>

            <div className="space-y-2 text-xs">
              <ComplianceRow title="Institution Details" status="Compliant" />
              <ComplianceRow title="Infrastructure & Facilities" status="Compliant" />
              <ComplianceRow title="Faculty Information" status="Minor Issues" warning />
              <ComplianceRow title="Financial Documents" status="Compliant" />
              <ComplianceRow title="Land & Building Documents" status="Compliant" />
              <ComplianceRow title="Regulatory Requirements" status="Compliant" />
            </div>
          </div>

          <button
            onClick={onOpenComplianceReport}
            className="w-full mt-4 flex items-center justify-center space-x-2 py-2.5 bg-blue-600 hover:bg-blue-700 text-white rounded-xl font-semibold text-xs shadow-xs transition"
          >
            <Download className="w-3.5 h-3.5" />
            <span>Generate Full Compliance Report</span>
          </button>
        </div>
      </div>
    </div>
  );
};

const ProgressItem: React.FC<{ step: string; title: string; status: string; color: string; active?: boolean }> = ({
  step,
  title,
  status,
  color,
  active,
}) => {
  return (
    <div className="flex items-center justify-between text-xs">
      <div className="flex items-center space-x-3">
        <div
          className={`w-6 h-6 rounded-full flex items-center justify-center font-bold text-[11px] ${
            color === 'emerald'
              ? 'bg-emerald-500 text-white'
              : color === 'blue'
              ? 'bg-blue-600 text-white shadow-xs'
              : 'bg-slate-200 text-slate-600'
          }`}
        >
          {step}
        </div>
        <span className={`font-semibold ${active ? 'text-blue-600' : 'text-slate-700'}`}>{title}</span>
      </div>
      <span
        className={`text-[11px] font-bold ${
          color === 'emerald' ? 'text-emerald-600' : color === 'blue' ? 'text-blue-600' : 'text-slate-400'
        }`}
      >
        {status}
      </span>
    </div>
  );
};

const ComplianceRow: React.FC<{ title: string; status: string; warning?: boolean }> = ({ title, status, warning }) => {
  return (
    <div className="flex items-center justify-between py-1 border-b border-slate-100 last:border-none">
      <span className="text-slate-600 truncate mr-2">{title}</span>
      <span
        className={`px-2 py-0.5 text-[10px] font-bold rounded-md ${
          warning ? 'bg-amber-50 text-amber-700' : 'bg-emerald-50 text-emerald-700'
        }`}
      >
        {status}
      </span>
    </div>
  );
};
