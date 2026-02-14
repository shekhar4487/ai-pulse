
import React, { useState, useEffect } from 'react';
import { NewsItem } from '../types';
import { MOCK_NEWS, MOCK_TOOLS } from '../constants';
import { getAISummary, getDeepDive } from '../services/geminiService';

interface ArticleViewProps {
  article: NewsItem;
  onBack: () => void;
  onNavigateToArticle?: (article: NewsItem) => void;
}

const ArticleView: React.FC<ArticleViewProps> = ({ article, onBack, onNavigateToArticle }) => {
  const [aiSummary, setAiSummary] = useState<string | null>(null);
  const [deepDive, setDeepDive] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [activeMode, setActiveMode] = useState<'summary' | 'deep-dive'>('summary');

  const generateInsights = async (mode: 'summary' | 'deep-dive') => {
    setIsLoading(true);
    try {
      if (mode === 'summary') {
        const result = await getAISummary(article.content);
        setAiSummary(result || "No summary available.");
      } else {
        const result = await getDeepDive(article.title, article.content);
        setDeepDive(result || "No analysis available.");
      }
    } catch (err) {
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    generateInsights('summary');
  }, [article.id]);

  useEffect(() => {
    if (activeMode === 'deep-dive' && !deepDive) {
      generateInsights('deep-dive');
    }
  }, [activeMode]);

  return (
    <div className="bg-white min-h-screen pb-32">
      <div className="max-w-5xl mx-auto px-4 pt-12">
        <button onClick={onBack} className="text-xs font-black uppercase tracking-widest text-slate-400 hover:text-slate-900 mb-12 flex items-center space-x-2 group transition-premium">
          <span className="group-hover:-translate-x-1 transition-transform">←</span> <span>EXIT TO PULSE</span>
        </button>

        <header className="mb-20 text-center">
          <div className="flex items-center justify-center space-x-4 text-[10px] font-black uppercase tracking-[0.2em] text-blue-600 mb-8">
            <span className="bg-blue-50 px-3 py-1 rounded">{article.category}</span>
            <span className="text-slate-200">•</span>
            <span className="text-slate-400">{article.date}</span>
          </div>
          <h1 className="text-4xl md:text-7xl font-black text-slate-900 mb-10 leading-[1] tracking-tighter uppercase max-w-4xl mx-auto">
            {article.title}
          </h1>
          <p className="text-xl md:text-2xl text-slate-500 font-medium leading-relaxed max-w-3xl mx-auto">
            {article.excerpt}
          </p>
        </header>

        <div className="flex items-center justify-center space-x-4 mb-16">
           <button 
             onClick={() => setActiveMode('summary')}
             className={`px-8 py-4 text-xs font-black uppercase tracking-widest rounded-xl transition-premium border ${activeMode === 'summary' ? 'bg-slate-900 text-white border-slate-900 shadow-xl' : 'bg-white text-slate-500 border-slate-100 hover:border-slate-300'}`}
           >
             Quick Summary
           </button>
           <button 
             onClick={() => setActiveMode('deep-dive')}
             className={`px-8 py-4 text-xs font-black uppercase tracking-widest rounded-xl transition-premium border flex items-center ${activeMode === 'deep-dive' ? 'bg-slate-900 text-white border-slate-900 shadow-xl' : 'bg-white text-slate-500 border-slate-100 hover:border-slate-300'}`}
           >
             <span className="mr-2">💎</span> PRO Deep Dive
           </button>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16">
          <div className="lg:col-span-8">
            <div className="prose prose-xl max-w-none text-slate-900 leading-relaxed font-medium space-y-16">
               <div className="p-10 md:p-14 border border-slate-100 bg-slate-50 rounded-[2.5rem] shadow-sm mb-20">
                  <h4 className="text-xs font-black uppercase tracking-widest mb-10 flex items-center text-slate-400">
                    <span className="w-8 h-[2px] bg-blue-600 mr-4 rounded-full"></span>
                    {activeMode === 'summary' ? 'PULSE INSIGHT' : 'EXECUTIVE ANALYSIS'}
                  </h4>
                  {isLoading ? (
                    <div className="space-y-6 animate-pulse">
                      <div className="h-4 bg-slate-200 w-3/4 rounded"></div>
                      <div className="h-4 bg-slate-200 w-5/6 rounded"></div>
                      <div className="h-4 bg-slate-200 w-2/3 rounded"></div>
                    </div>
                  ) : (
                    <div className="text-xl md:text-2xl font-bold whitespace-pre-line text-slate-800 leading-relaxed italic">
                      {activeMode === 'summary' ? aiSummary : deepDive}
                    </div>
                  )}
               </div>

               <div className="rounded-[2rem] overflow-hidden border border-slate-100 shadow-lg mb-20">
                 <img src={article.imageUrl} className="w-full" alt={article.title} />
               </div>

               <div className="space-y-10 text-lg md:text-xl text-slate-600 font-medium">
                  {article.content.split('\n').map((p, i) => (
                    <p key={i} className="first-letter:text-5xl first-letter:font-black first-letter:text-slate-900 first-letter:mr-2 first-letter:float-left first-letter:leading-none">
                      {p}
                    </p>
                  ))}
               </div>
            </div>
          </div>

          <div className="lg:col-span-4 space-y-12">
            <div className="p-8 bg-blue-600 rounded-[2rem] text-white shadow-2xl shadow-blue-500/20">
               <h4 className="font-black text-[10px] uppercase tracking-[0.3em] mb-6 opacity-60">SPONSORED</h4>
               <p className="text-xl font-bold mb-8 leading-snug">WayScript: The OS for AI Agents. Build faster than ever.</p>
               <button className="w-full bg-white text-blue-600 py-4 text-xs font-black uppercase tracking-widest rounded-xl hover:bg-slate-100 transition-premium shadow-lg">GET EARLY ACCESS</button>
            </div>

            <div className="bg-white border border-slate-100 p-8 rounded-[2rem]">
              <h4 className="font-black text-[10px] uppercase tracking-widest text-slate-400 mb-10 border-b border-slate-50 pb-4">RECOMMENDED TOOLS</h4>
              <div className="space-y-8">
                {MOCK_TOOLS.slice(0, 3).map(tool => (
                  <div key={tool.id} className="group cursor-pointer">
                    <p className="font-black text-sm uppercase text-slate-900 group-hover:text-blue-600 transition-premium underline underline-offset-8 decoration-slate-100 group-hover:decoration-blue-200">{tool.name}</p>
                    <p className="text-[10px] text-slate-400 font-black uppercase mt-3 tracking-widest">{tool.category}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ArticleView;
