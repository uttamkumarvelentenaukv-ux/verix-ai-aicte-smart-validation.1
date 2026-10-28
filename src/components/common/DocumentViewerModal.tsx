import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { X, ZoomIn, ZoomOut, Download, ShieldCheck, Check, AlertTriangle, FileText, Printer } from 'lucide-react';

interface Props {
  documentId: string | null;
  onClose: () => void;
}

export const DocumentViewerModal: React.FC<Props> = ({ documentId, onClose }) => {
  const { documents, applications, findings } = useApp();
  const [zoomLevel, setZoomLevel] = useState<number>(100);

  if (!documentId) return null;
  const doc = documents.find((d) => d.id === documentId) || documents[0];
  const relatedFindings = findings.filter((f) => f.documentId === doc.id);

  return (
    <div className="fixed inset-0 z-50 bg-slate-950/75 backdrop-blur-xs flex items-center justify-center p-4">
      <div className="bg-white rounded-3xl max-w-4xl w-full max-h-[92vh] flex flex-col shadow-2xl border border-slate-200 overflow-hidden animate-in fade-in zoom-in-95">
        {/* Header */}
        <div className="px-6 py-4 bg-slate-900 text-white flex items-center justify-between border-b border-slate-800">
          <div className="flex items-center space-x-3">
            <div className="w-9 h-9 rounded-xl bg-blue-600/30 border border-blue-500/40 flex items-center justify-center text-blue-400">
              <FileText className="w-5 h-5" />
            </div>
            <div>
              <p className="font-bold text-sm text-white">{doc.fileName || doc.name}</p>
              <p className="text-xs text-slate-400">
                {doc.type} • {doc.size || '2.4 MB'} • AI Check: {doc.status}
              </p>
            </div>
          </div>

          <div className="flex items-center space-x-3">
            <button
              onClick={() => alert(`Downloaded copy of ${doc.fileName || 'document.pdf'}`)}
              className="p-2 text-slate-300 hover:text-white hover:bg-slate-800 rounded-lg transition"
              title="Download file"
            >
              <Download className="w-4 h-4" />
            </button>
            <button
              onClick={onClose}
              className="p-2 text-slate-400 hover:text-white hover:bg-slate-800 rounded-lg transition"
              title="Close modal"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Content Body: Split View */}
        <div className="flex-1 overflow-y-auto grid grid-cols-1 md:grid-cols-12 gap-6 p-6 bg-slate-100">
          {/* Document Canvas (7 cols) */}
          <div className="md:col-span-7 flex flex-col items-center">
            {/* Toolbar */}
            <div className="w-full flex items-center justify-between px-3 py-2 bg-white rounded-t-xl border border-slate-200 text-xs text-slate-600 font-semibold">
              <span>Page 1 of 3</span>
              <div className="flex items-center space-x-2">
                <button
                  onClick={() => setZoomLevel(Math.max(70, zoomLevel - 15))}
                  className="p-1 hover:bg-slate-100 rounded"
                  title="Zoom Out"
                >
                  <ZoomOut className="w-4 h-4" />
                </button>
                <span>{zoomLevel}%</span>
                <button
                  onClick={() => setZoomLevel(Math.min(150, zoomLevel + 15))}
                  className="p-1 hover:bg-slate-100 rounded"
                  title="Zoom In"
                >
                  <ZoomIn className="w-4 h-4" />
                </button>
              </div>
            </div>

            {/* Document Render Surface */}
            <div
              className="w-full bg-white rounded-b-xl border border-t-0 border-slate-200 p-8 shadow-md font-serif text-[11px] leading-relaxed relative flex flex-col justify-between transition-all"
              style={{ minHeight: '440px', transform: `scale(${zoomLevel / 100})`, transformOrigin: 'top center' }}
            >
              {/* Top Seal & Heading */}
              <div className="text-center border-b border-slate-200 pb-4">
                <div className="w-10 h-10 mx-auto rounded-full border border-amber-600/40 bg-amber-50 flex items-center justify-center text-amber-800 font-sans font-bold text-[9px] mb-1">
                  सत्यमेव जयते
                </div>
                <h3 className="font-sans font-black text-xs text-blue-950 uppercase tracking-widest">
                  ALL INDIA COUNCIL FOR TECHNICAL EDUCATION
                </h3>
                <p className="text-[10px] font-sans text-slate-500">Statutory Scrutiny & Regulatory Submission Record</p>
                <p className="text-xs font-bold text-slate-800 font-serif mt-2 underline uppercase">
                  {doc.type}
                </p>
              </div>

              {/* Extracted Certificate Content */}
              <div className="my-4 bg-slate-50 p-4 rounded-xl border border-slate-200 font-mono text-[11px] space-y-2 text-slate-800">
                <p>
                  <strong>Institution:</strong> Rungta College of Engineering and Technology
                </p>
                <p>
                  <strong>AISHE Code:</strong> C-12345 · Durg, Chhattisgarh
                </p>
                {doc.extractedFields &&
                  Object.entries(doc.extractedFields).map(([k, v]) => (
                    <p key={k}>
                      <strong>{k}:</strong> {String(v)}
                    </p>
                  ))}
              </div>

              {/* Signatures & Stamps */}
              <div className="pt-4 border-t border-slate-200 flex items-center justify-between">
                <div className="w-16 h-16 rounded-full border-2 border-dashed border-blue-600 flex items-center justify-center text-blue-700 font-sans font-black text-[9px] transform -rotate-12">
                  VERIFIED SEAL
                </div>
                <div className="text-right">
                  <div className="w-24 border-b border-slate-500 font-cursive text-sm text-slate-700">
                    Sanjeet Kumar
                  </div>
                  <p className="text-[9px] text-slate-500 font-sans mt-0.5">Authorized Institutional Signatory</p>
                </div>
              </div>
            </div>
          </div>

          {/* Right Information & Pre-check (5 cols) */}
          <div className="md:col-span-5 space-y-4">
            {/* AI Pre-check Verification Card */}
            <div className="bg-white rounded-2xl p-4 border border-slate-200 shadow-xs space-y-3 text-xs">
              <div className="flex items-center space-x-2 text-emerald-800 font-bold border-b border-slate-100 pb-2">
                <ShieldCheck className="w-4 h-4 text-emerald-600" />
                <span>AI Automated Pre-check Evaluation</span>
              </div>

              <div className="space-y-1.5 text-slate-700">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    <Check className="w-3.5 h-3.5 text-emerald-600" />
                    <span>Readable text extracted</span>
                  </div>
                  <span className="font-bold text-emerald-700">98.4%</span>
                </div>
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    <Check className="w-3.5 h-3.5 text-emerald-600" />
                    <span>Document classification match</span>
                  </div>
                  <span className="font-bold text-emerald-700">Passed</span>
                </div>
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    {doc.status === 'Needs Update' ? (
                      <AlertTriangle className="w-3.5 h-3.5 text-amber-500" />
                    ) : (
                      <Check className="w-3.5 h-3.5 text-emerald-600" />
                    )}
                    <span>Tamper & signature validation</span>
                  </div>
                  <span className="font-bold text-slate-800">
                    {doc.status === 'Needs Update' ? 'Advisory Alert' : 'Verified'}
                  </span>
                </div>
              </div>
            </div>

            {/* Findings related to this document */}
            {relatedFindings.length > 0 && (
              <div className="bg-amber-50 rounded-2xl p-4 border border-amber-200 space-y-2 text-xs">
                <div className="flex items-center space-x-2 text-amber-900 font-bold">
                  <AlertTriangle className="w-4 h-4 text-amber-600" />
                  <span>Regulatory Advisory Finding</span>
                </div>
                {relatedFindings.map((f) => (
                  <div key={f.id} className="space-y-1">
                    <p className="font-bold text-slate-800">{f.title}</p>
                    <p className="text-[11px] text-slate-600 leading-relaxed">{f.description}</p>
                    <p className="text-[10px] text-amber-800 font-mono">Clause: {f.clauseReference}</p>
                  </div>
                ))}
              </div>
            )}

            {/* File Properties */}
            <div className="bg-white rounded-2xl p-4 border border-slate-200 shadow-xs space-y-2 text-xs">
              <span className="font-bold text-slate-800 block border-b border-slate-100 pb-1">
                Cryptographic & Storage Metadata
              </span>
              <div className="space-y-1 text-slate-600">
                <p>
                  <strong>SHA-256 Hash:</strong> <span className="font-mono text-[10px]">7f83b1657ff1...a932</span>
                </p>
                <p>
                  <strong>Upload Timestamp:</strong> {doc.uploadDate || '12 Oct 2026, 10:45 AM'}
                </p>
                <p>
                  <strong>AICTE Storage:</strong> Cloud Firestore Encrypted Store
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
