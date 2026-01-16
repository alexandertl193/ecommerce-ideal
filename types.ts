
export enum ServiceCategory {
  Desarrollo = 'Desarrollo',
  Integracion = 'Integracion',
  Soporte = 'Soporte',
  Soluciones = 'Soluciones'
}

export type ScoreBoard = Record<ServiceCategory, number>;

export interface QuestionOption {
  id: string;
  label: string;
  description: string;
  icon: string;
}

export interface Question {
  id: number;
  title: string;
  subtitle?: string;
  type: 'single' | 'multiple';
  options: QuestionOption[];
}

export interface LeadData {
  email: string;
  whatsapp?: string;
}

export interface ResultProfile {
  id: ServiceCategory;
  title: string;
  serviceName: string;
  captainName: string;
  narrative: string;
  businessBenefit: string;
  cta: string;
  serviceUrl: string;
  casesUrl: string;
  icon: string;
}

// AppStatus enum required for component state tracking
export enum AppStatus {
  IDLE = 'IDLE',
  LOADING = 'LOADING',
  ERROR = 'ERROR'
}

// Message interface required for chat history
export interface Message {
  role: 'user' | 'assistant';
  content: string;
  timestamp: number;
}
