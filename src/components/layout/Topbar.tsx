import { Globe2 } from 'lucide-react';
import { useAppStore } from '../../store/useAppStore';

export const Topbar = () => {
    const { language, setLanguage } = useAppStore();

    return (
        <header className="h-16 bg-white border-b border-slate-200 fixed top-0 start-64 end-0 z-10 flex items-center justify-between px-6">
            {/* Left: Search & Tenant */}
            <div className="flex items-center gap-4">
                <div className="flex items-center gap-2 px-3 py-1.5 bg-slate-100 rounded-full text-sm font-medium text-slate-600">
                    <span className="w-2 h-2 rounded-full bg-green-500"></span>
                    KSA - Riyadh Ops
                </div>
            </div>

            {/* Right: Actions */}
            <div className="flex items-center gap-4">
                {/* Demo Mode Toggle */}


                {/* Language */}
                <button
                    onClick={() => setLanguage(language === 'en' ? 'ar' : 'en')}
                    className="p-2 text-slate-500 hover:bg-slate-100 rounded-full"
                    title="Switch Language"
                >
                    <Globe2 className="w-5 h-5" />
                </button>

                <div className="h-6 w-px bg-slate-200"></div>

                {/* User Profile */}
                <div className="flex items-center gap-3 p-1.5 rounded-full pe-3">
                    <div className="w-8 h-8 rounded-full bg-slate-200 flex items-center justify-center text-xs font-bold text-slate-600">
                        MC
                    </div>
                    <div className="text-start">
                        <p className="text-sm font-semibold text-slate-800 leading-none">Mike Chen</p>
                        <p className="text-xs text-slate-500 mt-0.5">Operations Engineer</p>
                    </div>
                </div>
            </div>
        </header>
    );
};
