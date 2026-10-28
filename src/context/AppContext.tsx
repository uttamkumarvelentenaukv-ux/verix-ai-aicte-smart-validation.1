import React, { createContext, useContext, useState, useEffect } from 'react';
import {
  UserProfile,
  UserRole,
  ApplicationRecord,
  DocumentItem,
  ValidationFinding,
  ValidationRule,
  ClarificationRequest,
  AuditLogEvent,
  SystemNotification,
  IntegrationService,
} from '../types';
import {
  INITIAL_USERS,
  INITIAL_APPLICATIONS,
  INITIAL_DOCUMENTS,
  INITIAL_FINDINGS,
  INITIAL_RULES,
  INITIAL_CLARIFICATIONS,
  INITIAL_AUDIT_LOGS,
  INITIAL_NOTIFICATIONS,
  INITIAL_INTEGRATIONS,
} from '../data/mockData';
import { evaluateValidationRules } from '../utils/validationEngine';

interface AppContextType {
  currentUser: UserProfile;
  setCurrentUser: (user: UserProfile) => void;
  switchRole: (role: UserRole) => void;
  currentView: string;
  setCurrentView: (view: string) => void;
  selectedApplicationId: string;
  setSelectedApplicationId: (id: string) => void;
  selectedDocumentId: string | null;
  setSelectedDocumentId: (id: string | null) => void;

  applications: ApplicationRecord[];
  documents: DocumentItem[];
  findings: ValidationFinding[];
  rules: ValidationRule[];
  clarifications: ClarificationRequest[];
  auditLogs: AuditLogEvent[];
  notifications: SystemNotification[];
  integrations: IntegrationService[];

  // Actions
  selectApplicationForReview: (appId: string) => void;
  createNewApplication: (appData: Partial<ApplicationRecord>) => string;
  uploadDocumentItem: (docId: string, fileName: string, fileSize: string) => void;
  runValidationJob: (appId: string) => void;
  toggleValidationRule: (ruleId: string) => void;
  addNewRule: (newRule: Omit<ValidationRule, 'id'>) => void;
  testIntegrationService: (id: string) => void;
  createClarification: (appId: string, documentName: string, text: string, findingId?: string) => void;
  respondToClarification: (clarificationId: string, responseText: string) => void;
  updateFindingStatus: (
    findingId: string,
    status: 'Confirmed' | 'Dismissed' | 'Clarification Requested' | 'Resolved',
    notes?: string
  ) => void;
  recordOfficialDecision: (appId: string, decision: 'AICTE Approved' | 'Pending Review' | 'Needs Clarification', notes: string) => void;
  markNotificationAsRead: (id: string) => void;
  markAllNotificationsAsRead: () => void;
  resetAllDemoData: () => void;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

export const AppProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  // Load state or fallback to defaults
  const [currentUser, setCurrentUser] = useState<UserProfile>(() => {
    const saved = localStorage.getItem('verix_user');
    if (saved) {
      try { return JSON.parse(saved); } catch (e) { /* ignore */ }
    }
    return INITIAL_USERS[0]; // Institution user default
  });

  // Current view starts on 'home_chooser' so user can pick their role on landing!
  const [currentView, setCurrentView] = useState<string>('home_chooser');
  const [selectedApplicationId, setSelectedApplicationId] = useState<string>('VERIX-2025-00124');
  const [selectedDocumentId, setSelectedDocumentId] = useState<string | null>('doc-4');

  const [applications, setApplications] = useState<ApplicationRecord[]>(() => {
    const saved = localStorage.getItem('verix_applications');
    return saved ? JSON.parse(saved) : INITIAL_APPLICATIONS;
  });

  const [documents, setDocuments] = useState<DocumentItem[]>(() => {
    const saved = localStorage.getItem('verix_documents');
    return saved ? JSON.parse(saved) : INITIAL_DOCUMENTS;
  });

  const [findings, setFindings] = useState<ValidationFinding[]>(() => {
    const saved = localStorage.getItem('verix_findings');
    return saved ? JSON.parse(saved) : INITIAL_FINDINGS;
  });

  const [rules, setRules] = useState<ValidationRule[]>(() => {
    const saved = localStorage.getItem('verix_rules');
    return saved ? JSON.parse(saved) : INITIAL_RULES;
  });

  const [clarifications, setClarifications] = useState<ClarificationRequest[]>(() => {
    const saved = localStorage.getItem('verix_clarifications');
    return saved ? JSON.parse(saved) : INITIAL_CLARIFICATIONS;
  });

  const [auditLogs, setAuditLogs] = useState<AuditLogEvent[]>(() => {
    const saved = localStorage.getItem('verix_audit_logs');
    return saved ? JSON.parse(saved) : INITIAL_AUDIT_LOGS;
  });

