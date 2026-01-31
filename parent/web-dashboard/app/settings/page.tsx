'use client';

import React, { useState, useEffect } from 'react';
import {
    User, Mail, Lock, LogOut,
    Bell, Smartphone, RefreshCw, Wifi,
    ChevronRight, Laptop, Shield, Trash2, WifiOff
} from 'lucide-react';
import { QRCodeSVG } from 'qrcode.react';

interface DeviceData {
    deviceId: string;
    name: string;
    battery: number;
    status: 'online' | 'offline';
    lastSync: number;
}

export default function SettingsPage() {
    const [loading, setLoading] = useState(false);
    const [device, setDevice] = useState<DeviceData | null>(null);
    const [lastSyncText, setLastSyncText] = useState('Checking...');
    const [pairingCode, setPairingCode] = useState<{ code: string; expiresAt: number } | null>(null);
    const [timeRemaining, setTimeRemaining] = useState('');
    const [showQR, setShowQR] = useState(true); // Toggle between QR and manual code

    // State for toggles
    const [notifications, setNotifications] = useState({
        alerts: true,
        email: true,
        push: false
    });

    // Fetch initial data
    useEffect(() => {
        // Fetch Settings
        fetch('/api/parent/settings')
            .then(res => res.json())
            .then(data => {
                if (data) setNotifications({
                    alerts: data.realtimeAlerts,
                    email: data.emailReports,
                    push: data.pushNotifications
                });
            });

        // Fetch Device
        fetchDevices();

        // Fetch Pairing Code
        fetchPairingCode();
    }, []);

    // Timer for pairing code expiry
    useEffect(() => {
        if (!pairingCode) return;

        const interval = setInterval(() => {
            const remaining = pairingCode.expiresAt - Date.now();

            if (remaining <= 0) {
                setTimeRemaining('Expired');
                fetchPairingCode(); // Auto-refresh
            } else {
                const minutes = Math.floor(remaining / 60000);
                const seconds = Math.floor((remaining % 60000) / 1000);
                setTimeRemaining(`${minutes}:${seconds.toString().padStart(2, '0')}`);
            }
        }, 1000);

        return () => clearInterval(interval);
    }, [pairingCode]);

    const fetchPairingCode = () => {
        fetch('/api/parent/pair-code')
            .then(res => res.json())
            .then(data => setPairingCode(data));
    };

    const generateNewCode = async () => {
        const res = await fetch('/api/parent/pair-code', { method: 'POST' });
        const data = await res.json();
        setPairingCode(data);
    };

    const fetchDevices = () => {
        fetch('/api/parent/devices')
            .then(res => res.json())
            .then(data => {
                if (data.devices && data.devices.length > 0) {
                    setDevice(data.devices[0]);
                    updateLastSyncTime(data.devices[0].lastSync);
                } else {
                    setDevice(null);
                }
            });
    };

    const updateLastSyncTime = (timestamp: number) => {
        const diff = Math.floor((Date.now() - timestamp) / 60000);
        if (diff < 1) setLastSyncText('Just now');
        else if (diff < 60) setLastSyncText(`${diff} mins ago`);
        else setLastSyncText(`${Math.floor(diff / 60)} hours ago`);
    };

    const handleToggle = async (key: keyof typeof notifications) => {
        // Optimistic UI update
        const newState = !notifications[key];
        setNotifications(prev => ({ ...prev, [key]: newState }));

        // Send to API
        const payload = {
            realtimeAlerts: key === 'alerts' ? newState : notifications.alerts,
            emailReports: key === 'email' ? newState : notifications.email,
            pushNotifications: key === 'push' ? newState : notifications.push
        };

        if (key === 'push' && newState === true) {
            // Request Permission for PWA
            if ('Notification' in window) {
                const permission = await Notification.requestPermission();
                if (permission === 'granted') {
                    new Notification("GuardOne", { body: "Push notifications enabled successfully!" });
                }
            }
        }

        await fetch('/api/parent/settings', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(payload)
        });
    };

    const handleSync = () => {
        setLoading(true);
        fetchDevices(); // In real app, this might trigger a server ping
        setTimeout(() => setLoading(false), 1500);
    };

    const handleUnpair = async () => {
        if (!device) return;
        if (confirm("Are you sure you want to unpair this device? This action cannot be undone.")) {
            await fetch('/api/device/unpair', {
                method: 'POST',
                body: JSON.stringify({ deviceId: device.deviceId })
            });
            setDevice(null);
        }
    };

    return (
        <div className="space-y-8 pb-8 animate-slide-up">
            <header>
                <h2 className="text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-white to-slate-400">
                    Settings
                </h2>
                <p className="text-slate-400 mt-1">Complete your profile to start using the app</p>
            </header>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">

                {/* Account Settings */}
                <div className="glass-panel p-6 rounded-2xl border border-white/5 space-y-6">
                    <div className="flex items-center gap-3 mb-2">
                        <div className="p-2 bg-blue-500/10 rounded-lg">
                            <User className="text-blue-400" size={24} />
                        </div>
                        <h3 className="text-xl font-bold text-slate-100">Account Settings</h3>
                    </div>

                    <div className="space-y-4">
                        <div className="space-y-1.5">
                            <label className="text-sm font-medium text-slate-400 ml-1">Full Name</label>
                            <div className="relative group">
                                <User className="absolute left-3 top-3 text-slate-500 group-hover:text-blue-400 transition-colors" size={18} />
                                <input
                                    type="text"
                                    defaultValue="Admin Parent"
                                    className="w-full bg-black/20 border border-white/10 rounded-xl py-2.5 pl-10 pr-4 text-slate-200 outline-none focus:border-blue-500/50 focus:bg-blue-500/5 transition-all"
                                />
                            </div>
                        </div>

                        <div className="space-y-1.5">
                            <label className="text-sm font-medium text-slate-400 ml-1">Email Address</label>
                            <div className="relative group">
                                <Mail className="absolute left-3 top-3 text-slate-500 group-hover:text-blue-400 transition-colors" size={18} />
                                <input
                                    type="email"
                                    defaultValue="admin@guardone.com"
                                    readOnly
                                    className="w-full bg-black/20 border border-white/10 rounded-xl py-2.5 pl-10 pr-4 text-slate-400 outline-none cursor-not-allowed opacity-70"
                                />
                            </div>
                        </div>

                        <button className="w-full mt-2 flex items-center justify-between p-3 rounded-xl bg-white/5 hover:bg-white/10 border border-white/5 transition-all group">
                            <div className="flex items-center gap-3">
                                <div className="bg-slate-500/10 p-2 rounded-lg group-hover:bg-slate-500/20">
                                    <Lock size={18} className="text-slate-300" />
                                </div>
                                <span className="font-medium text-slate-300">Change Password</span>
                            </div>
                            <ChevronRight size={18} className="text-slate-500 group-hover:translate-x-1 transition-transform" />
                        </button>

                        <button
                            className="w-full flex items-center justify-center gap-2 p-3 rounded-xl bg-red-500/10 hover:bg-red-500/20 border border-red-500/10 text-red-400 font-medium transition-all hover:shadow-lg hover:shadow-red-900/20 mt-4 active:scale-95"
                        >
                            <LogOut size={18} />
                            Logout
                        </button>
                    </div>
                </div>

                <div className="space-y-6">
                    {/* Notification Settings */}
                    <div className="glass-panel p-6 rounded-2xl border border-white/5">
                        <div className="flex items-center gap-3 mb-6">
                            <div className="p-2 bg-purple-500/10 rounded-lg">
                                <Bell className="text-purple-400" size={24} />
                            </div>
                            <h3 className="text-xl font-bold text-slate-100">Notifications</h3>
                        </div>

                        <div className="space-y-4">
                            <ToggleItem
                                title="Real-time Alerts"
                                desc="Get notified immediately for critical events"
                                active={notifications.alerts}
                                onClick={() => handleToggle('alerts')}
                            />
                            <ToggleItem
                                title="Email Reports"
                                desc="Weekly activity summaries sent to email"
                                active={notifications.email}
                                onClick={() => handleToggle('email')}
                            />
                            <ToggleItem
                                title="Push Notifications"
                                desc="Receive alerts on this device (PWA)"
                                active={notifications.push}
                                onClick={() => handleToggle('push')}
                                badge="Recommended"
                            />
                        </div>
                    </div>

                    {/* Device Info */}
                    <div className="glass-panel p-6 rounded-2xl border border-white/5">
                        <div className="flex items-center gap-3 mb-6">
                            <div className="p-2 bg-emerald-500/10 rounded-lg">
                                <Smartphone className="text-emerald-400" size={24} />
                            </div>
                            <h3 className="text-xl font-bold text-slate-100">Paired Device</h3>
                        </div>

                        {device ? (
                            <div className="relative overflow-hidden rounded-xl bg-black/20 border border-white/5 p-4">
                                <div className="absolute top-0 right-0 p-3 opacity-10">
                                    <Smartphone size={100} />
                                </div>

                                <div className="flex items-center gap-4 relative z-10">
                                    <div className="h-12 w-12 rounded-xl bg-gradient-to-br from-slate-700 to-slate-900 flex items-center justify-center border border-white/10 shadow-lg">
                                        <span className="text-lg font-bold text-slate-200">{device.name.substring(0, 2)}</span>
                                    </div>
                                    <div>
                                        <h4 className="font-bold text-lg text-white">{device.name}</h4>
                                        <div className="flex items-center gap-2 mt-1">
                                            {device.status === 'online' ? (
                                                <span className="flex items-center gap-1 text-[11px] font-medium bg-emerald-500/10 text-emerald-400 px-2 py-0.5 rounded-full border border-emerald-500/10 animate-pulse">
                                                    <Wifi size={10} />
                                                    Online
                                                </span>
                                            ) : (
                                                <span className="flex items-center gap-1 text-[11px] font-medium bg-slate-500/10 text-slate-400 px-2 py-0.5 rounded-full border border-slate-500/10">
                                                    <WifiOff size={10} />
                                                    Offline
                                                </span>
                                            )}

                                            <span className="text-xs text-slate-500">
                                                Battery: <span className={device.battery < 20 ? 'text-red-400' : 'text-slate-300'}>{device.battery}%</span>
                                            </span>
                                        </div>
                                    </div>
                                </div>

                                <div className="mt-4 pt-4 border-t border-white/5 flex justify-between items-center">
                                    <div className="flex items-center gap-2 text-xs text-slate-400">
                                        <RefreshCw size={12} className={loading ? 'animate-spin' : ''} />
                                        <span>Last synced: <span className="text-slate-300">{lastSyncText}</span></span>
                                    </div>
                                    <div className="flex gap-3">
                                        <button
                                            onClick={handleUnpair}
                                            className="text-xs font-medium text-red-700 hover:text-red-600 transition-colors flex items-center gap-1 opacity-60 hover:opacity-100"
                                        >
                                            <Trash2 size={12} /> Unpair
                                        </button>
                                        <button
                                            onClick={handleSync}
                                            className="text-xs font-medium text-blue-400 hover:text-blue-300 transition-colors"
                                        >
                                            Sync Now
                                        </button>
                                    </div>
                                </div>
                            </div>
                        ) : (
                            <div className="p-6 border border-dashed border-white/10 rounded-xl bg-white/5 flex flex-col items-center justify-center text-center">
                                <h3 className="text-slate-300 font-medium mb-1">Pair New Device</h3>
                                <p className="text-xs text-slate-500 mb-3">Scan QR code or enter code manually</p>

                                {/* Toggle Buttons */}
                                <div className="flex gap-2 mb-4 bg-black/20 p-1 rounded-lg">
                                    <button
                                        onClick={() => setShowQR(true)}
                                        className={`px-4 py-1.5 text-xs rounded-md transition-all ${showQR
                                            ? 'bg-blue-600 text-white shadow-lg'
                                            : 'text-slate-400 hover:text-slate-300'
                                            }`}
                                    >
                                        QR Code
                                    </button>
                                    <button
                                        onClick={() => setShowQR(false)}
                                        className={`px-4 py-1.5 text-xs rounded-md transition-all ${!showQR
                                            ? 'bg-blue-600 text-white shadow-lg'
                                            : 'text-slate-400 hover:text-slate-300'
                                            }`}
                                    >
                                        Manual Code
                                    </button>
                                </div>

                                {pairingCode && (
                                    <>
                                        {/* QR Code View */}
                                        {showQR ? (
                                            <div className="mb-4">
                                                <div className="bg-white p-4 rounded-xl mb-3 inline-block">
                                                    <QRCodeSVG
                                                        value={JSON.stringify({
                                                            code: pairingCode.code,
                                                            server: typeof window !== 'undefined' ? window.location.origin : ''
                                                        })}
                                                        size={180}
                                                        level="H"
                                                    />
                                                </div>
                                                <p className="text-xs text-slate-400 mb-2">Scan with Child App Camera</p>
                                            </div>
                                        ) : (
                                            /* Manual Code View */
                                            <div className="bg-black/30 border border-white/10 rounded-xl px-8 py-3 mb-3">
                                                <h1 className="text-3xl font-bold tracking-widest text-white">{pairingCode.code}</h1>
                                            </div>
                                        )}

                                        {/* Timer */}
                                        <div className="flex items-center gap-3 mb-4">
                                            <span className={`text-xs px-3 py-1 rounded-full border ${timeRemaining === 'Expired'
                                                    ? 'bg-red-500/10 text-red-400 border-red-500/20'
                                                    : 'bg-blue-500/10 text-blue-400 border-blue-500/20'
                                                }`}>
                                                {timeRemaining === 'Expired' ? '⚠️ Expired' : `⏱️ Expires in ${timeRemaining}`}
                                            </span>
                                        </div>

                                        {/* Action Buttons */}
                                        <div className="flex gap-2">
                                            <button
                                                onClick={() => {
                                                    navigator.clipboard.writeText(pairingCode.code);
                                                    alert('Code copied!');
                                                }}
                                                className="text-xs bg-white/5 hover:bg-white/10 text-slate-300 px-4 py-2 rounded-lg border border-white/5 transition-colors"
                                            >
                                                Copy Code
                                            </button>

                                            <button
                                                onClick={generateNewCode}
                                                className="text-xs bg-blue-600 hover:bg-blue-500 text-white px-4 py-2 rounded-lg transition-colors"
                                            >
                                                Generate New Code
                                            </button>
                                        </div>
                                    </>
                                )}
                            </div>
                        )}
                    </div>
                </div>

            </div>
        </div>
    );
}

const ToggleItem = ({ title, desc, active, onClick, badge }: { title: string, desc: string, active: boolean, onClick: () => void, badge?: string }) => (
    <div
        onClick={onClick}
        className={`flex items-center justify-between p-3 rounded-xl border transition-all cursor-pointer group ${active ? 'bg-blue-500/5 border-blue-500/20' : 'bg-white/5 border-white/5 hover:bg-white/10'}`}
    >
        <div className="flex-1">
            <div className="flex items-center gap-2">
                <span className={`font-medium ${active ? 'text-blue-200' : 'text-slate-300'}`}>{title}</span>
                {badge && <span className="text-[10px] bg-blue-500 text-white px-1.5 rounded font-bold">{badge}</span>}
            </div>
            <p className="text-xs text-slate-500 mt-0.5">{desc}</p>
        </div>
        <div className={`w-11 h-6 rounded-full relative transition-colors duration-300 ${active ? 'bg-blue-600' : 'bg-slate-700'}`}>
            <div className={`absolute top-1 left-1 bg-white h-4 w-4 rounded-full transition-transform duration-300 shadow-md ${active ? 'translate-x-5' : 'translate-x-0'}`}></div>
        </div>
    </div>
);
