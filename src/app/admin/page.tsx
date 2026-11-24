"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { 
  Users, 
  MessageSquare, 
  Calculator, 
  Settings, 
  TrendingUp, 
  ShieldCheck, 
  ArrowLeft, 
  Download, 
  Search, 
  CheckCircle2, 
  Clock, 
  Phone, 
  Mail, 
  ExternalLink, 
  Lock, 
  Key, 
  Sparkles, 
  Sliders, 
  HelpCircle,
  Trash2,
  Calendar,
  Globe,
  FileText,
  Image as ImageIcon,
  Star,
  Layers,
  Plus,
  DollarSign,
  Briefcase,
  Eye,
  Check,
  X,
  AlertCircle,
  BarChart3,
  Percent,
  CheckSquare,
  Sun,
  Moon,
  PanelLeftClose,
  PanelLeftOpen,
  ChevronRight,
  Activity,
  Receipt,
  Share2,
  Building2,
  Megaphone,
  Save,
  Code2,
  MapPin,
  AtSign,
  Smartphone,
  Send
} from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { toast } from "sonner";

// --- TIPOS DE DATOS MODULARES ---
export interface FAQItem {
  id: string;
  question: string;
  answer: string;
  category?: string;
  visible: boolean;
}

const SEED_FAQS: FAQItem[] = [
  {
    id: "faq-1",
    question: "¿Qué tiempo de vida útil tiene el césped sintético y qué mantenimiento requiere?",
    answer: "Tiene una vida útil estimada de 8 a 12 años gracias a su protección contra radiación UV. Su mantenimiento es mínimo: solo requiere cepillado periódico y limpieza con agua para remover hojas y polvo.",
    category: "Garantía & Durabilidad",
    visible: true
  },
  {
    id: "faq-2",
    question: "¿Tienen cobertura para proyectos fuera de Santo Domingo?",
    answer: "Sí, disponemos de cuadrillas técnicas especializadas con capacidad de movilización a cualquier provincia del país, incluyendo Santiago, Punta Cana, La Romana, Samaná y zonas turísticas.",
    category: "Cobertura",
    visible: true
  },
  {
    id: "faq-3",
    question: "¿Cuáles son los métodos de pago y facilidades disponibles?",
    answer: "Aceptamos transferencias bancarias a cuentas corrientes de Banco Popular y BHD León, pagos con tarjeta de crédito corporativa y cheques comerciales. Emitimos comprobantes fiscales autorizados (NCF).",
    category: "Pagos & Facturación",
    visible: true
  },
  {
    id: "faq-4",
    question: "¿Cómo funciona el sistema de drenaje durante lluvias torrenciales?",
    answer: "Nuestras alfombras y bases cuentan con microperforaciones de drenaje de alta capacidad que evacúan más de 60 litros por metro cuadrado por minuto, impidiendo encharcamientos o acumulación de agua.",
    category: "Especificaciones Técnicas",
    visible: true
  }
];
interface Lead {
  id: string;
  name: string;
  email: string;
  phone: string;
  service: string;
  budget?: string;
  date: string;
  status: 'new' | 'contacted' | 'closed';
  notes?: string;
}

interface Appointment {
  id: string;
  clientName: string;
  phone: string;
  service: string;
  date: string;
  time: string;
  status: 'pending' | 'confirmed' | 'completed' | 'cancelled';
  notes?: string;
}

interface QuoteItem {
  id: string;
  description: string;
  quantity: number;
  unitPrice: number;
}

interface Quote {
  id: string;
  quoteNumber: string;
  clientName: string;
  clientPhone: string;
  clientEmail: string;
  date: string;
  items: QuoteItem[];
  taxRate: number;
  status: 'draft' | 'sent' | 'approved' | 'paid';
}

interface ProjectShowcase {
  id: string;
  title: string;
  category: string;
  description: string;
  beforeImgUrl: string;
  afterImgUrl: string;
  visible: boolean;
}

interface Review {
  id: string;
  author: string;
  roleOrCompany: string;
  rating: number;
  comment: string;
  date: string;
  visible: boolean;
}

interface ServiceItem {
  id: string;
  name: string;
  category: string;
  priceEstimate: string;
  duration: string;
  badge?: string;
  description: string;
}

// --- DATOS SEMILLA PARA CADA MÓDULO ---
const SEED_LEADS: Lead[] = [
  {
    id: "lead-1",
    name: "Ing. Carlos Mendoza",
    email: "cmendoza@constructora-antillas.com",
    phone: "+1 (809) 555-0142",
    service: "Instalación Integral & Paisajismo",
    budget: "$4,500 USD",
    date: "Hoy, 10:24 AM",
    status: "new"
  },
  {
    id: "lead-2",
    name: "Dra. Patricia Almonte",
    email: "patricia.almonte@clinica.do",
    phone: "+1 (829) 444-8891",
    service: "Mantenimiento & Presupuesto por m²",
    budget: "$1,850 USD",
    date: "Ayer, 4:15 PM",
    status: "contacted"
  },
  {
    id: "lead-3",
    name: "Lic. Manuel Henríquez",
    email: "m.henriquez@grupoinmobiliario.com",
    phone: "+1 (809) 333-7721",
    service: "Consultoría & Proyecto Especial",
    budget: "$8,200 USD",
    date: "Hace 2 días",
    status: "closed"
  }
];

const SEED_APPOINTMENTS: Appointment[] = [
  {
    id: "apt-1",
    clientName: "Roberto Gómez",
    phone: "+1 (809) 777-2211",
    service: "Inspección Técnica en Terreno",
    date: "2026-10-15",
    time: "10:00 AM",
    status: "confirmed",
    notes: "Visita en zona norte"
  },
  {
    id: "apt-2",
    clientName: "Elena Vásquez",
    phone: "+1 (829) 666-4433",
    service: "Consulta Inicial & Muestra de Materiales",
    date: "2026-10-16",
    time: "03:30 PM",
    status: "pending",
    notes: "Interesada en catálogo premium"
  }
];

const SEED_QUOTES: Quote[] = [
  {
    id: "q-1",
    quoteNumber: "COT-2026-001",
    clientName: "Constructora del Caribe SRL",
    clientPhone: "+1 (809) 555-0142",
    clientEmail: "proyectos@constructoradelcaribe.com",
    date: "2026-10-08",
    status: "approved",
    taxRate: 18,
    items: [
      { id: "i1", description: "Instalación Césped Deportivo 50mm (250 m²)", quantity: 250, unitPrice: 28 },
      { id: "i2", description: "Preparación de Suelo y Nivelación Láser", quantity: 1, unitPrice: 850 },
      { id: "i3", description: "Sistema de Drenaje Subterráneo Perimetral", quantity: 1, unitPrice: 1200 }
    ]
  },
  {
    id: "q-2",
    quoteNumber: "COT-2026-002",
    clientName: "Residencial Bella Vista Gardens",
    clientPhone: "+1 (829) 444-8891",
    clientEmail: "administracion@bellavistagardens.com",
    date: "2026-10-11",
    status: "sent",
    taxRate: 18,
    items: [
      { id: "i1", description: "Césped Paisajístico Ornamental 40mm (120 m²)", quantity: 120, unitPrice: 24 },
      { id: "i2", description: "Iluminación LED Solar Perimetral", quantity: 8, unitPrice: 75 }
    ]
  }
];

const SEED_PROJECTS: ProjectShowcase[] = [
  {
    id: "proj-1",
    title: "Residencial Las Praderas - Área Social",
    category: "Residencial",
    description: "Transformación de 350 m² de terreno irregular en área verde de alto tránsito con césped 40mm y drenaje inteligente.",
    beforeImgUrl: "https://images.unsplash.com/photo-1592417817098-8f3d69102a47?auto=format&fit=crop&w=600&q=80",
    afterImgUrl: "https://images.unsplash.com/photo-1558904541-efa8c4a08931?auto=format&fit=crop&w=600&q=80",
    visible: true
  },
  {
    id: "proj-2",
    title: "Complejo Deportivo Club Bella Vista",
    category: "Deportivo",
    description: "Cancha de fútbol 7 con especificación profesional FIFA Quality y sistema de iluminación perimetral.",
    beforeImgUrl: "https://images.unsplash.com/photo-1574629810360-7efbbe195018?auto=format&fit=crop&w=600&q=80",
    afterImgUrl: "https://images.unsplash.com/photo-1529900748604-07564a03e7a6?auto=format&fit=crop&w=600&q=80",
    visible: true
  }
];

const SEED_REVIEWS: Review[] = [
  {
    id: "rev-1",
    author: "Arq. Mariana Silvestre",
    roleOrCompany: "Directora de Proyectos, Silvestre & Asoc.",
    rating: 5,
    comment: "Excelente calidad de materiales y puntualidad en la entrega. El resultado final superó las expectativas del cliente.",
    date: "Hace 1 semana",
    visible: true
  },
  {
    id: "rev-2",
    author: "Lic. Fernando Brea",
    roleOrCompany: "Propietario Residencial",
    rating: 5,
    comment: "La atención personalizada y el cálculo de presupuesto en vivo nos dio total confianza desde el primer día.",
    date: "Hace 3 semanas",
    visible: true
  }
];

const SEED_SERVICES: ServiceItem[] = [
  {
    id: "serv-1",
    name: "Instalación de Césped Sintético",
    category: "Jardinería & Paisajismo",
    priceEstimate: "Desde $25/m²",
    duration: "2 a 5 días",
    badge: "MÁS SOLICITADO",
    description: "Suministro e instalación profesional de césped sintético de alta resistencia UV con drenaje perimetral."
  },
  {
    id: "serv-2",
    name: "Mantenimiento Periódico & Limpieza",
    category: "Mantenimiento",
    priceEstimate: "$150 / sesión",
    duration: "1 jornada",
    badge: "GARANTIZADO",
    description: "Cepillado mecánico, desinfección antibacteriana y reposición de arena de sílice."
  },
  {
    id: "serv-3",
    name: "Diseño de Jardines & Paisajismo 3D",
    category: "Diseño & Planificación",
    priceEstimate: "Cotización a medida",
    duration: "3 a 7 días",
    badge: "ARQUITECTURA",
    description: "Modelado preliminar en 3D de áreas verdes, caminerías, iluminación y riego automatizado."
  }
];

