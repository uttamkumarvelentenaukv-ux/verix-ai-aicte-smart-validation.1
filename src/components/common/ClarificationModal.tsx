import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { X, MessageSquare, Send, ShieldAlert, FileText } from 'lucide-react';

interface Props {
  applicationId: string;
  documentName: string;
  onClose: () => void;
}

export const ClarificationModal: React.FC<Props> = ({ applicationId, documentName, onClose }) => {
  const { createClarification, applications } = useApp();
  const [requestText, setRequestText] = useState('');

  const targetApp = applications.find((a) => a.id === applicationId) || applications[0];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!requestText.trim()) return;
    createClarification(applicationId, documentName, requestText);
    alert(`Clarification notice dispatched to ${targetApp.institutionName}. Logged to audit trail.`);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-4">
      <div className="bg-white rounded-3xl max-w-lg w-full p-6 shadow-2xl border border-slate-200 space-y-4 animate-in fade-in zoom-in-95">
        <div className="flex items-center justify-between border-b border-slate-100 pb-3">
          <div className="flex items-center space-x-2 text-purple-700">
            <MessageSquare className="w-5 h-5" />
            <span className="font-black text-base text-slate-800">Request Official Clarification</span>
          </div>
          <button onClick={onClose} className="p-1 hover:bg-slate-100 rounded-lg text-slate-400">
            <X className="w-4 h-4" />
          </button>
        </div>

        <div className="bg-purple-50 rounded-xl p-3 border border-purple-100 text-xs space-y-1">
          <p className="font-bold text-purple-900">{targetApp.institutionName}</p>
          <p className="text-purple-700">Application Ref: {targetApp.referenceNumber}</p>
          <p className="text-slate-600 font-mono">Target Document: {documentName}</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4 text-xs">
          <div>
            <label className="block font-bold text-slate-700 mb-1">Clarification Notice / Query</label>
            <textarea
              value={requestText}
              onChange={(e) => setRequestText(e.target.value)}
              placeholder="Specify the exact statutory document clarification or rectification required from the institution..."
              className="w-full p-3 bg-slate-50 border border-slate-200 rounded-xl text-xs focus:ring-2 focus:ring-purple-400 focus:bg-white"
              rows={4}
              required
            />
          </div>

          <div className="flex items-center justify-between pt-2 border-t border-slate-100">
            <p className="text-[11px] text-slate-400">Notice will trigger in-app alert & email notification.</p>
            <div className="flex items-center space-x-2">
              <button
                type="button"
                onClick={onClose}
                className="px-4 py-2 rounded-xl text-slate-600 hover:text-slate-800 font-medium"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="px-5 py-2 rounded-xl bg-purple-700 hover:bg-purple-800 text-white font-bold flex items-center space-x-1.5 shadow-sm transition"
              >
                <Send className="w-3.5 h-3.5" />
                <span>Issue Notice</span>
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};
