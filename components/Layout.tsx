
import React from 'react';
import { View } from '../App';

interface LayoutProps {
  children: React.ReactNode;
  currentView: View;
  onNavigate: (view: View) => void;
  onOpenLogin: () => void;
}

const Layout: React.FC<LayoutProps> = ({ children, currentView, onNavigate, onOpenLogin }) => {
  return (
    <div className="min-h-screen flex flex-col bg-white">
      {/* Top Header */}
      <nav className="border-b border-gray-100 py-4 bg-white/80 backdrop-blur-md sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 flex justify-between items-center">
          <button onClick={() => onNavigate('home')} className="flex items-center space-x-2 focus:outline-none group">
            <div className="w-8 h-8 bg-black rounded flex items-center justify-center font-black text-white text-lg transition-transform group-hover:scale-110">P</div>
            <span className="text-xl font-black tracking-tight text-black">
              AI Pulse
            </span>
          </button>
          
          <div className="hidden md:flex items-center space-x-6 text-[10px] font-black uppercase tracking-widest text-gray-400">
            <button onClick={() => onNavigate('home')} className={`hover:text-black transition-colors ${currentView === 'home' ? 'text-black' : ''}`}>Daily News</button>
            <button onClick={() => onNavigate('tools')} className={`hover:text-black transition-colors ${currentView === 'tools' ? 'text-black' : ''}`}>AI Tools</button>
            <button onClick={() => onNavigate('premium')} className={`hover:text-black transition-colors ${currentView === 'premium' ? 'text-black' : ''}`}>Courses</button>
            <button onClick={() => onNavigate('media-kit')} className={`hover:text-black transition-colors ${currentView === 'media-kit' ? 'text-black' : ''}`}>Advertise</button>
          </div>

          <div className="flex items-center space-x-4">
            <button 
              onClick={onOpenLogin}
              className="text-[10px] font-black uppercase tracking-widest text-gray-500 hover:text-black transition-colors"
            >
              Login
            </button>
            <button 
              onClick={() => onNavigate('premium')}
              className="text-[10px] font-black uppercase tracking-widest bg-black text-white px-5 py-2.5 rounded hover:bg-gray-800 transition-all shadow-lg shadow-black/10 active:scale-95"
            >
              Subscribe
            </button>
          </div>
        </div>
      </nav>

      <main className="flex-grow">
        {children}
      </main>

      {/* Footer */}
      <footer className="bg-white border-t border-gray-100 py-24">
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-16 text-left">
            <div className="col-span-1 md:col-span-1">
              <div className="flex items-center space-x-2 mb-8">
                <div className="w-6 h-6 bg-black rounded flex items-center justify-center font-black text-white text-xs">P</div>
                <span className="text-lg font-black text-black">AI Pulse</span>
              </div>
              <p className="text-gray-500 text-sm leading-relaxed mb-8 font-medium">
                Get the latest AI news, understand why it matters, and learn how to apply it to your work.
              </p>
              <div className="flex space-x-6">
                <a href="https://twitter.com" target="_blank" className="text-gray-400 hover:text-black transition-colors text-[10px] font-black uppercase tracking-widest">X</a>
                <a href="https://linkedin.com" target="_blank" className="text-gray-400 hover:text-black transition-colors text-[10px] font-black uppercase tracking-widest">LinkedIn</a>
              </div>
            </div>
            <div>
              <h4 className="font-black text-[10px] uppercase tracking-widest text-gray-900 mb-8">Stay Updated</h4>
              <ul className="space-y-4 text-gray-400 text-[10px] font-black uppercase tracking-widest">
                <li><button onClick={() => onNavigate('home')} className="hover:text-black transition-colors">Daily News</button></li>
                <li><button onClick={() => onNavigate('premium')} className="hover:text-black transition-colors">Courses</button></li>
                <li><button onClick={() => onNavigate('tools')} className="hover:text-black transition-colors">Tools Directory</button></li>
                <li><button onClick={() => onNavigate('tutorials')} className="hover:text-black transition-colors">Tutorials</button></li>
              </ul>
            </div>
            <div>
              <h4 className="font-black text-[10px] uppercase tracking-widest text-gray-900 mb-8">Company</h4>
              <ul className="space-y-4 text-gray-400 text-[10px] font-black uppercase tracking-widest">
                <li><button onClick={() => onNavigate('admin')} className="hover:text-black transition-colors text-blue-600">Manage Content</button></li>
                <li><button onClick={() => onNavigate('media-kit')} className="hover:text-black transition-colors">Advertise</button></li>
                <li><button onClick={() => onNavigate('about')} className="hover:text-black transition-colors">About Us</button></li>
                <li><button onClick={() => onNavigate('contact')} className="hover:text-black transition-colors">Contact</button></li>
                <li><button onClick={() => onNavigate('careers')} className="hover:text-black transition-colors">Careers</button></li>
              </ul>
            </div>
            <div>
              <h4 className="font-black text-[10px] uppercase tracking-widest text-gray-900 mb-8">Legal</h4>
              <ul className="space-y-4 text-gray-400 text-[10px] font-black uppercase tracking-widest">
                <li><button onClick={() => onNavigate('privacy')} className="hover:text-black transition-colors">Privacy Policy</button></li>
                <li><button onClick={() => onNavigate('terms')} className="hover:text-black transition-colors">Terms & Conditions</button></li>
                <li><button onClick={() => onNavigate('cookies')} className="hover:text-black transition-colors">Cookie Policy</button></li>
              </ul>
            </div>
          </div>
          <div className="mt-24 pt-8 border-t border-gray-100 text-center text-gray-400 text-[9px] font-black uppercase tracking-[0.2em]">
            © {new Date().getFullYear()} AI PULSE, INC. ALL RIGHTS RESERVED.
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Layout;
