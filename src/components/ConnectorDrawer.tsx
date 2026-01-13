import { useState, useEffect } from 'react';
import { X, Save, CheckCircle, Folder, ChevronRight, ChevronDown, Lock, Globe, Server, Clock, RefreshCw, Shield, Users } from 'lucide-react';
import { useAppStore, type Connector, type ConnectorConfig, type Role, USERS } from '../store/useAppStore';

interface ConnectorDrawerProps {
    isOpen: boolean;
    onClose: () => void;
    editingConnector?: Connector | null;
}

const TABS = [
    { id: 'general', label: 'General Info' },
    { id: 'auth', label: 'Authentication' },
    { id: 'scope', label: 'Data Scope' },
    { id: 'schedule', label: 'Scheduling' },
    { id: 'permissions', label: 'Permissions' }
];

const ROLES: Role[] = ['Electrical Engineer', 'Operations Engineer', 'HR Manager', 'Legal Counsel', 'External Contractor', 'CIO/Admin'];

// Mock File Tree Data
const MOCK_FILE_TREE = [
    {
        id: 'drive-1', name: 'Engineering Team Site', type: 'drive', children: [
            { id: 'f-1', name: 'Specifications', type: 'folder', children: [] },
            { id: 'f-2', name: 'Design Docs', type: 'folder', children: [] },
            { id: 'f-3', name: 'Archives', type: 'folder', children: [] }
        ]
    },
    {
        id: 'drive-2', name: 'Global Pump Specs', type: 'drive', children: [
            {
                id: 'f-4', name: 'Region: Middle East', type: 'folder', children: [
                    { id: 'f-5', name: 'Saudi Arabia', type: 'folder', children: [] },
                    { id: 'f-6', name: 'UAE', type: 'folder', children: [] }
                ]
            }
        ]
    }
];

