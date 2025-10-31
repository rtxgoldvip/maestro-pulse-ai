import React from 'react';
import { cn } from '@/lib/utils';

interface AmoledCardProps {
  children: React.ReactNode;
  className?: string;
  animate?: boolean;
}

export const AmoledCard: React.FC<AmoledCardProps> = ({ children, className, animate = true }) => {
  return (
    <div
      className={cn(
        'relative rounded-xl overflow-hidden backdrop-blur-sm',
        'bg-gradient-to-br from-card/60 to-card/40',
        'border border-metallic-light/30',
        'shadow-[0_20px_60px_-10px_rgba(0,0,0,0.15),0_10px_30px_-10px_rgba(0,0,0,0.1)]',
        'transition-all duration-300',
        'before:absolute before:inset-0 before:rounded-xl before:p-[1px]',
        'before:bg-gradient-to-br before:from-metallic-light before:via-metallic-dark before:to-metallic-light',
        'before:-z-10',
        'hover:shadow-[0_25px_70px_-10px_rgba(0,0,0,0.2),0_15px_40px_-10px_rgba(0,0,0,0.15)]',
        animate && 'animate-fade-in',
        className
      )}
    >
      <div className="relative z-10 p-6">
        {children}
      </div>
    </div>
  );
};
