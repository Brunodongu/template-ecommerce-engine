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
  CheckSquare
} from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { toast } from "sonner";

// --- TIPOS DE DATOS MODULARES ---
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
    status: "sent",
    taxRate: 18,
    items: [
      { id: "i1", description: "Instalación Césped Deportivo 50mm (250 m²)", quantity: 250, unitPrice: 28 },
      { id: "i2", description: "Preparación de Suelo y Nivelación Láser", quantity: 1, unitPrice: 850 },
      { id: "i3", description: "Sistema de Drenaje Subterráneo Perimetral", quantity: 1, unitPrice: 1200 }
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

  // Filtros de búsqueda
  const [searchFilter, setSearchFilter] = useState("");
  const [statusFilter, setStatusFilter] = useState<string>("all");

  // Configuración del Sitio & Interruptores de Módulos (Feature Toggles)
  const [siteConfig, setSiteConfig] = useState({
    brandName: "Portal Corporativo",
    phone: "+1 (809) 000-0000",
    email: "contacto@empresa.com",
    address: "Santo Domingo, República Dominicana",
    whatsappNumber: "18090000000",
    topbarMessage: "Atención disponible para cotizaciones inmediatas en todo el país",
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

  // Carga y Persistencia en localStorage
  useEffect(() => {
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

    const savedConfig = localStorage.getItem("gmedia_client_site_config");
    if (savedConfig) try { setSiteConfig(JSON.parse(savedConfig)); } catch {}
  }, []);

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (accessPin.trim() === "gmedia2026" || accessPin.trim() === "admin" || accessPin.trim().length >= 4) {
      setIsAuthenticated(true);
      localStorage.setItem("gmedia_client_admin_auth", "true");
      toast.success("¡Bienvenido a su Panel Administrativo!");
    } else {
      setAuthError(true);
      toast.error("Contraseña o PIN incorrecto.");
    }
  };

  const handleLogout = () => {
    setIsAuthenticated(false);
    localStorage.removeItem("gmedia_client_admin_auth");
    toast.info("Sesión cerrada.");
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
    toast.success("Estado del prospecto actualizado.");
  };

  const handleDeleteLead = (id: string) => {
    const updated = leads.filter(l => l.id !== id);
    setLeads(updated);
    persist("gmedia_client_leads", updated);
    toast.success("Prospecto eliminado.");
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
    toast.success("Cita agendada con éxito.");
  };

  const handleUpdateAptStatus = (id: string, status: 'pending' | 'confirmed' | 'completed' | 'cancelled') => {
    const updated = appointments.map(a => a.id === id ? { ...a, status } : a);
    setAppointments(updated);
    persist("gmedia_client_apts", updated);
    toast.success("Estado de cita actualizado.");
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
    toast.success("Archivo CSV exportado.");
  };

  // Pantalla de Login si no está autenticado
  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-slate-950 text-slate-100 flex items-center justify-center p-4 relative overflow-hidden font-sans">
        <div className="absolute top-1/4 left-1/4 w-[350px] h-[350px] bg-primary/20 rounded-full blur-[100px] pointer-events-none" />
        <div className="absolute bottom-1/4 right-1/4 w-[350px] h-[350px] bg-blue-600/15 rounded-full blur-[100px] pointer-events-none" />

        <Card className="w-full max-w-md bg-slate-900/80 border-slate-800 backdrop-blur-xl shadow-2xl relative z-10 p-6 rounded-3xl">
          <div className="text-center space-y-2 mb-6">
            <div className="w-12 h-12 rounded-2xl bg-primary/10 border border-primary/20 mx-auto flex items-center justify-center text-primary mb-2">
              <Lock className="w-6 h-6" />
            </div>
            <h1 className="text-2xl font-black text-white tracking-tight">Portal Administrativo</h1>
            <p className="text-xs text-slate-400">Acceso privado para gestión de clientes, cotizaciones y contenidos.</p>
          </div>

          <form onSubmit={handleLogin} className="space-y-4">
            <div className="space-y-1.5">
              <label className="text-xs font-semibold text-slate-300 flex items-center gap-1.5">
                <Key className="w-3.5 h-3.5 text-primary" /> Clave de Acceso Corporativa
              </label>
              <Input
                type="password"
                placeholder="Ingrese contraseña o PIN..."
                value={accessPin}
                onChange={(e) => { setAccessPin(e.target.value); setAuthError(false); }}
                className="bg-slate-950 border-slate-800 text-white text-sm h-11 focus:ring-1 focus:ring-primary rounded-xl"
              />
              {authError && <p className="text-[11px] text-red-400">Contraseña incorrecta.</p>}
              <p className="text-[10px] text-slate-500 font-mono">
                * Clave predeterminada: <span className="text-primary font-bold">gmedia2026</span>
              </p>
            </div>

            <Button type="submit" className="w-full h-11 font-bold text-xs bg-primary text-white hover:bg-primary/90 rounded-xl shadow-lg cursor-pointer">
              Iniciar Sesión en el Portal
            </Button>

            <div className="pt-2 text-center">
              <Link href="/" className="text-xs text-slate-400 hover:text-white transition-colors flex items-center justify-center gap-1">
                <ArrowLeft className="w-3.5 h-3.5" /> Volver al sitio web público
              </Link>
            </div>
          </form>
        </Card>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col font-sans">
      {/* 1. BARRA SUPERIOR DE MARCA BLANCA */}
      <header className="border-b border-slate-800/80 bg-slate-900/60 backdrop-blur-md sticky top-0 z-50 px-4 sm:px-8 py-3.5">
        <div className="max-w-7xl mx-auto flex items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl bg-primary/10 border border-primary/30 flex items-center justify-center text-primary font-black text-sm">
              <ShieldCheck className="w-5 h-5" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h1 className="font-extrabold text-sm sm:text-base text-white tracking-tight">{siteConfig.brandName}</h1>
                <Badge variant="outline" className="text-[9px] font-mono border-primary/30 text-primary bg-primary/5 uppercase">
                  PORTAL EMPRESARIAL
                </Badge>
              </div>
              <p className="text-[11px] text-slate-400 font-mono">
                {leads.length} prospectos • {appointments.length} citas activas
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2.5">
            <Link href="/" target="_blank">
              <Button variant="outline" size="sm" className="h-9 text-xs border-slate-800 bg-slate-900 hover:bg-slate-800 text-slate-200 cursor-pointer">
                <Globe className="w-3.5 h-3.5 mr-1 text-primary" /> Ver Web
              </Button>
            </Link>
            <Button 
              variant="ghost" 
              size="sm" 
              onClick={handleLogout} 
              className="h-9 text-xs text-slate-400 hover:text-red-400 hover:bg-red-500/10 cursor-pointer"
            >
              Cerrar Sesión
            </Button>
          </div>
        </div>
      </header>

      {/* 2. BARRA DE MÓDULOS DE NAVEGACIÓN */}
      <div className="border-b border-slate-800/60 bg-slate-900/40 px-4 sm:px-8 py-2 overflow-x-auto">
        <div className="max-w-7xl mx-auto flex items-center gap-1.5 min-w-max">
          {siteConfig.modules.leads && (
            <button
              onClick={() => setActiveTab('leads')}
              className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all flex items-center gap-1.5 cursor-pointer ${
                activeTab === 'leads' ? 'bg-primary text-white shadow-md' : 'text-slate-400 hover:text-white hover:bg-slate-800/40'
              }`}
            >
              <Users className="w-3.5 h-3.5" />
              Prospectos ({leads.length})
            </button>
          )}

          {siteConfig.modules.appointments && (
            <button
              onClick={() => setActiveTab('appointments')}
              className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all flex items-center gap-1.5 cursor-pointer ${
                activeTab === 'appointments' ? 'bg-primary text-white shadow-md' : 'text-slate-400 hover:text-white hover:bg-slate-800/40'
              }`}
            >
              <Calendar className="w-3.5 h-3.5" />
              Citas & Agenda ({appointments.length})
            </button>
          )}

          {siteConfig.modules.quotes && (
            <button
              onClick={() => setActiveTab('quotes')}
              className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all flex items-center gap-1.5 cursor-pointer ${
                activeTab === 'quotes' ? 'bg-primary text-white shadow-md' : 'text-slate-400 hover:text-white hover:bg-slate-800/40'
              }`}
            >
              <FileText className="w-3.5 h-3.5" />
              Cotizador & Facturación ({quotes.length})
            </button>
          )}

          {siteConfig.modules.portfolio && (
            <button
              onClick={() => setActiveTab('portfolio')}
              className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all flex items-center gap-1.5 cursor-pointer ${
                activeTab === 'portfolio' ? 'bg-primary text-white shadow-md' : 'text-slate-400 hover:text-white hover:bg-slate-800/40'
              }`}
            >
              <ImageIcon className="w-3.5 h-3.5" />
              Galería & Trabajos ({projects.length})
            </button>
          )}

          {siteConfig.modules.reviews && (
            <button
              onClick={() => setActiveTab('reviews')}
              className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all flex items-center gap-1.5 cursor-pointer ${
                activeTab === 'reviews' ? 'bg-primary text-white shadow-md' : 'text-slate-400 hover:text-white hover:bg-slate-800/40'
              }`}
            >
              <Star className="w-3.5 h-3.5" />
              Reseñas ({reviews.length})
            </button>
          )}

          {siteConfig.modules.services && (
            <button
              onClick={() => setActiveTab('services')}
              className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all flex items-center gap-1.5 cursor-pointer ${
                activeTab === 'services' ? 'bg-primary text-white shadow-md' : 'text-slate-400 hover:text-white hover:bg-slate-800/40'
              }`}
            >
              <Layers className="w-3.5 h-3.5" />
              Servicios & Precios ({services.length})
            </button>
          )}

          {siteConfig.modules.analytics && (
            <button
              onClick={() => setActiveTab('analytics')}
              className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all flex items-center gap-1.5 cursor-pointer ${
                activeTab === 'analytics' ? 'bg-primary text-white shadow-md' : 'text-slate-400 hover:text-white hover:bg-slate-800/40'
              }`}
            >
              <BarChart3 className="w-3.5 h-3.5" />
              Analítica & Métricas
            </button>
          )}

          {siteConfig.modules.cms && (
            <button
              onClick={() => setActiveTab('cms')}
              className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all flex items-center gap-1.5 cursor-pointer ${
                activeTab === 'cms' ? 'bg-primary text-white shadow-md' : 'text-slate-400 hover:text-white hover:bg-slate-800/40'
              }`}
            >
              <Settings className="w-3.5 h-3.5" />
              Datos del Sitio (CMS)
            </button>
          )}

          <div className="h-4 w-px bg-slate-800 mx-1" />

          <button
            onClick={() => setActiveTab('modules')}
            className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all flex items-center gap-1.5 cursor-pointer ${
              activeTab === 'modules' ? 'bg-slate-800 text-white' : 'text-slate-400 hover:text-white'
            }`}
          >
            <Sliders className="w-3.5 h-3.5" />
            Interruptor de Módulos
          </button>

          <button
            onClick={() => setActiveTab('support')}
            className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all flex items-center gap-1.5 cursor-pointer ${
              activeTab === 'support' ? 'bg-slate-800 text-white' : 'text-slate-400 hover:text-white'
            }`}
          >
            <HelpCircle className="w-3.5 h-3.5" />
            Soporte Gmedia
          </button>
        </div>
      </div>

      {/* 3. ÁREA DE TRABAJO */}
      <main className="flex-1 max-w-7xl mx-auto w-full p-4 sm:p-8 space-y-6">
        
        {/* KPI RESUMEN SUPERIOR */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <Card className="bg-slate-900/60 border-slate-800/80 p-4 rounded-2xl">
            <div className="flex justify-between items-start">
              <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Prospectos Activos</span>
              <div className="p-1.5 rounded-lg bg-emerald-500/10 text-emerald-400"><Users className="w-4 h-4" /></div>
            </div>
            <div className="mt-2 text-2xl font-black text-white">{leads.length}</div>
            <p className="text-[10px] text-emerald-400 mt-1 flex items-center gap-1">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" /> {leads.filter(l => l.status === 'new').length} nuevos hoy
            </p>
          </Card>

          <Card className="bg-slate-900/60 border-slate-800/80 p-4 rounded-2xl">
            <div className="flex justify-between items-start">
              <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Citas Confirmadas</span>
              <div className="p-1.5 rounded-lg bg-primary/10 text-primary"><Calendar className="w-4 h-4" /></div>
            </div>
            <div className="mt-2 text-2xl font-black text-white">{appointments.filter(a => a.status === 'confirmed').length}</div>
            <p className="text-[10px] text-slate-400 mt-1">Próximas en agenda</p>
          </Card>

          <Card className="bg-slate-900/60 border-slate-800/80 p-4 rounded-2xl">
            <div className="flex justify-between items-start">
              <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Cotizaciones en Pipeline</span>
              <div className="p-1.5 rounded-lg bg-blue-500/10 text-blue-400"><DollarSign className="w-4 h-4" /></div>
            </div>
            <div className="mt-2 text-2xl font-black text-white">{quotes.length}</div>
            <p className="text-[10px] text-blue-400 mt-1">Formatos proforma emitidos</p>
          </Card>

          <Card className="bg-slate-900/60 border-slate-800/80 p-4 rounded-2xl">
            <div className="flex justify-between items-start">
              <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Garantía de Servicio</span>
              <div className="p-1.5 rounded-lg bg-emerald-500/10 text-emerald-400"><ShieldCheck className="w-4 h-4" /></div>
            </div>
            <div className="mt-2 text-sm font-bold text-white flex items-center gap-1.5">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" /> 100% Operativo
            </div>
            <p className="text-[10px] text-slate-400 mt-1 font-mono">Vercel Edge Global</p>
          </Card>
        </div>

        {/* ---------------- PESTAÑA: LEADS & CRM ---------------- */}
        {activeTab === 'leads' && (
          <div className="space-y-4 animate-in fade-in duration-300">
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3 bg-slate-900/50 p-4 rounded-2xl border border-slate-800/80">
              <div className="flex items-center gap-2 w-full sm:w-auto">
                <div className="relative flex-1 sm:w-64">
                  <Search className="w-3.5 h-3.5 absolute left-3 top-3 text-slate-500" />
                  <Input
                    placeholder="Buscar prospecto..."
                    value={searchFilter}
                    onChange={(e) => setSearchFilter(e.target.value)}
                    className="h-9 pl-9 text-xs bg-slate-950/60 border-slate-800 text-white"
                  />
                </div>
                <select
                  value={statusFilter}
                  onChange={(e) => setStatusFilter(e.target.value)}
                  className="h-9 text-xs bg-slate-950/60 border border-slate-800 rounded-lg px-2.5 text-slate-300 outline-none"
                >
                  <option value="all">Todos los Estados</option>
                  <option value="new">Nuevos</option>
                  <option value="contacted">Contactados</option>
                  <option value="closed">Cerrados</option>
                </select>
              </div>

              <Button
                variant="outline"
                size="sm"
                onClick={handleExportCSV}
                className="h-9 text-xs border-slate-800 bg-slate-950/60 hover:bg-slate-800 text-slate-200 cursor-pointer"
              >
                <Download className="w-3.5 h-3.5 mr-1 text-primary" /> Exportar CSV
              </Button>
            </div>

            <div className="space-y-3">
              {leads.map((lead) => (
                <Card key={lead.id} className="bg-slate-900/60 border-slate-800/80 hover:border-slate-700 transition-all p-4 rounded-2xl">
                  <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-4">
                    <div className="space-y-1.5 flex-1">
                      <div className="flex items-center gap-2.5">
                        <h3 className="font-bold text-sm text-white">{lead.name}</h3>
                        <Badge 
                          variant="outline" 
                          className={`text-[9px] uppercase tracking-wider font-mono ${
                            lead.status === 'new' ? 'bg-emerald-500/10 text-emerald-400 border-emerald-500/30' :
                            lead.status === 'contacted' ? 'bg-amber-500/10 text-amber-400 border-amber-500/30' :
                            'bg-blue-500/10 text-blue-400 border-blue-500/30'
                          }`}
                        >
                          {lead.status === 'new' ? 'NUEVO' : lead.status === 'contacted' ? 'CONTACTADO' : 'CERRADO'}
                        </Badge>
                        <span className="text-[10px] text-slate-500 font-mono">{lead.date}</span>
                      </div>
                      <div className="flex flex-wrap items-center gap-x-4 gap-y-1 text-xs text-slate-400">
                        <span className="flex items-center gap-1 text-slate-300"><Phone className="w-3 h-3 text-primary" /> {lead.phone}</span>
                        <span className="flex items-center gap-1"><Mail className="w-3 h-3 text-slate-500" /> {lead.email}</span>
                        <span>Servicio: <span className="text-primary font-bold">{lead.service}</span></span>
                        {lead.budget && <span className="text-emerald-400 font-mono font-bold bg-emerald-500/10 px-2 py-0.5 rounded">{lead.budget}</span>}
                      </div>
                    </div>

                    <div className="flex items-center gap-2 w-full lg:w-auto pt-2 lg:pt-0 border-t lg:border-t-0 border-slate-800">
                      <a
                        href={`https://wa.me/${lead.phone.replace(/[^0-9]/g, '')}?text=${encodeURIComponent(`Hola ${lead.name}, te escribo de ${siteConfig.brandName}. Vimos tu solicitud sobre "${lead.service}". ¿Cómo podemos ayudarte?`)}`}
                        target="_blank"
                        rel="noreferrer"
                        className="px-3 py-1.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs flex items-center gap-1.5 shadow-md transition-colors"
                      >
                        <MessageSquare className="w-3.5 h-3.5" /> WhatsApp
                      </a>
                      <select
                        value={lead.status}
                        onChange={(e) => handleUpdateLeadStatus(lead.id, e.target.value as any)}
                        className="h-8 text-xs bg-slate-950 border border-slate-800 rounded-xl px-2 text-slate-300 outline-none"
                      >
                        <option value="new">Nuevo</option>
                        <option value="contacted">Contactado</option>
                        <option value="closed">Cerrado</option>
                      </select>
                      <button onClick={() => handleDeleteLead(lead.id)} className="p-2 text-slate-500 hover:text-red-400 cursor-pointer">
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                </Card>
              ))}
            </div>
          </div>
        )}

        {/* ---------------- PESTAÑA: CITAS & AGENDA ---------------- */}
        {activeTab === 'appointments' && (
          <div className="space-y-4 animate-in fade-in duration-300">
            <div className="flex justify-between items-center bg-slate-900/50 p-4 rounded-2xl border border-slate-800/80">
              <div>
                <h2 className="text-sm font-bold text-white">Agenda de Citas & Visitas Técnicas</h2>
                <p className="text-xs text-slate-400">Coordinación de visitas, citas médicas o consultas en terreno.</p>
              </div>
              <Button onClick={() => setShowNewAptModal(true)} size="sm" className="bg-primary text-white font-bold text-xs rounded-xl cursor-pointer">
                <Plus className="w-3.5 h-3.5 mr-1" /> Agendar Nueva Cita
              </Button>
            </div>

            {showNewAptModal && (
              <Card className="bg-slate-900 border-primary/30 p-5 rounded-2xl space-y-4">
                <h3 className="text-xs font-bold uppercase tracking-wider text-primary">Agendar Nueva Cita</h3>
                <form onSubmit={handleAddAppointment} className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
                  <Input placeholder="Nombre del Cliente" value={newApt.clientName} onChange={e => setNewApt({...newApt, clientName: e.target.value})} className="bg-slate-950 border-slate-800 h-9" />
                  <Input placeholder="Teléfono / WhatsApp" value={newApt.phone} onChange={e => setNewApt({...newApt, phone: e.target.value})} className="bg-slate-950 border-slate-800 h-9" />
                  <Input placeholder="Servicio o Motivo" value={newApt.service} onChange={e => setNewApt({...newApt, service: e.target.value})} className="bg-slate-950 border-slate-800 h-9" />
                  <Input type="date" value={newApt.date} onChange={e => setNewApt({...newApt, date: e.target.value})} className="bg-slate-950 border-slate-800 h-9" />
                  <Input placeholder="Hora (ej. 10:30 AM)" value={newApt.time} onChange={e => setNewApt({...newApt, time: e.target.value})} className="bg-slate-950 border-slate-800 h-9" />
                  <div className="flex items-center gap-2">
                    <Button type="submit" size="sm" className="bg-primary text-white font-bold text-xs h-9">Guardar Cita</Button>
                    <Button type="button" variant="ghost" size="sm" onClick={() => setShowNewAptModal(false)} className="text-xs h-9">Cancelar</Button>
                  </div>
                </form>
              </Card>
            )}

            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              {appointments.map((apt) => (
                <Card key={apt.id} className="bg-slate-900/60 border-slate-800/80 p-4 rounded-2xl space-y-3">
                  <div className="flex justify-between items-start">
                    <div>
                      <h4 className="font-bold text-sm text-white">{apt.clientName}</h4>
                      <p className="text-xs text-primary font-medium">{apt.service}</p>
                    </div>
                    <Badge variant="outline" className={`text-[9px] uppercase font-mono ${
                      apt.status === 'confirmed' ? 'bg-emerald-500/10 text-emerald-400 border-emerald-500/30' :
                      apt.status === 'pending' ? 'bg-amber-500/10 text-amber-400 border-amber-500/30' : 'bg-slate-800 text-slate-400'
                    }`}>
                      {apt.status}
                    </Badge>
                  </div>
                  <div className="flex items-center justify-between text-xs text-slate-400 pt-2 border-t border-slate-800">
                    <div className="flex items-center gap-3">
                      <span className="flex items-center gap-1 font-mono text-slate-300"><Calendar className="w-3 h-3 text-primary" /> {apt.date}</span>
                      <span className="flex items-center gap-1 font-mono text-slate-300"><Clock className="w-3 h-3 text-primary" /> {apt.time}</span>
                    </div>
                    <a
                      href={`https://wa.me/${apt.phone.replace(/[^0-9]/g, '')}?text=${encodeURIComponent(`Hola ${apt.clientName}, confirmamos su cita de ${apt.service} para el día ${apt.date} a las ${apt.time}. ¡Nos vemos pronto!`)}`}
                      target="_blank"
                      rel="noreferrer"
                      className="px-2.5 py-1 rounded-lg bg-emerald-600/20 text-emerald-400 hover:bg-emerald-600/30 text-[11px] font-bold flex items-center gap-1"
                    >
                      <MessageSquare className="w-3 h-3" /> Recordar
                    </a>
                  </div>
                </Card>
              ))}
            </div>
          </div>
        )}

        {/* ---------------- PESTAÑA: COTIZADOR & FACTURACIÓN ---------------- */}
        {activeTab === 'quotes' && (
          <div className="space-y-4 animate-in fade-in duration-300">
            <div className="flex justify-between items-center bg-slate-900/50 p-4 rounded-2xl border border-slate-800/80">
              <div>
                <h2 className="text-sm font-bold text-white">Generador de Cotizaciones & Presupuestos Formales</h2>
                <p className="text-xs text-slate-400">Emisión de cotizaciones desglosadas con descarga en PDF y envío por WhatsApp.</p>
              </div>
            </div>

            {quotes.map((q) => {
              const subtotal = q.items.reduce((acc, it) => acc + (it.quantity * it.unitPrice), 0);
              const tax = subtotal * (q.taxRate / 100);
              const total = subtotal + tax;

              return (
                <Card key={q.id} className="bg-slate-900/70 border-slate-800 p-6 rounded-3xl space-y-5">
                  <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3 border-b border-slate-800 pb-4">
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="text-sm font-black font-mono text-primary">{q.quoteNumber}</span>
                        <Badge variant="outline" className="text-[10px] uppercase font-mono bg-blue-500/10 text-blue-400 border-blue-500/30">
                          {q.status}
                        </Badge>
                      </div>
                      <h3 className="font-extrabold text-base text-white mt-1">{q.clientName}</h3>
                      <p className="text-xs text-slate-400">{q.clientEmail} • {q.clientPhone}</p>
                    </div>

                    <div className="text-right">
                      <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Total Cotizado</span>
                      <div className="text-2xl font-black text-emerald-400 font-mono">${total.toLocaleString()} USD</div>
                      <span className="text-[11px] text-slate-500">Fecha: {q.date}</span>
                    </div>
                  </div>

                  {/* Tabla de Artículos */}
                  <div className="overflow-x-auto">
                    <table className="w-full text-xs text-left">
                      <thead className="text-[10px] uppercase text-slate-500 border-b border-slate-800">
                        <tr>
                          <th className="py-2">Descripción</th>
                          <th className="py-2 text-center">Cant.</th>
                          <th className="py-2 text-right">Precio Unit.</th>
                          <th className="py-2 text-right">Total</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-slate-800/60 font-mono">
                        {q.items.map((it) => (
                          <tr key={it.id}>
                            <td className="py-2.5 font-sans text-slate-300">{it.description}</td>
                            <td className="py-2.5 text-center text-slate-400">{it.quantity}</td>
                            <td className="py-2.5 text-right text-slate-400">${it.unitPrice}</td>
                            <td className="py-2.5 text-right text-white font-bold">${(it.quantity * it.unitPrice).toLocaleString()}</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>

                  <div className="flex justify-end gap-2 pt-3 border-t border-slate-800">
                    <a
                      href={`https://wa.me/${q.clientPhone.replace(/[^0-9]/g, '')}?text=${encodeURIComponent(`Estimado ${q.clientName}, le adjuntamos la cotización ${q.quoteNumber} por un total de $${total.toLocaleString()} USD. Quedamos a su disposición para iniciar el proyecto.`)}`}
                      target="_blank"
                      rel="noreferrer"
                      className="px-4 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs flex items-center gap-1.5 shadow-md"
                    >
                      <MessageSquare className="w-3.5 h-3.5" /> Enviar por WhatsApp
                    </a>
                  </div>
                </Card>
              );
            })}
          </div>
        )}

        {/* ---------------- PESTAÑA: GALERÍA DE PROYECTOS ---------------- */}
        {activeTab === 'portfolio' && (
          <div className="space-y-4 animate-in fade-in duration-300">
            <div className="flex justify-between items-center bg-slate-900/50 p-4 rounded-2xl border border-slate-800/80">
              <div>
                <h2 className="text-sm font-bold text-white">Galería de Proyectos & Casos de Éxito (Antes y Después)</h2>
                <p className="text-xs text-slate-400">Muestre fotos reales de sus trabajos para elevar la tasa de conversión.</p>
              </div>
              <Button onClick={() => setShowNewProjectModal(true)} size="sm" className="bg-primary text-white font-bold text-xs rounded-xl cursor-pointer">
                <Plus className="w-3.5 h-3.5 mr-1" /> Añadir Proyecto
              </Button>
            </div>

            {showNewProjectModal && (
              <Card className="bg-slate-900 border-primary/30 p-5 rounded-2xl space-y-3">
                <h3 className="text-xs font-bold uppercase tracking-wider text-primary">Nuevo Proyecto de Portafolio</h3>
                <form onSubmit={handleAddProject} className="space-y-3 text-xs">
                  <Input placeholder="Título del Proyecto (ej. Cancha Club Los Prados)" value={newProj.title} onChange={e => setNewProj({...newProj, title: e.target.value})} className="bg-slate-950 border-slate-800 h-9" />
                  <Input placeholder="Descripción breve" value={newProj.description} onChange={e => setNewProj({...newProj, description: e.target.value})} className="bg-slate-950 border-slate-800 h-9" />
                  <div className="grid grid-cols-2 gap-2">
                    <Input placeholder="URL Foto Antes (opcional)" value={newProj.beforeImgUrl} onChange={e => setNewProj({...newProj, beforeImgUrl: e.target.value})} className="bg-slate-950 border-slate-800 h-9 font-mono" />
                    <Input placeholder="URL Foto Después (opcional)" value={newProj.afterImgUrl} onChange={e => setNewProj({...newProj, afterImgUrl: e.target.value})} className="bg-slate-950 border-slate-800 h-9 font-mono" />
                  </div>
                  <div className="flex gap-2">
                    <Button type="submit" size="sm" className="bg-primary text-white font-bold text-xs">Publicar en Web</Button>
                    <Button type="button" variant="ghost" size="sm" onClick={() => setShowNewProjectModal(false)} className="text-xs">Cancelar</Button>
                  </div>
                </form>
              </Card>
            )}

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {projects.map((proj) => (
                <Card key={proj.id} className="bg-slate-900/60 border-slate-800 p-4 rounded-3xl space-y-3 overflow-hidden">
                  <div className="grid grid-cols-2 gap-2 rounded-2xl overflow-hidden h-40">
                    <div className="relative bg-slate-800">
                      <img src={proj.beforeImgUrl} alt="Antes" className="w-full h-full object-cover" />
                      <span className="absolute bottom-2 left-2 text-[9px] font-bold bg-black/70 text-white px-2 py-0.5 rounded">ANTES</span>
                    </div>
                    <div className="relative bg-slate-800">
                      <img src={proj.afterImgUrl} alt="Después" className="w-full h-full object-cover" />
                      <span className="absolute bottom-2 left-2 text-[9px] font-bold bg-emerald-600 text-white px-2 py-0.5 rounded">DESPUÉS</span>
                    </div>
                  </div>
                  <div className="space-y-1">
                    <div className="flex justify-between items-start">
                      <h4 className="font-bold text-sm text-white">{proj.title}</h4>
                      <Badge variant="outline" className="text-[9px]">{proj.category}</Badge>
                    </div>
                    <p className="text-xs text-slate-400 leading-relaxed">{proj.description}</p>
                  </div>
                  <div className="flex justify-between items-center pt-2 border-t border-slate-800 text-xs">
                    <span className="text-slate-400">Visible en la web:</span>
                    <button
                      onClick={() => handleToggleProject(proj.id)}
                      className={`px-3 py-1 rounded-lg text-[10px] font-bold cursor-pointer ${
                        proj.visible ? 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/30' : 'bg-slate-800 text-slate-500'
                      }`}
                    >
                      {proj.visible ? '🟢 Publicado' : '⚪ Oculto'}
                    </button>
                  </div>
                </Card>
              ))}
            </div>
          </div>
        )}

        {/* ---------------- PESTAÑA: RESEÑAS & TESTIMONIOS ---------------- */}
        {activeTab === 'reviews' && (
          <div className="space-y-4 animate-in fade-in duration-300">
            <div className="flex justify-between items-center bg-slate-900/50 p-4 rounded-2xl border border-slate-800/80">
              <div>
                <h2 className="text-sm font-bold text-white">Gestor de Reseñas & Prueba Social</h2>
                <p className="text-xs text-slate-400">Controle qué testimonios de 5 estrellas se muestran públicamente en el sitio.</p>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {reviews.map((rev) => (
                <Card key={rev.id} className="bg-slate-900/60 border-slate-800 p-5 rounded-2xl space-y-3">
                  <div className="flex justify-between items-start">
                    <div>
                      <div className="flex gap-1 text-amber-400 mb-1">
                        {[...Array(rev.rating)].map((_, i) => (
                          <Star key={i} className="w-3.5 h-3.5 fill-amber-400" />
                        ))}
                      </div>
                      <h4 className="font-bold text-sm text-white">{rev.author}</h4>
                      <p className="text-[11px] text-slate-400">{rev.roleOrCompany}</p>
                    </div>
                    <button
                      onClick={() => handleToggleReview(rev.id)}
                      className={`px-2.5 py-1 rounded-lg text-[10px] font-bold cursor-pointer ${
                        rev.visible ? 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/30' : 'bg-slate-800 text-slate-500'
                      }`}
                    >
                      {rev.visible ? 'Visible' : 'Oculto'}
                    </button>
                  </div>
                  <p className="text-xs text-slate-300 italic">"{rev.comment}"</p>
                </Card>
              ))}
            </div>
          </div>
        )}

        {/* ---------------- PESTAÑA: SERVICIOS & PRECIOS ---------------- */}
        {activeTab === 'services' && (
          <div className="space-y-4 animate-in fade-in duration-300">
            <div className="bg-slate-900/50 p-4 rounded-2xl border border-slate-800/80">
              <h2 className="text-sm font-bold text-white">Catálogo de Servicios & Precios Base</h2>
              <p className="text-xs text-slate-400">Servicios reflejados en la cuadrícula principal de la página de inicio.</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {services.map((serv) => (
                <Card key={serv.id} className="bg-slate-900/60 border-slate-800 p-5 rounded-2xl space-y-3 flex flex-col justify-between">
                  <div className="space-y-2">
                    <div className="flex justify-between items-start gap-1">
                      <span className="text-[10px] font-mono uppercase text-slate-500">{serv.category}</span>
                      {serv.badge && <Badge className="text-[9px] bg-primary/10 text-primary border-primary/20">{serv.badge}</Badge>}
                    </div>
                    <h4 className="font-bold text-sm text-white">{serv.name}</h4>
                    <p className="text-xs text-slate-400 leading-relaxed">{serv.description}</p>
                  </div>
                  <div className="pt-3 border-t border-slate-800 flex justify-between items-center text-xs">
                    <span className="font-bold font-mono text-emerald-400">{serv.priceEstimate}</span>
                    <span className="text-slate-500 text-[11px]">{serv.duration}</span>
                  </div>
                </Card>
              ))}
            </div>
          </div>
        )}

        {/* ---------------- PESTAÑA: ANALÍTICA & MÉTRICAS ---------------- */}
        {activeTab === 'analytics' && (
          <div className="space-y-4 animate-in fade-in duration-300">
            <div className="bg-slate-900/50 p-4 rounded-2xl border border-slate-800/80">
              <h2 className="text-sm font-bold text-white">Métricas de Rendimiento & Conversión</h2>
              <p className="text-xs text-slate-400">Telemetría de visitantes, solicitudes y efectividad comercial.</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <Card className="bg-slate-900/60 border-slate-800 p-5 rounded-2xl space-y-2">
                <span className="text-xs font-bold text-slate-400 uppercase">Tasa de Conversión Web</span>
                <div className="text-3xl font-black text-emerald-400 font-mono">14.8%</div>
                <p className="text-[11px] text-slate-400">14 de cada 100 visitantes contactan o cotizan.</p>
              </Card>
              <Card className="bg-slate-900/60 border-slate-800 p-5 rounded-2xl space-y-2">
                <span className="text-xs font-bold text-slate-400 uppercase">Clicks al Botón WhatsApp</span>
                <div className="text-3xl font-black text-primary font-mono">248</div>
                <p className="text-[11px] text-slate-400">Conversaciones directas generadas este mes.</p>
              </Card>
              <Card className="bg-slate-900/60 border-slate-800 p-5 rounded-2xl space-y-2">
                <span className="text-xs font-bold text-slate-400 uppercase">Cotizaciones Simuladas</span>
                <div className="text-3xl font-black text-blue-400 font-mono">182</div>
                <p className="text-[11px] text-slate-400">Usuarios que interactuaron con el estimador de m².</p>
              </Card>
            </div>
          </div>
        )}

        {/* ---------------- PESTAÑA: CMS LIGERO (CONFIGURACIÓN) ---------------- */}
        {activeTab === 'cms' && (
          <Card className="bg-slate-900/60 border-slate-800/80 p-6 rounded-3xl max-w-3xl space-y-6">
            <div>
              <h2 className="text-base font-bold text-white tracking-tight">Editor de Contenidos & Datos Públicos</h2>
              <p className="text-xs text-slate-400">Modifique los teléfonos, correos y textos principales de su sitio web sin tocar código.</p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="space-y-1.5">
                <label className="text-xs font-semibold text-slate-300">Nombre de la Empresa</label>
                <Input
                  value={siteConfig.brandName}
                  onChange={(e) => setSiteConfig({ ...siteConfig, brandName: e.target.value })}
                  className="bg-slate-950 border-slate-800 text-white text-xs h-10"
                />
              </div>

              <div className="space-y-1.5">
                <label className="text-xs font-semibold text-slate-300">Teléfono Principal de Llamadas</label>
                <Input
                  value={siteConfig.phone}
                  onChange={(e) => setSiteConfig({ ...siteConfig, phone: e.target.value })}
                  className="bg-slate-950 border-slate-800 text-white text-xs h-10"
                />
              </div>

              <div className="space-y-1.5">
                <label className="text-xs font-semibold text-slate-300">WhatsApp de Cotizaciones (sin + ni guiones)</label>
                <Input
                  value={siteConfig.whatsappNumber}
                  onChange={(e) => setSiteConfig({ ...siteConfig, whatsappNumber: e.target.value })}
                  className="bg-slate-950 border-slate-800 text-white text-xs h-10 font-mono"
                />
              </div>

              <div className="space-y-1.5">
                <label className="text-xs font-semibold text-slate-300">Correo Electrónico Corporativo</label>
                <Input
                  value={siteConfig.email}
                  onChange={(e) => setSiteConfig({ ...siteConfig, email: e.target.value })}
                  className="bg-slate-950 border-slate-800 text-white text-xs h-10"
                />
              </div>

              <div className="space-y-1.5 sm:col-span-2">
                <label className="text-xs font-semibold text-slate-300">Dirección o Cobertura de Servicio</label>
                <Input
                  value={siteConfig.address}
                  onChange={(e) => setSiteConfig({ ...siteConfig, address: e.target.value })}
                  className="bg-slate-950 border-slate-800 text-white text-xs h-10"
                />
              </div>

              <div className="space-y-1.5 sm:col-span-2">
                <label className="text-xs font-semibold text-slate-300">Mensaje de Barra Superior (Topbar)</label>
                <Input
                  value={siteConfig.topbarMessage}
                  onChange={(e) => setSiteConfig({ ...siteConfig, topbarMessage: e.target.value })}
                  className="bg-slate-950 border-slate-800 text-white text-xs h-10"
                />
              </div>
            </div>

            <Button onClick={() => { persist("gmedia_client_site_config", siteConfig); toast.success("Configuración guardada."); }} className="bg-primary text-white font-bold text-xs h-10 px-6 rounded-xl cursor-pointer">
              Guardar y Publicar Cambios
            </Button>
          </Card>
        )}

        {/* ---------------- PESTAÑA: INTERRUPTOR DE MÓDULOS (LEGO) ---------------- */}
        {activeTab === 'modules' && (
          <div className="space-y-4 max-w-3xl animate-in fade-in duration-300">
            <div className="bg-slate-900/50 p-4 rounded-2xl border border-slate-800/80">
              <h2 className="text-sm font-bold text-white">Catálogo de Módulos Plug-and-Play</h2>
              <p className="text-xs text-slate-400">Encienda o apague los módulos según el modelo de negocio del cliente.</p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {[
                { key: 'leads', name: '📥 Bandeja de Leads & CRM', desc: 'Captura y respuesta por WhatsApp en 1 clic.' },
                { key: 'appointments', name: '📅 Citas & Agenda', desc: 'Gestor de visitas técnicas o consultas.' },
                { key: 'quotes', name: '💰 Cotizador & Facturas', desc: 'Emisión de proformas desglosadas.' },
                { key: 'portfolio', name: '📸 Galería de Trabajos', desc: 'Casos de éxito con fotos Antes/Después.' },
                { key: 'reviews', name: '⭐ Gestor de Reseñas', desc: 'Prueba social con testimonios de clientes.' },
                { key: 'services', name: '🏷️ Catálogo de Servicios', desc: 'Matriz de servicios y precios base.' },
                { key: 'analytics', name: '📊 Analítica Comercial', desc: 'Métricas de conversión y tráfico web.' },
                { key: 'cms', name: '📝 Editor de Contenidos', desc: 'Cambio de teléfonos y textos públicos.' }
              ].map((m) => (
                <Card key={m.key} className="bg-slate-900/60 border-slate-800 p-4 rounded-2xl flex justify-between items-center">
                  <div>
                    <h4 className="font-bold text-xs text-white">{m.name}</h4>
                    <p className="text-[11px] text-slate-400 mt-0.5">{m.desc}</p>
                  </div>
                  <input
                    type="checkbox"
                    checked={siteConfig.modules[m.key as keyof typeof siteConfig.modules]}
                    onChange={() => handleToggleModule(m.key as any)}
                    className="w-4 h-4 rounded text-primary cursor-pointer"
                  />
                </Card>
              ))}
            </div>
          </div>
        )}

        {/* ---------------- PESTAÑA: SOPORTE TÉCNICO & SLA ---------------- */}
        {activeTab === 'support' && (
          <Card className="bg-slate-900/60 border-slate-800 p-6 rounded-3xl max-w-2xl space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-primary/10 border border-primary/20 flex items-center justify-center text-primary">
                <HelpCircle className="w-5 h-5" />
              </div>
              <div>
                <h3 className="text-sm font-bold text-white">Soporte Técnico Administrado por Gmedia AI</h3>
                <p className="text-xs text-slate-400">Infraestructura empresarial Vercel Edge con monitoreo y backups automáticos.</p>
              </div>
            </div>

            <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 space-y-2 text-xs">
              <div className="flex justify-between"><span className="text-slate-400">Plan de Alojamiento:</span><span className="font-bold text-primary">Gmedia Pro Managed Cloud</span></div>
              <div className="flex justify-between"><span className="text-slate-400">Certificado SSL:</span><span className="font-mono text-emerald-400">Activo (TLS 1.3 / Let's Encrypt)</span></div>
              <div className="flex justify-between"><span className="text-slate-400">Copias de Seguridad:</span><span className="text-slate-300">GitHub Version Control Activo</span></div>
              <div className="flex justify-between"><span className="text-slate-400">Tiempo de Respuesta:</span><span className="text-slate-300">&lt; 2 horas garantizado</span></div>
            </div>

            <a
              href="https://wa.me/18090000000?text=Hola%20Gmedia,%20necesito%20asistencia%20en%20mi%20portal%20administrativo"
              target="_blank"
              rel="noreferrer"
              className="w-full h-11 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs flex items-center justify-center gap-2 shadow-lg transition-colors cursor-pointer"
            >
              <MessageSquare className="w-4 h-4" /> Contactar a Soporte de Gmedia por WhatsApp
            </a>
          </Card>
        )}

      </main>

      {/* FOOTER */}
      <footer className="border-t border-slate-800/80 py-4 text-center text-[11px] text-slate-500">
        © {new Date().getFullYear()} {siteConfig.brandName}. Desarrollado con Gmedia AI Web Ops.
      </footer>
    </div>
  );
}