  const [notifications, setNotifications] = useState<SystemNotification[]>(() => {
    const saved = localStorage.getItem('verix_notifications');
    return saved ? JSON.parse(saved) : INITIAL_NOTIFICATIONS;
  });

  const [integrations, setIntegrations] = useState<IntegrationService[]>(() => {
    const saved = localStorage.getItem('verix_integrations');
    return saved ? JSON.parse(saved) : INITIAL_INTEGRATIONS;
  });

  // Persist key states
  useEffect(() => {
    localStorage.setItem('verix_user', JSON.stringify(currentUser));
  }, [currentUser]);

  useEffect(() => {
    localStorage.setItem('verix_applications', JSON.stringify(applications));
  }, [applications]);

  useEffect(() => {
    localStorage.setItem('verix_documents', JSON.stringify(documents));
  }, [documents]);

  useEffect(() => {
    localStorage.setItem('verix_rules', JSON.stringify(rules));
  }, [rules]);

  useEffect(() => {
    localStorage.setItem('verix_clarifications', JSON.stringify(clarifications));
  }, [clarifications]);

  const switchRole = (role: UserRole) => {
    const targetUser = INITIAL_USERS.find((u) => u.role === role) || INITIAL_USERS[0];
    setCurrentUser(targetUser);
    if (role === 'institution') {
      setCurrentView('dashboard');
    } else if (role === 'officer') {
      setCurrentView('officer_dashboard');
    } else if (role === 'admin') {
      setCurrentView('admin_rules');
    }
  };

  const selectApplicationForReview = (appId: string) => {
    setSelectedApplicationId(appId);
    if (currentUser.role === 'officer') {
      setCurrentView('officer_scrutiny');
    } else {
      setCurrentView('validation_results');
    }
  };

