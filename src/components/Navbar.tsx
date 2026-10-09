'use client';

import { useState } from 'react';
import Link from 'next/link';
import { Menu, X, ArrowRight } from 'lucide-react';
import { Button, buttonVariants } from './ui/button';

export function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 w-full border-b border-border/40 bg-background/80 backdrop-blur-md">
      <div className="container mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
        <Link href="/" className="flex items-center gap-2 font-bold text-xl tracking-tight">
          <span className="h-8 w-8 rounded-lg bg-primary flex items-center justify-center text-primary-foreground font-black">
            G
          </span>
          <span>BrandName</span>
        </Link>

        <nav className="hidden md:flex items-center gap-8 text-sm font-medium text-muted-foreground">
          <Link href="#servicios" className="transition-colors hover:text-foreground">
            Servicios
          </Link>
          <Link href="#nosotros" className="transition-colors hover:text-foreground">
            Nosotros
          </Link>
          <Link href="#testimonios" className="transition-colors hover:text-foreground">
            Testimonios
          </Link>
          <Link href="#contacto" className="transition-colors hover:text-foreground">
            Contacto
          </Link>
        </nav>

        <div className="hidden md:flex items-center gap-4">
          <Link href="#contacto" className={buttonVariants({ size: "sm", className: "gap-2" })}>
            Solicitar Cotización
            <ArrowRight className="h-4 w-4" />
          </Link>
        </div>

        <button
          onClick={() => setIsOpen(!isOpen)}
          className="md:hidden p-2 text-muted-foreground hover:text-foreground"
          aria-label="Abrir Menú"
        >
          {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
        </button>
      </div>

      {/* Menú Móvil */}
      {isOpen && (
        <div className="md:hidden border-b border-border bg-background px-4 py-6 space-y-4">
          <Link
            href="#servicios"
            onClick={() => setIsOpen(false)}
            className="block text-base font-medium text-foreground hover:text-primary"
          >
            Servicios
          </Link>
          <Link
            href="#nosotros"
            onClick={() => setIsOpen(false)}
            className="block text-base font-medium text-foreground hover:text-primary"
          >
            Nosotros
          </Link>
          <Link
            href="#testimonios"
            onClick={() => setIsOpen(false)}
            className="block text-base font-medium text-foreground hover:text-primary"
          >
            Testimonios
          </Link>
          <Link
            href="#contacto"
            onClick={() => setIsOpen(false)}
            className="block text-base font-medium text-foreground hover:text-primary"
          >
            Contacto
          </Link>
          <Link
            href="#contacto"
            onClick={() => setIsOpen(false)}
            className={buttonVariants({ className: "w-full text-center" })}
          >
            Solicitar Cotización
          </Link>
        </div>
      )}
    </header>
  );
}
