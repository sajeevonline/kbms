export type Role = 'Electrical Engineer' | 'Operations Engineer' | 'HR Manager' | 'Legal Counsel' | 'External Contractor' | 'CIO/Admin';

export interface User {
    id: string;
    name: string;
    role: Role;
    avatar: string;
}

export interface Document {
    id: string;
    title: string;
    type: 'Policy' | 'SOP' | 'Runbook' | 'Design' | 'Memo' | 'Report';
    domain: 'Engineering' | 'Operations' | 'HR' | 'Legal' | 'Finance';
    source: 'SharePoint' | 'Confluence' | 'ServiceNow';
    sensitivity: 'Public' | 'Internal' | 'Confidential' | 'Restricted';
    language: 'en' | 'ar';
    updatedAt: string;
    contentSnippet: string;
    tags: string[];
}

export interface UseCase {
    id: string;
    title: string;
    problem: string;
    context: string;
    rootCause: string;
    resolution: string;
    lessonsLearned: string;
    domain: string;
    owner: string;
    status: 'Draft' | 'Review' | 'Approved';
    linkedDocs: string[]; // Document IDs
    linkedIncidents: string[]; // Incident IDs
    tags: string[];
    reuseCount: number;
}

export interface Incident {
    id: string;
    title: string;
    status: 'Open' | 'Resolved' | 'Closed';
    priority: 'P1' | 'P2' | 'P3' | 'P4';
    assignee: string;
    description: string;
    resolutionNotes?: string;
    createdDate: string;
}

export interface Connector {
    id: string;
    name: string;
    type: 'SharePoint' | 'Confluence' | 'ServiceNow';
    status: 'Active' | 'Error' | 'Syncing';
    lastRun: string;
    nextRun: string;
    recordsIngested: number;
    errorMsg?: string;
}

export interface AuditLog {
    id: string;
    timestamp: string;
    user: string;
    role: Role;
    action: 'Query' | 'View' | 'Export' | 'Approve' | 'Override';
    details: string;
    outcome: 'Allowed' | 'Denied' | 'Redacted';
}

export interface ChatMessage {
    id: string;
    role: 'user' | 'assistant';
    content: string;
    citations?: string[]; // IDs of Docs or UseCases
    metadata?: {
        confidence: 'High' | 'Medium' | 'Low';
        sourcesUsed: number;
        accessDeniedCount: number;
    };
}
