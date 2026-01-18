
import React, { useState, useEffect } from 'react';
import { GoogleGenAI } from "@google/genai";
import AdSlot from '../Common/AdSlot.tsx';

interface NewsItem {
  title: string;
  summary: string;
  url: string;
}

const NEWS_CATEGORIES = [
  { id: 'india-trending', label: 'India Trending', icon: 'fa-bolt-lightning' },
  { id: 'politics', label: 'Politics', icon: 'fa-building-columns' },
  { id: 'cricket-sports', label: 'Sports & Cricket', icon: 'fa-baseball-bat-ball' },
  { id: 'entertainment', label: 'Bollywood & Ent', icon: 'fa-film' },
  { id: 'economy', label: 'Economy & Finance', icon: 'fa-indian-rupee-sign' },
  { id: 'tech-india', label: 'Tech in India', icon: 'fa-microchip' }
];

const DailyNews: React.FC = () => {
  const [activeCategory, setActiveCategory] = useState('india-trending');
  const [news, setNews] = useState<NewsItem[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchNews = async (category: string) => {
    setIsLoading(true);
    setError(null);
    setNews([]);

    try {
      const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
      const catLabel = NEWS_CATEGORIES.find(c => c.id === category)?.label || category;
      
      const prompt = `Find the top 5 most important and verified news stories for today specifically from India in the "${catLabel}" category. 
      Focus on major headlines, trending topics, and reliable Indian news sources (like TOI, The Hindu, NDTV, etc.).
      
      For each story, provide:
      1. A catchy but accurate title.
      2. A concise 2-sentence summary highlighting why it's important.
      
      Return the results as a clean list with clear separation between stories. Do not use JSON. Use search to ensure the news is from the last 24 hours.`;

      const response = await ai.models.generateContent({
        model: "gemini-3-flash-preview",
        contents: prompt,
        config: {
          tools: [{ googleSearch: {} }],
        },
      });

      const text = response.text || "";
      const groundingChunks = response.candidates?.[0]?.groundingMetadata?.groundingChunks || [];

      // Simple parsing of text to extract stories
      const lines = text.split('\n').filter(l => l.trim().length > 15);
      const items: NewsItem[] = [];
      
      let currentItem: Partial<NewsItem> = {};
      let storyCount = 0;

      for (let i = 0; i < lines.length && storyCount < 5; i++) {
        const line = lines[i].replace(/^\d+\.\s*/, '').replace(/^\*\*\s*/, '').replace(/\*\*/g, '').replace(/^- \s*/, '').trim();
        
        if (!currentItem.title) {
          currentItem.title = line;
        } else {
          currentItem.summary = line;
          const chunk = groundingChunks[storyCount];
          currentItem.url = chunk?.web?.uri || chunk?.maps?.uri || "https://news.google.co.in";
          
          items.push(currentItem as NewsItem);
          currentItem = {};
          storyCount++;
        }
      }

      setNews(items);
    } catch (err: any) {
      console.error("AI Fetch Error:", err);
      setError("Unable to connect to India News network. Please try refreshing.");
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchNews(activeCategory);
  }, [activeCategory]);

  return (
    <div className="max-w-5xl mx-auto animate-in fade-in slide-in-from-bottom-8 duration-700">
      <header className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-8 relative">
        <div className="space-y-2">
          <div className="flex items-center gap-2">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-orange-50 dark:bg-orange-950/30 border border-orange-100 dark:border-orange-900/50 text-[10px] font-black text-orange-600 dark:text-orange-400 uppercase tracking-widest">
              India Focus
            </div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary-50 dark:bg-primary-900/30 border border-primary-100 dark:border-primary-800 text-[10px] font-black text-primary-600 dark:text-primary-300 uppercase tracking-widest">
              AI Real-Time
            </div>
          </div>
          <h1 className="text-4xl md:text-5xl font-black text-gray-900 dark:text-white tracking-tight">Daily Headlines</h1>
          <p className="text-gray-500 dark:text-gray-400 max-w-xl">
            Real-time Indian news summarized by Gemini Intelligence. Accurate, localized, and instant.
          </p>
        </div>
        <button 
          onClick={() => fetchNews(activeCategory)}
          disabled={isLoading}
          className="p-3 w-12 h-12 rounded-2xl bg-white dark:bg-slate-800 shadow-sm border border-gray-100 dark:border-white/10 text-primary-500 hover:bg-primary-500 hover:text-white transition-all active:scale-95 disabled:opacity-50 flex items-center justify-center"
        >
          <i className={`fas fa-rotate ${isLoading ? 'fa-spin' : ''}`}></i>
        </button>
      </header>

      {/* Category Selection */}
      <div className="flex gap-2 mb-10 overflow-x-auto pb-4 no-scrollbar">
        {NEWS_CATEGORIES.map(cat => (
          <button
            key={cat.id}
            onClick={() => setActiveCategory(cat.id)}
            className={`flex items-center gap-3 px-6 py-3 rounded-2xl font-bold whitespace-nowrap transition-all border ${
              activeCategory === cat.id 
                ? 'bg-primary-500 text-white border-primary-500 shadow-lg shadow-primary-500/20' 
                : 'bg-white dark:bg-slate-800 text-gray-500 border-gray-100 dark:border-white/5 hover:border-primary-500/50'
            }`}
          >
            <i className={`fas ${cat.icon}`}></i>
            <span className="text-sm">{cat.label}</span>
          </button>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
        <div className="lg:col-span-8 space-y-6">
          {isLoading ? (
            <div className="space-y-6">
              {[1, 2, 3].map(i => (
                <div key={i} className="bg-white/50 dark:bg-slate-800/30 rounded-[2rem] p-8 border border-dashed border-gray-200 dark:border-white/5 animate-pulse">
                  <div className="h-6 w-2/3 bg-gray-200 dark:bg-white/5 rounded-full mb-4"></div>
                  <div className="h-4 w-full bg-gray-100 dark:bg-white/5 rounded-full mb-2"></div>
                  <div className="h-4 w-5/6 bg-gray-100 dark:bg-white/5 rounded-full"></div>
                </div>
              ))}
              <div className="flex flex-col items-center justify-center py-10 text-center opacity-50">
                 <i className="fas fa-satellite-dish text-4xl mb-4 text-primary-500 animate-bounce"></i>
                 <p className="text-xs font-black uppercase tracking-widest dark:text-white">Scanning Indian News Cycles...</p>
              </div>
            </div>
          ) : error ? (
            <div className="bg-red-500/10 rounded-[2.5rem] p-12 border border-red-500/20 text-center">
              <i className="fas fa-triangle-exclamation text-4xl text-red-500 mb-4"></i>
              <p className="text-sm font-bold text-red-600 dark:text-red-400">{error}</p>
            </div>
          ) : news.length > 0 ? (
            <div className="space-y-6">
              {news.map((item, idx) => (
                <article 
                  key={idx} 
                  className="group bg-white/80 dark:bg-slate-800/40 rounded-[2rem] p-8 border border-gray-100 dark:border-white/10 shadow-sm hover:shadow-xl hover:shadow-primary-500/5 transition-all duration-500 animate-in slide-in-from-bottom-4"
                  style={{ animationDelay: `${idx * 100}ms` }}
                >
                  <div className="flex justify-between items-start mb-4">
                    <h2 className="text-xl font-black text-gray-900 dark:text-white group-hover:text-primary-500 transition-colors leading-snug pr-4">
                      {item.title}
                    </h2>
                    <span className="px-2 py-1 rounded bg-gray-100 dark:bg-white/5 text-[9px] font-black text-gray-400 uppercase tracking-widest whitespace-nowrap">
                      Headline {idx + 1}
                    </span>
                  </div>
                  <p className="text-gray-600 dark:text-gray-300 text-sm leading-relaxed mb-6">
                    {item.summary}
                  </p>
                  <div className="flex items-center justify-between pt-4 border-t border-gray-50 dark:border-white/5">
                    <div className="flex items-center gap-2">
                       <div className="w-2 h-2 rounded-full bg-secondary animate-pulse"></div>
                       <span className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">Sourced from News Grounding</span>
                    </div>
                    <a 
                      href={item.url} 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 text-xs font-black text-primary-500 hover:text-primary-600 transition-all group/link"
                    >
                      VISIT SOURCE 
                      <i className="fas fa-arrow-up-right-from-square text-[10px] transition-transform group-hover/link:-translate-y-0.5 group-hover/link:translate-x-0.5"></i>
                    </a>
                  </div>
                </article>
              ))}
            </div>
          ) : (
            <div className="py-20 text-center opacity-30">
               <i className="fas fa-inbox text-6xl mb-4"></i>
               <p className="font-bold">Waiting for News Feed...</p>
            </div>
          )}
        </div>

        {/* Sidebar/Ad Section */}
        <div className="lg:col-span-4 space-y-6">
           <div className="bg-gradient-to-br from-gray-900 to-slate-950 rounded-[2.5rem] p-8 text-white relative overflow-hidden group shadow-lg">
             <div className="absolute -right-4 -bottom-4 opacity-10">
                <i className="fas fa-earth-asia text-9xl rotate-12 transition-transform duration-700 group-hover:rotate-0"></i>
             </div>
             <h3 className="text-lg font-black mb-4 flex items-center gap-2 relative z-10">
               <i className="fas fa-shield-halved text-secondary" aria-hidden="true"></i> Smart Curation
             </h3>
             <p className="text-gray-400 text-xs leading-relaxed relative z-10 mb-6">
               Focusing on credible Indian outlets like PTI, ANI, and major national dailies to give you a clutter-free experience.
             </p>
             <div className="p-4 bg-white/5 rounded-2xl border border-white/5 relative z-10">
                <div className="flex justify-between items-center mb-2">
                   <span className="text-[9px] font-black uppercase tracking-widest text-primary-400">Search Region</span>
                   <span className="text-[9px] font-bold text-orange-500">IND - Verified</span>
                </div>
                <div className="h-1.5 w-full bg-white/10 rounded-full overflow-hidden">
                   <div className="h-full bg-primary-500 w-full animate-pulse"></div>
                </div>
             </div>
           </div>

           <AdSlot type="square" className="mx-auto" />

           <div className="bg-white/80 dark:bg-slate-800/60 rounded-[2.5rem] border border-gray-100 dark:border-white/10 p-8 backdrop-blur-sm">
             <h4 className="text-xs font-black text-gray-400 uppercase tracking-widest mb-6">Trending in India</h4>
             <div className="flex flex-wrap gap-2">
               {['#IPL2024', '#ElectionUpdate', '#DigitalIndia', '#StartupIndia', '#Nifty50', '#Budget2024'].map(tag => (
                 <span key={tag} className="px-3 py-1.5 bg-gray-50 dark:bg-white/5 rounded-xl text-[10px] font-bold text-gray-500 dark:text-gray-400 hover:text-primary-500 transition-colors cursor-default">
                   {tag}
                 </span>
               ))}
             </div>
           </div>
        </div>
      </div>
    </div>
  );
};

export default DailyNews;
