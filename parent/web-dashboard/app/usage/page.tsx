import React from 'react';
import { BarChart2, Clock } from 'lucide-react';

export default function AppUsagePage() {
    return (
        <div className="space-y-6">
            <header>
                <h2 className="text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-white to-slate-400">
                    App Usage Stats
                </h2>
                <p className="text-slate-400 mt-1">Detailed breakdown of application screen time</p>
            </header>

            <div className="glass-panel p-8 rounded-2xl flex flex-col items-center justify-center min-h-[400px] text-center border border-dashed border-white/10 bg-white/5">
                <div className="bg-blue-500/10 p-4 rounded-full mb-4">
                    <BarChart2 className="text-blue-400 h-10 w-10" />
                </div>
                <h3 className="text-xl font-semibold text-slate-200">Usage Analytics Placeholder</h3>
                <p className="text-slate-400 max-w-sm mt-2">
                    Detailed charts and lists of most used apps, category breakdown, and weird usage patterns will appear here.
                </p>
            </div>
        </div>
    );
}
