
import React, { useState, useEffect } from 'react';
import { NavLink } from 'react-router-dom';
import { TOOLS, CATEGORIES } from '../constants.tsx';
import { Category } from '../types.ts';
import AdSlot from './Common/AdSlot.tsx';
import { GoogleGenAI } from "@google/genai";

interface DashboardNewsItem {
  title: string;
  url: string;
  source: string;
}

const Dashboard: React.FC = () => {
  const [indiaNews, setIndiaNews] = useState<DashboardNewsItem[]>([]);
  const [isNewsLoading, setIsNewsLoading] = useState(true);

  // Custom display order to prioritize Health and Math togetherness
  const DISPLAY_ORDER = [
    Category.HEALTH,
    Category.MATH,
    Category.FINANCE,
    Category.CONVERTER,
    Category.DEVELOPER,
    Category.LIFESTYLE
  ];

  useEffect(() => {
    const fetchDashboardNews = async () => {
      try {
        const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
        const response = await ai.models.generateContent({
          model: "gemini-3-flash-preview",
          contents: "List the top 4 most important current news headlines from India for today. Keep titles extremely short and concise. Format as a simple list.",
          config: {
            tools: [{ googleSearch: {} }],
          },
        });

        const groundingChunks = response.candidates?.[0]?.groundingMetadata?.groundingChunks || [];
        const lines = (response.text || "").split('\n').filter(l => l.trim().length > 10).slice(0, 4);
        
        const newsItems = lines.map((line, idx) => {
          const cleanLine = line.replace(/^\d+\.\s*/, '').replace(/^\*\*\s*/, '').replace(/\*\*/g, '').trim();
          const chunk = groundingChunks[idx];
          return {
            title: cleanLine,
            url: chunk?.web?.uri || "https://news.google.co.in",
            source: chunk?.web?.title || "News Update"
          };
        });

        setIndiaNews(newsItems);
      } catch (err) {
        console.error("Dashboard news fetch failed", err);
      } finally {
        setIsNewsLoading(false);
      }
    };

    fetchDashboardNews();
  }, []);

  const renderTrendsCard = () => (
    <div className="group relative bg-white dark:bg-slate-800/40 rounded-[2rem] p-8 border border-gray-100 dark:border-white/10 shadow-sm hover:shadow-2xl hover:shadow-primary-500/10 transition-all duration-500 flex flex-col h-full overflow-hidden backdrop-blur-sm">
      <div className="absolute -right-6 -bottom-6 opacity-[0.03] dark:opacity-[0.04] group-hover:scale-150 transition-transform duration-700 group-hover:opacity-[0.08]">
         <i className="fas fa-bolt-lightning text-9xl text-orange-500"></i>
      </div>

      <div className="flex items-center justify-between mb-6">
        <div className="w-14 h-14 rounded-2xl bg-orange-500 text-white flex items-center justify-center group-hover:rotate-12 transition-all duration-500 shadow-lg shadow-orange-500/20">
          <i className="fas fa-bolt-lightning text-2xl"></i>
        </div>
        <div className="flex items-center gap-1.5 px-2 py-0.5 rounded-full bg-orange-50 dark:bg-orange-950/20 border border-orange-100 dark:border-orange-900/50">
           <span className="flex h-1.5 w-1.5 rounded-full bg-orange-500 animate-pulse"></span>
           <span className="text-[8px] font-black text-orange-600 dark:text-orange-400 uppercase tracking-widest">Live Now</span>
        </div>
      </div>

      <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-4 group-hover:text-primary-500 transition-colors">India Trends</h3>
      
      <div className="space-y-3 flex-1">
        {isNewsLoading ? (
          Array(4).fill(0).map((_, i) => (
            <div key={i} className="space-y-2 animate-pulse">
              <div className="h-1.5 bg-gray-100 dark:bg-white/5 rounded w-full"></div>
              <div className="h-1.5 bg-gray-50 dark:bg-white/5 rounded w-2/3"></div>
            </div>
          ))
        ) : (
          indiaNews.map((item, idx) => (
            <a 
              key={idx} 
              href={item.url} 
              target="_blank" 
              rel="noopener noreferrer"
              className="block group/news border-b border-gray-50 dark:border-white/5 last:border-0 pb-2 mb-2 last:mb-0"
            >
              <p className="text-[10px] font-bold text-gray-600 dark:text-gray-400 line-clamp-1 group-hover/news:text-primary-500 transition-colors">
                {item.title}
              </p>
            </a>
          ))
        )}
      </div>

      <div className="mt-6 flex items-center gap-2">
        <div className="h-1 w-8 bg-orange-500 rounded-full group-hover:w-16 transition-all duration-500"></div>
        <NavLink 
          to="/news/daily" 
          className="text-[10px] font-black uppercase tracking-widest text-orange-500 opacity-0 group-hover:opacity-100 transition-all duration-500"
        >
          View Full Feed
        </NavLink>
      </div>
    </div>
  );

  return (
    <div className="animate-in fade-in duration-1000 pb-12">
      <section className="relative text-left pt-2 pb-6">
        <div className="absolute top-0 left-0 w-64 h-64 bg-primary-500/10 dark:bg-primary-500/5 blur-[100px] -z-10 rounded-full animate-pulse-slow"></div>
        
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary-50 dark:bg-primary-900/20 border border-primary-100 dark:border-primary-800/50 mb-6">
          <span className="relative flex h-2 w-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary-400 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2 w-2 bg-primary-500"></span>
          </span>
          <span className="text-[10px] font-bold text-primary-700 dark:text-primary-300 uppercase tracking-widest">Utility Universe 0.1</span>
        </div>
        
        <h1 className="text-4xl md:text-6xl font-black text-gray-900 dark:text-white tracking-tight mb-4 leading-tight">
          All tools, <span className="text-primary-500 underline decoration-primary-500/30">one place.</span>
        </h1>
        
        <p className="text-lg text-gray-500 dark:text-gray-400 max-w-xl leading-relaxed">
          Experience the fastest utility suite on the web. Private, localized, and always evolving.
        </p>
      </section>

      {/* Tight vertical spacing to keep Math and Health close */}
      <div className="mt-2 space-y-8">
        {DISPLAY_ORDER.map((category, idx) => {
          const categoryTools = TOOLS.filter(t => t.category === category);
          if (categoryTools.length === 0) return null;

          const isLifestyle = category === Category.LIFESTYLE;
          
          return (
            <React.Fragment key={category}>
              <section className="animate-in fade-in slide-in-from-bottom-8 duration-700" style={{ animationDelay: `${(idx + 1) * 100}ms` }}>
                <div className="flex items-center gap-4 mb-5">
                  <h2 className="text-xs font-black text-gray-400 dark:text-gray-500 uppercase tracking-[0.3em] whitespace-nowrap">
                    {category}
                  </h2>
                  <div className="h-px flex-1 bg-gradient-to-r from-gray-200 dark:from-white/10 to-transparent"></div>
                </div>
                
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                  {/* Trends Card alongside Lifestyle/Beauty tools */}
                  {isLifestyle && (
                    <div className="h-full">
                      {renderTrendsCard()}
                    </div>
                  )}
                  
                  {categoryTools.map(tool => (
                    <NavLink 
                      key={tool.id} 
                      to={tool.path}
                      className="group relative bg-white dark:bg-slate-800/40 rounded-[2rem] p-8 border border-gray-100 dark:border-white/10 shadow-sm hover:shadow-2xl hover:shadow-primary-500/10 transition-all duration-500 flex flex-col h-full overflow-hidden backdrop-blur-sm"
                    >
                      <div className="absolute -right-6 -bottom-6 opacity-[0.03] dark:opacity-[0.04] group-hover:scale-150 transition-transform duration-700 group-hover:opacity-[0.08]">
                        <i className={`fas ${tool.icon} text-9xl`}></i>
                      </div>

                      <div className="w-14 h-14 rounded-2xl bg-gray-50 dark:bg-slate-900/50 text-gray-600 dark:text-primary-400 flex items-center justify-center mb-6 group-hover:bg-primary-500 group-hover:text-white group-hover:rotate-6 transition-all duration-500 shadow-inner">
                        <i className={`fas ${tool.icon} text-2xl`}></i>
                      </div>
                      
                      <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-3 group-hover:text-primary-500 transition-colors">{tool.name}</h3>
                      <p className="text-sm text-gray-500 dark:text-gray-400 leading-relaxed flex-1">{tool.description}</p>
                      
                      <div className="mt-8 flex items-center gap-2">
                        <div className="h-1 w-8 bg-primary-500 rounded-full group-hover:w-16 transition-all duration-500"></div>
                        <span className="text-[10px] font-black uppercase tracking-widest text-primary-500 opacity-0 group-hover:opacity-100 transition-all duration-500">Launch Tool</span>
                      </div>
                    </NavLink>
                  ))}
                </div>
              </section>

              {/* Ad Slot placed after Finance (idx 2) so Health and Math stay together */}
              {idx === 2 && (
                <div className="py-6 flex justify-center">
                  <AdSlot type="horizontal" className="w-full" />
                </div>
              )}
            </React.Fragment>
          );
        })}
      </div>

      <section className="relative overflow-hidden bg-slate-900 dark:bg-slate-800/50 rounded-[3rem] p-8 md:p-12 border border-white/10 shadow-3xl backdrop-blur-md mt-20">
        <div className="relative z-10 flex flex-col md:flex-row items-center justify-between gap-12">
          <div className="max-w-md">
            <h2 className="text-2xl md:text-3xl font-black text-white mb-4 leading-tight">
              Speed. Privacy. <span className="text-primary-400">Simplicity.</span>
            </h2>
            <p className="text-gray-400 text-sm leading-relaxed mb-6">
              Designed for the modern web. MultiToolVerse offers high-performance utilities with zero compromise on your data privacy.
            </p>
            <div className="flex gap-4">
              <div className="flex items-center gap-2">
                <i className="fas fa-bolt text-primary-500"></i>
                <span className="text-[10px] font-bold text-white uppercase tracking-widest">Instant</span>
              </div>
              <div className="flex items-center gap-2">
                <i className="fas fa-shield text-secondary"></i>
                <span className="text-[10px] font-bold text-white uppercase tracking-widest">Secure</span>
              </div>
            </div>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div className="p-6 bg-white/5 border border-white/5 rounded-3xl text-center">
              <div className="text-2xl font-black text-primary-400">0ms</div>
              <div className="text-[9px] font-bold text-gray-500 uppercase tracking-widest">Delay</div>
            </div>
            <div className="p-6 bg-white/5 border border-white/5 rounded-3xl text-center">
              <div className="text-2xl font-black text-secondary">100%</div>
              <div className="text-[9px] font-bold text-gray-500 uppercase tracking-widest">Free</div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Dashboard;
