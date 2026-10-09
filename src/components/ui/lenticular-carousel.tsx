"use client";

import React, { useState } from 'react';
import { ExternalLink, Sparkles, ArrowRight } from 'lucide-react';

export function LenticularCarousel() {
  const [activeIdx, setActiveIdx] = useState(1);

  const projects = [
    {
      id: 1,
      title: "UNICEF Rep. Dominicana",
      category: "Estrategia & Performance",
      impact: "+240% Conversiones",
      color: "from-blue-600/30 via-indigo-600/20 to-purple-600/30",
      border: "border-blue-500/40",
      badge: "bg-blue-500/20 text-blue-300 border-blue-400/30",
      desc: "Optimización de portales digitales y captación para iniciativas comunitarias."
    },
    {
      id: 2,
      title: "Santo Domingo Motors",
      category: "Desarrollo Web & Lead Gen",
      impact: "+42 Leads / mes",
      color: "from-[#5C55D7]/40 via-purple-600/30 to-[#337DC2]/40",
      border: "border-[#5C55D7]",
      badge: "bg-[#5C55D7]/20 text-purple-200 border-[#5C55D7]/40",
      desc: "Rediseño completo de plataforma digital con embudos de venta directos."
    },
    {
      id: 3,
      title: "Turismo de Salud RD",
      category: "SEO Local & GEO IA",
      impact: "+315% Tráfico Orgánico",
      color: "from-emerald-600/30 via-teal-600/20 to-blue-600/30",
      border: "border-emerald-500/40",
      badge: "bg-emerald-500/20 text-emerald-300 border-emerald-400/30",
      desc: "Posicionamiento de marca en motores generativos de IA y búsquedas internacionales."
    }
  ];

  return (
    <div className="w-full h-full min-h-[480px] rounded-[3rem] border border-[#E0E5F0]/15 bg-gradient-to-b from-[#0e0f17] to-[#070709] p-6 md:p-12 flex flex-col justify-between relative overflow-hidden shadow-2xl">
      {/* Background ambient lighting */}
      <div className="absolute top-0 right-1/4 w-96 h-96 bg-[#5C55D7]/20 rounded-full blur-[120px] pointer-events-none"></div>
      <div className="absolute bottom-0 left-1/4 w-96 h-96 bg-[#337DC2]/20 rounded-full blur-[120px] pointer-events-none"></div>

      {/* Header */}
      <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
        <div>
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#5C55D7]/15 border border-[#5C55D7]/30 text-xs font-semibold uppercase tracking-widest text-[#E0E5F0] mb-3">
            <span className="w-2 h-2 rounded-full bg-[#337DC2] animate-pulse" />
            <span>Portafolio Interactivo</span>
          </div>
          <h3 className="text-3xl md:text-4xl font-black text-white tracking-tight">Proyectos Destacados</h3>
        </div>
        <div className="flex gap-2">
          {projects.map((p, idx) => (
            <button
              key={p.id}
              onClick={() => setActiveIdx(idx)}
              className={`w-3 h-3 rounded-full transition-all ${activeIdx === idx ? 'bg-[#337DC2] w-8' : 'bg-white/20 hover:bg-white/40'}`}
            />
          ))}
        </div>
      </div>

      {/* Interactive lenticular cards showcase */}
      <div className="relative z-10 grid grid-cols-1 md:grid-cols-3 gap-6 my-auto">
        {projects.map((project, idx) => {
          const isActive = idx === activeIdx;
          return (
            <div
              key={project.id}
              onClick={() => setActiveIdx(idx)}
              className={`cursor-pointer rounded-3xl p-8 border backdrop-blur-xl transition-all duration-500 flex flex-col justify-between relative overflow-hidden group ${
                isActive 
                  ? `${project.border} bg-gradient-to-br ${project.color} scale-105 shadow-2xl shadow-[#5C55D7]/20` 
                  : 'border-white/10 bg-white/[0.03] hover:border-white/25 hover:bg-white/[0.06]'
              }`}
            >
              <div>
                <div className="flex items-center justify-between mb-6">
                  <span className={`text-[11px] font-bold uppercase tracking-widest px-3 py-1 rounded-full border ${project.badge}`}>
                    {project.category}
                  </span>
                  <ExternalLink className="w-4 h-4 text-white/40 group-hover:text-white transition-colors" />
                </div>
                <h4 className="text-2xl font-extrabold text-white mb-3 tracking-tight">{project.title}</h4>
                <p className="text-sm text-[#E0E5F0]/70 leading-relaxed mb-6">{project.desc}</p>
              </div>

              <div className="pt-4 border-t border-white/10 flex items-center justify-between">
                <span className="text-base font-black text-white">{project.impact}</span>
                <div className="w-8 h-8 rounded-full bg-white/10 flex items-center justify-center group-hover:bg-white group-hover:text-black transition-colors">
                  <ArrowRight className="w-4 h-4" />
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
