import { create } from 'zustand';
import { Document, UseCase, Incident, Connector } from '../types';
import { DOCUMENTS, USE_CASES, INCIDENTS, CONNECTORS } from '../data/mockData';

interface DataState {
    documents: Document[];
    useCases: UseCase[];
    incidents: Incident[];
    connectors: Connector[]; // Mutable for demo

    addUseCase: (uc: UseCase) => void;
    updateConnectorStatus: (id: string, status: Connector['status']) => void;
}

export const useDataStore = create<DataState>((set) => ({
    documents: [...DOCUMENTS],
    useCases: [...USE_CASES],
    incidents: [...INCIDENTS],
    connectors: [...CONNECTORS],

    addUseCase: (uc) => set((state) => ({ useCases: [uc, ...state.useCases] })),

    updateConnectorStatus: (id, status) => set((state) => ({
        connectors: state.connectors.map(c => c.id === id ? { ...c, status } : c)
    })),
}));
