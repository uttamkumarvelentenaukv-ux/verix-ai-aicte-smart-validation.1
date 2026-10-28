import React from 'react';
import { useApp } from '../context/AppContext';
import { Bell, CheckCheck, Clock, FileText, AlertTriangle, ShieldCheck } from 'lucide-react';

export const NotificationsView: React.FC = () => {
  const { notifications, markNotificationAsRead, markAllNotificationsAsRead, currentUser } = useApp();

  const userNotifs = notifications.filter(
    (n) => n.recipientRole === currentUser.role || n.recipientRole === 'all'
  );

  return (
    <div className="max-w-5xl mx-auto space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-black text-slate-800 tracking-tight">System Notifications</h1>
          <p className="text-xs text-slate-500">Live operational alerts, validation updates, and scrutiny notices.</p>
        </div>

        <button
          onClick={markAllNotificationsAsRead}
          className="flex items-center space-x-1.5 px-3.5 py-2 bg-white hover:bg-slate-50 text-blue-600 border border-blue-200 text-xs font-semibold rounded-xl shadow-2xs transition"
        >
          <CheckCheck className="w-4 h-4" />
          <span>Mark All Read</span>
        </button>
      </div>

      <div className="bg-white rounded-2xl p-4 border border-slate-200/80 shadow-xs divide-y divide-slate-100">
        {userNotifs.map((n) => (
          <div
            key={n.id}
            onClick={() => markNotificationAsRead(n.id)}
            className={`p-4 transition cursor-pointer flex items-start justify-between gap-4 ${
              n.read ? 'hover:bg-slate-50/70' : 'bg-blue-50/40 hover:bg-blue-50/70'
            }`}
          >
            <div className="flex items-start space-x-3.5">
              <div
                className={`w-9 h-9 rounded-xl flex items-center justify-center shrink-0 mt-0.5 ${
                  n.type === 'validation'
                    ? 'bg-blue-100 text-blue-600'
                    : n.type === 'clarification'
                    ? 'bg-purple-100 text-purple-600'
                    : 'bg-emerald-100 text-emerald-600'
                }`}
              >
                {n.type === 'validation' ? (
                  <ShieldCheck className="w-5 h-5" />
                ) : n.type === 'clarification' ? (
                  <AlertTriangle className="w-5 h-5" />
                ) : (
                  <FileText className="w-5 h-5" />
                )}
              </div>

              <div>
                <div className="flex items-center space-x-2">
                  <p className="font-bold text-slate-800 text-xs">{n.title}</p>
                  {!n.read && (
                    <span className="w-2 h-2 rounded-full bg-blue-600" title="Unread" />
                  )}
                </div>
                <p className="text-xs text-slate-600 mt-1 leading-relaxed">{n.message}</p>
                <div className="flex items-center space-x-3 text-[10px] text-slate-400 mt-2">
                  <span>{n.timestamp}</span>
                  {n.applicationRef && (
                    <span className="font-mono bg-slate-100 px-1.5 py-0.5 rounded text-slate-600">
                      Ref: {n.applicationRef}
                    </span>
                  )}
                </div>
              </div>
            </div>

            <span className="text-[11px] text-slate-400 font-medium shrink-0">
              {n.read ? 'Read' : 'Unread'}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
};
