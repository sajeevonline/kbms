import { useState } from 'react';
import { Search, Plus, MoreVertical, Shield, Settings, Save, Lock, Mail, Users, FileText, CheckCircle, AlertTriangle } from 'lucide-react';

export const AdminPage = () => {
    const [activeTab, setActiveTab] = useState<'users' | 'settings' | 'audit'>('users');

    return (
        <div className="space-y-6">
            <div className="flex flex-col gap-4">
                <h1 className="text-3xl font-bold text-slate-900 tracking-tight">Admin Console</h1>

                <div className="flex border-b border-slate-200">
                    <button
                        onClick={() => setActiveTab('users')}
                        className={`px-6 py-3 text-sm font-medium border-b-2 transition-colors ${activeTab === 'users' ? 'border-blue-600 text-blue-600' : 'border-transparent text-slate-500 hover:text-slate-700'}`}
                    >
                        User Management
                    </button>
                    <button
                        onClick={() => setActiveTab('settings')}
                        className={`px-6 py-3 text-sm font-medium border-b-2 transition-colors ${activeTab === 'settings' ? 'border-blue-600 text-blue-600' : 'border-transparent text-slate-500 hover:text-slate-700'}`}
                    >
                        System Settings
                    </button>
                    <button
                        onClick={() => setActiveTab('audit')}
                        className={`px-6 py-3 text-sm font-medium border-b-2 transition-colors ${activeTab === 'audit' ? 'border-blue-600 text-blue-600' : 'border-transparent text-slate-500 hover:text-slate-700'}`}
                    >
                        Audit Logs
                    </button>
                </div>
            </div>

            {activeTab === 'users' && <UserManagementTab />}
            {activeTab === 'settings' && <SystemSettingsTab />}
            {activeTab === 'audit' && <AuditLogsTab />}
        </div>
    );
};

