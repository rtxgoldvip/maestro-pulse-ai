import React, { useState } from 'react';
import { AmoledCard } from '@/components/ui/AmoledCard';
import { ChatInput } from '@/components/ui/ChatInput';
import { QuantumGlobe } from '@/components/ui/QuantumGlobe';
import { MaestroChart } from '@/components/ui/MaestroChart';
import { getMaestroResponse } from '@/services/geminiService';
import { useData } from '@/contexts/DataContext';
import { useFilters } from '@/contexts/FilterContext';
import { ChatMessage } from '@/types';
import { Bot, User, Sparkles } from 'lucide-react';

export const AnalisesLivres: React.FC = () => {
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      role: 'maestro',
      content:
        '⚡ Sistema Quântico Online! Estou processando seus dados em tempo real usando IA preditiva. Qual análise você deseja realizar?',
    },
  ]);
  const [isProcessing, setIsProcessing] = useState(false);

  const { gestorFinData, contasAPagarData, contasAReceberData } = useData();
  const { filters } = useFilters();

  const handleSendMessage = async (userMessage: string) => {
    const newUserMessage: ChatMessage = {
      role: 'user',
      content: userMessage,
    };
    setMessages((prev) => [...prev, newUserMessage]);
    setIsProcessing(true);

    try {
      const context = {
        filters,
        visible_tabs: ['VisaoGeral', 'Financeiro', 'AnalisesLivres', 'AgendaQuantica'],
        data_samples: {
          gestor_fin: gestorFinData.slice(0, 5),
          contas_a_pagar: contasAPagarData.slice(0, 5),
          contas_a_receber: contasAReceberData.slice(0, 5),
        },
      };

      const response = await getMaestroResponse(userMessage, context);

      try {
        const parsed = JSON.parse(response);
        
        if (parsed.intent === 'visualize_data') {
          const maestroMessage: ChatMessage = {
            role: 'maestro',
            content: parsed.analysis_text || '🎯 Análise quântica concluída! Aqui estão os insights:',
            chartData: parsed.entities.data,
            chartType: parsed.entities.chartType,
          };
          setMessages((prev) => [...prev, maestroMessage]);
        } else {
          const maestroMessage: ChatMessage = {
            role: 'maestro',
            content: `✅ Ação executada: ${parsed.intent}`,
          };
          setMessages((prev) => [...prev, maestroMessage]);
        }
      } catch {
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
        content: '⚠️ Erro na ressonância quântica. Tentando reconectar...',
      };
      setMessages((prev) => [...prev, errorMessage]);
    } finally {
      setIsProcessing(false);
    }
  };

  return (
    <div className="space-y-6 animate-fade-in">
      {/* Hero Welcome Card */}
      <div className="relative overflow-hidden rounded-3xl p-8 sm:p-12"
           style={{
             background: 'linear-gradient(135deg, rgba(0,255,255,0.1) 0%, rgba(255,0,255,0.1) 50%, rgba(0,255,255,0.1) 100%)',
             border: '2px solid rgba(0,255,255,0.3)',
             boxShadow: '0 0 60px rgba(0,255,255,0.4), inset 0 0 60px rgba(0,255,255,0.1)'
           }}>
        <div className="absolute inset-0 opacity-20"
             style={{
               background: 'linear-gradient(135deg, #00FFFF 0%, #FF00FF 50%, #00FFFF 100%)',
               backgroundSize: '200% 200%',
               animation: 'gradient-shift 5s ease infinite'
             }} />
        <div className="relative z-10 text-center">
          <div className="flex justify-center mb-6">
            <div className="relative">
              <Sparkles className="w-16 h-16 text-cyan-400 pulse-intense" 
                        style={{ filter: 'drop-shadow(0 0 20px rgba(0,255,255,0.8))' }} />
              <div className="absolute inset-0 blur-xl bg-cyan-500/50 animate-pulse" />
            </div>
          </div>
          <h2 className="text-3xl sm:text-5xl font-black mb-4 neon-glow"
              style={{
                background: 'linear-gradient(135deg, #00FFFF 0%, #FF00FF 50%, #00FFFF 100%)',
                backgroundSize: '200% 200%',
                animation: 'gradient-shift 3s ease infinite',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent'
              }}>
            🚀 ANÁLISES QUÂNTICAS
          </h2>
          <p className="text-lg text-cyan-300 font-bold mb-2">
            IA Preditiva + Ressonância de Dados em Tempo Real
          </p>
          <p className="text-sm text-purple-300">
            💬 Chat inteligente • 🎤 Comandos de voz • 📊 Visualizações dinâmicas
          </p>
        </div>
      </div>

      {/* Chat Interface - PREMIUM DESIGN */}
      <AmoledCard variant="glow" className="relative overflow-hidden">
        {/* Animated holographic background */}
        <div className="absolute inset-0 opacity-5"
             style={{
               background: 'linear-gradient(135deg, #00FFFF 0%, #FF00FF 20%, #00FFFF 40%, #FF00FF 60%, #00FFFF 80%, #FF00FF 100%)',
               backgroundSize: '400% 400%',
               animation: 'gradient-shift 8s ease infinite'
             }} />
        
        <div className="relative space-y-6">
          {/* Quantum Globe - Shows when processing */}
          {isProcessing && (
            <div className="flex justify-center py-4">
              <div className="text-center">
                <QuantumGlobe isActive={true} />
                <p className="text-cyan-400 text-sm font-bold mt-4 pulse-intense">
                  🌀 Processando ressonância quântica...
                </p>
              </div>
            </div>
          )}

          {/* Chat Messages with PREMIUM styling */}
          <div className="space-y-6 max-h-[600px] overflow-y-auto pr-2 scrollbar-hide">
            {messages.map((message, index) => (
              <div key={index} className={`flex gap-4 ${message.role === 'user' ? 'justify-end' : 'justify-start'} animate-fade-in`}>
                {message.role === 'maestro' && (
                  <div className="w-12 h-12 rounded-2xl flex items-center justify-center flex-shrink-0 relative"
                       style={{
                         background: 'linear-gradient(135deg, rgba(0,255,255,0.3) 0%, rgba(255,0,255,0.3) 100%)',
                         border: '2px solid rgba(0,255,255,0.6)',
                         boxShadow: '0 0 30px rgba(0,255,255,0.6), inset 0 0 20px rgba(0,255,255,0.2)'
                       }}>
                    <Bot className="w-6 h-6 text-cyan-400 pulse-intense" />
                    <div className="absolute inset-0 rounded-2xl bg-cyan-400/20 animate-ping" />
                  </div>
                )}
                <div className={`flex-1 ${message.role === 'user' ? 'max-w-[80%]' : 'max-w-full'}`}>
                  <div
                    className={`p-5 rounded-2xl transition-all duration-300 ${
                      message.role === 'user'
                        ? 'backdrop-blur-xl border-3'
                        : 'backdrop-blur-xl border-2'
                    }`}
                    style={message.role === 'user' 
                      ? {
                          background: 'linear-gradient(135deg, rgba(255,0,255,0.2) 0%, rgba(128,0,255,0.2) 100%)',
                          borderColor: 'rgba(255,0,255,0.6)',
                          boxShadow: '0 0 30px rgba(255,0,255,0.5), inset 0 0 20px rgba(255,0,255,0.1)'
                        }
                      : {
                          background: 'linear-gradient(135deg, rgba(0,255,255,0.1) 0%, rgba(0,128,255,0.1) 100%)',
                          borderColor: 'rgba(0,255,255,0.4)',
                          boxShadow: '0 0 20px rgba(0,255,255,0.3)'
                        }
                    }>
                    <p className="text-sm sm:text-base whitespace-pre-wrap font-medium leading-relaxed text-white">
                      {message.content}
                    </p>
                  </div>
                  {message.chartData && message.chartType && (
                    <div className="mt-6">
                      <MaestroChart
                        data={message.chartData}
                        type={message.chartType}
                        dataKey="value"
                      />
                    </div>
                  )}
                </div>
                {message.role === 'user' && (
                  <div className="w-12 h-12 rounded-2xl flex items-center justify-center flex-shrink-0"
                       style={{
                         background: 'linear-gradient(135deg, rgba(255,0,255,0.3) 0%, rgba(128,0,255,0.3) 100%)',
                         border: '2px solid rgba(255,0,255,0.6)',
                         boxShadow: '0 0 30px rgba(255,0,255,0.5)'
                       }}>
                    <User className="w-6 h-6 text-purple-400" />
                  </div>
                )}
              </div>
            ))}
          </div>

          {/* Chat Input with PREMIUM design */}
          <div className="pt-4 border-t-2"
               style={{
                 borderImage: 'linear-gradient(90deg, rgba(0,255,255,0.5), rgba(255,0,255,0.5), rgba(0,255,255,0.5)) 1'
               }}>
            <ChatInput onSend={handleSendMessage} isProcessing={isProcessing} />
          </div>
        </div>
      </AmoledCard>
    </div>
  );
};