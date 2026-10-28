import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { History, Search, ShieldCheck, CheckCircle2, AlertTriangle, Filter, Download } from 'lucide-react';

export const AuditLogsView: React.FC = () => {
  const { auditLogs } = useApp();
  const [searchTerm, setSearchTerm] = useState('');

  const filteredLogs = auditLogs.filter(
    (log) =>
      log.action.toLowerCase().includes(searchTerm.toLowerCase()) ||
      log.actorName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      log.details.toLowerCase().includes(searchTerm.toLowerCase()) ||
      (log.applicationRef && log.applicationRef.toLowerCase().includes(searchTerm.toLowerCase()))
  );

  return (
    <div className="max-w-7xl mx-auto space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <p className="text-xs font-semibold text-slate-500 uppercase tracking-wider">System Governance / Audit</p>
          <h1 className="text-2xl font-black text-slate-800 tracking-tight mt-1">Immutable Audit Trail</h1>
          <p className="text-xs text-slate-500">
            Cryptographically recorded ledger of user submissions, automated OCR checks, officer scrutiny, and regulatory decisions.
          </p>
        </div>

        <button
          onClick={() => alert('Exporting signed audit ledger CSV...')}
          className="flex items-center space-x-1.5 px-4 py-2 bg-slate-900 hover:bg-slate-800 text-white rounded-xl text-xs font-semibold shadow-xs transition"
        >
          <Download className="w-3.5 h-3.5" />
          <span>Export Audit Ledger</span>
        </button>
      </div>

      {/* Filter and Search Bar */}
      <div className="bg-white rounded-2xl p-4 border border-slate-200/80 shadow-xs flex items-center justify-between text-xs">
        <div className="relative flex-1 max-w-sm">
          <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none" />
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Search audit trail by actor, action, or case ref..."
            className="w-full pl-9 pr-3 py-2 bg-slate-50 border border-slate-200 rounded-xl focus:bg-white"
          />
        </div>

        <span className="text-slate-500 text-xs font-semibold">
          {filteredLogs.length} Events Recorded
        </span>
      </div>

      {/* Audit Logs Table */}
      <div className="bg-white rounded-2xl p-5 border border-slate-200/80 shadow-xs">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead>
              <tr className="border-b border-slate-100 text-slate-400 font-semibold">
                <th className="pb-3 w-16">ID</th>
                <th className="pb-3">Timestamp</th>
                <th className="pb-3">Actor & Role</th>
                <th className="pb-3">Action</th>
                <th className="pb-3">Details & Rationale</th>
                <th className="pb-3 text-right">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 font-mono text-[11px]">
              {filteredLogs.map((log) => (
                <tr key={log.id} className="hover:bg-slate-50/70 transition">
                  <td className="py-3 text-slate-400">{log.id}</td>
                  <td className="py-3 text-slate-500 font-sans">{log.timestamp}</td>
                  <td className="py-3 font-sans font-bold text-slate-800">
                    <div>{log.actorName}</div>
                    <span className="text-[10px] text-slate-400 font-normal uppercase">{log.actorRole}</span>
                  </td>
                  <td className="py-3 font-sans font-bold text-blue-700">{log.action}</td>
                  <td className="py-3 font-sans text-slate-600 max-w-md">{log.details}</td>
                  <td className="py-3 text-right">
                    <span
                      className={`inline-block px-2 py-0.5 rounded text-[10px] font-sans font-bold ${
                        log.status === 'success'
                          ? 'bg-emerald-50 text-emerald-700'
                          : log.status === 'warning'
                          ? 'bg-amber-50 text-amber-700'
                          : 'bg-rose-50 text-rose-700'
                      }`}
                    >
                      {log.status.toUpperCase()}
                    </span>
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
