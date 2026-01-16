
import React, { useState } from 'react';
import { Question } from '../types';
import { AIOrb } from './AIOrb';

interface StepQuestionProps {
  question: Question;
  onNext: (answer: string | string[]) => void;
  onBack: () => void;
  currentStep: number;
  totalSteps: number;
  isSpeaking?: boolean;
}

export const StepQuestion: React.FC<StepQuestionProps> = ({ question, onNext, onBack, currentStep, totalSteps, isSpeaking }) => {
  const [selected, setSelected] = useState<string | string[]>(question.type === 'multiple' ? [] : '');

  const handleSelect = (id: string) => {
    if (question.type === 'single') {
      setSelected(id);
      // Reduced delay from 400ms to 150ms for snappier transitions and immediate voice start
      setTimeout(() => onNext(id), 150);
    } else {
      setSelected((prev) => {
        const arr = prev as string[];
        if (arr.includes(id)) return arr.filter(i => i !== id);
        return [...arr, id];
      });
    }
  };

  const isSelected = (id: string) => {
    if (Array.isArray(selected)) return selected.includes(id);
    return selected === id;
  };

  return (
    <div className="mt-4">
      <div className="flex items-center gap-8 mb-8">
        <div className="flex-shrink-0">
          <AIOrb size="w-16 h-16" isSpeaking={isSpeaking} />
        </div>
        <h2 className="text-2xl md:text-3xl font-bold text-white leading-tight">
          {question.title}
        </h2>
      </div>

      {question.subtitle && (
        <p className="text-white/40 text-sm mb-10 border-l border-[#00f2ff]/40 pl-5 italic">{question.subtitle}</p>
      )}

      <div className="grid grid-cols-1 gap-5 mt-8">
        {question.options.map((option) => (
          <button
            key={option.id}
            onClick={() => handleSelect(option.id)}
            className={`
              flex items-start text-left p-6 rounded-[1.5rem] border transition-all group relative overflow-hidden
              ${isSelected(option.id) 
                ? 'border-[#00f2ff]/40 bg-[#00f2ff]/10 shadow-[0_0_20px_rgba(0,242,255,0.05)]' 
                : 'border-white/5 bg-white/5 hover:border-white/10 hover:bg-white/10'}
            `}
          >
            {isSelected(option.id) && (
                <div className="absolute top-0 left-0 h-full w-1 bg-[#00f2ff] shadow-[0_0_10px_#00f2ff]"></div>
            )}
            <span className="text-3xl mr-6 opacity-70 group-hover:scale-110 transition-transform flex items-center justify-center w-10">
              {option.icon}
            </span>
            <div className="flex-1">
              <div className={`font-bold text-lg mb-1 ${isSelected(option.id) ? 'text-[#00f2ff]' : 'text-white'}`}>
                {option.label}
              </div>
              <div className="text-sm text-white/40 leading-relaxed font-light">
                {option.description}
              </div>
            </div>
            {isSelected(option.id) && (
                <div className="ml-2 text-[#00f2ff] animate-in zoom-in-50 duration-300">
                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M5 13l4 4L19 7"></path></svg>
                </div>
            )}
          </button>
        ))}
      </div>

      <div className="mt-14 flex justify-between items-center">
        <button 
          onClick={onBack}
          className="text-white/30 hover:text-white/60 text-xs font-bold uppercase tracking-[0.3em] transition-all flex items-center gap-3"
        >
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 19l-7-7 7-7"></path></svg>
          Reversar
        </button>
        
        {question.type === 'multiple' && (
          <button
            disabled={(selected as string[]).length === 0}
            onClick={() => onNext(selected)}
            className="bg-white/10 hover:bg-[#00f2ff] hover:text-[#030712] disabled:opacity-20 text-white px-12 py-4 rounded-xl font-bold transition-all border border-white/5 hover:border-transparent"
          >
            Siguiente Fase
          </button>
        )}
      </div>
    </div>
  );
};
