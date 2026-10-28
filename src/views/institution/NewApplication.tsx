import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import {
  ArrowLeft,
  Check,
  Upload,
  Eye,
  MoreVertical,
  Download,
  AlertTriangle,
  HelpCircle,
  FileText,
  ShieldCheck,
  Clock,
  Sparkles,
  PhoneCall,
  Info,
  Maximize2,
  ZoomIn,
  ZoomOut,
} from 'lucide-react';
import { DocumentItem } from '../../types';

interface Props {
  onOpenDocumentPreview: (docId: string) => void;
}

export const NewApplication: React.FC<Props> = ({ onOpenDocumentPreview }) => {
  const {
    currentUser,
    setCurrentView,
    documents,
    uploadDocumentItem,
    createNewApplication,
    runValidationJob,
  } = useApp();

  const [currentStep, setCurrentStep] = useState<number>(2); // Default to Step 2 Document Upload as in reference
  const [appType, setAppType] = useState('Extension of Approval (EoA)');
  const [academicYear, setAcademicYear] = useState('2026 - 2027');
  const [institutionName, setInstitutionName] = useState(
    currentUser.institutionName || 'Rungta College of Engineering and Technology, Bhilai'
  );
  const [institutionType, setInstitutionType] = useState('Private - Self Financed');
  const [state, setState] = useState('Chhattisgarh');
  const [district, setDistrict] = useState('Durg');
  const [aisheCode, setAisheCode] = useState('C-12345');

  // Currently selected document in the preview side-panel (default to doc-4 Land Documents as in Image 3)
  const [previewDocId, setPreviewDocId] = useState<string>('doc-4');

  const selectedDoc = documents.find((d) => d.id === previewDocId) || documents[0];

  const handleFileUpload = (docId: string, e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      uploadDocumentItem(docId, file.name, `${(file.size / (1024 * 1024)).toFixed(1)} MB`);
      setPreviewDocId(docId);
    }
  };

  const handleSubmitApplication = () => {
    const newId = createNewApplication({
      institutionName,
      academicYear,
      category: appType,
      institutionType,
      state,
      city: district,
      aisheCode,
    });
    runValidationJob(newId);
    setCurrentView('validation_results');
  };

  return (
    <div className="max-w-7xl mx-auto space-y-6">
      {/* Top Header & Breadcrumb */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <button
            onClick={() => setCurrentView('dashboard')}
            className="inline-flex items-center space-x-1.5 text-xs font-semibold text-blue-600 hover:text-blue-700 mb-1"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            <span>Back to Dashboard</span>
          </button>
          <h1 className="text-2xl font-black text-slate-800 tracking-tight">New Application</h1>
          <p className="text-xs text-slate-500">
            Submit your application with required documents. Our AI will validate and check compliance.
          </p>
        </div>
      </div>

      {/* 5-Step Stepper Header (Matches Images 2 & 3) */}
      <div className="bg-white rounded-2xl p-5 border border-slate-200/80 shadow-xs">
        <div className="relative flex items-center justify-between max-w-4xl mx-auto">
          {/* Connector Line */}
          <div className="absolute top-1/2 left-8 right-8 -translate-y-1/2 h-0.5 bg-slate-200 -z-0" />
          <div
            className="absolute top-1/2 left-8 -translate-y-1/2 h-0.5 bg-blue-600 -z-0 transition-all duration-300"
            style={{ width: `${((currentStep - 1) / 4) * 100}%` }}
          />

          {/* Steps */}
          <StepNode
            number="1"
            title="Institution Details"
            subtitle="Completed"
            status={currentStep > 1 ? 'completed' : 'current'}
            onClick={() => setCurrentStep(1)}
          />
          <StepNode
            number="2"
            title="Document Upload"
            subtitle={currentStep === 2 ? 'Current Step' : currentStep > 2 ? 'Completed' : 'Pending'}
            status={currentStep === 2 ? 'current' : currentStep > 2 ? 'completed' : 'pending'}
            onClick={() => setCurrentStep(2)}
          />
          <StepNode
            number="3"
            title="Review & Submit"
            subtitle={currentStep === 3 ? 'Current Step' : 'Pending'}
            status={currentStep === 3 ? 'current' : 'pending'}
            onClick={() => setCurrentStep(3)}
          />
          <StepNode
            number="4"
            title="AI Validation"
            subtitle="Pending"
            status={currentStep === 4 ? 'current' : 'pending'}
            onClick={() => setCurrentStep(4)}
          />
          <StepNode
            number="5"
            title="Track Status"
            subtitle="Pending"
            status={currentStep === 5 ? 'current' : 'pending'}
            onClick={() => setCurrentStep(5)}
          />
        </div>
      </div>

      {/* Main Content Pane */}
      {currentStep === 1 ? (
        /* STEP 1: Institution Details */
        <div className="bg-white rounded-2xl p-6 border border-slate-200/80 shadow-xs space-y-6">
          <div className="flex items-center space-x-2 border-b border-slate-100 pb-4">
            <div className="w-8 h-8 rounded-lg bg-blue-50 text-blue-600 flex items-center justify-center">
              <FileText className="w-4 h-4" />
            </div>
            <div>
              <h2 className="text-base font-bold text-slate-800">Application Information</h2>
              <p className="text-xs text-slate-500">Fill in the primary details to start a new institutional application</p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
            <div>
              <label className="block font-semibold text-slate-700 mb-1">Application Type *</label>
              <select
                value={appType}
                onChange={(e) => setAppType(e.target.value)}
                className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-blue-500/20 focus:bg-white text-slate-800"
              >
                <option>Extension of Approval (EoA)</option>
                <option>New Institute / New Program Approval</option>
                <option>Increase in Intake / Additional Course</option>
                <option>Closure of Course / Institution</option>
              </select>
            </div>

            <div>
              <label className="block font-semibold text-slate-700 mb-1">Academic Year *</label>
              <select
                value={academicYear}
                onChange={(e) => setAcademicYear(e.target.value)}
                className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-blue-500/20 focus:bg-white text-slate-800"
              >
                <option>2026 - 2027</option>
                <option>2025 - 2026</option>
                <option>2024 - 2025</option>
              </select>
            </div>

            <div className="md:col-span-2">
              <label className="block font-semibold text-slate-700 mb-1">Institution Name *</label>
              <input
                type="text"
                value={institutionName}
                onChange={(e) => setInstitutionName(e.target.value)}
                className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-blue-500/20 focus:bg-white text-slate-800 font-medium"
              />
            </div>

            <div>
              <label className="block font-semibold text-slate-700 mb-1">Institution Type *</label>
              <select
                value={institutionType}
                onChange={(e) => setInstitutionType(e.target.value)}
                className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-blue-500/20 focus:bg-white text-slate-800"
              >
                <option>Private - Self Financed</option>
                <option>Government / Central Autonomous</option>
                <option>State Government Managed</option>
                <option>Deemed to be University</option>
              </select>
            </div>

            <div>
              <label className="block font-semibold text-slate-700 mb-1">AISHE / Permanent ID *</label>
              <input
                type="text"
                value={aisheCode}
                onChange={(e) => setAisheCode(e.target.value)}
                className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-blue-500/20 focus:bg-white text-slate-800 font-mono"
              />
            </div>

            <div>
              <label className="block font-semibold text-slate-700 mb-1">State *</label>
              <input
                type="text"
                value={state}
                onChange={(e) => setState(e.target.value)}
                className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-blue-500/20 focus:bg-white text-slate-800"
              />
            </div>

            <div>
              <label className="block font-semibold text-slate-700 mb-1">District / City *</label>
              <input
                type="text"
                value={district}
                onChange={(e) => setDistrict(e.target.value)}
                className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-blue-500/20 focus:bg-white text-slate-800"
              />
            </div>
          </div>

          <div className="flex justify-end pt-4 border-t border-slate-100">
            <button
              onClick={() => setCurrentStep(2)}
              className="px-6 py-2.5 bg-blue-600 hover:bg-blue-700 text-white font-semibold text-xs rounded-xl shadow-xs transition"
            >
              Continue to Document Upload →
            </button>
          </div>
        </div>
      ) : (
        /* STEP 2: Document Upload & Live Pre-check (Replicates Image 2 & 3 side-by-side) */
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          {/* Left Column: Form Info, Uploaded Documents & Dropzone (7 cols) */}
          <div className="lg:col-span-7 space-y-6">
            {/* Application Information Summary Header */}
            <div className="bg-white rounded-2xl p-5 border border-slate-200/80 shadow-xs space-y-3">
              <div className="flex items-center justify-between border-b border-slate-100 pb-3">
                <div className="flex items-center space-x-2">
                  <FileText className="w-4 h-4 text-blue-600" />
                  <span className="text-sm font-bold text-slate-800">Application Information</span>
                </div>
                <button
                  onClick={() => setCurrentStep(1)}
                  className="text-xs text-blue-600 hover:text-blue-700 font-semibold"
                >
                  Edit Details
                </button>
              </div>

              <div className="grid grid-cols-2 gap-3 text-xs">
                <div>
                  <span className="text-slate-400">Application Type:</span>
                  <p className="font-bold text-slate-800">{appType}</p>
                </div>
                <div>
                  <span className="text-slate-400">Academic Year:</span>
                  <p className="font-bold text-slate-800">{academicYear}</p>
                </div>
                <div className="col-span-2">
                  <span className="text-slate-400">Institution Name:</span>
                  <p className="font-bold text-slate-800">{institutionName}</p>
                </div>
              </div>

              {/* Badges row matching Image 2 */}
              <div className="flex flex-wrap gap-1.5 pt-2">
                <span className="px-2.5 py-1 bg-blue-50 text-blue-700 font-bold text-[10px] rounded-md border border-blue-200/60">
                  Engineering
                </span>
                <span className="px-2.5 py-1 bg-emerald-50 text-emerald-700 font-bold text-[10px] rounded-md border border-emerald-200/60">
                  Existing Institution
                </span>
                <span className="px-2.5 py-1 bg-purple-50 text-purple-700 font-bold text-[10px] rounded-md border border-purple-200/60">
                  Private Self Financing
                </span>
                <span className="px-2.5 py-1 bg-amber-50 text-amber-700 font-bold text-[10px] rounded-md border border-amber-200/60">
                  Technical Education
                </span>
              </div>
            </div>

            {/* Document Upload Dropzone */}
            <div className="bg-white rounded-2xl p-5 border border-slate-200/80 shadow-xs space-y-4">
              <div>
                <h3 className="text-sm font-bold text-slate-800">Upload Required Documents</h3>
                <p className="text-xs text-slate-500">
                  Upload all mandatory documents as per AICTE guidelines. Supported formats: PDF, JPG, PNG (Max 10MB each)
                </p>
              </div>

              <div className="border-2 border-dashed border-blue-300 bg-blue-50/30 rounded-2xl p-6 text-center">
                <Upload className="w-10 h-10 text-blue-500 mx-auto mb-2" />
                <p className="text-xs font-bold text-slate-700">Drag & Drop your documents here</p>
                <p className="text-[11px] text-slate-400 my-1">or</p>
                <label className="inline-block px-5 py-2 bg-blue-600 hover:bg-blue-700 text-white font-semibold text-xs rounded-xl shadow-xs cursor-pointer transition">
                  <span>Choose Files</span>
                  <input
                    type="file"
                    onChange={(e) => handleFileUpload(selectedDoc.id, e)}
                    className="hidden"
                    accept=".pdf,.png,.jpg,.jpeg"
                  />
                </label>
              </div>
            </div>

            {/* Uploaded Documents List Table (Matches Image 2 & 3) */}
            <div className="bg-white rounded-2xl p-5 border border-slate-200/80 shadow-xs space-y-3">
              <div className="flex items-center justify-between">
                <h3 className="text-sm font-bold text-slate-800">
                  Uploaded Documents ({documents.filter((d) => d.status !== 'Not Uploaded').length}/{documents.length})
                </h3>
                <button
                  onClick={() => alert('Downloading official AICTE checklist PDF...')}
                  className="flex items-center space-x-1 text-xs text-blue-600 hover:text-blue-700 font-semibold"
                >
                  <Download className="w-3.5 h-3.5" />
                  <span>Download Checklist</span>
                </button>
              </div>

              <div className="overflow-x-auto">
                <table className="w-full text-left text-xs">
                  <thead>
                    <tr className="border-b border-slate-100 text-slate-400 font-semibold">
                      <th className="pb-2 w-8">#</th>
                      <th className="pb-2">Document Name</th>
                      <th className="pb-2">File Name</th>
                      <th className="pb-2">Size</th>
                      <th className="pb-2">Status</th>
                      <th className="pb-2 text-center">AI Check</th>
                      <th className="pb-2 text-right">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100">
                    {documents.map((doc, index) => {
                      const isSelected = doc.id === previewDocId;
                      return (
                        <tr
                          key={doc.id}
                          onClick={() => setPreviewDocId(doc.id)}
                          className={`cursor-pointer transition ${
                            isSelected ? 'bg-blue-50/70 font-semibold' : 'hover:bg-slate-50'
                          }`}
                        >
                          <td className="py-2.5 text-slate-400 font-mono">{index + 1}</td>
                          <td className="py-2.5 font-bold text-slate-800">{doc.name}</td>
                          <td className="py-2.5 text-slate-500 font-mono text-[11px]">{doc.fileName || '-'}</td>
                          <td className="py-2.5 text-slate-400">{doc.size || '-'}</td>
                          <td className="py-2.5">
                            <span
                              className={`inline-block px-2 py-0.5 text-[10px] font-bold rounded-md ${
                                doc.status === 'Verified'
                                  ? 'bg-emerald-50 text-emerald-700'
                                  : doc.status === 'Needs Update'
                                  ? 'bg-rose-50 text-rose-700'
                                  : doc.status === 'In Review'
                                  ? 'bg-amber-50 text-amber-700'
                                  : doc.status === 'Not Uploaded'
                                  ? 'bg-slate-100 text-slate-500'
                                  : 'bg-blue-50 text-blue-700'
                              }`}
                            >
                              {doc.status}
                            </span>
                          </td>
                          <td className="py-2.5 text-center">
                            {doc.status === 'Not Uploaded' ? (
                              <label className="px-2 py-1 bg-blue-600 hover:bg-blue-700 text-white text-[10px] font-bold rounded-md cursor-pointer transition">
                                Upload
                                <input
                                  type="file"
                                  onChange={(e) => handleFileUpload(doc.id, e)}
                                  className="hidden"
                                  accept=".pdf,.png,.jpg,.jpeg"
                                />
                              </label>
                            ) : doc.aiCheck === 'verified' ? (
                              <Check className="w-4 h-4 text-emerald-500 inline" />
                            ) : doc.aiCheck === 'warning' ? (
                              <AlertTriangle className="w-4 h-4 text-amber-500 inline" />
                            ) : (
                              <Clock className="w-4 h-4 text-blue-500 inline animate-spin" />
                            )}
                          </td>
                          <td className="py-2.5 text-right">
                            <button
                              onClick={(e) => {
                                e.stopPropagation();
                                onOpenDocumentPreview(doc.id);
                              }}
                              className="p-1 text-slate-400 hover:text-blue-600 rounded-lg hover:bg-slate-200/60 transition inline-block mr-1"
                              title="Full Screen Preview"
                            >
                              <Eye className="w-3.5 h-3.5" />
                            </button>
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>
            </div>
          </div>

          {/* Right Column: Selected Document Preview & Checklist Summary (5 cols - Replicates Image 3) */}
          <div className="lg:col-span-5 space-y-6">
            {/* AICTE Document Checklist Counters (Matches Image 3) */}
            <div className="bg-white rounded-2xl p-5 border border-slate-200/80 shadow-xs space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold text-slate-800">AICTE Document Checklist (2024-27)</span>
                <span className="text-[11px] text-blue-600 hover:text-blue-700 font-semibold cursor-pointer">
                  View Guidelines ↗
                </span>
              </div>

              <div className="grid grid-cols-4 gap-2 text-center text-xs">
                <div className="bg-emerald-50 border border-emerald-200/80 rounded-xl p-2.5">
                  <p className="text-emerald-700 font-black text-sm">8/10</p>
                  <p className="text-[10px] text-emerald-600 font-semibold">Uploaded</p>
                </div>
                <div className="bg-amber-50 border border-amber-200/80 rounded-xl p-2.5">
                  <p className="text-amber-700 font-black text-sm">2</p>
                  <p className="text-[10px] text-amber-600 font-semibold">Pending</p>
                </div>
                <div className="bg-rose-50 border border-rose-200/80 rounded-xl p-2.5">
                  <p className="text-rose-700 font-black text-sm">0</p>
                  <p className="text-[10px] text-rose-600 font-semibold">Expired</p>
                </div>
                <div className="bg-purple-50 border border-purple-200/80 rounded-xl p-2.5">
                  <p className="text-purple-700 font-black text-sm">1</p>
                  <p className="text-[10px] text-purple-600 font-semibold">Optional</p>
                </div>
              </div>
            </div>

            {/* Selected Document Preview Panel (Matches Image 3) */}
            <div className="bg-white rounded-2xl p-5 border border-slate-200/80 shadow-xs space-y-4">
              <div className="flex items-center justify-between border-b border-slate-100 pb-3">
                <span className="text-sm font-bold text-slate-800">Selected Document Preview</span>
                <button
                  onClick={() => onOpenDocumentPreview(selectedDoc.id)}
                  className="text-xs text-blue-600 hover:text-blue-700 font-semibold flex items-center space-x-1"
                >
                  <Maximize2 className="w-3.5 h-3.5" />
                  <span>Enlarge</span>
                </button>
              </div>

              {/* Realistic Document Render (Certificate / Deed / Affidavit) */}
              <div className="bg-slate-900 rounded-xl p-3 border border-slate-800 flex flex-col items-center">
                <div className="w-full bg-white text-slate-800 rounded-lg p-5 shadow-lg border border-slate-200 text-center font-serif text-[11px] leading-relaxed relative min-h-[280px] flex flex-col justify-between">
                  {/* Emblem motif */}
                  <div className="flex flex-col items-center">
                    <div className="w-8 h-8 rounded-full border border-amber-500/60 bg-amber-50 flex items-center justify-center text-amber-700 font-bold text-[9px] mb-1">
                      सत्यमेव जयते
                    </div>
                    <p className="text-[10px] font-bold tracking-widest uppercase text-slate-700">
                      Rungta College of Engineering and Technology
                    </p>
                    <p className="text-xs font-black tracking-wide text-blue-900 border-b border-slate-300 pb-1 mt-0.5">
                      {selectedDoc.type || 'LAND OWNERSHIP CERTIFICATE'}
                    </p>
                  </div>

                  {/* Body text */}
                  <div className="my-2 text-[9px] text-slate-600 text-left font-mono space-y-1 bg-slate-50 p-2.5 rounded border border-slate-200">
                    <p>
                      <strong>Application ID:</strong> VERIX-2025-00124
                    </p>
                    <p>
                      <strong>Institution:</strong> RCET Bhilai (C-12345)
                    </p>
                    <p>
                      <strong>Location:</strong> Kohka, Durg, Chhattisgarh
                    </p>
                    <p>
                      <strong>Document Ref:</strong> {selectedDoc.fileName || 'Land_Deed.pdf'}
                    </p>
                  </div>

                  {/* Simulated Seal & Signatures */}
                  <div className="flex items-center justify-between pt-2 border-t border-slate-200">
                    <div className="w-12 h-12 rounded-full border-2 border-dashed border-blue-600 flex items-center justify-center text-blue-700 text-[8px] font-sans font-bold transform -rotate-12">
                      REGISTRAR SEAL
                    </div>
                    <div className="text-right">
                      <div className="w-16 h-4 border-b border-slate-500 font-cursive text-[10px] text-slate-600">
                        Sanjeet K.
                      </div>
                      <p className="text-[8px] text-slate-500 font-sans">Authorized Signatory</p>
                    </div>
                  </div>
                </div>

                {/* Document Viewer Toolbar */}
                <div className="w-full flex items-center justify-between text-slate-400 text-xs px-2 pt-3">
                  <span>1 / 3 Pages</span>
                  <div className="flex items-center space-x-3">
                    <button className="hover:text-white" title="Zoom Out">
                      <ZoomOut className="w-3.5 h-3.5" />
                    </button>
                    <span>100%</span>
                    <button className="hover:text-white" title="Zoom In">
                      <ZoomIn className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>
              </div>

              {/* Document Metadata Card */}
              <div className="bg-slate-50 rounded-xl p-3 border border-slate-100 text-xs space-y-1.5">
                <div className="flex justify-between">
                  <span className="text-slate-500">File Name:</span>
                  <span className="font-bold text-slate-800 truncate ml-2">{selectedDoc.fileName || selectedDoc.name}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-500">Document Type:</span>
                  <span className="font-semibold text-slate-700">{selectedDoc.type}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-500">File Size:</span>
                  <span className="text-slate-600 font-mono">{selectedDoc.size || '2.4 MB'}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-500">Status:</span>
                  <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-emerald-100 text-emerald-800">
                    {selectedDoc.status}
                  </span>
                </div>
              </div>

              {/* AI Pre-check Result (Matches Image 3) */}
              <div className="bg-emerald-50/70 rounded-xl p-4 border border-emerald-200/80 space-y-2.5">
                <div className="flex items-center space-x-2 text-emerald-800 font-bold text-xs">
                  <Check className="w-4 h-4 text-emerald-600" />
                  <span>AI Pre-check Result: Valid Document</span>
                </div>

                <div className="space-y-1 text-xs text-slate-700">
                  <div className="flex items-center space-x-2">
                    <Check className="w-3.5 h-3.5 text-emerald-600" />
                    <span>Readable text detected</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Check className="w-3.5 h-3.5 text-emerald-600" />
                    <span>Document type matched</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Check className="w-3.5 h-3.5 text-emerald-600" />
                    <span>No tampering detected</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Check className="w-3.5 h-3.5 text-emerald-600" />
                    <span>All required fields found</span>
                  </div>
                </div>
              </div>

              {/* Advisory note */}
              <div className="bg-amber-50 rounded-xl p-3 border border-amber-200/80 flex items-start space-x-2 text-xs text-amber-800">
                <Info className="w-4 h-4 text-amber-600 shrink-0 mt-0.5" />
                <p className="text-[11px] leading-relaxed">
                  Final verification will be performed during AI validation based on AICTE records and official sources.
                </p>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Bottom Sticky Action Bar (Matches Image 2 & 3) */}
      <div className="bg-white rounded-2xl p-4 border border-slate-200/80 shadow-xs flex items-center justify-between">
        <button
          onClick={() => setCurrentStep(Math.max(1, currentStep - 1))}
          className="px-5 py-2.5 rounded-xl border border-slate-200 text-slate-700 hover:bg-slate-50 font-semibold text-xs transition flex items-center space-x-1.5"
        >
          <ArrowLeft className="w-3.5 h-3.5" />
          <span>Back</span>
        </button>

        <button
          onClick={handleSubmitApplication}
          className="px-6 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-semibold text-xs shadow-md transition flex items-center space-x-1.5"
        >
          <span>Save & Continue</span>
          <span className="text-base font-normal">→</span>
        </button>
      </div>
    </div>
  );
};

const StepNode: React.FC<{
  number: string;
  title: string;
  subtitle: string;
  status: 'completed' | 'current' | 'pending';
  onClick: () => void;
}> = ({ number, title, subtitle, status, onClick }) => {
  return (
    <button onClick={onClick} className="flex flex-col items-center relative z-10 text-center group">
      <div
        className={`w-9 h-9 rounded-full flex items-center justify-center font-bold text-xs transition duration-200 ${
          status === 'completed'
            ? 'bg-emerald-500 text-white shadow-xs'
            : status === 'current'
            ? 'bg-blue-600 text-white shadow-md ring-4 ring-blue-100'
            : 'bg-white border-2 border-slate-300 text-slate-400 group-hover:border-slate-400'
        }`}
      >
        {status === 'completed' ? <Check className="w-4 h-4 text-white" /> : number}
      </div>
      <p
        className={`text-xs font-bold mt-2 ${
          status === 'current' ? 'text-blue-600' : status === 'completed' ? 'text-slate-800' : 'text-slate-400'
        }`}
      >
        {title}
      </p>
      <p
        className={`text-[10px] ${
          status === 'completed'
            ? 'text-emerald-600 font-semibold'
            : status === 'current'
            ? 'text-blue-500 font-semibold'
            : 'text-slate-400'
        }`}
      >
        {subtitle}
      </p>
    </button>
  );
};
