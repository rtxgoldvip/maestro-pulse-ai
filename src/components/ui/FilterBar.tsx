import React, { useState } from 'react';
import { useFilters } from '@/contexts/FilterContext';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Filter } from 'lucide-react';
import { AmoledCard } from './AmoledCard';

export const FilterBar: React.FC = () => {
  const { filters, setFilters, filterOptions } = useFilters();
  const [open, setOpen] = useState(false);

  const filterContent = (
    <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
      <div>
        <label className="text-sm font-medium text-muted-foreground mb-2 block">Ano</label>
        <Select
          value={filters.ano.toString()}
          onValueChange={(value) => setFilters({ ...filters, ano: parseInt(value) })}
        >
          <SelectTrigger className="bg-background/50 border-metallic-light/30 neon-border">
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            {filterOptions.anos.map((ano) => (
              <SelectItem key={ano} value={ano.toString()}>
                {ano}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      <div>
        <label className="text-sm font-medium text-muted-foreground mb-2 block">Mês</label>
        <Select
          value={filters.mes.toString()}
          onValueChange={(value) => setFilters({ ...filters, mes: parseInt(value) })}
        >
          <SelectTrigger className="bg-background/50 border-metallic-light/30 neon-border">
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            {Array.from({ length: 12 }, (_, i) => i + 1).map((mes) => (
              <SelectItem key={mes} value={mes.toString()}>
                {new Date(2024, mes - 1, 1).toLocaleDateString('pt-BR', { month: 'long' })}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      <div>
        <label className="text-sm font-medium text-muted-foreground mb-2 block">Cliente</label>
        <Select
          value={filters.clienteId?.toString() || 'all'}
          onValueChange={(value) =>
            setFilters({ ...filters, clienteId: value === 'all' ? null : parseInt(value) })
          }
        >
          <SelectTrigger className="bg-background/50 border-metallic-light/30 neon-border">
            <SelectValue placeholder="Todos" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">Todos</SelectItem>
            {filterOptions.clientes.map((cliente) => (
              <SelectItem key={cliente.id} value={cliente.id.toString()}>
                {cliente.name}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      <div>
        <label className="text-sm font-medium text-muted-foreground mb-2 block">Serviço</label>
        <Select
          value={filters.servicoId?.toString() || 'all'}
          onValueChange={(value) =>
            setFilters({ ...filters, servicoId: value === 'all' ? null : parseInt(value) })
          }
        >
          <SelectTrigger className="bg-background/50 border-metallic-light/30 neon-border">
            <SelectValue placeholder="Todos" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">Todos</SelectItem>
            {filterOptions.servicos.map((servico) => (
              <SelectItem key={servico.id} value={servico.id.toString()}>
                {servico.name}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>
    </div>
  );

  return (
    <>
      {/* Desktop - Sempre visível */}
      <div className="hidden md:block">
        <AmoledCard variant="glow" className="mb-6">
          {filterContent}
        </AmoledCard>
      </div>

      {/* Mobile - Modal com botão flutuante */}
      <div className="md:hidden fixed bottom-20 right-4 z-50">
        <Dialog open={open} onOpenChange={setOpen}>
          <DialogTrigger asChild>
            <Button 
              size="lg" 
              className="rounded-full w-14 h-14 shadow-glow quantum-pulse"
            >
              <Filter className="w-6 h-6" />
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-[95vw] glass-effect neon-border">
            <DialogHeader>
              <DialogTitle className="gradient-text-animated text-xl">Filtros</DialogTitle>
            </DialogHeader>
            <div className="mt-4">
              {filterContent}
            </div>
            <Button 
              onClick={() => setOpen(false)} 
              className="w-full mt-4"
            >
              Aplicar Filtros
            </Button>
          </DialogContent>
        </Dialog>
      </div>
    </>
  );
};
