
import React, { useState, useEffect } from 'react';

const InterestCalculator: React.FC = () => {
  const [principal, setPrincipal] = useState<number>(10000);
  const [rate, setRate] = useState<number>(5);
  const [time, setTime] = useState<number>(5); // in years
  const [compounding, setCompounding] = useState<number>(1); // yearly
  const [isCompound, setIsCompound] = useState<boolean>(true);
  const [total, setTotal] = useState<number>(0);
  const [interest, setInterest] = useState<number>(0);

  useEffect(() => {
    if (principal > 0 && rate > 0 && time > 0) {
      let finalTotal = 0;
      if (isCompound) {
        finalTotal = principal * Math.pow(1 + (rate / 100 / compounding), compounding * time);
      } else {
        finalTotal = principal * (1 + (rate / 100) * time);
      }
      setTotal(parseFloat(finalTotal.toFixed(2)));
      setInterest(parseFloat((finalTotal - principal).toFixed(2)));
    }
  }, [principal, rate, time, compounding, isCompound]);

  return (
    <div className="max-w-5xl mx-auto animate-in fade-in slide-in-from-bottom-8 duration-700">
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
        <div className="space-y-2">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary-50 dark:bg-primary-900/30 border border-primary-100 dark:border-primary-800 text-[10px] font-black text-primary-600 dark:text-primary-300 uppercase tracking-widest">
            Finance & Growth
          </div>
          <h1 className="text-4xl md:text-5xl font-black text-gray-900 dark:text-white tracking-tight">Interest Calculator</h1>
          <p className="text-gray-500 dark:text-gray-400 max-w-xl">
            Compare simple and compound interest to see how your money grows over time with the power of compounding.
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
        <div className="lg:col-span-7 space-y-8">
          <div className="bg-white dark:bg-slate-800/60 rounded-[2.5rem] p-8 border border-gray-100 dark:border-white/5 shadow-xl shadow-gray-200/20 backdrop-blur-sm">
            
            <div className="flex bg-gray-100 dark:bg-slate-900 p-1.5 rounded-2xl mb-10 border border-gray-100 dark:border-white/5">
              <button 
                onClick={() => setIsCompound(true)}
                className={`flex-1 py-3 rounded-xl text-sm font-bold transition-all ${isCompound ? 'bg-white dark:bg-slate-800 text-primary-500 shadow-sm' : 'text-gray-500'}`}
              >
                Compound Interest
              </button>
              <button 
                onClick={() => setIsCompound(false)}
                className={`flex-1 py-3 rounded-xl text-sm font-bold transition-all ${!isCompound ? 'bg-white dark:bg-slate-800 text-primary-500 shadow-sm' : 'text-gray-500'}`}
              >
                Simple Interest
              </button>
            </div>

            <div className="space-y-10">
              {/* Principal Input */}
              <div>
                <div className="flex justify-between items-center mb-6">
                  <label className="text-lg font-bold text-gray-800 dark:text-white flex items-center gap-3">
                    <div className="w-10 h-10 rounded-xl bg-primary-50 dark:bg-primary-900/30 flex items-center justify-center text-primary-500">
                      ₹
                    </div>
                    Principal
                  </label>
                  <div className="bg-gray-50 dark:bg-white/5 p-2 rounded-xl border border-gray-100 dark:border-white/5">
                    <input 
                      type="number" value={principal}
                      onChange={(e) => setPrincipal(Number(e.target.value))}
                      className="w-24 text-right bg-transparent border-none font-black text-xl text-primary-500 focus:ring-0"
                    />
                  </div>
                </div>
                <input
                  type="range" min="1000" max="1000000" step="1000" value={principal}
                  onChange={(e) => setPrincipal(Number(e.target.value))}
                  className="w-full h-3 bg-gray-100 dark:bg-slate-700 rounded-full appearance-none cursor-pointer accent-primary-500"
                />
              </div>

              {/* Rate & Time row */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
                <div className="space-y-4">
                  <label className="text-xs font-black text-gray-400 uppercase tracking-widest px-2">Annual Interest Rate (%)</label>
                  <input 
                    type="number" step="0.1" value={rate}
                    onChange={(e) => setRate(Number(e.target.value))}
                    className="w-full p-4 bg-gray-50 dark:bg-slate-900 border border-gray-100 dark:border-white/5 rounded-2xl font-bold dark:text-white"
                  />
                </div>
                <div className="space-y-4">
                  <label className="text-xs font-black text-gray-400 uppercase tracking-widest px-2">Time Period (Years)</label>
                  <input 
                    type="number" value={time}
                    onChange={(e) => setTime(Number(e.target.value))}
                    className="w-full p-4 bg-gray-50 dark:bg-slate-900 border border-gray-100 dark:border-white/5 rounded-2xl font-bold dark:text-white"
                  />
                </div>
              </div>

              {isCompound && (
                <div className="space-y-4">
                  <label className="text-xs font-black text-gray-400 uppercase tracking-widest px-2">Compounding Frequency</label>
                  <select 
                    value={compounding}
                    onChange={(e) => setCompounding(Number(e.target.value))}
                    className="w-full p-4 bg-gray-50 dark:bg-slate-900 border border-gray-100 dark:border-white/5 rounded-2xl font-bold dark:text-white"
                  >
                    <option value={1}>Yearly</option>
                    <option value={2}>Half-Yearly</option>
                    <option value={4}>Quarterly</option>
                    <option value={12}>Monthly</option>
                    <option value={365}>Daily</option>
                  </select>
                </div>
              )}
            </div>
          </div>
        </div>

        <div className="lg:col-span-5 space-y-6">
          <div className="bg-gradient-to-br from-indigo-600 to-primary-700 rounded-[2.5rem] p-10 text-white shadow-2xl shadow-indigo-500/20 relative overflow-hidden group">
            <div className="relative z-10 space-y-8">
              <div>
                <p className="text-[10px] font-black uppercase tracking-[0.3em] opacity-70 mb-4">Total Future Value</p>
                <div className="text-6xl font-black tracking-tight">₹ {total.toLocaleString()}</div>
              </div>

              <div className="pt-8 border-t border-white/20">
                <p className="text-[10px] font-black uppercase tracking-[0.3em] opacity-70 mb-2">Interest Earned</p>
                <div className="text-3xl font-bold text-emerald-300">+ ₹ {interest.toLocaleString()}</div>
              </div>
            </div>
          </div>

          <div className="bg-white dark:bg-slate-800/60 rounded-[2.5rem] border border-gray-100 dark:border-white/5 p-8 backdrop-blur-sm">
             <h4 className="text-sm font-black text-gray-900 dark:text-white uppercase tracking-widest mb-6 flex items-center gap-2">
                <i className="fas fa-magnifying-glass-chart text-primary-500"></i> Investment Summary
             </h4>
             <div className="space-y-6">
               <div className="flex justify-between items-center text-sm">
                 <span className="text-gray-500">Principal Contribution</span>
                 <span className="font-bold text-gray-900 dark:text-white">₹ {principal.toLocaleString()}</span>
               </div>
               <div className="flex justify-between items-center text-sm">
                 <span className="text-gray-500">Total Interest</span>
                 <span className="font-bold text-emerald-500">₹ {interest.toLocaleString()}</span>
               </div>
               <div className="pt-4 border-t border-gray-100 dark:border-white/5 flex justify-between items-center">
                 <span className="text-xs font-black uppercase tracking-widest text-gray-400">Total Return</span>
                 <span className="text-lg font-black text-primary-500">{((interest / principal) * 100).toFixed(1)}%</span>
               </div>
             </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default InterestCalculator;
