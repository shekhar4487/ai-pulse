
import React, { useState } from 'react';
import { supabase } from '../services/supabase';

const PremiumView: React.FC = () => {
  const [email, setEmail] = useState('');
  const [isSubscribed, setIsSubscribed] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubscribe = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;
    
    setLoading(true);
    setError(null);

    try {
      const { error: sbError } = await supabase
        .from('subscribers')
        .insert([{ email }]);

      if (sbError) throw sbError;
      
      setIsSubscribed(true);
    } catch (err: any) {
      console.error(err);
      setError(err.message || 'Something went wrong. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  if (isSubscribed) {
    return (
      <div className="max-w-xl mx-auto py-32 text-center px-4 animate-in fade-in zoom-in-95 duration-500">
        <div className="w-20 h-20 bg-green-50 text-green-600 rounded-full flex items-center justify-center mx-auto mb-8">
          <svg className="w-10 h-10" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M5 13l4 4L19 7" />
          </svg>
        </div>
        <h2 className="text-3xl font-black mb-4">You're on the list!</h2>
        <p className="text-gray-500 mb-8 font-medium">Check your inbox for a confirmation email. We're excited to have you with us.</p>
        <button 
          onClick={() => window.location.href = '/'} 
          className="bg-black text-white px-8 py-3 rounded-lg font-bold hover:bg-gray-800 transition-all"
        >
          Back to Home
        </button>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto px-4 py-24 text-center">
      <div className="mb-16">
        <h1 className="text-5xl md:text-7xl font-black mb-6 text-gray-900 tracking-tighter leading-tight">
          The only AI newsletter <br/> <span className="text-blue-600">you need.</span>
        </h1>
        <p className="text-xl text-gray-500 max-w-2xl mx-auto font-medium">
          Join 500,000+ professionals staying ahead of the curve. Get the latest AI news, tool reviews, and tutorials delivered to your inbox every week.
        </p>
      </div>

      <div className="max-w-md mx-auto mb-12">
        <form onSubmit={handleSubscribe} className="space-y-4">
          <input 
            type="email" 
            placeholder="Enter your work email" 
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full bg-gray-50 border border-gray-200 rounded-2xl px-6 py-5 text-lg text-gray-900 focus:outline-none focus:ring-4 focus:ring-blue-500/10 focus:border-blue-500 transition-all"
          />
          <button 
            type="submit"
            disabled={loading}
            className="w-full bg-black text-white text-sm font-black uppercase tracking-[0.2em] py-5 rounded-2xl hover:bg-gray-800 transition-all shadow-2xl shadow-black/10 active:scale-[0.98] disabled:opacity-50 flex items-center justify-center"
          >
            {loading ? (
              <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
            ) : "Subscribe Free"}
          </button>
        </form>
        {error && (
          <p className="mt-4 text-red-500 text-xs font-bold uppercase tracking-widest">{error.includes('duplicate') ? 'You are already on our list!' : error}</p>
        )}
        <p className="text-gray-400 text-[10px] mt-6 font-bold uppercase tracking-widest">
          No spam. Ever. Unsubscribe in one click.
        </p>
      </div>

      <div className="pt-24 border-t border-gray-100">
        <h3 className="text-[10px] font-black uppercase tracking-[0.3em] text-gray-400 mb-12">Trusted by professionals at</h3>
        <div className="flex flex-wrap justify-center items-center gap-12 opacity-30 grayscale">
          <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/2/2f/Google_2015_logo.svg/2560px-Google_2015_logo.svg.png" className="h-6" alt="Google" />
          <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/0/05/Facebook_Logo_%282019%29.png/1024px-Facebook_Logo_%282019%29.png" className="h-6" alt="Meta" />
          <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/4/44/Microsoft_logo.svg/2048px-Microsoft_logo.svg.png" className="h-6" alt="Microsoft" />
          <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/5/51/IBM_logo.svg/2560px-IBM_logo.svg.png" className="h-6" alt="IBM" />
        </div>
      </div>
    </div>
  );
};

export default PremiumView;
