
import React from 'react';
import { NavLink } from 'react-router-dom';
import { CATEGORIES, TOOLS } from '../../constants.tsx';
import { UserProfile } from '../../App.tsx';
import AdSlot from '../Common/AdSlot.tsx';

interface SidebarProps {
  isOpen: boolean;
  toggleSidebar: () => void;
  user: UserProfile | null;
}

const Sidebar: React.FC<SidebarProps> = ({ isOpen, toggleSidebar, user }) => {
  const logoUrl = "https://img.icons8.com/fluency/96/toolbox.png";

  return (
    <aside className={`
      fixed inset-y-0 left-0 w-72 bg-white/80 dark:bg-slate-900/90 backdrop-blur-2xl border-r border-gray-200/50 dark:border-white/10 
      z-[1100] transition-all duration-300 ease-in-out
      ${isOpen ? 'translate-x-0 shadow-2xl' : '-translate-x-full'} 
      md:translate-x-0 md:static md:inset-auto
    `} aria-label="Main Navigation Sidebar">
      <div className="h-full flex flex-col p-6 pt-8">
        {/* Branding Logo */}
        <div className="mb-10 flex items-center justify-between px-2">
          <NavLink to="/" className="logo-box" onClick={() => { if (window.innerWidth < 768) toggleSidebar(); }}>
            <img src={logoUrl} alt="Multi ToolVerse Logo" className="logo-img !w-10 !h-10" />
            <div className="flex flex-col">
              <h1 className="logo-text !text-xl">Multi <span>ToolVerse</span></h1>
              <span className="text-[9px] uppercase tracking-[0.2em] font-black text-gray-400 dark:text-gray-500 mt-0.5">Universe 0.1</span>
            </div>
          </NavLink>
          <button onClick={toggleSidebar} className="md:hidden p-2 text-gray-500 hover:bg-gray-100 dark:hover:bg-white/10 rounded-lg transition-colors">
            <i className="fas fa-times text-xl"></i>
          </button>
        </div>

        {/* Navigation */}
        <nav className="flex-1 overflow-y-auto space-y-8 pr-2 custom-scrollbar" aria-label="Main Menu">
          <div className="animate-in fade-in slide-in-from-left-4 duration-300">
            <h3 className="text-[10px] font-black text-gray-400 dark:text-gray-400 uppercase tracking-[0.3em] mb-4 px-2">
              Explore
            </h3>
            <ul className="space-y-1.5">
              <li>
                <NavLink
                  to="/"
                  end
                  onClick={() => { if (window.innerWidth < 768) toggleSidebar(); }}
                  className={({ isActive }) => `
                    flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-semibold transition-all duration-200 group
                    ${isActive 
                      ? 'bg-primary-500 text-white shadow-lg shadow-primary-500/25' 
                      : 'text-gray-600 dark:text-gray-300 hover:bg-gray-100/80 dark:hover:bg-white/10 hover:translate-x-1'}
                  `}
                >
                  {({ isActive }) => (
                    <>
                      <i className={`fas fa-house w-5 text-center ${isActive ? 'text-white' : 'text-gray-400 dark:text-gray-400 group-hover:text-primary-500 transition-colors'}`}></i>
                      <span>Dashboard</span>
                    </>
                  )}
                </NavLink>
              </li>
              <li>
                <NavLink
                  to="/admin"
                  onClick={() => { if (window.innerWidth < 768) toggleSidebar(); }}
                  className={({ isActive }) => `
                    flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-semibold transition-all duration-200 group
                    ${isActive 
                      ? 'bg-slate-900 dark:bg-white text-white dark:text-slate-900 shadow-lg' 
                      : 'text-gray-600 dark:text-gray-300 hover:bg-gray-100/80 dark:hover:bg-white/10 hover:translate-x-1'}
                  `}
                >
                  {({ isActive }) => (
                    <>
                      <i className={`fas fa-user-shield w-5 text-center ${isActive ? '' : 'text-gray-400 dark:text-gray-400 group-hover:text-primary-500 transition-colors'}`}></i>
                      <span>Admin Control</span>
                    </>
                  )}
                </NavLink>
              </li>
            </ul>
          </div>

          <div className="h-px bg-gray-100 dark:bg-white/5 mx-2"></div>

          {CATEGORIES.map((cat) => {
            const categoryTools = TOOLS.filter(t => t.category === cat);
            if (categoryTools.length === 0) return null;

            return (
              <div key={cat} className="animate-in fade-in slide-in-from-left-4 duration-500">
                <h3 className="text-[10px] font-black text-gray-400 dark:text-gray-400 uppercase tracking-[0.3em] mb-4 px-2">
                  {cat}
                </h3>
                <ul className="space-y-1.5">
                  {categoryTools.map((tool) => (
                    <li key={tool.id}>
                      <NavLink
                        to={tool.path}
                        onClick={() => { if (window.innerWidth < 768) toggleSidebar(); }}
                        className={({ isActive }) => `
                          flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-semibold transition-all duration-200 group
                          ${isActive 
                            ? 'bg-primary-500 text-white shadow-lg shadow-primary-500/25' 
                            : 'text-gray-600 dark:text-gray-300 hover:bg-gray-100/80 dark:hover:bg-white/10 hover:translate-x-1'}
                        `}
                      >
                        {({ isActive }) => (
                          <>
                            <i className={`fas ${tool.icon} w-5 text-center ${isActive ? 'text-white' : 'text-gray-400 dark:text-gray-400 group-hover:text-primary-500 transition-colors'}`}></i>
                            <span>{tool.name}</span>
                          </>
                        )}
                      </NavLink>
                    </li>
                  ))}
                </ul>
              </div>
            );
          })}

          {/* Sidebar Live Ad Slot */}
          <div className="px-2 pt-4">
             <AdSlot type="square" className="opacity-80 hover:opacity-100 transition-opacity" />
          </div>
        </nav>

        {/* Pro Banner */}
        <div className="mt-auto pt-6 border-t border-gray-100 dark:border-white/10">
          <div className={`rounded-2xl p-4 text-white shadow-lg transition-all duration-500 ${user?.isPro ? 'bg-gradient-to-br from-emerald-500 to-teal-600' : 'bg-gradient-to-br from-primary-600 to-indigo-700'}`}>
            <div className="flex items-center gap-2 mb-2">
              <i className={`fas ${user?.isPro ? 'fa-crown text-yellow-300' : 'fa-bolt text-amber-400'}`}></i>
              <span className="text-xs font-black uppercase tracking-widest">{user?.isPro ? 'Pro Active' : 'Go Pro'}</span>
            </div>
            <p className="text-[10px] opacity-80 leading-relaxed mb-3">
              {user?.isPro 
                ? 'Welcome back to the elite toolset.' 
                : 'Unlock history and premium cloud tools.'}
            </p>
            {!user?.isPro && (
              <button className="w-full py-2 bg-white/20 hover:bg-white/30 rounded-lg text-[10px] font-black transition-all">
                {user ? 'UPGRADE NOW' : 'SIGN IN'}
              </button>
            )}
          </div>
        </div>
      </div>
    </aside>
  );
};

export default Sidebar;
