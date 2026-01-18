
import React, { useState, useEffect } from 'react';
import { HashRouter, Routes, Route, Navigate, NavLink } from 'react-router-dom';
import Sidebar from './components/Layout/Sidebar.tsx';
import Header from './components/Layout/Header.tsx';
import Dashboard from './components/Dashboard.tsx';
import BMICalculator from './components/Calculators/BMICalculator.tsx';
import CalorieCalculator from './components/Calculators/CalorieCalculator.tsx';
import LoanCalculator from './components/Calculators/LoanCalculator.tsx';
import Base64Tool from './components/Calculators/Base64Tool.tsx';
import PercentageCalculator from './components/Calculators/PercentageCalculator.tsx';
import LengthConverter from './components/Calculators/LengthConverter.tsx';
import CurrencyConverter from './components/Calculators/CurrencyConverter.tsx';
import InterestCalculator from './components/Calculators/InterestCalculator.tsx';
import TemperatureConverter from './components/Calculators/TemperatureConverter.tsx';
import BeautyTips from './components/Calculators/BeautyTips.tsx';
import DailyNews from './components/Calculators/DailyNews.tsx';
import AdminPanel from './components/Admin/AdminPanel.tsx';
import AuthModal from './components/Auth/AuthModal.tsx';
import Terms from './components/Legal/Terms.tsx';

export interface UserProfile {
  name: string;
  email: string;
  avatar: string;
  isPro: boolean;
}

const App: React.FC = () => {
  const [isDarkMode, setIsDarkMode] = useState(() => {
    const saved = localStorage.getItem('theme');
    return saved === 'dark' || (!saved && window.matchMedia('(prefers-color-scheme: dark)').matches);
  });

  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [user, setUser] = useState<UserProfile | null>(null);
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);

  useEffect(() => {
    if (isDarkMode) {
      document.documentElement.classList.add('dark');
      localStorage.setItem('theme', 'dark');
    } else {
      document.documentElement.classList.remove('dark');
      localStorage.setItem('theme', 'light');
    }
  }, [isDarkMode]);

  const toggleDarkMode = () => setIsDarkMode(!isDarkMode);
  const toggleSidebar = () => setIsSidebarOpen(!isSidebarOpen);

  const handleLogin = (profile: UserProfile) => {
    setUser(profile);
    setIsAuthModalOpen(false);
  };

  const handleLogout = () => {
    setUser(null);
  };

  return (
    <HashRouter>
      <div className="flex h-screen overflow-hidden">
        {/* Sidebar Overlay for Mobile */}
        {isSidebarOpen && (
          <div 
            className="fixed inset-0 bg-black/50 z-[1050] md:hidden" 
            onClick={toggleSidebar}
          />
        )}

        <Sidebar isOpen={isSidebarOpen} toggleSidebar={toggleSidebar} user={user} />

        <div className="flex-1 flex flex-col min-w-0 bg-gray-50 dark:bg-slate-900 transition-colors duration-200">
          <Header 
            toggleSidebar={toggleSidebar} 
            isDarkMode={isDarkMode} 
            toggleDarkMode={toggleDarkMode} 
            user={user}
            onOpenAuth={() => setIsAuthModalOpen(true)}
            onLogout={handleLogout}
          />
          
          <main className="flex-1 overflow-y-auto p-4 md:p-8">
            <div className="max-w-6xl mx-auto">
              <Routes>
                <Route path="/" element={<Dashboard />} />
                <Route path="/news/daily" element={<DailyNews />} />
                <Route path="/health/bmi" element={<BMICalculator />} />
                <Route path="/health/calories" element={<CalorieCalculator />} />
                <Route path="/lifestyle/beauty-tips" element={<BeautyTips />} />
                <Route path="/finance/emi" element={<LoanCalculator />} />
                <Route path="/finance/interest" element={<InterestCalculator />} />
                <Route path="/finance/currency" element={<CurrencyConverter />} />
                <Route path="/math/percentage" element={<PercentageCalculator />} />
                <Route path="/convert/length" element={<LengthConverter />} />
                <Route path="/convert/temperature" element={<TemperatureConverter />} />
                <Route path="/dev/base64" element={<Base64Tool />} />
                <Route path="/admin" element={<AdminPanel />} />
                <Route path="/terms" element={<Terms />} />
                <Route path="*" element={<Navigate to="/" replace />} />
              </Routes>
            </div>
            
            <footer className="mt-12 text-center text-gray-500 dark:text-gray-400 text-sm py-8 border-t border-gray-200 dark:border-slate-800">
              <div className="max-w-4xl mx-auto px-4">
                <p className="font-bold text-gray-700 dark:text-gray-300 mb-2 tracking-tight">© 2024 MultiToolVerse 0.1</p>
                <div className="flex flex-col items-center gap-2 mb-4">
                  <p className="text-[11px] font-black uppercase tracking-[0.2em] text-primary-500">Built for the community</p>
                  <p className="text-xs text-gray-400 dark:text-gray-500">Empowering users with private, efficient tools.</p>
                </div>
                <div className="flex justify-center gap-6 pt-4 border-t border-gray-100 dark:border-white/5">
                  <a href="#" className="text-[10px] font-black uppercase tracking-widest hover:text-primary-500 transition-colors">Privacy</a>
                  <NavLink to="/terms" className="text-[10px] font-black uppercase tracking-widest hover:text-primary-500 transition-colors">Terms</NavLink>
                  <a href="#" className="text-[10px] font-black uppercase tracking-widest hover:text-primary-500 transition-colors">API Docs</a>
                </div>
              </div>
            </footer>
          </main>
        </div>

        {/* Global Auth Modal */}
        {isAuthModalOpen && (
          <AuthModal 
            onClose={() => setIsAuthModalOpen(false)} 
            onLogin={handleLogin} 
          />
        )}
      </div>
    </HashRouter>
  );
};

export default App;
