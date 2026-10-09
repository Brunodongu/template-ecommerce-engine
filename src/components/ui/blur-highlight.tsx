"use client";

import React, { useEffect, useState } from "react";

interface BlurHighlightProps {
  children: React.ReactNode;
  className?: string;
  delay?: number;
}

export function BlurHighlight({ children, className = "", delay = 100 }: BlurHighlightProps) {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setMounted(true), delay);
    return () => clearTimeout(timer);
  }, [delay]);

  return (
    <div
      className={`transition-all duration-1000 ease-out transform ${
        mounted
          ? "opacity-100 blur-0 translate-y-0 scale-100"
          : "opacity-0 blur-xl translate-y-4 scale-[0.99]"
      } ${className}`}
    >
      {children}
    </div>
  );
}

interface HighlightSpanProps {
  children: React.ReactNode;
  variant?: "accent" | "soft" | "white" | "ghost" | "blue" | "kashmir";
  theme?: "dark" | "light";
  delay?: number;
  className?: string;
}

export function HighlightSpan({
  children,
  variant = "soft",
  theme = "dark",
  delay = 400,
  className = ""
}: HighlightSpanProps) {
  const [highlighted, setHighlighted] = useState(false);
  const isLight = theme === "light";

  useEffect(() => {
    const timer = setTimeout(() => setHighlighted(true), delay);
    return () => clearTimeout(timer);
  }, [delay]);

  const darkVariants = {
    accent: "bg-[#7B2CBF] text-white border border-[#9D4EDD]/40 shadow-lg shadow-[#7B2CBF]/25 font-black",
    white: "bg-white text-[#1A0B2E] shadow-xl font-black",
    soft: "bg-white/10 backdrop-blur-md text-white border border-white/15 font-semibold",
    ghost: "bg-white/[0.06] text-white/90 border border-white/10 font-medium",
    blue: "bg-[#317EC2] text-white border border-[#4A9ADE]/40 shadow-lg shadow-[#317EC2]/25 font-medium",
    kashmir: "bg-gradient-to-r from-[#614385] to-[#516395] text-white border border-white/20 shadow-xl shadow-[#614385]/30 font-black",
  };

  const lightVariants = {
    accent: "bg-[#7B2CBF] text-white border border-[#9D4EDD]/40 shadow-md font-black",
    white: "bg-white text-slate-900 border border-slate-200 shadow-xl font-black",
    soft: "bg-slate-200/80 text-slate-900 border border-slate-300/80 font-semibold shadow-xs",
    ghost: "bg-slate-100 text-slate-800 border border-slate-200 font-medium",
    blue: "bg-[#2A82C4] text-white border border-[#2A82C4]/30 shadow-md shadow-[#2A82C4]/20 font-medium",
    kashmir: "bg-gradient-to-r from-[#614385] to-[#516395] text-white border border-[#614385]/30 shadow-xl shadow-[#614385]/20 font-black",
  };

  const variants = isLight ? lightVariants : darkVariants;
  const styleClass = variants[variant] || variants.soft;

  return (
    <span
      className={`inline-block px-3 py-1 my-0.5 rounded-2xl transition-all duration-700 ease-out transform ${
        highlighted
          ? `${styleClass} opacity-100 blur-0 scale-100`
          : `bg-transparent ${isLight ? "text-slate-600" : "text-white/80"} opacity-50 blur-sm scale-95`
      } ${className}`}
    >
      {children}
    </span>
  );
}
