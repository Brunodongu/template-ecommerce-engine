import React from 'react';

export function SpeedingText({ children, className = '' }: { children?: React.ReactNode; className?: string }) {
  return (
    <span className={`inline-block transition-transform duration-300 hover:scale-105 ${className}`}>
      {children}
    </span>
  );
}

