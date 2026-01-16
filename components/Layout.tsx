
import React from 'react';

interface LayoutProps {
  children: React.ReactNode;
  currentStep: number;
  totalSteps: number;
}

export const Layout: React.FC<LayoutProps> = ({ children, currentStep, totalSteps }) => {
  const showProgress = currentStep >= 1 && currentStep <= 4;
  const progress = (currentStep / 4) * 100;

  return (
    <div className="flex flex-col items-center justify-center min-h-screen px-4 py-8 relative">
      <div className="w-full max-w-2xl ai-card rounded-[2rem] p-8 md:p-12 relative overflow-hidden transition-all duration-500 ai-border-glow">
        
        {showProgress && (
          <div className="absolute top-0 left-0 w-full h-1 bg-white/5">
            <div 
              className="h-full bg-[#00f2ff] transition-all duration-700 ease-out shadow-[0_0_15px_rgba(0,242,255,0.8)]"
              style={{ width: `${progress}%` }}
            />
            <div className="absolute top-4 left-6 flex items-center gap-2">
                <div className="w-2 h-2 rounded-full bg-[#00f2ff] animate-pulse"></div>
                <span className="text-[10px] font-bold text-[#00f2ff] uppercase tracking-[0.2em] opacity-80">
                  Escaneo en curso: {currentStep} / 4
                </span>
            </div>
          </div>
        )}

        <main className="relative z-10">
          {children}
        </main>
      </div>

      <div className="mt-8 text-center">
        <div className="text-white/20 text-[10px] font-bold uppercase tracking-[0.3em] mb-2">
          Protocolo de Inteligencia Artificial v3.1
        </div>
        <div className="flex items-center gap-3 opacity-40">
            <span className="h-[1px] w-8 bg-white/20"></span>
            <span className="text-white text-xs font-bold">Prodequa Digital Systems</span>
            <span className="h-[1px] w-8 bg-white/20"></span>
        </div>
      </div>
    </div>
  );
};
