import React from 'react';
import { Mic } from 'lucide-react';
import { VoiceStatus } from '@/types';
import { cn } from '@/lib/utils';

interface VoiceIndicatorProps {
  status: VoiceStatus;
}

export const VoiceIndicator: React.FC<VoiceIndicatorProps> = ({ status }) => {
  if (status === 'idle') return null;

  return (
    <div className="fixed top-4 right-4 z-50 flex items-center gap-3 px-4 py-3 rounded-full bg-gradient-to-r from-primary/20 to-accent/20 backdrop-blur-md border border-primary/30 shadow-lg">
      {status === 'listening' && (
        <>
          <div className="relative">
            <Mic className="w-5 h-5 text-primary animate-pulse" />
            <div className="absolute inset-0 rounded-full bg-primary/30 animate-ping" />
          </div>
          <span className="text-sm font-medium text-primary">Ouvindo...</span>
        </>
      )}
      
      {status === 'processing' && (
        <>
          <div className="w-5 h-5 border-2 border-primary border-t-transparent rounded-full animate-spin" />
          <span className="text-sm font-medium text-primary">Processando...</span>
        </>
      )}
    </div>
  );
};