export const ConnectorDrawer = ({ isOpen, onClose, editingConnector }: ConnectorDrawerProps) => {
    const { addConnector, updateConnector } = useAppStore();
    const [activeTab, setActiveTab] = useState('general');

    // Form State
    const [formData, setFormData] = useState<Partial<Connector>>({
        name: '',
        type: 'SharePoint',
        status: 'Active',
        config: {
            authMethod: 'OAuth2',
            endpointUrl: '',
            clientId: '',
            clientSecret: '',
            selectedFolders: [],
            fileExtensions: ['pdf', 'docx'],
            includeSubfolders: true,
            syncFrequency: 'Daily',
            syncMode: 'Incremental',
            defaultSensitivity: 'Internal',
            allowedRoles: []
        } as ConnectorConfig
    });

    const [expandedFolders, setExpandedFolders] = useState<string[]>(['drive-1', 'drive-2']);

    // Load data on edit
    useEffect(() => {
        if (editingConnector) {
            setFormData(editingConnector);
        } else {
            // Reset for new
            setFormData({
                name: '',
                type: 'SharePoint',
                status: 'Active',
                config: {
                    authMethod: 'OAuth2',
                    endpointUrl: '',
                    clientId: '',
                    selectedFolders: [],
                    fileExtensions: ['pdf', 'docx'],
                    includeSubfolders: true,
                    syncFrequency: 'Daily',
                    syncMode: 'Incremental',
                    defaultSensitivity: 'Internal',
                    allowedRoles: []
                } as ConnectorConfig
            });
        }
    }, [editingConnector, isOpen]);

    if (!isOpen) return null;

    const updateConfig = (updates: Partial<ConnectorConfig>) => {
        setFormData(prev => ({
            ...prev,
            config: { ...prev.config!, ...updates }
        }));
    };

    const handleSave = () => {
        if (editingConnector) {
            updateConnector(editingConnector.id, formData);
        } else {
            const newConn = {
                id: `conn-${Date.now()}`,
                ...formData,
                lastRun: 'Never',
                nextRun: 'Pending',
                recordsIngested: 0
            } as Connector;
            addConnector(newConn);
        }
        onClose();
    };

    const toggleFolder = (id: string) => {
        setExpandedFolders(prev =>
            prev.includes(id) ? prev.filter(f => f !== id) : [...prev, id]
        );
    };

    const toggleSelection = (id: string) => {
        const current = formData.config?.selectedFolders || [];
        const isSelected = current.includes(id);
        updateConfig({
            selectedFolders: isSelected
                ? current.filter(i => i !== id)
                : [...current, id]
        });
    };

    const renderFileTree = (nodes: any[], level = 0) => {
        return nodes.map(node => (
            <div key={node.id} style={{ marginLeft: level * 20 }}>
                <div className="flex items-center gap-2 py-1 hover:bg-slate-50 p-1 rounded">
                    <button onClick={() => toggleFolder(node.id)} className="text-slate-400 hover:text-slate-600">
                        {node.children.length > 0 ? (
                            expandedFolders.includes(node.id) ? <ChevronDown className="w-4 h-4" /> : <ChevronRight className="w-4 h-4" />
                        ) : <span className="w-4 h-4" />}
                    </button>

                    <input
                        type="checkbox"
                        checked={formData.config?.selectedFolders.includes(node.id)}
                        onChange={() => toggleSelection(node.id)}
                        className="rounded border-slate-300 text-blue-600 focus:ring-blue-500"
                    />

                    <Folder className={`w-4 h-4 ${node.type === 'drive' ? 'text-blue-500 fill-blue-100' : 'text-slate-400'}`} />
                    <span className="text-sm text-slate-700">{node.name}</span>
                </div>
                {expandedFolders.includes(node.id) && node.children.length > 0 && (
                    renderFileTree(node.children, level + 1)
                )}
            </div>
        ));
    };

    return (
        <div className="fixed inset-0 z-50 flex justify-end bg-slate-900/30 backdrop-blur-sm animate-in fade-in">
            <div className="w-[600px] bg-white h-full shadow-2xl flex flex-col animate-in slide-in-from-right duration-300">

                {/* Header */}
                <div className="h-16 border-b border-slate-200 flex items-center justify-between px-6 bg-slate-50">
                    <h2 className="text-lg font-bold text-slate-800">
                        {editingConnector ? `Edit ${editingConnector.name}` : 'New Data Connector'}
                    </h2>
                    <button onClick={onClose} className="p-2 hover:bg-slate-200 rounded-full text-slate-500">
                        <X className="w-5 h-5" />
                    </button>
                </div>

                {/* Tabs */}
                <div className="flex border-b border-slate-200 px-6 gap-6 overflow-x-auto">
                    {TABS.map(tab => (
                        <button
                            key={tab.id}
                            onClick={() => setActiveTab(tab.id)}
                            className={`py-4 text-sm font-medium border-b-2 transition-colors whitespace-nowrap ${activeTab === tab.id
                                    ? 'border-blue-600 text-blue-600'
                                    : 'border-transparent text-slate-500 hover:text-slate-700'
                                }`}
                        >
                            {tab.label}
                        </button>
                    ))}
                </div>

                {/* Content Area */}
                <div className="flex-1 overflow-y-auto p-6">

                    {/* GENERAL TAB */}
                    {activeTab === 'general' && (
                        <div className="space-y-6">
                            <div>
                                <label className="block text-sm font-medium text-slate-700 mb-1">Connector Name</label>
                                <input
                                    type="text"
                                    value={formData.name}
                                    onChange={e => setFormData({ ...formData, name: e.target.value })}
                                    className="w-full px-3 py-2 border border-slate-200 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
                                    placeholder="e.g. Engineering SharePoint"
                                />
                            </div>

                            <div className="grid grid-cols-2 gap-4">
                                <div>
                                    <label className="block text-sm font-medium text-slate-700 mb-1">Type</label>
                                    <div className="p-3 border border-slate-200 rounded-lg bg-slate-50">
                                        <select
                                            value={formData.type}
                                            onChange={e => setFormData({ ...formData, type: e.target.value as any })}
                                            className="w-full bg-transparent border-none outline-none text-sm font-medium"
                                        >
                                            <option value="SharePoint">SharePoint</option>
                                            <option value="Confluence">Confluence</option>
                                            <option value="ServiceNow">ServiceNow</option>
                                            <option value="Salesforce">Salesforce</option>
                                        </select>
                                    </div>
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-slate-700 mb-1">Initial Status</label>
                                    <select
                                        value={formData.status}
                                        onChange={e => setFormData({ ...formData, status: e.target.value as any })}
                                        className="w-full px-3 py-2 border border-slate-200 rounded-lg outline-none"
                                    >
                                        <option value="Active">Active</option>
                                        <option value="Paused">Paused</option>
                                        <option value="Syncing">Syncing</option>
                                    </select>
                                </div>
                            </div>
                        </div>
                    )}

                    {/* AUTH TAB */}
                    {activeTab === 'auth' && (
                        <div className="space-y-6">
                            <div className="flex gap-4 mb-6">
                                {['OAuth2', 'APIKey', 'Basic'].map(m => (
                                    <button
                                        key={m}
                                        onClick={() => updateConfig({ authMethod: m as any })}
                                        className={`px-4 py-2 text-sm rounded-lg border ${formData.config?.authMethod === m
                                                ? 'bg-blue-50 border-blue-200 text-blue-700 font-medium'
                                                : 'bg-white border-slate-200 text-slate-600 hover:bg-slate-50'
                                            }`}
                                    >
                                        {m}
                                    </button>
                                ))}
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-slate-700 mb-1">Endpoint URL</label>
                                <div className="relative">
                                    <Globe className="w-4 h-4 absolute start-3 top-3 text-slate-400" />
                                    <input
                                        type="text"
                                        value={formData.config?.endpointUrl}
                                        onChange={e => updateConfig({ endpointUrl: e.target.value })}
                                        className="w-full ps-10 pe-3 py-2 border border-slate-200 rounded-lg outline-none focus:ring-2 focus:ring-blue-500"
                                        placeholder="https://api.example.com"
                                    />
                                </div>
                            </div>

                            {formData.config?.authMethod === 'OAuth2' && (
                                <>
                                    <div>
                                        <label className="block text-sm font-medium text-slate-700 mb-1">Client ID</label>
                                        <input
                                            type="text"
                                            value={formData.config?.clientId}
                                            onChange={e => updateConfig({ clientId: e.target.value })}
                                            className="w-full px-3 py-2 border border-slate-200 rounded-lg outline-none"
                                        />
                                    </div>
                                    <div>
                                        <label className="block text-sm font-medium text-slate-700 mb-1">Client Secret</label>
                                        <div className="relative">
                                            <input
                                                type="password"
                                                value={formData.config?.clientSecret}
                                                onChange={e => updateConfig({ clientSecret: e.target.value })}
                                                className="w-full px-3 py-2 border border-slate-200 rounded-lg outline-none pe-10"
                                            />
                                            <Lock className="w-4 h-4 absolute end-3 top-3 text-slate-400" />
                                        </div>
                                    </div>
                                </>
                            )}

                            {formData.config?.authMethod === 'APIKey' && (
                                <div>
                                    <label className="block text-sm font-medium text-slate-700 mb-1">API Key</label>
                                    <div className="relative">
                                        <input
                                            type="password"
                                            value={formData.config?.apiKey}
                                            onChange={e => updateConfig({ apiKey: e.target.value })}
                                            className="w-full px-3 py-2 border border-slate-200 rounded-lg outline-none pe-10"
                                            placeholder="sk-..."
                                        />
                                        <Lock className="w-4 h-4 absolute end-3 top-3 text-slate-400" />
                                    </div>
                                </div>
                            )}

                            <div className="pt-4">
                                <button className="w-full py-2 bg-slate-100 text-slate-600 rounded-lg hover:bg-slate-200 font-medium text-sm flex items-center justify-center gap-2">
                                    <Server className="w-4 h-4" />
                                    Test Connection
                                </button>
                                <p className="text-center text-xs text-green-600 mt-2 flex items-center justify-center gap-1 opacity-0">
                                    <CheckCircle className="w-3 h-3" /> Connection Successful
                                </p>
                            </div>
                        </div>
                    )}

                    {/* SCOPE TAB */}
                    {activeTab === 'scope' && (
                        <div className="space-y-6">
                            <div className="bg-slate-50 border border-slate-200 rounded-lg p-4">
                                <h4 className="text-sm font-bold text-slate-700 mb-3 flex items-center gap-2">
                                    <Folder className="w-4 h-4 text-blue-500" />
                                    Select Folders to Sync
                                </h4>
                                <div className="bg-white border border-slate-200 rounded p-2 max-h-60 overflow-y-auto">
                                    {renderFileTree(MOCK_FILE_TREE)}
                                </div>
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-slate-700 mb-2">File Types</label>
                                <div className="flex gap-2 flex-wrap">
                                    {['pdf', 'docx', 'pptx', 'txt', 'html', 'json'].map(ext => {
                                        const isSelected = formData.config?.fileExtensions.includes(ext);
                                        return (
                                            <button
                                                key={ext}
                                                onClick={() => {
                                                    const current = formData.config?.fileExtensions || [];
                                                    const newExts = isSelected
                                                        ? current.filter(e => e !== ext)
                                                        : [...current, ext];
                                                    updateConfig({ fileExtensions: newExts });
                                                }}
                                                className={`px-3 py-1 text-xs font-medium rounded-full border transition-all ${isSelected
                                                        ? 'bg-blue-100 border-blue-200 text-blue-700'
                                                        : 'bg-white border-slate-200 text-slate-600 hover:bg-slate-50'
                                                    }`}
                                            >
                                                {ext.toUpperCase()}
                                            </button>
                                        );
                                    })}
                                </div>
                            </div>

                            <div className="flex items-center gap-2">
                                <input
                                    type="checkbox"
                                    id="subfolders"
                                    checked={formData.config?.includeSubfolders}
                                    onChange={e => updateConfig({ includeSubfolders: e.target.checked })}
                                    className="rounded border-slate-300 text-blue-600"
                                />
                                <label htmlFor="subfolders" className="text-sm text-slate-700 font-medium cursor-pointer">
                                    Recursively include all subfolders
                                </label>
                            </div>
                        </div>
                    )}

                    {/* SCHEDULE TAB */}
                    {activeTab === 'schedule' && (
                        <div className="space-y-6">
                            <div>
                                <label className="block text-sm font-medium text-slate-700 mb-2">Sync Frequency</label>
                                <div className="grid grid-cols-2 gap-3">
                                    {['RealTime', 'Hourly', 'Daily', 'Weekly'].map(freq => (
                                        <button
                                            key={freq}
                                            onClick={() => updateConfig({ syncFrequency: freq as any })}
                                            className={`p-3 rounded-lg border text-start transition-all ${formData.config?.syncFrequency === freq
                                                    ? 'bg-blue-50 border-blue-200 ring-1 ring-blue-300'
                                                    : 'bg-white border-slate-200 hover:border-blue-300'
                                                }`}
                                        >
                                            <span className={`block text-sm font-bold ${formData.config?.syncFrequency === freq ? 'text-blue-700' : 'text-slate-700'
                                                }`}>
                                                {freq}
                                            </span>
                                            <span className="text-xs text-slate-500">
                                                {freq === 'RealTime' ? 'Immediate updates via webhooks' :
                                                    freq === 'Hourly' ? 'Every 60 minutes' :
                                                        freq === 'Daily' ? 'At 00:00 UTC' : 'Every Sunday'}
                                            </span>
                                        </button>
                                    ))}
                                </div>
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-slate-700 mb-2">Sync Mode</label>
                                <div className="flex gap-4 p-4 border border-slate-200 rounded-lg bg-orange-50">
                                    <div className="flex-shrink-0 mt-0.5">
                                        <RefreshCw className="w-5 h-5 text-orange-600" />
                                    </div>
                                    <div>
                                        <h4 className="text-sm font-bold text-orange-800">Incremental vs Full</h4>
                                        <p className="text-xs text-orange-700 mt-1 mb-3">
                                            Incremental is faster but may miss some deletions. Full sync ensures complete consistency but takes longer.
                                        </p>
                                        <div className="flex gap-2">
                                            <button
                                                onClick={() => updateConfig({ syncMode: 'Incremental' })}
                                                className={`px-3 py-1.5 text-xs font-semibold rounded ${formData.config?.syncMode === 'Incremental'
                                                        ? 'bg-white shadow-sm text-orange-700'
                                                        : 'text-orange-600 hover:bg-orange-100'
                                                    }`}
                                            >
                                                Incremental
                                            </button>
                                            <button
                                                onClick={() => updateConfig({ syncMode: 'Full' })}
                                                className={`px-3 py-1.5 text-xs font-semibold rounded ${formData.config?.syncMode === 'Full'
                                                        ? 'bg-white shadow-sm text-orange-700'
                                                        : 'text-orange-600 hover:bg-orange-100'
                                                    }`}
                                            >
                                                Full Sync
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    )}

                    {/* PERMISSIONS TAB (NEW) */}
                    {activeTab === 'permissions' && (
                        <div className="space-y-6">
                            <div>
                                <label className="block text-sm font-medium text-slate-700 mb-1 flex items-center gap-2">
                                    <Shield className="w-4 h-4 text-purple-600" />
                                    Default Sensitivity Label
                                </label>
                                <p className="text-xs text-slate-500 mb-2">Applied to all documents ingested from this source unless overridden by metadata.</p>
                                <select
                                    value={formData.config?.defaultSensitivity}
                                    onChange={e => updateConfig({ defaultSensitivity: e.target.value as any })}
                                    className="w-full px-3 py-2 border border-slate-200 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
                                >
                                    <option value="Public">Public (Accessible by everyone)</option>
                                    <option value="Internal">Internal (Company employees only)</option>
                                    <option value="Confidential">Confidential (Specific roles only)</option>
                                    <option value="Restricted">Restricted (Admins only)</option>
                                </select>
                            </div>

                            <div className="border-t border-slate-100 pt-4">
                                <label className="block text-sm font-medium text-slate-700 mb-3 flex items-center gap-2">
                                    <Users className="w-4 h-4 text-slate-600" />
                                    Restrict Access to Roles
                                </label>
                                <div className="space-y-2 max-h-60 overflow-y-auto pr-2">
                                    {ROLES.map(role => {
                                        const isAllowed = formData.config?.allowedRoles.includes(role);
                                        return (
                                            <div key={role} className="flex items-center gap-3 p-2 hover:bg-slate-50 rounded-lg border border-transparent hover:border-slate-100">
                                                <input
                                                    type="checkbox"
                                                    id={`role-${role}`}
                                                    checked={isAllowed}
                                                    onChange={e => {
                                                        const current = formData.config?.allowedRoles || [];
                                                        const newRoles = e.target.checked
                                                            ? [...current, role]
                                                            : current.filter(r => r !== role);
                                                        updateConfig({ allowedRoles: newRoles });
                                                    }}
                                                    className="rounded border-slate-300 text-blue-600 focus:ring-offset-0"
                                                />
                                                <label htmlFor={`role-${role}`} className="text-sm text-slate-700 cursor-pointer flex-1 user-select-none">
                                                    {role}
                                                </label>
                                            </div>
                                        );
                                    })}
                                </div>
                                <p className="text-xs text-slate-400 mt-2">
                                    * If no specific roles are selected, access defaults to the Sensitivity Label policy.
                                </p>
                            </div>
                        </div>
                    )}

                </div>

                {/* Footer */}
                <div className="p-6 border-t border-slate-200 bg-slate-50 flex justify-between items-center">
                    <div className="text-xs text-slate-500">
                        {activeTab !== 'general' && (
                            <button onClick={() => setActiveTab('general')} className="hover:text-blue-600 hover:underline">
                                Back to General
                            </button>
                        )}
                    </div>
                    <div className="flex gap-3">
                        <button
                            onClick={onClose}
                            className="px-5 py-2.5 text-sm font-medium text-slate-600 hover:bg-white hover:text-slate-900 bg-transparent rounded-lg border border-transparent hover:border-slate-200 transition-all"
                        >
                            Cancel
                        </button>
                        <button
                            onClick={handleSave}
                            className="px-6 py-2.5 text-sm font-bold text-white bg-blue-600 hover:bg-blue-700 rounded-lg shadow-lg shadow-blue-900/10 flex items-center gap-2 transform active:scale-95 transition-all"
                        >
                            <Save className="w-4 h-4" />
                            Save Configuration
                        </button>
                    </div>
                </div>

            </div>
        </div>
    );
};
