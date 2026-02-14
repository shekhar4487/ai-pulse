
import React, { useState } from 'react';
import { NewsItem } from '../types';

interface NewsCardProps {
  news: NewsItem;
  onClick?: () => void;
}

const NewsCard: React.FC<NewsCardProps> = ({ news, onClick }) => {
  const [imgSrc, setImgSrc] = useState(news.imageUrl);

  const handleImgError = () => {
    setImgSrc(`https://picsum.photos/seed/aipulse-${news.id}/800/450`);
  };

  return (
    <div 
      onClick={onClick}
      className="group cursor-pointer flex flex-col h-full bg-white transition-premium"
    >
      <div className="relative aspect-video overflow-hidden rounded-2xl border border-slate-100 mb-8">
        <img 
          src={imgSrc} 
          alt={news.title} 
          onError={handleImgError}
          className="w-full h-full object-cover transition-premium duration-1000 group-hover:scale-110"
        />
        {news.isSponsored && (
          <div className="absolute top-4 right-4 bg-slate-900/90 backdrop-blur-md text-white text-[8px] font-black px-3 py-1.5 rounded-full uppercase tracking-[0.2em] shadow-lg">
            SPONSORED
          </div>
        )}
      </div>

      <div className="flex flex-col flex-grow">
        <div className="flex items-center space-x-3 text-[10px] text-slate-400 font-black uppercase tracking-widest mb-4">
          <span className="text-blue-600 bg-blue-50 px-2 py-0.5 rounded">{news.category}</span>
          <span className="w-1 h-1 bg-slate-200 rounded-full"></span>
          <span>{news.date}</span>
        </div>
        
        <h3 className="text-xl md:text-2xl font-black text-slate-900 leading-tight group-hover:text-blue-600 transition-premium mb-4 line-clamp-2 tracking-tight">
          {news.title}
        </h3>
        
        <p className="text-slate-500 text-base leading-relaxed mb-8 line-clamp-3 font-medium">
          {news.excerpt}
        </p>

        <div className="mt-auto flex items-center justify-between pt-6 border-t border-slate-50">
          <div className="flex items-center space-x-3">
            <img className="h-7 w-7 rounded-full border border-slate-100 shadow-sm" src={`https://i.pravatar.cc/150?u=${news.author}`} alt={news.author} />
            <span className="text-[9px] text-slate-900 font-black uppercase tracking-widest">
              {news.author}
            </span>
          </div>
          <span className="text-[9px] text-slate-400 font-black uppercase tracking-widest">
            {news.readTime} Read
          </span>
        </div>
      </div>
    </div>
  );
};

export default NewsCard;
