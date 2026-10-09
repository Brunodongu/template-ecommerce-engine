'use client';

import { useState } from 'react';
import { Navbar } from '@/components/Navbar';
import { Footer } from '@/components/Footer';
import { Button, buttonVariants } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Badge } from '@/components/ui/badge';
import { 
  CheckCircle2, 
  ArrowRight, 
  ShieldCheck, 
  Zap, 
  Star, 
  Sparkles,
  PhoneCall
} from 'lucide-react';
import { toast } from 'sonner';

export default function HomePage() {
  const [loading, setLoading] = useState(false);
  const [form, setForm] = useState({ name: '', email: '', phone: '', message: '' });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      toast.success('¡Solicitud enviada con éxito! Nos comunicaremos en breve.');
      setForm({ name: '', email: '', phone: '', message: '' });
    }, 1000);
  };

  const services = [
    {
      title: 'Consultoría Especializada',
      description: 'Estrategias a la medida diseñadas para optimizar procesos y multiplicar resultados.',
      icon: Zap,
    },
    {
      title: 'Soluciones Tecnológicas',
      description: 'Herramientas modernas y escalables que impulsan la productividad de tu equipo.',
      icon: Sparkles,
    },
    {
      title: 'Soporte y Garantía Total',
      description: 'Acompañamiento continuo y soporte técnico disponible para mantener tu negocio en marcha.',
      icon: ShieldCheck,
    },
  ];

  const testimonials = [
    {
      quote: 'El servicio superó todas nuestras expectativas. La rapidez y profesionalismo fueron excepcionales.',
      author: 'María Rodríguez',
      role: 'Directora General, Innova Corp',
    },
    {
      quote: 'Gracias a su solución logramos incrementar nuestras ventas y mejorar la satisfacción de nuestros clientes.',
      author: 'Carlos Gómez',
      role: 'Fundador, Apex Solutions',
    },
  ];

  return (
    <div className="flex min-h-screen flex-col">
      <Navbar />

      <main className="flex-1">
        {/* HERO SECTION */}
        <section className="relative overflow-hidden py-20 lg:py-32 bg-gradient-to-b from-primary/5 via-background to-background">
          <div className="container mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 text-center">
            <Badge variant="outline" className="mb-6 px-4 py-1.5 text-sm font-medium border-primary/30 text-primary">
              ⭐ Líderes en el Mercado Nacional
            </Badge>
            <h1 className="text-4xl sm:text-6xl font-extrabold tracking-tight text-foreground max-w-4xl mx-auto leading-tight">
              Transformamos la visión de tu negocio en{' '}
              <span className="text-primary underline decoration-primary/30 underline-offset-8">
                resultados tangibles
              </span>
            </h1>
            <p className="mt-6 text-lg sm:text-xl text-muted-foreground max-w-2xl mx-auto leading-relaxed">
              Ofrecemos servicios de alta calidad con atención personalizada para empresas y profesionales que buscan excelencia.
            </p>
            <div className="mt-10 flex flex-col sm:flex-row gap-4 justify-center items-center">
              <a href="#contacto" className={buttonVariants({ size: "lg", className: "h-12 px-8 text-base gap-2" })}>
                Iniciar Ahora <ArrowRight className="h-5 w-5" />
              </a>
              <a href="#servicios" className={buttonVariants({ size: "lg", variant: "outline", className: "h-12 px-8 text-base" })}>
                Conocer Servicios
              </a>
            </div>

            <div className="mt-12 flex items-center justify-center gap-8 text-sm text-muted-foreground">
              <div className="flex items-center gap-2">
                <CheckCircle2 className="h-4 w-4 text-primary" />
                <span>Atención Rápida</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 className="h-4 w-4 text-primary" />
                <span>Garantía de Satisfacción</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 className="h-4 w-4 text-primary" />
                <span>Asesoría Personalizada</span>
              </div>
            </div>
          </div>
        </section>

        {/* SERVICIOS */}
        <section id="servicios" className="py-20 bg-muted/20 border-y border-border/50">
          <div className="container mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="text-center max-w-2xl mx-auto mb-16">
              <h2 className="text-3xl font-bold tracking-tight">Nuestros Servicios</h2>
              <p className="mt-4 text-muted-foreground">
                Diseñados para cubrir cada etapa del desarrollo y crecimiento de tu empresa.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {services.map((item, index) => {
                const Icon = item.icon;
                return (
                  <Card key={index} className="border-border/60 hover:shadow-lg transition-all hover:border-primary/50">
                    <CardHeader>
                      <div className="h-12 w-12 rounded-xl bg-primary/10 text-primary flex items-center justify-center mb-4">
                        <Icon className="h-6 w-6" />
                      </div>
                      <CardTitle className="text-xl">{item.title}</CardTitle>
                      <CardDescription className="text-sm mt-2">{item.description}</CardDescription>
                    </CardHeader>
                  </Card>
                );
              })}
            </div>
          </div>
        </section>

        {/* TESTIMONIOS */}
        <section id="testimonios" className="py-20">
          <div className="container mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="text-center max-w-2xl mx-auto mb-16">
              <h2 className="text-3xl font-bold tracking-tight">Lo que dicen nuestros clientes</h2>
              <p className="mt-4 text-muted-foreground">
                La confianza de nuestros clientes es nuestra mayor carta de presentación.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
              {testimonials.map((item, index) => (
                <Card key={index} className="bg-card/50">
                  <CardContent className="pt-6">
                    <div className="flex gap-1 text-amber-500 mb-4">
                      {[...Array(5)].map((_, i) => (
                        <Star key={i} className="h-4 w-4 fill-amber-500" />
                      ))}
                    </div>
                    <p className="text-muted-foreground italic mb-6">"{item.quote}"</p>
                    <div>
                      <p className="font-semibold text-foreground text-sm">{item.author}</p>
                      <p className="text-xs text-muted-foreground">{item.role}</p>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* CONTACT FORM */}
        <section id="contacto" className="py-20 bg-muted/30 border-t border-border">
          <div className="container mx-auto max-w-3xl px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold tracking-tight">¿Listo para comenzar?</h2>
              <p className="mt-4 text-muted-foreground">
                Completa el formulario y uno de nuestros expertos se pondrá en contacto contigo en menos de 24 horas.
              </p>
            </div>

            <Card className="border-border shadow-xl">
              <CardContent className="p-8">
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <label className="text-sm font-medium">Nombre Completo</label>
                      <Input 
                        required 
                        placeholder="Juan Pérez" 
                        value={form.name} 
                        onChange={(e) => setForm({ ...form, name: e.target.value })} 
                      />
                    </div>
                    <div className="space-y-2">
                      <label className="text-sm font-medium">Correo Electrónico</label>
                      <Input 
                        type="email" 
                        required 
                        placeholder="juan@empresa.com" 
                        value={form.email} 
                        onChange={(e) => setForm({ ...form, email: e.target.value })} 
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <label className="text-sm font-medium">Teléfono / WhatsApp</label>
                    <Input 
                      type="tel" 
                      placeholder="+1 (809) 000-0000" 
                      value={form.phone} 
                      onChange={(e) => setForm({ ...form, phone: e.target.value })} 
                    />
                  </div>

                  <div className="space-y-2">
                    <label className="text-sm font-medium">¿Cómo podemos ayudarte?</label>
                    <Textarea 
                      rows={4} 
                      required 
                      placeholder="Cuéntanos sobre tu proyecto o requerimiento..." 
                      value={form.message} 
                      onChange={(e) => setForm({ ...form, message: e.target.value })} 
                    />
                  </div>

                  <Button type="submit" disabled={loading} className="w-full h-12 text-base font-semibold">
                    {loading ? 'Enviando información...' : 'Enviar Solicitud de Información'}
                  </Button>
                </form>
              </CardContent>
            </Card>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
