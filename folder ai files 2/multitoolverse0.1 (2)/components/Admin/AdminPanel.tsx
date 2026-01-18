
import React from 'react';
import { TOOLS } from '../../constants.tsx';

const AdminPanel: React.FC = () => {
  const stats = [
    { label: 'Total Tools', value: TOOLS.length, icon: 'fa-toolbox', color: 'text-primary-500' },
    { label: 'Active Users', value: '1,284', icon: 'fa-users', color: 'text-emerald-500' },
    { label: 'API Health', value: '99.9%', icon: 'fa-heart-pulse', color: 'text-rose-500' },
    { label: 'System Load', value: '12%', icon: 'fa-microchip', color: 'text-amber-500' },
  ];

  return (
    <div className="animate-in fade-in slide-in-from-bottom-8 duration-700 pb-12">
      <header className="mb-10">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-slate-900 text-white dark:bg-white dark:text-slate-900 text-[10px] font-black uppercase tracking-widest mb-4">
          Control Center
        </div>
        <h1 className="text-4xl font-black text-gray-900 dark:text-white tracking-tight">Admin Dashboard</h1>
        <p className="text-gray-500 dark:text-gray-400 mt-2">Manage the MultiToolVerse ecosystem and monitor real-time performance.</p>
      </header>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
        {stats.map((stat, i) => (
          <div key={i} className="bg-white dark:bg-slate-800/40 p-6 rounded-[2rem] border border-gray-100 dark:border-white/10 shadow-sm backdrop-blur-sm group hover:scale-[1.02] transition-all">
            <div className="flex justify-between items-start mb-4">
              <div className={`w-12 h-12 rounded-2xl bg-gray-50 dark:bg-slate-900 flex items-center justify-center ${stat.color} text-xl shadow-inner group-hover:rotate-6 transition-transform`}>
                <i className={`fas ${stat.icon}`}></i>
              </div>
              <span className="text-[10px] font-black text-gray-400 uppercase tracking-widest">Live</span>
            </div>
            <p className="text-xs font-bold text-gray-500 dark:text-gray-400 uppercase tracking-widest mb-1">{stat.label}</p>
            <h3 className="text-3xl font-black text-gray-900 dark:text-white">{stat.value}</h3>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Tool Management Table */}
        <div className="lg:col-span-8">
          <div className="bg-white dark:bg-slate-800/40 rounded-[2.5rem] border border-gray-100 dark:border-white/10 shadow-xl overflow-hidden backdrop-blur-sm">
            <div className="p-8 border-b border-gray-100 dark:border-white/5 flex justify-between items-center">
              <h2 className="text-xl font-black text-gray-900 dark:text-white">Tool Inventory</h2>
              <button className="px-4 py-2 bg-primary-500 text-white rounded-xl text-[10px] font-black uppercase tracking-widest shadow-lg shadow-primary-500/20 hover:scale-105 active:scale-95 transition-all">
                Add New Tool
              </button>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full text-left">
                <thead className="bg-gray-50 dark:bg-white/5">
                  <tr>
                    <th className="px-8 py-4 text-[10px] font-black text-gray-400 uppercase tracking-widest">Tool Name</th>
                    <th className="px-8 py-4 text-[10px] font-black text-gray-400 uppercase tracking-widest">Category</th>
                    <th className="px-8 py-4 text-[10px] font-black text-gray-400 uppercase tracking-widest">Status</th>
                    <th className="px-8 py-4 text-[10px] font-black text-gray-400 uppercase tracking-widest text-right">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-100 dark:divide-white/5">
                  {TOOLS.slice(0, 6).map((tool) => (
                    <tr key={tool.id} className="hover:bg-gray-50/50 dark:hover:bg-white/5 transition-colors group">
                      <td className="px-8 py-5">
                        <div className="flex items-center gap-3">
                          <i className={`fas ${tool.icon} text-primary-500`}></i>
                          <span className="text-sm font-bold text-gray-900 dark:text-white">{tool.name}</span>
                        </div>
                      </td>
                      <td className="px-8 py-5">
                        <span className="text-xs font-medium text-gray-500 dark:text-gray-400">{tool.category}</span>
                      </td>
                      <td className="px-8 py-5">
                        <span className="inline-flex items-center gap-1.5 px-2 py-0.5 rounded-full bg-emerald-50 dark:bg-emerald-500/10 border border-emerald-100 dark:border-emerald-500/20 text-[9px] font-black text-emerald-600 dark:text-emerald-400 uppercase tracking-widest">
                          Active
                        </span>
                      </td>
                      <td className="px-8 py-5 text-right">
                        <button className="p-2 text-gray-400 hover:text-primary-500 transition-colors">
                          <i className="fas fa-ellipsis-vertical"></i>
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <div className="p-6 bg-gray-50/50 dark:bg-white/5 text-center">
              <button className="text-[10px] font-black text-primary-500 uppercase tracking-widest hover:underline">View All Tools</button>
            </div>
          </div>
        </div>

        {/* System Logs / Feed */}
        <div className="lg:col-span-4">
          <div className="bg-white dark:bg-slate-800/40 rounded-[2.5rem] p-8 border border-gray-100 dark:border-white/10 shadow-xl backdrop-blur-sm h-full">
            <h2 className="text-xl font-black text-gray-900 dark:text-white mb-6">Recent Activity</h2>
            <div className="space-y-6">
              {[
                { user: 'Guest_92', action: 'Used BMI Calculator', time: '2 mins ago', icon: 'fa-chart-simple', color: 'bg-primary-500' },
                { user: 'Admin', action: 'Updated News Cache', time: '15 mins ago', icon: 'fa-rotate', color: 'bg-amber-500' },
                { user: 'User_41', action: 'New Sign Up', time: '1 hour ago', icon: 'fa-user-plus', color: 'bg-emerald-500' },
                { user: 'System', action: 'Auto-backup Completed', time: '4 hours ago', icon: 'fa-database', color: 'bg-indigo-500' },
              ].map((log, i) => (
                <div key={i} className="flex gap-4 group">
                  <div className={`w-10 h-10 rounded-xl ${log.color} text-white flex shrink-0 items-center justify-center shadow-lg group-hover:scale-110 transition-transform`}>
                    <i className={`fas ${log.icon} text-xs`}></i>
                  </div>
                  <div>
                    <p className="text-xs font-bold text-gray-900 dark:text-white">
                      <span className="text-primary-500">{log.user}</span> {log.action}
                    </p>
                    <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest mt-0.5">{log.time}</p>
                  </div>
                </div>
              ))}
            </div>
            <button className="w-full mt-10 py-3 border border-dashed border-gray-200 dark:border-white/10 rounded-2xl text-[10px] font-black text-gray-400 uppercase tracking-widest hover:border-primary-500 hover:text-primary-500 transition-all">
              View Audit Logs
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminPanel;
