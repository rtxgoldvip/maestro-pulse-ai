import React, { createContext, useContext, useState } from 'react';
import { Filters, FilterOptions } from '@/types';

interface FilterContextType {
  filters: Filters;
  setFilters: React.Dispatch<React.SetStateAction<Filters>>;
  filterOptions: FilterOptions;
}

const FilterContext = createContext<FilterContextType | undefined>(undefined);

export const FilterProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const currentYear = new Date().getFullYear();
  const currentMonth = new Date().getMonth() + 1;

  const [filters, setFilters] = useState<Filters>({
    ano: currentYear,
    mes: currentMonth,
    clienteId: null,
    servicoId: null,
  });

  // Opções simuladas (você pode extrair de dados reais depois)
  const filterOptions: FilterOptions = {
    anos: [2023, 2024, 2025],
    clientes: [
      { id: 1, name: 'Cliente A' },
      { id: 2, name: 'Cliente B' },
      { id: 3, name: 'Cliente C' },
    ],
    servicos: [
      { id: 1, name: 'Consultoria' },
      { id: 2, name: 'Desenvolvimento' },
      { id: 3, name: 'Suporte' },
    ],
  };

  return (
    <FilterContext.Provider value={{ filters, setFilters, filterOptions }}>
      {children}
    </FilterContext.Provider>
  );
};

export const useFilters = () => {
  const context = useContext(FilterContext);
  if (!context) {
    throw new Error('useFilters must be used within a FilterProvider');
  }
  return context;
};
