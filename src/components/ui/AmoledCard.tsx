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
        'relative overflow-hidden rounded-2xl p-6 transition-all duration-500 group card-3d',
        // Premium glass morphism for dark theme
        'glass-effect',
        // Neon border with glow
        'border-2 border-transparent',
        'before:absolute before:inset-0 before:rounded-2xl before:p-[2px]',
        'before:bg-gradient-to-br before:from-cyan-500/50 before:via-purple-500/50 before:to-blue-500/50',
        'before:-z-10 before:transition-all before:duration-500',
        // Premium shadow with neon glow
        'shadow-amoled',
        // Hover effects - 3D and glow
        'hover:shadow-float hover:scale-[1.02]',
        'hover:before:from-cyan-400 hover:before:via-purple-400 hover:before:to-blue-400',
        'hover:border-cyan-500/50',
        // Glow variant with pulse animation
        variant === 'glow' && 'quantum-pulse shadow-glow',
        className
      )}
    >
      {/* Animated gradient overlay */}
      <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-cyan-500/10 via-purple-500/5 to-blue-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />
      
      {/* Inner glow effect */}
      <div className="absolute inset-0 rounded-2xl opacity-50 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none">
        <div className="absolute top-0 left-1/4 w-32 h-32 bg-cyan-500/20 rounded-full blur-3xl" />
        <div className="absolute bottom-0 right-1/4 w-32 h-32 bg-purple-500/20 rounded-full blur-3xl" />
      </div>
      
      {/* Content */}
      <div className="relative z-10">
        {children}
      </div>
    </div>
  );
};
