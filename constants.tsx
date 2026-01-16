
import { Question, ServiceCategory, ResultProfile } from './types';

export const COLORS = {
  bg: '#030712',
  cyan: '#00f2ff',
  proBlue: '#486BF5',
};

export const QUESTIONS: Question[] = [
  {
    id: 1,
    title: 'Análisis de Red: ¿Cómo opera tu arquitectura de venta hoy?',
    type: 'single',
    options: [
      { id: 'A', icon: '💎', label: 'Estructura Inicial', description: 'Buscamos lanzar un ecommerce más robusto o migrar a una arquitectura escalable.' },
      { id: 'B', icon: '⚡', label: 'Rendimiento Acotado', description: 'El ecosistema avanza, pero los sistemas actuales limitan la velocidad operativa.' },
      { id: 'C', icon: '💠', label: 'Inestabilidad Crítica', description: 'Demasiadas incidencias técnicas y caídas en momentos de alta demanda.' },
      { id: 'D', icon: '🌑', label: 'Sistemas Aislados', description: 'Nuestros sistemas centrales no logran una conexión fluida con la tienda.' },
    ]
  },
  {
    id: 2,
    title: '¿Qué patrón detectas en tu flujo de datos?',
    type: 'single',
    options: [
      { id: 'A', icon: '🌀', label: 'Limitación Tecnológica', description: 'Nuestra arquitectura actual impide la expansión y el crecimiento comercial.' },
      { id: 'B', icon: '✨', label: 'Falta de Sincronía', description: 'Los datos no fluyen correctamente entre nuestro ERP/CRM y la plataforma.' },
      { id: 'C', icon: '🛡️', label: 'Deterioro Operativo', description: 'El mantenimiento reactivo consume la mayor parte del tiempo técnico.' },
      { id: 'D', icon: '🛰️', label: 'Vacío Funcional', description: 'Necesitamos capacidades específicas (B2B, Facturación, DNI) que no poseemos.' },
    ]
  },
  {
    id: 3,
    title: '¿Qué módulos de red tienes integrados actualmente?',
    subtitle: 'Escaneando infraestructura técnica de alta fidelidad:',
    type: 'multiple',
    options: [
      { id: 'erp', icon: '🌐', label: 'Sistemas ERP / CRM', description: 'SAP, Oracle, Odoo, Salesforce u otros.' },
      { id: 'vtex', icon: '⚪', label: 'Plataforma VTEX', description: 'Arquitectura nativa diseñada para alta escalabilidad.' },
      { id: 'platform', icon: '📱', label: 'Otras Plataformas', description: 'Shopify, Magento, WooCommerce, etc.' },
      { id: 'nothing', icon: '🔘', label: 'Sin ecosistema digital', description: 'Buscamos iniciar nuestra primera fase de comercio inteligente.' },
    ]
  },
  {
    id: 4,
    title: '¿Cuál es la ventana de ejecución prioritaria?',
    type: 'single',
    options: [
      { id: 'A', icon: '🔥', label: 'Fase Inmediata', description: 'Necesitamos activar soluciones en menos de 30 días.' },
      { id: 'B', icon: '📅', label: 'Ciclo Estratégico', description: 'Planificación para el trimestre en curso.' },
      { id: 'C', icon: '👁️', label: 'Visión a Futuro', description: 'Buscamos consultoría para la evolución del negocio.' },
    ]
  }
];

export const RESULTS: Record<ServiceCategory, ResultProfile> = {
  [ServiceCategory.Desarrollo]: {
    id: ServiceCategory.Desarrollo,
    serviceName: 'Desarrollo Ecommerce',
    captainName: 'Inteligencia de Sistemas',
    title: 'Diagnóstico de la misión',
    icon: '💎',
    narrative: 'Implementar o migrar tu ecommerce a una plataforma más robusta y escalable.',
    businessBenefit: 'Un canal digital preparado para crecer exponencialmente.',
    cta: 'Activar Evolución Digital',
    serviceUrl: 'https://prodequa.com/desarrollo-ecommerce',
    casesUrl: 'https://prodequa.com/casos-de-exito',
  },
  [ServiceCategory.Soporte]: {
    id: ServiceCategory.Soporte,
    serviceName: 'Soporte Ecommerce',
    captainName: 'Guardián de Estabilidad',
    title: 'Diagnóstico de la misión',
    icon: '🛡️',
    narrative: 'Estabilizar y mantener tu ecommerce con soporte continuo de alta precisión.',
    businessBenefit: 'Reducción drástica de incidencias y optimización operativa diaria.',
    cta: 'Habilitar Soporte Experto',
    serviceUrl: 'https://prodequa.com/soporte-y-mantenimiento-vtex',
    casesUrl: 'https://prodequa.com/casos-de-exito',
  },
  [ServiceCategory.Integracion]: {
    id: ServiceCategory.Integracion,
    serviceName: 'Integración Ecommerce',
    captainName: 'Especialista en Sincronía',
    title: 'Diagnóstico de la misión',
    icon: '✨',
    narrative: 'Conectar ERP/CRM con el ecommerce para sincronizar inventario, precios y pedidos de forma automática.',
    businessBenefit: 'Eliminación del error manual y optimización del flujo de trabajo.',
    cta: 'Sincronizar Ecosistema',
    serviceUrl: 'https://prodequa.com/integraciones-ecommerce',
    casesUrl: 'https://prodequa.com/casos-de-exito',
  },
  [ServiceCategory.Soluciones]: {
    id: ServiceCategory.Soluciones,
    serviceName: 'Soluciones Ecommerce',
    captainName: 'Estratega de Crecimiento',
    title: 'Diagnóstico de la misión',
    icon: '⚡',
    narrative: 'Agregar funcionalidades avanzadas (DNI/RUC, facturación, B2B, Cyber Timer) sin alterar el núcleo.',
    businessBenefit: 'Nuevas capacidades estratégicas sin reconstruir la arquitectura.',
    cta: 'Desplegar Soluciones Pro',
    serviceUrl: 'https://prodequa.com/soluciones-ecommerce',
    casesUrl: 'https://prodequa.com/casos-de-exito',
  }
};
