import React from 'react';
import { PhoneIncoming, PhoneOutgoing, PhoneMissed, Search } from 'lucide-react';

export default function CallLogs() {
    const calls = [
        { id: 1, name: 'Mom', number: '+91 9876543210', type: 'incoming', duration: '5m 23s', time: '10:30 AM' },
        { id: 2, name: 'Unknown', number: '+91 8888888888', type: 'missed', duration: '0s', time: '09:15 AM' },
        { id: 3, name: 'Rahul Friend', number: '+91 7777777777', type: 'outgoing', duration: '12m 45s', time: 'Yesterday' },
        { id: 4, name: 'Coach', number: '+91 9999999999', type: 'incoming', duration: '2m 10s', time: 'Yesterday' },
        { id: 5, name: 'Spam Caller', number: '+91 14000000', type: 'missed', duration: '0s', time: 'Yesterday' },
    ];

    return (
        <div className="space-y-6">
            <header className="flex justify-between items-center">
                <div>
                    <h2 className="text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-white to-slate-400">Call Logs</h2>
                    <p className="text-slate-400 mt-1">History of incoming and outgoing calls</p>
                </div>
                <div className="relative">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
                    <input
                        type="text"
                        placeholder="Search number..."
                        className="bg-white/5 border border-white/10 rounded-xl pl-10 pr-4 py-2.5 text-slate-200 outline-none focus:border-blue-500/50 w-72 transition-all shadow-sm"
                    />
                </div>
            </header>

            <div className="glass-panel rounded-2xl overflow-hidden">
                <table className="w-full text-left border-collapse">
                    <thead className="bg-white/5 text-slate-400 text-sm uppercase tracking-wider">
                        <tr>
                            <th className="p-5 font-semibold">Contact</th>
                            <th className="p-5 font-semibold">Type</th>
                            <th className="p-5 font-semibold">Duration</th>
                            <th className="p-5 font-semibold">Time</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-white/5">
                        {calls.map((call) => (
                            <tr key={call.id} className="hover:bg-white/5 transition-colors group">
                                <td className="p-5">
                                    <div className="font-medium text-slate-200 group-hover:text-blue-300 transition-colors">{call.name}</div>
                                    <div className="text-xs text-slate-500 font-mono mt-0.5">{call.number}</div>
                                </td>
                                <td className="p-5">
                                    <span className={`inline-flex items-center gap-2 px-2.5 py-1.5 rounded-lg text-xs font-medium border ${call.type === 'incoming' ? 'bg-blue-500/10 text-blue-300 border-blue-500/20' :
                                            call.type === 'outgoing' ? 'bg-green-500/10 text-green-300 border-green-500/20' :
                                                'bg-red-500/10 text-red-300 border-red-500/20'
                                        }`}>
                                        {call.type === 'incoming' && <PhoneIncoming size={13} />}
                                        {call.type === 'outgoing' && <PhoneOutgoing size={13} />}
                                        {call.type === 'missed' && <PhoneMissed size={13} />}
                                        {call.type.charAt(0).toUpperCase() + call.type.slice(1)}
                                    </span>
                                </td>
                                <td className="p-5 text-slate-300 text-sm font-medium">{call.duration}</td>
                                <td className="p-5 text-slate-400 text-sm">{call.time}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
}
