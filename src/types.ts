/**
 * Representa um feriado brasileiro.
 */
export interface Feriado {
  /** Data do feriado (YYYY-MM-DD string ou Date) */
  data: string | Date;
  /** Nome do feriado */
  nome: string;
  /** Abrangência do feriado */
  tipo: 'nacional' | 'estadual' | 'municipal' | 'forense';
  /** UF (para feriados estaduais) */
  uf?: string;
  /** Município (para feriados municipais) */
  municipio?: string;
  /** Sigla do tribunal (para feriados forenses, ex: TJSP, TRT2) */
  tribunal?: string;
}

/**
 * Opções para cálculo de prazo processual.
 */
export interface OpcoesPrazo {
  /** Data de início da contagem (publicação/intimação) */
  dataInicio: string | Date;
  /** Número de dias do prazo */
  diasPrazo: number;
  /** Se true, conta apenas dias úteis (padrão CPC/2015). Default: true */
  diasUteis?: boolean;
  /** Lista de feriados a considerar no cálculo */
  feriados?: Feriado[];
}

/**
 * Resultado do cálculo de prazo.
 */
export interface ResultadoPrazo {
  /** Data fatal do prazo */
  dataFatal: Date;
  /** Data fatal formatada DD/MM/YYYY */
  dataFatalFormatada: string;
  /** Data de início considerada */
  dataInicio: Date;
  /** Número de dias do prazo */
  diasPrazo: number;
  /** Se contou dias úteis */
  diasUteis: boolean;
  /** Dias corridos entre início e data fatal */
  diasCorridos: number;
}

/**
 * Categorias de prazos processuais.
 */
export type CategoriaPrazo =
  | 'civel'
  | 'recurso_civel'
  | 'criminal'
  | 'trabalhista'
  | 'evento'
  | 'tarefa'
  | 'administrativo'
  | 'geral';

/**
 * Definição de um tipo de prazo processual.
 */
export interface TipoPrazo {
  /** Chave identificadora (ex: 'contestacao') */
  chave: string;
  /** Nome legível (ex: 'Contestação') */
  nome: string;
  /** Prazo padrão em dias */
  diasPadrao: number;
  /** Se o prazo é em dias úteis */
  diasUteis: boolean;
  /** Categoria do prazo */
  categoria: CategoriaPrazo;
}
