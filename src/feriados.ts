import type { Feriado } from './types';

/**
 * Feriados nacionais fixos do Brasil.
 */
export const FERIADOS_NACIONAIS_FIXOS: Array<{ mes: number; dia: number; nome: string }> = [
  { mes: 1, dia: 1, nome: 'Confraternizacao Universal' },
  { mes: 4, dia: 21, nome: 'Tiradentes' },
  { mes: 5, dia: 1, nome: 'Dia do Trabalho' },
  { mes: 9, dia: 7, nome: 'Independencia do Brasil' },
  { mes: 10, dia: 12, nome: 'Nossa Senhora Aparecida' },
  { mes: 11, dia: 2, nome: 'Finados' },
  { mes: 11, dia: 15, nome: 'Proclamacao da Republica' },
  { mes: 11, dia: 20, nome: 'Dia da Consciencia Negra' },
  { mes: 12, dia: 25, nome: 'Natal' },
];

/**
 * Calcula a data da Pascoa pelo algoritmo de Meeus/Jones/Butcher.
 */
function calcularPascoa(ano: number): string {
  const a = ano % 19;
  const b = Math.floor(ano / 100);
  const c = ano % 100;
  const d = Math.floor(b / 4);
  const e = b % 4;
  const f = Math.floor((b + 8) / 25);
  const g = Math.floor((b - f + 1) / 3);
  const h = (19 * a + b - d - g + 15) % 30;
  const i = Math.floor(c / 4);
  const k = c % 4;
  const l = (32 + 2 * e + 2 * i - h - k) % 7;
  const m = Math.floor((a + 11 * h + 22 * l) / 451);
  const mes = Math.floor((h + l - 7 * m + 114) / 31);
  const dia = ((h + l - 7 * m + 114) % 31) + 1;
  return `${ano}-${String(mes).padStart(2, '0')}-${String(dia).padStart(2, '0')}`;
}

function addDays(dateStr: string, days: number): string {
  const [y, m, d] = dateStr.split('-').map(Number);
  const date = new Date(y, m - 1, d, 12, 0, 0);
  date.setDate(date.getDate() + days);
  const ny = date.getFullYear();
  const nm = String(date.getMonth() + 1).padStart(2, '0');
  const nd = String(date.getDate()).padStart(2, '0');
  return `${ny}-${nm}-${nd}`;
}

/**
 * Gera os feriados moveis para um ano (baseados na Pascoa).
 *
 * - Carnaval (segunda e terca): Pascoa - 48 e - 47 dias
 * - Sexta-feira Santa: Pascoa - 2 dias
 * - Corpus Christi: Pascoa + 60 dias
 */
export function gerarFeriadosMoveis(ano: number): Feriado[] {
  const pascoa = calcularPascoa(ano);
  return [
    { data: addDays(pascoa, -48), nome: 'Carnaval (segunda)', tipo: 'nacional' },
    { data: addDays(pascoa, -47), nome: 'Carnaval (terca)', tipo: 'nacional' },
    { data: addDays(pascoa, -2), nome: 'Sexta-feira Santa', tipo: 'nacional' },
    { data: pascoa, nome: 'Pascoa', tipo: 'nacional' },
    { data: addDays(pascoa, 60), nome: 'Corpus Christi', tipo: 'nacional' },
  ];
}

/**
 * Gera todos os feriados nacionais (fixos + moveis) para um ou mais anos.
 *
 * @example
 * ```typescript
 * const feriados2026 = gerarFeriadosNacionais(2026);
 * const feriados2anos = gerarFeriadosNacionais([2026, 2027]);
 * ```
 */
export function gerarFeriadosNacionais(anos: number | number[]): Feriado[] {
  const listaAnos = Array.isArray(anos) ? anos : [anos];
  const feriados: Feriado[] = [];

  for (const ano of listaAnos) {
    for (const f of FERIADOS_NACIONAIS_FIXOS) {
      feriados.push({
        data: `${ano}-${String(f.mes).padStart(2, '0')}-${String(f.dia).padStart(2, '0')}`,
        nome: f.nome,
        tipo: 'nacional',
      });
    }
    feriados.push(...gerarFeriadosMoveis(ano));
  }

  return feriados;
}
