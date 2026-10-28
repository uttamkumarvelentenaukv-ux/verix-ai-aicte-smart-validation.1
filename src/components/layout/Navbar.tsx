import React, { useState, useRef, useEffect } from 'react';
import { useApp } from '../../context/AppContext';
import { INITIAL_USERS } from '../../data/mockData';
import { Search, Bell, ChevronDown, UserCheck, Shield, Building2, SlidersHorizontal, Home, ExternalLink } from 'lucide-react';
import { UserRole } from '../../types';

export const Navbar: React.FC = () => {
  const { currentUser, switchRole, currentView, setCurrentView, notifications, markAllNotificationsAsRead } = useApp();
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [notifDropdownOpen, setNotifDropdownOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const notifRef = useRef<HTMLDivElement>(null);

  const unreadNotifs = notifications.filter(
    (n) => !n.read && (n.recipientRole === currentUser.role || n.recipientRole === 'all')
  );

  // Close menus when clicking outside
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node)) {
        setDropdownOpen(false);
      }
      if (notifRef.current && !notifRef.current.contains(e.target as Node)) {
        setNotifDropdownOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const getBreadcrumbTitle = () => {
    switch (currentView) {
      case 'dashboard':
        return 'Institution Portal / Dashboard';
      case 'new_application':
        return 'Home > New Application';
      case 'validation_results':
        return 'AI Analysis / Validation Results';
      case 'officer_dashboard':
        return 'Home / Review Queue';
      case 'officer_scrutiny':
        return 'Officer Scrutiny / Case Review';
      case 'admin_rules':
        return 'Admin / Validation Rules';
      case 'admin_overview':
        return 'Admin / Platform Overview';
      case 'clarifications':
        return 'Communication / Clarification Thread';
      case 'audit_logs':
        return 'System Audit / Immutable Logs';
      default:
        return 'AI-Powered Document Validation for Transparent AICTE Approvals';
    }
  };

  return (
    <header className="h-16 bg-white border-b border-slate-200 px-6 flex items-center justify-between sticky top-0 z-30 shadow-xs">
      {/* Left Title / Breadcrumb */}
      <div className="flex items-center space-x-3 min-w-0">
        <div className="hidden lg:block truncate">
          <p className="text-xs font-semibold text-slate-500 uppercase tracking-wider">{getBreadcrumbTitle()}</p>
          <p className="text-sm font-bold text-slate-800 truncate">
            {currentUser.role === 'institution'
              ? currentUser.institutionName || 'Rungta College of Engineering and Technology'
              : currentUser.role === 'officer'
              ? 'AICTE Central Regulatory Scrutiny Directorate'
              : 'AICTE Smart Governance Administration'}
          </p>
        </div>
      </div>

      {/* Middle Search Input */}
      <div className="flex-1 max-w-md mx-6">
        <div className="relative">
          <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
          <input
            type="text"
            placeholder="Search applications, documents, institutions..."
            className="w-full pl-9 pr-4 py-2 bg-slate-50 hover:bg-slate-100/70 focus:bg-white text-xs border border-slate-200 rounded-full focus:outline-hidden focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition placeholder:text-slate-400"
          />
        </div>
      </div>

      {/* Right User Controls */}
      <div className="flex items-center space-x-4 shrink-0">
        {/* Switch Persona / Chooser Button */}
        <button
          onClick={() => setCurrentView('home_chooser')}
          className="hidden sm:inline-flex items-center space-x-1.5 px-3 py-1.5 bg-blue-50 hover:bg-blue-100 text-blue-700 text-xs font-semibold rounded-lg border border-blue-200 transition"
          title="Return to User Chooser Portal"
        >
          <Home className="w-3.5 h-3.5 text-blue-600" />
          <span>Switch User</span>
        </button>

        {/* Notifications Bell */}
        <div className="relative" ref={notifRef}>
          <button
            onClick={() => setNotifDropdownOpen(!notifDropdownOpen)}
            className="relative p-2 text-slate-500 hover:text-slate-800 hover:bg-slate-100 rounded-full transition"
            aria-label="Notifications"
          >
            <Bell className="w-4 h-4" />
            {unreadNotifs.length > 0 && (
              <span className="absolute 1.5 top-1.5 right-1.5 w-4 h-4 rounded-full bg-rose-500 text-white text-[10px] font-bold flex items-center justify-center">
                {unreadNotifs.length}
              </span>
            )}
          </button>

          {/* Notifications Dropdown */}
          {notifDropdownOpen && (
            <div className="absolute right-0 mt-2 w-80 bg-white rounded-xl shadow-xl border border-slate-200 py-2 z-50 animate-in fade-in zoom-in-95 duration-100">
              <div className="px-4 py-2 border-b border-slate-100 flex items-center justify-between">
                <span className="text-xs font-bold text-slate-800">Notifications ({unreadNotifs.length})</span>
                {unreadNotifs.length > 0 && (
                  <button
                    onClick={markAllNotificationsAsRead}
                    className="text-[11px] text-blue-600 hover:text-blue-700 font-medium"
                  >
                    Mark all read
                  </button>
                )}
              </div>
              <div className="max-h-72 overflow-y-auto divide-y divide-slate-100">
                {notifications.slice(0, 5).map((n) => (
                  <div key={n.id} className={`p-3 text-xs ${n.read ? 'bg-white' : 'bg-blue-50/50'}`}>
                    <p className="font-semibold text-slate-800">{n.title}</p>
                    <p className="text-slate-600 text-[11px] mt-0.5 line-clamp-2">{n.message}</p>
                    <p className="text-[10px] text-slate-400 mt-1">{n.timestamp}</p>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* User Profile & Role Switcher */}
        <div className="relative" ref={dropdownRef}>
          <button
            onClick={() => setDropdownOpen(!dropdownOpen)}
            className="flex items-center space-x-3 p-1.5 hover:bg-slate-100 rounded-xl transition text-left"
            aria-label="User account menu"
          >
            <div className="w-8 h-8 rounded-full bg-blue-600 text-white font-bold text-xs flex items-center justify-center shadow-xs">
              {currentUser.initials}
            </div>
            <div className="hidden md:block">
              <p className="text-xs font-bold text-slate-800 leading-tight">{currentUser.name}</p>
              <p className="text-[11px] text-slate-500 font-medium">
                {currentUser.role === 'institution'
                  ? 'Institution User'
                  : currentUser.role === 'officer'
                  ? 'AICTE Official'
                  : 'System Administrator'}
              </p>
            </div>
            <ChevronDown className="w-3.5 h-3.5 text-slate-400" />
          </button>

          {/* Switch User Dropdown */}
          {dropdownOpen && (
            <div className="absolute right-0 mt-2 w-72 bg-white rounded-xl shadow-xl border border-slate-200 py-2 z-50 divide-y divide-slate-100 animate-in fade-in zoom-in-95 duration-100">
              <div className="px-4 py-2.5">
                <p className="text-xs font-bold text-slate-800">{currentUser.name}</p>
                <p className="text-[11px] text-slate-500">{currentUser.email}</p>
                <span className="inline-block mt-1 px-2 py-0.5 bg-blue-50 text-blue-700 text-[10px] font-bold rounded-full">
                  {currentUser.role === 'institution' ? 'Institution Portal' : currentUser.role === 'officer' ? 'AICTE Scrutiny Officer' : 'System Administrator'}
                </span>
              </div>

              {/* Fast Persona Switcher */}
              <div className="p-2 space-y-1">
                <p className="px-2 text-[10px] font-bold uppercase tracking-wider text-slate-400">Switch Active Role</p>
                {INITIAL_USERS.map((user) => (
                  <button
                    key={user.id}
                    onClick={() => {
                      switchRole(user.role);
                      setDropdownOpen(false);
                    }}
                    className={`w-full flex items-center space-x-2.5 px-3 py-2 rounded-lg text-xs font-medium text-left transition ${
                      currentUser.role === user.role
                        ? 'bg-blue-50 text-blue-700 font-semibold'
                        : 'text-slate-700 hover:bg-slate-50'
                    }`}
                  >
                    <div className="w-6 h-6 rounded-full bg-slate-200 text-slate-700 font-bold text-[10px] flex items-center justify-center shrink-0">
                      {user.initials}
                    </div>
                    <div className="flex-1 truncate">
                      <p className="truncate font-semibold">{user.name}</p>
                      <p className="text-[10px] text-slate-400 truncate">
                        {user.role === 'institution' ? 'Institution User' : user.role === 'officer' ? 'AICTE Official' : 'System Admin'}
                      </p>
                    </div>
                    {currentUser.role === user.role && <div className="w-1.5 h-1.5 rounded-full bg-blue-600" />}
                  </button>
                ))}
              </div>

              {/* Full Chooser Portal Link */}
              <div className="p-2">
                <button
                  onClick={() => {
                    setCurrentView('home_chooser');
                    setDropdownOpen(false);
                  }}
                  className="w-full flex items-center justify-center space-x-2 px-3 py-2 bg-slate-900 hover:bg-slate-800 text-white rounded-lg text-xs font-semibold transition"
                >
                  <Home className="w-3.5 h-3.5" />
                  <span>Open User Chooser Landing</span>
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </header>
  );
};
