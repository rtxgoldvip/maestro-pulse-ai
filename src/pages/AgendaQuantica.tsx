import React, { useState } from 'react';
import { Calendar, dateFnsLocalizer, View } from 'react-big-calendar';
import { format, parse, startOfWeek, getDay } from 'date-fns';
import { ptBR } from 'date-fns/locale';
import 'react-big-calendar/lib/css/react-big-calendar.css';
import { AmoledCard } from '@/components/ui/AmoledCard';
import { AgendaSimulada } from '@/types';

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
      <AmoledCard variant="glow" className="relative overflow-hidden">
        {/* Animated holographic background */}
        <div className="absolute inset-0 holographic opacity-5" />
        
        <div className="relative">
          <h2 className="text-2xl font-bold mb-4 gradient-text-animated neon-glow">Agenda Quântica</h2>
          <p className="text-muted-foreground mb-6 font-medium">
            Use comando de voz para adicionar eventos. Exemplo: "Agendar reunião amanhã às 15h com Cliente B"
          </p>
          <div className="h-[600px] rounded-xl overflow-hidden">
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
    </div>
  );
};
