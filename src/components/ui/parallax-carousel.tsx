"use client";

import React from 'react';
import { Star, Quote } from 'lucide-react';

interface ParallaxCarouselProps {
  theme?: "dark" | "light";
}

export function ParallaxCarousel({ theme = "dark" }: ParallaxCarouselProps) {
  const isLight = theme === "light";

  const testimonials = [
    {
      quote: "Desde que Gmedia tomó nuestra cuenta, pasamos de recibir likes a recibir solicitudes de cotización reales todos los días.",
      author: "Director Comercial",
      company: "Santo Domingo Motors",
      darkGradient: "from-[#5C55D7]/20 via-[#337DC2]/15 to-transparent bg-[#0a0b12]",
      lightGradient: "from-blue-50/70 via-indigo-50/40 to-white bg-white",
      avatarBg: "bg-gradient-to-tr from-[#5C55D7] to-[#337DC2]",
      initials: "SD"
    },
    {
      quote: "El rediseño de la web y la estrategia SEO nos posicionó como líderes en búsquedas para turismo de salud en menos de 4 meses.",
      author: "Gerente de Comunicaciones",
      company: "UNICEF República Dominicana",
      darkGradient: "from-blue-600/20 via-cyan-600/15 to-transparent bg-[#0a0b12]",
      lightGradient: "from-cyan-50/70 via-sky-50/40 to-white bg-white",
      avatarBg: "bg-gradient-to-tr from-blue-500 to-cyan-400",
      initials: "UN"
    },
    {
      quote: "Son la única agencia que nos ha entregado un reporte claro donde se entiende exactamente cuánto dinero cuesta cada cliente.",
      author: "CEO & Fundador",
      company: "Unilever Región Caribe",
      darkGradient: "from-purple-600/20 via-pink-600/15 to-transparent bg-[#0a0b12]",
      lightGradient: "from-purple-50/70 via-indigo-50/40 to-white bg-white",
      avatarBg: "bg-gradient-to-tr from-purple-500 to-pink-500",
      initials: "UL"
    }
  ];

  return (
    <div className="w-full flex items-center justify-center px-4">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 w-full max-w-[1300px]">
        {testimonials.map((item, idx) => (
          <div 
            key={idx} 
            className={`p-8 md:p-10 rounded-[2.5rem] border backdrop-blur-xl flex flex-col justify-between hover:-translate-y-2 transition-all duration-500 shadow-xl group ${
              isLight
                ? `border-slate-200/90 ${item.lightGradient} hover:border-[#2A82C4]/40 hover:shadow-2xl`
                : `border-[#E0E5F0]/15 ${item.darkGradient} hover:border-[#5C55D7]/50`
            }`}
          >
            <div>
              <div className="flex items-center justify-between mb-6">
                <div className="flex gap-1 text-amber-400">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="w-4 h-4 fill-amber-400 text-amber-400" />
                  ))}
                </div>
                <Quote className={`w-8 h-8 transition-colors ${
                  isLight ? "text-slate-200 group-hover:text-[#2A82C4]/40" : "text-white/10 group-hover:text-[#5C55D7]/50"
                }`} />
              </div>
              <p className={`italic text-lg leading-relaxed mb-8 ${
                isLight ? "text-slate-700" : "text-[#E0E5F0]"
              }`}>
                &quot;{item.quote}&quot;
              </p>
            </div>

            <div className={`flex items-center gap-4 pt-6 border-t ${
              isLight ? "border-slate-200" : "border-white/10"
            }`}>
              <div className={`w-12 h-12 rounded-2xl ${item.avatarBg} flex items-center justify-center font-black text-white text-sm shadow-md`}>
                {item.initials}
              </div>
              <div>
                <p className={`text-base font-bold tracking-tight ${
                  isLight ? "text-slate-900" : "text-white"
                }`}>
                  {item.author}
                </p>
                <p className={`text-xs font-medium ${
                  isLight ? "text-slate-500" : "text-[#E0E5F0]/60"
                }`}>
                  {item.company}
                </p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}