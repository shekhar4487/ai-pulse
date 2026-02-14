
import React from 'react';

const SponsorshipView: React.FC = () => {
  return (
    <div className="max-w-4xl mx-auto px-4 py-24 text-center">
      <h1 className="text-5xl font-extrabold mb-8 tracking-tight">Partner with AI Insight</h1>
      <p className="text-xl text-gray-400 mb-12 leading-relaxed">
        Reach 500k+ high-intent AI users, developers, and founders. 
        We offer the most effective distribution channel for your AI product.
      </p>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-20">
        {[
          { label: 'Subscribers', value: '500,000+' },
          { label: 'Avg. Open Rate', value: '45%' },
          { label: 'Monthly Website Visits', value: '1.2M' },
        ].map(stat => (
          <div key={stat.label} className="glass-morphism p-8 rounded-3xl">
            <div className="text-3xl font-bold text-blue-400 mb-1">{stat.value}</div>
            <div className="text-gray-500 text-sm uppercase tracking-widest">{stat.label}</div>
          </div>
        ))}
      </div>

      <div className="bg-gray-900/50 border border-gray-800 rounded-3xl p-12 text-left">
        <h2 className="text-3xl font-bold mb-6">Interested in advertising?</h2>
        <form className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <label className="text-sm font-semibold text-gray-400">Your Name</label>
              <input type="text" className="w-full bg-gray-900 border border-gray-700 rounded-xl px-4 py-3 text-white focus:outline-none focus:ring-2 focus:ring-blue-500" placeholder="John Doe" />
            </div>
            <div className="space-y-2">
              <label className="text-sm font-semibold text-gray-400">Company Name</label>
              <input type="text" className="w-full bg-gray-900 border border-gray-700 rounded-xl px-4 py-3 text-white focus:outline-none focus:ring-2 focus:ring-blue-500" placeholder="AI Corp" />
            </div>
          </div>
          <div className="space-y-2">
            <label className="text-sm font-semibold text-gray-400">Work Email</label>
            <input type="email" className="w-full bg-gray-900 border border-gray-700 rounded-xl px-4 py-3 text-white focus:outline-none focus:ring-2 focus:ring-blue-500" placeholder="john@aicorp.com" />
          </div>
          <div className="space-y-2">
            <label className="text-sm font-semibold text-gray-400">Interested in...</label>
            <select className="w-full bg-gray-900 border border-gray-700 rounded-xl px-4 py-3 text-white focus:outline-none focus:ring-2 focus:ring-blue-500">
              <option>Newsletter Sponsorship</option>
              <option>Tool Directory Placement</option>
              <option>Custom Content Partnership</option>
            </select>
          </div>
          <button type="button" className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-4 rounded-xl transition-all shadow-xl shadow-blue-500/20">
            Get Media Kit & Pricing
          </button>
        </form>
      </div>
    </div>
  );
};

export default SponsorshipView;
