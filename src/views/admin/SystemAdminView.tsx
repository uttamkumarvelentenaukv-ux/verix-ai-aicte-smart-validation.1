import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import {
  FileText,
  Users,
  BarChart3,
  AlertTriangle,
  Sliders,
  Plus,
  RefreshCw,
  CheckCircle2,
  XCircle,
  Clock,
  ShieldAlert,
} from 'lucide-react';
import { ValidationRule } from '../../types';

export const SystemAdminView: React.FC = () => {
  const {
    rules,
    toggleValidationRule,
    addNewRule,
    integrations,
    testIntegrationService,
    applications,
  } = useApp();

  const [showAddModal, setShowAddModal] = useState(false);
  const [newRuleName, setNewRuleName] = useState('');
  const [newRuleType, setNewRuleType] = useState('Document Presence');
  const [newRuleSeverity, setNewRuleSeverity] = useState<'High' | 'Medium' | 'Low'>('Medium');
  const [newRuleClause, setNewRuleClause] = useState('AICTE APH 2024-27 Clause 2.1');

  const institutionalIntegration =
    integrations.find((i) => i.id === 'aicte-portal') || integrations[0];
  const issuingIntegration =
    integrations.find((i) => i.id === 'issuing-auth') || integrations[1];

  const handleCreateRule = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newRuleName.trim()) return;
    addNewRule({
      name: newRuleName,
      checkType: newRuleType,
      severity: newRuleSeverity,
      version: 'v1.0',
      enabled: true,
      description: `Configured check for ${newRuleName}.`,
      clauseReference: newRuleClause,
      category: 'Administrative Rules',
    });
    setNewRuleName('');
    setShowAddModal(false);
  };

  return (
    <div className="max-w-7xl mx-auto space-y-6">
      {/* Breadcrumb & Header (Matches Image 1) */}
      <div>
        <p className="text-xs font-semibold text-slate-500 uppercase tracking-wider">Admin / Validation Rules</p>
        <h1 className="text-2xl font-black text-slate-800 tracking-tight mt-1">System Administration</h1>
        <p className="text-xs text-slate-500">
          Manage illustrative validation rules, master data, and mock integrations.
        </p>
      </div>

      {/* 4 Stat Cards (Matches Image 1) */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {/* Total Applications */}
        <div className="bg-white rounded-2xl p-5 border border-slate-200/80 shadow-xs flex items-center space-x-4">
          <div className="w-12 h-12 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center">
            <FileText className="w-6 h-6" />
          </div>
          <div>
            <p className="text-2xl font-black text-slate-800">46</p>
            <p className="text-xs text-slate-500 font-medium">Total Applications</p>
          </div>
        </div>

        {/* Active Users */}
        <div className="bg-white rounded-2xl p-5 border border-slate-200/80 shadow-xs flex items-center space-x-4">
          <div className="w-12 h-12 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center">
            <Users className="w-6 h-6" />
          </div>
          <div>
            <p className="text-2xl font-black text-slate-800">21</p>
            <p className="text-xs text-slate-500 font-medium">Active Users</p>
          </div>
        </div>

        {/* Validation Jobs */}
        <div className="bg-white rounded-2xl p-5 border border-slate-200/80 shadow-xs flex items-center space-x-4">
          <div className="w-12 h-12 rounded-xl bg-purple-50 text-purple-600 flex items-center justify-center">
            <BarChart3 className="w-6 h-6" />
          </div>
          <div>
            <p className="text-2xl font-black text-slate-800">58</p>
            <p className="text-xs text-slate-500 font-medium">Validation Jobs</p>
          </div>
        </div>

        {/* Failed Jobs */}
        <div className="bg-white rounded-2xl p-5 border border-slate-200/80 shadow-xs flex items-center space-x-4">
          <div className="w-12 h-12 rounded-xl bg-rose-50 text-rose-600 flex items-center justify-center">
            <AlertTriangle className="w-6 h-6" />
          </div>
          <div>
            <p className="text-2xl font-black text-slate-800">2</p>
            <p className="text-xs text-slate-500 font-medium">Failed Jobs</p>
          </div>
        </div>
      </div>

      {/* Validation Rules Section (Matches Image 1) */}
      <div className="bg-white rounded-2xl p-6 border border-slate-200/80 shadow-xs space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-3 border-b border-slate-100 gap-2">
          <div className="flex items-center space-x-3">
            <h2 className="text-base font-bold text-slate-800">Validation rules</h2>
            <button
              onClick={() => setShowAddModal(true)}
              className="inline-flex items-center space-x-1 px-2.5 py-1 bg-blue-50 text-blue-700 hover:bg-blue-100 rounded-lg text-xs font-semibold transition"
            >
              <Plus className="w-3.5 h-3.5" />
              <span>Add Rule</span>
            </button>
          </div>
          <span className="text-[11px] font-semibold text-slate-500 bg-slate-100 px-3 py-1 rounded-full">
            • Illustrative, not official requirements
          </span>
        </div>

        {/* Rules Table */}
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead>
              <tr className="border-b border-slate-100 text-slate-400 font-semibold">
                <th className="pb-3 w-24">Rule</th>
                <th className="pb-3">Name</th>
                <th className="pb-3">Check type</th>
                <th className="pb-3">Severity</th>
                <th className="pb-3">Version</th>
                <th className="pb-3 text-right">Enabled</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {rules.map((rule) => (
                <tr key={rule.id} className="hover:bg-slate-50/70 transition">
                  <td className="py-3.5 font-bold font-mono text-slate-800">{rule.id}</td>
                  <td className="py-3.5 font-semibold text-slate-800">{rule.name}</td>
                  <td className="py-3.5 text-slate-600 font-medium">{rule.checkType}</td>
                  <td className="py-3.5">
                    <span
                      className={`inline-flex items-center text-xs font-bold ${
                        rule.severity === 'High'
                          ? 'text-rose-600'
                          : rule.severity === 'Medium'
                          ? 'text-amber-600'
                          : 'text-indigo-600'
                      }`}
                    >
                      <span
                        className={`w-1.5 h-1.5 rounded-full mr-1.5 ${
                          rule.severity === 'High'
                            ? 'bg-rose-500'
                            : rule.severity === 'Medium'
                            ? 'bg-amber-500'
                            : 'bg-indigo-500'
                        }`}
                      />
                      {rule.severity}
                    </span>
                  </td>
                  <td className="py-3.5 text-slate-500 font-mono">{rule.version}</td>
                  <td className="py-3.5 text-right">
                    {/* Toggle Switch */}
                    <button
                      onClick={() => toggleValidationRule(rule.id)}
                      className={`relative inline-flex h-6 w-11 shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-hidden ${
                        rule.enabled ? 'bg-emerald-600' : 'bg-slate-300'
                      }`}
                      aria-label={`Toggle ${rule.name}`}
                    >
                      <span
                        className={`pointer-events-none inline-block h-5 w-5 transform rounded-full bg-white shadow-sm ring-0 transition duration-200 ease-in-out ${
                          rule.enabled ? 'translate-x-5' : 'translate-x-0'
                        }`}
                      />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* 2 Bottom Integration Cards (Matches Image 1) */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Authorized Institutional Records Card */}
        <div className="bg-white rounded-2xl p-6 border border-slate-200/80 shadow-xs space-y-4 flex flex-col justify-between">
          <div className="space-y-3">
            <h3 className="text-base font-bold text-slate-800">Authorized Institutional Records</h3>
            <div className="flex flex-wrap items-center gap-2">
              <span className="px-2.5 py-1 rounded-full text-xs font-semibold bg-indigo-50 text-indigo-700">
                • Mock Integration
              </span>
              <span className="px-2.5 py-1 rounded-full text-xs font-semibold bg-emerald-50 text-emerald-700">
                • {institutionalIntegration.status}
              </span>
            </div>
            <p className="text-xs text-slate-400">Last test: {institutionalIntegration.lastTested}</p>
          </div>

          <div>
            <button
              onClick={() => testIntegrationService(institutionalIntegration.id)}
              className="px-4 py-2 bg-white hover:bg-slate-50 text-slate-700 font-bold text-xs rounded-xl border border-slate-200 shadow-2xs transition"
            >
              Test connection
            </button>
          </div>
        </div>

        {/* Issuing-Authority Verification Card */}
        <div className="bg-white rounded-2xl p-6 border border-slate-200/80 shadow-xs space-y-4 flex flex-col justify-between">
          <div className="space-y-3">
            <h3 className="text-base font-bold text-slate-800">Issuing-Authority Verification</h3>
            <div className="flex flex-wrap items-center gap-2">
              <span className="px-2.5 py-1 rounded-full text-xs font-semibold bg-indigo-50 text-indigo-700">
                • Mock Integration
              </span>
              <span
                className={`px-2.5 py-1 rounded-full text-xs font-semibold ${
                  issuingIntegration.status === 'Connected (demo)'
                    ? 'bg-emerald-50 text-emerald-700'
                    : 'bg-amber-50 text-amber-700'
                }`}
              >
                • {issuingIntegration.status}
              </span>
            </div>
            <p className="text-xs text-slate-400">
              {issuingIntegration.lastError ? `Last error: ${issuingIntegration.lastError}` : `Last test: ${issuingIntegration.lastTested}`}
            </p>
          </div>

          <div>
            <button
              onClick={() => testIntegrationService(issuingIntegration.id)}
              className="px-4 py-2 bg-white hover:bg-slate-50 text-slate-700 font-bold text-xs rounded-xl border border-slate-200 shadow-2xs transition"
            >
              Retry demo verification
            </button>
          </div>
        </div>
      </div>

      {/* Add Rule Modal */}
      {showAddModal && (
        <div className="fixed inset-0 z-50 bg-slate-900/50 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl max-w-md w-full p-6 shadow-2xl border border-slate-200 space-y-4 animate-in fade-in zoom-in-95">
            <h3 className="text-base font-bold text-slate-800">Configure Validation Rule</h3>
            <form onSubmit={handleCreateRule} className="space-y-3 text-xs">
              <div>
                <label className="block font-semibold text-slate-700 mb-1">Rule Name</label>
                <input
                  type="text"
                  value={newRuleName}
                  onChange={(e) => setNewRuleName(e.target.value)}
                  placeholder="e.g. Land Contiguity Verification"
                  className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-xl"
                  required
                />
              </div>

              <div>
                <label className="block font-semibold text-slate-700 mb-1">Check Type</label>
                <select
                  value={newRuleType}
                  onChange={(e) => setNewRuleType(e.target.value)}
                  className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-xl"
                >
                  <option>Document Presence</option>
                  <option>Expiry Check</option>
                  <option>Institutional-Record Match</option>
                  <option>Verification Requirement</option>
                  <option>Tamper & Anomaly Heuristic</option>
                </select>
              </div>

              <div>
                <label className="block font-semibold text-slate-700 mb-1">Severity</label>
                <select
                  value={newRuleSeverity}
                  onChange={(e) => setNewRuleSeverity(e.target.value as any)}
                  className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-xl"
                >
                  <option value="High">High</option>
                  <option value="Medium">Medium</option>
                  <option value="Low">Low</option>
                </select>
              </div>

              <div>
                <label className="block font-semibold text-slate-700 mb-1">AICTE Clause Reference</label>
                <input
                  type="text"
                  value={newRuleClause}
                  onChange={(e) => setNewRuleClause(e.target.value)}
                  placeholder="e.g. AICTE APH 2024-27 Clause 3.2"
                  className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-xl"
                />
              </div>

              <div className="flex justify-end space-x-2 pt-3 border-t border-slate-100">
                <button
                  type="button"
                  onClick={() => setShowAddModal(false)}
                  className="px-4 py-2 text-slate-600 hover:text-slate-800 font-medium"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 bg-blue-600 hover:bg-blue-700 text-white font-bold rounded-xl"
                >
                  Save Rule
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
