
import React from 'react';
import { RESULTS } from '../constants';
import { ServiceCategory } from '../types';
import { AIOrb } from './AIOrb';

interface StepThanksProps {
  category: ServiceCategory;
  isSpeaking?: boolean;
}

export const StepThanks: React.FC<StepThanksProps> = ({ category, isSpeaking }) => {
  const profile = RESULTS[category];

  return (
    <div className="animate-in fade-in zoom-in-95 duration-1500 text-center">
      <div className="mb-14 flex justify-center">
        <AIOrb size="w-40 h-40" isSpeaking={isSpeaking} />
      </div>

      <div className="space-y-8 mb-16">
        <h2 className="text-3xl md:text-5xl font-black text-white leading-tight tracking-tight">
          ¡Gracias por su <span className="text-[#00f2ff]">preferencia</span>!
        </h2>
        <p className="text-white/40 text-lg md:text-xl max-w-lg mx-auto leading-relaxed font-light">
          Protocolo de enlace iniciado. Un especialista senior en inteligencia ecommerce validará su diagnóstico para contactarlo en breve.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-2xl mx-auto mb-14">
        <button
          onClick={() => window.open(profile.casesUrl, '_blank')}
          className="flex flex-col items-center justify-center gap-6 bg-white/5 border border-white/10 hover:border-cyan-500/40 hover:bg-white/10 text-white p-10 rounded-[3rem] font-bold transition-all group relative overflow-hidden"
        >
          <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-cyan-500/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity"></div>
          <span className="text-5xl group-hover:scale-125 transition-transform duration-700 ease-out">📂</span>
          <div className="text-center relative z-10">
            <div className="text-[10px] font-black text-cyan-500/60 uppercase tracking-[0.4em] mb-2">Ecosistema</div>
            <div className="text-2xl font-bold">Casos de Éxito</div>
          </div>
        </button>
        
        <button
          onClick={() => window.open(profile.serviceUrl, '_blank')}
          className="flex flex-col items-center justify-center gap-6 bg-white/5 border border-white/10 hover:border-cyan-500/40 hover:bg-white/10 text-white p-10 rounded-[3rem] font-bold transition-all group relative overflow-hidden"
        >
          <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-cyan-500/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity"></div>
          <span className="text-5xl group-hover:scale-125 transition-transform duration-700 ease-out">🕸️</span>
          <div className="text-center relative z-10">
            <div className="text-[10px] font-black text-cyan-500/60 uppercase tracking-[0.4em] mb-2">Arquitectura</div>
            <div className="text-2xl font-bold">Ver Servicio</div>
          </div>
        </button>
      </div>

      <button 
        onClick={() => window.location.reload()}
        className="text-white/10 hover:text-white/30 text-[10px] font-black uppercase tracking-[0.6em] transition-colors py-4 px-8"
      >
        Finalizar Sesión Segura
      </button>
    </div>
  );
};