const UserManagementTab = () => {
    const users = [
        { id: 1, name: 'Mike Chen', email: 'mike.chen@company.com', role: 'Admin', status: 'Active', department: 'Operations' },
        { id: 2, name: 'Sarah Miller', email: 'sarah.m@company.com', role: 'Editor', status: 'Active', department: 'Marketing' },
        { id: 3, name: 'James Wilson', email: 'j.wilson@company.com', role: 'Viewer', status: 'Inactive', department: 'Sales' },
        { id: 4, name: 'Emily Davis', email: 'emily.d@company.com', role: 'Viewer', status: 'Active', department: 'HR' },
        { id: 5, name: 'David Lee', email: 'david.lee@company.com', role: 'Editor', status: 'Active', department: 'Engineering' },
    ];

    return (
        <div className="bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden">
            <div className="p-6 border-b border-slate-100 flex items-center justify-between bg-slate-50/50">
                <div className="relative max-w-sm w-full">
                    <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
                    <input
                        type="text"
                        placeholder="Search users..."
                        className="pl-9 pr-4 py-2 w-full text-sm bg-white border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500/20"
                    />
                </div>
                <button className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white text-sm font-medium rounded-lg hover:bg-blue-700 shadow-sm transition-colors">
                    <Plus className="w-4 h-4" /> Add User
                </button>
            </div>

            <table className="w-full text-sm text-left">
                <thead className="bg-slate-50 text-slate-500 font-medium border-b border-slate-200">
                    <tr>
                        <th className="px-6 py-4">User</th>
                        <th className="px-6 py-4">Role</th>
                        <th className="px-6 py-4">Department</th>
                        <th className="px-6 py-4">Status</th>
                        <th className="px-6 py-4 text-right">Actions</th>
                    </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                    {users.map(user => (
                        <tr key={user.id} className="hover:bg-slate-50/50 transition-colors">
                            <td className="px-6 py-4">
                                <div className="flexItems-center gap-3">
                                    <div className="w-8 h-8 rounded-full bg-blue-100 text-blue-600 flex items-center justify-center text-xs font-bold">
                                        {user.name.split(' ').map(n => n[0]).join('')}
                                    </div>
                                    <div>
                                        <div className="font-medium text-slate-900">{user.name}</div>
                                        <div className="text-xs text-slate-500">{user.email}</div>
                                    </div>
                                </div>
                            </td>
                            <td className="px-6 py-4">
                                <span className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium border ${user.role === 'Admin' ? 'bg-purple-50 text-purple-700 border-purple-100' :
                                    user.role === 'Editor' ? 'bg-blue-50 text-blue-700 border-blue-100' :
                                        'bg-slate-100 text-slate-600 border-slate-200'
                                    }`}>
                                    <Shield className="w-3 h-3" />
                                    {user.role}
                                </span>
                            </td>
                            <td className="px-6 py-4 text-slate-600">{user.department}</td>
                            <td className="px-6 py-4">
                                <span className={`inline-flex items-center gap-1.5 text-xs font-medium ${user.status === 'Active' ? 'text-green-600' : 'text-slate-400'
                                    }`}>
                                    <span className={`w-1.5 h-1.5 rounded-full ${user.status === 'Active' ? 'bg-green-500' : 'bg-slate-300'}`}></span>
                                    {user.status}
                                </span>
                            </td>
                            <td className="px-6 py-4 text-right">
                                <button className="p-2 text-slate-400 hover:text-slate-600 hover:bg-slate-100 rounded-lg">
                                    <MoreVertical className="w-4 h-4" />
                                </button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

const SystemSettingsTab = () => {
    return (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-6">
                <div className="flex items-center gap-3 mb-6">
                    <div className="p-2 bg-blue-50 text-blue-600 rounded-lg"><Settings className="w-5 h-5" /></div>
                    <h3 className="text-lg font-bold text-slate-900">General Configuration</h3>
                </div>

                <div className="space-y-6">
                    <div>
                        <label className="block text-sm font-medium text-slate-700 mb-2">Application Name</label>
                        <input type="text" defaultValue="KSA KBMS" className="w-full px-4 py-2 text-sm border border-slate-200 rounded-lg focus:outline-none focus:border-blue-500" />
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-slate-700 mb-2">Default Language</label>
                        <select className="w-full px-4 py-2 text-sm border border-slate-200 rounded-lg focus:outline-none focus:border-blue-500">
                            <option>English (US)</option>
                            <option>Arabic (KSA)</option>
                        </select>
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-slate-700 mb-2">Support Email</label>
                        <div className="relative">
                            <Mail className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
                            <input type="email" defaultValue="support@ksakbms.gov.sa" className="w-full pl-9 pr-4 py-2 text-sm border border-slate-200 rounded-lg focus:outline-none focus:border-blue-500" />
                        </div>
                    </div>
                </div>
            </div>

            <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-6">
                <div className="flex items-center gap-3 mb-6">
                    <div className="p-2 bg-green-50 text-green-600 rounded-lg"><Lock className="w-5 h-5" /></div>
                    <h3 className="text-lg font-bold text-slate-900">Security & Access</h3>
                </div>

                <div className="space-y-4">
                    <div className="flex items-center justify-between p-4 bg-slate-50 rounded-lg border border-slate-100">
                        <div>
                            <div className="font-medium text-slate-900">Single Sign-On (SSO)</div>
                            <div className="text-xs text-slate-500">Enable SAML/OIDC authentication</div>
                        </div>
                        <label className="relative inline-flex items-center cursor-pointer">
                            <input type="checkbox" defaultChecked className="sr-only peer" />
                            <div className="w-11 h-6 bg-slate-200 peer-focus:outline-none peer-focus:ring-2 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
                        </label>
                    </div>
                    <div className="flex items-center justify-between p-4 bg-slate-50 rounded-lg border border-slate-100">
                        <div>
                            <div className="font-medium text-slate-900">Multi-Factor Auth (MFA)</div>
                            <div className="text-xs text-slate-500">Enforce 2FA for all admin users</div>
                        </div>
                        <label className="relative inline-flex items-center cursor-pointer">
                            <input type="checkbox" className="sr-only peer" />
                            <div className="w-11 h-6 bg-slate-200 peer-focus:outline-none peer-focus:ring-2 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
                        </label>
                    </div>
                    <button className="w-full mt-2 py-2 bg-slate-800 text-white text-sm font-medium rounded-lg hover:bg-slate-900 transition-colors flex items-center justify-center gap-2">
                        <Save className="w-4 h-4" /> Save Security Policies
                    </button>
                </div>
            </div>
        </div>
    );
};

const AuditLogsTab = () => {
    const logs = [
        { id: 1, action: 'User Created', user: 'Mike Chen', timestamp: '2 mins ago', detail: 'Created user account for J. Doe' },
        { id: 2, action: 'Settings Updated', user: 'Mike Chen', timestamp: '1 hour ago', detail: 'Changed default language to Arabic' },
        { id: 3, action: 'Login Failed', user: 'Unknown', timestamp: '3 hours ago', detail: 'Failed attempt from IP 192.168.1.1' },
        { id: 4, action: 'Document Deleted', user: 'Sarah Miller', timestamp: 'Yesterday', detail: 'Removed "Q3 Financials"' },
        { id: 5, action: 'Integration Added', user: 'David Lee', timestamp: '2 days ago', detail: 'Connected Salesforce instance' },
    ];

    return (
        <div className="bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden">
            <div className="p-6 border-b border-slate-100 bg-slate-50/50">
                <div className="flex items-center justify-between">
                    <h3 className="font-bold text-slate-900">System Audit Logs</h3>
                    <button className="text-sm text-blue-600 hover:text-blue-700 font-medium">Download CSV</button>
                </div>
            </div>
            <div className="divide-y divide-slate-100">
                {logs.map(log => (
                    <div key={log.id} className="p-4 flex items-center justify-between hover:bg-slate-50 transition-colors">
                        <div className="flex items-start gap-4">
                            <div className={`mt-1 p-2 rounded-lg ${log.action.includes('Failed') || log.action.includes('Deleted') ? 'bg-red-50 text-red-600' :
                                log.action.includes('Created') ? 'bg-green-50 text-green-600' :
                                    'bg-blue-50 text-blue-600'
                                }`}>
                                {log.action.includes('Failed') || log.action.includes('Deleted') ? <AlertTriangle className="w-4 h-4" /> :
                                    log.action.includes('Created') ? <CheckCircle className="w-4 h-4" /> :
                                        <FileText className="w-4 h-4" />}
                            </div>
                            <div>
                                <div className="font-medium text-slate-900">{log.action}</div>
                                <div className="text-sm text-slate-500">{log.detail}</div>
                                <div className="text-xs text-slate-400 mt-1 flex items-center gap-2">
                                    <span className="flex items-center gap-1"><Users className="w-3 h-3" /> {log.user}</span>
                                    <span>•</span>
                                    <span>{log.timestamp}</span>
                                </div>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};
