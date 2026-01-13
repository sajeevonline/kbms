import { useState } from 'react';
import { Link, CheckCircle, AlertCircle, RefreshCw, Plus, Trash2, Settings } from 'lucide-react';
import { useAppStore, type Connector } from '../store/useAppStore';
import { ConnectorDrawer } from '../components/ConnectorDrawer';

export const ConnectorsPage = () => {
    const { connectors, deleteConnector } = useAppStore();
    const [isDrawerOpen, setIsDrawerOpen] = useState(false);
    const [editingConn, setEditingConn] = useState<Connector | null>(null);

    const activeCount = connectors.filter(c => c.status === 'Active' || c.status === 'Syncing').length;
    const errorCount = connectors.filter(c => c.status === 'Error').length;
    const totalRecords = connectors.reduce((sum, c) => sum + c.recordsIngested, 0);

    const handleEdit = (conn: Connector) => {
        setEditingConn(conn);
        setIsDrawerOpen(true);
    };

    const handleNew = () => {
        setEditingConn(null);
        setIsDrawerOpen(true);
    };

    const handleDelete = (id: string) => {
        if (confirm('Are you sure you want to delete this connector?')) {
            deleteConnector(id);
        }
    };

    return (
        <div className="space-y-6">
            <div className="flex items-center justify-between">
                <div>
                    <h1 className="text-3xl font-bold text-slate-900">Connectors & Schedules</h1>
                    <p className="text-slate-600 mt-1">Manage data source integrations</p>
                </div>
                <button
                    onClick={handleNew}
                    className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors shadow-sm"
                >
                    <Plus className="w-4 h-4" />
                    New Connector
                </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-6">
                    <div className="flex items-center justify-between mb-2">
                        <span className="text-sm text-slate-600">Active Connectors</span>
                        <CheckCircle className="w-5 h-5 text-green-600" />
                    </div>
                    <p className="text-3xl font-bold text-slate-900">{activeCount}</p>
                </div>
                <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-6">
                    <div className="flex items-center justify-between mb-2">
                        <span className="text-sm text-slate-600">Errors</span>
                        <AlertCircle className="w-5 h-5 text-red-600" />
                    </div>
                    <p className="text-3xl font-bold text-slate-900">{errorCount}</p>
                </div>
                <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-6">
                    <div className="flex items-center justify-between mb-2">
                        <span className="text-sm text-slate-600">Total Records</span>
                        <RefreshCw className="w-5 h-5 text-blue-600" />
                    </div>
                    <p className="text-3xl font-bold text-slate-900">{totalRecords.toLocaleString()}</p>
                </div>
            </div>

            <div className="bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden">
                <table className="w-full">
                    <thead className="bg-slate-50 border-b border-slate-200">
                        <tr>
                            <th className="text-start px-6 py-3 text-xs font-semibold text-slate-600 uppercase">Connector</th>
                            <th className="text-start px-6 py-3 text-xs font-semibold text-slate-600 uppercase">Status</th>
                            <th className="text-start px-6 py-3 text-xs font-semibold text-slate-600 uppercase">Config</th>
                            <th className="text-start px-6 py-3 text-xs font-semibold text-slate-600 uppercase">Last Run</th>
                            <th className="text-start px-6 py-3 text-xs font-semibold text-slate-600 uppercase">Records</th>
                            <th className="text-end px-6 py-3 text-xs font-semibold text-slate-600 uppercase">Actions</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-200">
                        {connectors.map(conn => (
                            <tr key={conn.id} className="hover:bg-slate-50 group">
                                <td className="px-6 py-4">
                                    <div className="flex items-center gap-3">
                                        <div className={`p-2 rounded-lg ${conn.type === 'SharePoint' ? 'bg-blue-100 text-blue-600' :
                                            conn.type === 'Confluence' ? 'bg-sky-100 text-sky-600' :
                                                conn.type === 'ServiceNow' ? 'bg-green-100 text-green-600' :
                                                    'bg-purple-100 text-purple-600'
                                            }`}>
                                            <Link className="w-4 h-4" />
                                        </div>
                                        <div>
                                            <p className="font-medium text-slate-900">{conn.name}</p>
                                            <p className="text-xs text-slate-500">{conn.type}</p>
                                        </div>
                                    </div>
                                </td>
                                <td className="px-6 py-4">
                                    <span className={`px-2 py-1 text-xs rounded-full inline-flex items-center gap-1 ${conn.status === 'Active' ? 'bg-green-100 text-green-700' :
                                        conn.status === 'Error' ? 'bg-red-100 text-red-700' :
                                            conn.status === 'Syncing' ? 'bg-blue-100 text-blue-700' :
                                                'bg-slate-100 text-slate-600'
                                        }`}>
                                        <span className={`w-1.5 h-1.5 rounded-full ${conn.status === 'Active' ? 'bg-green-500' :
                                            conn.status === 'Error' ? 'bg-red-500' :
                                                conn.status === 'Syncing' ? 'bg-blue-500' :
                                                    'bg-slate-500'
                                            }`}></span>
                                        {conn.status}
                                    </span>
                                    {conn.errorMsg && <p className="text-xs text-red-600 mt-1 max-w-[150px] truncate" title={conn.errorMsg}>{conn.errorMsg}</p>}
                                </td>
                                <td className="px-6 py-4 text-sm text-slate-600">
                                    <div className="flex gap-1">
                                        <span className="px-1.5 py-0.5 bg-slate-100 border rounded text-[10px] text-slate-500">
                                            {conn.config?.authMethod || 'Default'}
                                        </span>
                                        <span className="px-1.5 py-0.5 bg-slate-100 border rounded text-[10px] text-slate-500">
                                            {conn.config?.syncFrequency || 'Daily'}
                                        </span>
                                    </div>
                                </td>
                                <td className="px-6 py-4 text-sm text-slate-600">{conn.lastRun}</td>
                                <td className="px-6 py-4 text-sm font-medium text-slate-900">{conn.recordsIngested.toLocaleString()}</td>
                                <td className="px-6 py-4 text-end">
                                    <div className="flex items-center justify-end gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                                        <button
                                            onClick={() => handleEdit(conn)}
                                            className="p-1.5 text-slate-400 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-colors" title="Settings"
                                        >
                                            <Settings className="w-4 h-4" />
                                        </button>
                                        <button
                                            onClick={() => handleDelete(conn.id)}
                                            className="p-1.5 text-slate-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors" title="Delete"
                                        >
                                            <Trash2 className="w-4 h-4" />
                                        </button>
                                    </div>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

            <ConnectorDrawer
                isOpen={isDrawerOpen}
                onClose={() => setIsDrawerOpen(false)}
                editingConnector={editingConn}
            />
        </div>
    );
};
