
import React, { useState, useEffect } from 'react';
import { QUESTIONS, RESULTS } from './constants';
import { ServiceCategory, ScoreBoard, LeadData } from './types';
import { Layout } from './components/Layout';
import { StepIntro } from './components/StepIntro';
import { StepQuestion } from './components/StepQuestion';
import { StepForm } from './components/StepForm';
import { StepResult } from './components/StepResult';
import { StepThanks } from './components/StepThanks';
import { speak, stopSpeaking, setSpeechListener, initAudio } from './utils/speech';

const App: React.FC = () => {
  const [currentStep, setCurrentStep] = useState<number>(0);
  const [answers, setAnswers] = useState<Record<number, string | string[]>>({});
  const [leadData, setLeadData] = useState<LeadData | null>(null);
  const [isSpeaking, setIsSpeaking] = useState(false);

  useEffect(() => {
    setSpeechListener((speaking) => setIsSpeaking(speaking));
  }, []);

  useEffect(() => {
    let textToSpeak = "";
    if (currentStep === 0) {
      textToSpeak = "Hola, soy Darky, tu asistente de inteligencia artificial. Bienvenido al diagnóstico de Ecommerce Inteligente. Juntos analizaremos su ecosistema digital.";
    } else if (currentStep === 1) {
      textToSpeak = "Por favor, identifíquese para procesar los patrones detectados en su diagnóstico.";
    } else if (currentStep >= 2 && currentStep <= 5) {
      const q = QUESTIONS[currentStep - 2];
      textToSpeak = `${q.title}. ${q.subtitle || ""}`;
    } else if (currentStep === 6) {
      const { primary } = calculateScores();
      const profile = RESULTS[primary];
      textToSpeak = `Análisis finalizado. Protocolo estratégico identificado para ${profile.serviceName}. ${profile.narrative}`;
    } else if (currentStep === 7) {
      textToSpeak = "Operación exitosa. Protocolo de enlace iniciado. Un especialista validará su diagnóstico pronto.";
    }

    if (textToSpeak) {
      speak(textToSpeak);
    }

    return () => stopSpeaking();
  }, [currentStep]);

  const calculateScores = (): { primary: ServiceCategory; secondary?: ServiceCategory } => {
    const scores: ScoreBoard = {
      [ServiceCategory.Desarrollo]: 0,
      [ServiceCategory.Integracion]: 0,
      [ServiceCategory.Soporte]: 0,
      [ServiceCategory.Soluciones]: 0,
    };

    const s1 = answers[2] as string;
    if (s1 === 'A') scores[ServiceCategory.Desarrollo] += 3;
    if (s1 === 'B') { scores[ServiceCategory.Desarrollo] += 2; scores[ServiceCategory.Soluciones] += 1; }
    if (s1 === 'C') scores[ServiceCategory.Soporte] += 3;
    if (s1 === 'D') scores[ServiceCategory.Integracion] += 3;

    const s2 = answers[3] as string;
    if (s2 === 'A') scores[ServiceCategory.Desarrollo] += 3;
    if (s2 === 'B') scores[ServiceCategory.Integracion] += 3;
    if (s2 === 'C') scores[ServiceCategory.Soporte] += 3;
    if (s2 === 'D') scores[ServiceCategory.Soluciones] += 3;

    const s3 = (answers[4] || []) as string[];
    if (s3.includes('erp')) scores[ServiceCategory.Integracion] += 2;
    if (s3.includes('vtex')) scores[ServiceCategory.Soluciones] += 1;
    if (s3.includes('nothing')) scores[ServiceCategory.Desarrollo] += 2;

    const s4 = answers[5] as string;
    const sortedEntries = Object.entries(scores).sort((a, b) => b[1] - a[1]);
    const currentWinner = sortedEntries[0][0] as ServiceCategory;
    if (s4 === 'A') scores[currentWinner] += 2;

    const finalSorted = Object.entries(scores).sort((a, b) => b[1] - a[1]);
    const primary = finalSorted[0][0] as ServiceCategory;
    let secondary: ServiceCategory | undefined = undefined;
    if (finalSorted[1] && (finalSorted[0][1] - finalSorted[1][1] <= 1)) {
        secondary = finalSorted[1][0] as ServiceCategory;
    }
    return { primary, secondary };
  };

  const handleNext = (answer: string | string[]) => {
    stopSpeaking();
    setAnswers(prev => ({ ...prev, [currentStep]: answer }));
    setCurrentStep(prev => prev + 1);
  };

  const handleBack = () => {
    stopSpeaking();
    setCurrentStep(prev => Math.max(0, prev - 1));
  };

  const renderStep = () => {
    if (currentStep === 0) return (
      <StepIntro 
        onStart={async () => { 
          await initAudio();
          stopSpeaking(); 
          setCurrentStep(1); 
        }} 
        isSpeaking={isSpeaking} 
      />
    );
    
    if (currentStep === 1) {
      return (
        <StepForm
          onSubmit={async (data) => {
            await initAudio();
            stopSpeaking();
            setLeadData(data);
            setCurrentStep(2);
          }}
          onBack={handleBack}
          isSpeaking={isSpeaking}
        />
      );
    }

    if (currentStep >= 2 && currentStep <= 5) {
      return (
        <StepQuestion
          question={QUESTIONS[currentStep - 2]}
          onNext={handleNext}
          onBack={handleBack}
          currentStep={currentStep - 1}
          totalSteps={4}
          isSpeaking={isSpeaking}
        />
      );
    }

    if (currentStep === 6) {
      const { primary, secondary } = calculateScores();
      return (
        <StepResult 
          primary={primary} 
          secondary={secondary} 
          leadData={leadData!} 
          onFinish={() => { stopSpeaking(); setCurrentStep(7); }}
          isSpeaking={isSpeaking}
        />
      );
    }

    if (currentStep === 7) {
      const { primary } = calculateScores();
      return <StepThanks category={primary} isSpeaking={isSpeaking} />;
    }

    return null;
  };

  return (
    <Layout currentStep={currentStep > 1 && currentStep < 6 ? currentStep - 1 : 0} totalSteps={4}>
      {renderStep()}
    </Layout>
  );
};

export default App;
