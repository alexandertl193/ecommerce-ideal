
import React from 'react';
import { AIOrb } from './AIOrb';

interface StepIntroProps {
  onStart: () => void;
  isSpeaking?: boolean;
}

export const StepIntro: React.FC<StepIntroProps> = ({ onStart, isSpeaking }) => {
  return (
    <div className="text-center">
      <div className="mb-10 flex justify-center">
        <AIOrb size="w-40 h-40" isSpeaking={isSpeaking} />
      </div>
      <h1 className="text-3xl md:text-5xl font-extrabold text-white mb-6 leading-tight">
        Ecommerce <span className="text-[#00f2ff]">Inteligente</span>
      </h1>
      <p className="text-white/60 text-lg mb-12 max-w-lg mx-auto leading-relaxed">
        Analice su ecosistema digital con nuestra inteligencia asistida. Juntos identificaremos el protocolo preciso para optimizar su canal de ventas.
      </p>
      
      <div className="flex flex-col items-center gap-6">
        <button
          onClick={onStart}
          className="bg-[#00f2ff] hover:bg-[#00d8e4] text-[#030712] px-14 py-6 rounded-2xl font-bold text-xl transition-all shadow-[0_0_30px_rgba(0,242,255,0.3)] hover:shadow-[0_0_40px_rgba(0,242,255,0.5)] transform hover:-translate-y-1 active:translate-y-0"
        >
          Iniciar Diagnóstico de Red
        </button>
        <div className="flex items-center gap-3 text-white/40 text-[10px] font-bold uppercase tracking-[0.3em]">
          <span className="w-2 h-2 rounded-full bg-cyan-500 animate-pulse shadow-[0_0_8px_#00f2ff]"></span>
          Sistemas Listos
        </div>
      </div>
    </div>
  );
};
