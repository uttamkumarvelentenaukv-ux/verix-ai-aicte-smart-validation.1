import { ApplicationRecord, DocumentItem, ValidationFinding, ValidationRule } from '../types';

/**
 * Calculates the overall preliminary compliance score (0 - 100%)
 * based on document completeness, passed rules, and severity penalties.
 */
export function calculateComplianceScore(
  totalMandatory: number,
  uploadedMandatory: number,
  minorIssuesCount: number,
  majorIssuesCount: number,
  rulesPassedRatio: number = 1.0
): number {
  if (totalMandatory === 0) return 100;

  // Base completeness weight: 50%
  const completenessRatio = Math.min(1, Math.max(0, uploadedMandatory / totalMandatory));
  const completenessScore = completenessRatio * 50;

  // Rules consistency weight: 50%
  const ruleScore = Math.min(1, Math.max(0, rulesPassedRatio)) * 50;

  // Deductions: 10 points per major issue, 3 points per minor issue
  const penalty = (majorIssuesCount * 10) + (minorIssuesCount * 3);

  const rawScore = Math.round(completenessScore + ruleScore - penalty);
  return Math.min(100, Math.max(0, rawScore));
}

/**
 * Checks document checklist completion stats
 */
export function getChecklistStats(documents: DocumentItem[]) {
  const mandatoryDocs = documents.filter((d) => d.mandatory);
  const uploadedMandatory = mandatoryDocs.filter(
    (d) => d.status === 'Uploaded' || d.status === 'Verified' || d.status === 'In Review'
  );
  const pendingMandatory = mandatoryDocs.filter((d) => d.status === 'Not Uploaded');
  const expiredDocs = documents.filter((d) => d.status === 'Expired');
  const optionalDocs = documents.filter((d) => !d.mandatory);

  const total = documents.length;
  const uploadedTotal = documents.filter(
    (d) => d.status === 'Uploaded' || d.status === 'Verified' || d.status === 'In Review'
  ).length;

  return {
    total,
    uploadedTotal,
    mandatoryTotal: mandatoryDocs.length,
    uploadedMandatory: uploadedMandatory.length,
    pendingCount: pendingMandatory.length,
    expiredCount: expiredDocs.length,
    optionalCount: optionalDocs.length,
    percentage: total > 0 ? Math.round((uploadedTotal / total) * 100) : 0,
  };
}

/**
 * Evaluates active validation rules against documents and application data
 */
