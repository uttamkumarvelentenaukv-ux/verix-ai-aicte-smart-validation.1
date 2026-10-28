import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import {
  Search,
  Filter,
  FileText,
  Upload,
  Eye,
  Check,
  AlertTriangle,
  Clock,
  Download,
  ShieldCheck,
} from 'lucide-react';

interface Props {
  onOpenDocumentPreview: (docId: string) => void;
}

export const DocumentCentreView: React.FC<Props> = ({ onOpenDocumentPreview }) => {
  const { documents, uploadDocumentItem } = useApp();
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');

  const filteredDocs = documents.filter((doc) => {
    const matchesSearch =
      doc.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      doc.fileName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      doc.type.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus =
      statusFilter === 'all' || doc.status.toLowerCase().replace(' ', '_') === statusFilter;
    return matchesSearch && matchesStatus;
  });

  const handleFileUpload = (docId: string, e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      uploadDocumentItem(docId, file.name, `${(file.size / (1024 * 1024)).toFixed(1)} MB`);
    }
  };

  return (
    <div className="max-w-7xl mx-auto space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-black text-slate-800 tracking-tight">Document Centre</h1>
          <p className="text-xs text-slate-500">
            Repository of institutional supporting documents, OCR extractions, and verification statuses.
          </p>
        </div>

        <button
          onClick={() => alert('Checklist template downloaded')}
          className="flex items-center space-x-1.5 px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-xl text-xs font-semibold shadow-xs transition"
        >
          <Download className="w-3.5 h-3.5" />
          <span>Download All Checklists</span>
        </button>
      </div>

      {/* Filter and Search Bar */}
      <div className="bg-white rounded-2xl p-4 border border-slate-200/80 shadow-xs flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs">
        <div className="relative flex-1 max-w-sm">
          <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none" />
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Search documents by name, type, or file..."
            className="w-full pl-9 pr-3 py-2 bg-slate-50 border border-slate-200 rounded-xl focus:bg-white"
          />
        </div>

        <div className="flex items-center space-x-2">
          <Filter className="w-4 h-4 text-slate-400" />
          <span className="text-slate-500 font-medium">Status:</span>
          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="px-3 py-1.5 bg-slate-50 border border-slate-200 rounded-xl text-slate-700 font-semibold"
          >
            <option value="all">All Documents</option>
            <option value="verified">Verified</option>
            <option value="needs_update">Needs Update</option>
            <option value="in_review">In Review</option>
            <option value="not_uploaded">Not Uploaded</option>
          </select>
        </div>
      </div>

      {/* Documents Grid / Table */}
      <div className="bg-white rounded-2xl p-5 border border-slate-200/80 shadow-xs">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead>
              <tr className="border-b border-slate-100 text-slate-400 font-semibold">
                <th className="pb-3">Document Name</th>
                <th className="pb-3">Type</th>
                <th className="pb-3">Uploaded File</th>
                <th className="pb-3">Size</th>
                <th className="pb-3">Status</th>
                <th className="pb-3 text-center">AI Extraction</th>
                <th className="pb-3 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {filteredDocs.map((doc) => (
                <tr key={doc.id} className="hover:bg-slate-50/70 transition">
                  <td className="py-3 font-bold text-slate-800 flex items-center space-x-2">
                    <FileText className="w-4 h-4 text-blue-600 shrink-0" />
                    <span>{doc.name}</span>
                  </td>
                  <td className="py-3 text-slate-600">{doc.type}</td>
                  <td className="py-3 font-mono text-[11px] text-slate-500">{doc.fileName || '-'}</td>
                  <td className="py-3 text-slate-400">{doc.size || '-'}</td>
                  <td className="py-3">
                    <span
                      className={`inline-block px-2 py-0.5 rounded text-[10px] font-bold ${
                        doc.status === 'Verified'
                          ? 'bg-emerald-50 text-emerald-700'
                          : doc.status === 'Needs Update'
                          ? 'bg-rose-50 text-rose-700'
                          : doc.status === 'In Review'
                          ? 'bg-amber-50 text-amber-700'
                          : 'bg-slate-100 text-slate-500'
                      }`}
                    >
                      {doc.status}
                    </span>
                  </td>
                  <td className="py-3 text-center">
                    {doc.status === 'Verified' ? (
                      <span className="inline-flex items-center text-emerald-600 font-bold text-[11px]">
                        <Check className="w-3.5 h-3.5 mr-1" />
                        Valid
                      </span>
                    ) : doc.status === 'Needs Update' ? (
                      <span className="inline-flex items-center text-amber-600 font-bold text-[11px]">
                        <AlertTriangle className="w-3.5 h-3.5 mr-1" />
                        Flagged
                      </span>
                    ) : (
                      <span className="text-slate-400">Pending</span>
                    )}
                  </td>
                  <td className="py-3 text-right space-x-1.5">
                    <button
                      onClick={() => onOpenDocumentPreview(doc.id)}
                      className="p-1.5 hover:bg-slate-100 rounded-lg text-slate-600 hover:text-blue-600 transition inline-block"
                      title="Inspect Document"
                    >
                      <Eye className="w-4 h-4" />
                    </button>
                    <label className="p-1.5 hover:bg-slate-100 rounded-lg text-slate-600 hover:text-blue-600 transition inline-block cursor-pointer">
                      <Upload className="w-4 h-4" />
                      <input
                        type="file"
                        onChange={(e) => handleFileUpload(doc.id, e)}
                        className="hidden"
                        accept=".pdf,.png,.jpg,.jpeg"
                      />
                    </label>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};
