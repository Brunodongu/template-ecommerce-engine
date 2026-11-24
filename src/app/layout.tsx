import type { Metadata } from 'next';
import { Rubik } from 'next/font/google';
import './globals.css';
import { Toaster } from 'sonner';

const rubik = Rubik({
  subsets: ['latin'],
  weight: ['300', '400', '500', '600', '700', '800', '900'],
  variable: '--font-rubik',
  display: 'swap',
});

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
      <body className={`${rubik.className} ${rubik.variable} min-h-screen bg-background text-foreground antialiased selection:bg-[#2C80C6] selection:text-white`} style={{ letterSpacing: "-0.015em" }}>
        {children}
        <Toaster position="top-right" richColors />
      </body>
    </html>
  );
}
