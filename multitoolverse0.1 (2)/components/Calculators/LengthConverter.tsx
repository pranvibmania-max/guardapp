
import React, { useState, useEffect } from 'react';

const units: Record<string, number> = {
  mm: 0.001,
  cm: 0.01,
  m: 1,
  km: 1000,
  in: 0.0254,
  ft: 0.3048,
  yd: 0.9144,
  mi: 1609.344
};

const LengthConverter: React.FC = () => {
  const [val, setVal] = useState<number>(1);
  const [from, setFrom] = useState('m');
  const [to, setTo] = useState('ft');
  const [result, setResult] = useState<number>(3.28084);

  useEffect(() => {
    const inMeters = val * units[from];
    const converted = inMeters / units[to];
    setResult(converted);
  }, [val, from, to]);

  return (
    <div className="max-w-3xl mx-auto animate-in fade-in duration-500">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">Length Converter</h1>
        <p className="text-gray-600 dark:text-gray-400">Convert between metric and imperial length units instantly.</p>
      </div>

      <div className="bg-white dark:bg-slate-800 p-8 rounded-2xl shadow-sm border border-gray-100 dark:border-slate-700">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
          <div className="space-y-4">
            <label className="text-xs font-bold uppercase tracking-widest text-gray-400">From</label>
            <div className="flex gap-2">
              <input 
                type="number" value={val} onChange={(e) => setVal(Number(e.target.value))}
                className="flex-1 px-4 py-3 bg-gray-50 dark:bg-slate-900 border border-gray-200 dark:border-slate-700 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary/50 dark:text-white font-bold"
              />
              <select 
                value={from} onChange={(e) => setFrom(e.target.value)}
                className="w-32 px-4 py-3 bg-gray-50 dark:bg-slate-900 border border-gray-200 dark:border-slate-700 rounded-xl focus:outline-none dark:text-white font-medium"
              >
                {Object.keys(units).map(u => <option key={u} value={u}>{u.toUpperCase()}</option>)}
              </select>
            </div>
          </div>

          <div className="space-y-4">
            <label className="text-xs font-bold uppercase tracking-widest text-gray-400">To</label>
            <div className="flex gap-2">
              <div className="flex-1 px-4 py-3 bg-primary/5 border border-primary/20 rounded-xl font-bold text-primary flex items-center">
                {result.toFixed(4)}
              </div>
              <select 
                value={to} onChange={(e) => setTo(e.target.value)}
                className="w-32 px-4 py-3 bg-gray-50 dark:bg-slate-900 border border-gray-200 dark:border-slate-700 rounded-xl focus:outline-none dark:text-white font-medium"
              >
                {Object.keys(units).map(u => <option key={u} value={u}>{u.toUpperCase()}</option>)}
              </select>
            </div>
          </div>
        </div>

        <button 
          onClick={() => { const temp = from; setFrom(to); setTo(temp); }}
          className="mt-8 mx-auto flex items-center gap-2 px-6 py-2 bg-gray-100 dark:bg-slate-700 text-gray-600 dark:text-gray-300 rounded-full hover:bg-primary hover:text-white transition-all text-sm font-bold"
        >
          <i className="fas fa-arrows-rotate"></i> Swap Units
        </button>
      </div>
    </div>
  );
};

export default LengthConverter;
