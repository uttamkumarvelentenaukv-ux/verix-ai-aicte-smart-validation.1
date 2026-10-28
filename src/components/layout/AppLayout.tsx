import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { Sidebar } from './Sidebar';
import { Navbar } from './Navbar';
import { HomeUserChooser } from '../../views/HomeUserChooser';
import { InstitutionDashboard } from '../../views/institution/InstitutionDashboard';
import { NewApplication } from '../../views/institution/NewApplication';
import { ValidationResultsView } from '../../views/institution/ValidationResultsView';
import { DocumentCentreView } from '../../views/institution/DocumentCentreView';
import { OfficerReviewDashboard } from '../../views/officer/OfficerReviewDashboard';
import { OfficerDocumentScrutiny } from '../../views/officer/OfficerDocumentScrutiny';
import { SystemAdminView } from '../../views/admin/SystemAdminView';
import { AuditLogsView } from '../../views/admin/AuditLogsView';
import { MasterDataView } from '../../views/admin/MasterDataView';
import { ClarificationsView } from '../../views/ClarificationsView';
import { NotificationsView } from '../../views/NotificationsView';
import { DocumentViewerModal } from '../common/DocumentViewerModal';
import { ClarificationModal } from '../common/ClarificationModal';
import { ComplianceReportModal } from '../common/ComplianceReportModal';

export const AppLayout: React.FC = () => {
  const { currentView, setCurrentView, currentUser } = useApp();

  // Modal states
  const [previewDocId, setPreviewDocId] = useState<string | null>(null);
  const [clarificationModalState, setClarificationModalState] = useState<{
    open: boolean;
    appId: string;
    docName: string;
  }>({
    open: false,
    appId: '',
    docName: '',
  });
  const [complianceReportOpen, setComplianceReportOpen] = useState(false);

  // If user is on the dedicated Home User Chooser, display full screen view
  if (currentView === 'home_chooser') {
    return <HomeUserChooser />;
  }

  const renderCurrentView = () => {
    switch (currentView) {
      case 'dashboard':
        return (
          <InstitutionDashboard
            onOpenDocumentPreview={(docId) => setPreviewDocId(docId)}
            onOpenComplianceReport={() => setComplianceReportOpen(true)}
          />
        );
      case 'new_application':
        return (
          <NewApplication onOpenDocumentPreview={(docId) => setPreviewDocId(docId)} />
        );
      case 'validation_results':
      case 'compliance_check':
      case 'reports':
        return (
          <ValidationResultsView
            onOpenDocumentPreview={(docId) => setPreviewDocId(docId)}
            onOpenComplianceReport={() => setComplianceReportOpen(true)}
          />
        );
      case 'document_upload':
      case 'my_applications':
        return (
          <DocumentCentreView onOpenDocumentPreview={(docId) => setPreviewDocId(docId)} />
        );
      case 'officer_dashboard':
      case 'officer_queue':
        return (
          <OfficerReviewDashboard
            onOpenClarificationModal={(appId, docName) =>
              setClarificationModalState({ open: true, appId, docName })
            }
            onOpenDocumentPreview={(docId) => setPreviewDocId(docId)}
          />
        );
      case 'officer_scrutiny':
        return (
          <OfficerDocumentScrutiny
            onOpenClarificationModal={(appId, docName) =>
              setClarificationModalState({ open: true, appId, docName })
            }
          />
        );
      case 'admin_rules':
      case 'admin_overview':
      case 'admin_integrations':
        return <SystemAdminView />;
      case 'admin_master':
      case 'admin_users':
        return <MasterDataView />;
      case 'audit_logs':
        return <AuditLogsView />;
      case 'clarifications':
        return <ClarificationsView />;
      case 'notifications':
        return <NotificationsView />;
      default:
        return (
          <InstitutionDashboard
            onOpenDocumentPreview={(docId) => setPreviewDocId(docId)}
            onOpenComplianceReport={() => setComplianceReportOpen(true)}
          />
        );
    }
  };

  return (
    <div className="flex h-screen bg-slate-50 overflow-hidden font-sans text-slate-800">
      {/* Persistent Dark Navy Sidebar */}
      <Sidebar />

      {/* Main Column */}
      <div className="flex-1 flex flex-col min-w-0 overflow-hidden">
        {/* Top Navbar */}
        <Navbar />

        {/* Scrollable Main Workspace */}
        <main className="flex-1 overflow-y-auto p-4 md:p-6 lg:p-8 space-y-6">
          {renderCurrentView()}

          {/* Persistent Statutory Footer Disclaimer (Matches Image 1 & 5) */}
          <footer className="pt-6 border-t border-slate-200/80 text-center text-xs text-slate-400 leading-relaxed max-w-4xl mx-auto">
            <p>
              <strong className="text-slate-600">Prototype · demonstration data.</strong> Not connected to AICTE systems. AI-generated findings are advisory. They do not establish fraud or determine final regulatory approval. Official scrutiny and final decisions remain with the competent authorities.
            </p>
          </footer>
        </main>
      </div>

      {/* Modals */}
      {previewDocId && (
        <DocumentViewerModal
          documentId={previewDocId}
          onClose={() => setPreviewDocId(null)}
        />
      )}

      {clarificationModalState.open && (
        <ClarificationModal
          applicationId={clarificationModalState.appId}
          documentName={clarificationModalState.docName}
          onClose={() => setClarificationModalState({ open: false, appId: '', docName: '' })}
        />
      )}

      {complianceReportOpen && (
        <ComplianceReportModal onClose={() => setComplianceReportOpen(false)} />
      )}
    </div>
  );
};
