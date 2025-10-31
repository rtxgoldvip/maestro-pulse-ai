import React from 'react';
import { AmoledCard } from '@/components/ui/AmoledCard';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useForm } from 'react-hook-form';
import { useToast } from '@/hooks/use-toast';

interface AgendaFormData {
  title: string;
  start: string;
  end: string;
  description: string;
}

export const InsercaoDados: React.FC = () => {
  const { register, handleSubmit, reset } = useForm<AgendaFormData>();
  const { toast } = useToast();

  const onSubmit = (data: AgendaFormData) => {
    // Simulação de inserção
    console.log('Nova agenda:', data);
    toast({
      title: 'Evento Agendado',
      description: `${data.title} foi adicionado à agenda.`,
    });
    reset();
  };

  return (
    <div className="space-y-6 animate-fade-in">
      <AmoledCard>
        <h2 className="text-2xl font-bold mb-6 text-primary">Inserção Manual de Dados</h2>
        <p className="text-muted-foreground mb-6">
          Use este formulário para adicionar eventos à agenda manualmente (alternativa ao comando de voz).
        </p>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <div>
            <Label htmlFor="title">Título do Evento</Label>
            <Input
              id="title"
              {...register('title', { required: true })}
              placeholder="Ex: Reunião com Cliente"
              className="bg-background/50 border-metallic-light/30"
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <Label htmlFor="start">Data/Hora Início</Label>
              <Input
                id="start"
                type="datetime-local"
                {...register('start', { required: true })}
                className="bg-background/50 border-metallic-light/30"
              />
            </div>

            <div>
              <Label htmlFor="end">Data/Hora Fim</Label>
              <Input
                id="end"
                type="datetime-local"
                {...register('end', { required: true })}
                className="bg-background/50 border-metallic-light/30"
              />
            </div>
          </div>

          <div>
            <Label htmlFor="description">Descrição</Label>
            <Input
              id="description"
              {...register('description')}
              placeholder="Descrição do evento (opcional)"
              className="bg-background/50 border-metallic-light/30"
            />
          </div>

          <Button type="submit" className="w-full bg-primary hover:bg-primary/90">
            Adicionar à Agenda
          </Button>
        </form>
      </AmoledCard>
    </div>
  );
};
