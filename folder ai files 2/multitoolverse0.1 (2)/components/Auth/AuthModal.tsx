
import React, { useState } from 'react';
import { UserProfile } from '../../App.tsx';

interface AuthModalProps {
  onClose: () => void;
  onLogin: (user: UserProfile) => void;
}

const AuthModal: React.FC<AuthModalProps> = ({ onClose, onLogin }) => {
  const [mode, setMode] = useState<'signin' | 'signup'>('signin');
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    
    // Simulate API call
    setTimeout(() => {
      onLogin({
        name: 'Guest User',
        email: 'guest@toolverse.dev',
        avatar: 'https://img.icons8.com/fluency/96/user-male-circle.png',
        isPro: false
      });
      setIsLoading(false);
    }, 1200);
  };

  return (
    <div className="fixed inset-0 z-[2000] flex items-center justify-center p-4">
      {/* Backdrop */}
      <div 
        className="absolute inset-0 bg-slate-950/60 backdrop-blur-sm animate-in fade-in duration-300"
        onClick={onClose}
      />
      
      {/* Modal */}
      <div className="relative w-full max-w-md bg-white dark:bg-slate-900 rounded-[2.5rem] shadow-2xl border border-gray-200 dark:border-white/10 overflow-hidden animate-in zoom-in-95 slide-in-from-bottom-4 duration-300">
        
        {/* Header Branding */}
        <div className="p-8 text-center bg-gray-50/50 dark:bg-white/5 border-b border-gray-100 dark:border-white/5">
          <div className="flex justify-center mb-4">
            <div className="w-16 h-16 rounded-2xl bg-white dark:bg-slate-800 shadow-xl flex items-center justify-center p-3 animate-pop">
              <img src="https://img.icons8.com/fluency/96/cube.png" alt="Logo" className="w-full h-full" />
            </div>
          </div>
          <h2 className="text-2xl font-black text-gray-900 dark:text-white">
            {mode === 'signin' ? 'Welcome Back!' : 'Start Your Universe'}
          </h2>
          <p className="text-xs font-bold text-gray-400 uppercase tracking-widest mt-2">
            Multi <span className="text-primary-500">ToolVerse</span> Cloud
          </p>
        </div>

        <div className="p-8">
          {/* Tabs */}
          <div className="flex p-1 bg-gray-100 dark:bg-slate-800 rounded-2xl mb-8">
            <button 
              onClick={() => setMode('signin')}
              className={`flex-1 py-2 rounded-xl text-xs font-black uppercase tracking-widest transition-all ${mode === 'signin' ? 'bg-white dark:bg-slate-700 text-primary-500 shadow-sm' : 'text-gray-500'}`}
            >
              Sign In
            </button>
            <button 
              onClick={() => setMode('signup')}
              className={`flex-1 py-2 rounded-xl text-xs font-black uppercase tracking-widest transition-all ${mode === 'signup' ? 'bg-white dark:bg-slate-700 text-primary-500 shadow-sm' : 'text-gray-500'}`}
            >
              Sign Up
            </button>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-1">
              <label className="text-[10px] font-black text-gray-400 uppercase tracking-[0.2em] ml-2">Email Address</label>
              <div className="relative">
                <i className="fas fa-envelope absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 text-sm"></i>
                <input 
                  type="email" 
                  required
                  placeholder="name@example.com"
                  className="w-full pl-12 pr-4 py-4 bg-gray-50 dark:bg-slate-800 border border-transparent dark:border-white/5 rounded-2xl text-sm font-medium focus:ring-2 focus:ring-primary-500/20 dark:text-white outline-none"
                />
              </div>
            </div>

            <div className="space-y-1">
              <label className="text-[10px] font-black text-gray-400 uppercase tracking-[0.2em] ml-2">Password</label>
              <div className="relative">
                <i className="fas fa-lock absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 text-sm"></i>
                <input 
                  type="password" 
                  required
                  placeholder="••••••••"
                  className="w-full pl-12 pr-4 py-4 bg-gray-50 dark:bg-slate-800 border border-transparent dark:border-white/5 rounded-2xl text-sm font-medium focus:ring-2 focus:ring-primary-500/20 dark:text-white outline-none"
                />
              </div>
            </div>

            {mode === 'signin' && (
              <div className="flex justify-end px-2">
                <button type="button" className="text-[10px] font-black text-primary-500 uppercase hover:underline">Forgot Password?</button>
              </div>
            )}

            <button 
              type="submit" 
              disabled={isLoading}
              className="w-full py-4 bg-slate-900 dark:bg-white text-white dark:text-slate-900 rounded-2xl font-black text-sm uppercase tracking-widest shadow-xl shadow-primary-500/10 hover:-translate-y-0.5 active:scale-95 transition-all flex items-center justify-center gap-3 disabled:opacity-50 disabled:pointer-events-none"
            >
              {isLoading ? (
                <>
                  <i className="fas fa-circle-notch fa-spin"></i>
                  <span>Connecting...</span>
                </>
              ) : (
                <span>{mode === 'signin' ? 'Sign In Now' : 'Create Account'}</span>
              )}
            </button>
          </form>

          <div className="relative my-8">
            <div className="absolute inset-0 flex items-center"><div className="w-full border-t border-gray-100 dark:border-white/5"></div></div>
            <div className="relative flex justify-center text-[10px] font-black uppercase tracking-widest"><span className="bg-white dark:bg-slate-900 px-4 text-gray-400">Or continue with</span></div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <button className="flex items-center justify-center gap-3 py-3 bg-gray-50 dark:bg-slate-800 rounded-2xl border border-transparent hover:border-gray-200 dark:hover:border-white/10 transition-all active:scale-95">
              <i className="fab fa-google text-red-500"></i>
              <span className="text-xs font-bold text-gray-600 dark:text-gray-300">Google</span>
            </button>
            <button className="flex items-center justify-center gap-3 py-3 bg-gray-50 dark:bg-slate-800 rounded-2xl border border-transparent hover:border-gray-200 dark:hover:border-white/10 transition-all active:scale-95">
              <i className="fab fa-github text-gray-900 dark:text-white"></i>
              <span className="text-xs font-bold text-gray-600 dark:text-gray-300">GitHub</span>
            </button>
          </div>
        </div>

        <button 
          onClick={onClose}
          className="absolute top-6 right-6 w-8 h-8 rounded-full bg-gray-100 dark:bg-white/5 text-gray-500 flex items-center justify-center hover:bg-gray-200 dark:hover:bg-white/10 transition-colors"
        >
          <i className="fas fa-times text-sm"></i>
        </button>
      </div>
    </div>
  );
};

export default AuthModal;
