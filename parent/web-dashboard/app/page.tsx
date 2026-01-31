import React from 'react';
import ClientAppUsageChart from './components/ClientAppUsageChart';
import { Smartphone, MapPin, Clock, ShieldCheck, AlertTriangle, LucideIcon } from 'lucide-react';

export default function Home() {
  return (
    <div className="space-y-8 pb-8">
      <header className="flex justify-between items-center animate-slide-up">
        <div>
          <h2 className="text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-white to-slate-400">
            Dashboard Overview
          </h2>
          <p className="text-slate-400 mt-1">Real-time monitoring for Rahul&apos;s Pixel 7</p>
        </div>
        <div className="flex gap-4">
          <button
            suppressHydrationWarning
            className="group relative bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-500 hover:to-indigo-500 text-white px-6 py-2.5 rounded-xl font-semibold transition-all shadow-[0_4px_20px_rgba(79,70,229,0.4)] hover:shadow-[0_6px_25px_rgba(79,70,229,0.5)] active:scale-95 flex items-center gap-2 border border-white/10"
          >
            <div className="absolute inset-0 rounded-xl bg-white/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300 blur-md"></div>
            <Clock size={18} className="group-hover:animate-spin relative z-10" />
            <span className="relative z-10">Refresh Data</span>
          </button>
        </div>
      </header>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 animate-slide-up delay-100">
        <StatsCard
          title="Screen Time"
          value="4h 12m"
          sub="Today"
          icon={Clock}
          trend="+15%"
          trendUp={true}
          color="text-blue-400"
          bg="bg-blue-500/10"
        />
        <StatsCard
          title="Current Location"
          value="School"
          sub="Since 8:30 AM"
          icon={MapPin}
          color="text-emerald-400"
          bg="bg-emerald-500/10"
        />
        <StatsCard
          title="App Limits"
          value="2 Warnings"
          sub="Instagram limit exceeded"
          icon={Smartphone}
          color="text-orange-400"
          bg="bg-orange-500/10"
        />
        <StatsCard
          title="Safety Status"
          value="Secure"
          sub="No threats detected"
          icon={ShieldCheck}
          color="text-purple-400"
          bg="bg-purple-500/10"
        />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 animate-slide-up delay-200">
        {/* Main Chart Section */}
        <div className="lg:col-span-2 glass-panel p-6 rounded-2xl">
          <div className="flex justify-between items-center mb-2">
            <h3 className="text-xl font-bold flex items-center gap-2 text-slate-100">
              <Smartphone className="text-blue-400" size={24} />
              App Usage Breakdown
            </h3>
            <select
              suppressHydrationWarning
              className="bg-white/5 border border-white/10 rounded-lg px-3 py-1 text-sm text-slate-300 outline-none"
            >
              <option>Today</option>
              <option>Yesterday</option>
              <option>Last 7 Days</option>
            </select>
          </div>
          <ClientAppUsageChart />
        </div>

        {/* Recent Activity Feed */}
        <div className="lg:col-span-1 glass-panel p-6 rounded-2xl">
          <h3 className="text-xl font-bold mb-6 flex items-center gap-2 text-slate-100">
            <AlertTriangle className="text-yellow-400" size={24} />
            Recent Alerts
          </h3>
          <div className="space-y-4">
            <AlertItem title="Geofence Exited" time="2 mins ago" desc="Left 'Home' zone" type="warning" />
            <AlertItem title="Instagram Limit" time="1 hour ago" desc="Daily limit reached" type="critical" />
            <AlertItem title="Unusual Call" time="3 hours ago" desc="Call from unknown number" type="info" />
          </div>
        </div>
      </div>
    </div>
  );
}

interface StatsCardProps {
  title: string;
  value: string;
  sub: string;
  icon: LucideIcon;
  trend?: string;
  trendUp?: boolean;
  color: string;
  bg: string;
}

const StatsCard = ({ title, value, sub, icon: Icon, trend, trendUp, color, bg }: StatsCardProps) => (
  <div className="glass-card p-6 flex flex-col justify-between h-[160px] relative overflow-hidden group hover:bg-white/[0.04] transition-all duration-300 border border-white/5 hover:border-white/10">

    <div className="flex justify-between items-start">
      <div className={`p-3 rounded-xl bg-white/5 border border-white/5 ${color} shadow-sm group-hover:scale-105 transition-transform duration-300`}>
        <Icon size={22} strokeWidth={2} />
      </div>
      {trend && (
        <span className={`text-xs px-2.5 py-1 rounded-md font-medium border flex items-center gap-1 ${trendUp ? 'bg-red-500/10 text-red-400 border-red-500/10' : 'bg-emerald-500/10 text-emerald-400 border-emerald-500/10'}`}>
          {trend}
        </span>
      )}
    </div>

    <div className="relative z-10 mt-4">
      <h3 className="text-slate-400 text-sm font-medium mb-1 tracking-wide uppercase text-[11px]">{title}</h3>
      <div className="text-3xl font-bold text-white mb-2 tracking-tight">{value}</div>
      <div className="text-xs text-slate-500 font-medium">{sub}</div>
    </div>
  </div>
);

interface AlertItemProps {
  title: string;
  time: string;
  desc: string;
  type: 'warning' | 'critical' | 'info';
}

const AlertItem = ({ title, time, desc, type }: AlertItemProps) => {
  const styles = {
    warning: 'border-yellow-500/20 bg-yellow-500/5 text-yellow-200 hover:bg-yellow-500/10',
    critical: 'border-red-500/20 bg-red-500/5 text-red-200 hover:bg-red-500/10',
    info: 'border-blue-500/20 bg-blue-500/5 text-blue-200 hover:bg-blue-500/10'
  };

  const iconColors = {
    warning: 'bg-yellow-500',
    critical: 'bg-red-500',
    info: 'bg-blue-500'
  }

  return (
    <div className={`p-4 rounded-xl border ${styles[type as keyof typeof styles]} flex justify-between items-start transition-all cursor-default`}>
      <div className="flex gap-3">
        <div className={`mt-1.5 h-2 w-2 rounded-full ${iconColors[type]} shadow-[0_0_8px_currentColor] animate-pulse`}></div>
        <div>
          <h4 className="font-semibold text-sm tracking-wide">{title}</h4>
          <p className="text-xs opacity-70 mt-1 leading-relaxed">{desc}</p>
        </div>
      </div>
      <span className="text-[10px] font-mono opacity-50 whitespace-nowrap ml-2 bg-black/20 px-1.5 py-0.5 rounded">{time}</span>
    </div>
  );
};
