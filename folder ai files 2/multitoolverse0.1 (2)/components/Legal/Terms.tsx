
import React from 'react';
import { NavLink } from 'react-router-dom';

const Terms: React.FC = () => {
  return (
    // Outer container
    <div className="max-w-4xl mx-auto animate-in fade-in slide-in-from-bottom-8 duration-700 pb-12">
      <header className="mb-12">
        <NavLink 
          to="/" 
          className="inline-flex items-center gap-2 px-4 py-2 bg-white dark:bg-slate-800 rounded-xl text-xs font-black uppercase tracking-widest text-gray-500 hover:text-primary-500 border border-gray-100 dark:border-white/10 transition-all mb-8 shadow-sm group"
        >
          <i className="fas fa-arrow-left transition-transform group-hover:-translate-x-1"></i>
          Back to Dashboard
        </NavLink>
        <div className="space-y-2">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-slate-900 text-white dark:bg-white dark:text-slate-900 text-[10px] font-black uppercase tracking-widest">
            Legal Document
          </div>
          <h1 className="text-4xl md:text-5xl font-black text-gray-900 dark:text-white tracking-tight">Terms & Conditions</h1>
          <p className="text-gray-500 dark:text-gray-400">
            Last updated: <span className="font-bold text-primary-500">27 December 2025</span>
          </p>
        </div>
      </header>

      {/* Main Content Sections Wrapper */}
      <div className="bg-white/80 dark:bg-slate-800/60 rounded-[2.5rem] p-8 md:p-12 border border-gray-100 dark:border-white/5 shadow-xl backdrop-blur-sm space-y-10 text-gray-600 dark:text-gray-300">
        <section className="space-y-4">
          <h2 className="text-2xl font-black text-gray-900 dark:text-white flex items-center gap-3">
            <span className="w-8 h-8 rounded-lg bg-primary-500/10 text-primary-500 flex items-center justify-center text-sm">1</span>
            Acceptance of Terms
          </h2>
          <div className="pl-11 leading-relaxed">
            <p>
              By using <span className="font-bold text-gray-900 dark:text-white">Multi Tool Verse</span>, you agree to these Terms & Conditions. This application is provided as a free utility service for personal and professional use. Accessing any part of this universe constitutes your full acceptance of these terms. If you disagree with any part of these terms, you must discontinue use immediately.
            </p>
          </div>
        </section>

        <section className="space-y-4">
          <h2 className="text-2xl font-black text-gray-900 dark:text-white flex items-center gap-3">
            <span className="w-8 h-8 rounded-lg bg-primary-500/10 text-primary-500 flex items-center justify-center text-sm">2</span>
            Usage & Data Privacy
          </h2>
          <div className="pl-11 leading-relaxed">
            <p>
              The application processes all calculations locally on your device where possible. Your privacy is paramount. Multi Tool Verse aims to provide a secure environment. We do not sell your personal calculation history to third parties.
            </p>
          </div>
        </section>

        <section className="space-y-4">
          <h2 className="text-2xl font-black text-gray-900 dark:text-white flex items-center gap-3">
            <span className="w-8 h-8 rounded-lg bg-primary-500/10 text-primary-500 flex items-center justify-center text-sm">3</span>
            Disclaimer of Liability
          </h2>
          <div className="pl-11 leading-relaxed">
            <p>
              The tools and calculators provided are for informational purposes only. While we strive for accuracy, Multi Tool Verse and its developers are not responsible for any financial, health, or data decisions made based on the application's output. Always consult a professional for critical matters.
            </p>
          </div>
        </section>
      </div>

      <div className="mt-8 bg-primary-500/5 dark:bg-primary-500/10 rounded-[2rem] p-8 border border-primary-500/10">
        <div className="text-center">
          <h3 className="text-sm font-black text-primary-500 uppercase tracking-widest mb-2">Support</h3>
          <p className="text-xs text-gray-500 dark:text-gray-400">For inquiries or bug reports, please contact our community support team through official channels.</p>
        </div>
      </div>
    </div>
  );
};

export default Terms;
