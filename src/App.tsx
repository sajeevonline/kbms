import React, { useState, useEffect } from 'react';
import { useAppStore } from './store/useAppStore';
import { Sidebar } from './components/layout/Sidebar';
import { Topbar } from './components/layout/Topbar';
// Pages
import { ChatPage } from './pages/ChatPage';
import { LibraryPage } from './pages/LibraryPage';
import { ConnectorsPage } from './pages/ConnectorsPage';
import { AnalyticsPage } from './pages/AnalyticsPage';
import { GovernancePage } from './pages/GovernancePage';
import { DocumentViewerPage } from './pages/DocumentViewerPage';
import { AdminPage } from './pages/AdminPage';


// MOCK NAVIGATION CONTEXT
export const NavContext = React.createContext({ path: '/', navigate: (_p: string) => { } });

function App() {
  const { language } = useAppStore();
  const [currentPath, setCurrentPath] = useState('/');

  useEffect(() => {
    document.documentElement.dir = language === 'ar' ? 'rtl' : 'ltr';
    document.documentElement.lang = language;
  }, [language]);

  const renderPage = () => {
    switch (currentPath) {
      case '/': return <ChatPage />;
      case '/library': return <LibraryPage />;
      case '/connectors': return <ConnectorsPage />;
      case '/analytics': return <AnalyticsPage />;
      case '/governance': return <GovernancePage />;
      case '/admin': return <AdminPage />;
      default:
        if (currentPath.startsWith('/document/')) {
          return <DocumentViewerPage />;
        }
        return <ChatPage />;
    }
  };

  return (
    <NavContext.Provider value={{ path: currentPath, navigate: setCurrentPath }}>
      <div className={`h-screen overflow-hidden bg-slate-50 font-sans text-slate-900 ${language === 'en' ? 'ltr' : 'rtl'}`}>
        <Sidebar />
        <Topbar />
        <main className="pt-16 ps-64 h-full flex flex-col transition-all duration-300">
          <div className="flex-1 overflow-hidden p-8 max-w-7xl mx-auto w-full">
            {renderPage()}
          </div>
        </main>
      </div>
    </NavContext.Provider>
  );
}

export default App;
