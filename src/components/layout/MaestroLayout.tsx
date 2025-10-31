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
    <div className="min-h-screen bg-background">
      <VoiceIndicator status={voiceStatus} />

      {/* Header */}
      <header className="border-b border-metallic-light/30 bg-card/50 backdrop-blur-md sticky top-0 z-40">
        <div className="container mx-auto px-6 py-4">
          <h1 className="text-3xl font-bold bg-gradient-to-r from-primary via-quantum-purple to-quantum-blue bg-clip-text text-transparent">
            Maestro Farol
          </h1>
          <p className="text-sm text-muted-foreground">Sistema de Ressonância Quântica de Inteligência de Negócio</p>
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-6 py-8">
        <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
          <TabsList className="grid grid-cols-2 md:grid-cols-5 gap-2 bg-card/50 p-2 rounded-xl border border-metallic-light/30">
            <TabsTrigger
              value="visao-geral"
              className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground"
            >
              <BarChart3 className="w-4 h-4 mr-2" />
              Visão Geral
            </TabsTrigger>
            <TabsTrigger
              value="financeiro"
              className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground"
            >
              <DollarSign className="w-4 h-4 mr-2" />
              Financeiro
            </TabsTrigger>
            <TabsTrigger
              value="analises"
              className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground"
            >
              <MessageSquare className="w-4 h-4 mr-2" />
              Análises Livres
            </TabsTrigger>
            <TabsTrigger
              value="agenda"
              className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground"
            >
              <Calendar className="w-4 h-4 mr-2" />
              Agenda Quântica
            </TabsTrigger>
            <TabsTrigger
              value="insercao"
              className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground"
            >
              <Database className="w-4 h-4 mr-2" />
              Inserção
            </TabsTrigger>
          </TabsList>

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
