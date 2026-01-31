import Link from 'next/link';
import ClientMap from '../components/ClientMap';
import { MapPin, Navigation } from 'lucide-react';

export default function LocationPage() {
    return (
        <div className="space-y-6 h-[calc(100vh-140px)] flex flex-col">
            <header className="flex-none">
                <h2 className="text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-white to-slate-400">
                    Location Tracking
                </h2>
                <div className="flex justify-between items-end">
                    <p className="text-slate-400 mt-1">Real-time GPS coordinates and history</p>
                    <div className="flex gap-2">
                        <button
                            suppressHydrationWarning
                            className="bg-white/5 hover:bg-white/10 text-slate-300 px-4 py-2 rounded-lg text-sm font-medium transition-colors border border-white/10"
                        >
                            History
                        </button>
                        <button
                            suppressHydrationWarning
                            className="group relative bg-gradient-to-r from-emerald-600 to-green-600 hover:from-emerald-500 hover:to-green-500 text-white px-5 py-2 rounded-lg text-sm font-semibold transition-all shadow-[0_4px_15px_rgba(16,185,129,0.4)] hover:shadow-[0_6px_20px_rgba(16,185,129,0.5)] flex items-center gap-2 border border-white/10"
                        >
                            <div className="absolute inset-0 rounded-lg bg-white/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300 blur-sm"></div>
                            <Navigation size={16} className="relative z-10" />
                            <span className="relative z-10">Live View</span>
                        </button>
                    </div>
                </div>
            </header>

            <div className="glass-panel p-1 rounded-2xl flex-1 border border-white/10 bg-white/5 relative overflow-hidden">
                <ClientMap />

                {/* Overlay Card */}
                <div className="absolute bottom-6 left-6 z-[1000] p-4 glass-card bg-slate-900/90 border border-white/10 backdrop-blur-md rounded-xl shadow-2xl max-w-xs">
                    <div className="flex items-start gap-3">
                        <div className="p-2 bg-emerald-500/20 rounded-lg">
                            <MapPin className="text-emerald-400" size={20} />
                        </div>
                        <div>
                            <h4 className="font-bold text-slate-200 text-sm">Rahul's Pixel 7</h4>
                            <p className="text-xs text-slate-400 mt-0.5">24, Connaught Place, New Delhi</p>
                            <div className="flex items-center gap-2 mt-2">
                                <span className="text-[10px] bg-emerald-500/20 text-emerald-300 px-1.5 py-0.5 rounded border border-emerald-500/20">GPS Strong</span>
                                <span className="text-[10px] bg-blue-500/20 text-blue-300 px-1.5 py-0.5 rounded border border-blue-500/20">Battery 84%</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
