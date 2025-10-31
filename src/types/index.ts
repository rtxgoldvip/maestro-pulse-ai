export type MaestroChartType = 'bar' | 'pie' | 'line' | 'area';

export interface Filters {
  ano: number;
  mes: number;
  clienteId: number | null;
  servicoId: number | null;
}

export interface FilterOptions {
  anos: number[];
  clientes: { id: number; name: string }[];
  servicos: { id: number; name: string }[];
}

export interface KPI {
  horasOrcadas: number;
  horasRealizadas: number;
  percentualApontamento: number;
}

export interface Financials {
  valorRecebido: number;
  valorAReceber: number;
  atrasoReceber: number;
  valorPago: number;
  valorAPagar: number;
  atrasoPagar: number;
  fluxoCaixaMes: number;
}

export interface Project {
  id: number;
  nome: string;
  valorContrato: number;
  valorRecebido: number;
  progresso: number;
}

export interface ChatMessage {
  role: 'user' | 'maestro';
  content: string;
  chartData?: any[];
  chartType?: MaestroChartType;
}

export interface AgendaSimulada {
  id: number;
  title: string;
  start: Date;
  end: Date;
  description?: string;
}

// --- Tipos de Dados Brutos (CSV) ---

// CSV: dados_gestor_fin.csv
export interface GestorFinRow {
  IdGest2: number;
  Mes: number;
  Ano: number;
  ConsultGest: number;
  ProjGest: number;
  QtHrOrc: number;
  VlHrOrc: number;
  ReceitaOrc: number;
  OutrasRec: number;
  ReceitaTTOrc: number;
  VlHrCusto: number;
  CustoOrc: number;
  OutrosCustos: number;
  CustoTTOrc: number;
  QtHrReal: number;
  ReceitaReal: number;
  CustoReal: number;
  VlMgOrc: number | null;
  PercMgOrc: number | null;
  VlMgReal: number;
  PercMgReal: number;
  ObsGest: string;
  OBS2: string;
  StatusFin: string;
}

// CSV: dados_a_pagar.csv
export interface ContasAPagarRow {
  ID: number;
  DtEmissão: string; // YYYY-MM-DD HH:mm:ss
  DtVencimento: string; // YYYY-MM-DD HH:mm:ss
  VlOriginal: number;
  Desconto: number;
  Prestador: number; // ID do Prestador
  Motivo: string;
  VlPago: number;
  DtPagamento: string | null; // YYYY-MM-DD HH:mm:ss
  Saldo: number;
  Quitado: 'S' | 'N';
  Observ: string;
  BancoSaida: string;
  NFSolicitada: string; // S, N, ou vazio
}

// CSV: dados_a_receber.csv
export interface ContasAReceberRow {
  ID: number;
  DtEmissão: string; // YYYY-MM-DD HH:mm:ss
  DtVencimento: string; // YYYY-MM-DD HH:mm:ss
  VlOriginal: number;
  Cliente: number; // Este é o ID_CLIENTE
  Motivo: string;
  VlRec: number;
  DtRec: string | null; // YYYY-MM-DD HH:mm:ss or null
  Saldo: number;
  Quitado: 'S' | 'N';
  Observ: string;
  Banco: string;
}

export type VoiceStatus = 'idle' | 'listening' | 'processing';

export interface UIControl {
  name: string;
  visible: boolean;
}
