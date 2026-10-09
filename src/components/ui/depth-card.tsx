import React from 'react';

export function DepthCard({ children, className = '' }: { children?: React.ReactNode; className?: string }) {
  return (
    <div className={`transition-all duration-500 hover:-translate-y-2 hover:shadow-2xl hover:shadow-white/10 ${className}`}>
      {children}
    </div>
  );
}

