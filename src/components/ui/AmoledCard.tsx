import React from 'react';
import { cn } from '@/lib/utils';

interface AmoledCardProps {
  children: React.ReactNode;
  className?: string;
  variant?: 'default' | 'glow';
}

export const AmoledCard: React.FC<AmoledCardProps> = ({ children, className, variant = 'default' }) => {
  return (
    <div
      className={cn(
        'relative overflow-hidden rounded-xl p-6 transition-all duration-500 group',
        // Glass morphism base
        'bg-gradient-to-br from-white/90 via-white/70 to-white/50 backdrop-blur-xl',
        // Metallic border effect
        'border border-transparent',
        'before:absolute before:inset-0 before:rounded-xl before:p-[1px]',
        'before:bg-gradient-to-br before:from-slate-300 before:via-slate-200 before:to-slate-300',
        'before:-z-10 before:transition-all before:duration-500',
        // Premium shadow with depth
        'shadow-[0_8px_32px_rgba(0,191,255,0.12),0_2px_8px_rgba(100,149,237,0.08)]',
        // Hover effects for interactivity
        'hover:shadow-[0_12px_48px_rgba(0,191,255,0.18),0_4px_16px_rgba(100,149,237,0.12)]',
        'hover:before:from-cyan-200 hover:before:via-purple-200 hover:before:to-blue-200',
        'hover:-translate-y-1',
        // Glow variant
        variant === 'glow' && 'quantum-pulse',
        className
      )}
      style={{
        background: 'linear-gradient(135deg, rgba(255,255,255,0.9) 0%, rgba(255,255,255,0.7) 50%, rgba(255,255,255,0.85) 100%)',
      }}
    >
      {/* Inner glow effect */}
      <div className="absolute inset-0 rounded-xl bg-gradient-to-br from-cyan-500/5 via-transparent to-purple-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />
      
      {/* Content */}
      <div className="relative z-10">
        {children}
      </div>
    </div>
  );
};
