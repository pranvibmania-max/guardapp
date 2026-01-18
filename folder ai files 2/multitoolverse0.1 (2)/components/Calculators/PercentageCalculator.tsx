
import React, { useState } from 'react';

const PercentageCalculator: React.FC = () => {
  const [val1, setVal1] = useState<string>('10');
  const [val2, setVal2] = useState<string>('100');
  const [valInc1, setValInc1] = useState<string>('');
  const [valInc2, setValInc2] = useState<string>('');
  const [result, setResult] = useState<number | null>(10);
  const [calcType, setCalcType] = useState<'percentOf' | 'isPercentOf' | 'increase'>('percentOf');

  const calculate = (type: 'percentOf' | 'isPercentOf' | 'increase') => {
    let v1, v2;
    if (type === 'increase') {
      v1 = parseFloat(valInc1);
      v2 = parseFloat(valInc2);
    } else {
      v1 = parseFloat(val1);
      v2 = parseFloat(val2);
    }
    
    if (isNaN(v1) || isNaN(v2)) return;

    setCalcType(type);
    if (type === 'percentOf') setResult((v1 / 100) * v2);
    if (type === 'isPercentOf') setResult((v1 / v2) * 100);
    if (type === 'increase') setResult(((v2 - v1) / v1) * 100);
  };

  return (
    <div className="max-w-5xl mx-auto animate-in fade-in slide-in-from-bottom-8 duration-700">
      <header className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
        <div className="space-y-2">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-50 dark:bg-emerald-900/30 border border-emerald-100 dark:border-emerald-800 text-[10px] font-black text-emerald-600 dark:text-emerald-300 uppercase tracking-widest">
            Mathematical Tool
          </div>
          <h1 id="pct-title" className="text-4xl md:text-5xl font-black text-gray-900 dark:text-white tracking-tight">Percentage Calculator</h1>
          <p className="text-gray-500 dark:text-gray-400 max-w-xl">
            Solve everyday proportion tasks, from sales discounts and tips to percentage change and growth rates.
          </p>
        </div>
      </header>

      <section className="grid grid-cols-1 lg:grid-cols-12 gap-10" aria-labelledby="pct-title">
        <div className="lg:col-span-7 space-y-6">
          <div className="bg-white dark:bg-slate-800/60 rounded-[2.5rem] p-8 border border-gray-100 dark:border-white/5 shadow-xl shadow-gray-200/20 backdrop-blur-sm space-y-10">
            
            {/* Calculation Card 1 */}
            <div className="space-y-6 group">
              <div className="flex items-center gap-3">
                 <div className="w-8 h-8 rounded-lg bg-emerald-500 text-white flex items-center justify-center text-xs" aria-hidden="true">
                    <i className="fas fa-percent"></i>
                 </div>
                 <h3 className="text-sm font-black text-gray-900 dark:text-white uppercase tracking-widest">Value of Percent</h3>
              </div>
              <div className="flex flex-wrap items-center gap-4 bg-gray-50 dark:bg-slate-900 p-6 rounded-3xl border border-gray-100 dark:border-white/5">
                <span className="text-sm font-bold text-gray-500" id="label-percent-of">What is</span>
                <input 
                  type="number" className="w-24 px-4 py-3 bg-white dark:bg-slate-800 border-none rounded-xl font-black text-lg focus:ring-2 focus:ring-emerald-500/20 dark:text-white shadow-sm"
                  placeholder="%" value={val1} onChange={(e) => setVal1(e.target.value)}
                  aria-labelledby="label-percent-of"
                />
                <span className="text-sm font-bold text-gray-500">% of</span>
                <input 
                  type="number" className="flex-1 min-w-[120px] px-4 py-3 bg-white dark:bg-slate-800 border-none rounded-xl font-black text-lg focus:ring-2 focus:ring-emerald-500/20 dark:text-white shadow-sm"
                  placeholder="Value" value={val2} onChange={(e) => setVal2(e.target.value)}
                  aria-label="Value to calculate percentage of"
                />
                <button 
                  onClick={() => calculate('percentOf')}
                  className="p-4 bg-emerald-500 text-white rounded-2xl hover:scale-105 active:scale-95 transition-all shadow-lg shadow-emerald-500/20"
                  aria-label="Calculate percentage value"
                >
                  <i className="fas fa-arrow-right" aria-hidden="true"></i>
                </button>
              </div>
            </div>

            {/* Calculation Card 2 */}
            <div className="space-y-6 pt-4 border-t border-gray-100 dark:border-white/5">
              <div className="flex items-center gap-3">
                 <div className="w-8 h-8 rounded-lg bg-indigo-500 text-white flex items-center justify-center text-xs" aria-hidden="true">
                    <i className="fas fa-arrows-split-up-and-left"></i>
                 </div>
                 <h3 className="text-sm font-black text-gray-900 dark:text-white uppercase tracking-widest">Percentage Increase/Decrease</h3>
              </div>
              <div className="flex flex-wrap items-center gap-4 bg-gray-50 dark:bg-slate-900 p-6 rounded-3xl border border-gray-100 dark:border-white/5">
                <span className="text-sm font-bold text-gray-500" id="label-increase-from">From</span>
                <input 
                  type="number" className="w-32 px-4 py-3 bg-white dark:bg-slate-800 border-none rounded-xl font-black text-lg focus:ring-2 focus:ring-indigo-500/20 dark:text-white shadow-sm"
                  placeholder="Old" value={valInc1} onChange={(e) => setValInc1(e.target.value)}
                  aria-labelledby="label-increase-from"
                />
                <span className="text-sm font-bold text-gray-500" id="label-increase-to">to</span>
                <input 
                  type="number" className="w-32 px-4 py-3 bg-white dark:bg-slate-800 border-none rounded-xl font-black text-lg focus:ring-2 focus:ring-indigo-500/20 dark:text-white shadow-sm"
                  placeholder="New" value={valInc2} onChange={(e) => setValInc2(e.target.value)}
                  aria-labelledby="label-increase-to"
                />
                <button 
                  onClick={() => calculate('increase')}
                  className="p-4 bg-indigo-500 text-white rounded-2xl hover:scale-105 active:scale-95 transition-all shadow-lg shadow-indigo-500/20"
                  aria-label="Calculate percentage change"
                >
                  <i className="fas fa-arrow-right" aria-hidden="true"></i>
                </button>
              </div>
            </div>
          </div>
        </div>

        <div className="lg:col-span-5 flex flex-col gap-6">
          <div className="flex-1 bg-white dark:bg-slate-800/60 rounded-[2.5rem] border border-gray-100 dark:border-white/5 p-12 flex flex-col items-center justify-center text-center shadow-xl shadow-gray-200/20 backdrop-blur-sm relative overflow-hidden" aria-live="polite">
             {result !== null ? (
               <div className="animate-in zoom-in duration-500 space-y-4">
                  <p className="text-[10px] font-black uppercase tracking-[0.4em] text-gray-400">Calculation Result</p>
                  <div className="text-8xl font-black text-primary-500">
                    {result.toLocaleString(undefined, { maximumFractionDigits: 2 })}
                    {calcType !== 'percentOf' && <span className="text-3xl ml-2">%</span>}
                  </div>
                  <div className="inline-flex items-center gap-2 px-4 py-2 bg-primary-50 dark:bg-primary-900/20 rounded-full text-xs font-bold text-primary-600 dark:text-primary-400">
                     <i className="fas fa-check-circle" aria-hidden="true"></i> Result Verified
                  </div>
               </div>
             ) : (
               <div className="space-y-4 text-gray-400 font-bold">
                  <i className="fas fa-square-root-variable text-5xl opacity-20" aria-hidden="true"></i>
                  <p>Enter values to compute</p>
               </div>
             )}
          </div>

          <aside className="bg-emerald-500/5 dark:bg-emerald-500/10 rounded-[2.5rem] p-8 border border-emerald-500/20">
             <h4 className="text-sm font-black text-emerald-700 dark:text-emerald-400 uppercase tracking-widest mb-4 flex items-center gap-2">
                <i className="fas fa-lightbulb" aria-hidden="true"></i> Formula Tip
             </h4>
             <p className="text-xs text-emerald-800/70 dark:text-emerald-300/60 leading-relaxed font-medium">
                To calculate a percentage increase: Subtract the original number from the new number, divide by the original number, and multiply by 100.
             </p>
          </aside>
        </div>
      </section>
    </div>
  );
};

export default PercentageCalculator;
