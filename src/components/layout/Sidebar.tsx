import { useContext } from 'react';
import { Search, Library, Link, BarChart3, ShieldCheck, Users, LibraryBig } from 'lucide-react';
import { useAppStore } from '../../store/useAppStore';
import { NavContext } from '../../App';

const NAV_ITEMS = [
    { path: '/', label: 'Search', icon: Search },
    { path: '/library', label: 'Knowledge Library', icon: Library },
    { path: '/connectors', label: 'Connectors & Schedules', icon: Link },
    { path: '/analytics', label: 'Analytics', icon: BarChart3 },
    { path: '/governance', label: 'Governance & Audit', icon: ShieldCheck },
    { path: '/admin', label: 'Admin', icon: Users },
];

export const Sidebar = () => {
    const { language } = useAppStore();
    const { path, navigate } = useContext(NavContext);

    return (
        <aside className="w-64 bg-slate-900 text-white flex flex-col h-screen fixed top-0 start-0 border-e border-slate-800 z-10">
            <div className="h-16 flex items-center px-6 border-b border-slate-800">
                <div className="flex items-center gap-2">
                    <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center">
                        <LibraryBig className="w-5 h-5 text-white" />
                    </div>
                    <span className="font-bold text-lg tracking-tight">KSA KBMS</span>
                </div>
            </div>

            <nav className="flex-1 py-6 px-3 space-y-1">
                {NAV_ITEMS.map((item) => {
                    const isActive = path === item.path;
                    return (
                        <button
                            key={item.path}
                            onClick={() => navigate(item.path)}
                            className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-colors ${isActive
                                ? 'bg-blue-600 text-white shadow-lg shadow-blue-900/20'
                                : 'text-slate-400 hover:text-white hover:bg-slate-800'
                                }`
                            }
                        >
                            <item.icon className="w-5 h-5" />
                            <span>{language === 'ar' ? `Mock ${item.label}` : item.label}</span>
                        </button>
                    )
                })}
            </nav>

            <div className="p-4 border-t border-slate-800">
                <div className="bg-slate-800/50 rounded-lg p-3 text-xs text-slate-400">
                    <p className="font-semibold text-slate-300">Enterprise Edition</p>
                    <p className="mt-1">v2.4.0 (Build 9921)</p>
                </div>
            </div>
        </aside>
    );
};
