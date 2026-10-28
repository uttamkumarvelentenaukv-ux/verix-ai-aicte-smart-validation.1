import React from 'react';
import { useApp } from '../../context/AppContext';
import { X, Printer, Download, CheckCircle2, AlertTriangle, ShieldCheck } from 'lucide-react';

interface Props {
  onClose: () => void;
}

export const ComplianceReportModal: React.FC<Props> = ({ onClose }) => {
  const { applications, selectedApplicationId, findings, documents } = useApp();
  const app = applications.find((a) => a.id === selectedApplicationId) || applications[0];

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="fixed inset-0 z-50 bg-slate-900/70 backdrop-blur-xs flex items-center justify-center p-4">
      <div className="bg-white rounded-3xl max-w-3xl w-full max-h-[92vh] flex flex-col shadow-2xl border border-slate-200 overflow-hidden animate-in fade-in zoom-in-95">
        {/* Modal Top Bar */}
        <div className="px-6 py-4 bg-slate-900 text-white flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <ShieldCheck className="w-5 h-5 text-blue-400" />
            <span className="font-black text-sm">AICTE Preliminary Validation & Compliance Report</span>
          </div>

          <div className="flex items-center space-x-3">
            <button
              onClick={handlePrint}
              className="flex items-center space-x-1.5 px-3 py-1.5 bg-slate-800 hover:bg-slate-700 text-slate-200 rounded-lg text-xs font-semibold transition"
            >
              <Printer className="w-3.5 h-3.5" />
              <span>Print Report</span>
            </button>
            <button
              onClick={() => alert('Downloading official AICTE Compliance Report PDF...')}
              className="flex items-center space-x-1.5 px-3 py-1.5 bg-blue-600 hover:bg-blue-500 text-white rounded-lg text-xs font-semibold transition"
            >
              <Download className="w-3.5 h-3.5" />
              <span>Download PDF</span>
            </button>
            <button onClick={onClose} className="p-1 hover:bg-slate-800 text-slate-400 hover:text-white rounded-lg">
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Printable Report Content */}
        <div className="flex-1 overflow-y-auto p-8 font-sans space-y-6 text-slate-800 bg-white">
          {/* Header */}
          <div className="text-center border-b-2 border-slate-800 pb-4">
            <div className="w-12 h-12 mx-auto rounded-full bg-amber-50 border border-amber-600/40 flex items-center justify-center text-amber-800 font-bold text-[10px] mb-1">
              AICTE
            </div>
            <h2 className="text-lg font-black tracking-wide text-blue-950 uppercase">
              ALL INDIA COUNCIL FOR TECHNICAL EDUCATION
            </h2>
            <p className="text-xs text-slate-600 font-medium">Nelson Mandela Marg, Vasant Kunj, New Delhi-110070</p>
            <p className="text-xs font-bold text-slate-700 mt-2 bg-slate-100 py-1 rounded inline-block px-4">
              PRELIMINARY SCRUTINY COMPLIANCE REPORT (APH 2024-27)
            </p>
          </div>

          {/* Institutional Metadata Grid */}
          <div className="grid grid-cols-2 gap-3 text-xs bg-slate-50 p-4 rounded-xl border border-slate-200">
            <div>
              <span className="text-slate-500">Application Reference:</span>
              <p className="font-bold font-mono text-slate-800">{app.referenceNumber}</p>
            </div>
            <div>
              <span className="text-slate-500">Submission Date:</span>
              <p className="font-bold text-slate-800">{app.submissionDate}</p>
            </div>
            <div>
              <span className="text-slate-500">Institution Name:</span>
              <p className="font-bold text-slate-800">{app.institutionName}</p>
            </div>
            <div>
              <span className="text-slate-500">AISHE / Permanent ID:</span>
              <p className="font-bold font-mono text-slate-800">{app.aisheCode}</p>
            </div>
            <div>
              <span className="text-slate-500">Application Category:</span>
              <p className="font-bold text-slate-800">{app.category}</p>
            </div>
            <div>
              <span className="text-slate-500">Academic Cycle:</span>
              <p className="font-bold text-slate-800">{app.academicYear}</p>
            </div>
          </div>

          {/* Validation Score & Breakdown */}
          <div className="border border-slate-200 rounded-xl p-4 flex items-center justify-between bg-emerald-50/40">
            <div>
              <p className="text-xs font-bold text-slate-600">Overall Preliminary Compliance Score</p>
              <p className="text-3xl font-black text-emerald-700 mt-0.5">{app.complianceScore}%</p>
              <p className="text-[11px] text-emerald-800 font-medium mt-1">Status: Eligible for Statutory Scrutiny</p>
            </div>
            <div className="text-right text-xs space-y-1">
              <p>
                Valid Documents: <strong>{app.validDocs}</strong>
              </p>
              <p>
                Minor Advisory Issues: <strong>{app.minorIssues}</strong>
              </p>
              <p>
                Major Verification Flags: <strong>{app.majorIssues}</strong>
              </p>
            </div>
          </div>

          {/* Findings Table */}
          <div className="space-y-2">
            <h3 className="text-xs font-bold text-slate-800 uppercase tracking-wider">
              Scrutiny Findings & Observations
            </h3>
            <table className="w-full text-left text-xs border border-slate-200 rounded-lg overflow-hidden">
              <thead className="bg-slate-100 text-slate-600">
                <tr>
                  <th className="p-2.5">Rule / Finding</th>
                  <th className="p-2.5">Severity</th>
                  <th className="p-2.5">Clause Reference</th>
                  <th className="p-2.5">Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-200">
                {findings.map((f) => (
                  <tr key={f.id} className="text-[11px]">
                    <td className="p-2.5">
                      <p className="font-bold text-slate-800">{f.title}</p>
                      <p className="text-slate-500 text-[10px]">{f.description}</p>
                    </td>
                    <td className="p-2.5 font-bold">
                      <span className={f.severity === 'Major' ? 'text-rose-600' : 'text-amber-600'}>
                        {f.severity}
                      </span>
                    </td>
                    <td className="p-2.5 font-mono text-slate-600">{f.clauseReference || 'AICTE APH 2024-27'}</td>
                    <td className="p-2.5 font-semibold text-slate-700">{f.status}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Statutory Advisory Notice */}
          <div className="p-3 bg-amber-50 border border-amber-200 rounded-xl text-[10px] text-amber-900 leading-relaxed">
            <strong>Statutory Legal Disclaimer:</strong> This preliminary compliance report is generated by VERIX AI to assist the statutory Scrutiny Committee of AICTE. Automated validation flags represent preliminary analytical findings and do not constitute proof of fraud or regulatory refusal. Final decision rests solely with authorized AICTE officials.
          </div>

          {/* Signatures */}
          <div className="pt-8 border-t border-slate-200 grid grid-cols-2 gap-8 text-center text-xs">
            <div>
              <div className="w-32 mx-auto border-b border-slate-400 pb-8 text-slate-400 font-mono text-[10px]">
                [Digital Signature Verified]
              </div>
              <p className="font-bold text-slate-800 mt-2">Sanjeet Kumar</p>
              <p className="text-[10px] text-slate-500">Registrar, Applicant Institution</p>
            </div>
            <div>
              <div className="w-32 mx-auto border-b border-slate-400 pb-8 text-slate-400 font-mono text-[10px]">
                [Official AICTE Stamp]
              </div>
              <p className="font-bold text-slate-800 mt-2">Reviewer 01</p>
              <p className="text-[10px] text-slate-500">AICTE Regulatory Scrutiny Official</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
