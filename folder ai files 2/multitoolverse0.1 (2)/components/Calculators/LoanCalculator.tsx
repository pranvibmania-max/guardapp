import React, { useState, useEffect } from 'react';

const LoanCalculator: React.FC = () => {
  const [amount, setAmount] = useState<number>(50000);
  const [rate, setRate] = useState<number>(7.5);
  const [tenure, setTenure] = useState<number>(60); // in months
  const [emi, setEmi] = useState<number>(0);
  const [totalInterest, setTotalInterest] = useState<number>(0);
  const [totalPayment, setTotalPayment] = useState<number>(0);

  useEffect(() => {
    if (amount > 0 && rate > 0 && tenure > 0) {
      const monthlyRate = rate / 12 / 100;
      const emiVal = (amount * monthlyRate * Math.pow(1 + monthlyRate, tenure)) / (Math.pow(1 + monthlyRate, tenure) - 1);
      const totalPay = emiVal * tenure;
      const totalInt = totalPay - amount;

      setEmi(parseFloat(emiVal.toFixed(2)));
      setTotalPayment(parseFloat(totalPay.toFixed(2)));
      setTotalInterest(parseFloat(totalInt.toFixed(2)));
    }
  }, [amount, rate, tenure]);

  return (
    <div className="max-w-5xl mx-auto animate-in fade-in slide-in-from-bottom-8 duration-700">
      <header className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
        <div className="space-y-2">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary-50 dark:bg-primary-900/30 border border-primary-100 dark:border-primary-800 text-[10px] font-black text-primary-600 dark:text-primary-300 uppercase tracking-widest">
            Financial Planning
          </div>
          <h1 id="emi-title" className="text-4xl md:text-5xl font-black text-gray-900 dark:text-white tracking-tight">EMI Calculator</h1>
          <p className="text-gray-500 dark:text-gray-400 max-w-xl">
            Estimate your monthly loan repayments, total interest payable, and final cost of borrowing.
          </p>
        </div>
      </header>

      <section className="grid grid-cols-1 lg:grid-cols-12 gap-10" aria-labelledby="emi-title">
        {/* Input Side */}
        <div className="lg:col-span-7 space-y-8">
          <div className="bg-white dark:bg-slate-800/60 rounded-[2.5rem] p-8 md:p-10 border border-gray-100 dark:border-white/5 shadow-xl shadow-gray-200/20 backdrop-blur-sm">
            
            {/* Amount Slider */}
            <div className="mb-10">
              <div className="flex justify-between items-center mb-6">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-primary-50 dark:bg-primary-900/30 flex items-center justify-center text-primary-500 font-bold" aria-hidden="true">
                    ₹
                  </div>
                  <label htmlFor="loan-amount" className="text-lg font-bold text-gray-800 dark:text-white">Loan Amount</label>
                </div>
                <div className="bg-gray-50 dark:bg-white/5 p-2 rounded-xl border border-gray-100 dark:border-white/5">
                  <input 
                    id="loan-amount"
                    type="number" value={amount}
                    onChange={(e) => setAmount(Number(e.target.value))}
                    className="w-24 text-right bg-transparent border-none font-black text-xl text-primary-500 focus:ring-0"
                    aria-label="Loan amount in rupees"
                  />
                </div>
              </div>
              <input
                id="loan-amount-slider"
                type="range" min="1000" max="1000000" step="1000" value={amount}
                onChange={(e) => setAmount(Number(e.target.value))}
                className="w-full h-3 bg-gray-100 dark:bg-slate-700 rounded-full appearance-none cursor-pointer accent-primary-500"
                aria-labelledby="loan-amount"
              />
            </div>

            {/* Interest Slider */}
            <div className="mb-10">
              <div className="flex justify-between items-center mb-6">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-primary-50 dark:bg-primary-900/30 flex items-center justify-center text-primary-500" aria-hidden="true">
                    <i className="fas fa-percent"></i>
                  </div>
                  <label htmlFor="interest-rate" className="text-lg font-bold text-gray-800 dark:text-white">Interest Rate</label>
                </div>
                <div className="bg-gray-50 dark:bg-white/5 p-2 rounded-xl border border-gray-100 dark:border-white/5">
                  <input 
                    id="interest-rate"
                    type="number" value={rate} step="0.1"
                    onChange={(e) => setRate(Number(e.target.value))}
                    className="w-16 text-right bg-transparent border-none font-black text-xl text-primary-500 focus:ring-0"
                    aria-label="Interest rate percentage"
                  />
                  <span className="text-xs font-black text-gray-400 mr-2" aria-hidden="true">%</span>
                </div>
              </div>
              <input
                id="interest-rate-slider"
                type="range" min="1" max="25" step="0.1" value={rate}
                onChange={(e) => setRate(Number(e.target.value))}
                className="w-full h-3 bg-gray-100 dark:bg-slate-700 rounded-full appearance-none cursor-pointer accent-primary-500"
                aria-labelledby="interest-rate"
              />
            </div>

            {/* Tenure Slider */}
            <div>
              <div className="flex justify-between items-center mb-6">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-primary-50 dark:bg-primary-900/30 flex items-center justify-center text-primary-500" aria-hidden="true">
                    <i className="fas fa-calendar"></i>
                  </div>
                  <label htmlFor="loan-tenure" className="text-lg font-bold text-gray-800 dark:text-white">Loan Tenure</label>
                </div>
                <div className="bg-gray-50 dark:bg-white/5 p-2 rounded-xl border border-gray-100 dark:border-white/5">
                  <input 
                    id="loan-tenure"
                    type="number" value={tenure}
                    onChange={(e) => setTenure(Number(e.target.value))}
                    className="w-16 text-right bg-transparent border-none font-black text-xl text-primary-500 focus:ring-0"
                    aria-label="Loan tenure in months"
                  />
                  <span className="text-xs font-black text-gray-400 mr-2" aria-hidden="true">mo</span>
                </div>
              </div>
              <input
                id="loan-tenure-slider"
                type="range" min="3" max="360" step="1" value={tenure}
                onChange={(e) => setTenure(Number(e.target.value))}
                className="w-full h-3 bg-gray-100 dark:bg-slate-700 rounded-full appearance-none cursor-pointer accent-primary-500"
                aria-labelledby="loan-tenure"
              />
            </div>
          </div>
        </div>

        {/* Results Side */}
        <div className="lg:col-span-5 space-y-6">
          <div className="bg-primary-500 rounded-[2.5rem] p-10 text-white shadow-2xl shadow-primary-500/20 relative overflow-hidden group" aria-live="polite">
            <div className="relative z-10 space-y-8">
              <div>
                <p className="text-[10px] font-black uppercase tracking-[0.3em] opacity-70 mb-4">Your Monthly EMI</p>
                <div className="text-7xl font-black tracking-tight">₹ {emi.toLocaleString()}</div>
              </div>

              <div className="grid grid-cols-2 gap-6 pt-8 border-t border-white/20">
                <div className="space-y-1">
                  <p className="text-[9px] font-black uppercase tracking-widest opacity-60">Total Interest</p>
                  <p className="text-xl font-bold">₹ {totalInterest.toLocaleString()}</p>
                </div>
                <div className="space-y-1">
                  <p className="text-[9px] font-black uppercase tracking-widest opacity-60">Total Payable</p>
                  <p className="text-xl font-bold">₹ {totalPayment.toLocaleString()}</p>
                </div>
              </div>
            </div>
          </div>

          <div className="bg-white dark:bg-slate-800/60 rounded-[2.5rem] border border-gray-100 dark:border-white/5 p-8 backdrop-blur-sm">
             <h4 className="text-sm font-black text-gray-900 dark:text-white uppercase tracking-widest mb-6 flex items-center gap-2">
                <i className="fas fa-circle-nodes text-primary-500" aria-hidden="true"></i> Amortization Overview
             </h4>
             <div className="space-y-4">
                <div className="flex justify-between items-center text-sm font-medium">
                   <span className="text-gray-500">Principal Amount</span>
                   <span className="text-gray-900 dark:text-white font-bold">{totalPayment > 0 ? ((amount / totalPayment) * 100).toFixed(0) : 0}%</span>
                </div>
                <div className="h-2 w-full bg-gray-100 dark:bg-slate-700 rounded-full flex overflow-hidden" role="progressbar" aria-valuenow={totalPayment > 0 ? (amount / totalPayment) * 100 : 0} aria-valuemin={0} aria-valuemax={100} aria-label="Principal vs Interest distribution">
                   <div className="h-full bg-primary-500" style={{ width: `${totalPayment > 0 ? (amount / totalPayment) * 100 : 0}%` }}></div>
                   <div className="h-full bg-secondary" style={{ width: `${totalPayment > 0 ? (totalInterest / totalPayment) * 100 : 0}%` }}></div>
                </div>
                <div className="flex gap-4 text-[10px] font-black uppercase tracking-widest">
                   <div className="flex items-center gap-2"><div className="w-2 h-2 rounded-full bg-primary-500" aria-hidden="true"></div> Principal</div>
                   <div className="flex items-center gap-2"><div className="w-2 h-2 rounded-full bg-secondary" aria-hidden="true"></div> Interest</div>
                </div>
             </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default LoanCalculator;