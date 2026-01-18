
import React, { useState } from 'react';

const Base64Tool: React.FC = () => {
  const [input, setInput] = useState('');
  const [output, setOutput] = useState('');
  const [error, setError] = useState('');
  const [mode, setMode] = useState<'encode' | 'decode'>('encode');

  const handleProcess = (targetMode: 'encode' | 'decode') => {
    setMode(targetMode);
    try {
      if (targetMode === 'encode') {
        setOutput(btoa(input));
      } else {
        setOutput(atob(input));
      }
      setError('');
    } catch (e) {
      setError(targetMode === 'encode' ? 'Invalid characters for encoding.' : 'Input is not a valid Base64 string.');
      setOutput('');
    }
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(output);
  };

  return (
    <div className="max-w-5xl mx-auto animate-in fade-in slide-in-from-bottom-8 duration-700">
      <header className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
        <div className="space-y-2">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-slate-900 text-white dark:bg-white dark:text-slate-900 text-[10px] font-black uppercase tracking-widest">
            Dev Utility
          </div>
          <h1 id="base64-title" className="text-4xl md:text-5xl font-black text-gray-900 dark:text-white tracking-tight">Base64 Encode/Decode</h1>
          <p className="text-gray-500 dark:text-gray-400 max-w-xl">
            Binary-to-text encoding for data integrity. Safely convert data for URLs, JSON, or cookie storage.
          </p>
        </div>
      </header>

      <section className="grid grid-cols-1 lg:grid-cols-2 gap-8" aria-labelledby="base64-title">
        {/* Input Card */}
        <div className="bg-white dark:bg-slate-800/60 rounded-[2.5rem] p-8 border border-gray-100 dark:border-white/5 shadow-xl shadow-gray-200/20 backdrop-blur-sm space-y-6">
          <div className="flex justify-between items-center">
             <label htmlFor="base64-input" className="text-xs font-black text-gray-400 uppercase tracking-widest px-2">Source Input</label>
             <button onClick={() => setInput('')} className="text-[10px] font-bold text-primary-500 uppercase hover:underline">Clear</button>
          </div>
          <textarea
            id="base64-input"
            rows={10}
            className="w-full p-6 bg-gray-50 dark:bg-slate-900 border border-gray-100 dark:border-white/5 rounded-3xl focus:outline-none focus:ring-4 focus:ring-primary-500/10 dark:text-white font-mono text-sm leading-relaxed"
            placeholder="Paste text or base64 here..."
            value={input}
            onChange={(e) => setInput(e.target.value)}
          />
          <div className="flex gap-4">
             <button 
               onClick={() => handleProcess('encode')}
               className="flex-1 py-4 bg-slate-900 dark:bg-white text-white dark:text-slate-900 rounded-2xl font-black text-sm hover:opacity-90 transition-all shadow-lg"
             >
               Encode
             </button>
             <button 
               onClick={() => handleProcess('decode')}
               className="flex-1 py-4 bg-primary-500 text-white rounded-2xl font-black text-sm hover:opacity-90 transition-all shadow-lg shadow-primary-500/20"
             >
               Decode
             </button>
          </div>
        </div>

        {/* Output Card */}
        <div className="bg-white dark:bg-slate-800/60 rounded-[2.5rem] p-8 border border-gray-100 dark:border-white/5 shadow-xl shadow-gray-200/20 backdrop-blur-sm space-y-6 flex flex-col">
          <div className="flex justify-between items-center">
             <label htmlFor="base64-output" className="text-xs font-black text-gray-400 uppercase tracking-widest px-2">Processed Result</label>
             {output && (
               <button 
                 onClick={handleCopy}
                 className="flex items-center gap-2 px-3 py-1 bg-emerald-500/10 text-emerald-500 rounded-lg text-[10px] font-black uppercase tracking-widest transition-all hover:bg-emerald-500 hover:text-white focus:ring-2 focus:ring-emerald-500/50"
               >
                 <i className="fas fa-copy" aria-hidden="true"></i> Copy Result
               </button>
             )}
          </div>
          
          <div className="flex-1 relative" aria-live="polite">
            {error ? (
              <div className="absolute inset-0 flex flex-col items-center justify-center p-8 text-center space-y-4 bg-red-500/5 rounded-3xl border border-dashed border-red-500/20">
                <i className="fas fa-circle-exclamation text-4xl text-red-500" aria-hidden="true"></i>
                <p className="text-sm font-bold text-red-600">{error}</p>
              </div>
            ) : (
              <textarea
                id="base64-output"
                readOnly
                rows={10}
                className="w-full h-full p-6 bg-gray-50 dark:bg-slate-900 border border-gray-100 dark:border-white/5 rounded-3xl font-mono text-sm leading-relaxed dark:text-primary-400 cursor-default"
                value={output}
                placeholder="Result will appear here..."
                aria-readonly="true"
              />
            )}
          </div>

          <footer className="pt-4 flex items-center justify-between">
             <div className="flex items-center gap-2">
                <div className={`w-2 h-2 rounded-full ${mode === 'encode' ? 'bg-primary-500' : 'bg-secondary'}`} aria-hidden="true"></div>
                <span className="text-[10px] font-black uppercase tracking-widest text-gray-400">{mode} Mode</span>
             </div>
             <span className="text-[10px] font-bold text-gray-400 uppercase">{output.length} Characters</span>
          </footer>
        </div>
      </section>
    </div>
  );
};

export default Base64Tool;
