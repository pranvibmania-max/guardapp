
import React, { useState, useEffect } from 'react';

type Gender = 'male' | 'female';
type ActivityLevel = 'sedentary' | 'light' | 'moderate' | 'active' | 'extra';

const CalorieCalculator: React.FC = () => {
  const [age, setAge] = useState<number>(25);
  const [gender, setGender] = useState<Gender>('male');
  const [weight, setWeight] = useState<number>(70);
  const [height, setHeight] = useState<number>(170);
  const [activity, setActivity] = useState<ActivityLevel>('moderate');
  
  const [results, setResults] = useState<{
    bmr: number;
    maintenance: number;
    loss: number;
    gain: number;
  } | null>(null);

  useEffect(() => {
    // Mifflin-St Jeor Equation
    let bmr = (10 * weight) + (6.25 * height) - (5 * age);
    if (gender === 'male') {
      bmr += 5;
    } else {
      bmr -= 161;
    }

    const activityMultipliers = {
      sedentary: 1.2,
      light: 1.375,
      moderate: 1.55,
      active: 1.725,
      extra: 1.9
    };

    const maintenance = bmr * activityMultipliers[activity];
    
    setResults({
      bmr: Math.round(bmr),
      maintenance: Math.round(maintenance),
      loss: Math.round(maintenance - 500),
      gain: Math.round(maintenance + 500)
    });
  }, [age, gender, weight, height, activity]);

  const handleReset = () => {
    setAge(25);
    setGender('male');
    setWeight(70);
    setHeight(170);
    setActivity('moderate');
  };

  const activityLevels = [
    { id: 'sedentary', label: 'Sedentary', desc: 'Little or no exercise' },
    { id: 'light', label: 'Lightly Active', desc: '1-3 days/week' },
    { id: 'moderate', label: 'Moderately Active', desc: '3-5 days/week' },
    { id: 'active', label: 'Very Active', desc: '6-7 days/week' },
    { id: 'extra', label: 'Extra Active', desc: 'Physical job / 2x training' }
  ];

  return (
    <div className="max-w-5xl mx-auto animate-in fade-in slide-in-from-bottom-8 duration-700">
      <header className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
        <div className="space-y-2">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-rose-50 dark:bg-rose-900/30 border border-rose-100 dark:border-rose-800 text-[10px] font-black text-rose-600 dark:text-rose-300 uppercase tracking-widest">
            Health & Nutrition
          </div>
          <h1 id="calorie-title" className="text-4xl md:text-5xl font-black text-gray-900 dark:text-white tracking-tight">Calorie Calculator</h1>
          <p className="text-gray-500 dark:text-gray-400 max-w-xl">
            Determine your Total Daily Energy Expenditure (TDEE) and reach your fitness goals.
          </p>
        </div>
        <div className="flex items-center gap-4">
           <button 
             onClick={handleReset}
             aria-label="Reset calculator" 
             className="p-3 rounded-2xl bg-white dark:bg-slate-800 shadow-sm border border-gray-100 dark:border-white/10 text-gray-500 dark:text-gray-400 hover:text-red-500 transition-colors group relative focus:ring-2 focus:ring-red-500 outline-none"
           >
              <i className="fas fa-rotate-left" aria-hidden="true"></i>
              <span className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 px-2 py-1 bg-gray-900 text-white text-[10px] rounded opacity-0 group-hover:opacity-100 pointer-events-none transition-opacity whitespace-nowrap z-20">Reset</span>
           </button>
        </div>
      </header>

      <section className="grid grid-cols-1 lg:grid-cols-12 gap-10" aria-labelledby="calorie-title">
        {/* Input Controls */}
        <div className="lg:col-span-7 space-y-8">
          <div className="bg-white/80 dark:bg-slate-800/60 rounded-[2.5rem] p-8 md:p-10 border border-gray-100 dark:border-white/10 shadow-xl dark:shadow-none backdrop-blur-sm space-y-10">
            
            {/* Gender and Age Row */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
              <div className="space-y-4">
                <label className="text-sm font-bold text-gray-400 uppercase tracking-widest px-2">Gender</label>
                <div className="flex bg-gray-50 dark:bg-slate-900 p-1.5 rounded-2xl border border-gray-100 dark:border-white/5">
                  <button 
                    onClick={() => setGender('male')}
                    className={`flex-1 py-3 rounded-xl text-sm font-bold transition-all flex items-center justify-center gap-2 ${gender === 'male' ? 'bg-white dark:bg-slate-800 text-primary-500 shadow-sm' : 'text-gray-500'}`}
                  >
                    <i className="fas fa-mars"></i> Male
                  </button>
                  <button 
                    onClick={() => setGender('female')}
                    className={`flex-1 py-3 rounded-xl text-sm font-bold transition-all flex items-center justify-center gap-2 ${gender === 'female' ? 'bg-white dark:bg-slate-800 text-rose-500 shadow-sm' : 'text-gray-500'}`}
                  >
                    <i className="fas fa-venus"></i> Female
                  </button>
                </div>
              </div>
              
              <div className="space-y-4">
                <div className="flex justify-between items-center px-2">
                  <label htmlFor="age-input" className="text-sm font-bold text-gray-400 uppercase tracking-widest">Age</label>
                  <span className="text-xl font-black text-primary-500">{age} <span className="text-xs text-gray-400">YRS</span></span>
                </div>
                <input
                  id="age-slider"
                  type="range" min="15" max="80" value={age}
                  onChange={(e) => setAge(Number(e.target.value))}
                  className="w-full h-3 bg-gray-100 dark:bg-slate-700 rounded-full appearance-none cursor-pointer accent-primary-500"
                />
              </div>
            </div>

            {/* Weight and Height sliders */}
            <div className="space-y-10">
              <div className="space-y-4">
                <div className="flex justify-between items-center px-2">
                  <label htmlFor="weight-input" className="text-sm font-bold text-gray-400 uppercase tracking-widest">Weight</label>
                  <span className="text-xl font-black text-primary-500">{weight} <span className="text-xs text-gray-400">KG</span></span>
                </div>
                <input
                  id="weight-slider"
                  type="range" min="30" max="200" value={weight}
                  onChange={(e) => setWeight(Number(e.target.value))}
                  className="w-full h-3 bg-gray-100 dark:bg-slate-700 rounded-full appearance-none cursor-pointer accent-primary-500"
                />
              </div>

              <div className="space-y-4">
                <div className="flex justify-between items-center px-2">
                  <label htmlFor="height-input" className="text-sm font-bold text-gray-400 uppercase tracking-widest">Height</label>
                  <span className="text-xl font-black text-primary-500">{height} <span className="text-xs text-gray-400">CM</span></span>
                </div>
                <input
                  id="height-slider"
                  type="range" min="100" max="250" value={height}
                  onChange={(e) => setHeight(Number(e.target.value))}
                  className="w-full h-3 bg-gray-100 dark:bg-slate-700 rounded-full appearance-none cursor-pointer accent-primary-500"
                />
              </div>
            </div>

            {/* Activity Level Selection */}
            <div className="space-y-6 pt-4">
              <label className="text-sm font-bold text-gray-400 uppercase tracking-widest px-2">Activity Level</label>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {activityLevels.map(level => (
                  <button
                    key={level.id}
                    onClick={() => setActivity(level.id as ActivityLevel)}
                    className={`text-left p-4 rounded-2xl border transition-all ${activity === level.id ? 'bg-primary-500 text-white border-primary-500 shadow-lg' : 'bg-gray-50 dark:bg-slate-900 text-gray-500 border-transparent hover:border-gray-200'}`}
                  >
                    <p className={`text-sm font-black uppercase tracking-tight ${activity === level.id ? 'text-white' : 'text-gray-900 dark:text-white'}`}>{level.label}</p>
                    <p className={`text-[10px] opacity-70 ${activity === level.id ? 'text-white' : ''}`}>{level.desc}</p>
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Results Panel */}
        <div className="lg:col-span-5 flex flex-col gap-6">
          <div className="flex-1 bg-white/80 dark:bg-slate-800/60 rounded-[2.5rem] border border-gray-100 dark:border-white/10 p-10 flex flex-col items-center justify-center text-center shadow-xl dark:shadow-none relative overflow-hidden backdrop-blur-sm" aria-live="polite">
            
            {results && (
              <div className="w-full space-y-10 animate-in zoom-in duration-500">
                <div className="space-y-4">
                  <p className="text-[10px] font-black text-gray-400 dark:text-gray-500 uppercase tracking-[0.3em]">Maintenance Calories</p>
                  <div key={results.maintenance} className="text-7xl font-black bg-gradient-to-br from-rose-500 to-orange-500 bg-clip-text text-transparent drop-shadow-sm animate-pop inline-block">
                    {results.maintenance}
                  </div>
                  <p className="text-sm font-bold text-gray-500 uppercase tracking-widest">Kcal / Day</p>
                </div>

                <div className="grid grid-cols-1 gap-4 pt-6">
                  <div className="p-6 rounded-[1.5rem] bg-emerald-500/10 border border-emerald-500/20 text-emerald-600 dark:text-emerald-400 group hover:scale-[1.02] transition-transform">
                    <p className="text-[10px] font-black uppercase tracking-widest mb-1">Weight Loss (-0.5kg/week)</p>
                    <p className="text-2xl font-black">{results.loss} kcal</p>
                  </div>
                  <div className="p-6 rounded-[1.5rem] bg-amber-500/10 border border-amber-500/20 text-amber-600 dark:text-amber-400 group hover:scale-[1.02] transition-transform">
                    <p className="text-[10px] font-black uppercase tracking-widest mb-1">Weight Gain (+0.5kg/week)</p>
                    <p className="text-2xl font-black">{results.gain} kcal</p>
                  </div>
                  <div className="p-6 rounded-[1.5rem] bg-gray-500/10 border border-gray-500/20 text-gray-600 dark:text-gray-400 group hover:scale-[1.02] transition-transform">
                    <p className="text-[10px] font-black uppercase tracking-widest mb-1">BMR (Basal Metabolic Rate)</p>
                    <p className="text-2xl font-black">{results.bmr} kcal</p>
                  </div>
                </div>
              </div>
            )}
          </div>

          <aside className="bg-slate-900 rounded-[2.5rem] p-8 text-white relative overflow-hidden">
             <div className="absolute top-0 right-0 p-8 opacity-10">
                <i className="fas fa-fire-flame-curved text-7xl rotate-12"></i>
             </div>
             <h4 className="text-sm font-black uppercase tracking-widest mb-4 flex items-center gap-2 relative z-10">
                <i className="fas fa-lightbulb text-primary-400"></i> Nutrition Fact
             </h4>
             <p className="text-xs text-gray-400 leading-relaxed font-medium relative z-10">
                To lose weight, you need to create a calorie deficit. A deficit of 500 calories per day usually leads to roughly 0.5kg of weight loss per week.
             </p>
          </aside>
        </div>
      </section>
    </div>
  );
};

export default CalorieCalculator;