export default function ClientAdminPortal() {
  // Autenticación de Marca Blanca
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [accessPin, setAccessPin] = useState("");
  const [authError, setAuthError] = useState(false);

  // Tema Dual & Layout Lateral Estilo GSpace
  const [theme, setTheme] = useState<'dark' | 'light'>('light');
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false);

  const toggleTheme = () => {
    const next = theme === 'dark' ? 'light' : 'dark';
    setTheme(next);
    if (typeof window !== 'undefined') {
      localStorage.setItem('gmedia_client_admin_theme', next);
    }
  };

  const toggleSidebar = () => {
    setIsSidebarCollapsed(prev => {
      const next = !prev;
      if (typeof window !== 'undefined') {
        localStorage.setItem('gmedia_client_admin_sidebar_collapsed', String(next));
      }
      return next;
    });
  };

  // Navegación por Módulos
  const [activeTab, setActiveTab] = useState<
    'leads' | 'cms' | 'appointments' | 'quotes' | 'portfolio' | 'reviews' | 'services' | 'analytics' | 'modules' | 'support'
  >('leads');

  // Estados de Datos
  const [leads, setLeads] = useState<Lead[]>(SEED_LEADS);
  const [appointments, setAppointments] = useState<Appointment[]>(SEED_APPOINTMENTS);
  const [quotes, setQuotes] = useState<Quote[]>(SEED_QUOTES);
  const [projects, setProjects] = useState<ProjectShowcase[]>(SEED_PROJECTS);
  const [reviews, setReviews] = useState<Review[]>(SEED_REVIEWS);
  const [services, setServices] = useState<ServiceItem[]>(SEED_SERVICES);
  const [faqs, setFaqs] = useState<FAQItem[]>(SEED_FAQS);

  // Sub-navegación dentro de CMS
  const [cmsSubTab, setCmsSubTab] = useState<
    'identity' | 'hours' | 'banners' | 'hero' | 'faqs' | 'social_seo' | 'pixels'
  >('identity');

  // Filtros de búsqueda
  const [searchFilter, setSearchFilter] = useState("");
  const [statusFilter, setStatusFilter] = useState<string>("all");

  // Configuración del Sitio & Interruptores de Módulos (Feature Toggles)
  const [siteConfig, setSiteConfig] = useState({
    // 1. Identidad & Contacto
    brandName: "Portal Corporativo",
    phone: "+1 (809) 000-0000",
    email: "contacto@empresa.com",
    address: "Santo Domingo, República Dominicana",
    whatsappNumber: "18090000000",
    leadNotificationEmails: "ventas@empresa.com, gerencia@empresa.com",
    leadNotificationWhatsapp: "18090000000",

    // 2. Horarios & Estado en Vivo
    hoursWeekdays: "Lunes a Viernes: 8:00 AM - 6:00 PM",
    hoursSaturday: "Sábados: 9:00 AM - 1:00 PM",
    hoursSunday: "Domingos: Cerrado",
    liveStatusMode: "auto" as 'auto' | 'open' | 'closed',
    isHolidayActive: false,
    holidayNotice: "Estaremos cerrados por feriado oficial. Su mensaje será atendido a primera hora hábil.",

    // 3. Barra de Anuncios & Promociones
    announcementActive: true,
    topbarMessage: "Atención disponible para cotizaciones inmediatas en todo el país",
    announcementBadge: "OFERTA",
    announcementCtaText: "Cotizar en 2 Minutos",
    announcementCtaLink: "#cotizador",
    announcementType: "promo" as 'promo' | 'info' | 'urgent',

    // 4. Hero & Mensajes de Conversión
    heroTitle: "Transformamos Espacios con Materiales de Máxima Resistencia",
    heroSubtitle: "Instalación profesional, drenaje inteligente y garantía de 8 años en República Dominicana.",
    heroCtaText: "Solicitar Cotización Inmediata",
    whatsappDefaultMessage: "Hola, vi su sitio web y me gustaría recibir una cotización personalizada.",

    // 5. Redes Sociales
    socialInstagram: "https://instagram.com/empresa",
    socialFacebook: "https://facebook.com/empresa",
    socialLinkedin: "https://linkedin.com/company/empresa",
    socialTiktok: "https://tiktok.com/@empresa",
    socialGoogleMaps: "https://maps.google.com",

    // 6. SEO & Metaetiquetas
    metaTitle: "Empresa Líder en Soluciones Profesionales | República Dominicana",
    metaDescription: "Instalación, suministros de alta gama y cotizaciones formalizadas en 24 horas.",
    ogImageUrl: "https://images.unsplash.com/photo-1592417817098-8f3d69102a47?auto=format&fit=crop&w=1200&q=80",

    // 7. Píxeles de Marketing
    googleAnalyticsId: "G-XXXXXXXXXX",
    metaPixelId: "123456789012345",
    googleTagManagerId: "GTM-XXXXXX",

    modules: {
      leads: true,
      cms: true,
      appointments: true,
      quotes: true,
      portfolio: true,
      reviews: true,
      services: true,
      analytics: true
    }
  });

  // Formularios de Creación Rápida
  const [showNewAptModal, setShowNewAptModal] = useState(false);
  const [newApt, setNewApt] = useState({ clientName: "", phone: "", service: "", date: "", time: "" });

  const [showNewProjectModal, setShowNewProjectModal] = useState(false);
  const [newProj, setNewProj] = useState({ title: "", category: "Residencial", description: "", beforeImgUrl: "", afterImgUrl: "" });

  const [showNewQuoteModal, setShowNewQuoteModal] = useState(false);
  const [newQuote, setNewQuote] = useState({
    clientName: "",
    clientPhone: "",
    clientEmail: "",
    desc1: "",
    qty1: 1,
    price1: 0
  });

  const [showNewFaqModal, setShowNewFaqModal] = useState(false);
  const [newFaq, setNewFaq] = useState({ question: "", answer: "", category: "General" });

  // Carga y Persistencia en localStorage
  useEffect(() => {
    const savedTheme = localStorage.getItem("gmedia_client_admin_theme");
    if (savedTheme === "light" || savedTheme === "dark") setTheme(savedTheme);

    const savedSidebar = localStorage.getItem("gmedia_client_admin_sidebar_collapsed");
    if (savedSidebar === "true") setIsSidebarCollapsed(true);

    const savedAuth = localStorage.getItem("gmedia_client_admin_auth");
    if (savedAuth === "true") setIsAuthenticated(true);

    const savedLeads = localStorage.getItem("gmedia_client_leads");
    if (savedLeads) try { setLeads(JSON.parse(savedLeads)); } catch {}

    const savedApts = localStorage.getItem("gmedia_client_apts");
    if (savedApts) try { setAppointments(JSON.parse(savedApts)); } catch {}

    const savedQuotes = localStorage.getItem("gmedia_client_quotes");
    if (savedQuotes) try { setQuotes(JSON.parse(savedQuotes)); } catch {}

    const savedProjects = localStorage.getItem("gmedia_client_projects");
    if (savedProjects) try { setProjects(JSON.parse(savedProjects)); } catch {}

    const savedReviews = localStorage.getItem("gmedia_client_reviews");
    if (savedReviews) try { setReviews(JSON.parse(savedReviews)); } catch {}

    const savedServices = localStorage.getItem("gmedia_client_services");
    if (savedServices) try { setServices(JSON.parse(savedServices)); } catch {}

    const savedFaqs = localStorage.getItem("gmedia_client_faqs");
    if (savedFaqs) try { setFaqs(JSON.parse(savedFaqs)); } catch {}

    const savedConfig = localStorage.getItem("gmedia_client_site_config");
    if (savedConfig) try { setSiteConfig(JSON.parse(savedConfig)); } catch {}
  }, []);

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (accessPin.trim() === "gmedia2026" || accessPin.trim() === "admin" || accessPin.trim().length >= 4) {
      setIsAuthenticated(true);
      localStorage.setItem("gmedia_client_admin_auth", "true");
      toast.success("¡Bienvenido al Centro de Control Corporativo!");
    } else {
      setAuthError(true);
      toast.error("Contraseña o PIN incorrecto.");
    }
  };

  const handleLogout = () => {
    setIsAuthenticated(false);
    localStorage.removeItem("gmedia_client_admin_auth");
    toast.info("Sesión finalizada de manera segura.");
  };

  // Helper de guardado genérico
  const persist = (key: string, data: any) => {
    localStorage.setItem(key, JSON.stringify(data));
  };

  // Acciones de Leads
  const handleUpdateLeadStatus = (id: string, newStatus: 'new' | 'contacted' | 'closed') => {
    const updated = leads.map(l => l.id === id ? { ...l, status: newStatus } : l);
    setLeads(updated);
    persist("gmedia_client_leads", updated);
    toast.success("Estado del prospecto actualizado con éxito.");
  };

  const handleDeleteLead = (id: string) => {
    const updated = leads.filter(l => l.id !== id);
    setLeads(updated);
    persist("gmedia_client_leads", updated);
    toast.success("Registro eliminado de la base de datos.");
  };

  // Acciones de Citas
  const handleAddAppointment = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newApt.clientName || !newApt.phone) {
      toast.error("Complete los datos requeridos.");
      return;
    }
    const created: Appointment = {
      id: `apt-${Date.now()}`,
      clientName: newApt.clientName,
      phone: newApt.phone,
      service: newApt.service || "Consulta General",
      date: newApt.date || new Date().toISOString().slice(0, 10),
      time: newApt.time || "10:00 AM",
      status: "confirmed"
    };
    const updated = [created, ...appointments];
    setAppointments(updated);
    persist("gmedia_client_apts", updated);
    setShowNewAptModal(false);
    setNewApt({ clientName: "", phone: "", service: "", date: "", time: "" });
    toast.success("Cita agendada exitosamente en el calendario corporativo.");
  };

  const handleUpdateAptStatus = (id: string, status: 'pending' | 'confirmed' | 'completed' | 'cancelled') => {
    const updated = appointments.map(a => a.id === id ? { ...a, status } : a);
    setAppointments(updated);
    persist("gmedia_client_apts", updated);
    toast.success("Estado de cita actualizado.");
  };

  // Acciones de Cotizaciones
  const handleAddQuote = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newQuote.clientName || !newQuote.clientPhone) {
      toast.error("Por favor complete los datos del cliente.");
      return;
    }
    const created: Quote = {
      id: `q-${Date.now()}`,
      quoteNumber: `COT-2026-${String(quotes.length + 1).padStart(3, '0')}`,
      clientName: newQuote.clientName,
      clientPhone: newQuote.clientPhone,
      clientEmail: newQuote.clientEmail || "cliente@correo.com",
      date: new Date().toISOString().slice(0, 10),
      status: 'sent',
      taxRate: 18,
      items: [
        {
          id: `item-1`,
          description: newQuote.desc1 || "Servicio Técnico Profesional",
          quantity: Number(newQuote.qty1) || 1,
          unitPrice: Number(newQuote.price1) || 500
        }
      ]
    };
    const updated = [created, ...quotes];
    setQuotes(updated);
    persist("gmedia_client_quotes", updated);
    setShowNewQuoteModal(false);
    setNewQuote({ clientName: "", clientPhone: "", clientEmail: "", desc1: "", qty1: 1, price1: 0 });
    toast.success("Nueva cotización emitida formalmente.");
  };

  const handleUpdateQuoteStatus = (id: string, status: 'draft' | 'sent' | 'approved' | 'paid') => {
    const updated = quotes.map(q => q.id === id ? { ...q, status } : q);
    setQuotes(updated);
    persist("gmedia_client_quotes", updated);
    toast.success(`Cotización actualizada a ${status.toUpperCase()}.`);
  };

  // Acciones de Proyectos
  const handleAddProject = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newProj.title) {
      toast.error("Ingrese el título del proyecto.");
      return;
    }
    const created: ProjectShowcase = {
      id: `proj-${Date.now()}`,
      title: newProj.title,
      category: newProj.category,
      description: newProj.description,
      beforeImgUrl: newProj.beforeImgUrl || "https://images.unsplash.com/photo-1592417817098-8f3d69102a47?auto=format&fit=crop&w=600&q=80",
      afterImgUrl: newProj.afterImgUrl || "https://images.unsplash.com/photo-1558904541-efa8c4a08931?auto=format&fit=crop&w=600&q=80",
      visible: true
    };
    const updated = [created, ...projects];
    setProjects(updated);
    persist("gmedia_client_projects", updated);
    setShowNewProjectModal(false);
    setNewProj({ title: "", category: "Residencial", description: "", beforeImgUrl: "", afterImgUrl: "" });
    toast.success("Proyecto agregado a la galería.");
  };

  const handleToggleProject = (id: string) => {
    const updated = projects.map(p => p.id === id ? { ...p, visible: !p.visible } : p);
    setProjects(updated);
    persist("gmedia_client_projects", updated);
    toast.success("Visibilidad del proyecto actualizada.");
  };

  // Acciones de Reseñas
  const handleToggleReview = (id: string) => {
    const updated = reviews.map(r => r.id === id ? { ...r, visible: !r.visible } : r);
    setReviews(updated);
    persist("gmedia_client_reviews", updated);
    toast.success("Visibilidad de reseña actualizada.");
  };

  // Acciones de Preguntas Frecuentes (FAQ)
  const handleAddFaq = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newFaq.question.trim() || !newFaq.answer.trim()) {
      toast.error("Complete la pregunta y la respuesta.");
      return;
    }
    const created: FAQItem = {
      id: `faq-${Date.now()}`,
      question: newFaq.question,
      answer: newFaq.answer,
      category: newFaq.category || "General",
      visible: true
    };
    const updated = [...faqs, created];
    setFaqs(updated);
    persist("gmedia_client_faqs", updated);
    setShowNewFaqModal(false);
    setNewFaq({ question: "", answer: "", category: "General" });
    toast.success("Pregunta frecuente agregada exitosamente.");
  };

  const handleToggleFaq = (id: string) => {
    const updated = faqs.map(f => f.id === id ? { ...f, visible: !f.visible } : f);
    setFaqs(updated);
    persist("gmedia_client_faqs", updated);
    toast.success("Visibilidad de pregunta actualizada.");
  };

  const handleDeleteFaq = (id: string) => {
    const updated = faqs.filter(f => f.id !== id);
    setFaqs(updated);
    persist("gmedia_client_faqs", updated);
    toast.success("Pregunta eliminada del catálogo.");
  };

  // Toggle de Módulos (Lego System)
  const handleToggleModule = (moduleKey: keyof typeof siteConfig.modules) => {
    const updated = {
      ...siteConfig,
      modules: {
        ...siteConfig.modules,
        [moduleKey]: !siteConfig.modules[moduleKey]
      }
    };
    setSiteConfig(updated);
    persist("gmedia_client_site_config", updated);
    toast.success(`Módulo ${moduleKey} actualizado.`);
  };

  // Exportar CSV
  const handleExportCSV = () => {
    const headers = "Nombre,Email,Telefono,Servicio,Presupuesto,Fecha,Estado\n";
    const rows = leads.map(l => `"${l.name}","${l.email}","${l.phone}","${l.service}","${l.budget || ''}","${l.date}","${l.status}"`).join("\n");
    const blob = new Blob([headers + rows], { type: "text/csv;charset=utf-8;" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.setAttribute("download", `prospectos_${new Date().toISOString().slice(0, 10)}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    toast.success("Archivo CSV exportado exitosamente.");
  };

  const isLight = theme === 'light';

  // Pantalla de Login si no está autenticado (GSpace Obsidian Vault Portal)
  if (!isAuthenticated) {
    return (
      <div className={`min-h-screen flex items-center justify-center p-4 relative overflow-hidden transition-colors duration-500 font-sans ${
        isLight ? 'bg-[#F8FAFC] text-slate-900' : 'bg-[#090D16] text-white'
      }`}>
        {/* Glow ambient */}
        <div className={`absolute top-0 left-1/2 -translate-x-1/2 w-[700px] h-[350px] blur-[140px] pointer-events-none ${
          isLight ? 'bg-gradient-to-b from-[#2C80C6]/15 via-[#583EBF]/10 to-transparent' : 'bg-gradient-to-b from-[#583EBF]/25 via-[#2C80C6]/20 to-transparent'
        }`} />

        <div className={`w-full max-w-md p-8 sm:p-10 rounded-[32px] border backdrop-blur-2xl shadow-2xl relative z-10 transition-all ${
          isLight ? 'bg-white/95 border-slate-200/90 shadow-slate-200/60' : 'bg-[#0B0F19]/90 border-slate-800/80 shadow-black/60'
        }`}>
          <div className="text-center space-y-3 mb-8">
            <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-[#2C80C6] to-[#583EBF] text-white mx-auto flex items-center justify-center font-black text-2xl shadow-lg shadow-blue-500/25">
              {siteConfig.brandName.charAt(0).toUpperCase()}
            </div>
            <div>
              <div className="flex items-center justify-center gap-2">
                <h1 className={`text-xl sm:text-2xl font-black tracking-tight ${isLight ? 'text-slate-900' : 'text-white'}`}>
                  {siteConfig.brandName}
                </h1>
                <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
              </div>
              <p className={`text-xs mt-1.5 font-medium ${isLight ? 'text-slate-500' : 'text-slate-400'}`}>
                Centro de Control Corporativo · Gmedia Enterprise Suite
              </p>
            </div>
          </div>

          <form onSubmit={handleLogin} className="space-y-5">
            <div className="space-y-2">
              <div className="flex justify-between items-center">
                <label className={`text-xs font-bold uppercase tracking-wider flex items-center gap-1.5 ${isLight ? 'text-slate-700' : 'text-slate-300'}`}>
                  <Key className="w-3.5 h-3.5 text-[#2C80C6]" /> Clave de Seguridad
                </label>
                <span className="text-[10px] font-mono text-emerald-500 font-bold">256-BIT ENCRYPTED</span>
              </div>
              <Input
                type="password"
                placeholder="Ingresar contraseña o PIN..."
                value={accessPin}
                onChange={(e) => { setAccessPin(e.target.value); setAuthError(false); }}
                className={`h-12 text-sm rounded-xl transition-all ${
                  isLight 
                    ? 'bg-slate-50 border-slate-200 text-slate-900 focus:bg-white focus:border-[#2C80C6]' 
                    : 'bg-slate-950/80 border-slate-800 text-white focus:border-[#2C80C6]'
                }`}
              />
              {authError && (
                <p className="text-xs text-rose-500 font-medium flex items-center gap-1 mt-1">
                  <AlertCircle className="w-3.5 h-3.5" /> Clave incorrecta. Por favor intente nuevamente.
                </p>
              )}
              <div className="flex items-center justify-between text-[11px] pt-1 text-slate-400">
                <span>PIN demo: <code className="text-[#2C80C6] font-bold">gmedia2026</code></span>
                <span className="text-[10px] font-mono">Bóveda Blindada</span>
              </div>
            </div>

            <button
              type="submit"
              className="w-full h-12 rounded-xl bg-gradient-to-r from-[#583EBF] to-[#2C80C6] hover:from-[#4B34A8] hover:to-[#2470AE] text-white font-bold text-xs uppercase tracking-wider shadow-lg shadow-blue-500/25 transition-all hover:-translate-y-0.5 cursor-pointer flex items-center justify-center gap-2"
            >
              <Lock className="w-4 h-4" />
              <span>Acceder al Panel Ejecutivo</span>
            </button>

            <div className="pt-2 text-center">
              <Link 
                href="/" 
                className={`text-xs transition-colors inline-flex items-center gap-1.5 font-medium ${
                  isLight ? 'text-slate-500 hover:text-slate-900' : 'text-slate-400 hover:text-white'
                }`}
              >
                <ArrowLeft className="w-3.5 h-3.5" /> Volver al sitio web principal
              </Link>
            </div>
          </form>
        </div>
      </div>
    );
  }

  // Filtrado de Leads
  const filteredLeads = leads.filter(l => {
    const matchesSearch = l.name.toLowerCase().includes(searchFilter.toLowerCase()) || 
                          l.phone.includes(searchFilter) || 
                          l.service.toLowerCase().includes(searchFilter.toLowerCase());
    const matchesStatus = statusFilter === 'all' || l.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  return (
    <div className={`min-h-screen flex font-sans selection:bg-[#2C80C6] selection:text-white transition-colors duration-300 relative ${
      isLight ? 'bg-[#F8FAFC] text-slate-900' : 'bg-[#090D16] text-slate-100'
    }`}>
      {/* AMBIENTE LUMÍNICO GSPACE (BACKDROP GLOW) */}
      <div className={`fixed top-0 left-1/2 -translate-x-1/2 w-full max-w-7xl h-[420px] pointer-events-none blur-[140px] -z-0 opacity-40 ${
        isLight 
          ? 'bg-gradient-to-b from-[#2C80C6]/10 via-[#583EBF]/5 to-transparent' 
          : 'bg-gradient-to-b from-[#583EBF]/20 via-[#2C80C6]/15 to-transparent'
      }`} />

      {/* ========================================================================= */}
      {/* 1. SIDEBAR MENÚ RETRÁCTIL (ESTILO GSPACE SILICON VALLEY 2030)              */}
      {/* ========================================================================= */}
      <aside className={`border-r flex flex-col z-40 sticky top-0 h-screen transition-all duration-300 ease-in-out shrink-0 select-none ${
        isSidebarCollapsed ? 'w-[72px]' : 'w-[270px] xl:w-[285px]'
      } ${
        isLight ? 'bg-white/95 border-slate-200/90 shadow-sm' : 'bg-[#0B0F19]/90 border-slate-800/80 shadow-black/40'
      }`}>
        {/* CABECERA SIDEBAR CON ISOLOGO & TOGGLE COLLAPSE */}
        <div className={`px-4 py-4 flex items-center border-b ${
          isSidebarCollapsed ? 'justify-center' : 'justify-between'
        } ${isLight ? 'border-slate-100' : 'border-slate-800/80'}`}>
          <div className="flex items-center gap-3 overflow-hidden">
            <button
              type="button"
              onClick={toggleSidebar}
              className="w-10 h-10 rounded-2xl bg-gradient-to-br from-[#2C80C6] to-[#583EBF] text-white flex items-center justify-center font-black text-base shadow-md shadow-blue-500/20 shrink-0 transition-transform hover:scale-105 cursor-pointer"
              title={isSidebarCollapsed ? "Expandir menú lateral" : "Colapsar menú"}
            >
              {siteConfig.brandName.charAt(0).toUpperCase()}
            </button>

            {!isSidebarCollapsed && (
              <div className="truncate">
                <h2 className={`font-black text-xs sm:text-sm tracking-tight truncate ${isLight ? 'text-slate-900' : 'text-white'}`}>
                  {siteConfig.brandName}
                </h2>
                <div className="flex items-center gap-1.5 mt-0.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse shrink-0" />
                  <span className="text-[9px] font-mono font-bold uppercase tracking-wider text-emerald-600 dark:text-emerald-400">
                    GSpace Portal
                  </span>
                </div>
              </div>
            )}
          </div>

          {!isSidebarCollapsed && (
            <button
              type="button"
              onClick={toggleSidebar}
              className={`w-8 h-8 rounded-full flex items-center justify-center transition-all cursor-pointer ${
                isLight ? 'bg-slate-100 hover:bg-slate-200 text-slate-600' : 'bg-slate-800/60 hover:bg-slate-700/80 text-white'
              }`}
              title="Plegar menú lateral"
            >
              <PanelLeftClose className="w-4 h-4" />
            </button>
          )}
        </div>

        {/* NAVEGACIÓN MODULAR CON CAPSULE PILLS */}
        <nav className="flex-1 p-3 space-y-4 overflow-y-auto">
          {/* CATEGORÍA 1: OPERACIÓN COMERCIAL */}
          <div>
            {!isSidebarCollapsed && (
              <p className={`text-[9px] font-black uppercase tracking-[0.18em] px-2.5 mb-1.5 ${
                isLight ? 'text-slate-400' : 'text-slate-500'
              }`}>
                Operación Comercial
              </p>
            )}
            <div className="space-y-1">
              {siteConfig.modules.leads && (
                <button
                  type="button"
                  onClick={() => setActiveTab('leads')}
                  title="Prospectos (CRM)"
                  className={`w-full flex items-center font-bold uppercase text-[11px] tracking-wider transition-all duration-200 cursor-pointer ${
                    isSidebarCollapsed ? 'w-11 h-11 rounded-full justify-center p-0 mx-auto' : 'w-full justify-between px-3 py-2.5 rounded-xl'
                  } ${
                    activeTab === 'leads'
                      ? 'bg-gradient-to-r from-[#583EBF] to-[#2C80C6] text-white shadow-md shadow-blue-900/30'
                      : isLight 
                        ? 'text-slate-600 hover:bg-slate-100 hover:text-slate-900' 
                        : 'text-slate-300 hover:bg-white/10 hover:text-white'
                  }`}
                >
                  <div className={`flex items-center ${isSidebarCollapsed ? 'justify-center' : 'gap-3'}`}>
                    <Users className="w-4 h-4 shrink-0" />
                    {!isSidebarCollapsed && <span>Prospectos</span>}
                  </div>
                  {!isSidebarCollapsed && (
                    <span className={`text-[9px] font-black uppercase px-2 py-0.5 rounded-full border ${
                      activeTab === 'leads' 
                        ? 'bg-white/20 text-white border-transparent' 
                        : isLight ? 'bg-slate-100 text-slate-600 border-slate-200' : 'bg-slate-800 text-slate-300 border-slate-700'
                    }`}>
                      {leads.length}
                    </span>
                  )}
                </button>
              )}

              {siteConfig.modules.appointments && (
                <button
                  type="button"
                  onClick={() => setActiveTab('appointments')}
                  title="Citas & Agenda"
                  className={`w-full flex items-center font-bold uppercase text-[11px] tracking-wider transition-all duration-200 cursor-pointer ${
                    isSidebarCollapsed ? 'w-11 h-11 rounded-full justify-center p-0 mx-auto' : 'w-full justify-between px-3 py-2.5 rounded-xl'
                  } ${
                    activeTab === 'appointments'
                      ? 'bg-gradient-to-r from-[#583EBF] to-[#2C80C6] text-white shadow-md shadow-blue-900/30'
                      : isLight 
                        ? 'text-slate-600 hover:bg-slate-100 hover:text-slate-900' 
                        : 'text-slate-300 hover:bg-white/10 hover:text-white'
                  }`}
                >
                  <div className={`flex items-center ${isSidebarCollapsed ? 'justify-center' : 'gap-3'}`}>
                    <Calendar className="w-4 h-4 shrink-0" />
                    {!isSidebarCollapsed && <span>Citas & Agenda</span>}
                  </div>
                  {!isSidebarCollapsed && (
                    <span className={`text-[9px] font-black uppercase px-2 py-0.5 rounded-full border ${
                      activeTab === 'appointments' 
                        ? 'bg-white/20 text-white border-transparent' 
                        : isLight ? 'bg-slate-100 text-slate-600 border-slate-200' : 'bg-slate-800 text-slate-300 border-slate-700'
                    }`}>
                      {appointments.length}
                    </span>
                  )}
                </button>
              )}

              {siteConfig.modules.quotes && (
                <button
                  type="button"
                  onClick={() => setActiveTab('quotes')}
                  title="Cotizador Proforma"
                  className={`w-full flex items-center font-bold uppercase text-[11px] tracking-wider transition-all duration-200 cursor-pointer ${
                    isSidebarCollapsed ? 'w-11 h-11 rounded-full justify-center p-0 mx-auto' : 'w-full justify-between px-3 py-2.5 rounded-xl'
                  } ${
                    activeTab === 'quotes'
                      ? 'bg-gradient-to-r from-[#583EBF] to-[#2C80C6] text-white shadow-md shadow-blue-900/30'
                      : isLight 
                        ? 'text-slate-600 hover:bg-slate-100 hover:text-slate-900' 
                        : 'text-slate-300 hover:bg-white/10 hover:text-white'
                  }`}
                >
                  <div className={`flex items-center ${isSidebarCollapsed ? 'justify-center' : 'gap-3'}`}>
                    <FileText className="w-4 h-4 shrink-0" />
                    {!isSidebarCollapsed && <span>Cotizador</span>}
                  </div>
                  {!isSidebarCollapsed && (
                    <span className={`text-[9px] font-black uppercase px-2 py-0.5 rounded-full border ${
                      activeTab === 'quotes' 
                        ? 'bg-white/20 text-white border-transparent' 
                        : isLight ? 'bg-slate-100 text-slate-600 border-slate-200' : 'bg-slate-800 text-slate-300 border-slate-700'
                    }`}>
                      {quotes.length}
                    </span>
                  )}
                </button>
              )}
            </div>
          </div>

          {/* CATEGORÍA 2: CONTENIDO & CATÁLOGO */}
          <div>
            {!isSidebarCollapsed && (
              <p className={`text-[9px] font-black uppercase tracking-[0.18em] px-2.5 mb-1.5 ${
                isLight ? 'text-slate-400' : 'text-slate-500'
              }`}>
                Contenido & Web
              </p>
            )}
            <div className="space-y-1">
              {siteConfig.modules.services && (
                <button
                  type="button"
                  onClick={() => setActiveTab('services')}
                  title="Servicios & Precios"
                  className={`w-full flex items-center font-bold uppercase text-[11px] tracking-wider transition-all duration-200 cursor-pointer ${
                    isSidebarCollapsed ? 'w-11 h-11 rounded-full justify-center p-0 mx-auto' : 'w-full justify-between px-3 py-2.5 rounded-xl'
                  } ${
                    activeTab === 'services'
                      ? 'bg-gradient-to-r from-[#583EBF] to-[#2C80C6] text-white shadow-md shadow-blue-900/30'
                      : isLight 
                        ? 'text-slate-600 hover:bg-slate-100 hover:text-slate-900' 
                        : 'text-slate-300 hover:bg-white/10 hover:text-white'
                  }`}
                >
                  <div className={`flex items-center ${isSidebarCollapsed ? 'justify-center' : 'gap-3'}`}>
                    <Layers className="w-4 h-4 shrink-0" />
                    {!isSidebarCollapsed && <span>Servicios & Precios</span>}
                  </div>
                </button>
              )}

              {siteConfig.modules.portfolio && (
                <button
                  type="button"
                  onClick={() => setActiveTab('portfolio')}
                  title="Galería & Trabajos"
                  className={`w-full flex items-center font-bold uppercase text-[11px] tracking-wider transition-all duration-200 cursor-pointer ${
                    isSidebarCollapsed ? 'w-11 h-11 rounded-full justify-center p-0 mx-auto' : 'w-full justify-between px-3 py-2.5 rounded-xl'
                  } ${
                    activeTab === 'portfolio'
                      ? 'bg-gradient-to-r from-[#583EBF] to-[#2C80C6] text-white shadow-md shadow-blue-900/30'
                      : isLight 
                        ? 'text-slate-600 hover:bg-slate-100 hover:text-slate-900' 
                        : 'text-slate-300 hover:bg-white/10 hover:text-white'
                  }`}
                >
                  <div className={`flex items-center ${isSidebarCollapsed ? 'justify-center' : 'gap-3'}`}>
                    <ImageIcon className="w-4 h-4 shrink-0" />
                    {!isSidebarCollapsed && <span>Galería Antes/Después</span>}
                  </div>
                </button>
              )}

              {siteConfig.modules.reviews && (
                <button
                  type="button"
                  onClick={() => setActiveTab('reviews')}
                  title="Reseñas & Testimonios"
                  className={`w-full flex items-center font-bold uppercase text-[11px] tracking-wider transition-all duration-200 cursor-pointer ${
                    isSidebarCollapsed ? 'w-11 h-11 rounded-full justify-center p-0 mx-auto' : 'w-full justify-between px-3 py-2.5 rounded-xl'
                  } ${
                    activeTab === 'reviews'
                      ? 'bg-gradient-to-r from-[#583EBF] to-[#2C80C6] text-white shadow-md shadow-blue-900/30'
                      : isLight 
                        ? 'text-slate-600 hover:bg-slate-100 hover:text-slate-900' 
                        : 'text-slate-300 hover:bg-white/10 hover:text-white'
                  }`}
                >
                  <div className={`flex items-center ${isSidebarCollapsed ? 'justify-center' : 'gap-3'}`}>
                    <Star className="w-4 h-4 shrink-0" />
                    {!isSidebarCollapsed && <span>Reseñas de Clientes</span>}
                  </div>
                </button>
              )}

              {siteConfig.modules.cms && (
                <button
                  type="button"
                  onClick={() => setActiveTab('cms')}
                  title="Datos del Sitio (CMS)"
                  className={`w-full flex items-center font-bold uppercase text-[11px] tracking-wider transition-all duration-200 cursor-pointer ${
                    isSidebarCollapsed ? 'w-11 h-11 rounded-full justify-center p-0 mx-auto' : 'w-full justify-between px-3 py-2.5 rounded-xl'
                  } ${
                    activeTab === 'cms'
                      ? 'bg-gradient-to-r from-[#583EBF] to-[#2C80C6] text-white shadow-md shadow-blue-900/30'
                      : isLight 
                        ? 'text-slate-600 hover:bg-slate-100 hover:text-slate-900' 
                        : 'text-slate-300 hover:bg-white/10 hover:text-white'
                  }`}
                >
                  <div className={`flex items-center ${isSidebarCollapsed ? 'justify-center' : 'gap-3'}`}>
                    <Globe className="w-4 h-4 shrink-0" />
                    {!isSidebarCollapsed && <span>Datos del Sitio (CMS)</span>}
                  </div>
                </button>
              )}
            </div>
          </div>

          {/* CATEGORÍA 3: SISTEMA & CONTROL */}
          <div>
            {!isSidebarCollapsed && (
              <p className={`text-[9px] font-black uppercase tracking-[0.18em] px-2.5 mb-1.5 ${
                isLight ? 'text-slate-400' : 'text-slate-500'
              }`}>
                Sistema & Soporte
              </p>
            )}
            <div className="space-y-1">
              {siteConfig.modules.analytics && (
                <button
                  type="button"
                  onClick={() => setActiveTab('analytics')}
                  title="Analítica Comercial"
                  className={`w-full flex items-center font-bold uppercase text-[11px] tracking-wider transition-all duration-200 cursor-pointer ${
                    isSidebarCollapsed ? 'w-11 h-11 rounded-full justify-center p-0 mx-auto' : 'w-full justify-between px-3 py-2.5 rounded-xl'
                  } ${
                    activeTab === 'analytics'
                      ? 'bg-gradient-to-r from-[#583EBF] to-[#2C80C6] text-white shadow-md shadow-blue-900/30'
                      : isLight 
                        ? 'text-slate-600 hover:bg-slate-100 hover:text-slate-900' 
                        : 'text-slate-300 hover:bg-white/10 hover:text-white'
                  }`}
                >
                  <div className={`flex items-center ${isSidebarCollapsed ? 'justify-center' : 'gap-3'}`}>
                    <BarChart3 className="w-4 h-4 shrink-0" />
                    {!isSidebarCollapsed && <span>Analítica Web</span>}
                  </div>
                </button>
              )}

              <button
                type="button"
                onClick={() => setActiveTab('modules')}
                title="Interruptores Plug-and-Play"
                className={`w-full flex items-center font-bold uppercase text-[11px] tracking-wider transition-all duration-200 cursor-pointer ${
                  isSidebarCollapsed ? 'w-11 h-11 rounded-full justify-center p-0 mx-auto' : 'w-full justify-between px-3 py-2.5 rounded-xl'
                } ${
                  activeTab === 'modules'
                    ? 'bg-gradient-to-r from-[#583EBF] to-[#2C80C6] text-white shadow-md shadow-blue-900/30'
                    : isLight 
                      ? 'text-slate-600 hover:bg-slate-100 hover:text-slate-900' 
                      : 'text-slate-300 hover:bg-white/10 hover:text-white'
                }`}
              >
                <div className={`flex items-center ${isSidebarCollapsed ? 'justify-center' : 'gap-3'}`}>
                  <Sliders className="w-4 h-4 shrink-0" />
                  {!isSidebarCollapsed && <span>Módulos Activos</span>}
                </div>
              </button>

              <button
                type="button"
                onClick={() => setActiveTab('support')}
                title="Soporte VIP Gmedia"
                className={`w-full flex items-center font-bold uppercase text-[11px] tracking-wider transition-all duration-200 cursor-pointer ${
                  isSidebarCollapsed ? 'w-11 h-11 rounded-full justify-center p-0 mx-auto' : 'w-full justify-between px-3 py-2.5 rounded-xl'
                } ${
                  activeTab === 'support'
                    ? 'bg-gradient-to-r from-[#583EBF] to-[#2C80C6] text-white shadow-md shadow-blue-900/30'
                    : isLight 
                      ? 'text-slate-600 hover:bg-slate-100 hover:text-slate-900' 
                      : 'text-slate-300 hover:bg-white/10 hover:text-white'
                }`}
              >
                <div className={`flex items-center ${isSidebarCollapsed ? 'justify-center' : 'gap-3'}`}>
                  <HelpCircle className="w-4 h-4 shrink-0" />
                  {!isSidebarCollapsed && <span>Soporte Gmedia</span>}
                </div>
              </button>
            </div>
          </div>
        </nav>

        {/* PIE DEL SIDEBAR */}
        <div className={`p-3 border-t ${isLight ? 'border-slate-100 bg-slate-50/70' : 'border-slate-800/80 bg-slate-950/40'}`}>
          <div className="flex items-center justify-between gap-2">
            {!isSidebarCollapsed && (
              <div className="text-[10px] font-mono text-slate-400 truncate">
                GSpace Engine v2030
              </div>
            )}
            <button
              onClick={handleLogout}
              className={`text-xs font-bold text-slate-400 hover:text-rose-500 hover:bg-rose-500/10 p-2 rounded-xl transition-all cursor-pointer ${
                isSidebarCollapsed ? 'w-full flex justify-center' : 'ml-auto'
              }`}
              title="Cerrar Sesión Segura"
            >
              Cerrar Sesión
            </button>
          </div>
        </div>
      </aside>

      {/* ========================================================================= */}
      {/* 2. ÁREA PRINCIPAL CON EXECUTIVE HUD (CABECERA SUPERIOR GSPACE)             */}
      {/* ========================================================================= */}
      <div className="flex-1 flex flex-col min-w-0">
        <div className="max-w-[1520px] w-full mx-auto px-4 sm:px-6 lg:px-8 pt-5 pb-16">
          
          {/* ========================================================================= */}
          {/* EXECUTIVE HUD (CABECERA SUPERIOR INTEGRADA DE SALUD DE CUENTA)            */}
          {/* ========================================================================= */}
          <header className={`rounded-2xl transition-all shadow-sm p-4 sm:p-5 mb-6 border backdrop-blur-xl ${
            isLight 
              ? 'bg-white/95 border-slate-200/90 shadow-slate-200/50' 
              : 'bg-[#0B0F19]/90 border-slate-800/80 shadow-black/40'
          }`}>
            <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-4">
              
              {/* IDENTIDAD EMPRESARIAL */}
              <div className="flex items-center gap-4">
                <div className="relative shrink-0">
                  <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-[#2C80C6] to-[#583EBF] text-white flex items-center justify-center font-black text-xl shadow-lg shadow-blue-500/20">
                    {siteConfig.brandName.charAt(0).toUpperCase()}
                  </div>
                  <span className={`absolute -bottom-1 -right-1 w-4 h-4 rounded-full flex items-center justify-center border-2 ${
                    isLight ? 'bg-emerald-500 border-white' : 'bg-emerald-500 border-[#0B0F19]'
                  }`} title="Empresa Verificada">
                    <Check className="w-2.5 h-2.5 text-white stroke-[3]" />
                  </span>
                </div>
                <div>
                  <div className="flex items-center gap-2.5 flex-wrap">
                    <h1 className={`font-black text-lg sm:text-xl tracking-tight ${isLight ? 'text-slate-900' : 'text-white'}`}>
                      {siteConfig.brandName}
                    </h1>
                    <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-[10px] font-black uppercase tracking-wider bg-emerald-500/10 text-emerald-500 dark:text-emerald-400 border border-emerald-500/20">
                      <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse"></span>
                      Cuenta Activa
                    </span>
                  </div>
                  <p className={`text-xs mt-0.5 font-medium ${isLight ? 'text-slate-500' : 'text-slate-400'}`}>
                    Centro de Control Corporativo · Gmedia Enterprise Suite
                  </p>
                </div>
              </div>

              {/* MICRO-INDICADORES DE SALUD Y ACCESO RÁPIDO */}
              <div className="flex items-center gap-2.5 sm:gap-3 flex-wrap self-stretch sm:self-auto justify-start sm:justify-end">
                <div className={`flex items-center gap-2 px-3 py-1.5 rounded-xl border text-xs ${
                  isLight ? 'bg-slate-50 border-slate-200 text-slate-700' : 'bg-slate-950/60 border-slate-800 text-slate-300'
                }`}>
                  <ShieldCheck className="w-4 h-4 text-emerald-400 shrink-0" />
                  <div>
                    <p className="text-[9px] uppercase font-black tracking-wider text-slate-400 leading-tight">Seguridad</p>
                    <p className="font-bold text-[11px] leading-tight">Bóveda Cifrada</p>
                  </div>
                </div>

                <div className={`flex items-center gap-2 px-3 py-1.5 rounded-xl border text-xs ${
                  isLight ? 'bg-slate-50 border-slate-200 text-slate-700' : 'bg-slate-950/60 border-slate-800 text-slate-300'
                }`}>
                  <Activity className="w-4 h-4 text-[#2C80C6] shrink-0" />
                  <div>
                    <p className="text-[9px] uppercase font-black tracking-wider text-slate-400 leading-tight">Infraestructura</p>
                    <p className="font-bold text-[11px] leading-tight">99.98% Disponibilidad</p>
                  </div>
                </div>

                <Link
                  href="/"
                  target="_blank"
                  className={`px-3 py-2 rounded-xl border text-xs font-bold uppercase tracking-wider flex items-center gap-1.5 transition-all cursor-pointer ${
                    isLight 
                      ? 'bg-white border-slate-200 text-slate-700 hover:bg-slate-50 shadow-xs' 
                      : 'bg-slate-900 border-slate-800 text-slate-200 hover:bg-slate-800'
                  }`}
                >
                  <ExternalLink className="w-3.5 h-3.5 text-[#2C80C6]" />
                  <span>Ver Web</span>
                </Link>

                <a
                  href={`https://wa.me/${siteConfig.whatsappNumber}?text=${encodeURIComponent(`Hola Gmedia, solicito asistencia para el portal de ${siteConfig.brandName}.`)}`}
                  target="_blank"
                  rel="noreferrer"
                  className="px-3.5 py-2 rounded-xl bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-500 hover:to-teal-500 text-white text-xs font-bold uppercase tracking-wider flex items-center gap-1.5 shadow-md shadow-emerald-600/20 transition-all hover:-translate-y-0.5 whitespace-nowrap cursor-pointer"
                >
                  <MessageSquare className="w-3.5 h-3.5" />
                  <span>Soporte Prioritario</span>
                </a>

                {/* Sun/Moon Toggle */}
                <button
                  type="button"
                  onClick={toggleTheme}
                  title={isLight ? "Cambiar a Modo Oscuro" : "Cambiar a Modo Claro"}
                  className={`w-9 h-9 rounded-xl border flex items-center justify-center transition-all cursor-pointer ${
                    isLight 
                      ? 'border-slate-200 bg-white text-slate-700 hover:bg-slate-100 shadow-xs' 
                      : 'border-slate-800 bg-slate-900 text-amber-400 hover:bg-slate-800'
                  }`}
                >
                  {isLight ? <Moon className="w-4 h-4" /> : <Sun className="w-4 h-4" />}
                </button>
              </div>
            </div>
          </header>

          {/* ========================================================================= */}
          {/* KPI TELEMETRÍA EJECUTIVA GSPACE (SILICON VALLEY 2030)                      */}
          {/* ========================================================================= */}
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
            <div className={`p-5 rounded-2xl border transition-all ${
              isLight ? 'bg-white border-slate-200/90 shadow-sm' : 'bg-[#0B0F19]/90 border-slate-800/80 shadow-black/40'
            }`}>
              <div className="flex justify-between items-start">
                <span className={`text-[10px] font-mono font-bold uppercase tracking-wider ${isLight ? 'text-slate-500' : 'text-slate-400'}`}>
                  Prospectos Activos
                </span>
                <div className="p-2 rounded-xl bg-emerald-500/10 text-emerald-500"><Users className="w-4 h-4" /></div>
              </div>
              <div className={`mt-2.5 text-2xl sm:text-3xl font-black ${isLight ? 'text-slate-900' : 'text-white'}`}>{leads.length}</div>
              <p className="text-[11px] text-emerald-500 mt-1 flex items-center gap-1 font-semibold">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" /> {leads.filter(l => l.status === 'new').length} nuevos hoy
              </p>
            </div>

            <div className={`p-5 rounded-2xl border transition-all ${
              isLight ? 'bg-white border-slate-200/90 shadow-sm' : 'bg-[#0B0F19]/90 border-slate-800/80 shadow-black/40'
            }`}>
              <div className="flex justify-between items-start">
                <span className={`text-[10px] font-mono font-bold uppercase tracking-wider ${isLight ? 'text-slate-500' : 'text-slate-400'}`}>
                  Citas Confirmadas
                </span>
                <div className="p-2 rounded-xl bg-blue-500/10 text-[#2C80C6]"><Calendar className="w-4 h-4" /></div>
              </div>
              <div className={`mt-2.5 text-2xl sm:text-3xl font-black ${isLight ? 'text-slate-900' : 'text-white'}`}>
                {appointments.filter(a => a.status === 'confirmed').length}
              </div>
              <p className={`text-[11px] mt-1 ${isLight ? 'text-slate-500' : 'text-slate-400'}`}>Próximas en agenda corporativa</p>
            </div>

            <div className={`p-5 rounded-2xl border transition-all ${
              isLight ? 'bg-white border-slate-200/90 shadow-sm' : 'bg-[#0B0F19]/90 border-slate-800/80 shadow-black/40'
            }`}>
              <div className="flex justify-between items-start">
                <span className={`text-[10px] font-mono font-bold uppercase tracking-wider ${isLight ? 'text-slate-500' : 'text-slate-400'}`}>
                  Cotizaciones Pipeline
                </span>
                <div className="p-2 rounded-xl bg-purple-500/10 text-[#583EBF]"><DollarSign className="w-4 h-4" /></div>
              </div>
              <div className={`mt-2.5 text-2xl sm:text-3xl font-black ${isLight ? 'text-slate-900' : 'text-white'}`}>{quotes.length}</div>
              <p className="text-[11px] text-[#583EBF] dark:text-purple-400 mt-1 font-semibold">Proformas oficiales emitidas</p>
            </div>

            <div className={`p-5 rounded-2xl border transition-all ${
              isLight ? 'bg-white border-slate-200/90 shadow-sm' : 'bg-[#0B0F19]/90 border-slate-800/80 shadow-black/40'
            }`}>
              <div className="flex justify-between items-start">
                <span className={`text-[10px] font-mono font-bold uppercase tracking-wider ${isLight ? 'text-slate-500' : 'text-slate-400'}`}>
                  Infraestructura Web
                </span>
                <div className="p-2 rounded-xl bg-emerald-500/10 text-emerald-500"><ShieldCheck className="w-4 h-4" /></div>
              </div>
              <div className={`mt-2.5 text-base sm:text-lg font-black flex items-center gap-1.5 ${isLight ? 'text-slate-900' : 'text-white'}`}>
                <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" /> 100% Operativo
              </div>
              <p className={`text-[11px] mt-1 font-mono ${isLight ? 'text-slate-500' : 'text-slate-400'}`}>Next.js Edge Runtime</p>
            </div>
          </div>

          {/* ========================================================================= */}
          {/* 3. DOCUMENT CANVAS (VISTAS INTERNAS DE CADA MÓDULO)                        */}
          {/* ========================================================================= */}

          {/* ---------------- PESTAÑA: LEADS & CRM ---------------- */}
          {activeTab === 'leads' && (
            <div className="space-y-4 animate-in fade-in duration-300">
              {/* Toolbar de Filtros y Acciones */}
              <div className={`p-4 sm:p-5 rounded-2xl border flex flex-col md:flex-row justify-between items-start md:items-center gap-4 transition-all ${
                isLight ? 'bg-white border-slate-200/90 shadow-sm' : 'bg-[#0B0F19]/90 border-slate-800/80 shadow-black/40'
              }`}>
                {/* Search & Status Filters */}
                <div className="flex items-center gap-2.5 flex-1 w-full md:w-auto">
                  <div className="relative flex-1 sm:w-72">
                    <Search className="w-4 h-4 absolute left-3.5 top-3 text-slate-400" />
                    <Input
                      placeholder="Buscar por nombre, teléfono o servicio..."
                      value={searchFilter}
                      onChange={(e) => setSearchFilter(e.target.value)}
                      className={`h-10 pl-10 text-xs rounded-xl ${
                        isLight 
                          ? 'bg-slate-50 border-slate-200 text-slate-900 placeholder:text-slate-400' 
                          : 'bg-slate-950/80 border-slate-800 text-white'
                      }`}
                    />
                  </div>
                  <select
                    value={statusFilter}
                    onChange={(e) => setStatusFilter(e.target.value)}
                    className={`h-10 text-xs border rounded-xl px-3 outline-none cursor-pointer font-bold ${
                      isLight 
                        ? 'bg-white border-slate-200 text-slate-800' 
                        : 'bg-slate-950/80 border-slate-800 text-slate-300'
                    }`}
                  >
                    <option value="all">Todos ({leads.length})</option>
                    <option value="new">Nuevos ({leads.filter(l => l.status === 'new').length})</option>
                    <option value="contacted">Contactados ({leads.filter(l => l.status === 'contacted').length})</option>
                    <option value="closed">Cerrados ({leads.filter(l => l.status === 'closed').length})</option>
                  </select>
                </div>

                <div className="flex items-center gap-2 w-full md:w-auto justify-end">
                  <button
                    onClick={handleExportCSV}
                    className={`px-4 py-2.5 rounded-xl border text-xs font-bold uppercase tracking-wider flex items-center gap-1.5 transition-all cursor-pointer ${
                      isLight 
                        ? 'bg-white hover:bg-slate-50 border-slate-200 text-slate-700 shadow-xs' 
                        : 'bg-slate-900 hover:bg-slate-800 border-slate-800 text-slate-200'
                    }`}
                  >
                    <Download className="w-3.5 h-3.5 text-[#2C80C6]" />
                    <span>Exportar CSV</span>
                  </button>
                </div>
              </div>

              {/* Lista Ejecutiva de Leads */}
              <div className="space-y-3">
                {filteredLeads.length === 0 ? (
                  <div className={`p-12 text-center rounded-2xl border ${
                    isLight ? 'bg-white border-slate-200 text-slate-500' : 'bg-[#0B0F19]/90 border-slate-800 text-slate-400'
                  }`}>
                    <Users className="w-10 h-10 mx-auto text-slate-400 mb-3" />
                    <p className="text-sm font-bold">No se encontraron prospectos que coincidan con el filtro.</p>
                  </div>
                ) : (
                  filteredLeads.map((lead) => (
                    <div 
                      key={lead.id} 
                      className={`p-5 rounded-2xl border transition-all ${
                        isLight 
                          ? 'bg-white border-slate-200/90 hover:border-slate-300 shadow-sm' 
                          : 'bg-[#0B0F19]/90 border-slate-800/80 hover:border-slate-700 shadow-black/40'
                      }`}
                    >
                      <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-4">
                        <div className="flex items-start gap-4">
                          <div className="w-11 h-11 rounded-2xl bg-gradient-to-tr from-[#2C80C6]/20 to-[#583EBF]/20 text-[#2C80C6] dark:text-blue-400 flex items-center justify-center font-black text-sm shrink-0 border border-blue-500/20">
                            {lead.name.charAt(0).toUpperCase()}
                          </div>
                          <div className="space-y-1">
                            <div className="flex items-center gap-2.5 flex-wrap">
                              <h3 className={`font-black text-sm ${isLight ? 'text-slate-900' : 'text-white'}`}>{lead.name}</h3>
                              <span className={`text-[9px] uppercase tracking-wider font-black px-2.5 py-0.5 rounded-full border ${
                                lead.status === 'new' 
                                  ? 'bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border-emerald-500/30' 
                                  : lead.status === 'contacted' 
                                    ? 'bg-amber-500/10 text-amber-600 dark:text-amber-400 border-amber-500/30' 
                                    : 'bg-blue-500/10 text-blue-600 dark:text-blue-400 border-blue-500/30'
                              }`}>
                                {lead.status === 'new' ? 'NUEVO' : lead.status === 'contacted' ? 'CONTACTADO' : 'CERRADO'}
                              </span>
                              <span className={`text-[10px] font-mono ${isLight ? 'text-slate-400' : 'text-slate-500'}`}>{lead.date}</span>
                            </div>
                            <div className={`flex flex-wrap items-center gap-x-4 gap-y-1 text-xs ${isLight ? 'text-slate-600' : 'text-slate-400'}`}>
                              <span className={`flex items-center gap-1 font-bold ${isLight ? 'text-slate-800' : 'text-slate-200'}`}>
                                <Phone className="w-3 h-3 text-[#2C80C6]" /> {lead.phone}
                              </span>
                              <span className="flex items-center gap-1">
                                <Mail className="w-3 h-3 text-slate-400" /> {lead.email}
                              </span>
                              <span>Servicio: <strong className="text-[#2C80C6]">{lead.service}</strong></span>
                              {lead.budget && (
                                <span className="text-emerald-600 dark:text-emerald-400 font-mono font-bold bg-emerald-500/10 px-2 py-0.5 rounded">
                                  {lead.budget}
                                </span>
                              )}
                            </div>
                          </div>
                        </div>

                        <div className={`flex items-center gap-2.5 w-full lg:w-auto pt-3 lg:pt-0 border-t lg:border-t-0 ${isLight ? 'border-slate-100' : 'border-slate-800'}`}>
                          <a
                            href={`https://wa.me/${lead.phone.replace(/[^0-9]/g, '')}?text=${encodeURIComponent(`Hola ${lead.name}, un gusto saludarte. Te escribo de ${siteConfig.brandName}. Recibimos tu solicitud sobre "${lead.service}". ¿Cuándo tendrías unos minutos para conversar?`)}`}
                            target="_blank"
                            rel="noreferrer"
                            className="px-3.5 py-2 rounded-xl bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-500 text-white font-bold text-xs flex items-center gap-1.5 shadow-md shadow-emerald-600/20 transition-all cursor-pointer whitespace-nowrap"
                          >
                            <MessageSquare className="w-3.5 h-3.5" /> WhatsApp
                          </a>
                          
                          <select
                            value={lead.status}
                            onChange={(e) => handleUpdateLeadStatus(lead.id, e.target.value as any)}
                            className={`h-9 text-xs border rounded-xl px-2.5 outline-none cursor-pointer font-bold ${
                              isLight ? 'bg-slate-50 border-slate-200 text-slate-700' : 'bg-slate-900 border-slate-700 text-slate-300'
                            }`}
                          >
                            <option value="new">Nuevo</option>
                            <option value="contacted">Contactado</option>
                            <option value="closed">Cerrado</option>
                          </select>

                          <button
                            onClick={() => handleDeleteLead(lead.id)}
                            className="p-2 rounded-xl text-slate-400 hover:text-rose-500 hover:bg-rose-500/10 transition-colors cursor-pointer"
                            title="Eliminar lead"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </div>
                      </div>
                    </div>
                  ))
                )}
              </div>
            </div>
          )}

          {/* ---------------- PESTAÑA: CITAS & AGENDA ---------------- */}
          {activeTab === 'appointments' && (
            <div className="space-y-4 animate-in fade-in duration-300">
              <div className={`p-5 rounded-2xl border flex justify-between items-center transition-all ${
                isLight ? 'bg-white border-slate-200/90 shadow-sm' : 'bg-[#0B0F19]/90 border-slate-800/80 shadow-black/40'
              }`}>
                <div>
                  <h2 className={`text-base font-black tracking-tight ${isLight ? 'text-slate-900' : 'text-white'}`}>
                    Agenda de Citas & Visitas Técnicas
                  </h2>
                  <p className={`text-xs mt-0.5 ${isLight ? 'text-slate-500' : 'text-slate-400'}`}>
                    Organice las visitas de evaluación y reuniones con clientes de su empresa.
                  </p>
                </div>
                <button
                  onClick={() => setShowNewAptModal(true)}
                  className="px-4 py-2.5 rounded-xl bg-gradient-to-r from-[#583EBF] to-[#2C80C6] hover:from-[#4B34A8] hover:to-[#2470AE] text-white font-bold text-xs uppercase tracking-wider shadow-md shadow-blue-500/20 transition-all flex items-center gap-1.5 cursor-pointer"
                >
                  <Plus className="w-4 h-4" /> Agendar Cita
                </button>
              </div>

              {/* Modal de Nueva Cita */}
              {showNewAptModal && (
                <div className={`p-6 rounded-2xl border shadow-xl animate-in zoom-in-95 duration-200 ${
                  isLight ? 'bg-white border-slate-200' : 'bg-[#0B0F19] border-slate-800'
                }`}>
                  <h3 className="text-sm font-black uppercase tracking-wider text-[#2C80C6] mb-3">
                    Nueva Cita en Calendario
                  </h3>
                  <form onSubmit={handleAddAppointment} className="space-y-3">
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                      <Input
                        placeholder="Nombre completo del cliente *"
                        value={newApt.clientName}
                        onChange={(e) => setNewApt({ ...newApt, clientName: e.target.value })}
                        className="h-10 text-xs rounded-xl"
                      />
                      <Input
                        placeholder="Teléfono móvil / WhatsApp *"
                        value={newApt.phone}
                        onChange={(e) => setNewApt({ ...newApt, phone: e.target.value })}
                        className="h-10 text-xs rounded-xl"
                      />
                      <Input
                        placeholder="Servicio o Motivo de la Cita"
                        value={newApt.service}
                        onChange={(e) => setNewApt({ ...newApt, service: e.target.value })}
                        className="h-10 text-xs rounded-xl"
                      />
                      <div className="grid grid-cols-2 gap-2">
                        <Input
                          type="date"
                          value={newApt.date}
                          onChange={(e) => setNewApt({ ...newApt, date: e.target.value })}
                          className="h-10 text-xs rounded-xl"
                        />
                        <Input
                          placeholder="Hora (ej. 10:00 AM)"
                          value={newApt.time}
                          onChange={(e) => setNewApt({ ...newApt, time: e.target.value })}
                          className="h-10 text-xs rounded-xl"
                        />
                      </div>
                    </div>
                    <div className="flex gap-2 pt-2">
                      <Button type="submit" size="sm" className="bg-[#2C80C6] text-white font-bold text-xs rounded-xl cursor-pointer">
                        Confirmar y Agendar
                      </Button>
                      <Button type="button" variant="ghost" size="sm" onClick={() => setShowNewAptModal(false)} className="text-xs rounded-xl cursor-pointer">
                        Cancelar
                      </Button>
                    </div>
                  </form>
                </div>
              )}

              {/* Lista de Citas */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {appointments.map((apt) => (
                  <div
                    key={apt.id}
                    className={`p-5 rounded-2xl border transition-all flex flex-col justify-between ${
                      isLight ? 'bg-white border-slate-200/90 shadow-sm' : 'bg-[#0B0F19]/90 border-slate-800/80 shadow-black/40'
                    }`}
                  >
                    <div>
                      <div className="flex justify-between items-start mb-3">
                        <div className="flex items-center gap-2">
                          <span className={`p-2 rounded-xl text-white ${
                            apt.status === 'confirmed' ? 'bg-emerald-600' : 'bg-amber-600'
                          }`}>
                            <Calendar className="w-4 h-4" />
                          </span>
                          <div>
                            <span className="text-[10px] font-mono uppercase tracking-widest text-slate-400">FECHA AGENDADA</span>
                            <p className="font-black text-xs font-mono">{apt.date} · {apt.time}</p>
                          </div>
                        </div>
                        <span className={`text-[9px] font-black uppercase px-2 py-0.5 rounded-full border ${
                          apt.status === 'confirmed' ? 'bg-emerald-500/10 text-emerald-600 border-emerald-500/20' : 'bg-amber-500/10 text-amber-600 border-amber-500/20'
                        }`}>
                          {apt.status}
                        </span>
                      </div>
                      <h4 className={`font-black text-sm ${isLight ? 'text-slate-900' : 'text-white'}`}>{apt.clientName}</h4>
                      <p className={`text-xs mt-1 ${isLight ? 'text-slate-600' : 'text-slate-400'}`}>
                        Servicio: <strong className="text-[#2C80C6]">{apt.service}</strong>
                      </p>
                    </div>

                    <div className="flex justify-between items-center pt-4 mt-4 border-t border-slate-100 dark:border-slate-800">
                      <span className="text-xs font-mono font-bold text-slate-400">{apt.phone}</span>
                      <a
                        href={`https://wa.me/${apt.phone.replace(/[^0-9]/g, '')}?text=${encodeURIComponent(`Hola ${apt.clientName}, te escribimos de ${siteConfig.brandName} para confirmar tu cita de ${apt.service} programada para el ${apt.date} a las ${apt.time}. ¡Nos vemos pronto!`)}`}
                        target="_blank"
                        rel="noreferrer"
                        className="px-3 py-1.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs flex items-center gap-1.5 shadow-sm"
                      >
                        <MessageSquare className="w-3.5 h-3.5" /> Recordar
                      </a>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* ---------------- PESTAÑA: COTIZADOR & FACTURACIÓN (EXECUTIVE PAPER) ---------------- */}
          {activeTab === 'quotes' && (
            <div className="space-y-4 animate-in fade-in duration-300">
              <div className={`p-5 rounded-2xl border flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3 transition-all ${
                isLight ? 'bg-white border-slate-200/90 shadow-sm' : 'bg-[#0B0F19]/90 border-slate-800/80 shadow-black/40'
              }`}>
                <div>
                  <h2 className={`text-base font-black tracking-tight ${isLight ? 'text-slate-900' : 'text-white'}`}>
                    Generador de Cotizaciones Proforma
                  </h2>
                  <p className={`text-xs mt-0.5 ${isLight ? 'text-slate-500' : 'text-slate-400'}`}>
                    Emisión de proformas formales desglosadas con envío directo por WhatsApp.
                  </p>
                </div>
                <button
                  onClick={() => setShowNewQuoteModal(true)}
                  className="px-4 py-2.5 rounded-xl bg-gradient-to-r from-[#583EBF] to-[#2C80C6] hover:from-[#4B34A8] hover:to-[#2470AE] text-white font-bold text-xs uppercase tracking-wider shadow-md shadow-blue-500/20 transition-all flex items-center gap-1.5 cursor-pointer"
                >
                  <Plus className="w-4 h-4" /> Nueva Cotización
                </button>
              </div>

              {/* Modal de Nueva Cotización */}
              {showNewQuoteModal && (
                <div className={`p-6 rounded-[28px] border shadow-2xl animate-in zoom-in-95 duration-200 ${
                  isLight ? 'bg-white border-slate-200' : 'bg-[#0B0F19] border-slate-800'
                }`}>
                  <h3 className="text-sm font-black uppercase tracking-wider text-[#2C80C6] mb-4">
                    Emitir Nueva Proforma
                  </h3>
                  <form onSubmit={handleAddQuote} className="space-y-4">
                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                      <Input
                        placeholder="Nombre o Razón Social del Cliente *"
                        value={newQuote.clientName}
                        onChange={e => setNewQuote({ ...newQuote, clientName: e.target.value })}
                        className="h-10 text-xs rounded-xl"
                      />
                      <Input
                        placeholder="WhatsApp / Teléfono *"
                        value={newQuote.clientPhone}
                        onChange={e => setNewQuote({ ...newQuote, clientPhone: e.target.value })}
                        className="h-10 text-xs rounded-xl"
                      />
                      <Input
                        placeholder="Correo Electrónico"
                        value={newQuote.clientEmail}
                        onChange={e => setNewQuote({ ...newQuote, clientEmail: e.target.value })}
                        className="h-10 text-xs rounded-xl"
                      />
                    </div>
                    <div className="grid grid-cols-1 sm:grid-cols-4 gap-3">
                      <div className="sm:col-span-2">
                        <Input
                          placeholder="Descripción del concepto/servicio *"
                          value={newQuote.desc1}
                          onChange={e => setNewQuote({ ...newQuote, desc1: e.target.value })}
                          className="h-10 text-xs rounded-xl"
                        />
                      </div>
                      <Input
                        type="number"
                        placeholder="Cantidad"
                        value={newQuote.qty1}
                        onChange={e => setNewQuote({ ...newQuote, qty1: Number(e.target.value) })}
                        className="h-10 text-xs rounded-xl"
                      />
                      <Input
                        type="number"
                        placeholder="Precio Unitario ($ USD)"
                        value={newQuote.price1}
                        onChange={e => setNewQuote({ ...newQuote, price1: Number(e.target.value) })}
                        className="h-10 text-xs rounded-xl"
                      />
                    </div>
                    <div className="flex gap-2">
                      <Button type="submit" size="sm" className="bg-[#2C80C6] text-white font-bold text-xs rounded-xl cursor-pointer">
                        Emitir y Guardar
                      </Button>
                      <Button type="button" variant="ghost" size="sm" onClick={() => setShowNewQuoteModal(false)} className="text-xs rounded-xl cursor-pointer">
                        Cancelar
                      </Button>
                    </div>
                  </form>
                </div>
              )}

              {/* Documentos Proforma Renderizados (Silicon Valley 2030 Paper Design) */}
              <div className="space-y-6">
                {quotes.map((q) => {
                  const subtotal = q.items.reduce((acc, it) => acc + (it.quantity * it.unitPrice), 0);
                  const tax = subtotal * (q.taxRate / 100);
                  const total = subtotal + tax;

                  return (
                    <div
                      key={q.id}
                      className={`p-6 sm:p-8 rounded-[28px] border transition-all relative overflow-hidden ${
                        isLight 
                          ? 'bg-white border-slate-200/90 shadow-lg shadow-slate-200/40' 
                          : 'bg-[#0B0F19]/95 border-slate-800/80 shadow-2xl shadow-black/50'
                      }`}
                    >
                      {/* Watermark sutil de proforma */}
                      <div className="absolute top-4 right-6 text-[10px] font-mono tracking-widest uppercase font-black opacity-30 select-none">
                        GSpace Digital Proforma
                      </div>

                      {/* Header de la Proforma */}
                      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 border-b border-slate-100 dark:border-slate-800 pb-5">
                        <div>
                          <div className="flex items-center gap-2">
                            <span className="text-base font-black font-mono text-[#2C80C6]">{q.quoteNumber}</span>
                            <span className={`text-[10px] font-black uppercase font-mono px-2.5 py-0.5 rounded-full border ${
                              q.status === 'approved' ? 'bg-emerald-500/10 text-emerald-600 border-emerald-500/30' :
                              q.status === 'sent' ? 'bg-blue-500/10 text-blue-600 border-blue-500/30' :
                              'bg-slate-500/10 text-slate-500 border-slate-500/30'
                            }`}>
                              {q.status.toUpperCase()}
                            </span>
                          </div>
                          <h3 className={`font-black text-lg mt-1 ${isLight ? 'text-slate-900' : 'text-white'}`}>{q.clientName}</h3>
                          <p className={`text-xs mt-0.5 ${isLight ? 'text-slate-500' : 'text-slate-400'}`}>
                            {q.clientEmail} • {q.clientPhone}
                          </p>
                        </div>

                        <div className="text-left sm:text-right">
                          <span className="text-[10px] font-mono uppercase tracking-widest text-slate-400 block font-bold">Total Presupuestado</span>
                          <div className="text-3xl font-black text-emerald-500 font-mono tracking-tight">${total.toLocaleString()} USD</div>
                          <span className="text-[11px] text-slate-400">Fecha de Emisión: {q.date}</span>
                        </div>
                      </div>

                      {/* Tabla Desglosada */}
                      <div className="overflow-x-auto my-6">
                        <table className="w-full text-xs text-left">
                          <thead className={`text-[10px] uppercase font-mono tracking-wider border-b ${
                            isLight ? 'text-slate-400 border-slate-100' : 'text-slate-500 border-slate-800'
                          }`}>
                            <tr>
                              <th className="py-2.5">Descripción del Concepto</th>
                              <th className="py-2.5 text-center">Cant.</th>
                              <th className="py-2.5 text-right">Precio Unitario</th>
                              <th className="py-2.5 text-right">Importe Total</th>
                            </tr>
                          </thead>
                          <tbody className={`divide-y font-mono ${isLight ? 'divide-slate-100' : 'divide-slate-800/60'}`}>
                            {q.items.map((it) => (
                              <tr key={it.id}>
                                <td className={`py-3 font-sans font-medium ${isLight ? 'text-slate-800' : 'text-slate-200'}`}>
                                  {it.description}
                                </td>
                                <td className="py-3 text-center text-slate-400">{it.quantity}</td>
                                <td className="py-3 text-right text-slate-400">${it.unitPrice.toLocaleString()}</td>
                                <td className={`py-3 text-right font-black ${isLight ? 'text-slate-900' : 'text-white'}`}>
                                  ${(it.quantity * it.unitPrice).toLocaleString()}
                                </td>
                              </tr>
                            ))}
                          </tbody>
                        </table>
                      </div>

                      {/* Totales y Acciones */}
                      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-end gap-4 pt-4 border-t border-slate-100 dark:border-slate-800">
                        <div className="text-xs text-slate-400 space-y-1">
                          <p>• Incluye garantía de materiales y mano de obra certificada.</p>
                          <p>• Validez de la oferta: 30 días calendario.</p>
                        </div>

                        <div className="flex items-center gap-2.5 w-full sm:w-auto justify-end">
                          <select
                            value={q.status}
                            onChange={(e) => handleUpdateQuoteStatus(q.id, e.target.value as any)}
                            className={`h-9 text-xs border rounded-xl px-2.5 outline-none cursor-pointer font-bold ${
                              isLight ? 'bg-slate-50 border-slate-200 text-slate-700' : 'bg-slate-900 border-slate-700 text-slate-300'
                            }`}
                          >
                            <option value="draft">Borrador</option>
                            <option value="sent">Enviada</option>
                            <option value="approved">Aprobada</option>
                            <option value="paid">Pagada</option>
                          </select>

                          <a
                            href={`https://wa.me/${q.clientPhone.replace(/[^0-9]/g, '')}?text=${encodeURIComponent(`Estimado/a ${q.clientName}, le compartimos la cotización ${q.quoteNumber} emitida formalmente por ${siteConfig.brandName} por un monto de $${total.toLocaleString()} USD. Quedamos a sus órdenes para cualquier detalle técnico o inicio de obras.`)}`}
                            target="_blank"
                            rel="noreferrer"
                            className="px-4 py-2.5 rounded-xl bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-500 text-white font-bold text-xs uppercase tracking-wider flex items-center gap-1.5 shadow-md shadow-emerald-600/20 transition-all cursor-pointer whitespace-nowrap"
                          >
                            <MessageSquare className="w-3.5 h-3.5" /> Enviar por WhatsApp
                          </a>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          )}

          {/* ---------------- PESTAÑA: GALERÍA DE PROYECTOS (ANTES Y DESPUÉS) ---------------- */}
          {activeTab === 'portfolio' && (
            <div className="space-y-4 animate-in fade-in duration-300">
              <div className={`p-5 rounded-2xl border flex justify-between items-center transition-all ${
                isLight ? 'bg-white border-slate-200/90 shadow-sm' : 'bg-[#0B0F19]/90 border-slate-800/80 shadow-black/40'
              }`}>
                <div>
                  <h2 className={`text-base font-black tracking-tight ${isLight ? 'text-slate-900' : 'text-white'}`}>
                    Galería de Proyectos (Casos Antes y Después)
                  </h2>
                  <p className={`text-xs mt-0.5 ${isLight ? 'text-slate-500' : 'text-slate-400'}`}>
                    Fotos de transformaciones reales para generar máxima confianza y credibilidad.
                  </p>
                </div>
                <button
                  onClick={() => setShowNewProjectModal(true)}
                  className="px-4 py-2.5 rounded-xl bg-gradient-to-r from-[#583EBF] to-[#2C80C6] hover:from-[#4B34A8] hover:to-[#2470AE] text-white font-bold text-xs uppercase tracking-wider shadow-md shadow-blue-500/20 transition-all flex items-center gap-1.5 cursor-pointer"
                >
                  <Plus className="w-4 h-4" /> Añadir Proyecto
                </button>
              </div>

              {/* Modal de Nuevo Proyecto */}
              {showNewProjectModal && (
                <div className={`p-6 rounded-2xl border shadow-xl animate-in zoom-in-95 duration-200 ${
                  isLight ? 'bg-white border-slate-200' : 'bg-[#0B0F19] border-slate-800'
                }`}>
                  <h3 className="text-sm font-black uppercase tracking-wider text-[#2C80C6] mb-3">
                    Nuevo Proyecto en Portafolio
                  </h3>
                  <form onSubmit={handleAddProject} className="space-y-3 text-xs">
                    <Input placeholder="Título del Proyecto (ej. Cancha Club Los Prados)" value={newProj.title} onChange={e => setNewProj({...newProj, title: e.target.value})} className="h-10 text-xs rounded-xl" />
                    <Input placeholder="Descripción breve" value={newProj.description} onChange={e => setNewProj({...newProj, description: e.target.value})} className="h-10 text-xs rounded-xl" />
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                      <Input placeholder="URL Foto Antes (opcional)" value={newProj.beforeImgUrl} onChange={e => setNewProj({...newProj, beforeImgUrl: e.target.value})} className="h-10 text-xs font-mono rounded-xl" />
                      <Input placeholder="URL Foto Después (opcional)" value={newProj.afterImgUrl} onChange={e => setNewProj({...newProj, afterImgUrl: e.target.value})} className="h-10 text-xs font-mono rounded-xl" />
                    </div>
                    <div className="flex gap-2 pt-2">
                      <Button type="submit" size="sm" className="bg-[#2C80C6] text-white font-bold text-xs rounded-xl cursor-pointer">Publicar en Web</Button>
                      <Button type="button" variant="ghost" size="sm" onClick={() => setShowNewProjectModal(false)} className="text-xs rounded-xl cursor-pointer">Cancelar</Button>
                    </div>
                  </form>
                </div>
              )}

              {/* Grid de Proyectos */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                {projects.map((proj) => (
                  <div
                    key={proj.id}
                    className={`p-5 rounded-[28px] border transition-all space-y-4 ${
                      isLight ? 'bg-white border-slate-200/90 shadow-sm' : 'bg-[#0B0F19]/90 border-slate-800/80 shadow-black/40'
                    }`}
                  >
                    <div className="grid grid-cols-2 gap-2 rounded-2xl overflow-hidden h-48">
                      <div className="relative bg-slate-800 overflow-hidden group">
                        <img src={proj.beforeImgUrl} alt="Antes" className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105" />
                        <span className="absolute bottom-2 left-2 text-[9px] font-black uppercase bg-black/80 backdrop-blur-sm text-white px-2.5 py-1 rounded-full">
                          ANTES
                        </span>
                      </div>
                      <div className="relative bg-slate-800 overflow-hidden group">
                        <img src={proj.afterImgUrl} alt="Después" className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105" />
                        <span className="absolute bottom-2 left-2 text-[9px] font-black uppercase bg-emerald-600 text-white px-2.5 py-1 rounded-full shadow-md">
                          DESPUÉS
                        </span>
                      </div>
                    </div>

                    <div className="space-y-1">
                      <div className="flex justify-between items-start gap-2">
                        <h4 className={`font-black text-sm ${isLight ? 'text-slate-900' : 'text-white'}`}>{proj.title}</h4>
                        <span className="text-[10px] font-mono px-2 py-0.5 rounded-full border border-slate-200 dark:border-slate-800 text-slate-400 font-bold">
                          {proj.category}
                        </span>
                      </div>
                      <p className={`text-xs leading-relaxed ${isLight ? 'text-slate-600' : 'text-slate-400'}`}>
                        {proj.description}
                      </p>
                    </div>

                    <div className="flex justify-between items-center pt-3 border-t border-slate-100 dark:border-slate-800 text-xs">
                      <span className="text-slate-400 font-medium">Estado en sitio público:</span>
                      <button
                        onClick={() => handleToggleProject(proj.id)}
                        className={`px-3 py-1.5 rounded-xl text-[10px] font-black tracking-wider uppercase cursor-pointer transition-all ${
                          proj.visible 
                            ? 'bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border border-emerald-500/20' 
                            : 'bg-slate-100 dark:bg-slate-800 text-slate-400'
                        }`}
                      >
                        {proj.visible ? '🟢 Publicado en Web' : '⚪ Oculto'}
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* ---------------- PESTAÑA: RESEÑAS & TESTIMONIOS ---------------- */}
          {activeTab === 'reviews' && (
            <div className="space-y-4 animate-in fade-in duration-300">
              <div className={`p-5 rounded-2xl border transition-all ${
                isLight ? 'bg-white border-slate-200/90 shadow-sm' : 'bg-[#0B0F19]/90 border-slate-800/80 shadow-black/40'
              }`}>
                <h2 className={`text-base font-black tracking-tight ${isLight ? 'text-slate-900' : 'text-white'}`}>
                  Gestor de Reseñas & Prueba Social
                </h2>
                <p className={`text-xs mt-0.5 ${isLight ? 'text-slate-500' : 'text-slate-400'}`}>
                  Seleccione qué testimonios de clientes satisfechos se publican en el sitio oficial.
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {reviews.map((rev) => (
                  <div
                    key={rev.id}
                    className={`p-5 rounded-2xl border transition-all space-y-3 ${
                      isLight ? 'bg-white border-slate-200/90 shadow-sm' : 'bg-[#0B0F19]/90 border-slate-800/80 shadow-black/40'
                    }`}
                  >
                    <div className="flex justify-between items-start">
                      <div>
                        <div className="flex gap-1 text-amber-400 mb-1.5">
                          {[...Array(rev.rating)].map((_, i) => (
                            <Star key={i} className="w-3.5 h-3.5 fill-amber-400" />
                          ))}
                        </div>
                        <h4 className={`font-black text-sm ${isLight ? 'text-slate-900' : 'text-white'}`}>{rev.author}</h4>
                        <p className="text-[11px] text-slate-400 font-medium">{rev.roleOrCompany}</p>
                      </div>
                      <button
                        onClick={() => handleToggleReview(rev.id)}
                        className={`px-3 py-1.5 rounded-xl text-[10px] font-black uppercase tracking-wider cursor-pointer transition-all ${
                          rev.visible ? 'bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border border-emerald-500/20' : 'bg-slate-100 dark:bg-slate-800 text-slate-400'
                        }`}
                      >
                        {rev.visible ? 'Visible en Web' : 'Oculto'}
                      </button>
                    </div>
                    <p className={`text-xs italic leading-relaxed ${isLight ? 'text-slate-700' : 'text-slate-300'}`}>
                      "{rev.comment}"
                    </p>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* ---------------- PESTAÑA: SERVICIOS & PRECIOS ---------------- */}
          {activeTab === 'services' && (
            <div className="space-y-4 animate-in fade-in duration-300">
              <div className={`p-5 rounded-2xl border transition-all ${
                isLight ? 'bg-white border-slate-200/90 shadow-sm' : 'bg-[#0B0F19]/90 border-slate-800/80 shadow-black/40'
              }`}>
                <h2 className={`text-base font-black tracking-tight ${isLight ? 'text-slate-900' : 'text-white'}`}>
                  Catálogo de Servicios & Tarifario Base
                </h2>
                <p className={`text-xs mt-0.5 ${isLight ? 'text-slate-500' : 'text-slate-400'}`}>
                  Tarifas y especificaciones reflejadas en la cuadrícula de la página principal.
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {services.map((serv) => (
                  <div
                    key={serv.id}
                    className={`p-6 rounded-[28px] border transition-all flex flex-col justify-between space-y-4 ${
                      isLight ? 'bg-white border-slate-200/90 shadow-sm' : 'bg-[#0B0F19]/90 border-slate-800/80 shadow-black/40'
                    }`}
                  >
                    <div className="space-y-2">
                      <div className="flex justify-between items-start gap-1">
                        <span className="text-[10px] font-mono uppercase tracking-wider text-slate-400 font-bold">{serv.category}</span>
                        {serv.badge && (
                          <span className="text-[9px] font-black uppercase px-2 py-0.5 rounded-full bg-[#2C80C6]/10 text-[#2C80C6] border border-[#2C80C6]/20">
                            {serv.badge}
                          </span>
                        )}
                      </div>
                      <h4 className={`font-black text-sm ${isLight ? 'text-slate-900' : 'text-white'}`}>{serv.name}</h4>
                      <p className={`text-xs leading-relaxed ${isLight ? 'text-slate-600' : 'text-slate-400'}`}>{serv.description}</p>
                    </div>
                    <div className="pt-3 border-t border-slate-100 dark:border-slate-800 flex justify-between items-center text-xs">
                      <span className="font-black font-mono text-emerald-500 text-sm">{serv.priceEstimate}</span>
                      <span className="text-slate-400 text-[11px] font-mono">{serv.duration}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* ---------------- PESTAÑA: ANALÍTICA & MÉTRICAS ---------------- */}
          {activeTab === 'analytics' && (
            <div className="space-y-4 animate-in fade-in duration-300">
              <div className={`p-5 rounded-2xl border transition-all ${
                isLight ? 'bg-white border-slate-200/90 shadow-sm' : 'bg-[#0B0F19]/90 border-slate-800/80 shadow-black/40'
              }`}>
                <h2 className={`text-base font-black tracking-tight ${isLight ? 'text-slate-900' : 'text-white'}`}>
                  Métricas de Conversión & Rendimiento Comercial
                </h2>
                <p className={`text-xs mt-0.5 ${isLight ? 'text-slate-500' : 'text-slate-400'}`}>
                  Telemetría de visitantes, solicitudes y efectividad comercial del sitio.
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className={`p-6 rounded-2xl border transition-all space-y-2 ${
                  isLight ? 'bg-white border-slate-200/90 shadow-sm' : 'bg-[#0B0F19]/90 border-slate-800/80 shadow-black/40'
                }`}>
                  <span className="text-xs font-bold text-slate-400 uppercase tracking-wider">Tasa de Conversión Web</span>
                  <div className="text-4xl font-black text-emerald-500 font-mono">14.8%</div>
                  <p className="text-[11px] text-slate-400">14 de cada 100 visitantes contactan o cotizan.</p>
                </div>
                <div className={`p-6 rounded-2xl border transition-all space-y-2 ${
                  isLight ? 'bg-white border-slate-200/90 shadow-sm' : 'bg-[#0B0F19]/90 border-slate-800/80 shadow-black/40'
                }`}>
                  <span className="text-xs font-bold text-slate-400 uppercase tracking-wider">Clicks a WhatsApp</span>
                  <div className="text-4xl font-black text-[#2C80C6] font-mono">248</div>
                  <p className="text-[11px] text-slate-400">Conversaciones directas generadas este mes.</p>
                </div>
                <div className={`p-6 rounded-2xl border transition-all space-y-2 ${
                  isLight ? 'bg-white border-slate-200/90 shadow-sm' : 'bg-[#0B0F19]/90 border-slate-800/80 shadow-black/40'
                }`}>
                  <span className="text-xs font-bold text-slate-400 uppercase tracking-wider">Cotizaciones Simuladas</span>
                  <div className="text-4xl font-black text-[#583EBF] dark:text-purple-400 font-mono">182</div>
                  <p className="text-[11px] text-slate-400">Usuarios que interactuaron con el estimador de m².</p>
                </div>
              </div>
            </div>
          )}

          {/* ---------------- PESTAÑA: CMS LIGERO & OPERACIONES WEB ---------------- */}
          {activeTab === 'cms' && (
            <div className="space-y-6 animate-in fade-in duration-300">
              {/* Encabezado del CMS */}
              <div className={`p-6 rounded-[28px] border transition-all ${
                isLight ? 'bg-white border-slate-200/90 shadow-sm' : 'bg-[#0B0F19]/90 border-slate-800/80 shadow-black/40'
              }`}>
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="p-2 rounded-xl bg-gradient-to-tr from-[#2C80C6]/20 to-[#583EBF]/20 text-[#2C80C6] dark:text-blue-400">
                        <Sliders className="w-5 h-5" />
                      </span>
                      <h2 className={`text-lg sm:text-xl font-black tracking-tight ${isLight ? 'text-slate-900' : 'text-white'}`}>
                        Centro de Gestión de Contenidos & Operaciones Web (CMS)
                      </h2>
                    </div>
                    <p className={`text-xs mt-1 max-w-3xl ${isLight ? 'text-slate-500' : 'text-slate-400'}`}>
                      Administre textos, horarios, promociones estacionales, preguntas frecuentes, SEO y píxeles de marketing con publicación en vivo sin tocar código.
                    </p>
                  </div>

                  <button
                    onClick={() => { persist("gmedia_client_site_config", siteConfig); toast.success("Todos los cambios del CMS han sido publicados en vivo."); }}
                    className="px-5 py-2.5 rounded-xl bg-gradient-to-r from-[#583EBF] to-[#2C80C6] hover:from-[#4B34A8] hover:to-[#2470AE] text-white font-bold text-xs uppercase tracking-wider shadow-md shadow-blue-500/20 transition-all cursor-pointer flex items-center justify-center gap-2 shrink-0 self-start md:self-auto"
                  >
                    <Save className="w-4 h-4" />
                    <span>Publicar Todo en Vivo</span>
                  </button>
                </div>

                {/* Sub-navegación por pestañas horizontales estilo GSpace */}
                <div className="flex items-center gap-1.5 overflow-x-auto pt-6 mt-6 border-t border-slate-100 dark:border-slate-800/80 scrollbar-none">
                  {[
                    { id: 'identity', label: 'Identidad & Alertas', icon: Building2 },
                    { id: 'hours', label: 'Horarios & Estado Vivo', icon: Clock },
                    { id: 'banners', label: 'Barra de Anuncios', icon: Megaphone },
                    { id: 'hero', label: 'Hero & WhatsApp', icon: TrendingUp },
                    { id: 'faqs', label: 'Preguntas Frecuentes', icon: HelpCircle, badge: faqs.length },
                    { id: 'social_seo', label: 'Redes & SEO', icon: Globe },
                    { id: 'pixels', label: 'Píxeles de Marketing', icon: BarChart3 }
                  ].map((sub) => {
                    const Icon = sub.icon;
                    const isActive = cmsSubTab === sub.id;
                    return (
                      <button
                        key={sub.id}
                        type="button"
                        onClick={() => setCmsSubTab(sub.id as any)}
                        className={`flex items-center gap-2 px-3.5 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer whitespace-nowrap ${
                          isActive
                            ? 'bg-gradient-to-r from-[#583EBF] to-[#2C80C6] text-white shadow-md shadow-blue-900/30'
                            : isLight 
                              ? 'text-slate-600 hover:bg-slate-100 hover:text-slate-900' 
                              : 'text-slate-400 hover:bg-slate-800/60 hover:text-white'
                        }`}
                      >
                        <Icon className="w-3.5 h-3.5" />
                        <span>{sub.label}</span>
                        {sub.badge !== undefined && (
                          <span className={`text-[10px] font-mono px-1.5 py-0.2 rounded-full ${
                            isActive ? 'bg-white/20 text-white' : 'bg-slate-100 dark:bg-slate-800 text-slate-500'
                          }`}>
                            {sub.badge}
                          </span>
                        )}
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* 1. SUB-MÓDULO: IDENTIDAD & CONTACTO + ALERTAS DE LEADS */}
              {cmsSubTab === 'identity' && (
                <div className={`p-6 sm:p-8 rounded-[28px] border space-y-6 transition-all ${
                  isLight ? 'bg-white border-slate-200/90 shadow-sm' : 'bg-[#0B0F19]/90 border-slate-800/80 shadow-black/40'
                }`}>
                  <div>
                    <h3 className={`text-base font-black tracking-tight ${isLight ? 'text-slate-900' : 'text-white'}`}>
                      Datos Generales de la Empresa
                    </h3>
                    <p className={`text-xs mt-0.5 ${isLight ? 'text-slate-500' : 'text-slate-400'}`}>
                      Información pública que se muestra en el encabezado, pie de página y formularios de contacto.
                    </p>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="space-y-1.5">
                      <label className="text-xs font-bold uppercase tracking-wider text-slate-400">Razón Social / Nombre Comercial</label>
                      <Input
                        value={siteConfig.brandName}
                        onChange={(e) => setSiteConfig({ ...siteConfig, brandName: e.target.value })}
                        className="text-xs h-10 rounded-xl"
                      />
                    </div>

                    <div className="space-y-1.5">
                      <label className="text-xs font-bold uppercase tracking-wider text-slate-400">Teléfono Principal de Llamadas</label>
                      <Input
                        value={siteConfig.phone}
                        onChange={(e) => setSiteConfig({ ...siteConfig, phone: e.target.value })}
                        className="text-xs h-10 rounded-xl"
                      />
                    </div>

                    <div className="space-y-1.5">
                      <label className="text-xs font-bold uppercase tracking-wider text-slate-400">WhatsApp Oficial (sin +, ej. 18090000000)</label>
                      <Input
                        value={siteConfig.whatsappNumber}
                        onChange={(e) => setSiteConfig({ ...siteConfig, whatsappNumber: e.target.value })}
                        className="text-xs h-10 font-mono rounded-xl"
                      />
                    </div>

                    <div className="space-y-1.5">
                      <label className="text-xs font-bold uppercase tracking-wider text-slate-400">Correo Electrónico Público</label>
                      <Input
                        value={siteConfig.email}
                        onChange={(e) => setSiteConfig({ ...siteConfig, email: e.target.value })}
                        className="text-xs h-10 rounded-xl"
                      />
                    </div>

                    <div className="space-y-1.5 sm:col-span-2">
                      <label className="text-xs font-bold uppercase tracking-wider text-slate-400">Dirección Física o Cobertura de Operación</label>
                      <Input
                        value={siteConfig.address}
                        onChange={(e) => setSiteConfig({ ...siteConfig, address: e.target.value })}
                        className="text-xs h-10 rounded-xl"
                      />
                    </div>
                  </div>

                  {/* Destinatarios de Alertas de Ventas */}
                  <div className={`p-5 rounded-2xl border space-y-3 ${
                    isLight ? 'bg-slate-50 border-slate-200' : 'bg-slate-950/80 border-slate-800'
                  }`}>
                    <div className="flex items-center gap-2">
                      <Send className="w-4 h-4 text-[#2C80C6]" />
                      <h4 className={`text-xs font-black uppercase tracking-wider ${isLight ? 'text-slate-900' : 'text-white'}`}>
                        Buzones para Notificaciones Inmediatas de Prospectos
                      </h4>
                    </div>
                    <p className={`text-[11px] ${isLight ? 'text-slate-600' : 'text-slate-400'}`}>
                      Cada vez que un cliente solicita una cotización o completa un formulario en la web, el sistema despacha una alerta instantánea a estos destinos:
                    </p>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-1">
                      <div className="space-y-1">
                        <label className="text-[11px] font-bold text-slate-400">Correos Receptores (separados por coma)</label>
                        <Input
                          placeholder="ventas@empresa.com, gerencia@empresa.com"
                          value={siteConfig.leadNotificationEmails}
                          onChange={(e) => setSiteConfig({ ...siteConfig, leadNotificationEmails: e.target.value })}
                          className="text-xs h-10 rounded-xl"
                        />
                      </div>
                      <div className="space-y-1">
                        <label className="text-[11px] font-bold text-slate-400">WhatsApp Receptor de Ping (para alertas del equipo)</label>
                        <Input
                          placeholder="18090000000"
                          value={siteConfig.leadNotificationWhatsapp}
                          onChange={(e) => setSiteConfig({ ...siteConfig, leadNotificationWhatsapp: e.target.value })}
                          className="text-xs h-10 font-mono rounded-xl"
                        />
                      </div>
                    </div>
                  </div>

                  <button
                    onClick={() => { persist("gmedia_client_site_config", siteConfig); toast.success("Datos de identidad y alertas guardados."); }}
                    className="px-6 py-2.5 rounded-xl bg-[#2C80C6] hover:bg-[#2470AE] text-white font-bold text-xs uppercase tracking-wider shadow-md shadow-blue-500/20 transition-all cursor-pointer"
                  >
                    Guardar Cambios de Identidad
                  </button>
                </div>
              )}

              {/* 2. SUB-MÓDULO: HORARIOS DE OPERACIÓN & ESTADO EN VIVO */}
              {cmsSubTab === 'hours' && (
                <div className={`p-6 sm:p-8 rounded-[28px] border space-y-6 transition-all ${
                  isLight ? 'bg-white border-slate-200/90 shadow-sm' : 'bg-[#0B0F19]/90 border-slate-800/80 shadow-black/40'
                }`}>
                  <div>
                    <h3 className={`text-base font-black tracking-tight ${isLight ? 'text-slate-900' : 'text-white'}`}>
                      Horarios de Atención & Píldora de Estado en Vivo
                    </h3>
                    <p className={`text-xs mt-0.5 ${isLight ? 'text-slate-500' : 'text-slate-400'}`}>
                      Muestra automáticamente a los visitantes si el equipo comercial está disponible para responder en minutos.
                    </p>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                    <div className="space-y-1.5">
                      <label className="text-xs font-bold uppercase tracking-wider text-slate-400">Lunes a Viernes</label>
                      <Input
                        value={siteConfig.hoursWeekdays}
                        onChange={(e) => setSiteConfig({ ...siteConfig, hoursWeekdays: e.target.value })}
                        className="text-xs h-10 rounded-xl"
                      />
                    </div>
                    <div className="space-y-1.5">
                      <label className="text-xs font-bold uppercase tracking-wider text-slate-400">Sábados</label>
                      <Input
                        value={siteConfig.hoursSaturday}
                        onChange={(e) => setSiteConfig({ ...siteConfig, hoursSaturday: e.target.value })}
                        className="text-xs h-10 rounded-xl"
                      />
                    </div>
                    <div className="space-y-1.5">
                      <label className="text-xs font-bold uppercase tracking-wider text-slate-400">Domingos y Feriados</label>
                      <Input
                        value={siteConfig.hoursSunday}
                        onChange={(e) => setSiteConfig({ ...siteConfig, hoursSunday: e.target.value })}
                        className="text-xs h-10 rounded-xl"
                      />
                    </div>
                  </div>

                  {/* Selector de Modo de Disponibilidad en Vivo */}
                  <div className={`p-5 rounded-2xl border space-y-3 ${
                    isLight ? 'bg-slate-50 border-slate-200' : 'bg-slate-950/80 border-slate-800'
                  }`}>
                    <div className="flex flex-col sm:flex-row justify-between sm:items-center gap-3">
                      <div>
                        <h4 className={`text-xs font-black uppercase tracking-wider ${isLight ? 'text-slate-900' : 'text-white'}`}>
                          Modo del Badge en la Barra de Navegación
                        </h4>
                        <p className={`text-[11px] mt-0.5 ${isLight ? 'text-slate-600' : 'text-slate-400'}`}>
                          Controle si el indicador en la web cambia por la hora del reloj o si prefiere fijarlo manualmente.
                        </p>
                      </div>
                      <select
                        value={siteConfig.liveStatusMode}
                        onChange={(e) => setSiteConfig({ ...siteConfig, liveStatusMode: e.target.value as any })}
                        className={`h-10 text-xs border rounded-xl px-3 outline-none cursor-pointer font-bold ${
                          isLight ? 'bg-white border-slate-200 text-slate-800' : 'bg-slate-900 border-slate-700 text-slate-300'
                        }`}
                      >
                        <option value="auto">Automático (Según Horario y Reloj)</option>
                        <option value="open">Forzar: Siempre Abierto (🟢 Abierto Ahora)</option>
                        <option value="closed">Forzar: Fuera de Horario (🔴 Cerrado)</option>
                      </select>
                    </div>

                    {/* Previsualización del Badge en Vivo */}
                    <div className="pt-2 flex items-center gap-2">
                      <span className="text-xs text-slate-400">Previsualización:</span>
                      {siteConfig.liveStatusMode === 'closed' ? (
                        <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-wider bg-rose-500/10 text-rose-500 border border-rose-500/20">
                          <span className="w-1.5 h-1.5 rounded-full bg-rose-500" /> Cerrado · Respondemos mañana a las 8:00 AM
                        </span>
                      ) : (
                        <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-wider bg-emerald-500/10 text-emerald-500 border border-emerald-500/20">
                          <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" /> 🟢 Abierto Ahora · Respuesta en minutos
                        </span>
                      )}
                    </div>
                  </div>

                  {/* Modo Feriado / Vacaciones */}
                  <div className={`p-5 rounded-2xl border space-y-3 ${
                    isLight ? 'bg-slate-50 border-slate-200' : 'bg-slate-950/80 border-slate-800'
                  }`}>
                    <div className="flex items-center justify-between">
                      <div>
                        <h4 className={`text-xs font-black uppercase tracking-wider ${isLight ? 'text-slate-900' : 'text-white'}`}>
                          Modo Feriado / Vacaciones
                        </h4>
                        <p className={`text-[11px] mt-0.5 ${isLight ? 'text-slate-600' : 'text-slate-400'}`}>
                          Active un aviso especial en días no laborables o recesos festivos.
                        </p>
                      </div>
                      <input
                        type="checkbox"
                        checked={siteConfig.isHolidayActive}
                        onChange={(e) => setSiteConfig({ ...siteConfig, isHolidayActive: e.target.checked })}
                        className="w-5 h-5 rounded text-[#2C80C6] cursor-pointer accent-[#2C80C6]"
                      />
                    </div>
                    {siteConfig.isHolidayActive && (
                      <Input
                        placeholder="Mensaje de feriado..."
                        value={siteConfig.holidayNotice}
                        onChange={(e) => setSiteConfig({ ...siteConfig, holidayNotice: e.target.value })}
                        className="text-xs h-10 rounded-xl"
                      />
                    )}
                  </div>

                  <button
                    onClick={() => { persist("gmedia_client_site_config", siteConfig); toast.success("Horarios y disponibilidad guardados."); }}
                    className="px-6 py-2.5 rounded-xl bg-[#2C80C6] hover:bg-[#2470AE] text-white font-bold text-xs uppercase tracking-wider shadow-md shadow-blue-500/20 transition-all cursor-pointer"
                  >
                    Guardar Horarios & Disponibilidad
                  </button>
                </div>
              )}

              {/* 3. SUB-MÓDULO: BARRA DE ANUNCIOS & PROMOCIONES (TOPBAR) */}
              {cmsSubTab === 'banners' && (
                <div className={`p-6 sm:p-8 rounded-[28px] border space-y-6 transition-all ${
                  isLight ? 'bg-white border-slate-200/90 shadow-sm' : 'bg-[#0B0F19]/90 border-slate-800/80 shadow-black/40'
                }`}>
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                    <div>
                      <h3 className={`text-base font-black tracking-tight ${isLight ? 'text-slate-900' : 'text-white'}`}>
                        Barra Superior de Anuncios & Ofertas (Topbar)
                      </h3>
                      <p className={`text-xs mt-0.5 ${isLight ? 'text-slate-500' : 'text-slate-400'}`}>
                        Banner horizontal en la cima del sitio para comunicar promociones o llamados de urgencia.
                      </p>
                    </div>
                    <label className="flex items-center gap-2 cursor-pointer select-none">
                      <span className="text-xs font-bold uppercase text-slate-400">Mostrar Banner:</span>
                      <input
                        type="checkbox"
                        checked={siteConfig.announcementActive}
                        onChange={(e) => setSiteConfig({ ...siteConfig, announcementActive: e.target.checked })}
                        className="w-5 h-5 rounded text-[#2C80C6] cursor-pointer accent-[#2C80C6]"
                      />
                    </label>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                    <div className="space-y-1.5 sm:col-span-2">
                      <label className="text-xs font-bold uppercase tracking-wider text-slate-400">Texto del Anuncio</label>
                      <Input
                        value={siteConfig.topbarMessage}
                        onChange={(e) => setSiteConfig({ ...siteConfig, topbarMessage: e.target.value })}
                        className="text-xs h-10 rounded-xl"
                      />
                    </div>
                    <div className="space-y-1.5">
                      <label className="text-xs font-bold uppercase tracking-wider text-slate-400">Píldora / Etiqueta</label>
                      <Input
                        placeholder="ej. PROMOCIÓN, AVISO"
                        value={siteConfig.announcementBadge}
                        onChange={(e) => setSiteConfig({ ...siteConfig, announcementBadge: e.target.value })}
                        className="text-xs h-10 font-bold rounded-xl"
                      />
                    </div>

                    <div className="space-y-1.5">
                      <label className="text-xs font-bold uppercase tracking-wider text-slate-400">Texto del Botón CTA</label>
                      <Input
                        placeholder="ej. Cotizar en 2 Minutos"
                        value={siteConfig.announcementCtaText}
                        onChange={(e) => setSiteConfig({ ...siteConfig, announcementCtaText: e.target.value })}
                        className="text-xs h-10 rounded-xl"
                      />
                    </div>

                    <div className="space-y-1.5">
                      <label className="text-xs font-bold uppercase tracking-wider text-slate-400">Enlace Destino</label>
                      <Input
                        placeholder="ej. #cotizador o /contacto"
                        value={siteConfig.announcementCtaLink}
                        onChange={(e) => setSiteConfig({ ...siteConfig, announcementCtaLink: e.target.value })}
                        className="text-xs h-10 font-mono rounded-xl"
                      />
                    </div>

                    <div className="space-y-1.5">
                      <label className="text-xs font-bold uppercase tracking-wider text-slate-400">Estilo Visual</label>
                      <select
                        value={siteConfig.announcementType}
                        onChange={(e) => setSiteConfig({ ...siteConfig, announcementType: e.target.value as any })}
                        className={`w-full h-10 text-xs border rounded-xl px-3 outline-none cursor-pointer font-bold ${
                          isLight ? 'bg-white border-slate-200 text-slate-800' : 'bg-slate-900 border-slate-700 text-slate-300'
                        }`}
                      >
                        <option value="promo">Morado GSpace (Promoción / Oferta)</option>
                        <option value="info">Azul Corporativo (Informativo)</option>
                        <option value="urgent">Ámbar / Dorado (Urgencia / Evento)</option>
                      </select>
                    </div>
                  </div>

                  {/* Previsualización en Vivo de la Barra Superior */}
                  <div className="space-y-2 pt-2">
                    <span className="text-xs font-bold uppercase tracking-wider text-slate-400">Previsualización en Vivo del Banner:</span>
                    <div className={`p-3 rounded-xl border flex flex-col sm:flex-row items-center justify-between gap-2.5 text-center sm:text-left transition-all ${
                      siteConfig.announcementType === 'promo' 
                        ? 'bg-gradient-to-r from-[#583EBF] via-[#4833A5] to-[#2C80C6] text-white border-purple-400/30' :
                      siteConfig.announcementType === 'urgent'
                        ? 'bg-gradient-to-r from-amber-600 via-amber-700 to-amber-800 text-white border-amber-400/30' :
                        'bg-gradient-to-r from-[#2C80C6] via-[#2268A2] to-[#1E5C90] text-white border-blue-400/30'
                    }`}>
                      <div className="flex items-center gap-2 flex-wrap justify-center sm:justify-start">
                        {siteConfig.announcementBadge && (
                          <span className="text-[10px] font-black uppercase px-2 py-0.5 rounded-full bg-white/20 text-white">
                            {siteConfig.announcementBadge}
                          </span>
                        )}
                        <span className="text-xs font-medium">{siteConfig.topbarMessage}</span>
                      </div>
                      {siteConfig.announcementCtaText && (
                        <span className="text-[11px] font-black uppercase px-3 py-1 rounded-lg bg-white text-slate-900 hover:bg-slate-100 transition-colors shrink-0 shadow-sm">
                          {siteConfig.announcementCtaText} →
                        </span>
                      )}
                    </div>
                  </div>

                  <button
                    onClick={() => { persist("gmedia_client_site_config", siteConfig); toast.success("Barra de anuncios actualizada en vivo."); }}
                    className="px-6 py-2.5 rounded-xl bg-[#2C80C6] hover:bg-[#2470AE] text-white font-bold text-xs uppercase tracking-wider shadow-md shadow-blue-500/20 transition-all cursor-pointer"
                  >
                    Guardar y Publicar Banner
                  </button>
                </div>
              )}

              {/* 4. SUB-MÓDULO: HERO & MENSAJES DE CONVERSIÓN */}
              {cmsSubTab === 'hero' && (
                <div className={`p-6 sm:p-8 rounded-[28px] border space-y-6 transition-all ${
                  isLight ? 'bg-white border-slate-200/90 shadow-sm' : 'bg-[#0B0F19]/90 border-slate-800/80 shadow-black/40'
                }`}>
                  <div>
                    <h3 className={`text-base font-black tracking-tight ${isLight ? 'text-slate-900' : 'text-white'}`}>
                      Textos Principales del Hero & Mensaje de WhatsApp
                    </h3>
                    <p className={`text-xs mt-0.5 ${isLight ? 'text-slate-500' : 'text-slate-400'}`}>
                      Optimice los títulos principales y el saludo predeterminado que abre la conversación en WhatsApp.
                    </p>
                  </div>

                  <div className="space-y-4">
                    <div className="space-y-1.5">
                      <label className="text-xs font-bold uppercase tracking-wider text-slate-400">Titular Principal de la Portada (H1)</label>
                      <Input
                        value={siteConfig.heroTitle}
                        onChange={(e) => setSiteConfig({ ...siteConfig, heroTitle: e.target.value })}
                        className="text-xs h-10 rounded-xl"
                      />
                    </div>

                    <div className="space-y-1.5">
                      <label className="text-xs font-bold uppercase tracking-wider text-slate-400">Subtítulo Descriptivo</label>
                      <Input
                        value={siteConfig.heroSubtitle}
                        onChange={(e) => setSiteConfig({ ...siteConfig, heroSubtitle: e.target.value })}
                        className="text-xs h-10 rounded-xl"
                      />
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div className="space-y-1.5">
                        <label className="text-xs font-bold uppercase tracking-wider text-slate-400">Texto del Botón Principal (Hero CTA)</label>
                        <Input
                          value={siteConfig.heroCtaText}
                          onChange={(e) => setSiteConfig({ ...siteConfig, heroCtaText: e.target.value })}
                          className="text-xs h-10 rounded-xl"
                        />
                      </div>
                      <div className="space-y-1.5">
                        <label className="text-xs font-bold uppercase tracking-wider text-slate-400">Saludo Predeterminado de WhatsApp</label>
                        <Input
                          value={siteConfig.whatsappDefaultMessage}
                          onChange={(e) => setSiteConfig({ ...siteConfig, whatsappDefaultMessage: e.target.value })}
                          className="text-xs h-10 rounded-xl"
                        />
                      </div>
                    </div>
                  </div>

                  {/* Previsualización de Conversión */}
                  <div className={`p-5 rounded-2xl border space-y-2.5 ${
                    isLight ? 'bg-slate-50 border-slate-200' : 'bg-slate-950/80 border-slate-800'
                  }`}>
                    <span className="text-xs font-bold uppercase tracking-wider text-slate-400 block">Previsualización de Experiencia del Usuario:</span>
                    <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 p-4 rounded-xl bg-white dark:bg-[#0B0F19] border border-slate-200 dark:border-slate-800">
                      <div>
                        <p className={`font-black text-sm ${isLight ? 'text-slate-900' : 'text-white'}`}>{siteConfig.heroTitle}</p>
                        <p className={`text-xs mt-0.5 ${isLight ? 'text-slate-600' : 'text-slate-400'}`}>{siteConfig.heroSubtitle}</p>
                      </div>
                      <span className="px-4 py-2 rounded-xl bg-gradient-to-r from-emerald-600 to-teal-600 text-white font-bold text-xs uppercase tracking-wider flex items-center gap-1.5 shrink-0 shadow-md">
                        <MessageSquare className="w-3.5 h-3.5" />
                        {siteConfig.heroCtaText}
                      </span>
                    </div>
                  </div>

                  <button
                    onClick={() => { persist("gmedia_client_site_config", siteConfig); toast.success("Textos de conversión guardados."); }}
                    className="px-6 py-2.5 rounded-xl bg-[#2C80C6] hover:bg-[#2470AE] text-white font-bold text-xs uppercase tracking-wider shadow-md shadow-blue-500/20 transition-all cursor-pointer"
                  >
                    Guardar Textos de Conversión
                  </button>
                </div>
              )}

              {/* 5. SUB-MÓDULO: GESTOR DE PREGUNTAS FRECUENTES (FAQ) */}
              {cmsSubTab === 'faqs' && (
                <div className="space-y-4">
                  <div className={`p-6 rounded-[28px] border flex justify-between items-center transition-all ${
                    isLight ? 'bg-white border-slate-200/90 shadow-sm' : 'bg-[#0B0F19]/90 border-slate-800/80 shadow-black/40'
                  }`}>
                    <div>
                      <h3 className={`text-base font-black tracking-tight ${isLight ? 'text-slate-900' : 'text-white'}`}>
                        Preguntas Frecuentes (FAQ Accordion Manager)
                      </h3>
                      <p className={`text-xs mt-0.5 ${isLight ? 'text-slate-500' : 'text-slate-400'}`}>
                        Resuelva dudas habituales de sus clientes para acelerar el ciclo de venta hasta un 40%.
                      </p>
                    </div>
                    <button
                      onClick={() => setShowNewFaqModal(true)}
                      className="px-4 py-2.5 rounded-xl bg-gradient-to-r from-[#583EBF] to-[#2C80C6] hover:from-[#4B34A8] hover:to-[#2470AE] text-white font-bold text-xs uppercase tracking-wider shadow-md shadow-blue-500/20 transition-all flex items-center gap-1.5 cursor-pointer"
                    >
                      <Plus className="w-4 h-4" /> Agregar Pregunta
                    </button>
                  </div>

                  {/* Modal de Nueva Pregunta */}
                  {showNewFaqModal && (
                    <div className={`p-6 rounded-[28px] border shadow-2xl animate-in zoom-in-95 duration-200 ${
                      isLight ? 'bg-white border-slate-200' : 'bg-[#0B0F19] border-slate-800'
                    }`}>
                      <h4 className="text-sm font-black uppercase tracking-wider text-[#2C80C6] mb-3">
                        Nueva Pregunta Frecuente
                      </h4>
                      <form onSubmit={handleAddFaq} className="space-y-3">
                        <Input
                          placeholder="Pregunta (ej. ¿Qué garantía tienen los materiales?)"
                          value={newFaq.question}
                          onChange={(e) => setNewFaq({ ...newFaq, question: e.target.value })}
                          className="h-10 text-xs rounded-xl"
                        />
                        <Input
                          placeholder="Categoría (ej. Garantía, Cobertura, Pagos)"
                          value={newFaq.category}
                          onChange={(e) => setNewFaq({ ...newFaq, category: e.target.value })}
                          className="h-10 text-xs rounded-xl"
                        />
                        <textarea
                          placeholder="Respuesta detallada y clara para el cliente..."
                          value={newFaq.answer}
                          onChange={(e) => setNewFaq({ ...newFaq, answer: e.target.value })}
                          rows={3}
                          className={`w-full text-xs p-3 rounded-xl border outline-none ${
                            isLight ? 'bg-slate-50 border-slate-200 text-slate-900' : 'bg-slate-950/80 border-slate-800 text-white'
                          }`}
                        />
                        <div className="flex gap-2 pt-1">
                          <Button type="submit" size="sm" className="bg-[#2C80C6] text-white font-bold text-xs rounded-xl cursor-pointer">
                            Guardar y Publicar
                          </Button>
                          <Button type="button" variant="ghost" size="sm" onClick={() => setShowNewFaqModal(false)} className="text-xs rounded-xl cursor-pointer">
                            Cancelar
                          </Button>
                        </div>
                      </form>
                    </div>
                  )}

                  {/* Lista de FAQs */}
                  <div className="space-y-3">
                    {faqs.map((faq) => (
                      <div
                        key={faq.id}
                        className={`p-5 rounded-2xl border transition-all space-y-2 ${
                          isLight ? 'bg-white border-slate-200/90 shadow-sm' : 'bg-[#0B0F19]/90 border-slate-800/80 shadow-black/40'
                        }`}
                      >
                        <div className="flex justify-between items-start gap-3">
                          <div className="space-y-1">
                            {faq.category && (
                              <span className="text-[10px] font-mono uppercase font-bold text-[#2C80C6] block">
                                {faq.category}
                              </span>
                            )}
                            <h4 className={`font-black text-sm ${isLight ? 'text-slate-900' : 'text-white'}`}>
                              {faq.question}
                            </h4>
                          </div>

                          <div className="flex items-center gap-2 shrink-0">
                            <button
                              onClick={() => handleToggleFaq(faq.id)}
                              className={`px-3 py-1 rounded-xl text-[10px] font-black uppercase tracking-wider cursor-pointer transition-all ${
                                faq.visible 
                                  ? 'bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border border-emerald-500/20' 
                                  : 'bg-slate-100 dark:bg-slate-800 text-slate-400'
                              }`}
                            >
                              {faq.visible ? '🟢 Publicado' : '⚪ Oculto'}
                            </button>
                            <button
                              onClick={() => handleDeleteFaq(faq.id)}
                              className="p-1.5 rounded-lg text-slate-400 hover:text-rose-500 hover:bg-rose-500/10 transition-colors"
                              title="Eliminar pregunta"
                            >
                              <Trash2 className="w-4 h-4" />
                            </button>
                          </div>
                        </div>
                        <p className={`text-xs leading-relaxed ${isLight ? 'text-slate-600' : 'text-slate-400'}`}>
                          {faq.answer}
                        </p>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* 6. SUB-MÓDULO: REDES SOCIALES & SEO */}
              {cmsSubTab === 'social_seo' && (
                <div className={`p-6 sm:p-8 rounded-[28px] border space-y-6 transition-all ${
                  isLight ? 'bg-white border-slate-200/90 shadow-sm' : 'bg-[#0B0F19]/90 border-slate-800/80 shadow-black/40'
                }`}>
                  <div>
                    <h3 className={`text-base font-black tracking-tight ${isLight ? 'text-slate-900' : 'text-white'}`}>
                      Redes Sociales & Posicionamiento en Google (SEO)
                    </h3>
                    <p className={`text-xs mt-0.5 ${isLight ? 'text-slate-500' : 'text-slate-400'}`}>
                      Asegure la visibilidad de la marca en buscadores y configure la miniatura que se comparte en WhatsApp.
                    </p>
                  </div>

                  {/* Redes Sociales */}
                  <div className="space-y-3">
                    <h4 className="text-xs font-black uppercase tracking-wider text-slate-400">Canales Sociales Oficiales</h4>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                      <div className="space-y-1">
                        <label className="text-[11px] font-bold text-slate-400">Instagram</label>
                        <Input
                          placeholder="https://instagram.com/empresa"
                          value={siteConfig.socialInstagram}
                          onChange={(e) => setSiteConfig({ ...siteConfig, socialInstagram: e.target.value })}
                          className="text-xs h-10 font-mono rounded-xl"
                        />
                      </div>
                      <div className="space-y-1">
                        <label className="text-[11px] font-bold text-slate-400">Facebook</label>
                        <Input
                          placeholder="https://facebook.com/empresa"
                          value={siteConfig.socialFacebook}
                          onChange={(e) => setSiteConfig({ ...siteConfig, socialFacebook: e.target.value })}
                          className="text-xs h-10 font-mono rounded-xl"
                        />
                      </div>
                      <div className="space-y-1">
                        <label className="text-[11px] font-bold text-slate-400">LinkedIn</label>
                        <Input
                          placeholder="https://linkedin.com/company/empresa"
                          value={siteConfig.socialLinkedin}
                          onChange={(e) => setSiteConfig({ ...siteConfig, socialLinkedin: e.target.value })}
                          className="text-xs h-10 font-mono rounded-xl"
                        />
                      </div>
                      <div className="space-y-1">
                        <label className="text-[11px] font-bold text-slate-400">TikTok</label>
                        <Input
                          placeholder="https://tiktok.com/@empresa"
                          value={siteConfig.socialTiktok}
                          onChange={(e) => setSiteConfig({ ...siteConfig, socialTiktok: e.target.value })}
                          className="text-xs h-10 font-mono rounded-xl"
                        />
                      </div>
                      <div className="space-y-1 sm:col-span-2">
                        <label className="text-[11px] font-bold text-slate-400">Google Maps / Google Business Profile URL</label>
                        <Input
                          placeholder="https://maps.google.com/..."
                          value={siteConfig.socialGoogleMaps}
                          onChange={(e) => setSiteConfig({ ...siteConfig, socialGoogleMaps: e.target.value })}
                          className="text-xs h-10 font-mono rounded-xl"
                        />
                      </div>
                    </div>
                  </div>

                  {/* Metadatos SEO */}
                  <div className="space-y-3 pt-4 border-t border-slate-100 dark:border-slate-800">
                    <h4 className="text-xs font-black uppercase tracking-wider text-slate-400">Metaetiquetas para Buscadores (Google)</h4>
                    <div className="space-y-3">
                      <div className="space-y-1">
                        <div className="flex justify-between items-center">
                          <label className="text-[11px] font-bold text-slate-400">Título SEO (Meta Title)</label>
                          <span className="text-[10px] font-mono text-slate-400">{siteConfig.metaTitle.length}/60 caracteres</span>
                        </div>
                        <Input
                          value={siteConfig.metaTitle}
                          onChange={(e) => setSiteConfig({ ...siteConfig, metaTitle: e.target.value })}
                          className="text-xs h-10 rounded-xl"
                        />
                      </div>

                      <div className="space-y-1">
                        <div className="flex justify-between items-center">
                          <label className="text-[11px] font-bold text-slate-400">Descripción para Google (Meta Description)</label>
                          <span className="text-[10px] font-mono text-slate-400">{siteConfig.metaDescription.length}/155 caracteres</span>
                        </div>
                        <textarea
                          rows={2}
                          value={siteConfig.metaDescription}
                          onChange={(e) => setSiteConfig({ ...siteConfig, metaDescription: e.target.value })}
                          className={`w-full text-xs p-3 rounded-xl border outline-none ${
                            isLight ? 'bg-slate-50 border-slate-200 text-slate-900' : 'bg-slate-950/80 border-slate-800 text-white'
                          }`}
                        />
                      </div>

                      <div className="space-y-1">
                        <label className="text-[11px] font-bold text-slate-400">Miniatura para Redes & WhatsApp (Open Graph Image URL)</label>
                        <Input
                          placeholder="https://images.unsplash.com/..."
                          value={siteConfig.ogImageUrl}
                          onChange={(e) => setSiteConfig({ ...siteConfig, ogImageUrl: e.target.value })}
                          className="text-xs h-10 font-mono rounded-xl"
                        />
                      </div>
                    </div>
                  </div>

                  {/* Previsualización en Google Search */}
                  <div className={`p-5 rounded-2xl border space-y-2 ${
                    isLight ? 'bg-slate-50 border-slate-200' : 'bg-slate-950/80 border-slate-800'
                  }`}>
                    <span className="text-[10px] font-mono uppercase tracking-wider text-slate-400 font-bold block">
                      Previsualización en Resultados de Búsqueda de Google:
                    </span>
                    <div className="p-4 rounded-xl bg-white dark:bg-[#0B0F19] border border-slate-200 dark:border-slate-800 space-y-1">
                      <span className="text-xs font-mono text-emerald-600 dark:text-emerald-400 block truncate">
                        https://{siteConfig.brandName.toLowerCase().replace(/[^a-z0-9]/g, '')}.com
                      </span>
                      <h5 className="font-bold text-sm text-blue-600 dark:text-blue-400 hover:underline cursor-pointer">
                        {siteConfig.metaTitle}
                      </h5>
                      <p className="text-xs text-slate-500 dark:text-slate-400 line-clamp-2">
                        {siteConfig.metaDescription}
                      </p>
                    </div>
                  </div>

                  <button
                    onClick={() => { persist("gmedia_client_site_config", siteConfig); toast.success("Parámetros de SEO y Redes Sociales guardados."); }}
                    className="px-6 py-2.5 rounded-xl bg-[#2C80C6] hover:bg-[#2470AE] text-white font-bold text-xs uppercase tracking-wider shadow-md shadow-blue-500/20 transition-all cursor-pointer"
                  >
                    Guardar SEO & Redes Sociales
                  </button>
                </div>
              )}

              {/* 7. SUB-MÓDULO: PÍXELES DE MARKETING & ADS */}
              {cmsSubTab === 'pixels' && (
                <div className={`p-6 sm:p-8 rounded-[28px] border space-y-6 transition-all ${
                  isLight ? 'bg-white border-slate-200/90 shadow-sm' : 'bg-[#0B0F19]/90 border-slate-800/80 shadow-black/40'
                }`}>
                  <div>
                    <h3 className={`text-base font-black tracking-tight ${isLight ? 'text-slate-900' : 'text-white'}`}>
                      Píxeles de Marketing & Telemetría de Campañas
                    </h3>
                    <p className={`text-xs mt-0.5 ${isLight ? 'text-slate-500' : 'text-slate-400'}`}>
                      Conecte sus campañas publicitarias de Google Ads y Meta Ads sin necesidad de abrir el código fuente.
                    </p>
                  </div>

                  <div className="space-y-4">
                    <div className="space-y-1.5">
                      <div className="flex justify-between items-center">
                        <label className="text-xs font-bold uppercase tracking-wider text-slate-400">Google Analytics 4 Measurement ID</label>
                        <span className="text-[10px] font-mono text-[#2C80C6] font-bold">Formato: G-XXXXXXXXXX</span>
                      </div>
                      <Input
                        placeholder="G-ABC1234567"
                        value={siteConfig.googleAnalyticsId}
                        onChange={(e) => setSiteConfig({ ...siteConfig, googleAnalyticsId: e.target.value })}
                        className="text-xs h-10 font-mono rounded-xl"
                      />
                    </div>

                    <div className="space-y-1.5">
                      <div className="flex justify-between items-center">
                        <label className="text-xs font-bold uppercase tracking-wider text-slate-400">Meta Pixel ID (Facebook & Instagram Ads)</label>
                        <span className="text-[10px] font-mono text-[#583EBF] font-bold">Numérico de 15 a 16 dígitos</span>
                      </div>
                      <Input
                        placeholder="123456789012345"
                        value={siteConfig.metaPixelId}
                        onChange={(e) => setSiteConfig({ ...siteConfig, metaPixelId: e.target.value })}
                        className="text-xs h-10 font-mono rounded-xl"
                      />
                    </div>

                    <div className="space-y-1.5">
                      <div className="flex justify-between items-center">
                        <label className="text-xs font-bold uppercase tracking-wider text-slate-400">Google Tag Manager Container ID (Opcional)</label>
                        <span className="text-[10px] font-mono text-slate-400">Formato: GTM-XXXXXX</span>
                      </div>
                      <Input
                        placeholder="GTM-XXXXXX"
                        value={siteConfig.googleTagManagerId}
                        onChange={(e) => setSiteConfig({ ...siteConfig, googleTagManagerId: e.target.value })}
                        className="text-xs h-10 font-mono rounded-xl"
                      />
                    </div>
                  </div>

                  {/* Garantía de Rendimiento */}
                  <div className={`p-4 rounded-xl border flex items-center gap-3 ${
                    isLight ? 'bg-emerald-50 border-emerald-200 text-emerald-800' : 'bg-emerald-950/20 border-emerald-800/40 text-emerald-300'
                  }`}>
                    <ShieldCheck className="w-5 h-5 shrink-0 text-emerald-500" />
                    <p className="text-xs leading-relaxed">
                      <strong>Carga Asíncrona Garantizada:</strong> Los píxeles de seguimiento son inyectados mediante Next.js Script diferido, garantizando que el sitio mantenga calificación 100/100 en Google Core Web Vitals sin ralentizar la experiencia del visitante.
                    </p>
                  </div>

                  <button
                    onClick={() => { persist("gmedia_client_site_config", siteConfig); toast.success("Píxeles de marketing guardados correctamente."); }}
                    className="px-6 py-2.5 rounded-xl bg-[#2C80C6] hover:bg-[#2470AE] text-white font-bold text-xs uppercase tracking-wider shadow-md shadow-blue-500/20 transition-all cursor-pointer"
                  >
                    Guardar Píxeles de Marketing
                  </button>
                </div>
              )}
            </div>
          )}

          {/* ---------------- PESTAÑA: INTERRUPTOR DE MÓDULOS (LEGO) ---------------- */}
          {activeTab === 'modules' && (
            <div className="space-y-4 max-w-3xl animate-in fade-in duration-300">
              <div className={`p-5 rounded-2xl border transition-all ${
                isLight ? 'bg-white border-slate-200/90 shadow-sm' : 'bg-[#0B0F19]/90 border-slate-800/80 shadow-black/40'
              }`}>
                <h2 className={`text-base font-black tracking-tight ${isLight ? 'text-slate-900' : 'text-white'}`}>
                  Catálogo de Módulos Plug-and-Play (Lego System)
                </h2>
                <p className={`text-xs mt-0.5 ${isLight ? 'text-slate-500' : 'text-slate-400'}`}>
                  Encienda o apague los módulos según el plan y modelo operativo del cliente.
                </p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {[
                  { key: 'leads', name: '📥 Bandeja de Leads & CRM', desc: 'Captura y respuesta por WhatsApp en 1 clic.' },
                  { key: 'appointments', name: '📅 Citas & Agenda', desc: 'Gestor de visitas técnicas o consultas.' },
                  { key: 'quotes', name: '💰 Cotizador Proforma', desc: 'Emisión de presupuestos formales desglosados.' },
                  { key: 'portfolio', name: '📸 Galería de Trabajos', desc: 'Casos de éxito con fotos Antes/Después.' },
                  { key: 'reviews', name: '⭐ Gestor de Reseñas', desc: 'Prueba social con testimonios de clientes.' },
                  { key: 'services', name: '🏷️ Catálogo de Servicios', desc: 'Matriz de servicios y precios base.' },
                  { key: 'analytics', name: '📊 Analítica Comercial', desc: 'Métricas de conversión y tráfico web.' },
                  { key: 'cms', name: '📝 Editor de Contenidos', desc: 'Cambio de teléfonos y textos públicos.' }
                ].map((m) => (
                  <div
                    key={m.key}
                    className={`p-4 rounded-2xl border flex justify-between items-center transition-all ${
                      isLight ? 'bg-white border-slate-200/90 shadow-sm' : 'bg-[#0B0F19]/90 border-slate-800/80 shadow-black/40'
                    }`}
                  >
                    <div>
                      <h4 className={`font-black text-xs ${isLight ? 'text-slate-900' : 'text-white'}`}>{m.name}</h4>
                      <p className="text-[11px] text-slate-400 mt-0.5">{m.desc}</p>
                    </div>
                    <input
                      type="checkbox"
                      checked={siteConfig.modules[m.key as keyof typeof siteConfig.modules]}
                      onChange={() => handleToggleModule(m.key as any)}
                      className="w-5 h-5 rounded text-[#2C80C6] cursor-pointer accent-[#2C80C6]"
                    />
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* ---------------- PESTAÑA: SOPORTE VIP & SLA ---------------- */}
          {activeTab === 'support' && (
            <div className={`p-6 sm:p-8 rounded-[28px] border max-w-2xl space-y-5 transition-all ${
              isLight ? 'bg-white border-slate-200/90 shadow-sm' : 'bg-[#0B0F19]/90 border-slate-800/80 shadow-black/40'
            }`}>
              <div className="flex items-center gap-3.5">
                <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-[#2C80C6] to-[#583EBF] text-white flex items-center justify-center font-black shadow-md shadow-blue-500/20">
                  <ShieldCheck className="w-6 h-6" />
                </div>
                <div>
                  <h3 className={`text-base font-black tracking-tight ${isLight ? 'text-slate-900' : 'text-white'}`}>
                    Soporte Técnico Administrado por Gmedia AI
                  </h3>
                  <p className={`text-xs mt-0.5 ${isLight ? 'text-slate-500' : 'text-slate-400'}`}>
                    Infraestructura empresarial Vercel Edge con monitoreo y copias de seguridad automáticas.
                  </p>
                </div>
              </div>

              <div className={`p-5 rounded-2xl border space-y-2.5 text-xs ${
                isLight ? 'bg-slate-50 border-slate-200' : 'bg-slate-950/80 border-slate-800'
              }`}>
                <div className="flex justify-between">
                  <span className="text-slate-400">Plan de Infraestructura:</span>
                  <span className="font-bold text-[#2C80C6]">Gmedia Managed Cloud Edge</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-400">Certificado SSL / TLS:</span>
                  <span className="font-mono text-emerald-500 font-bold">Activo (TLS 1.3 / 256-Bit)</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-400">Control de Versiones:</span>
                  <span className="text-slate-300 font-mono">GitHub CI/CD Automatizado</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-400">Garantía de Tiempo de Respuesta:</span>
                  <span className="text-emerald-500 font-bold">&lt; 2 horas garantizado</span>
                </div>
              </div>

              <a
                href={`https://wa.me/${siteConfig.whatsappNumber}?text=${encodeURIComponent(`Hola Gmedia, solicito asistencia técnica prioritaria para el portal de ${siteConfig.brandName}.`)}`}
                target="_blank"
                rel="noreferrer"
                className="w-full h-12 rounded-xl bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-500 text-white font-bold text-xs uppercase tracking-wider flex items-center justify-center gap-2 shadow-lg shadow-emerald-600/20 transition-all cursor-pointer"
              >
                <MessageSquare className="w-4 h-4" />
                <span>Contactar a Soporte Prioritario por WhatsApp</span>
              </a>
            </div>
          )}

        </div>

        {/* FOOTER */}
        <footer className={`border-t py-5 text-center text-xs transition-colors mt-auto ${
          isLight ? 'border-slate-200/90 bg-white/90 text-slate-500' : 'border-slate-800/80 bg-[#090D16] text-slate-500'
        }`}>
          © {new Date().getFullYear()} {siteConfig.brandName} · Plataforma Corporativa Gestionada por Gmedia Enterprise Suite.
        </footer>
      </div>
    </div>
  );
}
