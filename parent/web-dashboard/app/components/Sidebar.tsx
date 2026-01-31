"use client";
import React from 'react';
import { Home, Phone, MapPin, BarChart2, Shield, Settings, Activity } from 'lucide-react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

const Sidebar = () => {
  const pathname = usePathname();

  const links = [
    { name: 'Dashboard', href: '/', icon: Home },
    { name: 'Call Logs', href: '/calls', icon: Phone },
    { name: 'Location', href: '/location', icon: MapPin },
    { name: 'App Usage', href: '/usage', icon: BarChart2 },
    { name: 'Safety', href: '/safety', icon: Shield },
    { name: 'Settings', href: '/settings', icon: Settings },
  ];

  return (
    <div
      suppressHydrationWarning
      className="w-64 h-screen fixed left-0 top-0 glass-panel border-r-0 rounded-l-none rounded-r-lg m-0 p-4 flex flex-col z-50 animate-fade-in"
    >
      <div className="flex items-center gap-3 mb-10 px-3 pt-4">
        <div className="p-2 bg-blue-500/20 rounded-xl border border-blue-500/30 shadow-[0_0_15px_rgba(59,130,246,0.5)]">
          <Activity className="h-6 w-6 text-blue-400" />
        </div>
        <h1 className="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 tracking-tight">
          GuardOne
        </h1>
      </div>

      <nav className="flex-1 space-y-2">
        {links.map((link) => {
          const Icon = link.icon;
          const isActive = pathname === link.href;
          return (
            <Link
              key={link.name}
              href={link.href}
              className={`relative flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-200 group
                ${isActive
                  ? 'bg-blue-600 text-white shadow-lg shadow-blue-900/40'
                  : 'text-slate-400 hover:bg-white/5 hover:text-slate-100'
                }`}
            >
              <Icon size={20} className={`transition-transform duration-200 ${isActive ? 'text-white' : 'group-hover:text-white'}`} />
              <span className="font-medium tracking-wide">{link.name}</span>
            </Link>
          );
        })}
      </nav>

      <div className="mt-auto relative group cursor-default">
        <div className="absolute -inset-0.5 bg-gradient-to-r from-emerald-500 to-blue-500 rounded-2xl opacity-20 group-hover:opacity-40 blur transition duration-500"></div>
        <div className="relative p-4 bg-[#0b0f19]/90 rounded-xl border border-white/10 backdrop-blur-xl">
          <div className="flex justify-between items-start">
            <div>
              <div className="text-[10px] uppercase tracking-wider text-slate-500 font-bold mb-1">Monitored Device</div>
              <div className="font-semibold text-slate-200">Rahul&apos;s Pixel 7</div>
            </div>
            <div className="h-2 w-2 rounded-full bg-emerald-500 shadow-[0_0_10px_#10b981] animate-pulse mt-1"></div>
          </div>
          <div className="mt-3 flex items-center gap-2 text-xs text-emerald-400/90 font-medium bg-emerald-500/10 px-2 py-1 rounded-md w-fit">
            <Activity size={12} />
            <span>Online & Syncing</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
