import React from 'react';
import { AmoledCard } from '@/components/ui/AmoledCard';
import { FilterBar } from '@/components/ui/FilterBar';
import { useData } from '@/contexts/DataContext';
import { useFilters } from '@/contexts/FilterContext';
import { TrendingUp, TrendingDown, Clock, DollarSign } from 'lucide-react';

export const VisaoGeral: React.FC = () => {
  const { getKPIs, getFinancials, isLoading } = useData();
  const { filters } = useFilters();

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="w-12 h-12 border-4 border-primary border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  const kpis = getKPIs(filters.ano, filters.mes);
  const financials = getFinancials(filters.ano, filters.mes);

  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat('pt-BR', {
      style: 'currency',
      currency: 'BRL',
    }).format(value);
  };

  return (
    <div className="space-y-6 animate-fade-in">
      <FilterBar />

      {/* KPIs de Horas */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <AmoledCard>
          <div className="flex items-start justify-between">
            <div>
              <p className="text-sm text-muted-foreground mb-1">Horas Orçadas</p>
              <h3 className="text-3xl font-bold text-primary">{kpis.horasOrcadas.toFixed(0)}h</h3>
            </div>
            <Clock className="w-8 h-8 text-primary/60" />
          </div>
        </AmoledCard>

        <AmoledCard>
          <div className="flex items-start justify-between">
            <div>
              <p className="text-sm text-muted-foreground mb-1">Horas Realizadas</p>
              <h3 className="text-3xl font-bold text-quantum-purple">{kpis.horasRealizadas.toFixed(0)}h</h3>
            </div>
            <Clock className="w-8 h-8 text-quantum-purple/60" />
          </div>
        </AmoledCard>

        <AmoledCard>
          <div className="flex items-start justify-between">
            <div>
              <p className="text-sm text-muted-foreground mb-1">% Apontamento</p>
              <h3 className="text-3xl font-bold text-quantum-blue">{kpis.percentualApontamento.toFixed(1)}%</h3>
            </div>
            <TrendingUp className="w-8 h-8 text-quantum-blue/60" />
          </div>
        </AmoledCard>
      </div>

      {/* KPIs Financeiros */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <AmoledCard>
          <div className="flex items-start justify-between">
            <div>
              <p className="text-sm text-muted-foreground mb-1">Valor Recebido</p>
              <h3 className="text-2xl font-bold text-green-500">{formatCurrency(financials.valorRecebido)}</h3>
            </div>
            <DollarSign className="w-8 h-8 text-green-500/60" />
          </div>
        </AmoledCard>

        <AmoledCard>
          <div className="flex items-start justify-between">
            <div>
              <p className="text-sm text-muted-foreground mb-1">A Receber</p>
              <h3 className="text-2xl font-bold text-primary">{formatCurrency(financials.valorAReceber)}</h3>
              <p className="text-xs text-destructive mt-1">Atraso: {formatCurrency(financials.atrasoReceber)}</p>
            </div>
            <TrendingUp className="w-8 h-8 text-primary/60" />
          </div>
        </AmoledCard>

        <AmoledCard>
          <div className="flex items-start justify-between">
            <div>
              <p className="text-sm text-muted-foreground mb-1">Valor Pago</p>
              <h3 className="text-2xl font-bold text-red-500">{formatCurrency(financials.valorPago)}</h3>
            </div>
            <DollarSign className="w-8 h-8 text-red-500/60" />
          </div>
        </AmoledCard>

        <AmoledCard>
          <div className="flex items-start justify-between">
            <div>
              <p className="text-sm text-muted-foreground mb-1">A Pagar</p>
              <h3 className="text-2xl font-bold text-orange-500">{formatCurrency(financials.valorAPagar)}</h3>
              <p className="text-xs text-destructive mt-1">Atraso: {formatCurrency(financials.atrasoPagar)}</p>
            </div>
            <TrendingDown className="w-8 h-8 text-orange-500/60" />
          </div>
        </AmoledCard>
      </div>

      {/* Fluxo de Caixa */}
      <AmoledCard>
        <div className="text-center py-8">
          <p className="text-lg text-muted-foreground mb-2">Fluxo de Caixa do Mês</p>
          <h2
            className={`text-5xl font-bold ${
              financials.fluxoCaixaMes >= 0 ? 'text-green-500' : 'text-red-500'
            }`}
          >
            {formatCurrency(financials.fluxoCaixaMes)}
          </h2>
        </div>
      </AmoledCard>
    </div>
  );
};
