import React, { createContext, useContext, useState, useEffect } from 'react';
import Papa from 'papaparse';
import { GestorFinRow, ContasAPagarRow, ContasAReceberRow, KPI, Financials } from '@/types';

interface DataContextType {
  gestorFinData: GestorFinRow[];
  contasAPagarData: ContasAPagarRow[];
  contasAReceberData: ContasAReceberRow[];
  isLoading: boolean;
  error: string | null;
  getKPIs: (ano: number, mes: number) => KPI;
  getFinancials: (ano: number, mes: number) => Financials;
}

const DataContext = createContext<DataContextType | undefined>(undefined);

export const DataProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [gestorFinData, setGestorFinData] = useState<GestorFinRow[]>([]);
  const [contasAPagarData, setContasAPagarData] = useState<ContasAPagarRow[]>([]);
  const [contasAReceberData, setContasAReceberData] = useState<ContasAReceberRow[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const loadCSVData = async () => {
      try {
        setIsLoading(true);

        // Load dados_gestor_fin.csv
        const gestorFinResponse = await fetch('/dados_gestor_fin.csv');
        const gestorFinText = await gestorFinResponse.text();
        const gestorFinParsed = Papa.parse<GestorFinRow>(gestorFinText, {
          header: true,
          dynamicTyping: true,
          skipEmptyLines: true,
        });

        // Load dados_a_pagar.csv
        const aPagarResponse = await fetch('/dados_a_pagar.csv');
        const aPagarText = await aPagarResponse.text();
        const aPagarParsed = Papa.parse<ContasAPagarRow>(aPagarText, {
          header: true,
          dynamicTyping: true,
          skipEmptyLines: true,
        });

        // Load dados_a_receber.csv
        const aReceberResponse = await fetch('/dados_a_receber.csv');
        const aReceberText = await aReceberResponse.text();
        const aReceberParsed = Papa.parse<ContasAReceberRow>(aReceberText, {
          header: true,
          dynamicTyping: true,
          skipEmptyLines: true,
        });

        setGestorFinData(gestorFinParsed.data);
        setContasAPagarData(aPagarParsed.data);
        setContasAReceberData(aReceberParsed.data);
        setIsLoading(false);
      } catch (err) {
        setError('Erro ao carregar dados CSV');
        setIsLoading(false);
        console.error('CSV Loading Error:', err);
      }
    };

    loadCSVData();
  }, []);

  const getKPIs = (ano: number, mes: number): KPI => {
    const filtered = gestorFinData.filter((row) => row.Ano === ano && row.Mes === mes);
    
    const horasOrcadas = filtered.reduce((sum, row) => sum + (row.QtHrOrc || 0), 0);
    const horasRealizadas = filtered.reduce((sum, row) => sum + (row.QtHrReal || 0), 0);
    const percentualApontamento = horasOrcadas > 0 ? (horasRealizadas / horasOrcadas) * 100 : 0;

    return {
      horasOrcadas,
      horasRealizadas,
      percentualApontamento,
    };
  };

  const getFinancials = (ano: number, mes: number): Financials => {
    const parseDate = (dateStr: string | null): Date | null => {
      if (!dateStr) return null;
      return new Date(dateStr);
    };

    const isInMonth = (dateStr: string | null, ano: number, mes: number): boolean => {
      const date = parseDate(dateStr);
      if (!date) return false;
      return date.getFullYear() === ano && date.getMonth() + 1 === mes;
    };

    const valorRecebido = contasAReceberData
      .filter((row) => row.Quitado === 'S' && isInMonth(row.DtRec, ano, mes))
      .reduce((sum, row) => sum + row.VlRec, 0);

    const valorAReceber = contasAReceberData
      .filter((row) => row.Quitado === 'N')
      .reduce((sum, row) => sum + row.Saldo, 0);

    const now = new Date();
    const atrasoReceber = contasAReceberData
      .filter((row) => {
        if (row.Quitado === 'S') return false;
        const vencimento = parseDate(row.DtVencimento);
        return vencimento && vencimento < now;
      })
      .reduce((sum, row) => sum + row.Saldo, 0);

    const valorPago = contasAPagarData
      .filter((row) => row.Quitado === 'S' && isInMonth(row.DtPagamento, ano, mes))
      .reduce((sum, row) => sum + row.VlPago, 0);

    const valorAPagar = contasAPagarData
      .filter((row) => row.Quitado === 'N')
      .reduce((sum, row) => sum + row.Saldo, 0);

    const atrasoPagar = contasAPagarData
      .filter((row) => {
        if (row.Quitado === 'S') return false;
        const vencimento = parseDate(row.DtVencimento);
        return vencimento && vencimento < now;
      })
      .reduce((sum, row) => sum + row.Saldo, 0);

    const fluxoCaixaMes = valorRecebido - valorPago;

    return {
      valorRecebido,
      valorAReceber,
      atrasoReceber,
      valorPago,
      valorAPagar,
      atrasoPagar,
      fluxoCaixaMes,
    };
  };

  return (
    <DataContext.Provider
      value={{
        gestorFinData,
        contasAPagarData,
        contasAReceberData,
        isLoading,
        error,
        getKPIs,
        getFinancials,
      }}
    >
      {children}
    </DataContext.Provider>
  );
};

export const useData = () => {
  const context = useContext(DataContext);
  if (!context) {
    throw new Error('useData must be used within a DataProvider');
  }
  return context;
};
