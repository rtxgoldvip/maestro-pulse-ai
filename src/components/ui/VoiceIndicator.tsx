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
    <div className="fixed top-4 right-4 z-50 animate-fade-in">
      {status === 'listening' && (
        <div className="flex items-center gap-4 px-6 py-4 rounded-2xl backdrop-blur-2xl border-3 quantum-pulse"
             style={{
               background: 'linear-gradient(135deg, rgba(0,255,255,0.2) 0%, rgba(255,0,255,0.2) 100%)',
               borderColor: 'rgba(0,255,255,0.8)',
               boxShadow: '0 0 40px rgba(0,255,255,0.8), 0 0 80px rgba(0,255,255,0.5), inset 0 0 30px rgba(0,255,255,0.3)'
             }}>
          <div className="relative">
            <Mic className="w-7 h-7 text-cyan-400 animate-pulse" />
            <div className="absolute inset-0 rounded-full bg-cyan-400/50 animate-ping" />
            <div className="absolute -inset-2 rounded-full bg-cyan-400/30 animate-ping animation-delay-150" />
            <div className="absolute -inset-4 rounded-full bg-cyan-400/20 animate-ping animation-delay-300" />
          </div>
          <div>
            <span className="text-base font-bold text-white neon-glow block">🎤 OUVINDO</span>
            <span className="text-xs text-cyan-300">Fale agora...</span>
          </div>
        </div>
      )}
      
      {status === 'processing' && (
        <div className="flex items-center gap-4 px-6 py-4 rounded-2xl backdrop-blur-2xl border-3"
             style={{
               background: 'linear-gradient(135deg, rgba(255,0,255,0.2) 0%, rgba(0,255,255,0.2) 100%)',
               borderColor: 'rgba(255,0,255,0.8)',
               boxShadow: '0 0 40px rgba(255,0,255,0.8), 0 0 80px rgba(255,0,255,0.5)'
             }}>
          <div className="w-7 h-7 border-3 border-purple-400 border-t-transparent rounded-full animate-spin" 
               style={{ boxShadow: '0 0 20px rgba(255,0,255,0.8)' }} />
          <div>
            <span className="text-base font-bold text-white neon-glow block">⚡ PROCESSANDO</span>
            <span className="text-xs text-purple-300">Analisando...</span>
          </div>
        </div>
      )}
    </div>
  );
};
