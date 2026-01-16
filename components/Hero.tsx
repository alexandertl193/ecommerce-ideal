
import React from 'react';

interface HeroProps {
  onCtaClick: () => void;
}

export const Hero: React.FC<HeroProps> = ({ onCtaClick }) => {
  return (
    <div className="text-center max-w-4xl mx-auto">
      <div className="inline-flex items-center px-3 py-1 rounded-full bg-zinc-900 border border-zinc-800 text-zinc-400 text-xs font-medium mb-8 animate-fade-in">
        <span className="w-2 h-2 rounded-full bg-indigo-500 mr-2 animate-pulse"></span>
        v1.0.0 Now Available
      </div>
      
      <h1 className="text-5xl md:text-7xl font-bold tracking-tight text-white mb-6">
        Design for <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 via-purple-400 to-pink-400">Intelligence.</span>
      </h1>
      
      <p className="text-lg md:text-xl text-zinc-400 mb-10 leading-relaxed max-w-2xl mx-auto">
        Lumina is a blank canvas for your next AI-powered masterpiece. 
        Elegantly structured, blazingly fast, and infinitely scalable.
      </p>
      
      <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
        <button 
          onClick={onCtaClick}
          className="w-full sm:w-auto px-8 py-4 bg-white text-black font-semibold rounded-2xl hover:scale-105 active:scale-95 transition-all shadow-lg shadow-white/5"
        >
          Try the Assistant
        </button>
        <button className="w-full sm:w-auto px-8 py-4 bg-zinc-900 text-white font-semibold border border-zinc-800 rounded-2xl hover:bg-zinc-800 transition-all">
          View Components
        </button>
      </div>

      <div className="mt-20 relative">
        <div className="absolute inset-0 bg-gradient-to-b from-transparent to-zinc-950 pointer-events-none z-10"></div>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-3xl mx-auto opacity-40">
           {[...Array(4)].map((_, i) => (
             <div key={i} className="h-32 bg-zinc-900 rounded-2xl border border-zinc-800 animate-pulse" style={{ animationDelay: `${i * 150}ms` }}></div>
           ))}
        </div>
      </div>
    </div>
  );
};
