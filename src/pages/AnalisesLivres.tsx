import React, { useState } from 'react';
import { AmoledCard } from '@/components/ui/AmoledCard';
import { ChatInput } from '@/components/ui/ChatInput';
import { QuantumGlobe } from '@/components/ui/QuantumGlobe';
import { MaestroChart } from '@/components/ui/MaestroChart';
import { getMaestroResponse } from '@/services/geminiService';
import { useData } from '@/contexts/DataContext';
import { useFilters } from '@/contexts/FilterContext';
import { ChatMessage } from '@/types';
import { Bot, User } from 'lucide-react';

export const AnalisesLivres: React.FC = () => {
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      role: 'maestro',
      content:
        'Eu sou o Sistema de Ressonância. Estou pronto para usar nosso CRQ para dar vida aos seus dados. O que você gostaria de analisar?',
    },
  ]);
  const [isProcessing, setIsProcessing] = useState(false);

  const { gestorFinData, contasAPagarData, contasAReceberData } = useData();
  const { filters } = useFilters();

  const handleSendMessage = async (userMessage: string) => {
    // Adicionar mensagem do usuário
    const newUserMessage: ChatMessage = {
      role: 'user',
      content: userMessage,
    };
    setMessages((prev) => [...prev, newUserMessage]);
    setIsProcessing(true);

    try {
      // Preparar contexto
      const context = {
        filters,
        visible_tabs: ['VisaoGeral', 'Financeiro', 'AnalisesLivres', 'AgendaQuantica'],
        data_samples: {
          gestor_fin: gestorFinData.slice(0, 5),
          contas_a_pagar: contasAPagarData.slice(0, 5),
          contas_a_receber: contasAReceberData.slice(0, 5),
        },
      };

      // Chamar Gemini
      const response = await getMaestroResponse(userMessage, context);

      // Tentar parsear JSON (para intents estruturadas)
      try {
        const parsed = JSON.parse(response);
        
        if (parsed.intent === 'visualize_data') {
          // Adicionar mensagem com gráfico
          const maestroMessage: ChatMessage = {
            role: 'maestro',
            content: parsed.analysis_text || 'Aqui está o gráfico solicitado:',
            chartData: parsed.entities.data,
            chartType: parsed.entities.chartType,
          };
          setMessages((prev) => [...prev, maestroMessage]);
        } else {
          // Outra intent estruturada (ex: control_ui, adicionar_agenda_simulado)
          const maestroMessage: ChatMessage = {
            role: 'maestro',
            content: `Executei a ação: ${parsed.intent}`,
          };
          setMessages((prev) => [...prev, maestroMessage]);
        }
      } catch {
        // Resposta de texto simples (query_data storytelling)
        const maestroMessage: ChatMessage = {
          role: 'maestro',
          content: response,
        };
        setMessages((prev) => [...prev, maestroMessage]);
      }
    } catch (error) {
      console.error('Error processing message:', error);
      const errorMessage: ChatMessage = {
        role: 'maestro',
        content: 'Houve um erro ao processar sua solicitação. Por favor, tente novamente.',
      };
      setMessages((prev) => [...prev, errorMessage]);
    } finally {
      setIsProcessing(false);
    }
  };

  return (
    <div className="space-y-6 animate-fade-in">
      <AmoledCard>
        <div className="space-y-6">
          {/* Globo Quântico */}
          <QuantumGlobe isActive={isProcessing} />

          {/* Chat Messages */}
          <div className="space-y-4 max-h-[500px] overflow-y-auto pr-2">
            {messages.map((message, index) => (
              <div key={index} className={`flex gap-3 ${message.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                {message.role === 'maestro' && (
                  <div className="w-8 h-8 rounded-full bg-primary/20 flex items-center justify-center flex-shrink-0">
                    <Bot className="w-5 h-5 text-primary" />
                  </div>
                )}
                <div className={`flex-1 ${message.role === 'user' ? 'max-w-[80%]' : 'max-w-full'}`}>
                  <div
                    className={`p-4 rounded-lg ${
                      message.role === 'user'
                        ? 'bg-primary/10 border border-primary/30'
                        : 'bg-card/50 border border-metallic-light/30'
                    }`}
                  >
                    <p className="text-sm whitespace-pre-wrap">{message.content}</p>
                  </div>
                  {message.chartData && message.chartType && (
                    <div className="mt-4">
                      <MaestroChart
                        data={message.chartData}
                        type={message.chartType}
                        dataKey="value"
                      />
                    </div>
                  )}
                </div>
                {message.role === 'user' && (
                  <div className="w-8 h-8 rounded-full bg-accent/20 flex items-center justify-center flex-shrink-0">
                    <User className="w-5 h-5 text-accent" />
                  </div>
                )}
              </div>
            ))}
          </div>

          {/* Chat Input */}
          <ChatInput onSend={handleSendMessage} isProcessing={isProcessing} />
        </div>
      </AmoledCard>
    </div>
  );
};
