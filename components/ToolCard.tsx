
import React, { useState } from 'react';
import { AITool } from '../types';
import { getToolReview } from '../services/geminiService';

interface ToolCardProps {
  tool: AITool;
}

const ToolCard: React.FC<ToolCardProps> = ({ tool }) => {
  const [review, setReview] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [imgSrc, setImgSrc] = useState(tool.imageUrl);

  const handleImgError = () => {
    setImgSrc(`https://picsum.photos/seed/tool-${tool.id}/200/200`);
  };

  const handleReview = async () => {
    if (review) {
      setReview(null);
      return;
    }
    setLoading(true);
    try {
      const result = await getToolReview(tool.name, tool.description);
      setReview(result || "Review not available.");
    } catch (err) {
      console.error(err);
      setReview("Unable to generate review.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className={`relative bg-white border rounded-3xl p-6 transition-all duration-300 ${
      tool.is_sponsored 
      ? 'border-blue-200 shadow-xl shadow-blue-500/5 ring-1 ring-blue-50' 
      : 'border-gray-100 hover:border-gray-300'
    }`}>
      {tool.is_sponsored && (
        <div className="absolute -top-3 left-6 bg-blue-600 text-white text-[7px] font-black px-2 py-1 rounded-full uppercase tracking-widest shadow-lg shadow-blue-500/20">
          Featured Tool
        </div>
      )}

      <div className="flex items-start justify-between mb-4">
        <div className="flex items-center space-x-4">
          <div className="w-12 h-12 rounded-2xl bg-gray-50 flex items-center justify-center overflow-hidden border border-gray-100">
            <img 
              src={imgSrc} 
              alt={tool.name} 
              onError={handleImgError}
              className="w-full h-full object-cover" 
            />
          </div>
          <div>
            <h4 className="font-black text-gray-900 text-base">{tool.name}</h4>
            <div className="flex items-center space-x-1 text-yellow-500">
              <span className="text-[10px] font-black">{tool.rating || '5.0'}</span>
              <svg className="w-3 h-3 fill-current" viewBox="0 0 20 20"><path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"></path></svg>
            </div>
          </div>
        </div>
        <span className={`text-[9px] px-2 py-1 rounded-md font-black uppercase tracking-widest ${
          tool.pricing === 'Free' ? 'bg-green-50 text-green-600' : 
          tool.pricing === 'Freemium' ? 'bg-blue-50 text-blue-600' : 'bg-orange-50 text-orange-600'
        }`}>
          {tool.pricing}
        </span>
      </div>

      <p className="text-gray-500 text-xs font-medium leading-relaxed mb-6 line-clamp-2">
        {tool.description}
      </p>

      {review && (
        <div className="mb-6 p-4 bg-gray-50 border border-gray-100 rounded-2xl text-[10px] text-gray-600 leading-relaxed font-medium animate-in fade-in slide-in-from-top-1">
          <span className="text-blue-600 font-black uppercase tracking-widest block mb-1">AI Verdict:</span>
          {review}
        </div>
      )}

      <div className="flex flex-wrap gap-2 mb-6">
        {tool.tags?.map(tag => (
          <span key={tag} className="text-[8px] font-black uppercase tracking-widest text-gray-400 bg-gray-50 px-2 py-0.5 rounded-md">#{tag}</span>
        ))}
      </div>

      <div className="flex items-center space-x-2">
        <a 
          href={tool.link} 
          target="_blank"
          rel="noopener noreferrer"
          className="flex-grow text-center py-3 bg-black text-white text-[10px] font-black uppercase tracking-[0.2em] rounded-xl hover:bg-gray-800 transition-all shadow-lg shadow-black/5 active:scale-95"
        >
          View Site
        </a>
        <button 
          onClick={handleReview}
          className="p-3 border border-gray-200 hover:border-blue-600 rounded-xl text-gray-400 hover:text-blue-600 transition-all group active:scale-95"
          title="AI Insights"
        >
          {loading ? (
            <div className="w-4 h-4 border-2 border-blue-600 border-t-transparent rounded-full animate-spin"></div>
          ) : (
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 10V3L4 14h7v7l9-11h-7z"></path></svg>
          )}
        </button>
      </div>
    </div>
  );
};

export default ToolCard;
