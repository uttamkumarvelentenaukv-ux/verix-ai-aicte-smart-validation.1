import React from 'react';
import { useApp } from '../context/AppContext';
import {
  ShieldCheck,
  Building2,
  FileCheck,
  SlidersHorizontal,
  ArrowRight,
  Sparkles,
  FileText,
  AlertCircle,
  Database,
  Lock,
  Layers,
  ChevronRight,
  RotateCcw,
} from 'lucide-react';
import { UserRole } from '../types';

export const HomeUserChooser: React.FC = () => {
  const { switchRole, setCurrentView, resetAllDemoData, applications, rules } = useApp();

  const handleSelectRole = (role: UserRole, targetView?: string) => {
    switchRole(role);
    if (targetView) {
      setCurrentView(targetView);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#070d19] via-[#0c162c] to-[#0f1f3d] text-white flex flex-col justify-between">
      {/* Top Header Bar */}
      <header className="px-6 py-4 border-b border-slate-800/80 backdrop-blur-md bg-slate-950/40 flex items-center justify-between">
        <div className="flex items-center space-x-3">
          <div className="w-10 h-10 rounded-xl bg-blue-600/30 border border-blue-500/50 flex items-center justify-center text-blue-400 shadow-inner">
            <ShieldCheck className="w-6 h-6 text-blue-400" />
          </div>
          <div>
            <div className="flex items-center space-x-2">
              <span className="font-extrabold text-lg tracking-wider text-white">VERIX AI</span>
              <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-blue-500/20 text-blue-300 border border-blue-400/30">
                PROTOTYPE DEMO
              </span>
            </div>
            <p className="text-xs text-slate-400">All India Council for Technical Education (AICTE)</p>
          </div>
        </div>

        <div className="flex items-center space-x-4 text-xs">
          <span className="hidden sm:inline text-slate-400">Government Decision-Support System</span>
          <button
            onClick={() => {
              resetAllDemoData();
              alert('Demo dataset reset to initial reference state.');
            }}
            className="flex items-center space-x-1.5 px-3 py-1.5 rounded-lg bg-slate-800/80 hover:bg-slate-700 text-slate-300 border border-slate-700 text-xs transition"
            title="Reset demo data to initial defaults"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            <span>Reset Demo Data</span>
          </button>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-6xl mx-auto px-6 py-12 flex-1 flex flex-col justify-center">
        {/* Hero Title Section */}
        <div className="text-center max-w-3xl mx-auto mb-12">
          <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-blue-500/10 border border-blue-500/30 text-blue-400 text-xs font-semibold mb-4">
            <Sparkles className="w-3.5 h-3.5" />
            <span>AICTE Smart Validation & Regulatory Scrutiny Platform</span>
          </div>
          <h1 className="text-3xl md:text-5xl font-black tracking-tight text-white leading-tight">
            Select Your User Portal to Begin
          </h1>
          <p className="mt-4 text-slate-300 text-sm md:text-base leading-relaxed">
            VERIX AI assists preliminary validation of technical institution applications and supporting documentation.
            Choose your role to explore the customized workflows.
          </p>
        </div>

        {/* 3 Role Selection Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* 1. Institution User Card */}
          <div className="bg-slate-900/90 rounded-2xl border border-blue-500/30 p-6 flex flex-col justify-between hover:border-blue-400 hover:shadow-2xl hover:shadow-blue-500/10 transition group relative overflow-hidden">
            <div className="absolute top-0 right-0 w-32 h-32 bg-blue-500/10 rounded-full blur-2xl -mr-10 -mt-10 pointer-events-none" />

            <div>
              <div className="w-12 h-12 rounded-xl bg-blue-500/20 border border-blue-500/40 flex items-center justify-center text-blue-400 mb-5">
                <Building2 className="w-6 h-6" />
              </div>

              <div className="flex items-center space-x-2 mb-2">
                <span className="text-xs font-bold uppercase tracking-wider text-blue-400">Applicant Portal</span>
                <span className="w-1.5 h-1.5 rounded-full bg-blue-400" />
                <span className="text-xs text-slate-400">Institutional Rep</span>
              </div>

              <h2 className="text-xl font-bold text-white mb-2">Institution User</h2>
              <p className="text-xs text-slate-300 leading-relaxed mb-4">
                Prepare AICTE approval applications, upload statutory documents, run live OCR pre-checks, inspect cross-document consistency scores, and answer scrutiny clarifications.
              </p>

              <div className="bg-slate-950/60 rounded-xl p-3 border border-slate-800 text-xs space-y-1.5 mb-6">
                <div className="flex items-center justify-between text-slate-400">
                  <span>Sample Institution:</span>
                  <span className="text-white font-semibold truncate ml-2">Rungta College of Eng.</span>
                </div>
                <div className="flex items-center justify-between text-slate-400">
                  <span>AISHE Code:</span>
                  <span className="text-slate-200 font-mono">C-12345</span>
                </div>
                <div className="flex items-center justify-between text-slate-400">
                  <span>Current App ID:</span>
                  <span className="text-blue-400 font-mono">VERIX-2025-00124</span>
                </div>
              </div>
            </div>

            <div className="space-y-2">
              <button
                onClick={() => handleSelectRole('institution', 'dashboard')}
                className="w-full flex items-center justify-center space-x-2 py-3 px-4 rounded-xl bg-blue-600 hover:bg-blue-500 text-white font-semibold text-xs tracking-wide shadow-lg shadow-blue-600/30 transition group-hover:scale-[1.02]"
              >
                <span>Enter as Institution User</span>
                <ArrowRight className="w-4 h-4" />
              </button>
              <button
                onClick={() => handleSelectRole('institution', 'new_application')}
                className="w-full text-center py-2 text-xs text-blue-300 hover:text-white transition font-medium"
              >
                Or Open New Application Wizard →
              </button>
            </div>
          </div>

          {/* 2. AICTE Scrutiny Officer Card */}
          <div className="bg-slate-900/90 rounded-2xl border border-purple-500/30 p-6 flex flex-col justify-between hover:border-purple-400 hover:shadow-2xl hover:shadow-purple-500/10 transition group relative overflow-hidden">
            <div className="absolute top-0 right-0 w-32 h-32 bg-purple-500/10 rounded-full blur-2xl -mr-10 -mt-10 pointer-events-none" />

            <div>
              <div className="w-12 h-12 rounded-xl bg-purple-500/20 border border-purple-500/40 flex items-center justify-center text-purple-400 mb-5">
                <FileCheck className="w-6 h-6" />
              </div>

              <div className="flex items-center space-x-2 mb-2">
                <span className="text-xs font-bold uppercase tracking-wider text-purple-400">Regulatory Scrutiny</span>
                <span className="w-1.5 h-1.5 rounded-full bg-purple-400" />
                <span className="text-xs text-slate-400">Official Reviewer</span>
              </div>

              <h2 className="text-xl font-bold text-white mb-2">AICTE Officer</h2>
              <p className="text-xs text-slate-300 leading-relaxed mb-4">
                Examine priority review queues, scrutinize documents side-by-side with OCR bounding highlights, inspect anomaly alerts, issue clarifications, and record statutory inspection decisions.
              </p>

              <div className="bg-slate-950/60 rounded-xl p-3 border border-slate-800 text-xs space-y-1.5 mb-6">
                <div className="flex items-center justify-between text-slate-400">
                  <span>Assigned Reviewer:</span>
                  <span className="text-white font-semibold">Reviewer 01</span>
                </div>
                <div className="flex items-center justify-between text-slate-400">
                  <span>Queue Status:</span>
                  <span className="text-amber-400 font-semibold">18 Assigned · 3 Flagged</span>
                </div>
                <div className="flex items-center justify-between text-slate-400">
                  <span>Primary Case:</span>
                  <span className="text-purple-400 font-mono">PROT-2026-005</span>
                </div>
              </div>
            </div>

            <div className="space-y-2">
              <button
                onClick={() => handleSelectRole('officer', 'officer_dashboard')}
                className="w-full flex items-center justify-center space-x-2 py-3 px-4 rounded-xl bg-purple-600 hover:bg-purple-500 text-white font-semibold text-xs tracking-wide shadow-lg shadow-purple-600/30 transition group-hover:scale-[1.02]"
              >
                <span>Enter as AICTE Officer</span>
                <ArrowRight className="w-4 h-4" />
              </button>
              <button
                onClick={() => handleSelectRole('officer', 'officer_scrutiny')}
                className="w-full text-center py-2 text-xs text-purple-300 hover:text-white transition font-medium"
              >
                Or Open Document Scrutiny View →
              </button>
            </div>
          </div>

          {/* 3. System Administrator Card */}
          <div className="bg-slate-900/90 rounded-2xl border border-emerald-500/30 p-6 flex flex-col justify-between hover:border-emerald-400 hover:shadow-2xl hover:shadow-emerald-500/10 transition group relative overflow-hidden">
            <div className="absolute top-0 right-0 w-32 h-32 bg-emerald-500/10 rounded-full blur-2xl -mr-10 -mt-10 pointer-events-none" />

            <div>
              <div className="w-12 h-12 rounded-xl bg-emerald-500/20 border border-emerald-500/40 flex items-center justify-center text-emerald-400 mb-5">
                <SlidersHorizontal className="w-6 h-6" />
              </div>

              <div className="flex items-center space-x-2 mb-2">
                <span className="text-xs font-bold uppercase tracking-wider text-emerald-400">Platform Governance</span>
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
                <span className="text-xs text-slate-400">Administrator</span>
              </div>

              <h2 className="text-xl font-bold text-white mb-2">System Administrator</h2>
              <p className="text-xs text-slate-300 leading-relaxed mb-4">
                Manage deterministic validation rules (R-001 through R-004), configure required checklists, test live/mock integrations (DigiLocker, API Setu, AICTE), and audit immutable system logs.
              </p>

              <div className="bg-slate-950/60 rounded-xl p-3 border border-slate-800 text-xs space-y-1.5 mb-6">
                <div className="flex items-center justify-between text-slate-400">
                  <span>Admin User:</span>
                  <span className="text-white font-semibold">Admin Demo</span>
                </div>
                <div className="flex items-center justify-between text-slate-400">
                  <span>Validation Rules:</span>
                  <span className="text-emerald-400 font-semibold">{rules.length} Configured Rules</span>
                </div>
                <div className="flex items-center justify-between text-slate-400">
                  <span>System Workload:</span>
                  <span className="text-slate-200">58 Jobs · 2 Failed</span>
                </div>
              </div>
            </div>

            <div className="space-y-2">
              <button
                onClick={() => handleSelectRole('admin', 'admin_rules')}
                className="w-full flex items-center justify-center space-x-2 py-3 px-4 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-semibold text-xs tracking-wide shadow-lg shadow-emerald-600/30 transition group-hover:scale-[1.02]"
              >
                <span>Enter as Administrator</span>
                <ArrowRight className="w-4 h-4" />
              </button>
              <button
                onClick={() => handleSelectRole('admin', 'audit_logs')}
                className="w-full text-center py-2 text-xs text-emerald-300 hover:text-white transition font-medium"
              >
                Or Inspect Immutable Audit Logs →
              </button>
            </div>
          </div>
        </div>

        {/* Feature Highlights Grid */}
        <div className="mt-12 grid grid-cols-2 md:grid-cols-4 gap-4 text-center">
          <div className="p-4 rounded-xl bg-slate-950/40 border border-slate-800">
            <p className="text-2xl font-black text-blue-400">96.2%</p>
            <p className="text-xs text-slate-400 mt-1">Extraction Accuracy Target</p>
          </div>
          <div className="p-4 rounded-xl bg-slate-950/40 border border-slate-800">
            <p className="text-2xl font-black text-purple-400">40%+</p>
            <p className="text-xs text-slate-400 mt-1">Preliminary Scrutiny Time Saved</p>
          </div>
          <div className="p-4 rounded-xl bg-slate-950/40 border border-slate-800">
            <p className="text-2xl font-black text-emerald-400">100%</p>
            <p className="text-xs text-slate-400 mt-1">Configured Checklist Coverage</p>
          </div>
          <div className="p-4 rounded-xl bg-slate-950/40 border border-slate-800">
            <p className="text-2xl font-black text-amber-400">Human-in-Loop</p>
            <p className="text-xs text-slate-400 mt-1">Advisory Decision-Support Only</p>
          </div>
        </div>
      </main>

      {/* Footer Disclaimer */}
      <footer className="px-6 py-4 border-t border-slate-800/80 bg-slate-950/60 text-center text-xs text-slate-400 leading-relaxed">
        <p>
          <strong className="text-slate-300">Prototype · Demonstration Data.</strong> Not connected to production AICTE systems. AI-generated findings are advisory preliminary indicators. Statutory scrutiny, physical inspections, and final regulatory approval decisions remain with competent AICTE authorities.
        </p>
      </footer>
    </div>
  );
};
