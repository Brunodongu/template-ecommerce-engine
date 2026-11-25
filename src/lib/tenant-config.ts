export interface TenantServiceItem {
  id: string;
  name: string;
  category: string;
  priceEstimate: string;
  duration: string;
  badge?: string;
  description: string;
}

export interface TenantTestimonialItem {
  id: string;
  author: string;
  roleOrCompany: string;
  rating: number;
  comment: string;
  date: string;
  visible: boolean;
}

export interface TenantFAQItem {
  id: string;
  question: string;
  answer: string;
  category?: string;
  visible: boolean;
}

export interface TenantConfig {
  clientId: string | null;
  slug: string;
  brandName: string;
  industry: string;
  primaryColor: string;
  tagline: string;
  description: string;
  phone: string;
  email: string;
  address: string;
  whatsappNumber: string;
  adminPin: string;
  services: TenantServiceItem[];
  testimonials: TenantTestimonialItem[];
  faqs: TenantFAQItem[];
}

export const TENANT_CONFIG: TenantConfig = {
  clientId: null,
  slug: "default",
  brandName: "Portal Corporativo",
  industry: "Servicios Profesionales",
  primaryColor: "#583EBF",
  tagline: "Soluciones Profesionales de Alto Impacto",
  description:
    "Atencion especializada, cotizaciones transparentes y seguimiento directo para cada proyecto.",
  phone: "+1 (809) 000-0000",
  email: "contacto@empresa.com",
  address: "Santo Domingo, Republica Dominicana",
  whatsappNumber: "18090000000",
  adminPin: "gmedia2026",
  services: [
    {
      id: "serv-1",
      name: "Consultoria y Diagnostico Inicial",
      category: "Servicios Principales",
      priceEstimate: "Cotizacion a medida",
      duration: "24 - 48 horas",
      badge: "MAS SOLICITADO",
      description:
        "Evaluacion integral de necesidades, propuesta tecnica y plan de ejecucion personalizado.",
    },
    {
      id: "serv-2",
      name: "Implementacion Profesional",
      category: "Ejecucion",
      priceEstimate: "Segun alcance",
      duration: "3 a 7 dias",
      badge: "GARANTIZADO",
      description:
        "Desarrollo completo bajo estandares de calidad certificados y acompanamiento continuo.",
    },
    {
      id: "serv-3",
      name: "Soporte y Mantenimiento Continuo",
      category: "Soporte",
      priceEstimate: "Plan mensual",
      duration: "Cobertura continua",
      badge: "SLA ACTIVO",
      description:
        "Revisiones preventivas, atencion prioritaria por WhatsApp y optimizacion permanente.",
    },
  ],
  testimonials: [
    {
      id: "rev-1",
      author: "Maria Rodriguez",
      roleOrCompany: "Directora de Operaciones",
      rating: 5,
      comment:
        "Excelente atencion desde el primer contacto y cumplimiento estricto con los plazos acordados.",
      date: "Hace 1 semana",
      visible: true,
    },
    {
      id: "rev-2",
      author: "Carlos Gomez",
      roleOrCompany: "Gerente General",
      rating: 5,
      comment:
        "Transparencia total en la cotizacion y resultados superiores a lo esperado.",
      date: "Hace 3 semanas",
      visible: true,
    },
  ],
  faqs: [
    {
      id: "faq-1",
      question: "Como puedo solicitar una cotizacion formal?",
      answer:
        "Completa el formulario de contacto en la pagina o escribenos directamente por WhatsApp para recibir una propuesta detallada en menos de 24 horas.",
      category: "Cotizaciones",
      visible: true,
    },
    {
      id: "faq-2",
      question: "Cual es su zona de cobertura de servicio?",
      answer:
        "Brindamos cobertura en Santo Domingo, Santiago y las principales zonas comerciales y turisticas del pais.",
      category: "Cobertura",
      visible: true,
    },
    {
      id: "faq-3",
      question: "Que garantia incluyen sus servicios?",
      answer:
        "Todos nuestros servicios cuentan con respaldo formal, seguimiento post-entrega y soporte directo por nuestros canales oficiales.",
      category: "Garantia",
      visible: true,
    },
  ],
};
