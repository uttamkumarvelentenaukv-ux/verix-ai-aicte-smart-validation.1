import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { MessageSquare, Send, CheckCircle2, Clock, FileText, ArrowRight } from 'lucide-react';

export const ClarificationsView: React.FC = () => {
  const { clarifications, respondToClarification, currentUser } = useApp();
  const [selectedClarificationId, setSelectedClarificationId] = useState<string>(clarifications[0]?.id || '');
  const [responseText, setResponseText] = useState('');

  const activeClarification =
    clarifications.find((c) => c.id === selectedClarificationId) || clarifications[0];

  const handleSendResponse = (e: React.FormEvent) => {
    e.preventDefault();
    if (!responseText.trim() || !activeClarification) return;
    respondToClarification(activeClarification.id, responseText);
    setResponseText('');
    alert('Response submitted to AICTE Scrutiny Officer and logged to audit trail.');
  };

  return (
    <div className="max-w-7xl mx-auto space-y-6">
      <div>
        <p className="text-xs font-semibold text-slate-500 uppercase tracking-wider">Communication & Scrutiny</p>
        <h1 className="text-2xl font-black text-slate-800 tracking-tight mt-1">Clarifications Thread</h1>
        <p className="text-xs text-slate-500">
          Formal query and response channel between applicant institutions and AICTE regulatory scrutiny officers.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-12 gap-6">
        {/* Left List of Clarifications (5 cols) */}
        <div className="md:col-span-5 bg-white rounded-2xl p-4 border border-slate-200/80 shadow-xs space-y-3">
          <p className="text-xs font-bold text-slate-400 uppercase tracking-wider">Active Queries ({clarifications.length})</p>

          <div className="space-y-2">
            {clarifications.map((clr) => {
              const isSelected = clr.id === activeClarification?.id;
              return (
                <button
                  key={clr.id}
                  onClick={() => setSelectedClarificationId(clr.id)}
                  className={`w-full text-left p-3.5 rounded-xl transition border text-xs ${
                    isSelected
                      ? 'bg-purple-50 border-purple-300 shadow-xs'
                      : 'hover:bg-slate-50 border-slate-100'
                  }`}
                >
                  <div className="flex items-center justify-between mb-1">
                    <span className="font-mono font-bold text-slate-800">{clr.applicationRef}</span>
                    <span
                      className={`px-2 py-0.5 rounded text-[10px] font-bold ${
                        clr.status.includes('Pending')
                          ? 'bg-amber-100 text-amber-800'
                          : 'bg-emerald-100 text-emerald-800'
                      }`}
                    >
                      {clr.status}
                    </span>
                  </div>
                  <p className="font-bold text-slate-700 truncate">{clr.documentName}</p>
                  <p className="text-[11px] text-slate-500 line-clamp-2 mt-1">{clr.requestText}</p>
                  <p className="text-[10px] text-slate-400 mt-2">{clr.createdAt}</p>
                </button>
              );
            })}
          </div>
        </div>

        {/* Right Active Clarification Conversation & Reply (7 cols) */}
        <div className="md:col-span-7 bg-white rounded-2xl p-6 border border-slate-200/80 shadow-xs space-y-6 flex flex-col justify-between">
          {activeClarification ? (
            <div className="space-y-6">
              {/* Query Header */}
              <div className="border-b border-slate-100 pb-4">
                <div className="flex items-center justify-between">
                  <span className="font-mono font-bold text-base text-slate-800">
                    Case {activeClarification.applicationRef}
                  </span>
                  <span className="text-xs text-slate-500 font-semibold">{activeClarification.createdAt}</span>
                </div>
                <p className="text-xs text-slate-600 mt-0.5">
                  Institution: <strong>{activeClarification.institutionName}</strong> • Target:{' '}
                  <span className="text-purple-700 font-semibold">{activeClarification.documentName}</span>
                </p>
              </div>

              {/* Officer Request Bubble */}
              <div className="bg-purple-50/70 border border-purple-200 rounded-2xl p-4 text-xs space-y-2">
                <div className="flex items-center justify-between text-purple-900 font-bold">
                  <span>From: {activeClarification.requestedBy}</span>
                  <span className="text-[10px] bg-purple-200/80 px-2 py-0.5 rounded">Scrutiny Notice</span>
                </div>
                <p className="text-slate-800 leading-relaxed">{activeClarification.requestText}</p>
              </div>

              {/* Institution Response Bubble if present */}
              {activeClarification.responseText ? (
                <div className="bg-emerald-50/70 border border-emerald-200 rounded-2xl p-4 text-xs space-y-2">
                  <div className="flex items-center justify-between text-emerald-900 font-bold">
                    <span>Institution Response ({activeClarification.responseDate})</span>
                    <span className="text-[10px] bg-emerald-200/80 px-2 py-0.5 rounded">Submitted</span>
                  </div>
                  <p className="text-slate-800 leading-relaxed">{activeClarification.responseText}</p>
                </div>
              ) : (
                <div className="p-4 bg-amber-50 rounded-2xl border border-amber-200 text-xs text-amber-800">
                  <p className="font-bold">Awaiting Institution Response</p>
                  <p className="text-[11px] mt-0.5">
                    Please provide an explanatory response or rectified document evidence to resolve this scrutiny flag.
                  </p>
                </div>
              )}

              {/* Reply Form */}
              <form onSubmit={handleSendResponse} className="space-y-3 pt-4 border-t border-slate-100 text-xs">
                <label className="block font-bold text-slate-700">Submit Institutional Reply / Justification</label>
                <textarea
                  value={responseText}
                  onChange={(e) => setResponseText(e.target.value)}
                  placeholder="Type your response with statutory reference, registration number, or supporting clarification..."
                  className="w-full p-3 bg-slate-50 border border-slate-200 rounded-xl text-xs focus:ring-2 focus:ring-blue-500 focus:bg-white"
                  rows={3}
                  required
                />
                <div className="flex justify-end">
                  <button
                    type="submit"
                    className="px-5 py-2.5 bg-blue-600 hover:bg-blue-700 text-white font-bold rounded-xl flex items-center space-x-1.5 shadow-sm transition"
                  >
                    <Send className="w-3.5 h-3.5" />
                    <span>Submit Reply to Officer</span>
                  </button>
                </div>
              </form>
            </div>
          ) : (
            <div className="text-center py-12 text-slate-400 text-xs">
              Select a clarification query from the left list.
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
