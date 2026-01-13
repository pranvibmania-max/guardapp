
import React, { useState, useEffect, useRef, useMemo } from 'react';
import { useNavigate, useLocation, NavLink } from 'react-router-dom';
import { TOOLS } from '../../constants.tsx';
import { Tool } from '../../types.ts';
import { UserProfile } from '../../App.tsx';

/**
 * Isolated SearchField component to prevent Header-wide re-renders on every keystroke.
 */
const SearchField: React.FC = () => {
  const [search, setSearch] = useState('');
  const [debouncedSearch, setDebouncedSearch] = useState('');
  const [showResults, setShowResults] = useState(false);
  const navigate = useNavigate();
  const searchRef = useRef<HTMLDivElement>(null);

  // Synchronize debouncedSearch with search after 300ms
  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedSearch(search);
    }, 300);
    return () => clearTimeout(timer);
  }, [search]);

  // Derived results using useMemo for performance
  const results = useMemo(() => {
    const query = debouncedSearch.trim().toLowerCase();
    if (query.length <= 1) return [];

    return TOOLS.filter(tool => 
      tool.name.toLowerCase().includes(query) ||
      tool.description.toLowerCase().includes(query) ||
      tool.keywords.some(k => k.toLowerCase().includes(query))
    );
  }, [debouncedSearch]);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (searchRef.current && !searchRef.current.contains(event.target as Node)) {
        setShowResults(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleSelectTool = (path: string) => {
    navigate(path);
    setSearch('');
    setShowResults(false);
  };

  return (
    <div className="relative hidden lg:block w-48" ref={searchRef}>
      <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-gray-400">
        <i className="fas fa-magnifying-glass text-[10px]"></i>
      </div>
      <input
        type="text"
        className="block w-full pl-9 pr-3 py-1.5 bg-gray-100/50 dark:bg-slate-800/50 border border-transparent dark:border-white/10 rounded-xl text-[11px] font-medium focus:outline-none focus:ring-2 focus:ring-primary-500/20 dark:text-white transition-all placeholder:text-gray-400"
        placeholder="Search tools..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        onFocus={() => search.trim().length > 1 && setShowResults(true)}
      />
      {showResults && (search.trim().length > 1) && (
        <div className="absolute mt-2 w-full bg-white dark:bg-slate-800 border border-gray-200 dark:border-white/10 rounded-xl shadow-xl overflow-hidden z-50 animate-in slide-in-from-top-1 duration-200">
          {results.length > 0 ? (
            <div className="p-1">
              {results.slice(0, 5).map(tool => (
                <button 
                  key={tool.id}
                  onClick={() => handleSelectTool(tool.path)}
                  className="w-full text-left p-2 hover:bg-primary-50 dark:hover:bg-white/5 rounded-lg flex items-center gap-3 transition-colors"
                >
                  <i className={`fas ${tool.icon} text-primary-500 text-[10px]`}></i>
                  <span className="text-[11px] font-bold text-gray-900 dark:text-white">{tool.name}</span>
                </button>
              ))}
            </div>
          ) : (
            <div className="p-4 text-center">
              <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">No tools found</p>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

interface HeaderProps {
  toggleSidebar: () => void;
  isDarkMode: boolean;
  toggleDarkMode: () => void;
  user: UserProfile | null;
  onOpenAuth: () => void;
  onLogout: () => void;
}

const Header: React.FC<HeaderProps> = ({ toggleSidebar, isDarkMode, toggleDarkMode, user, onOpenAuth, onLogout }) => {
  const [isUserMenuOpen, setIsUserMenuOpen] = useState(false);
  const userMenuRef = useRef<HTMLDivElement>(null);
  const navigate = useNavigate();

  const logoUrl = "https://img.icons8.com/fluency/96/toolbox.png";

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (userMenuRef.current && !userMenuRef.current.contains(event.target as Node)) {
        setIsUserMenuOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  return (
    <>
      <div className="h-[65px]" />
      <nav className="navbar">
        <div className="navbar-content">
          <div className="absolute left-6 flex items-center gap-4">
            <button 
              onClick={toggleSidebar}
              className="p-2.5 bg-gray-100 dark:bg-slate-800 text-gray-600 dark:text-gray-300 rounded-xl hover:scale-105 active:scale-95 transition-all md:hidden"
              aria-label="Toggle navigation menu"
            >
              <i className="fas fa-bars-staggered"></i>
            </button>
            
            <SearchField />
          </div>

          <NavLink to="/" className="logo-box">
            <img src={logoUrl} alt="Multi ToolVerse Logo" className="logo-img" />
            <h1 className="logo-text">Multi <span>ToolVerse</span></h1>
          </NavLink>

          <div className="absolute right-6 flex items-center gap-3">
            {/* Admin Quick Access */}
            <button 
              onClick={() => navigate('/admin')}
              className="hidden sm:flex p-2 w-9 h-9 rounded-xl bg-gray-100 dark:bg-slate-800 border border-transparent dark:border-white/10 items-center justify-center text-gray-600 dark:text-gray-300 hover:text-primary-500 hover:scale-105 transition-all group"
              aria-label="Admin Dashboard"
            >
              <i className="fas fa-user-shield text-sm"></i>
              <span className="absolute bottom-full mb-2 px-2 py-1 bg-gray-900 text-white text-[8px] font-black uppercase rounded opacity-0 group-hover:opacity-100 pointer-events-none transition-opacity">Admin</span>
            </button>

            <button 
              onClick={toggleDarkMode}
              className="p-2 w-9 h-9 rounded-xl bg-gray-100 dark:bg-slate-800 border border-transparent dark:border-white/10 flex items-center justify-center text-gray-600 dark:text-gray-300 hover:scale-105 transition-all"
              aria-label="Toggle dark mode"
            >
              <i className={`fas ${isDarkMode ? 'fa-sun text-amber-400' : 'fa-moon text-indigo-400'} text-sm`}></i>
            </button>
            
            <div className="h-6 w-px bg-gray-100 dark:bg-white/5 mx-1 hidden sm:block"></div>

            {user ? (
              <div className="relative" ref={userMenuRef}>
                <button 
                  onClick={() => setIsUserMenuOpen(!isUserMenuOpen)}
                  className="flex items-center gap-2 pl-1 pr-2 py-1 bg-primary-500/5 dark:bg-primary-500/10 rounded-xl transition-all border border-primary-500/10"
                >
                  <div className="w-8 h-8 rounded-lg bg-primary-500 flex items-center justify-center shadow-lg overflow-hidden">
                    <img src={user.avatar} alt="User" className="w-full h-full object-cover" />
                  </div>
                  <i className={`fas fa-chevron-down text-[8px] text-gray-400 transition-transform ${isUserMenuOpen ? 'rotate-180' : ''}`}></i>
                </button>

                {isUserMenuOpen && (
                  <div className="absolute right-0 mt-3 w-48 bg-white dark:bg-slate-900 rounded-2xl shadow-2xl border border-gray-100 dark:border-white/10 overflow-hidden z-[100] animate-in slide-in-from-top-2 duration-200">
                    <div className="p-3 border-b border-gray-50 dark:border-white/5">
                      <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest mb-1">Signed in as</p>
                      <p className="text-xs font-bold text-gray-900 dark:text-white truncate">{user.email}</p>
                    </div>
                    <div className="p-2 space-y-1">
                      <button 
                        onClick={() => { navigate('/admin'); setIsUserMenuOpen(false); }}
                        className="w-full text-left p-2 hover:bg-gray-50 dark:hover:bg-white/5 rounded-lg flex items-center gap-3 transition-colors group"
                      >
                        <i className="fas fa-user-shield text-[10px] text-gray-400 group-hover:text-primary-500"></i>
                        <span className="text-xs font-bold text-gray-600 dark:text-gray-300">Admin Panel</span>
                      </button>
                      <button className="w-full text-left p-2 hover:bg-gray-50 dark:hover:bg-white/5 rounded-lg flex items-center gap-3 transition-colors group">
                        <i className="fas fa-gear text-[10px] text-gray-400 group-hover:text-primary-500"></i>
                        <span className="text-xs font-bold text-gray-600 dark:text-gray-300">Settings</span>
                      </button>
                      <button 
                        onClick={() => { onLogout(); setIsUserMenuOpen(false); }}
                        className="w-full text-left p-2 hover:bg-red-50 dark:hover:bg-red-500/10 rounded-lg flex items-center gap-3 transition-colors"
                      >
                        <i className="fas fa-arrow-right-from-bracket text-[10px] text-red-400"></i>
                        <span className="text-xs font-bold text-red-500">Sign Out</span>
                      </button>
                    </div>
                  </div>
                )}
              </div>
            ) : (
              <button 
                onClick={onOpenAuth}
                className="p-1 sm:pr-3 bg-slate-900 dark:bg-white rounded-xl flex items-center gap-3 hover:scale-[1.05] active:scale-95 transition-all shadow-lg"
              >
                <div className="w-7 h-7 rounded-lg bg-white/10 dark:bg-slate-100 flex items-center justify-center text-white dark:text-slate-900">
                  <i className="fas fa-user-plus text-[10px]"></i>
                </div>
                <span className="text-[10px] font-black text-white dark:text-slate-900 uppercase trackingest hidden sm:inline-block">Sign In</span>
              </button>
            )}
          </div>
        </div>
      </nav>
    </>
  );
};

export default Header;
