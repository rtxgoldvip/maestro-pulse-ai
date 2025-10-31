import React, { useState } from 'react';
import { BarChart3, DollarSign, MessageSquare, Calendar, Database } from 'lucide-react';
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

      {/* Premium Header - Holographic & Futuristic */}
      <header className="sticky top-0 z-50 border-b border-cyan-500/20 backdrop-blur-2xl glass-effect shadow-glow">
        <div className="container mx-auto px-4 sm:px-6 py-4 sm:py-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              {/* Quantum Globe - Always visible but smaller */}
              <div className="hidden sm:block w-12 h-12">
                <QuantumGlobe isActive={true} />
              </div>
              <div>
                <h1 className="text-2xl sm:text-4xl font-bold gradient-text-animated neon-glow">
                  Maestro Farol
                </h1>
                <p className="text-xs sm:text-sm text-muted-foreground mt-1 font-medium">Sistema de Ressonância Quântica de Inteligência de Negócio</p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <div className="hidden sm:flex items-center gap-2 px-4 py-2 rounded-full glass-effect border border-cyan-500/30 quantum-pulse">
                <div className="w-2 h-2 rounded-full bg-gradient-to-r from-cyan-400 to-cyan-600 animate-pulse shadow-glow" />
                <span className="text-xs font-semibold text-cyan-400">Online</span>
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-4 sm:px-6 py-6 sm:py-8">
        <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
          {/* Scrollable tabs for mobile */}
          <div className="relative">
            <div className="overflow-x-auto scrollbar-hide pb-2">
              <TabsList className="inline-flex w-max min-w-full sm:grid sm:grid-cols-5 gap-2 glass-effect p-2 rounded-2xl border border-cyan-500/30 shadow-glow">
                <TabsTrigger
                  value="visao-geral"
                  className="flex-shrink-0 data-[state=active]:holographic data-[state=active]:text-white data-[state=active]:shadow-glow data-[state=active]:neon-border transition-all duration-300"
                >
                  <BarChart3 className="w-4 h-4 mr-2" />
                  <span className="whitespace-nowrap font-semibold">Visão Geral</span>
                </TabsTrigger>
                <TabsTrigger
                  value="financeiro"
                  className="flex-shrink-0 data-[state=active]:holographic data-[state=active]:text-white data-[state=active]:shadow-glow data-[state=active]:neon-border transition-all duration-300"
                >
                  <DollarSign className="w-4 h-4 mr-2" />
                  <span className="whitespace-nowrap font-semibold">Financeiro</span>
                </TabsTrigger>
                <TabsTrigger
                  value="analises"
                  className="flex-shrink-0 data-[state=active]:holographic data-[state=active]:text-white data-[state=active]:shadow-glow data-[state=active]:neon-border transition-all duration-300"
                >
                  <MessageSquare className="w-4 h-4 mr-2" />
                  <span className="whitespace-nowrap font-semibold">Análises Livres</span>
                </TabsTrigger>
                <TabsTrigger
                  value="agenda"
                  className="flex-shrink-0 data-[state=active]:holographic data-[state=active]:text-white data-[state=active]:shadow-glow data-[state=active]:neon-border transition-all duration-300"
                >
                  <Calendar className="w-4 h-4 mr-2" />
                  <span className="whitespace-nowrap font-semibold">Agenda Quântica</span>
                </TabsTrigger>
                <TabsTrigger
                  value="insercao"
                  className="flex-shrink-0 data-[state=active]:holographic data-[state=active]:text-white data-[state=active]:shadow-glow data-[state=active]:neon-border transition-all duration-300"
                >
                  <Database className="w-4 h-4 mr-2" />
                  <span className="whitespace-nowrap font-semibold">Inserção</span>
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
