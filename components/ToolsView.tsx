
import React, { useState, useMemo } from 'react';
import ToolCard from './ToolCard';
import { AITool } from '../types';
import { compareTools } from '../services/geminiService';

interface ToolsViewProps {
  tools: AITool[];
}

const ToolsView: React.FC<ToolsViewProps> = ({ tools }) => {
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
  const [comparisonItems, setComparisonItems] = useState<AITool[]>([]);
  const [comparisonResult, setComparisonResult] = useState<string | null>(null);
  const [isComparing, setIsComparing] = useState(false);

  const toggleCategory = (cat: string) => {
    setSelectedCategories(prev => 
      prev.includes(cat) ? prev.filter(c => c !== cat) : [...prev, cat]
    );
  };

  const handleSelectForCompare = (tool: AITool) => {
    if (comparisonItems.find(t => t.id === tool.id)) {
      setComparisonItems(prev => prev.filter(t => t.id !== tool.id));
      return;
    }
    if (comparisonItems.length < 2) {
      setComparisonItems(prev => [...prev, tool]);
    }
  };

  const runComparison = async () => {
    if (comparisonItems.length !== 2) return;
    setIsComparing(true);
    setComparisonResult(null);
    try {
      const result = await compareTools(comparisonItems[0], comparisonItems[1]);
      setComparisonResult(result || "Comparison failed.");
    } catch (err) {
      setComparisonResult("Unable to generate comparison.");
    } finally {
      setIsComparing(false);
    }
  };

  const filteredTools = useMemo(() => {
    return tools.filter(tool => {
      return selectedCategories.length === 0 || selectedCategories.includes(tool.category);
    });
  }, [selectedCategories, tools]);

  return (
    <div className="max-w-7xl mx-auto px-4 py-16">
      <div className="mb-16 border-b-4 border-black pb-12">
        <h1 className="text-6xl font-black mb-4 tracking-tighter uppercase italic">Tools Directory</h1>
        <p className="text-gray-500 max-w-2xl font-bold text-xl uppercase">We audit the machines so you can stay human.</p>
      </div>

      {/* Comparison Drawer */}
      {comparisonItems.length > 0 && (
        <div className="fixed bottom-0 left-0 right-0 bg-black text-white p-6 z-[60] border-t-4 border-yellow-400 animate-in slide-in-from-bottom-full">
          <div className="max-w-7xl mx-auto flex items-center justify-between">
            <div className="flex items-center space-x-8">
              <span className="text-xs font-black uppercase tracking-widest text-yellow-400">Tool Battle:</span>
              <div className="flex -space-x-4">
                {comparisonItems.map(t => (
                  <div key={t.id} className="w-12 h-12 rounded-none border-2 border-white bg-white overflow-hidden">
                    <img src={t.imageUrl} className="w-full h-full object-cover" alt="" />
                  </div>
                ))}
              </div>
              <span className="font-black uppercase text-sm">
                {comparisonItems[0]?.name} {comparisonItems.length === 2 ? `vs ${comparisonItems[1]?.name}` : '(Select one more)'}
              </span>
            </div>
            <div className="flex space-x-4">
              <button onClick={() => setComparisonItems([])} className="text-xs font-black uppercase tracking-widest hover:text-gray-400">Clear</button>
              <button 
                onClick={runComparison}
                disabled={comparisonItems.length < 2 || isComparing}
                className="bg-yellow-400 text-black px-8 py-3 font-black uppercase tracking-widest disabled:opacity-50"
              >
                {isComparing ? 'ANALYZING...' : 'COMPARE NOW'}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Comparison Modal */}
      {comparisonResult && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
          <div className="absolute inset-0 bg-black/90 backdrop-blur-sm" onClick={() => setComparisonResult(null)}></div>
          <div className="relative bg-white border-4 border-black w-full max-w-2xl p-12 brutalist-shadow">
            <h2 className="text-4xl font-black mb-8 uppercase italic underline decoration-yellow-400">The Pulse Verdict</h2>
            <div className="prose max-w-none text-black font-bold whitespace-pre-line leading-relaxed mb-8">
              {comparisonResult}
            </div>
            <button onClick={() => setComparisonResult(null)} className="w-full bg-black text-white py-4 font-black uppercase tracking-widest">Close Analysis</button>
          </div>
        </div>
      )}

      <div className="flex flex-col md:flex-row gap-16">
        <div className="w-full md:w-64 space-y-12">
          <div>
            <h3 className="text-xs font-black uppercase tracking-widest text-black mb-8 border-b-2 border-black pb-2">CATEGORIES</h3>
            <div className="space-y-4">
              {['Productivity', 'Image', 'Coding', 'Video', 'Marketing'].map(cat => (
                <button 
                  key={cat} 
                  onClick={() => toggleCategory(cat)}
                  className={`block w-full text-left font-black uppercase text-sm tracking-widest transition-colors ${selectedCategories.includes(cat) ? 'text-blue-600 underline' : 'text-gray-400 hover:text-black'}`}
                >
                  {cat}
                </button>
              ))}
            </div>
          </div>
        </div>

        <div className="flex-grow">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10">
            {filteredTools.map((tool) => (
              <div key={tool.id} className="relative">
                <ToolCard tool={tool} />
                <button 
                  onClick={() => handleSelectForCompare(tool)}
                  className={`absolute top-4 right-4 text-[9px] font-black uppercase tracking-widest px-2 py-1 border-2 border-black transition-all ${comparisonItems.find(t => t.id === tool.id) ? 'bg-black text-white' : 'bg-white text-black hover:bg-gray-100'}`}
                >
                  {comparisonItems.find(t => t.id === tool.id) ? 'Selected' : 'Compare'}
                </button>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ToolsView;
