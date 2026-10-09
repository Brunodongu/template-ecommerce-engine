import type { Metadata } from 'next';
import './globals.css';
import { Toaster } from 'sonner';

export const metadata: Metadata = {
  title: {
    default: 'Sitio Oficial | Experiencia y Calidad',
    template: '%s | Sitio Oficial',
  },
  description: 'Soluciones profesionales adaptadas a las necesidades de tu empresa y negocio.',
  icons: {
    icon: '/favicon.ico',
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="es" className="scroll-smooth">
      <body className="min-h-screen bg-background text-foreground antialiased selection:bg-primary/20 selection:text-primary">
        {children}
        <Toaster position="top-right" richColors />
      </body>
    </html>
  );
}
