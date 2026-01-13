
import React, { useState, useEffect } from 'react';

const CurrencyConverter: React.FC = () => {
  const [amount, setAmount] = useState<number>(1);
  const [fromCurrency, setFromCurrency] = useState<string>('USD');
  const [toCurrency, setToCurrency] = useState<string>('EUR');
  const [rates, setRates] = useState<Record<string, number>>({});
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [lastUpdated, setLastUpdated] = useState<string>('');

  const fetchRates = async (base: string) => {
    try {
      setLoading(true);
      const response = await fetch(`https://open.er-api.com/v6/latest/${base}`);
      const data = await response.json();
      if (data.result === 'success') {
        setRates(data.rates);
        setLastUpdated(new Date(data.time_last_update_utc).toLocaleString());
        setError(null);
      } else {
        setError('Failed to fetch exchange rates.');
      }
    } catch (err) {
      setError('Error connecting to currency service.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchRates(fromCurrency);
  }, [fromCurrency]);

  const convertedAmount = rates[toCurrency] ? (amount * rates[toCurrency]).toFixed(2) : '0.00';

  const swapCurrencies = () => {
    const temp = fromCurrency;
    setFromCurrency(toCurrency);
    setToCurrency(temp);
  };

  const commonCurrencies = ['USD', 'EUR', 'GBP', 'JPY', 'CAD', 'AUD', 'CHF', 'CNY', 'INR', 'BRL', 'MXN', 'SGD'];

  return (
    <div className="max-w-5xl mx-auto animate-in fade-in slide-in-from-bottom-8 duration-700">
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
        <div className="space-y-2">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary-50 dark:bg-primary-900/30 border border-primary-100 dark:border-primary-800 text-[10px] font-black text-primary-600 dark:text-primary-300 uppercase tracking-widest">
            Finance & Markets
          </div>
          <h1 className="text-4xl md:text-5xl font-black text-gray-900 dark:text-white tracking-tight">Currency Converter</h1>
          <p className="text-gray-500 dark:text-gray-400 max-w-xl">
            Real-time global exchange rates. Convert between {Object.keys(rates).length}+ currencies instantly.
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
        <div className="lg:col-span-7">
          <div className="bg-white dark:bg-slate-800/60 rounded-[2.5rem] p-8 md:p-10 border border-gray-100 dark:border-white/5 shadow-xl shadow-gray-200/20 dark:shadow-none backdrop-blur-sm space-y-8">
            
            {/* Amount Input */}
            <div className="space-y-4">
              <label className="text-sm font-bold text-gray-400 uppercase tracking-widest px-2">Amount to Convert</label>
              <div className="flex items-center gap-4 bg-gray-50 dark:bg-slate-900 p-4 rounded-3xl border border-gray-100 dark:border-white/5 shadow-inner">
                <div className="w-12 h-12 rounded-2xl bg-primary-500 text-white flex items-center justify-center text-xl font-bold">
                  {fromCurrency.substring(0, 1)}
                </div>
                <input 
                  type="number" 
                  value={amount}
                  onChange={(e) => setAmount(Number(e.target.value))}
                  className="flex-1 bg-transparent border-none font-black text-3xl text-gray-900 dark:text-white focus:ring-0"
                  placeholder="0.00"
                />
                <span className="text-xl font-bold text-gray-400 mr-4">{fromCurrency}</span>
              </div>
            </div>

            {/* From/To Selection */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 relative">
              <div className="space-y-3">
                <label className="text-xs font-bold text-gray-400 uppercase tracking-widest px-2">From</label>
                <select 
                  value={fromCurrency}
                  onChange={(e) => setFromCurrency(e.target.value)}
                  className="w-full p-4 bg-gray-50 dark:bg-slate-900 border border-gray-100 dark:border-white/5 rounded-2xl font-bold dark:text-white focus:ring-2 focus:ring-primary-500/20"
                >
                  {Object.keys(rates).length > 0 ? (
                    Object.keys(rates).sort().map(curr => (
                      <option key={curr} value={curr}>{curr}</option>
                    ))
                  ) : (
                    <option>{fromCurrency}</option>
                  )}
                </select>
              </div>

              {/* Swap Button Desktop */}
              <button 
                onClick={swapCurrencies}
                className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 z-10 w-12 h-12 bg-white dark:bg-slate-800 shadow-xl border border-gray-100 dark:border-white/10 rounded-full flex items-center justify-center text-primary-500 hover:rotate-180 transition-transform duration-500 hidden md:flex"
              >
                <i className="fas fa-right-left"></i>
              </button>

              <div className="space-y-3">
                <label className="text-xs font-bold text-gray-400 uppercase tracking-widest px-2">To</label>
                <select 
                  value={toCurrency}
                  onChange={(e) => setToCurrency(e.target.value)}
                  className="w-full p-4 bg-gray-50 dark:bg-slate-900 border border-gray-100 dark:border-white/5 rounded-2xl font-bold dark:text-white focus:ring-2 focus:ring-primary-500/20"
                >
                  {Object.keys(rates).length > 0 ? (
                    Object.keys(rates).sort().map(curr => (
                      <option key={curr} value={curr}>{curr}</option>
                    ))
                  ) : (
                    <option>{toCurrency}</option>
                  )}
                </select>
              </div>
            </div>

            {/* Quick Select */}
            <div className="space-y-4 pt-4">
               <label className="text-xs font-bold text-gray-400 uppercase tracking-widest px-2">Popular Currencies</label>
               <div className="flex flex-wrap gap-2">
                 {commonCurrencies.map(curr => (
                   <button 
                     key={curr}
                     onClick={() => {
                        if (curr !== fromCurrency) setToCurrency(curr);
                        else setFromCurrency(toCurrency);
                     }}
                     className={`px-4 py-2 rounded-xl text-xs font-bold transition-all ${toCurrency === curr ? 'bg-primary-500 text-white shadow-lg' : 'bg-gray-100 dark:bg-white/5 text-gray-500 hover:bg-gray-200'}`}
                   >
                     {curr}
                   </button>
                 ))}
               </div>
            </div>
          </div>
        </div>

        {/* Results Panel */}
        <div className="lg:col-span-5 space-y-6">
          <div className="bg-primary-500 rounded-[2.5rem] p-10 text-white shadow-2xl shadow-primary-500/20 relative overflow-hidden group">
             {/* Decorative pattern */}
             <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full blur-3xl -mr-16 -mt-16"></div>
             
             <div className="relative z-10 space-y-6">
               <div className="flex justify-between items-center">
                 <span className="text-xs font-black uppercase tracking-[0.2em] opacity-70">Exchange Result</span>
                 {loading && <i className="fas fa-circle-notch fa-spin"></i>}
               </div>

               <div className="space-y-1">
                 <p className="text-sm font-bold opacity-80">{amount} {fromCurrency} =</p>
                 <h2 className="text-6xl font-black break-words">{convertedAmount} <span className="text-2xl opacity-60">{toCurrency}</span></h2>
               </div>

               <div className="pt-6 border-t border-white/20">
                 <div className="flex justify-between items-center text-xs">
                    <span className="opacity-70">1 {fromCurrency} = {rates[toCurrency]?.toFixed(4)} {toCurrency}</span>
                    <span className="opacity-70 text-[10px]">Updated: {lastUpdated || 'Loading...'}</span>
                 </div>
               </div>
             </div>
          </div>

          <div className="bg-white dark:bg-slate-800/60 rounded-[2.5rem] border border-gray-100 dark:border-white/5 p-8 backdrop-blur-sm">
             <h4 className="text-sm font-black text-gray-900 dark:text-white uppercase tracking-widest mb-6 flex items-center gap-2">
                <i className="fas fa-circle-info text-primary-500"></i> Converter Info
             </h4>
             {error ? (
               <div className="p-4 bg-red-500/10 border border-red-500/20 rounded-2xl text-red-500 text-xs font-bold flex items-center gap-3">
                 <i className="fas fa-triangle-exclamation"></i>
                 {error}
               </div>
             ) : (
               <ul className="space-y-4">
                 <li className="flex items-start gap-3">
                    <div className="w-5 h-5 rounded-full bg-green-500/10 text-green-500 flex items-center justify-center mt-0.5">
                      <i className="fas fa-check text-[10px]"></i>
                    </div>
                    <p className="text-xs text-gray-500 dark:text-gray-400 leading-relaxed">Rates are updated every 24 hours based on mid-market data.</p>
                 </li>
                 <li className="flex items-start gap-3">
                    <div className="w-5 h-5 rounded-full bg-green-500/10 text-green-500 flex items-center justify-center mt-0.5">
                      <i className="fas fa-check text-[10px]"></i>
                    </div>
                    <p className="text-xs text-gray-500 dark:text-gray-400 leading-relaxed">Supporting major world currencies and cryptocurrencies.</p>
                 </li>
                 <li className="flex items-start gap-3">
                    <div className="w-5 h-5 rounded-full bg-green-500/10 text-green-500 flex items-center justify-center mt-0.5">
                      <i className="fas fa-check text-[10px]"></i>
                    </div>
                    <p className="text-xs text-gray-500 dark:text-gray-400 leading-relaxed">Powered by open exchange rate data APIs.</p>
                 </li>
               </ul>
             )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default CurrencyConverter;
