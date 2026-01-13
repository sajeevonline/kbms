import { Document, UseCase, Incident, Connector, User, AuditLog } from '../types';

export const USERS: User[] = [
    { id: 'u1', name: 'Ahmed Al-Farsi', role: 'Electrical Engineer', avatar: 'AF' },
    { id: 'u2', name: 'Sarah Jones', role: 'HR Manager', avatar: 'SJ' },
    { id: 'u3', name: 'Mike Chen', role: 'Operations Engineer', avatar: 'MC' },
    { id: 'u4', name: 'Layla Hamsik', role: 'Legal Counsel', avatar: 'LH' },
    { id: 'u5', name: 'John Smith', role: 'External Contractor', avatar: 'JS' },
    { id: 'u6', name: 'Dr. Khalid', role: 'CIO/Admin', avatar: 'DK' },
];

export const DOCUMENTS: Document[] = [
    { id: 'doc-001', title: 'Electrical Safety Policy', type: 'Policy', domain: 'Engineering', source: 'SharePoint', sensitivity: 'Internal', language: 'en', updatedAt: '2025-10-15', tags: ['Safety'], contentSnippet: 'Mandatory lockout procedures.' },
    { id: 'doc-002', title: 'Pump Maintenance SOP', type: 'SOP', domain: 'Engineering', source: 'Confluence', sensitivity: 'Internal', language: 'en', updatedAt: '2025-11-02', tags: ['Pumps'], contentSnippet: 'Centrifugal pump maintenance steps.' }
];

export const USE_CASES: UseCase[] = [
    {
        id: 'uc-045',
        title: 'Pump vibration above threshold',
        problem: 'High vibration on CP-301.',
        context: 'Peak load.',
        rootCause: 'Misalignment.',
        resolution: 'Re-aligned coupling.',
        lessonsLearned: 'Verify alignment.',
        domain: 'Engineering',
        owner: 'Mike Chen',
        status: 'Approved',
        linkedDocs: ['doc-002'],
        linkedIncidents: ['inc-992'],
        tags: ['Pump', 'Vibration'],
        reuseCount: 12
    }
];

export const INCIDENTS: Incident[] = [
    { id: 'inc-992', title: 'Pump CP-301 High Vibration', status: 'Closed', priority: 'P2', assignee: 'Mike Chen', description: 'Vibration alarms.', createdDate: '2025-11-20' }
];

export const CONNECTORS: Connector[] = [
    { id: 'conn-1', name: 'SharePoint', type: 'SharePoint', status: 'Active', lastRun: 'Today', nextRun: 'Tomorrow', recordsIngested: 100 }
];
