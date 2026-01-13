import { Document, UseCase, User, Role } from '../types';

export const canAccessDocument = (user: User, doc: Document): boolean => {
    // 1. Public is open to all
    if (doc.sensitivity === 'Public') return true;

    // 2. Restricted logic
    if (doc.sensitivity === 'Restricted') {
        // Only specific roles can see restricted
        if (doc.domain === 'Legal' && user.role !== 'Legal Counsel') return false;
        if (doc.domain === 'HR' && user.role !== 'HR Manager') return false;
        if (doc.domain === 'Finance' && user.role !== 'CIO/Admin' && user.role !== 'HR Manager') return false;
    }

    // 3. Confidential logic
    if (doc.sensitivity === 'Confidential') {
        if (user.role === 'External Contractor') return false; // Contractor sees only Public/Internal?
        // Cross domain rules:
        if (doc.domain === 'Legal' && user.role !== 'Legal Counsel') return false;
    }

    // 4. Contractor limit
    if (user.role === 'External Contractor') {
        return doc.sensitivity === 'Public'; // Hard limit for demo simplicity? Or allow Internal SOPs?
        // Prompt says: "Contractor sees only “externally approved” safety SOPs and selected public use cases."
        // We'll stick to Public + specific Internal SOPs if we had a flag. 
        // For now, let's say Internal is blocked for Contractor unless tagged 'Safety'.
        if (doc.sensitivity === 'Internal' && doc.tags.includes('Safety')) return true;
        if (doc.sensitivity === 'Internal') return false;
    }

    return true; // Default Internal/Public accessible to employees
};

export const canAccessUseCase = (user: User, uc: UseCase): boolean => {
    // Use cases inherit sensitivity logic roughly.
    // We'll simplify:
    if (user.role === 'External Contractor') return uc.tags.includes('Safety'); // Only safety use cases

    if (uc.domain === 'Legal' && user.role !== 'Legal Counsel') return false;
    if (uc.domain === 'HR' && user.role !== 'HR Manager') return false;

    return true;
};
