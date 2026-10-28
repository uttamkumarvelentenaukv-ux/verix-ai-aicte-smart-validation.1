import React from 'react';
import { useApp } from '../../context/AppContext';
import {
  LayoutDashboard,
  PlusCircle,
  FileText,
  Upload,
  CheckCircle2,
  Sparkles,
  CheckSquare,
  BarChart3,
  Bell,
  MessageSquare,
  Headphones,
  ShieldCheck,
  Sliders,
  Database,
  Link,
  Users,
  ShieldAlert,
  History,
  Check,
  Circle,
  Home,
  RefreshCw,
} from 'lucide-react';

export const Sidebar: React.FC = () => {
  const { currentUser, currentView, setCurrentView, notifications } = useApp();

  const unreadNotifs = notifications.filter(
    (n) => !n.read && (n.recipientRole === currentUser.role || n.recipientRole === 'all')
  ).length;

  return (
    <aside className="w-64 bg-[#0a1120] text-slate-300 flex flex-col shrink-0 min-h-screen border-r border-slate-800/80 select-none">
      {/* Brand Header */}
      <div className="p-5 border-b border-slate-800/60 flex items-center justify-between">
        <button
          onClick={() => setCurrentView('home_chooser')}
          className="flex items-center space-x-3 text-left group w-full"
          title="Return to User Chooser Portal"
        >
          <div className="w-10 h-10 rounded-xl bg-blue-600/20 border border-blue-500/40 flex items-center justify-center text-blue-400 shadow-inner group-hover:bg-blue-600/30 transition">
            <ShieldCheck className="w-6 h-6 text-blue-400" />
          </div>
          <div>
            <div className="flex items-center space-x-1.5">
              <span className="text-white font-extrabold text-lg tracking-wide">VERIX AI</span>
            </div>
            <p className="text-[11px] text-slate-400 font-medium">AICTE Smart Validation</p>
          </div>
        </button>
      </div>

      {/* Role Navigation */}
      <div className="flex-1 py-4 px-3 space-y-6 overflow-y-auto text-sm">
        {/* Quick Portal Switcher / Return Home */}
        <div>
          <button
            onClick={() => setCurrentView('home_chooser')}
            className="w-full flex items-center space-x-2.5 px-3 py-2 rounded-lg text-xs font-semibold text-blue-400 bg-blue-950/40 border border-blue-800/50 hover:bg-blue-900/50 hover:text-blue-300 transition"
          >
            <Home className="w-4 h-4" />
            <span>Portal Switcher / Home</span>
          </button>
        </div>

        {currentUser.role === 'institution' && (
          <>
            {/* APPLICATION SECTION */}
            <div className="space-y-1">
              <p className="px-3 text-[10px] font-bold uppercase tracking-wider text-slate-400">Application</p>
              <NavItem
                icon={<LayoutDashboard className="w-4 h-4" />}
                label="Dashboard"
                active={currentView === 'dashboard'}
                onClick={() => setCurrentView('dashboard')}
              />
              <NavItem
                icon={<PlusCircle className="w-4 h-4" />}
                label="New Application"
                active={currentView === 'new_application'}
                onClick={() => setCurrentView('new_application')}
              />
              <NavItem
                icon={<FileText className="w-4 h-4" />}
                label="My Applications"
                active={currentView === 'my_applications'}
                onClick={() => setCurrentView('my_applications')}
              />
              <NavItem
                icon={<Upload className="w-4 h-4" />}
                label="Document Upload"
                active={currentView === 'document_upload'}
                onClick={() => setCurrentView('document_upload')}
              />
              <NavItem
                icon={<CheckCircle2 className="w-4 h-4" />}
                label="Validation Status"
                active={currentView === 'validation_results'}
                onClick={() => setCurrentView('validation_results')}
              />
            </div>

            {/* AI ANALYSIS SECTION */}
            <div className="space-y-1">
              <p className="px-3 text-[10px] font-bold uppercase tracking-wider text-slate-400">AI Analysis</p>
              <NavItem
                icon={<Sparkles className="w-4 h-4" />}
                label="AI Validation"
                active={currentView === 'validation_results'}
                onClick={() => setCurrentView('validation_results')}
              />
              <NavItem
                icon={<CheckSquare className="w-4 h-4" />}
                label="Compliance Check"
                active={currentView === 'compliance_check'}
                onClick={() => setCurrentView('compliance_check')}
              />
              <NavItem
                icon={<BarChart3 className="w-4 h-4" />}
                label="Report & Findings"
                active={currentView === 'reports'}
                onClick={() => setCurrentView('reports')}
              />
            </div>

            {/* COMMUNICATION SECTION */}
            <div className="space-y-1">
              <p className="px-3 text-[10px] font-bold uppercase tracking-wider text-slate-400">Communication</p>
              <NavItem
                icon={<Bell className="w-4 h-4" />}
                label="Notifications"
                badge={unreadNotifs > 0 ? unreadNotifs : undefined}
                active={currentView === 'notifications'}
                onClick={() => setCurrentView('notifications')}
              />
              <NavItem
                icon={<MessageSquare className="w-4 h-4" />}
                label="Clarifications"
                active={currentView === 'clarifications'}
                onClick={() => setCurrentView('clarifications')}
              />
              <NavItem
                icon={<Headphones className="w-4 h-4" />}
                label="Help & Support"
                active={currentView === 'help'}
                onClick={() => setCurrentView('help')}
              />
            </div>
          </>
        )}

        {currentUser.role === 'officer' && (
          <>
            <div className="space-y-1">
              <p className="px-3 text-[10px] font-bold uppercase tracking-wider text-slate-400">Regulatory Scrutiny</p>
              <NavItem
                icon={<LayoutDashboard className="w-4 h-4" />}
                label="Dashboard"
                active={currentView === 'officer_dashboard'}
                onClick={() => setCurrentView('officer_dashboard')}
              />
              <NavItem
                icon={<FileText className="w-4 h-4" />}
                label="Review Queue"
                active={currentView === 'officer_queue' || currentView === 'officer_dashboard'}
                onClick={() => setCurrentView('officer_dashboard')}
              />
              <NavItem
                icon={<ShieldCheck className="w-4 h-4" />}
                label="Document Scrutiny"
                active={currentView === 'officer_scrutiny'}
                onClick={() => setCurrentView('officer_scrutiny')}
              />
              <NavItem
                icon={<Link className="w-4 h-4" />}
                label="Verification Results"
                active={currentView === 'verification_results'}
                onClick={() => setCurrentView('verification_results')}
              />
              <NavItem
                icon={<MessageSquare className="w-4 h-4" />}
                label="Clarifications"
                active={currentView === 'clarifications'}
                onClick={() => setCurrentView('clarifications')}
              />
              <NavItem
                icon={<ShieldAlert className="w-4 h-4" />}
                label="Decisions & Notes"
                active={currentView === 'officer_decisions'}
                onClick={() => setCurrentView('officer_decisions')}
              />
              <NavItem
                icon={<History className="w-4 h-4" />}
                label="Audit Trail"
                active={currentView === 'audit_logs'}
                onClick={() => setCurrentView('audit_logs')}
              />
            </div>
          </>
        )}

        {currentUser.role === 'admin' && (
          <>
            <div className="space-y-1">
              <p className="px-3 text-[10px] font-bold uppercase tracking-wider text-slate-400">System Administration</p>
              <NavItem
                icon={<BarChart3 className="w-4 h-4" />}
                label="Overview"
                active={currentView === 'admin_overview'}
                onClick={() => setCurrentView('admin_overview')}
              />
              <NavItem
                icon={<Users className="w-4 h-4" />}
                label="Users"
                active={currentView === 'admin_users'}
                onClick={() => setCurrentView('admin_users')}
              />
              <NavItem
                icon={<Sliders className="w-4 h-4" />}
                label="Validation Rules"
                active={currentView === 'admin_rules'}
                onClick={() => setCurrentView('admin_rules')}
              />
              <NavItem
                icon={<Database className="w-4 h-4" />}
                label="Master Data"
                active={currentView === 'admin_master'}
                onClick={() => setCurrentView('admin_master')}
              />
              <NavItem
                icon={<Link className="w-4 h-4" />}
                label="Integrations"
                active={currentView === 'admin_integrations'}
                onClick={() => setCurrentView('admin_integrations')}
              />
              <NavItem
                icon={<History className="w-4 h-4" />}
                label="Audit Logs"
                active={currentView === 'audit_logs'}
                onClick={() => setCurrentView('audit_logs')}
              />
            </div>
          </>
        )}
      </div>

      {/* Bottom Integrations Card (Matches Images 2, 3, 4, 6) */}
      <div className="p-3 border-t border-slate-800/80">
        {currentUser.role === 'institution' ? (
          <div className="bg-[#0f172a] rounded-xl p-3 border border-slate-800 space-y-2 text-xs">
            <div className="flex items-center space-x-1.5 text-slate-300 font-semibold mb-1">
              <div className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
              <span>AICTE Integration</span>
            </div>
            <div className="space-y-1.5 text-slate-400 text-[11px]">
              <div className="flex items-center space-x-2">
                <Check className="w-3.5 h-3.5 text-emerald-400" />
                <span>Connected</span>
              </div>
              <div className="flex items-center space-x-2">
                <Check className="w-3.5 h-3.5 text-emerald-400" />
                <span>DigiLocker</span>
              </div>
              <div className="flex items-center space-x-2">
                <Check className="w-3.5 h-3.5 text-emerald-400" />
                <span>API Setu</span>
              </div>
              <div className="flex items-center space-x-2">
                <Check className="w-3.5 h-3.5 text-emerald-400" />
                <span>AICTE Records</span>
              </div>
            </div>
          </div>
        ) : (
          <div className="bg-[#0f172a] rounded-xl p-3 border border-slate-800 text-xs">
            <p className="font-semibold text-slate-300 mb-1">Demo mode</p>
            <p className="text-[11px] text-slate-400 leading-relaxed">
              Simulated data. Roles are for demonstration only.
            </p>
          </div>
        )}
      </div>
    </aside>
  );
};

interface NavItemProps {
  icon: React.ReactNode;
  label: string;
  active?: boolean;
  badge?: number;
  onClick: () => void;
}

const NavItem: React.FC<NavItemProps> = ({ icon, label, active, badge, onClick }) => {
  return (
    <button
      onClick={onClick}
      className={`w-full flex items-center justify-between px-3 py-2 rounded-lg font-medium text-xs transition duration-150 ${
        active
          ? 'bg-blue-600 text-white shadow-sm font-semibold'
          : 'text-slate-300 hover:text-white hover:bg-slate-800/70'
      }`}
    >
      <div className="flex items-center space-x-2.5">
        <span className={active ? 'text-white' : 'text-slate-400'}>{icon}</span>
        <span>{label}</span>
      </div>
      {badge !== undefined && (
        <span className="w-4 h-4 rounded-full bg-rose-500 text-white text-[10px] font-bold flex items-center justify-center">
          {badge}
        </span>
      )}
    </button>
  );
};
