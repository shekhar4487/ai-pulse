
import React from 'react';

interface GenericPageViewProps {
  title: string;
  onBack: () => void;
}

const GenericPageView: React.FC<GenericPageViewProps> = ({ title, onBack }) => {
  return (
    <div className="max-w-3xl mx-auto px-4 py-24">
      <button onClick={onBack} className="text-gray-400 hover:text-black mb-8 flex items-center space-x-2 text-sm font-bold">
        <span>←</span> <span>Back</span>
      </button>
      <h1 className="text-4xl font-black mb-8">{title}</h1>
      <div className="prose prose-lg text-gray-600 space-y-6 leading-relaxed">
        <p>
          Welcome to the <strong>{title}</strong> page for AI Pulse. This section is currently being updated with our latest documentation and community guidelines for {new Date().getFullYear()}.
        </p>
        <p>
          At AI Pulse, we are committed to transparency and providing the most accurate information to our 500k+ subscribers. If you have specific questions regarding this section, please reach out to our support team.
        </p>
        <div className="bg-gray-50 p-8 rounded-2xl border border-gray-100">
          <h3 className="font-bold text-gray-900 mb-2">Notice</h3>
          <p className="text-sm">This is a placeholder for the official {title.toLowerCase()} document. In a production environment, this would be populated via a CMS or static legal documents.</p>
        </div>
      </div>
    </div>
  );
};

export default GenericPageView;
