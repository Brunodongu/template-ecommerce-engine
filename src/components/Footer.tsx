import Link from 'next/link';

export function Footer() {
  return (
    <footer className="border-t border-border bg-muted/30 py-12">
      <div className="container mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="space-y-4 md:col-span-2">
            <span className="font-bold text-xl tracking-tight">BrandName</span>
            <p className="text-sm text-muted-foreground max-w-sm">
              Brindamos soluciones integrales y servicios de alta calidad adaptados al crecimiento de tu negocio.
            </p>
          </div>
          <div>
            <h4 className="font-semibold text-sm mb-4">Enlaces Rápidos</h4>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li><Link href="#servicios" className="hover:text-foreground">Servicios</Link></li>
              <li><Link href="#nosotros" className="hover:text-foreground">Sobre Nosotros</Link></li>
              <li><Link href="#testimonios" className="hover:text-foreground">Testimonios</Link></li>
              <li><Link href="#contacto" className="hover:text-foreground">Contacto</Link></li>
            </ul>
          </div>
          <div>
            <h4 className="font-semibold text-sm mb-4">Contacto</h4>
            <p className="text-sm text-muted-foreground">Santo Domingo, República Dominicana</p>
            <p className="text-sm text-muted-foreground mt-2">info@cliente.com</p>
            <p className="text-sm text-muted-foreground">+1 (809) 000-0000</p>
          </div>
        </div>
        <div className="mt-12 border-t border-border/60 pt-6 text-center text-xs text-muted-foreground">
          © {new Date().getFullYear()} BrandName. Todos los derechos reservados. Desarrollado con tecnología de vanguardia.
        </div>
      </div>
    </footer>
  );
}
