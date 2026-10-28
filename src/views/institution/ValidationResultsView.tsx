import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import {
  ArrowLeft,
  Download,
  Code2,
  CheckCircle2,
  AlertTriangle,
  AlertCircle,
  FileCheck2,
  FileText,
  Building,
  ChevronRight,
  ExternalLink,
  ShieldCheck,
  Check,
  Eye,
  RefreshCw,
} from 'lucide-react';

interface Props {
  onOpenDocumentPreview: (docId: string) => void;
  onOpenComplianceReport: () => void;
}

export const ValidationResultsView: React.FC<Props> = ({ onOpenDocumentPreview, onOpenComplianceReport }) => {
  const { applications, selectedApplicationId, setCurrentView, findings, runValidationJob } = useApp();

  const currentApp = applications.find((a) => a.id === selectedApplicationId) || applications[0];
  const [activeTab, setActiveTab] = useState('summary');
  const [isRevalidating, setIsRevalidating] = useState(false);

  const handleRevalidate = () => {
    setIsRevalidating(true);
    setTimeout(() => {
      runValidationJob(currentApp.id);
      setIsRevalidating(false);
    }, 800);
  };

  return (
    <div className="max-w-7xl mx-auto space-y-6">
      {/* Top Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <button
            onClick={() => setCurrentView('dashboard')}
            className="inline-flex items-center space-x-1.5 text-xs font-semibold text-blue-600 hover:text-blue-700 mb-1"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            <span>Back to Applications</span>
          </button>
          <h1 className="text-2xl font-black text-slate-800 tracking-tight">AI Validation Results</h1>
          <p className="text-xs text-slate-500">
            AI analysis and compliance check for your technical institution application
          </p>
        </div>

        <div className="flex items-center space-x-3">
          <button
            onClick={handleRevalidate}
            className="flex items-center space-x-1.5 px-3 py-2 rounded-xl bg-white hover:bg-slate-50 text-slate-700 border border-slate-200 text-xs font-semibold shadow-2xs transition"
          >
            <RefreshCw className={`w-3.5 h-3.5 ${isRevalidating ? 'animate-spin text-blue-600' : ''}`} />
            <span>Re-run Validation</span>
          </button>
          <button
            onClick={onOpenComplianceReport}
            className="flex items-center space-x-1.5 px-3.5 py-2 rounded-xl bg-white hover:bg-slate-50 text-blue-600 border border-blue-200 text-xs font-semibold shadow-2xs transition"
          >
            <Download className="w-3.5 h-3.5" />
            <span>Download Report</span>
          </button>
          <button
            onClick={() => alert('Raw JSON verification payload:\n' + JSON.stringify(currentApp, null, 2))}
            className="flex items-center space-x-1.5 px-3.5 py-2 rounded-xl bg-slate-900 hover:bg-slate-800 text-white text-xs font-semibold shadow-xs transition"
          >
            <Code2 className="w-3.5 h-3.5" />
            <span>View Raw Data</span>
          </button>
        </div>
      </div>

      {/* Application ID Header Card (Matches Image 4 right) */}
      <div className="bg-white rounded-2xl p-5 border border-slate-200/80 shadow-xs flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div className="flex items-center space-x-4">
          <div className="w-12 h-12 rounded-xl bg-blue-50 border border-blue-100 flex items-center justify-center text-blue-600">
            <FileText className="w-6 h-6" />
          </div>
          <div>
            <div className="flex items-center space-x-2.5">
              <span className="text-lg font-black text-slate-800">Application ID: {currentApp.referenceNumber}</span>
              <span className="px-2.5 py-0.5 rounded-full text-xs font-bold bg-emerald-50 text-emerald-700 border border-emerald-200">
                Validation Completed
              </span>
            </div>
            <p className="text-sm font-bold text-slate-700 mt-0.5">{currentApp.institutionName}</p>
            <p className="text-xs text-slate-400 mt-0.5">
              {currentApp.category} • Academic Year: {currentApp.academicYear}
            </p>
          </div>
        </div>

        <div className="text-right text-xs text-slate-400">
          <p>Submitted on</p>
          <p className="font-semibold text-slate-700 mt-0.5">{currentApp.submissionDate}</p>
        </div>
      </div>

      {/* Top 5 Metric Cards (Matches Image 4 right) */}
      <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
        {/* Card 1: Compliance Score */}
        <div className="bg-white rounded-2xl p-4 border border-slate-200/80 shadow-xs flex items-center space-x-4">
          <div className="relative w-14 h-14 flex items-center justify-center shrink-0">
            <svg className="w-full h-full transform -rotate-90" viewBox="0 0 36 36">
              <path
                className="text-slate-100"
                strokeWidth="4"
                stroke="currentColor"
                fill="none"
                d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
              />
              <path
                className="text-emerald-500"
                strokeDasharray="87, 100"
                strokeWidth="4"
                strokeLinecap="round"
                stroke="currentColor"
                fill="none"
                d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
              />
            </svg>
            <span className="absolute text-sm font-black text-slate-800">{currentApp.complianceScore}%</span>
          </div>
          <div>
            <p className="text-xs font-bold text-slate-700">Compliance Score</p>
            <p className="text-[10px] text-emerald-600 font-semibold mt-0.5">Eligible for Scrutiny</p>
          </div>
        </div>

        {/* Card 2: Valid Documents */}
        <div className="bg-white rounded-2xl p-4 border border-slate-200/80 shadow-xs flex items-center space-x-3">
          <div className="w-10 h-10 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center shrink-0">
            <CheckCircle2 className="w-5 h-5" />
          </div>
          <div>
            <p className="text-xl font-black text-slate-800">{currentApp.validDocs}</p>
            <p className="text-xs text-slate-500 font-medium">Valid Documents</p>
          </div>
        </div>

        {/* Card 3: Minor Issues */}
        <div className="bg-white rounded-2xl p-4 border border-slate-200/80 shadow-xs flex items-center space-x-3">
          <div className="w-10 h-10 rounded-xl bg-amber-50 text-amber-600 flex items-center justify-center shrink-0">
            <AlertTriangle className="w-5 h-5" />
          </div>
          <div>
            <p className="text-xl font-black text-slate-800">{currentApp.minorIssues}</p>
            <p className="text-xs text-slate-500 font-medium">Minor Issues</p>
          </div>
        </div>

        {/* Card 4: Major Issues */}
        <div className="bg-white rounded-2xl p-4 border border-slate-200/80 shadow-xs flex items-center space-x-3">
          <div className="w-10 h-10 rounded-xl bg-rose-50 text-rose-600 flex items-center justify-center shrink-0">
            <AlertCircle className="w-5 h-5" />
          </div>
          <div>
            <p className="text-xl font-black text-slate-800">{currentApp.majorIssues}</p>
            <p className="text-xs text-slate-500 font-medium">Major Issue</p>
          </div>
        </div>

        {/* Card 5: Pending */}
        <div className="bg-white rounded-2xl p-4 border border-slate-200/80 shadow-xs flex items-center space-x-3">
          <div className="w-10 h-10 rounded-xl bg-slate-100 text-slate-500 flex items-center justify-center shrink-0">
            <FileText className="w-5 h-5" />
          </div>
          <div>
            <p className="text-xl font-black text-slate-800">0</p>
            <p className="text-xs text-slate-500 font-medium">Pending</p>
          </div>
        </div>
      </div>

      {/* Tabs Row (Matches Image 4 right) */}
      <div className="border-b border-slate-200 flex items-center space-x-2 text-xs font-bold text-slate-500">
        <TabButton label="AI Validation Summary" active={activeTab === 'summary'} onClick={() => setActiveTab('summary')} />
        <TabButton label="Document Analysis" active={activeTab === 'analysis'} onClick={() => setActiveTab('analysis')} />
        <TabButton label="Cross-Verification" active={activeTab === 'cross'} onClick={() => setActiveTab('cross')} />
        <TabButton label="Compliance Check" active={activeTab === 'compliance'} onClick={() => setActiveTab('compliance')} />
        <TabButton label="Evidence & Report" active={activeTab === 'evidence'} onClick={() => setActiveTab('evidence')} />
      </div>

      {/* Main 2-column Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left Column: AI Findings Overview & Detected Issues (7 cols) */}
        <div className="lg:col-span-7 space-y-6">
          {/* AI Findings Overview */}
          <div className="bg-white rounded-2xl p-5 border border-slate-200/80 shadow-xs space-y-3">
            <div className="flex items-center justify-between border-b border-slate-100 pb-3">
              <div>
                <h3 className="text-sm font-bold text-slate-800">AI Findings Overview</h3>
                <p className="text-xs text-slate-400">Summary of AI analysis results across all documents</p>
              </div>
              <button
                onClick={() => setActiveTab('analysis')}
                className="text-xs text-blue-600 hover:text-blue-700 font-semibold"
              >
                View Details →
              </button>
            </div>

            <div className="space-y-3 text-xs">
              <div className="p-3 rounded-xl bg-slate-50 border border-slate-100 flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <div className="w-6 h-6 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center">
                    <Check className="w-4 h-4" />
                  </div>
                  <div>
                    <p className="font-bold text-slate-800">Document Completeness</p>
                    <p className="text-[11px] text-slate-500">All required documents found</p>
                  </div>
                </div>
                <span className="font-black text-slate-800">12/12</span>
              </div>

              <div className="p-3 rounded-xl bg-slate-50 border border-slate-100 flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <div className="w-6 h-6 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center">
                    <Check className="w-4 h-4" />
                  </div>
                  <div>
                    <p className="font-bold text-slate-800">Data Consistency</p>
                    <p className="text-[11px] text-slate-500">Information matches across documents</p>
                  </div>
                </div>
                <span className="font-black text-slate-800">98.4%</span>
              </div>

              <div className="p-3 rounded-xl bg-amber-50/80 border border-amber-200 flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <div className="w-6 h-6 rounded-full bg-amber-100 text-amber-600 flex items-center justify-center">
                    <AlertTriangle className="w-4 h-4" />
                  </div>
                  <div>
                    <p className="font-bold text-slate-800">Anomaly Detection</p>
                    <p className="text-[11px] text-amber-700">1 potential issue detected (Signatory divergence)</p>
                  </div>
                </div>
                <button
                  onClick={() => onOpenDocumentPreview('doc-4')}
                  className="px-3 py-1 bg-white hover:bg-slate-50 text-slate-800 text-xs font-bold rounded-lg border border-slate-200 shadow-2xs"
                >
                  View
                </button>
              </div>

              <div className="p-3 rounded-xl bg-slate-50 border border-slate-100 flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <div className="w-6 h-6 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center">
                    <Check className="w-4 h-4" />
                  </div>
                  <div>
                    <p className="font-bold text-slate-800">Rule Compliance (AICTE 2024-27)</p>
                    <p className="text-[11px] text-slate-500">Meets regulatory guidelines</p>
                  </div>
                </div>
                <span className="font-black text-slate-800">92.7%</span>
              </div>
            </div>
          </div>

          {/* Detected Issues (Matches Image 4 right) */}
          <div className="bg-white rounded-2xl p-5 border border-slate-200/80 shadow-xs space-y-3">
            <div className="flex items-center justify-between border-b border-slate-100 pb-3">
              <h3 className="text-sm font-bold text-slate-800">Detected Issues ({findings.length})</h3>
              <button
                onClick={() => setCurrentView('clarifications')}
                className="text-xs text-blue-600 hover:text-blue-700 font-semibold"
              >
                View All Issues →
              </button>
            </div>

            <div className="space-y-3">
              {findings.map((finding) => (
                <div
                  key={finding.id}
                  className={`p-4 rounded-xl border flex flex-col sm:flex-row sm:items-center justify-between gap-3 ${
                    finding.severity === 'Major'
                      ? 'bg-rose-50/50 border-rose-200'
                      : 'bg-amber-50/50 border-amber-200'
                  }`}
                >
                  <div className="flex items-start space-x-3">
                    <div
                      className={`w-8 h-8 rounded-lg flex items-center justify-center shrink-0 mt-0.5 ${
                        finding.severity === 'Major'
                          ? 'bg-rose-100 text-rose-600'
                          : 'bg-amber-100 text-amber-600'
                      }`}
                    >
                      {finding.severity === 'Major' ? (
                        <AlertCircle className="w-4 h-4" />
                      ) : (
                        <AlertTriangle className="w-4 h-4" />
                      )}
                    </div>
                    <div>
                      <div className="flex items-center space-x-2">
                        <span className="font-bold text-slate-800 text-xs">{finding.title}</span>
                        <span
                          className={`px-2 py-0.5 rounded text-[10px] font-bold ${
                            finding.severity === 'Major'
                              ? 'bg-rose-100 text-rose-800'
                              : 'bg-amber-100 text-amber-800'
                          }`}
                        >
                          {finding.severity}
                        </span>
                      </div>
                      <p className="text-xs text-slate-600 mt-1 leading-relaxed">{finding.description}</p>
                      <p className="text-[11px] text-slate-400 font-mono mt-1">
                        Document: <span className="text-slate-700 font-semibold">{finding.documentName}</span>
                      </p>
                    </div>
                  </div>

                  <button
                    onClick={() => onOpenDocumentPreview(finding.documentId || 'doc-4')}
                    className="self-end sm:self-center px-3 py-1.5 bg-white hover:bg-slate-50 text-slate-800 text-xs font-bold rounded-lg border border-slate-200 shadow-2xs shrink-0"
                  >
                    View
                  </button>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Right Column: Document Category Status & Extracted Information (5 cols) */}
        <div className="lg:col-span-5 space-y-6">
          {/* Document Category Status (Matches Image 4 right) */}
          <div className="bg-white rounded-2xl p-5 border border-slate-200/80 shadow-xs space-y-3">
            <div className="flex items-center justify-between border-b border-slate-100 pb-3">
              <span className="text-sm font-bold text-slate-800">Document Category Status</span>
              <button
                onClick={() => setCurrentView('document_upload')}
                className="text-xs text-blue-600 hover:text-blue-700 font-semibold"
              >
                View All →
              </button>
            </div>

            <div className="space-y-2 text-xs">
              <CategoryRow icon={<Building className="w-4 h-4" />} title="Institution Details" status="Valid" />
              <CategoryRow icon={<Building className="w-4 h-4" />} title="Land & Building" status="Valid" />
              <CategoryRow icon={<Building className="w-4 h-4" />} title="Infrastructure & Facilities" status="Valid" />
              <CategoryRow icon={<Building className="w-4 h-4" />} title="Faculty Information" status="Valid" />
              <CategoryRow
                icon={<Building className="w-4 h-4" />}
                title="Financial Documents"
                status="Minor Issue"
                warning
              />
              <CategoryRow
                icon={<Building className="w-4 h-4" />}
                title="Governing Body"
                status="Major Issue"
                error
              />
              <CategoryRow icon={<Building className="w-4 h-4" />} title="Other Documents" status="Valid" />
            </div>
          </div>

          {/* AI Extracted Information (Matches Image 4 right) */}
          <div className="bg-white rounded-2xl p-5 border border-slate-200/80 shadow-xs space-y-3">
            <div className="flex items-center justify-between border-b border-slate-100 pb-3">
              <div className="flex items-center space-x-2">
                <FileText className="w-4 h-4 text-blue-600" />
                <span className="text-sm font-bold text-slate-800">AI Extracted Information</span>
              </div>
              <span className="text-[10px] text-emerald-600 font-bold bg-emerald-50 px-2 py-0.5 rounded-full">
                OCR Confidence 98.4%
              </span>
            </div>

            <div className="space-y-2 text-xs">
              <InfoRow label="Institution Name" value={currentApp.institutionName} />
              <InfoRow label="AISHE Code" value={currentApp.aisheCode} isMono />
              <InfoRow label="Address" value={`${currentApp.city}, ${currentApp.state} - 490026`} />
              <InfoRow label="Year of Establishment" value={currentApp.yearOfEstablishment || 2003} />
              <InfoRow label="Number of Programs" value={currentApp.programsCount || 12} />
              <InfoRow label="Total Faculty" value={currentApp.totalFaculty || 156} />
              <InfoRow label="Land Area" value={currentApp.landArea || '25.4 Acres'} />
              <InfoRow label="Built-up Area" value={currentApp.builtUpArea || '32,600 sq. m.'} />
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Sticky Action Banner (Matches Image 4 right) */}
      <div className="bg-emerald-50 rounded-2xl p-4 border border-emerald-200/80 shadow-xs flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div className="flex items-center space-x-3">
          <div className="w-8 h-8 rounded-full bg-emerald-500 text-white flex items-center justify-center shrink-0">
            <Check className="w-5 h-5" />
          </div>
          <div>
            <p className="text-xs font-bold text-emerald-900">AI Validation Completed</p>
            <p className="text-[11px] text-emerald-700 leading-relaxed">
              Your application has been analyzed using AI and cross-verified with AICTE records. Please review the findings and take necessary action.
            </p>
          </div>
        </div>

        <button
          onClick={onOpenComplianceReport}
          className="px-6 py-2.5 bg-blue-600 hover:bg-blue-700 text-white font-semibold text-xs rounded-xl shadow-xs transition shrink-0"
        >
          Proceed to Compliance Report →
        </button>
      </div>
    </div>
  );
};

const TabButton: React.FC<{ label: string; active?: boolean; onClick: () => void }> = ({ label, active, onClick }) => {
  return (
    <button
      onClick={onClick}
      className={`px-4 py-2.5 font-bold transition border-b-2 -mb-px ${
        active
          ? 'text-blue-600 border-blue-600'
          : 'text-slate-500 border-transparent hover:text-slate-800 hover:border-slate-300'
      }`}
    >
      {label}
    </button>
  );
};

const CategoryRow: React.FC<{ icon: React.ReactNode; title: string; status: string; warning?: boolean; error?: boolean }> = ({
  icon,
  title,
  status,
  warning,
  error,
}) => {
  return (
    <div className="flex items-center justify-between py-1.5 border-b border-slate-50 last:border-none">
      <div className="flex items-center space-x-2 text-slate-700">
        <span className="text-slate-400">{icon}</span>
        <span className="font-medium">{title}</span>
      </div>
      <span
        className={`px-2 py-0.5 text-[10px] font-bold rounded-md ${
          error
            ? 'bg-rose-50 text-rose-700'
            : warning
            ? 'bg-amber-50 text-amber-700'
            : 'bg-emerald-50 text-emerald-700'
        }`}
      >
        {status}
      </span>
    </div>
  );
};

const InfoRow: React.FC<{ label: string; value: string | number; isMono?: boolean }> = ({ label, value, isMono }) => {
  return (
    <div className="flex items-baseline justify-between py-1 border-b border-slate-50 last:border-none">
      <span className="text-slate-400">{label}:</span>
      <span className={`font-semibold text-slate-800 text-right ml-2 ${isMono ? 'font-mono' : ''}`}>{value}</span>
    </div>
  );
};
