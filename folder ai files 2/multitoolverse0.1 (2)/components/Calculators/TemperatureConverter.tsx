
import React, { useState, useEffect } from 'react';

const TemperatureConverter: React.FC = () => {
  const [val, setVal] = useState<number>(0);
  const [fromUnit, setFromUnit] = useState<string>('C');
  const [toUnit, setToUnit] = useState<string>('F');
  const [result, setResult] = useState<number>(32);

  useEffect(() => {
    let celsius = 0;
    // Normalize to Celsius
    if (fromUnit === 'C') celsius = val;
    else if (fromUnit === 'F') celsius = (val - 32) * 5 / 9;
    else if (fromUnit === 'K') celsius = val - 273.15;

    // Convert from Celsius to Target
    let final = 0;
    if (toUnit === 'C') final = celsius;
    else if (toUnit === 'F') final = (celsius * 9 / 5) + 32;
    else if (toUnit === 'K') final = celsius + 273.15;

    setResult(parseFloat(final.toFixed(2)));
  }, [val, fromUnit, toUnit]);

  const units = [
    { id: 'C', name: 'Celsius', icon: 'fa-c' },
    { id: 'F', name: 'Fahrenheit', icon: 'fa-f' },
    { id: 'K', name: 'Kelvin', icon: 'fa-k' }
  ];

  return (
    <div className="max-w-5xl mx-auto animate-in fade-in slide-in-from-bottom-8 duration-700">
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
        <div className="space-y-2">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-50 dark:bg-amber-900/30 border border-amber-100 dark:border-amber-800 text-[10px] font-black text-amber-600 dark:text-amber-300 uppercase tracking-widest">
            Universal Converter
          </div>
          <h1 className="text-4xl md:text-5xl font-black text-gray-900 dark:text-white tracking-tight">Temperature Converter</h1>
          <p className="text-gray-500 dark:text-gray-400 max-w-xl">
            Quickly translate between temperature scales. Essential for science, weather, and travel.
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
        <div className="lg:col-span-7">
          <div className="bg-white dark:bg-slate-800/60 rounded-[2.5rem] p-10 border border-gray-100 dark:border-white/5 shadow-xl shadow-gray-200/20 backdrop-blur-sm space-y-12">
            
            <div className="space-y-4">
               <label className="text-xs font-black text-gray-400 uppercase tracking-widest px-2">Input Reading</label>
               <div className="flex items-center gap-4 bg-gray-50 dark:bg-slate-900 p-6 rounded-3xl border border-gray-100 dark:border-white/5 shadow-inner">
                  <input 
                    type="number" value={val}
                    onChange={(e) => setVal(Number(e.target.value))}
                    className="flex-1 bg-transparent border-none font-black text-5xl text-gray-900 dark:text-white focus:ring-0"
                  />
                  <div className="flex flex-col items-end">
                    <span className="text-2xl font-black text-amber-500">°{fromUnit}</span>
                    <span className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">{units.find(u => u.id === fromUnit)?.name}</span>
                  </div>
               </div>
            </div>

            <div className="grid grid-cols-2 gap-8">
              <div className="space-y-3">
                <label className="text-xs font-black text-gray-400 uppercase tracking-widest px-2">From Scale</label>
                <div className="flex flex-wrap gap-2">
                  {units.map(u => (
                    <button 
                      key={u.id}
                      onClick={() => setFromUnit(u.id)}
                      className={`flex-1 p-4 rounded-2xl font-bold transition-all border ${fromUnit === u.id ? 'bg-amber-500 text-white border-amber-500 shadow-lg shadow-amber-500/20' : 'bg-gray-50 dark:bg-slate-900 text-gray-500 border-transparent hover:border-gray-200'}`}
                    >
                      {u.id}
                    </button>
                  ))}
                </div>
              </div>
              <div className="space-y-3">
                <label className="text-xs font-black text-gray-400 uppercase tracking-widest px-2">To Scale</label>
                <div className="flex flex-wrap gap-2">
                  {units.map(u => (
                    <button 
                      key={u.id}
                      onClick={() => setToUnit(u.id)}
                      className={`flex-1 p-4 rounded-2xl font-bold transition-all border ${toUnit === u.id ? 'bg-amber-500 text-white border-amber-500 shadow-lg shadow-amber-500/20' : 'bg-gray-50 dark:bg-slate-900 text-gray-500 border-transparent hover:border-gray-200'}`}
                    >
                      {u.id}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="lg:col-span-5 flex flex-col gap-6">
          <div className="flex-1 bg-gradient-to-br from-amber-500 to-orange-600 rounded-[2.5rem] p-12 text-white shadow-2xl shadow-amber-500/20 flex flex-col items-center justify-center text-center relative overflow-hidden group">
             <div className="absolute top-0 right-0 p-8 opacity-10">
                <i className="fas fa-temperature-full text-9xl rotate-12 group-hover:rotate-0 transition-transform duration-700"></i>
             </div>
             <div className="relative z-10 space-y-4">
                <p className="text-[10px] font-black uppercase tracking-[0.4em] opacity-70">Resulting Temp</p>
                <div className="text-8xl font-black drop-shadow-md">
                   {result}<span className="text-4xl opacity-60 ml-2">°{toUnit}</span>
                </div>
                <p className="text-sm font-bold opacity-80">{units.find(u => u.id === toUnit)?.name} scale</p>
             </div>
          </div>

          <div className="bg-white dark:bg-slate-800/60 rounded-[2.5rem] border border-gray-100 dark:border-white/5 p-8 backdrop-blur-sm">
             <h4 className="text-sm font-black text-gray-900 dark:text-white uppercase tracking-widest mb-6 flex items-center gap-2">
                <i className="fas fa-flask text-amber-500"></i> Scientific Markers
             </h4>
             <div className="space-y-4">
                {[
                  { label: 'Absolute Zero', temp: '0 K', desc: 'Minimal energy point' },
                  { label: 'Water Freezing', temp: '0°C / 32°F', desc: 'Ice point' },
                  { label: 'Room Temp', temp: '20°C / 68°F', desc: 'Standard ambient' },
                  { label: 'Water Boiling', temp: '100°C / 212°F', desc: 'Steam point' },
                ].map(item => (
                  <div key={item.label} className="flex justify-between items-center p-3 rounded-xl bg-gray-50/50 dark:bg-white/5">
                    <div>
                      <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest">{item.label}</p>
                      <p className="text-xs font-bold text-gray-900 dark:text-white">{item.temp}</p>
                    </div>
                    <span className="text-[9px] font-bold text-amber-600/60 dark:text-amber-400/40 uppercase">{item.desc}</span>
                  </div>
                ))}
             </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TemperatureConverter;
