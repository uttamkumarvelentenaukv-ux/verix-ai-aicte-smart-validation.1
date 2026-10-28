export type UserRole = 'institution' | 'officer' | 'admin';

export interface UserProfile {
  id: string;
  name: string;
  email: string;
  role: UserRole;
  avatar: string;
  initials: string;
  institutionName?: string;
  aisheCode?: string;
  designation: string;
  assignedOffice?: string;
}

export type ApplicationStatus =
  | 'Draft'
  | 'Under Validation'
  | 'Pending Review'
  | 'Needs Clarification'
  | 'AICTE Approved'
  | 'Rejected';

export interface ApplicationRecord {
  id: string;
  referenceNumber: string;
  institutionName: string;
  aisheCode: string;
  category: string;
  academicYear: string;
  institutionType: string;
  state: string;
  city: string;
  status: ApplicationStatus;
  submissionDate: string;
  lastUpdated: string;
  complianceScore: number;
  totalDocs: number;
  validDocs: number;
  minorIssues: number;
  majorIssues: number;
  pendingDocs: number;
  assignedOfficer: string;
  priority: 'High' | 'Medium' | 'Low';
  programsCount?: number;
  totalFaculty?: number;
  landArea?: string;
  builtUpArea?: string;
  yearOfEstablishment?: number;
}

export type DocumentStatus =
  | 'Uploaded'
  | 'Processing'
  | 'In Review'
  | 'Verified'
  | 'Needs Update'
  | 'Not Uploaded'
  | 'Expired';

export type AICheckStatus = 'verified' | 'in_review' | 'warning' | 'pending';

export interface DocumentItem {
  id: string;
  applicationId: string;
  name: string;
  type: string;
  fileName: string;
  size: string;
  uploadDate: string;
  mandatory: boolean;
  status: DocumentStatus;
  aiCheck: AICheckStatus;
  previewType: 'land_deed' | 'affiliation' | 'building' | 'faculty' | 'financial' | 'fire_safety' | 'other';
  extractedFields?: Record<string, string | number>;
  preCheckResults?: {
    readableText: boolean;
    documentTypeMatched: boolean;
    noTamperingDetected: boolean;
    requiredFieldsFound: boolean;
    confidence: number;
  };
}

export interface ValidationFinding {
  id: string;
  applicationId: string;
  documentId?: string;
  documentName?: string;
  title: string;
  category: 'Completeness' | 'Data Consistency' | 'Anomaly Detection' | 'Rule Compliance' | 'Issuer Verification';
  severity: 'Major' | 'Minor' | 'Info';
  description: string;
  evidence: string;
  expected: string;
  ruleId?: string;
  clauseReference?: string;
  confidence: number;
  status: 'Detected' | 'Confirmed' | 'Dismissed' | 'Clarification Requested' | 'Resolved';
  resolutionNotes?: string;
  reviewedBy?: string;
  reviewedAt?: string;
  createdAt: string;
}

export interface ValidationRule {
  id: string;
  name: string;
  checkType: string;
  severity: 'High' | 'Medium' | 'Low';
  version: string;
  enabled: boolean;
  description: string;
  clauseReference: string;
  category: string;
}

export interface ClarificationRequest {
  id: string;
  applicationId: string;
  applicationRef: string;
  institutionName: string;
  findingId?: string;
  documentName: string;
  requestedBy: string;
  requestText: string;
  status: 'Pending Institution Response' | 'Responded & Under Review' | 'Resolved';
  responseText?: string;
  responseDate?: string;
  createdAt: string;
}

export interface AuditLogEvent {
  id: string;
  actorName: string;
  actorRole: UserRole;
  action: string;
  applicationRef?: string;
  documentName?: string;
  details: string;
  timestamp: string;
  status: 'success' | 'warning' | 'flag';
}

export interface SystemNotification {
  id: string;
  recipientRole: UserRole | 'all';
  title: string;
  message: string;
  timestamp: string;
  read: boolean;
  applicationRef?: string;
  type: 'submission' | 'validation' | 'clarification' | 'system';
}

export interface IntegrationService {
  id: string;
  name: string;
  type: string;
  status: 'Connected (demo)' | 'Source Unavailable' | 'Connecting' | 'Error';
  isMock: boolean;
  lastTested: string;
  lastError?: string;
}
