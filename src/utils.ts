import type { Feriado } from './types';

/**
 * Normaliza uma data para string YYYY-MM-DD.
 */
export function normalizarData(data: string | Date): string {
  if (typeof data === 'string') {
    if (/^\d{4}-\d{2}-\d{2}$/.test(data)) return data;
    return data.slice(0, 10);
  }
  const y = data.getFullYear();
  const m = String(data.getMonth() + 1).padStart(2, '0');
  const d = String(data.getDate()).padStart(2, '0');
  return `${y}-${m}-${d}`;
}

/**
 * Cria um Date a partir de string YYYY-MM-DD, fixando hora em 12:00
 * para evitar problemas de timezone (UTC-3 -> dia anterior).
 */
export function criarData(dataStr: string): Date {
  const [y, m, d] = dataStr.split('-').map(Number);
  return new Date(y, m - 1, d, 12, 0, 0);
}

function diaDaSemana(dataStr: string): number {
  return criarData(dataStr).getDay();
}

/**
 * Verifica se uma data eh fim de semana.
 */
export function isWeekend(data: string | Date): boolean {
  const str = normalizarData(data);
  const dow = diaDaSemana(str);
  return dow === 0 || dow === 6;
}

/**
 * Verifica se uma data eh feriado na lista fornecida.
 */
export function isFeriado(data: string | Date, feriados: Feriado[]): boolean {
  const str = normalizarData(data);
  return feriados.some((f) => normalizarData(f.data) === str);
}

/**
 * Verifica se uma data eh dia util (nao eh fds nem feriado).
 */
export function isDiaUtil(data: string | Date, feriados: Feriado[]): boolean {
  return !isWeekend(data) && !isFeriado(data, feriados);
}

/**
 * Adiciona N dias a uma data string YYYY-MM-DD.
 */
export function adicionarDias(dataStr: string, dias: number): string {
  const date = criarData(dataStr);
  date.setDate(date.getDate() + dias);
  return normalizarData(date);
}

/**
 * Se a data cai em fds/feriado, prorroga para o proximo dia util.
 * Art. 224, p1, CPC/2015.
 */
export function prorrogarParaDiaUtil(data: string | Date, feriados: Feriado[]): string {
  let str = normalizarData(data);
  while (!isDiaUtil(str, feriados)) {
    str = adicionarDias(str, 1);
  }
  return str;
}

/**
 * Formata YYYY-MM-DD para DD/MM/YYYY.
 */
export function formatarData(dataStr: string): string {
  const [y, m, d] = dataStr.split('-');
  return `${d}/${m}/${y}`;
}

/**
 * Calcula diferenca em dias corridos entre duas datas YYYY-MM-DD.
 */
export function diffDias(dataInicio: string, dataFim: string): number {
  const inicio = criarData(dataInicio);
  const fim = criarData(dataFim);
  return Math.round((fim.getTime() - inicio.getTime()) / (1000 * 60 * 60 * 24));
}
