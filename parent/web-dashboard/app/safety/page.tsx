import React from 'react';
import { Shield, ShieldAlert, Lock } from 'lucide-react';

export default function SafetyPage() {
    return (
        <div className="space-y-6">
            <header>
                <h2 className="text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-white to-slate-400">
                    Safety & Controls
                </h2>
                <p className="text-slate-400 mt-1">Manage restrictions and view safety alerts</p>
            </header>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="glass-panel p-6 rounded-2xl border border-dashed border-white/10 bg-white/5 flex flex-col items-center justify-center h-[250px] text-center">
                    <ShieldAlert className="text-yellow-400 h-10 w-10 mb-3" />
                    <h3 className="text-lg font-semibold text-slate-200">Recent Alerts</h3>
                    <p className="text-slate-400 text-sm mt-1">No critical safety alerts in the last 24 hours.</p>
                </div>

                <div className="glass-panel p-6 rounded-2xl border border-dashed border-white/10 bg-white/5 flex flex-col items-center justify-center h-[250px] text-center">
                    <Lock className="text-purple-400 h-10 w-10 mb-3" />
                    <h3 className="text-lg font-semibold text-slate-200">content Filters</h3>
                    <p className="text-slate-400 text-sm mt-1">Web filtering is active. 14 block attempts blocked today.</p>
                </div>
            </div>
        </div>
    );
}
