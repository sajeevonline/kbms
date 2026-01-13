import { TrendingUp, Users, MessageSquare, FileText } from 'lucide-react';

export const AnalyticsPage = () => {
    return (
        <div className="space-y-6">
            <div>
                <h1 className="text-3xl font-bold text-slate-900">Analytics & Insights</h1>
                <p className="text-slate-600 mt-1">System usage and ROI metrics</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                <div className="bg-gradient-to-br from-blue-600 to-blue-700 rounded-xl shadow-sm p-6 text-white">
                    <div className="flex items-center justify-between mb-2">
                        <span className="text-sm opacity-90">Total Queries</span>
                        <MessageSquare className="w-5 h-5 opacity-75" />
                    </div>
                    <p className="text-3xl font-bold">12,458</p>
                    <p className="text-xs opacity-75 mt-1">+23% from last month</p>
                </div>

                <div className="bg-gradient-to-br from-green-600 to-green-700 rounded-xl shadow-sm p-6 text-white">
                    <div className="flex items-center justify-between mb-2">
                        <span className="text-sm opacity-90">Active Users</span>
                        <Users className="w-5 h-5 opacity-75" />
                    </div>
                    <p className="text-3xl font-bold">847</p>
                    <p className="text-xs opacity-75 mt-1">Across all departments</p>
                </div>

                <div className="bg-gradient-to-br from-purple-600 to-purple-700 rounded-xl shadow-sm p-6 text-white">
                    <div className="flex items-center justify-between mb-2">
                        <span className="text-sm opacity-90">Use Cases</span>
                        <FileText className="w-5 h-5 opacity-75" />
                    </div>
                    <p className="text-3xl font-bold">156</p>
                    <p className="text-xs opacity-75 mt-1">Reused 2,341 times</p>
                </div>

                <div className="bg-gradient-to-br from-amber-600 to-amber-700 rounded-xl shadow-sm p-6 text-white">
                    <div className="flex items-center justify-between mb-2">
                        <span className="text-sm opacity-90">Avg Response Time</span>
                        <TrendingUp className="w-5 h-5 opacity-75" />
                    </div>
                    <p className="text-3xl font-bold">1.2s</p>
                    <p className="text-xs opacity-75 mt-1">-15% improvement</p>
                </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-6">
                    <h3 className="font-bold text-slate-900 mb-4">Top Queries by Department</h3>
                    <div className="space-y-3">
                        {[
                            { dept: 'Engineering', queries: 4521, color: 'bg-blue-600' },
                            { dept: 'Operations', queries: 3892, color: 'bg-green-600' },
                            { dept: 'HR', queries: 2145, color: 'bg-purple-600' },
                            { dept: 'Legal', queries: 1234, color: 'bg-amber-600' },
                            { dept: 'Finance', queries: 666, color: 'bg-red-600' },
                        ].map(item => (
                            <div key={item.dept}>
                                <div className="flex items-center justify-between mb-1">
                                    <span className="text-sm text-slate-600">{item.dept}</span>
                                    <span className="text-sm font-medium text-slate-900">{item.queries.toLocaleString()}</span>
                                </div>
                                <div className="w-full bg-slate-100 rounded-full h-2">
                                    <div className={`${item.color} h-2 rounded-full`} style={{ width: `${(item.queries / 4521) * 100}%` }}></div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-6">
                    <h3 className="font-bold text-slate-900 mb-4">ROI Metrics</h3>
                    <div className="space-y-4">
                        <div className="p-4 bg-green-50 border border-green-200 rounded-lg">
                            <p className="text-sm text-green-700 mb-1">Time Saved</p>
                            <p className="text-2xl font-bold text-green-900">2,340 hours</p>
                            <p className="text-xs text-green-600 mt-1">Equivalent to $234,000 in productivity</p>
                        </div>
                        <div className="p-4 bg-blue-50 border border-blue-200 rounded-lg">
                            <p className="text-sm text-blue-700 mb-1">Incidents Prevented</p>
                            <p className="text-2xl font-bold text-blue-900">89</p>
                            <p className="text-xs text-blue-600 mt-1">Through proactive use case application</p>
                        </div>
                        <div className="p-4 bg-purple-50 border border-purple-200 rounded-lg">
                            <p className="text-sm text-purple-700 mb-1">Knowledge Reuse Rate</p>
                            <p className="text-2xl font-bold text-purple-900">73%</p>
                            <p className="text-xs text-purple-600 mt-1">Of queries resolved from existing knowledge</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};
