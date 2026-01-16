
import React, { useState } from 'react';
import { LeadData } from '../types';
import { AIOrb } from './AIOrb';

interface StepFormProps {
  onSubmit: (data: LeadData) => void;
  onBack: () => void;
  isSpeaking?: boolean;
}

export const StepForm: React.FC<StepFormProps> = ({ onSubmit, onBack, isSpeaking }) => {
  const [formData, setFormData] = useState<LeadData>({
    email: '',
    whatsapp: '',
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(formData);
  };

  return (
    <div className="animate-in fade-in slide-in-from-bottom-4 duration-1000">
      <div className="mb-12 flex flex-col items-center">
        <div className="mb-6">
          <AIOrb size="w-24 h-24" isSpeaking={isSpeaking} />
        </div>
        <h2 className="text-3xl font-extrabold text-white mb-3 tracking-tight text-center">
          Identificación de Usuario
        </h2>
        <p className="text-white/40 text-sm max-w-xs mx-auto font-light leading-relaxed text-center">
          Inicie sesión de red corporativa para procesar los patrones detectados en su diagnóstico.
        </p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-8 max-w-sm mx-auto">
        <div className="space-y-6">
          <div className="relative group">
            <label className="block text-[10px] font-black text-cyan-500/60 uppercase mb-2 tracking-[0.4em]">
              Canal de Enlace (E-mail)
            </label>
            <input
              required
              type="email"
              className="w-full bg-white/5 border border-white/10 rounded-2xl p-5 text-white focus:border-cyan-500 focus:bg-white/10 outline-none transition-all placeholder:text-white/10 text-lg font-medium"
              placeholder="piloto@empresa.com"
              value={formData.email}
              onChange={e => setFormData({...formData, email: e.target.value})}
            />
          </div>
          
          <div className="relative group">
            <label className="block text-[10px] font-black text-white/30 uppercase mb-2 tracking-[0.4em]">
              Red Móvil (Opcional)
            </label>
            <input
              type="tel"
              className="w-full bg-white/5 border border-white/10 rounded-2xl p-5 text-white focus:border-cyan-500 focus:bg-white/10 outline-none transition-all placeholder:text-white/10 text-lg font-medium"
              placeholder="+51 999 999 999"
              value={formData.whatsapp}
              onChange={e => setFormData({...formData, whatsapp: e.target.value})}
            />
          </div>
        </div>

        <div className="pt-10 flex flex-col items-center gap-6">
          <button
            type="submit"
            className="w-full bg-[#00f2ff] hover:bg-[#00d8e4] text-[#030712] px-8 py-6 rounded-2xl font-black text-xl transition-all shadow-[0_0_30px_rgba(0,242,255,0.2)] hover:scale-[1.03] active:scale-100"
          >
            ACTIVAR PROTOCOLO
          </button>
          <button 
            type="button"
            onClick={onBack}
            className="text-white/20 hover:text-white/50 text-[10px] font-black uppercase tracking-[0.4em] transition-colors"
          >
            Abortar Conexión
          </button>
        </div>
      </form>
    </div>
  );
};
