import React, { useState } from 'react';
import { BarChart3, DollarSign, MessageSquare, Calendar, Database, Mic } from 'lucide-react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { VoiceIndicator } from '@/components/ui/VoiceIndicator';
import { QuantumGlobe } from '@/components/ui/QuantumGlobe';
import { useVoiceRecognition } from '@/hooks/useVoiceRecognition';
import { VisaoGeral } from '@/pages/VisaoGeral';
import { Financeiro } from '@/pages/Financeiro';
import { AnalisesLivres } from '@/pages/AnalisesLivres';
import { AgendaQuantica } from '@/pages/AgendaQuantica';
import { InsercaoDados } from '@/pages/InsercaoDados';

export const MaestroLayout: React.FC = () => {
  const [activeTab, setActiveTab] = useState('visao-geral');
  const { voiceStatus } = useVoiceRecognition();

  return (
    <div className="min-h-screen relative overflow-hidden">
      {/* Animated background with gradient */}
      <div className="fixed inset-0 bg-gradient-to-br from-[hsl(222,47%,8%)] via-[hsl(222,47%,10%)] to-[hsl(270,47%,12%)] -z-10" />
      
      {/* Floating orbs in background */}
      <div className="fixed inset-0 -z-10 overflow-hidden pointer-events-none">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-cyan-500/10 rounded-full blur-3xl animate-float" />
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-purple-500/10 rounded-full blur-3xl animate-float" style={{ animationDelay: '1s' }} />
        <div className="absolute top-1/2 right-1/3 w-64 h-64 bg-blue-500/10 rounded-full blur-3xl animate-float" style={{ animationDelay: '2s' }} />
      </div>

      <VoiceIndicator status={voiceStatus} />

      {/* PREMIUM Header - Ultra Holographic & Futuristic */}
      <header className="sticky top-0 z-50 backdrop-blur-2xl border-b-2"
              style={{
                background: 'linear-gradient(135deg, rgba(0,20,40,0.95) 0%, rgba(20,0,40,0.95) 100%)',
                borderImage: 'linear-gradient(90deg, rgba(0,255,255,0.5), rgba(255,0,255,0.5), rgba(0,255,255,0.5)) 1',
                boxShadow: '0 10px 40px rgba(0,255,255,0.3), 0 0 80px rgba(255,0,255,0.2)'
              }}>
        <div className="container mx-auto px-4 sm:px-6 py-3 sm:py-5">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3 sm:gap-5">
              {/* Quantum Globe - Larger and more prominent */}
              <div className="w-16 h-16 sm:w-20 sm:h-20 relative">
                <div className="absolute inset-0 rounded-full blur-xl"
                     style={{
                       background: 'radial-gradient(circle, rgba(0,255,255,0.6) 0%, transparent 70%)',
                       animation: 'pulse-intense 2s ease-in-out infinite'
                     }} />
                <QuantumGlobe isActive={true} />
              </div>
              <div>
                <h1 className="text-2xl sm:text-5xl font-black neon-glow"
                    style={{
                      background: 'linear-gradient(135deg, #00FFFF 0%, #FF00FF 50%, #00FFFF 100%)',
                      backgroundSize: '200% 200%',
                      animation: 'gradient-shift 3s ease infinite',
                      WebkitBackgroundClip: 'text',
                      WebkitTextFillColor: 'transparent',
                      textShadow: '0 0 30px rgba(0,255,255,0.8), 0 0 60px rgba(255,0,255,0.6)'
                    }}>
                  ⚡ MAESTRO FAROL
                </h1>
                <p className="text-xs sm:text-sm mt-1 font-bold"
                   style={{
                     background: 'linear-gradient(90deg, rgba(0,255,255,0.8) 0%, rgba(255,0,255,0.8) 100%)',
                     WebkitBackgroundClip: 'text',
                     WebkitTextFillColor: 'transparent'
                   }}>
                  🌌 Sistema Quântico de Inteligência • IA Preditiva • Ressonância de Dados
                </p>
              </div>
            </div>
            <div className="flex items-center gap-2 sm:gap-4">
              {/* Voice Status Indicator - PROMINENT */}
              <div className="flex items-center gap-2 px-3 sm:px-5 py-2 sm:py-3 rounded-2xl pulse-intense"
                   style={{
                     background: 'linear-gradient(135deg, rgba(0,255,255,0.2) 0%, rgba(255,0,255,0.2) 100%)',
                     border: '2px solid rgba(0,255,255,0.6)',
                     boxShadow: '0 0 30px rgba(0,255,255,0.6), inset 0 0 20px rgba(0,255,255,0.2)'
                   }}>
                <Mic className="w-5 h-5 sm:w-6 sm:h-6 text-cyan-400 pulse-intense" />
                <div className="hidden sm:block">
                  <div className="text-xs font-bold text-cyan-400">🎤 VOZ ATIVA</div>
                  <div className="text-xs text-cyan-300">Use comandos</div>
                </div>
              </div>
              {/* Online indicator */}
              <div className="hidden sm:flex items-center gap-2 px-4 py-3 rounded-2xl"
                   style={{
                     background: 'linear-gradient(135deg, rgba(0,255,0,0.1) 0%, rgba(0,255,255,0.1) 100%)',
                     border: '2px solid rgba(0,255,0,0.5)',
                     boxShadow: '0 0 20px rgba(0,255,0,0.5)'
                   }}>
                <div className="w-3 h-3 rounded-full pulse-intense"
                     style={{
                       background: 'radial-gradient(circle, #00FF00 0%, #00FFFF 100%)',
                       boxShadow: '0 0 15px rgba(0,255,0,0.8)'
                     }} />
                <span className="text-sm font-bold text-green-400">SISTEMA ONLINE</span>
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-4 sm:px-6 py-6 sm:py-8">
        <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
          {/* Ultra Modern Scrollable Tabs */}
          <div className="relative">
            <div className="overflow-x-auto scrollbar-hide pb-2">
              <TabsList className="inline-flex w-max min-w-full sm:grid sm:grid-cols-5 gap-3 p-3 rounded-3xl backdrop-blur-2xl border-2"
                        style={{
                          background: 'linear-gradient(135deg, rgba(0,255,255,0.1) 0%, rgba(255,0,255,0.1) 100%)',
                          borderColor: 'rgba(0,255,255,0.3)',
                          boxShadow: '0 10px 40px rgba(0,255,255,0.3), inset 0 0 30px rgba(0,255,255,0.1)'
                        }}>
                <TabsTrigger
                  value="visao-geral"
                  className="flex-shrink-0 px-6 py-4 rounded-2xl font-bold transition-all duration-500 data-[state=active]:scale-105"
                  style={{
                    background: activeTab === 'visao-geral' 
                      ? 'linear-gradient(135deg, rgba(0,255,255,0.4) 0%, rgba(255,0,255,0.4) 100%)'
                      : 'transparent',
                    border: activeTab === 'visao-geral' ? '2px solid rgba(0,255,255,0.8)' : '2px solid transparent',
                    boxShadow: activeTab === 'visao-geral' 
                      ? '0 0 40px rgba(0,255,255,0.8), inset 0 0 20px rgba(0,255,255,0.3)'
                      : 'none'
                  }}
                >
                  <BarChart3 className="w-5 h-5 mr-2" />
                  <span className="whitespace-nowrap">📊 Dashboard</span>
                </TabsTrigger>
                <TabsTrigger
                  value="financeiro"
                  className="flex-shrink-0 px-6 py-4 rounded-2xl font-bold transition-all duration-500 data-[state=active]:scale-105"
                  style={{
                    background: activeTab === 'financeiro' 
                      ? 'linear-gradient(135deg, rgba(0,255,0,0.4) 0%, rgba(0,255,255,0.4) 100%)'
                      : 'transparent',
                    border: activeTab === 'financeiro' ? '2px solid rgba(0,255,0,0.8)' : '2px solid transparent',
                    boxShadow: activeTab === 'financeiro' 
                      ? '0 0 40px rgba(0,255,0,0.8), inset 0 0 20px rgba(0,255,0,0.3)'
                      : 'none'
                  }}
                >
                  <DollarSign className="w-5 h-5 mr-2" />
                  <span className="whitespace-nowrap">💰 Financeiro</span>
                </TabsTrigger>
                <TabsTrigger
                  value="analises"
                  className="flex-shrink-0 px-6 py-4 rounded-2xl font-bold transition-all duration-500 data-[state=active]:scale-105"
                  style={{
                    background: activeTab === 'analises' 
                      ? 'linear-gradient(135deg, rgba(255,0,255,0.4) 0%, rgba(128,0,255,0.4) 100%)'
                      : 'transparent',
                    border: activeTab === 'analises' ? '2px solid rgba(255,0,255,0.8)' : '2px solid transparent',
                    boxShadow: activeTab === 'analises' 
                      ? '0 0 40px rgba(255,0,255,0.8), inset 0 0 20px rgba(255,0,255,0.3)'
                      : 'none'
                  }}
                >
                  <MessageSquare className="w-5 h-5 mr-2" />
                  <span className="whitespace-nowrap">🤖 IA Chat</span>
                </TabsTrigger>
                <TabsTrigger
                  value="agenda"
                  className="flex-shrink-0 px-6 py-4 rounded-2xl font-bold transition-all duration-500 data-[state=active]:scale-105"
                  style={{
                    background: activeTab === 'agenda' 
                      ? 'linear-gradient(135deg, rgba(255,255,0,0.4) 0%, rgba(255,128,0,0.4) 100%)'
                      : 'transparent',
                    border: activeTab === 'agenda' ? '2px solid rgba(255,255,0,0.8)' : '2px solid transparent',
                    boxShadow: activeTab === 'agenda' 
                      ? '0 0 40px rgba(255,255,0,0.8), inset 0 0 20px rgba(255,255,0,0.3)'
                      : 'none'
                  }}
                >
                  <Calendar className="w-5 h-5 mr-2" />
                  <span className="whitespace-nowrap">📅 Agenda</span>
                </TabsTrigger>
                <TabsTrigger
                  value="insercao"
                  className="flex-shrink-0 px-6 py-4 rounded-2xl font-bold transition-all duration-500 data-[state=active]:scale-105"
                  style={{
                    background: activeTab === 'insercao' 
                      ? 'linear-gradient(135deg, rgba(255,0,128,0.4) 0%, rgba(255,0,255,0.4) 100%)'
                      : 'transparent',
                    border: activeTab === 'insercao' ? '2px solid rgba(255,0,128,0.8)' : '2px solid transparent',
                    boxShadow: activeTab === 'insercao' 
                      ? '0 0 40px rgba(255,0,128,0.8), inset 0 0 20px rgba(255,0,128,0.3)'
                      : 'none'
                  }}
                >
                  <Database className="w-5 h-5 mr-2" />
                  <span className="whitespace-nowrap">💾 Dados</span>
                </TabsTrigger>
              </TabsList>
            </div>
          </div>

          <TabsContent value="visao-geral">
            <VisaoGeral />
          </TabsContent>

          <TabsContent value="financeiro">
            <Financeiro />
          </TabsContent>

          <TabsContent value="analises">
            <AnalisesLivres />
          </TabsContent>

          <TabsContent value="agenda">
            <AgendaQuantica />
          </TabsContent>

          <TabsContent value="insercao">
            <InsercaoDados />
          </TabsContent>
        </Tabs>
      </main>
    </div>
  );
};
