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
      {/* Filters - Fixed on mobile to not overlap */}
      <div className="sticky top-[140px] sm:top-[120px] z-30 bg-background/80 backdrop-blur-sm pb-4 -mx-4 px-4 sm:mx-0 sm:px-0">
        <FilterBar />
      </div>

      {/* KPIs de Horas - Premium cards with animations */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
        <AmoledCard variant="glow">
          <div className="flex items-start justify-between">
            <div>
              <p className="text-sm font-medium text-slate-600 mb-2">Horas Orçadas</p>
              <h3 className="text-3xl sm:text-4xl font-bold bg-gradient-to-r from-cyan-500 to-cyan-600 bg-clip-text text-transparent">
                {kpis.horasOrcadas.toFixed(0)}h
              </h3>
            </div>
            <div className="p-3 rounded-xl bg-gradient-to-br from-cyan-100 to-cyan-200 shadow-lg">
              <Clock className="w-6 h-6 text-cyan-600" />
            </div>
          </div>
        </AmoledCard>

        <AmoledCard variant="glow">
          <div className="flex items-start justify-between">
            <div>
              <p className="text-sm font-medium text-slate-600 mb-2">Horas Realizadas</p>
              <h3 className="text-3xl sm:text-4xl font-bold bg-gradient-to-r from-purple-500 to-purple-600 bg-clip-text text-transparent">
                {kpis.horasRealizadas.toFixed(0)}h
              </h3>
            </div>
            <div className="p-3 rounded-xl bg-gradient-to-br from-purple-100 to-purple-200 shadow-lg">
              <Clock className="w-6 h-6 text-purple-600" />
            </div>
          </div>
        </AmoledCard>

        <AmoledCard variant="glow">
          <div className="flex items-start justify-between">
            <div>
              <p className="text-sm font-medium text-slate-600 mb-2">% Apontamento</p>
              <h3 className="text-3xl sm:text-4xl font-bold bg-gradient-to-r from-blue-500 to-blue-600 bg-clip-text text-transparent">
                {kpis.percentualApontamento.toFixed(1)}%
              </h3>
            </div>
            <div className="p-3 rounded-xl bg-gradient-to-br from-blue-100 to-blue-200 shadow-lg">
              <TrendingUp className="w-6 h-6 text-blue-600" />
            </div>
          </div>
        </AmoledCard>
      </div>

      {/* KPIs Financeiros - Premium design */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
        <AmoledCard>
          <div className="flex items-start justify-between">
            <div>
              <p className="text-sm font-medium text-slate-600 mb-2">Valor Recebido</p>
              <h3 className="text-xl sm:text-2xl font-bold bg-gradient-to-r from-emerald-500 to-green-600 bg-clip-text text-transparent">
                {formatCurrency(financials.valorRecebido)}
              </h3>
            </div>
            <div className="p-3 rounded-xl bg-gradient-to-br from-emerald-100 to-green-200 shadow-lg">
              <DollarSign className="w-5 h-5 text-green-600" />
            </div>
          </div>
        </AmoledCard>

        <AmoledCard>
          <div className="flex items-start justify-between">
            <div>
              <p className="text-sm font-medium text-slate-600 mb-2">A Receber</p>
              <h3 className="text-xl sm:text-2xl font-bold bg-gradient-to-r from-cyan-500 to-cyan-600 bg-clip-text text-transparent">
                {formatCurrency(financials.valorAReceber)}
              </h3>
              <p className="text-xs text-red-500 mt-1">Atraso: {formatCurrency(financials.atrasoReceber)}</p>
            </div>
            <div className="p-3 rounded-xl bg-gradient-to-br from-cyan-100 to-cyan-200 shadow-lg">
              <TrendingUp className="w-5 h-5 text-cyan-600" />
            </div>
          </div>
        </AmoledCard>

        <AmoledCard>
          <div className="flex items-start justify-between">
            <div>
              <p className="text-sm font-medium text-slate-600 mb-2">Valor Pago</p>
              <h3 className="text-xl sm:text-2xl font-bold bg-gradient-to-r from-rose-500 to-red-600 bg-clip-text text-transparent">
                {formatCurrency(financials.valorPago)}
              </h3>
            </div>
            <div className="p-3 rounded-xl bg-gradient-to-br from-rose-100 to-red-200 shadow-lg">
              <DollarSign className="w-5 h-5 text-red-600" />
            </div>
          </div>
        </AmoledCard>

        <AmoledCard>
          <div className="flex items-start justify-between">
            <div>
              <p className="text-sm font-medium text-slate-600 mb-2">A Pagar</p>
              <h3 className="text-xl sm:text-2xl font-bold bg-gradient-to-r from-orange-500 to-amber-600 bg-clip-text text-transparent">
                {formatCurrency(financials.valorAPagar)}
              </h3>
              <p className="text-xs text-red-500 mt-1">Atraso: {formatCurrency(financials.atrasoPagar)}</p>
            </div>
            <div className="p-3 rounded-xl bg-gradient-to-br from-orange-100 to-amber-200 shadow-lg">
              <TrendingDown className="w-5 h-5 text-orange-600" />
            </div>
          </div>
        </AmoledCard>
      </div>

      {/* Fluxo de Caixa - Hero card */}
      <AmoledCard variant="glow">
        <div className="text-center py-8 sm:py-12">
          <p className="text-base sm:text-lg font-medium text-slate-600 mb-3">Fluxo de Caixa do Mês</p>
          <h2
            className={`text-4xl sm:text-6xl font-bold ${
              financials.fluxoCaixaMes >= 0 
                ? 'bg-gradient-to-r from-green-500 to-emerald-600 bg-clip-text text-transparent' 
                : 'bg-gradient-to-r from-red-500 to-rose-600 bg-clip-text text-transparent'
            }`}
          >
            {formatCurrency(financials.fluxoCaixaMes)}
          </h2>
          <div className={`mt-4 inline-flex items-center gap-2 px-4 py-2 rounded-full ${
            financials.fluxoCaixaMes >= 0 ? 'bg-green-100' : 'bg-red-100'
          }`}>
            {financials.fluxoCaixaMes >= 0 ? (
              <TrendingUp className="w-4 h-4 text-green-600" />
            ) : (
              <TrendingDown className="w-4 h-4 text-red-600" />
            )}
            <span className={`text-sm font-medium ${
              financials.fluxoCaixaMes >= 0 ? 'text-green-700' : 'text-red-700'
            }`}>
              {financials.fluxoCaixaMes >= 0 ? 'Positivo' : 'Negativo'}
            </span>
          </div>
        </div>
      </AmoledCard>
    </div>
  );
};
