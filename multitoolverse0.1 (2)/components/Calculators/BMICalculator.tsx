import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import AdSlot from '../Common/AdSlot.tsx';

const BMICalculator: React.FC = () => {
  const location = useLocation();
  
  // State for metrics
  const [weight, setWeight] = useState<number>(70);
  const [height, setHeight] = useState<number>(170);
  const [bmi, setBmi] = useState<number | null>(null);
  const [category, setCategory] = useState<string>('');
  const [colorClass, setColorClass] = useState<string>('from-green-500 to-emerald-600');
  const [textColor, setTextColor] = useState<string>('text-green-500');
  
  // Feedback and Animation state
  const [showToast, setShowToast] = useState(false);
  const [isAnimating, setIsAnimating] = useState(false);

  // Initial load from URL parameters
  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const w = params.get('w');
    const h = params.get('h');
    
    if (w) {
      const parsedW = parseFloat(w);
      if (!isNaN(parsedW) && parsedW >= 20 && parsedW <= 200) setWeight(parsedW);
    }
    if (h) {
      const parsedH = parseFloat(h);
      if (!isNaN(parsedH) && parsedH >= 100 && parsedH <= 250) setHeight(parsedH);
    }
  }, [location]);

  useEffect(() => {
    if (weight > 0 && height > 0) {
      const heightInMeters = height / 100;
      const score = weight / (heightInMeters * heightInMeters);
      const roundedBmi = parseFloat(score.toFixed(1));
      
      // Trigger subtle grow/shrink animation if BMI value changed
      if (roundedBmi !== bmi) {
        setIsAnimating(true);
        const timer = setTimeout(() => setIsAnimating(false), 450);
        setBmi(roundedBmi);
        return () => clearTimeout(timer);
      }

      if (score < 18.5) {
        setCategory('Underweight');
        setColorClass('from-blue-500 to-cyan-600');
        setTextColor('text-blue-500');
      } else if (score >= 18.5 && score < 25) {
        setCategory('Healthy Weight');
        setColorClass('from-green-500 to-emerald-600');
        setTextColor('text-green-500');
      } else if (score >= 25 && score < 30) {
        setCategory('Overweight');
        setColorClass('from-amber-400 to-orange-500');
        setTextColor('text-amber-500');
      } else {
        setCategory('Obese');
        setColorClass('from-red-500 to-rose-600');
        setTextColor('text-red-500');
      }
    } else {
      setBmi(null);
    }
  }, [weight, height, bmi]);

  const handleReset = () => {
    setWeight(70);
    setHeight(170);
  };

  const handleShare = async () => {
    const baseUrl = window.location.origin + window.location.pathname;
    const shareUrl = `${baseUrl}#/health/bmi?w=${weight}&h=${height}`;

    if (navigator.share) {
      try {
        await navigator.share({
          title: 'My BMI Result - ToolVerse',
          text: `My BMI is ${bmi} (${category}). Check yours at ToolVerse!`,
          url: shareUrl,
        });
      } catch (err) {
        console.error('Error sharing:', err);
      }
    } else {
      try {
        await navigator.clipboard.writeText(shareUrl);
        setShowToast(true);
        setTimeout(() => setShowToast(false), 3000);
      } catch (err) {
        console.error('Failed to copy link:', err);
      }
    }
  };

  return (
    <div className="max-w-5xl mx-auto animate-in fade-in slide-in-from-bottom-8 duration-700">
      <header className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12 relative">
        <div className="space-y-2">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary-50 dark:bg-primary-900/30 border border-primary-100 dark:border-primary-800 text-[10px] font-black text-primary-600 dark:text-primary-300 uppercase tracking-widest">
            Health & Fitness
          </div>
          <h1 id="bmi-title" className="text-4xl md:text-5xl font-black text-gray-900 dark:text-white tracking-tight">BMI Calculator</h1>
          <p className="text-gray-500 dark:text-gray-400 max-w-xl">
            Quickly assess your body weight relative to your height to help determine if you are in a healthy range.
          </p>
        </div>
        
        <div className="flex items-center gap-4 relative">
           {showToast && (
             <div className="absolute bottom-full right-0 mb-4 px-4 py-2 bg-slate-900 text-white text-[10px] font-bold rounded-xl shadow-xl animate-in fade-in slide-in-from-bottom-2 duration-300 z-50">
               <i className="fas fa-check-circle text-secondary mr-2"></i> Link copied to clipboard!
             </div>
           )}

           <button 
             onClick={handleReset}
             aria-label="Reset calculator to defaults" 
             className="p-3 rounded-2xl bg-white dark:bg-slate-800 shadow-sm border border-gray-100 dark:border-white/10 text-gray-500 dark:text-gray-400 hover:text-red-500 transition-all active:scale-95 group relative focus:ring-2 focus:ring-red-500 outline-none"
           >
              <i className="fas fa-rotate-left" aria-hidden="true"></i>
              <span className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 px-2 py-1 bg-gray-900 text-white text-[10px] rounded opacity-0 group-hover:opacity-100 group-focus:opacity-100 pointer-events-none transition-opacity whitespace-nowrap z-20">Reset Defaults</span>
           </button>
           
           <button 
             onClick={handleShare}
             aria-label="Share this calculation" 
             className="p-3 rounded-2xl bg-white dark:bg-slate-800 shadow-sm border border-gray-100 dark:border-white/10 text-gray-500 dark:text-gray-400 hover:text-primary-500 hover:border-primary-500/30 transition-all active:scale-95 focus:ring-2 focus:ring-primary-500 outline-none"
           >
              <i className="fas fa-share-nodes" aria-hidden="true"></i>
           </button>
        </div>
      </header>

      {/* Top Banner Ad Placement */}
      <AdSlot type="horizontal" className="mb-10" />

      <section className="grid grid-cols-1 lg:grid-cols-12 gap-10" aria-labelledby="bmi-title">
        {/* Input Controls */}
        <div className="lg:col-span-7 space-y-8">
          <div className="bg-white/80 dark:bg-slate-800/60 rounded-[2.5rem] p-8 md:p-10 border border-gray-100 dark:border-white/10 shadow-xl dark:shadow-none backdrop-blur-sm relative">
            
            <div className="mb-12">
              <div className="flex justify-between items-center mb-6">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-primary-50 dark:bg-slate-900 text-primary-500 flex items-center justify-center">
                    <i className="fas fa-weight-scale" aria-hidden="true"></i>
                  </div>
                  <label htmlFor="weight-input" className="text-lg font-bold text-gray-800 dark:text-white">Weight</label>
                </div>
                <div className="flex items-center gap-2 bg-gray-50 dark:bg-slate-900/80 p-2 rounded-xl border border-gray-100 dark:border-white/10">
                  <input 
                    id="weight-input"
                    type="number" 
                    value={weight}
                    onChange={(e) => setWeight(Math.min(200, Math.max(0, Number(e.target.value))))}
                    className="w-16 text-right bg-transparent border-none font-black text-xl text-primary-500 focus:ring-0"
                    min="20"
                    max="200"
                  />
                  <span className="text-xs font-black text-gray-400 dark:text-gray-500 uppercase mr-2">kg</span>
                </div>
              </div>
              <input
                id="weight-slider"
                type="range" min="20" max="200" step="1" value={weight}
                onChange={(e) => setWeight(Number(e.target.value))}
                className="w-full h-3 bg-gray-100 dark:bg-slate-700 rounded-full appearance-none cursor-pointer accent-primary-500"
              />
            </div>

            <div className="mb-12">
              <div className="flex justify-between items-center mb-6">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-primary-50 dark:bg-slate-900 text-primary-500 flex items-center justify-center">
                    <i className="fas fa-ruler-vertical" aria-hidden="true"></i>
                  </div>
                  <label htmlFor="height-input" className="text-lg font-bold text-gray-800 dark:text-white">Height</label>
                </div>
                <div className="flex items-center gap-2 bg-gray-50 dark:bg-slate-900/80 p-2 rounded-xl border border-gray-100 dark:border-white/10">
                  <input 
                    id="height-input"
                    type="number" 
                    value={height}
                    onChange={(e) => setHeight(Math.min(250, Math.max(0, Number(e.target.value))))}
                    className="w-16 text-right bg-transparent border-none font-black text-xl text-primary-500 focus:ring-0"
                    min="100"
                    max="250"
                  />
                  <span className="text-xs font-black text-gray-400 dark:text-gray-500 uppercase mr-2">cm</span>
                </div>
              </div>
              <input
                id="height-slider"
                type="range" min="100" max="250" step="1" value={height}
                onChange={(e) => setHeight(Number(e.target.value))}
                className="w-full h-3 bg-gray-100 dark:bg-slate-700 rounded-full appearance-none cursor-pointer accent-primary-500"
              />
            </div>

            {/* In-Card Reset Button */}
            <div className="flex justify-center pt-4">
              <button 
                onClick={handleReset}
                className="flex items-center gap-2 px-6 py-2.5 bg-gray-100 dark:bg-slate-900 text-gray-500 dark:text-gray-400 rounded-xl text-xs font-black uppercase tracking-widest hover:bg-red-50 dark:hover:bg-red-500/10 hover:text-red-500 transition-all active:scale-95 border border-transparent hover:border-red-200 dark:hover:border-red-500/20 shadow-sm"
              >
                <i className="fas fa-rotate-left"></i>
                Reset to Default
              </button>
            </div>
          </div>

          <article className="bg-gradient-to-br from-gray-900 to-slate-950 rounded-[2.5rem] p-8 text-white relative overflow-hidden group shadow-lg">
            <h3 className="text-xl font-black mb-4 flex items-center gap-2 relative z-10">
              <i className="fas fa-circle-check text-secondary" aria-hidden="true"></i> Health Tip
            </h3>
            <p className="text-gray-300 text-sm leading-relaxed relative z-10 max-w-lg">
              BMI provides a useful estimate, but remember it doesn't account for muscle mass. Maintaining a balanced diet is the best path to health.
            </p>
          </article>

          {/* Bottom Banner Ad Placement */}
          <AdSlot type="horizontal" className="pt-4" />
        </div>

        {/* Results Panel */}
        <div className="lg:col-span-5 flex flex-col gap-6">
          <div 
            className="flex-1 bg-white/80 dark:bg-slate-800/60 rounded-[2.5rem] border border-gray-100 dark:border-white/10 p-10 flex flex-col items-center justify-center text-center shadow-xl dark:shadow-none relative overflow-hidden backdrop-blur-sm"
          >
            {bmi !== null ? (
              <div className="w-full space-y-8">
                <div>
                  <p className="text-[10px] font-black text-gray-400 dark:text-gray-500 uppercase tracking-[0.3em] mb-4">Your Calculated BMI</p>
                  <div 
                    className={`text-8xl font-black bg-gradient-to-br ${colorClass} bg-clip-text text-transparent drop-shadow-sm ${isAnimating ? 'animate-pop' : ''}`}
                    style={{ transition: 'color 0.5s ease' }}
                  >
                    {bmi}
                  </div>
                </div>

                <div className="space-y-2">
                  <div className={`text-3xl font-black ${textColor} transition-colors duration-500`}>{category}</div>
                </div>

                <div className="w-full pt-8 space-y-4">
                   <div className="h-4 w-full bg-gray-100 dark:bg-slate-900 rounded-full relative overflow-hidden p-1 shadow-inner">
                      <div className="h-full w-full flex rounded-full overflow-hidden">
                        <div className="h-full bg-blue-500" style={{ width: '18.5%' }}></div>
                        <div className="h-full bg-green-500" style={{ width: '25%' }}></div>
                        <div className="h-full bg-amber-500" style={{ width: '25%' }}></div>
                        <div className="h-full bg-red-500" style={{ width: '31.5%' }}></div>
                      </div>
                      <div 
                        className="absolute top-0 bottom-0 w-1 bg-white dark:bg-slate-300 shadow-lg border-x border-gray-400 transition-all duration-700"
                        style={{ left: `${Math.min(Math.max((bmi / 40) * 100, 2), 98)}%` }}
                      ></div>
                   </div>
                </div>
              </div>
            ) : (
              <div className="space-y-4">
                <i className="fas fa-calculator text-3xl text-gray-300" aria-hidden="true"></i>
                <p className="text-gray-400 dark:text-gray-500 font-bold">Input your metrics to see results</p>
              </div>
            )}
          </div>

          {/* Square Ad Slot in Sidebar */}
          <AdSlot type="square" className="mx-auto" />

          <aside className="bg-white/80 dark:bg-slate-800/60 rounded-[2.5rem] border border-gray-100 dark:border-white/10 p-8 backdrop-blur-sm">
            <h4 className="text-sm font-black text-gray-900 dark:text-white uppercase tracking-widest mb-6 flex items-center gap-2">
              <i className="fas fa-list-ul text-primary-500" aria-hidden="true"></i> Standard Scale
            </h4>
            <div className="space-y-3">
              {[
                { range: '< 18.5', label: 'Underweight', color: 'bg-blue-500' },
                { range: '18.5 – 24.9', label: 'Healthy Weight', color: 'bg-green-500' },
                { range: '25.0 – 29.9', label: 'Overweight', color: 'bg-amber-500' },
                { range: '≥ 30.0', label: 'Obese', color: 'bg-red-500' },
              ].map(item => (
                <div key={item.label} className="flex items-center justify-between p-3 rounded-xl bg-gray-50/50 dark:bg-slate-900/50 border border-transparent hover:border-gray-200 dark:hover:border-white/10 transition-all">
                  <div className="flex items-center gap-3">
                    <div className={`w-2 h-2 rounded-full ${item.color}`} aria-hidden="true"></div>
                    <span className="text-xs font-bold text-gray-600 dark:text-gray-300">{item.label}</span>
                  </div>
                  <span className="text-xs font-black text-gray-800 dark:text-white">{item.range}</span>
                </div>
              ))}
            </div>
          </aside>
        </div>
      </section>
    </div>
  );
};

export default BMICalculator;