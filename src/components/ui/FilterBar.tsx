import React from 'react';
import { useFilters } from '@/contexts/FilterContext';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { AmoledCard } from './AmoledCard';

export const FilterBar: React.FC = () => {
  const { filters, setFilters, filterOptions } = useFilters();

  return (
    <AmoledCard className="mb-6">
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div>
          <label className="text-sm font-medium text-muted-foreground mb-2 block">Ano</label>
          <Select
            value={filters.ano.toString()}
            onValueChange={(value) => setFilters({ ...filters, ano: parseInt(value) })}
          >
            <SelectTrigger className="bg-background/50 border-metallic-light/30">
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
            <SelectTrigger className="bg-background/50 border-metallic-light/30">
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
            <SelectTrigger className="bg-background/50 border-metallic-light/30">
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
            <SelectTrigger className="bg-background/50 border-metallic-light/30">
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
    </AmoledCard>
  );
};
