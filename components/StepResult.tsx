
import React from 'react';
import { RESULTS } from '../constants';
import { ServiceCategory, LeadData } from '../types';
import { AIOrb } from './AIOrb';

interface StepResultProps {
  primary: ServiceCategory;
  secondary?: ServiceCategory;
  leadData: LeadData;
  onFinish: () => void;
  isSpeaking?: boolean;
}

export const StepResult: React.FC<StepResultProps> = ({ primary, secondary, leadData, onFinish, isSpeaking }) => {
  const profile = RESULTS[primary];

  const handlePrimaryAction = () => {
    window.open('https://prodequa.com/conversemos', '_blank');
    onFinish();
  };

  return (
    <div className="animate-in zoom-in-95 duration-1000">
      <div className="text-center mb-12 relative">
        <div className="flex justify-center mb-6">
          <AIOrb size="w-24 h-24" isSpeaking={isSpeaking} />
        </div>
        <div className="inline-block bg-[#00f2ff]/5 px-5 py-2 rounded-full text-[#00f2ff] text-[10px] font-black uppercase tracking-[0.4em] mb-4 border border-[#00f2ff]/20">
          Diagnóstico Inteligente Procesado
        </div>
        <h2 className="text-3xl md:text-4xl font-black text-white mb-3 tracking-tight">
          Protocolo: <span className="text-[#00f2ff]">Escalabilidad</span>
        </h2>
        <p className="text-white/40 text-sm font-medium tracking-wide">
          Sincronizando coordenadas para <span className="text-white/60">{leadData.email.split('@')[0]}</span>
        </p>
      </div>

      {/* Result Card */}
      <div className="ai-card border-white/5 rounded-[2.5rem] p-10 mb-10 relative overflow-hidden transition-all duration-700">
        <div className="flex items-center gap-6 mb-10 border-b border-white/5 pb-10 relative">
            <div className="w-20 h-20 bg-white/5 rounded-3xl flex items-center justify-center text-5xl shadow-inner relative group">
                <span className="relative z-10">{profile.icon}</span>
                <div className="absolute inset-0 bg-cyan-500/10 blur-md rounded-3xl group-hover:bg-cyan-500/20 transition-all"></div>
            </div>
            <div>
                <h4 className="text-[10px] font-black text-cyan-500/70 uppercase tracking-[0.3em] mb-2">Servicio Estratégico:</h4>
                <p className="text-3xl font-bold text-white leading-tight">{profile.serviceName}</p>
            </div>
        </div>
        
        <div className="space-y-10">
          <section className="relative">
            <div className="flex items-center gap-3 mb-4">
                <div className="w-2 h-2 rounded-full bg-cyan-500 animate-pulse"></div>
                <h4 className="text-[10px] font-black text-white/30 uppercase tracking-[0.4em] leading-none">Diagnóstico del Sistema:</h4>
            </div>
            <div className="pl-6 border-l border-cyan-500/20">
                <p className="text-white text-xl md:text-2xl leading-relaxed font-medium italic opacity-90">
                  "{profile.narrative}"
                </p>
            </div>
          </section>

          <section className="bg-white/5 p-8 rounded-[2rem] border border-white/5 shadow-2xl relative overflow-hidden group">
            <div className="absolute top-0 right-0 w-32 h-32 bg-cyan-500/5 blur-3xl rounded-full group-hover:bg-cyan-500/10 transition-all"></div>
            <h4 className="text-[10px] font-black text-gray-500 uppercase tracking-[0.4em] mb-4">Impacto Proyectado:</h4>
            <p className="text-white/80 leading-relaxed font-bold text-xl relative z-10">
              {profile.businessBenefit}
            </p>
          </section>
        </div>
      </div>

      {/* Call to Action Section */}
      <div className="flex flex-col items-center gap-10">
        <div className="w-full">
            <button
              onClick={handlePrimaryAction}
              className="group w-full bg-[#00f2ff] hover:bg-white text-[#030712] px-10 py-8 rounded-[2rem] font-black text-2xl transition-all shadow-[0_0_40px_rgba(0,242,255,0.2)] transform hover:scale-[1.02] active:scale-95 flex items-center justify-center gap-5"
            >
              <span>{profile.cta}</span>
              <svg className="w-10 h-10 group-hover:translate-x-3 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M17 8l4 4m0 0l-4 4m4-4H3"></path>
              </svg>
            </button>
        </div>

        <button 
          onClick={() => window.location.reload()}
          className="text-white/10 hover:text-white/40 text-[10px] font-black uppercase tracking-[0.5em] transition-colors"
        >
          Reiniciar Ciclo de Análisis
        </button>
      </div>
    </div>
  );
};
