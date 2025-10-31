import React, { useState } from 'react';
import { Calendar, dateFnsLocalizer, View } from 'react-big-calendar';
import { format, parse, startOfWeek, getDay } from 'date-fns';
import { ptBR } from 'date-fns/locale';
import 'react-big-calendar/lib/css/react-big-calendar.css';
import { AmoledCard } from '@/components/ui/AmoledCard';
import { AgendaSimulada } from '@/types';
import { Calendar as CalendarIcon, Clock, MapPin } from 'lucide-react';

const locales = {
  'pt-BR': ptBR,
};

const localizer = dateFnsLocalizer({
  format,
  parse,
  startOfWeek,
  getDay,
  locales,
});

export const AgendaQuantica: React.FC = () => {
  const [events, setEvents] = useState<AgendaSimulada[]>([
    {
      id: 1,
      title: 'Reunião com Cliente A',
      start: new Date(2025, 0, 31, 10, 0),
      end: new Date(2025, 0, 31, 11, 0),
      description: 'Discussão sobre projeto de consultoria',
    },
    {
      id: 2,
      title: 'Review de Sprint',
      start: new Date(2025, 1, 3, 14, 0),
      end: new Date(2025, 1, 3, 15, 30),
      description: 'Revisão do progresso do sprint atual',
    },
    {
      id: 3,
      title: 'Apresentação de Resultados',
      start: new Date(2025, 1, 5, 9, 0),
      end: new Date(2025, 1, 5, 10, 30),
      description: 'Apresentação de resultados mensais',
    },
  ]);

  const [view, setView] = useState<View>('month');

  return (
    <div className="space-y-6 animate-fade-in">
      {/* Premium Hero Section */}
      <div className="relative overflow-hidden rounded-3xl p-8 sm:p-12"
           style={{
             background: 'linear-gradient(135deg, rgba(255,255,0,0.1) 0%, rgba(255,128,0,0.1) 50%, rgba(255,255,0,0.1) 100%)',
             border: '2px solid rgba(255,255,0,0.3)',
             boxShadow: '0 0 60px rgba(255,255,0,0.4), inset 0 0 60px rgba(255,255,0,0.1)'
           }}>
        <div className="absolute inset-0 opacity-10"
             style={{
               background: 'linear-gradient(135deg, #FFFF00 0%, #FF8000 50%, #FFFF00 100%)',
               backgroundSize: '200% 200%',
               animation: 'gradient-shift 5s ease infinite'
             }} />
        <div className="relative z-10">
          <div className="flex items-center justify-center gap-4 mb-4">
            <CalendarIcon className="w-12 h-12 text-yellow-400 pulse-intense" 
                         style={{ filter: 'drop-shadow(0 0 20px rgba(255,255,0,0.8))' }} />
          </div>
          <h2 className="text-3xl sm:text-5xl font-black mb-4 text-center neon-glow"
              style={{
                background: 'linear-gradient(135deg, #FFFF00 0%, #FF8000 50%, #FFFF00 100%)',
                backgroundSize: '200% 200%',
                animation: 'gradient-shift 3s ease infinite',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent'
              }}>
            📅 AGENDA QUÂNTICA
          </h2>
          <p className="text-center text-yellow-300 font-bold mb-3">
            🎤 Use comandos de voz para agendar eventos
          </p>
          <div className="flex flex-wrap justify-center gap-4 text-sm">
            <div className="flex items-center gap-2 px-4 py-2 rounded-xl"
                 style={{
                   background: 'rgba(255,255,0,0.2)',
                   border: '1px solid rgba(255,255,0,0.4)'
                 }}>
              <Clock className="w-4 h-4 text-yellow-400" />
              <span className="text-yellow-200">Sincronização em tempo real</span>
            </div>
            <div className="flex items-center gap-2 px-4 py-2 rounded-xl"
                 style={{
                   background: 'rgba(255,128,0,0.2)',
                   border: '1px solid rgba(255,128,0,0.4)'
                 }}>
              <MapPin className="w-4 h-4 text-orange-400" />
              <span className="text-orange-200">Eventos inteligentes</span>
            </div>
          </div>
        </div>
      </div>

      {/* Premium Calendar Card */}
      <AmoledCard variant="glow" className="relative overflow-hidden">
        <div className="absolute inset-0 opacity-5"
             style={{
               background: 'linear-gradient(135deg, #FFFF00 0%, #FF8000 50%, #FFFF00 100%)',
               backgroundSize: '200% 200%',
               animation: 'gradient-shift 8s ease infinite'
             }} />
        
        <div className="relative">
          <div className="mb-6 p-4 rounded-2xl"
               style={{
                 background: 'linear-gradient(135deg, rgba(255,255,0,0.1) 0%, rgba(255,128,0,0.1) 100%)',
                 border: '2px solid rgba(255,255,0,0.2)'
               }}>
            <p className="text-yellow-300 font-bold text-center text-sm">
              💡 Exemplo: "Agendar reunião amanhã às 15h com Cliente B"
            </p>
          </div>
          
          <div className="h-[600px] rounded-2xl overflow-hidden backdrop-blur-sm"
               style={{
                 border: '2px solid rgba(255,255,0,0.2)',
                 boxShadow: 'inset 0 0 40px rgba(255,255,0,0.1)'
               }}>
            <Calendar
              localizer={localizer}
              events={events}
              startAccessor="start"
              endAccessor="end"
              view={view}
              onView={setView}
              culture="pt-BR"
              messages={{
                next: 'Próximo',
                previous: 'Anterior',
                today: 'Hoje',
                month: 'Mês',
                week: 'Semana',
                day: 'Dia',
                agenda: 'Agenda',
              }}
              style={{ height: '100%' }}
            />
          </div>
        </div>
      </AmoledCard>

      {/* Upcoming Events Card */}
      <AmoledCard>
        <h3 className="text-xl font-bold mb-4 neon-glow"
            style={{
              background: 'linear-gradient(135deg, #FFFF00 0%, #FF8000 100%)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent'
            }}>
          🔔 Próximos Eventos
        </h3>
        <div className="space-y-3">
          {events.slice(0, 3).map((event) => (
            <div key={event.id} 
                 className="p-4 rounded-xl transition-all duration-300 hover:scale-[1.02]"
                 style={{
                   background: 'linear-gradient(135deg, rgba(255,255,0,0.1) 0%, rgba(255,128,0,0.1) 100%)',
                   border: '1px solid rgba(255,255,0,0.3)',
                   boxShadow: '0 0 20px rgba(255,255,0,0.2)'
                 }}>
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <h4 className="font-bold text-white mb-1">{event.title}</h4>
                  <p className="text-sm text-yellow-300">{event.description}</p>
                </div>
                <div className="text-right">
                  <div className="text-xs text-yellow-400 font-bold">
                    {format(event.start, 'dd/MM/yyyy')}
                  </div>
                  <div className="text-xs text-orange-400">
                    {format(event.start, 'HH:mm')}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </AmoledCard>
    </div>
  );
};