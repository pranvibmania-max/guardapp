
import React, { useState, useRef, useEffect } from 'react';
import { GoogleGenAI } from "@google/genai";

type SkinType = 'Oily' | 'Dry' | 'Combination' | 'Sensitive' | 'Normal' | 'Unknown';
type Concern = 'Acne' | 'Aging' | 'Hydration' | 'Dullness' | 'Redness' | 'Texture';

interface AIBeautyResponse {
  analysis: string;
  routine: string[];
  heroIngredient: string;
  proTip: string;
}

const BeautyTips: React.FC = () => {
  const [skinType, setSkinType] = useState<SkinType>('Normal');
  const [concern, setConcern] = useState<Concern>('Hydration');
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [aiResponse, setAiResponse] = useState<AIBeautyResponse | null>(null);
  
  // Camera State
  const [showCamera, setShowCamera] = useState(false);
  const [capturedImage, setCapturedImage] = useState<string | null>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  const startCamera = async () => {
    setShowCamera(true);
    setCapturedImage(null);
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ video: { facingMode: 'user' } });
      if (videoRef.current) {
        videoRef.current.srcObject = stream;
      }
    } catch (err) {
      console.error("Camera access denied", err);
      alert("Please enable camera access for skin analysis.");
      setShowCamera(false);
    }
  };

  const stopCamera = () => {
    if (videoRef.current && videoRef.current.srcObject) {
      const tracks = (videoRef.current.srcObject as MediaStream).getTracks();
      tracks.forEach(track => track.stop());
    }
    setShowCamera(false);
  };

  const capturePhoto = () => {
    if (videoRef.current && canvasRef.current) {
      const context = canvasRef.current.getContext('2d');
      if (context) {
        canvasRef.current.width = videoRef.current.videoWidth;
        canvasRef.current.height = videoRef.current.videoHeight;
        context.drawImage(videoRef.current, 0, 0);
        const imageData = canvasRef.current.toDataURL('image/jpeg');
        setCapturedImage(imageData);
        stopCamera();
      }
    }
  };

  const analyzeWithAI = async () => {
    setIsAnalyzing(true);
    setAiResponse(null);

    try {
      const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
      
      const parts: any[] = [
        { text: `Act as a world-class dermatological consultant. Analyze the following skin profile: 
          Skin Type: ${skinType}
          Primary Concern: ${concern}
          ${capturedImage ? "A photo of the skin is provided for visual analysis." : "No photo provided, rely on selected profile."}
          
          Provide a highly personalized response in the following format:
          Analysis: [A brief 2-sentence summary of the skin state]
          Routine: [A 3-step morning and evening routine list]
          Hero: [The most important active ingredient for this user]
          Tip: [One professional pro-tip for long term health]
          
          Keep the response encouraging and expert.` }
      ];

      if (capturedImage) {
        parts.push({
          inlineData: {
            mimeType: "image/jpeg",
            data: capturedImage.split(',')[1]
          }
        });
      }

      const result = await ai.models.generateContent({
        model: "gemini-3-flash-preview",
        contents: { parts },
      });

      const text = result.text || "";
      
      // Basic parser for AI response
      const analysisMatch = text.match(/Analysis:\s*(.*)/i);
      const routineMatch = text.match(/Routine:\s*([\s\S]*?)(?=Hero:|Tip:|$)/i);
      const heroMatch = text.match(/Hero:\s*(.*)/i);
      const tipMatch = text.match(/Tip:\s*(.*)/i);

      setAiResponse({
        analysis: analysisMatch ? analysisMatch[1].trim() : "Custom analysis complete.",
        routine: routineMatch ? routineMatch[1].trim().split('\n').filter(s => s.length > 2) : ["Gentle Cleanse", "Targeted Treatment", "SPF/Moisturize"],
        heroIngredient: heroMatch ? heroMatch[1].trim() : "SPF 50+",
        proTip: tipMatch ? tipMatch[1].trim() : "Consistency is the key to healthy skin."
      });

    } catch (err) {
      console.error("AI Analysis failed", err);
      alert("Consultation failed. Please try again.");
    } finally {
      setIsAnalyzing(false);
    }
  };

  return (
    <div className="max-w-5xl mx-auto animate-in fade-in slide-in-from-bottom-8 duration-700 pb-12">
      <header className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
        <div className="space-y-2">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-pink-50 dark:bg-pink-900/30 border border-pink-100 dark:border-pink-800 text-[10px] font-black text-pink-600 dark:text-pink-300 uppercase tracking-widest">
            AI Personalized Care
          </div>
          <h1 className="text-4xl md:text-5xl font-black text-gray-900 dark:text-white tracking-tight">Glow Guide AI<span className="text-pink-500">.</span></h1>
          <p className="text-gray-500 dark:text-gray-400 max-w-xl">
            Next-gen skincare intelligence. Use our AI skin scanner and consultation engine to find your perfect routine.
          </p>
        </div>

        <button 
          onClick={startCamera}
          className="group flex items-center gap-3 px-6 py-4 rounded-[2rem] bg-gradient-to-r from-pink-500 to-indigo-600 text-white shadow-lg shadow-pink-500/25 hover:shadow-pink-500/40 hover:-translate-y-1 active:scale-95 transition-all duration-300"
        >
          <i className="fas fa-camera text-lg"></i>
          <span className="text-sm font-black uppercase tracking-widest">Scan Skin</span>
        </button>
      </header>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
        <div className="lg:col-span-5 space-y-8">
          {/* Configuration Card */}
          <div className="bg-white/80 dark:bg-slate-800/60 rounded-[2.5rem] p-8 border border-gray-100 dark:border-white/5 shadow-xl backdrop-blur-sm space-y-8">
            
            {capturedImage && (
              <div className="relative rounded-2xl overflow-hidden border-2 border-pink-500 animate-in zoom-in duration-300">
                <img src={capturedImage} alt="Captured Skin" className="w-full aspect-video object-cover" />
                <button 
                  onClick={() => setCapturedImage(null)}
                  className="absolute top-2 right-2 w-8 h-8 bg-black/50 text-white rounded-full flex items-center justify-center hover:bg-red-500 transition-colors"
                >
                  <i className="fas fa-times"></i>
                </button>
                <div className="absolute bottom-2 left-2 bg-pink-500 text-white text-[8px] font-black px-2 py-1 rounded uppercase">
                  Photo Loaded
                </div>
              </div>
            )}

            <div className="space-y-6">
              <label className="text-xs font-black text-gray-400 uppercase tracking-widest px-2">Skin Type</label>
              <div className="grid grid-cols-2 gap-2">
                {['Oily', 'Dry', 'Combination', 'Sensitive', 'Normal'].map(type => (
                  <button
                    key={type}
                    onClick={() => setSkinType(type as SkinType)}
                    className={`p-3 rounded-xl border text-[11px] font-bold transition-all ${skinType === type ? 'bg-pink-500 text-white border-pink-500 shadow-md' : 'bg-gray-50 dark:bg-slate-900 text-gray-500 border-transparent hover:border-gray-200'}`}
                  >
                    {type}
                  </button>
                ))}
              </div>
            </div>

            <div className="space-y-6">
              <label className="text-xs font-black text-gray-400 uppercase tracking-widest px-2">Primary Concern</label>
              <div className="grid grid-cols-2 gap-2">
                {['Acne', 'Aging', 'Hydration', 'Dullness', 'Redness', 'Texture'].map(c => (
                  <button
                    key={c}
                    onClick={() => setConcern(c as Concern)}
                    className={`p-3 rounded-xl border text-[11px] font-bold transition-all ${concern === c ? 'bg-indigo-500 text-white border-indigo-500 shadow-md' : 'bg-gray-50 dark:bg-slate-900 text-gray-500 border-transparent hover:border-gray-200'}`}
                  >
                    {c}
                  </button>
                ))}
              </div>
            </div>

            <button 
              onClick={analyzeWithAI}
              disabled={isAnalyzing}
              className="w-full py-4 bg-slate-900 dark:bg-white text-white dark:text-slate-900 rounded-2xl font-black text-sm uppercase tracking-widest hover:opacity-90 disabled:opacity-50 transition-all shadow-xl flex items-center justify-center gap-3"
            >
              {isAnalyzing ? (
                <>
                  <i className="fas fa-circle-notch fa-spin"></i>
                  <span>Analyzing...</span>
                </>
              ) : (
                <>
                  <i className="fas fa-brain"></i>
                  <span>Get AI Advice</span>
                </>
              )}
            </button>
          </div>
        </div>

        {/* Results / Analysis Panel */}
        <div className="lg:col-span-7">
          {isAnalyzing ? (
            <div className="h-full min-h-[400px] flex flex-col items-center justify-center space-y-6 bg-white/40 dark:bg-slate-800/20 rounded-[3rem] border border-dashed border-gray-200 dark:border-white/5 p-12 text-center backdrop-blur-sm">
               <div className="relative w-32 h-32 mb-4">
                  <div className="absolute inset-0 border-4 border-pink-500/20 rounded-full"></div>
                  <div className="absolute inset-0 border-t-4 border-pink-500 rounded-full animate-spin"></div>
                  <i className="fas fa-sparkles text-4xl text-pink-500 absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 animate-pulse"></i>
               </div>
               <p className="text-sm font-black text-gray-500 dark:text-gray-400 uppercase tracking-[0.3em]">AI Consultation in progress</p>
               <p className="text-xs text-gray-400 max-w-xs leading-relaxed">Gemini is processing your skin profile and visual data to craft your routine...</p>
            </div>
          ) : aiResponse ? (
            <div className="bg-white dark:bg-slate-800/60 rounded-[3rem] border border-gray-100 dark:border-white/5 p-10 md:p-14 shadow-2xl backdrop-blur-sm animate-in zoom-in duration-500">
              <div className="space-y-10">
                <div className="space-y-3">
                  <div className="flex items-center gap-2">
                    <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
                    <p className="text-[10px] font-black text-gray-400 uppercase tracking-[0.3em]">AI Diagnosis Complete</p>
                  </div>
                  <h2 className="text-3xl font-black text-gray-900 dark:text-white leading-tight">Your Skin Synthesis</h2>
                </div>

                <div className="p-8 rounded-[2rem] bg-pink-500/5 dark:bg-pink-500/10 border border-pink-500/10">
                   <p className="text-lg font-medium text-gray-700 dark:text-gray-200 leading-relaxed italic">
                     "{aiResponse.analysis}"
                   </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  <div className="space-y-6">
                    <h3 className="text-xs font-black text-gray-400 uppercase tracking-widest flex items-center gap-2">
                       <i className="fas fa-tasks text-indigo-500"></i> Optimized Routine
                    </h3>
                    <ul className="space-y-4">
                       {aiResponse.routine.map((step, idx) => (
                         <li key={idx} className="flex items-start gap-3 group">
                            <span className="w-5 h-5 rounded-lg bg-indigo-500 text-white text-[9px] font-black flex items-center justify-center shrink-0 mt-0.5">{idx + 1}</span>
                            <span className="text-sm font-bold text-gray-600 dark:text-gray-300">{step}</span>
                         </li>
                       ))}
                    </ul>
                  </div>

                  <div className="space-y-6">
                    <h3 className="text-xs font-black text-gray-400 uppercase tracking-widest flex items-center gap-2">
                       <i className="fas fa-atom text-pink-500"></i> Hero Component
                    </h3>
                    <div className="p-6 rounded-3xl bg-gray-50 dark:bg-slate-900 border border-gray-100 dark:border-white/5 text-center">
                       <p className="text-2xl font-black text-pink-600 dark:text-pink-400 mb-1">{aiResponse.heroIngredient}</p>
                       <p className="text-[9px] font-bold text-gray-400 uppercase tracking-widest">Scientific Priority</p>
                    </div>
                  </div>
                </div>

                <div className="pt-8 border-t border-gray-100 dark:border-white/5">
                   <div className="flex items-center gap-4 p-6 bg-slate-900 dark:bg-white rounded-[2rem] text-white dark:text-slate-900">
                      <div className="w-10 h-10 rounded-full bg-primary-500 flex items-center justify-center text-white shadow-lg">
                         <i className="fas fa-lightbulb"></i>
                      </div>
                      <div className="flex-1">
                         <p className="text-[9px] font-black uppercase tracking-widest opacity-60">Professional Pro-Tip</p>
                         <p className="text-xs font-bold leading-relaxed">{aiResponse.proTip}</p>
                      </div>
                   </div>
                </div>
              </div>
            </div>
          ) : (
            <div className="h-full min-h-[400px] flex flex-col items-center justify-center text-center p-12 bg-white/40 dark:bg-slate-800/20 rounded-[3rem] border border-dashed border-gray-200 dark:border-white/5 opacity-60">
               <i className="fas fa-face-smile text-6xl mb-6 text-gray-300"></i>
               <h3 className="text-xl font-bold text-gray-600 dark:text-gray-400">Ready for Consultation</h3>
               <p className="text-sm text-gray-400 mt-2 max-w-xs">Select your profile or use the skin scanner to generate your personalized AI routine.</p>
            </div>
          )}
        </div>
      </div>

      {/* Camera Modal */}
      {showCamera && (
        <div className="fixed inset-0 z-[3000] flex items-center justify-center p-4">
          <div className="absolute inset-0 bg-slate-950/80 backdrop-blur-md" onClick={stopCamera}></div>
          <div className="relative w-full max-w-xl bg-white dark:bg-slate-900 rounded-[3rem] shadow-2xl overflow-hidden animate-in zoom-in duration-300">
             <div className="p-8 flex justify-between items-center border-b border-gray-100 dark:border-white/5">
                <h3 className="text-lg font-black text-gray-900 dark:text-white">AI Skin Scanner</h3>
                <button onClick={stopCamera} className="w-10 h-10 rounded-full bg-gray-50 dark:bg-white/5 flex items-center justify-center hover:bg-red-500 hover:text-white transition-all">
                   <i className="fas fa-times"></i>
                </button>
             </div>
             
             <div className="aspect-video bg-black relative">
                <video ref={videoRef} autoPlay playsInline className="w-full h-full object-cover" />
                <div className="absolute inset-0 border-[20px] border-black/40 pointer-events-none"></div>
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-48 h-48 border border-pink-500/50 rounded-full animate-pulse-slow pointer-events-none"></div>
             </div>

             <div className="p-8 flex justify-center gap-6">
                <button 
                  onClick={capturePhoto}
                  className="w-20 h-20 rounded-full bg-pink-500 text-white text-3xl flex items-center justify-center shadow-xl shadow-pink-500/40 hover:scale-110 active:scale-95 transition-all"
                >
                   <i className="fas fa-camera"></i>
                </button>
             </div>
             <canvas ref={canvasRef} className="hidden" />
          </div>
        </div>
      )}
    </div>
  );
};

export default BeautyTips;