  const createNewApplication = (appData: Partial<ApplicationRecord>): string => {
    const newId = `VERIX-2026-${String(Math.floor(10000 + Math.random() * 90000))}`;
    const newApp: ApplicationRecord = {
      id: newId,
      referenceNumber: newId,
      institutionName: appData.institutionName || currentUser.institutionName || 'Rungta College of Engineering and Technology',
      aisheCode: appData.aisheCode || currentUser.aisheCode || 'C-12345',
      category: appData.category || 'Extension of Approval (EoA)',
      academicYear: appData.academicYear || '2026 - 2027',
      institutionType: appData.institutionType || 'Private Self Financing',
      state: appData.state || 'Chhattisgarh',
      city: appData.city || 'Bhilai',
      status: 'Under Validation',
      submissionDate: new Date().toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: 'numeric' }) + ', ' + new Date().toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' }),
      lastUpdated: 'Just now',
      complianceScore: 85,
      totalDocs: 8,
      validDocs: 6,
      minorIssues: 1,
      majorIssues: 1,
      pendingDocs: 0,
      assignedOfficer: 'Reviewer 01',
      priority: 'High',
      programsCount: 12,
      totalFaculty: 156,
      landArea: '25.4 Acres',
      builtUpArea: '32,600 sq. m.',
      yearOfEstablishment: 2003,
      ...appData,
    };

    setApplications((prev) => [newApp, ...prev]);
    setSelectedApplicationId(newId);

    // Add Audit Log
    const log: AuditLogEvent = {
      id: `aud-${Date.now()}`,
      actorName: currentUser.name,
      actorRole: currentUser.role,
      action: 'Application Submitted',
      applicationRef: newId,
      details: `New application created under category ${newApp.category} for Academic Year ${newApp.academicYear}.`,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) + ' today',
      status: 'success',
    };
    setAuditLogs((prev) => [log, ...prev]);

    // Add Notification for Officer
    const notif: SystemNotification = {
      id: `notif-${Date.now()}`,
      recipientRole: 'officer',
      title: 'New Application Submitted for Scrutiny',
      message: `Institution ${newApp.institutionName} submitted application ${newId}. Automated AI validation queued.`,
      timestamp: 'Just now',
      read: false,
      applicationRef: newId,
      type: 'submission',
    };
    setNotifications((prev) => [notif, ...prev]);

    return newId;
  };

  const uploadDocumentItem = (docId: string, fileName: string, fileSize: string) => {
    setDocuments((prev) =>
      prev.map((doc) => {
        if (doc.id === docId) {
          return {
            ...doc,
            fileName,
            size: fileSize,
            uploadDate: 'Just now',
            status: 'Verified',
            aiCheck: 'verified',
            preCheckResults: {
              readableText: true,
              documentTypeMatched: true,
              noTamperingDetected: true,
              requiredFieldsFound: true,
              confidence: 0.98,
            },
          };
        }
        return doc;
      })
    );

    // Audit log
    setAuditLogs((prev) => [
      {
        id: `aud-${Date.now()}`,
        actorName: currentUser.name,
        actorRole: currentUser.role,
        action: 'Document Uploaded',
        documentName: fileName,
        details: `Uploaded ${fileName} (${fileSize}). Real-time OCR and tamper scan returned confidence 0.98.`,
        timestamp: 'Just now',
        status: 'success',
      },
      ...prev,
    ]);
  };

  const runValidationJob = (appId: string) => {
    const targetApp = applications.find((a) => a.id === appId) || applications[0];
    const appDocs = documents.filter((d) => d.applicationId === appId || appId === 'current');
    const { findings: evaluatedFindings, score } = evaluateValidationRules(rules, appDocs, targetApp);

    setApplications((prev) =>
      prev.map((app) => (app.id === appId ? { ...app, complianceScore: score, status: 'Pending Review' } : app))
    );

    // Audit log
    setAuditLogs((prev) => [
      {
        id: `aud-${Date.now()}`,
        actorName: 'VERIX AI Pipeline',
        actorRole: 'admin',
        action: 'AI Validation Pipeline Completed',
        applicationRef: appId,
        details: `Evaluated ${rules.filter((r) => r.enabled).length} active rules. Generated ${evaluatedFindings.length} findings with compliance score ${score}%.`,
        timestamp: 'Just now',
        status: 'warning',
      },
      ...prev,
    ]);
  };

  const toggleValidationRule = (ruleId: string) => {
    setRules((prev) =>
      prev.map((r) => {
        if (r.id === ruleId) {
          const nextState = !r.enabled;
          // Add audit log
          setAuditLogs((logs) => [
            {
              id: `aud-${Date.now()}`,
              actorName: currentUser.name,
              actorRole: currentUser.role,
              action: nextState ? 'Rule Enabled' : 'Rule Disabled',
              details: `Rule ${r.id} (${r.name}) was toggled to ${nextState ? 'active' : 'inactive'}.`,
              timestamp: 'Just now',
              status: 'success',
            },
            ...logs,
          ]);
          return { ...r, enabled: nextState };
        }
        return r;
      })
    );
  };

  const addNewRule = (newRule: Omit<ValidationRule, 'id'>) => {
    const newId = `R-00${rules.length + 1}`;
    const rule: ValidationRule = { ...newRule, id: newId };
    setRules((prev) => [...prev, rule]);
    setAuditLogs((logs) => [
      {
        id: `aud-${Date.now()}`,
        actorName: currentUser.name,
        actorRole: currentUser.role,
        action: 'Rule Created',
        details: `New validation rule ${newId} (${rule.name}) added by administrator.`,
        timestamp: 'Just now',
        status: 'success',
      },
      ...logs,
    ]);
  };

  const testIntegrationService = (id: string) => {
    setIntegrations((prev) =>
      prev.map((item) => {
        if (item.id === id) {
          const isNowConnected = item.status !== 'Connected (demo)';
          return {
            ...item,
            status: isNowConnected ? 'Connected (demo)' : 'Source Unavailable',
            lastTested: 'Just now',
            lastError: isNowConnected ? undefined : 'demo service timeout: state registry gateway unreachable',
          };
        }
        return item;
      })
    );
  };

  const createClarification = (appId: string, documentName: string, text: string, findingId?: string) => {
    const targetApp = applications.find((a) => a.id === appId);
    const newClarification: ClarificationRequest = {
      id: `clr-${Date.now()}`,
      applicationId: appId,
      applicationRef: targetApp?.referenceNumber || appId,
      institutionName: targetApp?.institutionName || 'Rungta College of Engineering and Technology',
      findingId,
      documentName,
      requestedBy: currentUser.name + ' (' + currentUser.designation + ')',
      requestText: text,
      status: 'Pending Institution Response',
      createdAt: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) + ' today',
    };

    setClarifications((prev) => [newClarification, ...prev]);

    // Update app status
    setApplications((prev) =>
      prev.map((a) => (a.id === appId ? { ...a, status: 'Needs Clarification' } : a))
    );

    // Audit log
    setAuditLogs((prev) => [
      {
        id: `aud-${Date.now()}`,
        actorName: currentUser.name,
        actorRole: currentUser.role,
        action: 'Clarification Issued',
        applicationRef: appId,
        documentName,
        details: `Notice issued for ${documentName}: "${text.slice(0, 80)}..."`,
        timestamp: 'Just now',
        status: 'flag',
      },
      ...prev,
    ]);

    // Notification for institution
    setNotifications((prev) => [
      {
        id: `notif-${Date.now()}`,
        recipientRole: 'institution',
        title: 'Action Required: AICTE Clarification Notice',
        message: `Reviewer has requested clarification on ${documentName} for ${appId}.`,
        timestamp: 'Just now',
        read: false,
        applicationRef: appId,
        type: 'clarification',
      },
      ...prev,
    ]);
  };

  const respondToClarification = (clarificationId: string, responseText: string) => {
    setClarifications((prev) =>
      prev.map((c) =>
        c.id === clarificationId
          ? {
              ...c,
              status: 'Responded & Under Review',
              responseText,
              responseDate: 'Just now',
            }
          : c
      )
    );

    setAuditLogs((prev) => [
      {
        id: `aud-${Date.now()}`,
        actorName: currentUser.name,
        actorRole: currentUser.role,
        action: 'Clarification Responded',
        details: `Institution submitted response to clarification request ${clarificationId}.`,
        timestamp: 'Just now',
        status: 'success',
      },
      ...prev,
    ]);

    setNotifications((prev) => [
      {
        id: `notif-${Date.now()}`,
        recipientRole: 'officer',
        title: 'Institution Responded to Clarification',
        message: `${currentUser.name} replied with additional evidence for review.`,
        timestamp: 'Just now',
        read: false,
        type: 'clarification',
      },
      ...prev,
    ]);
  };

  const updateFindingStatus = (
    findingId: string,
    status: 'Confirmed' | 'Dismissed' | 'Clarification Requested' | 'Resolved',
    notes?: string
  ) => {
    setFindings((prev) =>
      prev.map((f) =>
        f.id === findingId
          ? {
              ...f,
              status,
              resolutionNotes: notes || f.resolutionNotes,
              reviewedBy: currentUser.name,
              reviewedAt: 'Just now',
            }
          : f
      )
    );

    setAuditLogs((prev) => [
      {
        id: `aud-${Date.now()}`,
        actorName: currentUser.name,
        actorRole: currentUser.role,
        action: `Finding Marked as ${status}`,
        details: `Officer ${currentUser.name} updated finding ${findingId}. Reason: ${notes || 'Standard scrutiny protocol.'}`,
        timestamp: 'Just now',
        status: status === 'Dismissed' ? 'success' : 'flag',
      },
      ...prev,
    ]);
  };

  const recordOfficialDecision = (
    appId: string,
    decision: 'AICTE Approved' | 'Pending Review' | 'Needs Clarification',
    notes: string
  ) => {
    setApplications((prev) =>
      prev.map((a) => (a.id === appId ? { ...a, status: decision, lastUpdated: 'Just now' } : a))
    );

    setAuditLogs((prev) => [
      {
        id: `aud-${Date.now()}`,
        actorName: currentUser.name,
        actorRole: currentUser.role,
        action: `Regulatory Scrutiny Decision: ${decision}`,
        applicationRef: appId,
        details: `Decision recorded: ${decision}. Scrutiny findings note: ${notes}`,
        timestamp: 'Just now',
        status: decision === 'AICTE Approved' ? 'success' : 'flag',
      },
      ...prev,
    ]);
  };

  const markNotificationAsRead = (id: string) => {
    setNotifications((prev) => prev.map((n) => (n.id === id ? { ...n, read: true } : n)));
  };

  const markAllNotificationsAsRead = () => {
    setNotifications((prev) => prev.map((n) => ({ ...n, read: true })));
  };

  const resetAllDemoData = () => {
    localStorage.removeItem('verix_applications');
    localStorage.removeItem('verix_documents');
    localStorage.removeItem('verix_rules');
    localStorage.removeItem('verix_clarifications');
    localStorage.removeItem('verix_audit_logs');
    localStorage.removeItem('verix_notifications');
    setApplications(INITIAL_APPLICATIONS);
    setDocuments(INITIAL_DOCUMENTS);
    setFindings(INITIAL_FINDINGS);
    setRules(INITIAL_RULES);
    setClarifications(INITIAL_CLARIFICATIONS);
    setAuditLogs(INITIAL_AUDIT_LOGS);
    setNotifications(INITIAL_NOTIFICATIONS);
    setIntegrations(INITIAL_INTEGRATIONS);
  };

  return (
    <AppContext.Provider
      value={{
        currentUser,
        setCurrentUser,
        switchRole,
        currentView,
        setCurrentView,
        selectedApplicationId,
        setSelectedApplicationId,
        selectedDocumentId,
        setSelectedDocumentId,
        applications,
        documents,
        findings,
        rules,
        clarifications,
        auditLogs,
        notifications,
        integrations,
        selectApplicationForReview,
        createNewApplication,
        uploadDocumentItem,
        runValidationJob,
        toggleValidationRule,
        addNewRule,
        testIntegrationService,
        createClarification,
        respondToClarification,
        updateFindingStatus,
        recordOfficialDecision,
        markNotificationAsRead,
        markAllNotificationsAsRead,
        resetAllDemoData,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const useApp = () => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useApp must be used within an AppProvider');
  }
  return context;
};
