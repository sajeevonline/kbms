import React from 'react';
import { Sidebar } from './Sidebar';
import { Topbar } from './Topbar';
// We will create this
import { useAppStore } from '../../store/useAppStore';

export const Layout = ({ children }: { children: React.ReactNode }) => {
    const { language } = useAppStore();

    return (
        <div className={`min-h-screen bg-slate-50 font-sans text-slate-900 ${language === 'ar' ? 'rtl' : 'ltr'}`}>
            <Sidebar />
            <Topbar />

            <main className="pt-16 ps-64 min-h-screen transition-all duration-300">
                <div className="p-8 max-w-7xl mx-auto">
                    {children}
                </div>
            </main>


        </div>
    );
};
