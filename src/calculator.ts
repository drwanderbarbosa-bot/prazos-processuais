import type { Feriado, OpcoesPrazo, ResultadoPrazo } from './types';
import {
  normalizarData,
  criarData,
  adicionarDias,
  isDiaUtil,
  prorrogarParaDiaUtil,
  formatarData,
  diffDias,
} from './utils';

/**
 * Calcula a data fatal de um prazo processual.
 *
 * Regras aplicadas (CPC/2015):
 * - Art. 219: Prazos em dias uteis excluem sab/dom/feriados.
 * - Art. 224, p1: Vencimento em dia nao util prorroga para proximo dia util.
 * - Art. 224, p3: Dia da publicacao nao eh contado.
 *
 * Para prazos criminais (CPP): dias corridos, com prorrogacao no vencimento.
 *
 * @example
 * ```typescript
 * import { calcularDataFatal, gerarFeriadosNacionais } from '@guardianlegis/prazos-processuais';
 *
 * const feriados = gerarFeriadosNacionais(2026);
 * const resultado = calcularDataFatal({
 *   dataInicio: '2026-03-10',
 *   diasPrazo: 15,
 *   diasUteis: true,
 *   feriados,
 * });
 *
 * console.log(resultado.dataFatalFormatada); // "31/03/2026"
 * ```
 */
export function calcularDataFatal(opcoes: OpcoesPrazo): ResultadoPrazo {
  const {
    dataInicio: dataInicioInput,
    diasPrazo,
    diasUteis = true,
    feriados = [],
  } = opcoes;

  const inicioStr = normalizarData(dataInicioInput);

  if (diasPrazo < 0) {
    throw new Error('diasPrazo deve ser >= 0');
  }

  if (diasPrazo === 0) {
    const prorrogado = prorrogarParaDiaUtil(inicioStr, feriados);
    return {
      dataFatal: criarData(prorrogado),
      dataFatalFormatada: formatarData(prorrogado),
      dataInicio: criarData(inicioStr),
      diasPrazo: 0,
      diasUteis,
      diasCorridos: diffDias(inicioStr, prorrogado),
    };
  }

  let dataFatalStr: string;

  if (!diasUteis) {
    dataFatalStr = adicionarDias(inicioStr, diasPrazo);
    dataFatalStr = prorrogarParaDiaUtil(dataFatalStr, feriados);
  } else {
    let diasContados = 0;
    let dataAtual = inicioStr;

    while (diasContados < diasPrazo) {
      dataAtual = adicionarDias(dataAtual, 1);
      if (isDiaUtil(dataAtual, feriados)) {
        diasContados++;
      }
    }

    dataFatalStr = prorrogarParaDiaUtil(dataAtual, feriados);
  }

  return {
    dataFatal: criarData(dataFatalStr),
    dataFatalFormatada: formatarData(dataFatalStr),
    dataInicio: criarData(inicioStr),
    diasPrazo,
    diasUteis,
    diasCorridos: diffDias(inicioStr, dataFatalStr),
  };
}

/**
 * Calcula os dias restantes ate a data fatal.
 *
 * @param dataFatal - Data fatal do prazo
 * @returns Dias restantes (negativo = vencido)
 */
export function calcularDiasRestantes(dataFatal: string | Date): number {
  const fatalStr = normalizarData(dataFatal);
  const hoje = normalizarData(new Date());
  return diffDias(hoje, fatalStr);
}

/**
 * Conta quantos dias uteis existem entre duas datas.
 *
 * @param dataInicio - Data inicial
 * @param dataFim - Data final
 * @param feriados - Lista de feriados
 * @returns Numero de dias uteis no intervalo (exclusive inicio, inclusive fim)
 */
export function calcularDiasUteis(
  dataInicio: string | Date,
  dataFim: string | Date,
  feriados: Feriado[] = []
): number {
  let inicioStr = normalizarData(dataInicio);
  const fimStr = normalizarData(dataFim);
  let count = 0;

  while (inicioStr < fimStr) {
    inicioStr = adicionarDias(inicioStr, 1);
    if (isDiaUtil(inicioStr, feriados)) {
      count++;
    }
  }

  return count;
}
