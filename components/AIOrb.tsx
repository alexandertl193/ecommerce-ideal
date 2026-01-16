
import React from 'react';

interface AIOrbProps {
  size?: string;
  isSpeaking?: boolean;
}

export const AIOrb: React.FC<AIOrbProps> = ({ size = "w-32 h-32", isSpeaking = false }) => {
  return (
    <div className={`relative ${size} flex items-center justify-center transition-all duration-700`}>
      {/* Resplandor ambiental exterior */}
      <div className={`absolute inset-0 bg-cyan-400/5 blur-3xl rounded-full transition-opacity duration-1000 ${isSpeaking ? 'opacity-100' : 'opacity-0'}`}></div>
      
      {/* Cuerpo principal de Darky (Orbe) */}
      <div className={`
        relative w-full h-full rounded-full border border-[#00f2ff]/20 z-10 ai-card overflow-hidden
        ${isSpeaking ? 'border-[#00f2ff]/50 shadow-[0_0_20px_rgba(0,242,255,0.15)] scale-105' : 'shadow-inner scale-100'}
        transition-all duration-500
      `}>
        {/* Textura de profundidad y luz */}
        <div className="absolute inset-0 bg-gradient-to-br from-white/10 via-transparent to-black/30 pointer-events-none rounded-full"></div>

        {/* Visualización de voz contenida */}
        <div className={`darky-voice-container ${isSpeaking ? 'speaking' : ''}`}>
          {/* Línea horizontal fija al 100% del ancho interno */}
          <div className="darky-line"></div>
          
          {/* Partículas de flujo de datos */}
          {isSpeaking && (
            <>
              <div className="darky-particle" style={{ animationDelay: '0s', top: '45%' }}></div>
              <div className="darky-particle" style={{ animationDelay: '1.2s', top: '55%' }}></div>
            </>
          )}
        </div>
      </div>
      
      {/* Halo exterior minimalista */}
      <div className={`absolute -inset-1.5 border border-cyan-500/10 rounded-full transition-all duration-700 ${isSpeaking ? 'opacity-100 scale-100 animate-pulse' : 'opacity-0 scale-90'}`}></div>
    </div>
  );
};
