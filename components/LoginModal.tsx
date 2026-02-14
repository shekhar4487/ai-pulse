
import React from 'react';

interface LoginModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const LoginModal: React.FC<LoginModalProps> = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
      <div 
        className="absolute inset-0 bg-black/80 backdrop-blur-sm"
        onClick={onClose}
      ></div>
      <div className="relative glass-morphism w-full max-w-md rounded-3xl p-8 border border-gray-700 shadow-2xl animate-in zoom-in-95 duration-200">
        <button 
          onClick={onClose}
          className="absolute top-6 right-6 text-gray-500 hover:text-white transition-colors"
        >
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"></path></svg>
        </button>

        <div className="text-center mb-10">
          <div className="w-12 h-12 bg-blue-600 rounded-xl flex items-center justify-center font-bold text-white mx-auto mb-4 text-xl">R</div>
          <h2 className="text-2xl font-bold text-white">Welcome back</h2>
          <p className="text-gray-400 text-sm">Enter your credentials to access your Pro dashboard.</p>
        </div>

        <form className="space-y-4">
          <div className="space-y-2">
            <label className="text-xs font-bold uppercase tracking-widest text-gray-500">Email Address</label>
            <input type="email" className="w-full bg-gray-900 border border-gray-800 rounded-xl px-4 py-3 text-white focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all" placeholder="name@email.com" />
          </div>
          <div className="space-y-2">
            <label className="text-xs font-bold uppercase tracking-widest text-gray-500">Password</label>
            <input type="password" className="w-full bg-gray-900 border border-gray-800 rounded-xl px-4 py-3 text-white focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all" placeholder="••••••••" />
          </div>
          <div className="flex items-center justify-between text-xs mb-6">
            <label className="flex items-center space-x-2 text-gray-400 cursor-pointer">
              <input type="checkbox" className="rounded bg-gray-900 border-gray-700" />
              <span>Remember me</span>
            </label>
            <a href="#" className="text-blue-400 hover:underline">Forgot password?</a>
          </div>
          <button type="button" onClick={onClose} className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-3.5 rounded-xl transition-all shadow-lg shadow-blue-500/20">
            Sign In
          </button>
        </form>

        <div className="mt-8 pt-8 border-t border-gray-800 text-center">
          <p className="text-sm text-gray-500">Don't have an account? <button className="text-blue-400 font-bold hover:underline">Join free today</button></p>
        </div>
      </div>
    </div>
  );
};

export default LoginModal;
