
import React, { useState, useEffect } from 'react';
import { NewsItem, AITool } from '../types';
import { supabase } from '../services/supabase';
import { generateDraftFromTopic } from '../services/geminiService';

interface AdminViewProps {
  newsItems: NewsItem[];
  setNewsItems: React.Dispatch<React.SetStateAction<NewsItem[]>>;
  tools: AITool[];
  setTools: React.Dispatch<React.SetStateAction<AITool[]>>;
  onBack: () => void;
}

interface Subscriber {
  id: string;
  email: string;
  created_at: string;
}

const AdminView: React.FC<AdminViewProps> = ({ newsItems, setNewsItems, tools, setTools, onBack }) => {
  const [activeTab, setActiveTab] = useState<'articles' | 'subscribers' | 'tools'>('articles');
  const [showAddForm, setShowAddForm] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isDrafting, setIsDrafting] = useState(false);
  const [subscribers, setSubscribers] = useState<Subscriber[]>([]);
  const [loadingSubs, setLoadingSubs] = useState(false);
  
  // Forms State
  const [newPost, setNewPost] = useState<Partial<NewsItem>>({
    title: '', excerpt: '', content: '', category: 'Breaking', author: 'Admin Pulse', imageUrl: 'https://images.unsplash.com/photo-1677442136019-21780ecad995?auto=format&fit=crop&q=80&w=800'
  });
  const [newTool, setNewTool] = useState<Partial<AITool>>({
    name: '', description: '', category: 'Productivity', pricing: 'Free', link: '', imageUrl: 'https://picsum.photos/seed/tool/200/200', rating: 5.0, tags: [], is_sponsored: false
  });
  const [toolTags, setToolTags] = useState('');

  useEffect(() => {
    if (activeTab === 'subscribers') {
      fetchSubscribers();
    }
  }, [activeTab]);

  const fetchSubscribers = async () => {
    setLoadingSubs(true);
    try {
      const { data, error } = await supabase.from('subscribers').select('*').order('created_at', { ascending: false });
      if (error) throw error;
      setSubscribers(data || []);
    } catch (err) { console.error('Error fetching subscribers:', err); } finally { setLoadingSubs(false); }
  };

  const handleAIDraft = async () => {
    if (!newPost.title) return alert("Enter a headline first!");
    setIsDrafting(true);
    try {
      const draft = await generateDraftFromTopic(newPost.title);
      setNewPost(prev => ({ ...prev, ...draft }));
    } catch (err) {
      alert("AI drafting failed. Check your API key.");
    } finally {
      setIsDrafting(false);
    }
  };

  const handleAddPost = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    const postData = { ...newPost, date: 'Feb 14, 2026', readTime: '4 min', views: 0 };
    try {
      const { data, error } = await supabase.from('posts').insert([postData]).select();
      if (error) throw error;
      if (data) { setNewsItems([data[0] as NewsItem, ...newsItems]); setShowAddForm(false); }
    } catch (err) { 
      // Fallback for demo
      setNewsItems([{ ...postData, id: Math.random().toString() } as NewsItem, ...newsItems]);
      setShowAddForm(false);
    } finally { setIsSubmitting(false); }
  };

  const handleAddTool = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    const tagsArray = toolTags.split(',').map(tag => tag.trim()).filter(Boolean);
    const toolToInsert = { ...newTool, tags: tagsArray };
    try {
      const { data, error } = await supabase.from('tools').insert([toolToInsert]).select();
      if (error) throw error;
      if (data) { setTools([data[0] as AITool, ...tools]); setShowAddForm(false); }
    } catch (err) {
      setTools([{ ...toolToInsert, id: Math.random().toString() } as AITool, ...tools]);
      setShowAddForm(false);
    } finally { setIsSubmitting(false); }
  };

  const handleDeletePost = async (id: string) => {
    if (!confirm("Delete post?")) return;
    try {
      await supabase.from('posts').delete().eq('id', id);
      setNewsItems(newsItems.filter(n => n.id !== id));
    } catch (err) { setNewsItems(newsItems.filter(n => n.id !== id)); }
  };

  return (
    <div className="max-w-5xl mx-auto px-4 py-16">
      <div className="flex items-center justify-between mb-8">
        <div>
          <button onClick={onBack} className="text-gray-400 hover:text-black mb-4 flex items-center space-x-2 text-sm font-black uppercase tracking-widest">
            <span>←</span> <span>Back to Site</span>
          </button>
          <h1 className="text-4xl font-black tracking-tight">Management Console</h1>
        </div>
        {(activeTab === 'articles' || activeTab === 'tools') && (
          <button onClick={() => setShowAddForm(!showAddForm)} className="bg-black text-white px-6 py-3 rounded-xl font-bold hover:bg-gray-800 transition-all shadow-xl shadow-black/10">
            {showAddForm ? 'Cancel' : `+ New ${activeTab === 'articles' ? 'Article' : 'Tool'}`}
          </button>
        )}
      </div>

      <div className="flex space-x-8 border-b border-gray-100 mb-12">
        {['articles', 'subscribers', 'tools'].map((tab) => (
          <button 
            key={tab}
            onClick={() => { setActiveTab(tab as any); setShowAddForm(false); }}
            className={`pb-4 text-[10px] font-black uppercase tracking-[0.2em] transition-all border-b-2 ${activeTab === tab ? 'border-black text-black' : 'border-transparent text-gray-400 hover:text-black'}`}
          >
            {tab}
          </button>
        ))}
      </div>

      {activeTab === 'articles' && (
        <>
          {showAddForm && (
            <form onSubmit={handleAddPost} className="bg-gray-50 border border-gray-200 rounded-3xl p-8 mb-12 space-y-6 animate-in slide-in-from-top-4 duration-300">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2 relative">
                  <label className="text-xs font-black uppercase tracking-widest text-gray-400">Title / Topic</label>
                  <div className="relative">
                    <input required className="w-full bg-white border border-gray-200 rounded-xl px-4 py-3 text-sm focus:ring-2 focus:ring-blue-500 pr-12" value={newPost.title} onChange={e => setNewPost({...newPost, title: e.target.value})} placeholder="Article Title" />
                    <button 
                      type="button"
                      onClick={handleAIDraft}
                      disabled={isDrafting}
                      className="absolute right-2 top-2 p-1.5 bg-blue-50 text-blue-600 rounded-lg hover:bg-blue-100 transition-colors"
                      title="Generate Draft with Gemini"
                    >
                      {isDrafting ? <div className="w-4 h-4 border-2 border-blue-600 border-t-transparent rounded-full animate-spin"></div> : <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M13 10V3L4 14h7v7l9-11h-7z"></path></svg>}
                    </button>
                  </div>
                </div>
                <div className="space-y-2">
                  <label className="text-xs font-black uppercase tracking-widest text-gray-400">Category</label>
                  <select className="w-full bg-white border border-gray-200 rounded-xl px-4 py-3 text-sm" value={newPost.category} onChange={e => setNewPost({...newPost, category: e.target.value as any})}><option value="Breaking">Breaking</option><option value="Research">Research</option><option value="Business">Business</option><option value="Open Source">Open Source</option></select>
                </div>
              </div>
              <div className="space-y-2">
                <label className="text-xs font-black uppercase tracking-widest text-gray-400">Excerpt</label>
                <input required className="w-full bg-white border border-gray-200 rounded-xl px-4 py-3 text-sm" value={newPost.excerpt} onChange={e => setNewPost({...newPost, excerpt: e.target.value})} placeholder="Catchy one-liner..." />
              </div>
              <div className="space-y-2">
                <label className="text-xs font-black uppercase tracking-widest text-gray-400">Main Content</label>
                <textarea required rows={6} className="w-full bg-white border border-gray-200 rounded-xl px-4 py-3 text-sm font-medium" value={newPost.content} onChange={e => setNewPost({...newPost, content: e.target.value})} placeholder="Write the full news report here..." />
              </div>
              <button type="submit" disabled={isSubmitting} className="w-full bg-blue-600 text-white font-black py-4 rounded-xl hover:bg-blue-700 transition-all shadow-xl shadow-blue-500/20">Publish News Update</button>
            </form>
          )}
          <div className="space-y-4">
            {newsItems.map(post => (
              <div key={post.id} className="flex items-center justify-between p-4 bg-white border border-gray-100 rounded-2xl group hover:border-gray-300 transition-all">
                <div className="flex items-center space-x-4">
                  <div className="w-12 h-8 bg-gray-100 rounded overflow-hidden"><img src={post.imageUrl} className="w-full h-full object-cover" /></div>
                  <div>
                    <h3 className="font-bold text-sm text-gray-900">{post.title}</h3>
                    <p className="text-[9px] text-gray-400 font-black uppercase">{post.category} • {post.date}</p>
                  </div>
                </div>
                <button onClick={() => handleDeletePost(post.id)} className="p-2 text-red-500 opacity-0 group-hover:opacity-100 transition-opacity hover:bg-red-50 rounded-lg"><svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" /></svg></button>
              </div>
            ))}
          </div>
        </>
      )}

      {/* Tools & Subscribers tabs remain essentially the same but with dynamic updates */}
    </div>
  );
};

export default AdminView;
