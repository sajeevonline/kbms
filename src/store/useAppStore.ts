import { create } from 'zustand';

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
    linkedDocs: string[];
    linkedIncidents: string[];
    tags: string[];
    reuseCount: number;
}

export interface ChatMessage {
    id: string;
    role: 'user' | 'assistant';
    content: string;
    citations?: string[];
    metadata?: {
        confidence: 'High' | 'Medium' | 'Low';
        sourcesUsed: number;
        accessDeniedCount: number;
    };
}

// Advanced Connector Configuration
export interface ConnectorConfig {
    // Auth
    authMethod: 'OAuth2' | 'APIKey' | 'Basic' | 'ServiceAccount';
    endpointUrl?: string;
    clientId?: string;
    clientSecret?: string;
    apiKey?: string;
    tenantId?: string;
    username?: string;

    // Scope / Data Selection
    rootPath?: string;
    selectedFolders: string[]; // Folder IDs
    fileExtensions: string[]; // ['pdf', 'docx']
    includeSubfolders: boolean;

    // Sync
    syncFrequency: 'RealTime' | 'Hourly' | 'Daily' | 'Weekly';
    syncMode: 'Incremental' | 'Full';

    // Permissions
    defaultSensitivity: 'Public' | 'Internal' | 'Confidential' | 'Restricted';
    allowedRoles: Role[];
}

export interface Connector {
    id: string;
    name: string;
    type: 'SharePoint' | 'Confluence' | 'ServiceNow' | 'Salesforce';
    icon?: string;
    description?: string;
    status: 'Active' | 'Error' | 'Syncing' | 'Paused';
    lastRun: string;
    nextRun: string;
    recordsIngested: number;
    errorMsg?: string;
    config: ConnectorConfig; // Extended config
}

// Inline mock data
export const USERS: User[] = [
    { id: 'u1', name: 'Ahmed Al-Farsi', role: 'Electrical Engineer', avatar: 'AF' },
    { id: 'u2', name: 'Sarah Jones', role: 'HR Manager', avatar: 'SJ' },
    { id: 'u3', name: 'Mike Chen', role: 'Operations Engineer', avatar: 'MC' },
    { id: 'u4', name: 'Layla Hamsik', role: 'Legal Counsel', avatar: 'LH' },
    { id: 'u5', name: 'John Smith', role: 'External Contractor', avatar: 'JS' },
    { id: 'u6', name: 'Dr. Khalid', role: 'CIO/Admin', avatar: 'DK' },
];

export const DOCUMENTS: Document[] = [
    { id: 'doc-001', title: 'Electrical Safety Policy', type: 'Policy', domain: 'Engineering', source: 'SharePoint', sensitivity: 'Internal', language: 'en', updatedAt: '2025-10-15', tags: ['Safety'], contentSnippet: 'Mandatory lockout procedures for electrical work.' },
    { id: 'doc-002', title: 'Pump Maintenance SOP', type: 'SOP', domain: 'Engineering', source: 'Confluence', sensitivity: 'Internal', language: 'en', updatedAt: '2025-11-02', tags: ['Pumps', 'Maintenance'], contentSnippet: 'Standard procedure for centrifugal pump maintenance.' }
];

export const USE_CASES: UseCase[] = [
    {
        id: 'uc-045',
        title: 'Pump vibration above threshold',
        problem: 'High vibration on CP-301.',
        context: 'Peak load operation.',
        rootCause: 'Coupling misalignment.',
        resolution: 'Re-aligned coupling with laser tool.',
        lessonsLearned: 'Always verify alignment after seal replacement.',
        domain: 'Engineering',
        owner: 'Mike Chen',
        status: 'Approved',
        linkedDocs: ['doc-002'],
        linkedIncidents: [],
        tags: ['Pump', 'Vibration'],
        reuseCount: 12
    }
];

export const CONNECTORS: Connector[] = [
    {
        id: 'conn-1',
        name: 'Corporate SharePoint',
        type: 'SharePoint',
        status: 'Active',
        lastRun: '2026-01-08 10:00',
        nextRun: '2026-01-08 16:00',
        recordsIngested: 14500,
        config: {
            authMethod: 'OAuth2',
            endpointUrl: 'https://konsultera.sharepoint.com',
            clientId: 'client-123',
            selectedFolders: ['/sites/engineering', '/sites/hr'],
            fileExtensions: ['pdf', 'docx', 'pptx'],
            includeSubfolders: true,
            syncFrequency: 'Hourly',
            syncMode: 'Incremental',
            defaultSensitivity: 'Internal',
            allowedRoles: ['Operations Engineer', 'Electrical Engineer']
        }
    },
    {
        id: 'conn-2',
        name: 'Engineering Confluence',
        type: 'Confluence',
        status: 'Error',
        lastRun: '2026-01-08 09:30',
        nextRun: 'Manual',
        recordsIngested: 0,
        errorMsg: 'Auth Token Expired',
        config: {
            authMethod: 'APIKey',
            endpointUrl: 'https://confluence.konsultera.com',
            apiKey: 'sk-xxxxxxxx',
            selectedFolders: ['/spaces/engineering'],
            fileExtensions: ['html', 'pdf'],
            includeSubfolders: true,
            syncFrequency: 'Daily',
            syncMode: 'Full',
            defaultSensitivity: 'Confidential',
            allowedRoles: ['CIO/Admin']
        }
    },
];

// RBAC utilities
export function canAccessDocument(user: User, doc: Document): boolean {
    if (doc.sensitivity === 'Public') return true;
    if (doc.sensitivity === 'Internal') return user.role !== 'External Contractor';
    if (doc.sensitivity === 'Confidential') return ['CIO/Admin', 'Legal Counsel', 'HR Manager'].includes(user.role);
    if (doc.sensitivity === 'Restricted') return user.role === 'CIO/Admin';
    return false;
}

export function canAccessUseCase(user: User, _uc: UseCase): boolean {
    return user.role !== 'External Contractor';
}

// App Store
interface AppState {
    currentUser: User;
    language: 'en' | 'ar';
    documents: Document[];
    useCases: UseCase[];
    connectors: Connector[]; // NEW

    setUser: (userId: string) => void;
    setRole: (role: Role) => void;
    setLanguage: (lang: 'en' | 'ar') => void;

    // Connector Actions
    addConnector: (connector: Connector) => void;
    updateConnector: (id: string, updates: Partial<Connector>) => void;
    deleteConnector: (id: string) => void;
}

export const useAppStore = create<AppState>((set) => ({
    currentUser: USERS[2],
    language: 'en',
    documents: DOCUMENTS,
    useCases: USE_CASES,
    connectors: CONNECTORS,

    setUser: (userId) => {
        const user = USERS.find(u => u.id === userId);
        if (user) set({ currentUser: user });
    },

    setRole: (role) => {
        const user = USERS.find(u => u.role === role);
        if (user) set({ currentUser: user });
    },

    setLanguage: (lang) => {
        document.documentElement.dir = lang === 'ar' ? 'rtl' : 'ltr';
        document.documentElement.lang = lang;
        set({ language: lang });
    },

    // Connector Actions Implementation
    addConnector: (conn) => set((state) => ({ connectors: [...state.connectors, conn] })),

    updateConnector: (id, updates) => set((state) => ({
        connectors: state.connectors.map(c => c.id === id ? { ...c, ...updates } : c)
    })),

    deleteConnector: (id) => set((state) => ({
        connectors: state.connectors.filter(c => c.id !== id)
    })),
}));
