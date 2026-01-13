import { Shield, Activity, FileText, CheckCircle, Lock, Users, Download, AlertTriangle } from 'lucide-react';

export const GovernancePage = () => {
    const activeControls = [
        { name: 'Audit Logging', status: 'Active', icon: FileText, desc: 'Capturing all search & view events' },
        { name: 'Access Control', status: 'Enforced', icon: Lock, desc: 'RBAC policies applied to all queries' },
        { name: 'Encryption', status: 'Enabled', icon: Shield, desc: 'Data encrypted at rest (AES-256)' },
        { name: 'User Activity', status: 'Monitoring', icon: Users, desc: 'Real-time session tracking' },
    ];

    const auditLogs = [
        { id: '1', time: '14:23', user: 'Mike Chen', role: 'Ops Engineer', action: 'Search', details: 'Query: "pump vibration protocols"', status: 'Allowed' },
        { id: '2', time: '14:18', user: 'Sarah Jones', role: 'HR Manager', action: 'View', details: 'Opened "HR_Policy_2024.pdf"', status: 'Allowed' },
        { id: '3', time: '14:12', user: 'John Smith', role: 'Contractor', action: 'Access', details: 'Attempted access to Restricted/Financials', status: 'Blocked' },
        { id: '4', time: '13:55', user: 'Ahmed Al-Farsi', role: 'Engineer', action: 'Export', details: 'Exported report: "Safety_Checks_Q1"', status: 'Allowed' },
        { id: '5', time: '13:42', user: 'System', role: 'Automated', action: 'Index', details: 'Ingested 145 new documents from SharePoint', status: 'Success' },
    ];

    return (
        <div className="space-y-8 max-w-6xl mx-auto">
            <div>
                <h1 className="text-3xl font-bold text-slate-900 tracking-tight">Governance & Audit</h1>
                <p className="text-slate-500 mt-2 text-lg">System-wide security monitoring and activity logs.</p>
            </div>

            {/* Status Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                {activeControls.map((control) => (
                    <div key={control.name} className="bg-white p-5 rounded-xl border border-slate-200 shadow-sm flex flex-col justify-between hover:shadow-md transition-shadow">
                        <div className="flex justify-between items-start mb-4">
                            <div className="p-2 bg-blue-50 text-blue-600 rounded-lg">
                                <control.icon className="w-5 h-5" />
                            </div>
                            <span className="flex items-center gap-1.5 px-2.5 py-1 bg-green-50 text-green-700 text-xs font-bold rounded-full">
                                <Activity className="w-3 h-3" />
                                {control.status}
                            </span>
                        </div>
                        <div>
                            <h3 className="font-bold text-slate-900">{control.name}</h3>
                            <p className="text-xs text-slate-500 mt-1">{control.desc}</p>
                        </div>
                    </div>
                ))}
            </div>

            {/* Audit Log Section */}
            <div className="bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden">
                <div className="px-6 py-4 border-b border-slate-200 flex items-center justify-between bg-slate-50/50">
                    <div className="flex items-center gap-2">
                        <FileText className="w-4 h-4 text-slate-500" />
                        <h3 className="font-bold text-slate-900">Recent Activity Log</h3>
                    </div>
                    <button className="flex items-center gap-2 px-3 py-1.5 text-sm font-medium text-slate-600 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-colors">
                        <Download className="w-4 h-4" />
                        Export CSV
                    </button>
                </div>

                <div className="overflow-x-auto">
                    <table className="w-full text-sm text-left">
                        <thead className="bg-slate-50 text-slate-500 font-medium border-b border-slate-200">
                            <tr>
                                <th className="px-6 py-3 w-32">Time</th>
                                <th className="px-6 py-3 w-48">User</th>
                                <th className="px-6 py-3 w-32">Action</th>
                                <th className="px-6 py-3">Details</th>
                                <th className="px-6 py-3 w-32">Status</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-slate-100">
                            {auditLogs.map((log) => (
                                <tr key={log.id} className="hover:bg-slate-50/80 transition-colors">
                                    <td className="px-6 py-3.5 text-slate-500 font-mono text-xs">{log.time}</td>
                                    <td className="px-6 py-3.5">
                                        <div className="font-medium text-slate-900">{log.user}</div>
                                        <div className="text-xs text-slate-400">{log.role}</div>
                                    </td>
                                    <td className="px-6 py-3.5">
                                        <span className="inline-flex items-center px-2 py-1 rounded bg-slate-100 text-slate-600 text-xs font-medium">
                                            {log.action}
                                        </span>
                                    </td>
                                    <td className="px-6 py-3.5 text-slate-600">{log.details}</td>
                                    <td className="px-6 py-3.5">
                                        {log.status === 'Blocked' ? (
                                            <span className="inline-flex items-center gap-1.5 text-xs font-bold text-red-600 bg-red-50 px-2 py-1 rounded-full">
                                                <AlertTriangle className="w-3 h-3" /> Blocked
                                            </span>
                                        ) : (
                                            <span className="inline-flex items-center gap-1.5 text-xs font-bold text-green-600 bg-green-50 px-2 py-1 rounded-full">
                                                <CheckCircle className="w-3 h-3" /> {log.status}
                                            </span>
                                        )}
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
};
