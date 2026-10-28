import test from 'node:test';
import assert from 'node:assert/strict';
import { calculateComplianceScore, getChecklistStats, evaluateValidationRules } from './validationEngine';
import { DocumentItem, ValidationRule } from '../types';

test('calculateComplianceScore returns 100% when everything is complete with 0 issues', () => {
  const score = calculateComplianceScore(8, 8, 0, 0, 1.0);
  assert.equal(score, 100);
});

test('calculateComplianceScore penalizes major and minor issues appropriately', () => {
  // 50 base completeness (8/8) + 50 rules (1.0) - (1 major * 10) - (2 minor * 3) = 100 - 16 = 84%
  const score = calculateComplianceScore(8, 8, 2, 1, 1.0);
  assert.equal(score, 84);
});

test('getChecklistStats computes accurate counts and upload percentage', () => {
  const mockDocs: DocumentItem[] = [
    {
      id: '1',
      applicationId: 'app-1',
      name: 'Affiliation Letter',
      type: 'Letter',
      fileName: 'aff.pdf',
      size: '1.2 MB',
      uploadDate: '2026-10-12',
      mandatory: true,
      status: 'Verified',
      aiCheck: 'verified',
      previewType: 'affiliation',
    },
    {
      id: '2',
      applicationId: 'app-1',
      name: 'Financial Statements',
      type: 'Financial',
      fileName: '',
      size: '',
      uploadDate: '',
      mandatory: true,
      status: 'Not Uploaded',
      aiCheck: 'pending',
      previewType: 'financial',
    },
    {
      id: '3',
      applicationId: 'app-1',
      name: 'NBA Accreditation',
      type: 'Accreditation',
      fileName: 'nba.pdf',
      size: '800 KB',
      uploadDate: '2026-10-12',
      mandatory: false,
      status: 'Uploaded',
      aiCheck: 'verified',
      previewType: 'other',
    },
  ];

  const stats = getChecklistStats(mockDocs);
  assert.equal(stats.total, 3);
  assert.equal(stats.uploadedTotal, 2);
  assert.equal(stats.mandatoryTotal, 2);
  assert.equal(stats.uploadedMandatory, 1);
  assert.equal(stats.pendingCount, 1);
  assert.equal(stats.optionalCount, 1);
  assert.equal(stats.percentage, 67);
});

test('evaluateValidationRules produces advisory findings when discrepancies are detected', () => {
  const rules: ValidationRule[] = [
    {
      id: 'R-001',
      name: 'Undertaking present',
      checkType: 'Document Presence',
      severity: 'High',
      version: 'v1.2',
      enabled: true,
      description: 'Checks undertaking presence',
      clauseReference: 'AICTE APH 2024-27 Clause 2.4.1',
      category: 'General',
    },
    {
      id: 'R-003',
      name: 'Faculty count match',
      checkType: 'Institutional-Record Match',
      severity: 'Medium',
      version: 'v2.1',
      enabled: true,
      description: 'Compares portal faculty count with roster',
      clauseReference: 'AICTE APH 2024-27 Clause 7.1',
      category: 'Faculty',
    },
  ];

  const docs: DocumentItem[] = [
    {
      id: '1',
      applicationId: 'app-1',
      name: 'Affiliation Letter',
      type: 'Letter',
      fileName: 'aff.pdf',
      size: '1.2 MB',
      uploadDate: '2026-10-12',
      mandatory: true,
      status: 'Verified',
      aiCheck: 'verified',
      previewType: 'affiliation',
    },
    {
      id: '2',
      applicationId: 'app-1',
      name: 'Faculty Details',
      type: 'Roster',
      fileName: 'fac.pdf',
      size: '500 KB',
      uploadDate: '2026-10-12',
      mandatory: true,
      status: 'Uploaded',
      aiCheck: 'warning',
      previewType: 'faculty',
      extractedFields: { totalFaculty: 148 },
    },
  ];

  const result = evaluateValidationRules(rules, docs, { totalFaculty: 156 });
  assert.equal(result.findings.length, 1);
  assert.equal(result.findings[0].title, 'Faculty Count Discrepancy');
  assert.equal(result.findings[0].severity, 'Minor');
});
