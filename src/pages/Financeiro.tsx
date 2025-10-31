import React from 'react';
import { AmoledCard } from '@/components/ui/AmoledCard';
import { FilterBar } from '@/components/ui/FilterBar';
import { MaestroChart } from '@/components/ui/MaestroChart';
import { useData } from '@/contexts/DataContext';
import { useFilters } from '@/contexts/FilterContext';

export const Financeiro: React.FC = () => {
  const { contasAPagarData, contasAReceberData, isLoading } = useData();
  const { filters } = useFilters();

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="w-12 h-12 border-4 border-primary border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  // Preparar dados para gráficos
  const receberChartData = [
    { name: 'Quitado', value: contasAReceberData.filter((r) => r.Quitado === 'S').length },
    { name: 'Pendente', value: contasAReceberData.filter((r) => r.Quitado === 'N').length },
  ];

  const pagarChartData = [
    { name: 'Quitado', value: contasAPagarData.filter((r) => r.Quitado === 'S').length },
    { name: 'Pendente', value: contasAPagarData.filter((r) => r.Quitado === 'N').length },
  ];

  return (
    <div className="space-y-6 animate-fade-in">
      <FilterBar />

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <MaestroChart
          data={receberChartData}
          type="pie"
          title="Contas a Receber - Status"
          dataKey="value"
        />

        <MaestroChart
          data={pagarChartData}
          type="pie"
          title="Contas a Pagar - Status"
          dataKey="value"
        />
      </div>

      {/* Tabela de Contas a Receber */}
      <AmoledCard>
        <h3 className="text-lg font-semibold mb-4">Contas a Receber (Últimas 10)</h3>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-metallic-light/30">
                <th className="text-left p-2">ID</th>
                <th className="text-left p-2">Cliente</th>
                <th className="text-left p-2">Valor</th>
                <th className="text-left p-2">Vencimento</th>
                <th className="text-left p-2">Status</th>
              </tr>
            </thead>
            <tbody>
              {contasAReceberData.slice(0, 10).map((conta) => (
                <tr key={conta.ID} className="border-b border-metallic-light/10">
                  <td className="p-2">{conta.ID}</td>
                  <td className="p-2">{conta.Cliente}</td>
                  <td className="p-2">
                    {new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(
                      conta.VlOriginal
                    )}
                  </td>
                  <td className="p-2">{new Date(conta.DtVencimento).toLocaleDateString('pt-BR')}</td>
                  <td className="p-2">
                    <span
                      className={`px-2 py-1 rounded-full text-xs ${
                        conta.Quitado === 'S' ? 'bg-green-500/20 text-green-500' : 'bg-orange-500/20 text-orange-500'
                      }`}
                    >
                      {conta.Quitado === 'S' ? 'Quitado' : 'Pendente'}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </AmoledCard>

      {/* Tabela de Contas a Pagar */}
      <AmoledCard>
        <h3 className="text-lg font-semibold mb-4">Contas a Pagar (Últimas 10)</h3>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-metallic-light/30">
                <th className="text-left p-2">ID</th>
                <th className="text-left p-2">Prestador</th>
                <th className="text-left p-2">Valor</th>
                <th className="text-left p-2">Vencimento</th>
                <th className="text-left p-2">Status</th>
              </tr>
            </thead>
            <tbody>
              {contasAPagarData.slice(0, 10).map((conta) => (
                <tr key={conta.ID} className="border-b border-metallic-light/10">
                  <td className="p-2">{conta.ID}</td>
                  <td className="p-2">{conta.Prestador}</td>
                  <td className="p-2">
                    {new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(
                      conta.VlOriginal
                    )}
                  </td>
                  <td className="p-2">{new Date(conta.DtVencimento).toLocaleDateString('pt-BR')}</td>
                  <td className="p-2">
                    <span
                      className={`px-2 py-1 rounded-full text-xs ${
                        conta.Quitado === 'S' ? 'bg-green-500/20 text-green-500' : 'bg-red-500/20 text-red-500'
                      }`}
                    >
                      {conta.Quitado === 'S' ? 'Quitado' : 'Pendente'}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </AmoledCard>
    </div>
  );
};
