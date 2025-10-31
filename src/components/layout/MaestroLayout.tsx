import React, { useState } from 'react';
import { BarChart3, DollarSign, MessageSquare, Calendar, Database } from 'lucide-react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { VoiceIndicator } from '@/components/ui/VoiceIndicator';
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
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-cyan-50/30 to-purple-50/20">
      <VoiceIndicator status={voiceStatus} />

      {/* Premium Header with holographic effect */}
      <header className="sticky top-0 z-50 border-b border-cyan-200/30 backdrop-blur-2xl bg-gradient-to-r from-white/80 via-cyan-50/50 to-purple-50/30 shadow-[0_4px_24px_rgba(0,191,255,0.08)]">
        <div className="container mx-auto px-4 sm:px-6 py-4 sm:py-6">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl sm:text-4xl font-bold bg-gradient-to-r from-cyan-500 via-purple-500 to-blue-500 bg-clip-text text-transparent animate-gradient">
                Maestro Farol
              </h1>
              <p className="text-xs sm:text-sm text-slate-600 mt-1">Sistema de Ressonância Quântica de Inteligência de Negócio</p>
            </div>
            <div className="hidden sm:flex items-center gap-2 px-4 py-2 rounded-full bg-gradient-to-r from-cyan-500/10 to-purple-500/10 border border-cyan-300/30">
              <div className="w-2 h-2 rounded-full bg-gradient-to-r from-cyan-400 to-cyan-600 animate-pulse" />
              <span className="text-xs font-medium text-cyan-700">Online</span>
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
              <TabsList className="inline-flex w-max min-w-full sm:grid sm:grid-cols-5 gap-2 bg-white/60 backdrop-blur-xl p-2 rounded-2xl border border-cyan-200/40 shadow-[0_8px_32px_rgba(0,191,255,0.08)]">
                <TabsTrigger
                  value="visao-geral"
                  className="flex-shrink-0 data-[state=active]:bg-gradient-to-r data-[state=active]:from-cyan-500 data-[state=active]:to-cyan-600 data-[state=active]:text-white data-[state=active]:shadow-lg transition-all duration-300"
                >
                  <BarChart3 className="w-4 h-4 mr-2" />
                  <span className="whitespace-nowrap">Visão Geral</span>
                </TabsTrigger>
                <TabsTrigger
                  value="financeiro"
                  className="flex-shrink-0 data-[state=active]:bg-gradient-to-r data-[state=active]:from-cyan-500 data-[state=active]:to-cyan-600 data-[state=active]:text-white data-[state=active]:shadow-lg transition-all duration-300"
                >
                  <DollarSign className="w-4 h-4 mr-2" />
                  <span className="whitespace-nowrap">Financeiro</span>
                </TabsTrigger>
                <TabsTrigger
                  value="analises"
                  className="flex-shrink-0 data-[state=active]:bg-gradient-to-r data-[state=active]:from-cyan-500 data-[state=active]:to-cyan-600 data-[state=active]:text-white data-[state=active]:shadow-lg transition-all duration-300"
                >
                  <MessageSquare className="w-4 h-4 mr-2" />
                  <span className="whitespace-nowrap">Análises Livres</span>
                </TabsTrigger>
                <TabsTrigger
                  value="agenda"
                  className="flex-shrink-0 data-[state=active]:bg-gradient-to-r data-[state=active]:from-cyan-500 data-[state=active]:to-cyan-600 data-[state=active]:text-white data-[state=active]:shadow-lg transition-all duration-300"
                >
                  <Calendar className="w-4 h-4 mr-2" />
                  <span className="whitespace-nowrap">Agenda Quântica</span>
                </TabsTrigger>
                <TabsTrigger
                  value="insercao"
                  className="flex-shrink-0 data-[state=active]:bg-gradient-to-r data-[state=active]:from-cyan-500 data-[state=active]:to-cyan-600 data-[state=active]:text-white data-[state=active]:shadow-lg transition-all duration-300"
                >
                  <Database className="w-4 h-4 mr-2" />
                  <span className="whitespace-nowrap">Inserção</span>
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
