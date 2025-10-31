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
      {/* Filters - Now as floating button on mobile */}
      <FilterBar />

      {/* KPIs de Horas - Premium cards with animations */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
        <AmoledCard variant="glow" className="animate-float">
          <div className="flex items-start justify-between">
            <div>
              <p className="text-sm font-medium text-muted-foreground mb-2">Horas Orçadas</p>
              <h3 className="text-3xl sm:text-4xl font-bold gradient-text-animated neon-glow">
                {kpis.horasOrcadas.toFixed(0)}h
              </h3>
            </div>
            <div className="p-3 rounded-xl glass-effect border-2 border-cyan-500/30 shadow-glow">
              <Clock className="w-6 h-6 text-cyan-400" />
            </div>
          </div>
        </AmoledCard>

        <AmoledCard variant="glow" className="animate-float">
          <div className="flex items-start justify-between">
            <div>
              <p className="text-sm font-medium text-muted-foreground mb-2">Horas Realizadas</p>
              <h3 className="text-3xl sm:text-4xl font-bold bg-gradient-to-r from-purple-400 to-purple-500 bg-clip-text text-transparent neon-glow">
                {kpis.horasRealizadas.toFixed(0)}h
              </h3>
            </div>
            <div className="p-3 rounded-xl glass-effect border-2 border-purple-500/30 shadow-glow-purple">
              <Clock className="w-6 h-6 text-purple-400" />
            </div>
          </div>
        </AmoledCard>

        <AmoledCard variant="glow" className="animate-float">
          <div className="flex items-start justify-between">
            <div>
              <p className="text-sm font-medium text-muted-foreground mb-2">% Apontamento</p>
              <h3 className="text-3xl sm:text-4xl font-bold bg-gradient-to-r from-blue-400 to-blue-500 bg-clip-text text-transparent neon-glow">
                {kpis.percentualApontamento.toFixed(1)}%
              </h3>
            </div>
            <div className="p-3 rounded-xl glass-effect border-2 border-blue-500/30 shadow-glow">
              <TrendingUp className="w-6 h-6 text-blue-400" />
            </div>
          </div>
        </AmoledCard>
      </div>

      {/* KPIs Financeiros - Premium design */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
        <AmoledCard>
          <div className="flex items-start justify-between">
            <div>
              <p className="text-sm font-medium text-muted-foreground mb-2">Valor Recebido</p>
              <h3 className="text-xl sm:text-2xl font-bold bg-gradient-to-r from-emerald-400 to-green-500 bg-clip-text text-transparent neon-glow">
                {formatCurrency(financials.valorRecebido)}
              </h3>
            </div>
            <div className="p-3 rounded-xl glass-effect border-2 border-green-500/30 shadow-glow">
              <DollarSign className="w-5 h-5 text-green-400" />
            </div>
          </div>
        </AmoledCard>

        <AmoledCard>
          <div className="flex items-start justify-between">
            <div>
              <p className="text-sm font-medium text-muted-foreground mb-2">A Receber</p>
              <h3 className="text-xl sm:text-2xl font-bold bg-gradient-to-r from-cyan-400 to-cyan-500 bg-clip-text text-transparent neon-glow">
                {formatCurrency(financials.valorAReceber)}
              </h3>
              <p className="text-xs text-red-400 mt-1 font-semibold">Atraso: {formatCurrency(financials.atrasoReceber)}</p>
            </div>
            <div className="p-3 rounded-xl glass-effect border-2 border-cyan-500/30 shadow-glow">
              <TrendingUp className="w-5 h-5 text-cyan-400" />
            </div>
          </div>
        </AmoledCard>

        <AmoledCard>
          <div className="flex items-start justify-between">
            <div>
              <p className="text-sm font-medium text-muted-foreground mb-2">Valor Pago</p>
              <h3 className="text-xl sm:text-2xl font-bold bg-gradient-to-r from-rose-400 to-red-500 bg-clip-text text-transparent neon-glow">
                {formatCurrency(financials.valorPago)}
              </h3>
            </div>
            <div className="p-3 rounded-xl glass-effect border-2 border-red-500/30 shadow-glow">
              <DollarSign className="w-5 h-5 text-red-400" />
            </div>
          </div>
        </AmoledCard>

        <AmoledCard>
          <div className="flex items-start justify-between">
            <div>
              <p className="text-sm font-medium text-muted-foreground mb-2">A Pagar</p>
              <h3 className="text-xl sm:text-2xl font-bold bg-gradient-to-r from-orange-400 to-amber-500 bg-clip-text text-transparent neon-glow">
                {formatCurrency(financials.valorAPagar)}
              </h3>
              <p className="text-xs text-red-400 mt-1 font-semibold">Atraso: {formatCurrency(financials.atrasoPagar)}</p>
            </div>
            <div className="p-3 rounded-xl glass-effect border-2 border-orange-500/30 shadow-glow">
              <TrendingDown className="w-5 h-5 text-orange-400" />
            </div>
          </div>
        </AmoledCard>
      </div>

      {/* Fluxo de Caixa - Hero card */}
      <AmoledCard variant="glow" className="relative overflow-hidden">
        <div className="absolute inset-0 holographic opacity-10" />
        <div className="relative text-center py-8 sm:py-12">
          <p className="text-base sm:text-lg font-semibold text-muted-foreground mb-3">Fluxo de Caixa do Mês</p>
          <h2
            className={`text-4xl sm:text-6xl font-bold ${
              financials.fluxoCaixaMes >= 0 
                ? 'bg-gradient-to-r from-green-400 to-emerald-500 bg-clip-text text-transparent neon-glow' 
                : 'bg-gradient-to-r from-red-400 to-rose-500 bg-clip-text text-transparent neon-glow'
            }`}
          >
            {formatCurrency(financials.fluxoCaixaMes)}
          </h2>
          <div className={`mt-4 inline-flex items-center gap-2 px-6 py-3 rounded-full glass-effect border-2 ${
            financials.fluxoCaixaMes >= 0 ? 'border-green-500/50 shadow-glow' : 'border-red-500/50 shadow-glow'
          }`}>
            {financials.fluxoCaixaMes >= 0 ? (
              <TrendingUp className="w-5 h-5 text-green-400" />
            ) : (
              <TrendingDown className="w-5 h-5 text-red-400" />
            )}
            <span className={`text-sm font-bold ${
              financials.fluxoCaixaMes >= 0 ? 'text-green-400' : 'text-red-400'
            }`}>
              {financials.fluxoCaixaMes >= 0 ? 'Positivo' : 'Negativo'}
            </span>
          </div>
        </div>
      </AmoledCard>
    </div>
  );
};
