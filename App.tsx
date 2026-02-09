
import React, { useState, useEffect } from 'react';
import { Theme, Party, SiteInfo } from './types';
import { DEFAULT_THEME, INITIAL_PARTIES, DEFAULT_SITE_INFO } from './constants';
import ClientView from './components/ClientView';
import AdminDashboard from './components/AdminDashboard';
import { Layout } from 'lucide-react';

const App: React.FC = () => {
  const [isAdmin, setIsAdmin] = useState(false);
  const [theme, setTheme] = useState<Theme>(DEFAULT_THEME);
  const [parties, setParties] = useState<Party[]>(INITIAL_PARTIES);
  const [siteInfo, setSiteInfo] = useState<SiteInfo>(DEFAULT_SITE_INFO);

  // Load from local storage if available
  useEffect(() => {
    const savedTheme = localStorage.getItem('sogeting_theme');
    const savedParties = localStorage.getItem('sogeting_parties');
    const savedSiteInfo = localStorage.getItem('sogeting_siteinfo');

    if (savedTheme) setTheme(JSON.parse(savedTheme));
    if (savedParties) setParties(JSON.parse(savedParties));
    if (savedSiteInfo) setSiteInfo(JSON.parse(savedSiteInfo));
  }, []);

  // Save to local storage on change
  useEffect(() => {
    localStorage.setItem('sogeting_theme', JSON.stringify(theme));
    localStorage.setItem('sogeting_parties', JSON.stringify(parties));
    localStorage.setItem('sogeting_siteinfo', JSON.stringify(siteInfo));
  }, [theme, parties, siteInfo]);

  const toggleAdmin = () => setIsAdmin(!isAdmin);

  return (
    <div 
      className="min-h-screen transition-all duration-500"
      style={{ 
        backgroundColor: theme.backgroundColor,
        fontFamily: theme.fontFamily 
      }}
    >
      {/* Admin Toggle Button */}
      <button
        onClick={toggleAdmin}
        className="fixed bottom-6 right-6 z-50 p-4 rounded-full bg-black text-white shadow-2xl hover:scale-110 transition-transform flex items-center gap-2"
      >
        <Layout size={20} />
        <span className="text-sm font-bold">{isAdmin ? '사용자 화면' : '관리자 모드'}</span>
      </button>

      {isAdmin ? (
        <AdminDashboard 
          theme={theme} 
          setTheme={setTheme} 
          parties={parties} 
          setParties={setParties} 
          siteInfo={siteInfo}
          setSiteInfo={setSiteInfo}
        />
      ) : (
        <ClientView 
          theme={theme} 
          parties={parties} 
          siteInfo={siteInfo}
        />
      )}
    </div>
  );
};

export default App;
