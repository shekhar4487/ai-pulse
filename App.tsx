
import React, { useState, useMemo, useEffect } from 'react';
import Layout from './components/Layout';
import NewsCard from './components/NewsCard';
import ToolsView from './components/ToolsView';
import SponsorshipView from './components/SponsorshipView';
import PremiumView from './components/PremiumView';
import ArticleView from './components/ArticleView';
import AdminView from './components/AdminView';
import GenericPageView from './components/GenericPageView';
import LoginModal from './components/LoginModal';
import PulseAssistant from './components/PulseAssistant';
import { MOCK_NEWS, MOCK_TOOLS } from './constants';
import { NewsItem, AITool } from './types';
import { supabase } from './services/supabase';

export type View = 'home' | 'tools' | 'media-kit' | 'premium' | 'tutorials' | 'about' | 'contact' | 'careers' | 'privacy' | 'terms' | 'cookies' | 'article' | 'admin';

const App: React.FC = () => {
  const [currentView, setCurrentView] = useState<View>('home');
  const [selectedArticle, setSelectedArticle] = useState<NewsItem | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [isLoginOpen, setIsLoginOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  
  const [newsletterEmail, setNewsletterEmail] = useState('');
  const [isSubscribing, setIsSubscribing] = useState(false);
  const [subscribeStatus, setSubscribeStatus] = useState<'idle' | 'success' | 'error'>('idle');

  const [newsItems, setNewsItems] = useState<NewsItem[]>([]);
  const [tools, setTools] = useState<AITool[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setIsLoading(true);
        const { data: postsData } = await supabase.from('posts').select('*').order('date', { ascending: false });
        setNewsItems(postsData && postsData.length > 0 ? (postsData as NewsItem[]) : MOCK_NEWS);
        const { data: toolsData } = await supabase.from('tools').select('*').order('created_at', { ascending: false });
        setTools(toolsData && toolsData.length > 0 ? (toolsData as AITool[]) : MOCK_TOOLS);
      } catch (err) {
        setNewsItems(MOCK_NEWS);
        setTools(MOCK_TOOLS);
      } finally {
        setIsLoading(false);
      }
    };
    fetchData();
  }, []);

  const handleOpenArticle = (article: NewsItem) => {
    setSelectedArticle(article);
    setCurrentView('article');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleNewsletterSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newsletterEmail) return;
    setIsSubscribing(true);
    try {
      await supabase.from('subscribers').insert([{ email: newsletterEmail }]);
      setSubscribeStatus('success');
      setNewsletterEmail('');
    } catch (err) { setSubscribeStatus('error'); } finally { setIsSubscribing(false); }
  };

  const filteredNews = useMemo(() => {
    if (!searchQuery) return newsItems;
    const q = searchQuery.toLowerCase();
    return newsItems.filter(n => n.title.toLowerCase().includes(q) || n.excerpt.toLowerCase().includes(q));
  }, [searchQuery, newsItems]);

  const featuredPost = filteredNews[0];
  const remainingNews = filteredNews.slice(1);

  const renderContent = () => {
    switch (currentView) {
      case 'admin':
        return <AdminView newsItems={newsItems} setNewsItems={setNewsItems} tools={tools} setTools={setTools} onBack={() => setCurrentView('home')} />;
      case 'article':
        return selectedArticle ? <ArticleView article={selectedArticle} onBack={() => setCurrentView('home')} onNavigateToArticle={handleOpenArticle} /> : null;
      case 'tools':
        return <ToolsView tools={tools} />;
      case 'home':
        return (
          <div className="bg-white">
            <div className="max-w-7xl mx-auto px-4 pb-24 pt-16 md:pt-24">
              {/* Premium Clean Hero Header */}
              <div className="text-center mb-24 animate-in fade-in duration-1000">
                <h2 className="text-4xl md:text-7xl font-black text-gray-900 mb-6 tracking-tight leading-[1]">
                  STAY AHEAD OF THE AI REVOLUTION.
                </h2>
                <p className="text-gray-500 mb-12 max-w-2xl mx-auto font-medium text-lg md:text-xl leading-relaxed">
                  Join 500,000+ professionals who start their day with the world's most trusted AI newsletter. 
                  Insights delivered to your inbox every single day.
                </p>
                
                <div className="max-w-xl mx-auto relative group">
                  <div className="absolute inset-y-0 left-0 pl-5 flex items-center pointer-events-none">
                    <svg className="h-5 w-5 text-gray-300 group-focus-within:text-black transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                    </svg>
                  </div>
                  <input 
                    type="text" 
                    placeholder="Search the intelligence database..." 
                    className="w-full bg-white border border-gray-200 rounded-2xl py-5 pl-14 pr-4 text-gray-900 focus:outline-none focus:ring-4 focus:ring-black/5 focus:border-black transition-all shadow-sm hover:shadow-md"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                  />
                </div>
              </div>

              {isLoading ? (
                <div className="flex justify-center py-24"><div className="w-8 h-8 border-4 border-black border-t-transparent rounded-full animate-spin"></div></div>
              ) : (
                <>
                  {featuredPost && !searchQuery && (
                    <div className="mb-24 animate-in fade-in slide-in-from-bottom-4 duration-700">
                       <div className="newsletter-section-header mb-8">MUST READ: THE DAILY BREAKDOWN</div>
                       <div 
                         onClick={() => handleOpenArticle(featuredPost)}
                         className="group cursor-pointer bg-white border border-gray-100 rounded-[2.5rem] overflow-hidden hover:shadow-2xl transition-all flex flex-col md:flex-row shadow-sm"
                       >
                         <div className="md:w-3/5 aspect-video overflow-hidden">
                            <img src={featuredPost.imageUrl} className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-105" alt={featuredPost.title} />
                         </div>
                         <div className="md:w-2/5 p-8 md:p-14 flex flex-col justify-center border-l border-gray-50">
                            <div className="flex items-center space-x-2 text-[10px] font-black uppercase tracking-[0.2em] text-blue-600 mb-6">
                              <span className="bg-blue-50 px-2 py-0.5 rounded">{featuredPost.category}</span>
                              <span className="text-gray-200">•</span>
                              <span className="text-gray-400">{featuredPost.date}</span>
                            </div>
                            <h3 className="text-3xl md:text-4xl font-black text-gray-900 mb-6 leading-[1.1] tracking-tight group-hover:text-blue-600 transition-colors">
                              {featuredPost.title}
                            </h3>
                            <p className="text-gray-500 text-lg font-medium mb-8 line-clamp-3 leading-relaxed">
                              {featuredPost.excerpt}
                            </p>
                            <div className="flex items-center space-x-4 pt-8 border-t border-gray-50 mt-auto">
                               <img src={`https://i.pravatar.cc/100?u=${featuredPost.author}`} className="w-10 h-10 rounded-full border border-gray-100 shadow-sm" alt={featuredPost.author} />
                               <span className="text-[10px] font-black uppercase tracking-widest text-gray-900">By {featuredPost.author}</span>
                            </div>
                         </div>
                       </div>
                    </div>
                  )}

                  <div className="mb-24">
                    <div className="newsletter-section-header mb-12">LATEST INTELLIGENCE</div>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-12 gap-y-20">
                      {remainingNews.map((news) => (
                        <NewsCard key={news.id} news={news} onClick={() => handleOpenArticle(news)} />
                      ))}
                    </div>
                  </div>

                  <div className="bg-gray-50 rounded-[3rem] p-12 md:p-24 text-center border border-gray-100 shadow-sm">
                    <h3 className="text-4xl md:text-6xl font-black mb-8 tracking-tighter text-gray-900 uppercase leading-none">The Rundown AI.</h3>
                    <p className="text-gray-500 mb-12 max-w-lg mx-auto font-medium text-xl leading-relaxed">Join 500,000+ others for the world's most trusted AI newsletter.</p>
                    <form onSubmit={handleNewsletterSubmit} className="max-w-xl mx-auto flex flex-col md:flex-row gap-4">
                      <input type="email" required placeholder="Work Email" value={newsletterEmail} onChange={(e) => setNewsletterEmail(e.target.value)} className="flex-grow bg-white border border-gray-200 rounded-2xl px-6 py-5 focus:outline-none focus:ring-4 focus:ring-black/5" />
                      <button type="submit" className="bg-black text-white font-black py-5 px-12 rounded-2xl hover:bg-gray-800 transition-all">{isSubscribing ? 'Joining...' : 'Subscribe'}</button>
                    </form>
                  </div>
                </>
              )}
            </div>
          </div>
        );
      case 'premium': return <PremiumView />;
      case 'media-kit': return <SponsorshipView />;
      case 'tools': return <ToolsView tools={tools} />;
      default: return <GenericPageView title={currentView} onBack={() => setCurrentView('home')} />;
    }
  };

  return (
    <Layout currentView={currentView} onNavigate={setCurrentView} onOpenLogin={() => setIsLoginOpen(true)}>
      {renderContent()}
      <LoginModal isOpen={isLoginOpen} onClose={() => setIsLoginOpen(false)} />
      {/* Dynamic Pulse Assistant */}
      <PulseAssistant news={newsItems} tools={tools} />
    </Layout>
  );
};

export default App;