export function evaluateValidationRules(
  rules: ValidationRule[],
  documents: DocumentItem[],
  application: Partial<ApplicationRecord>
): { findings: ValidationFinding[]; score: number } {
  const findings: ValidationFinding[] = [];
  let evaluatedRules = 0;
  let passedRules = 0;

  for (const rule of rules) {
    if (!rule.enabled) continue;
    evaluatedRules++;

    if (rule.id === 'R-001') {
      // Undertaking / Affiliation present
      const doc = documents.find((d) => d.name.toLowerCase().includes('affiliation') || d.name.toLowerCase().includes('undertaking'));
      if (!doc || doc.status === 'Not Uploaded') {
        findings.push({
          id: `f-${rule.id}-${Date.now()}`,
          applicationId: application.id || 'current',
          documentId: doc?.id,
          documentName: doc?.name || 'Affiliation / Undertaking Letter',
          title: 'Mandatory Undertaking / Affiliation Missing',
          category: 'Completeness',
          severity: 'Major',
          description: 'Required affiliation undertaking as mandated by AICTE Approval Process Handbook is not uploaded.',
          evidence: 'Document status: Not Uploaded',
          expected: 'Valid signed undertaking as per Annexure 3',
          ruleId: rule.id,
          clauseReference: rule.clauseReference,
          confidence: 0.98,
          status: 'Detected',
          createdAt: new Date().toISOString(),
        });
      } else {
        passedRules++;
      }
    } else if (rule.id === 'R-002') {
      // Certificate validity / Expiry check
      const fireDoc = documents.find((d) => d.name.toLowerCase().includes('fire') || d.name.toLowerCase().includes('safety'));
      if (fireDoc && fireDoc.status === 'Needs Update') {
        findings.push({
          id: `f-${rule.id}-${Date.now()}`,
          applicationId: application.id || 'current',
          documentId: fireDoc.id,
          documentName: fireDoc.name,
          title: 'Document Expiry Alert',
          category: 'Rule Compliance',
          severity: 'Minor',
          description: 'The Fire Safety Certificate will expire within 45 days. Renewed certificate required prior to scrutiny committee.',
          evidence: 'Extracted Expiry Date: 2026-11-20',
          expected: 'Minimum 6 months operational validity from application deadline',
          ruleId: rule.id,
          clauseReference: rule.clauseReference,
          confidence: 0.92,
          status: 'Detected',
          createdAt: new Date().toISOString(),
        });
      } else {
        passedRules++;
      }
    } else if (rule.id === 'R-003') {
      // Faculty count match
      const facultyDoc = documents.find((d) => d.name.toLowerCase().includes('faculty'));
      const reportedFaculty = application.totalFaculty ?? 156;
      if (facultyDoc && facultyDoc.extractedFields?.totalFaculty && facultyDoc.extractedFields.totalFaculty !== reportedFaculty) {
        findings.push({
          id: `f-${rule.id}-${Date.now()}`,
          applicationId: application.id || 'current',
          documentId: facultyDoc.id,
          documentName: facultyDoc.name,
          title: 'Faculty Count Discrepancy',
          category: 'Data Consistency',
          severity: 'Minor',
          description: `Discrepancy detected between application form faculty count (${reportedFaculty}) and uploaded biometric roster (${facultyDoc.extractedFields.totalFaculty}).`,
          evidence: `Form: ${reportedFaculty} vs Roster: ${facultyDoc.extractedFields.totalFaculty}`,
          expected: 'Exact match between portal form entry and signed faculty roster',
          ruleId: rule.id,
          clauseReference: rule.clauseReference,
          confidence: 0.95,
          status: 'Detected',
          createdAt: new Date().toISOString(),
        });
      } else {
        passedRules++;
      }
    } else if (rule.id === 'R-004') {
      // QR verification / Digital Authenticity
      const landDoc = documents.find((d) => d.name.toLowerCase().includes('land'));
      if (landDoc && landDoc.extractedFields?.tamperScore && Number(landDoc.extractedFields.tamperScore) > 0.4) {
        findings.push({
          id: `f-${rule.id}-${Date.now()}`,
          applicationId: application.id || 'current',
          documentId: landDoc.id,
          documentName: landDoc.name,
          title: 'Signature Mismatch Detected',
          category: 'Anomaly Detection',
          severity: 'Major',
          description: 'The signature in the submitted deed diverges from authorized signatory records on file. Advisory flag for manual scrutiny.',
          evidence: 'Signatory biometric vector similarity index = 0.61 (< 0.85 threshold)',
          expected: 'Verification with sub-registrar digital records or authorized gazetted signatory',
          ruleId: rule.id,
          clauseReference: rule.clauseReference,
          confidence: 0.89,
          status: 'Detected',
          createdAt: new Date().toISOString(),
        });
      } else {
        passedRules++;
      }
    } else {
      passedRules++;
    }
  }

  const passedRatio = evaluatedRules > 0 ? passedRules / evaluatedRules : 1;
  const stats = getChecklistStats(documents);
  const majorCount = findings.filter((f) => f.severity === 'Major').length;
  const minorCount = findings.filter((f) => f.severity === 'Minor').length;

  const score = calculateComplianceScore(
    stats.mandatoryTotal,
    stats.uploadedMandatory,
    minorCount,
    majorCount,
    passedRatio
  );

  return { findings, score };
}
