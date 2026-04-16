import { describe, it, expect } from 'vitest';
import { calcularDataFatal, calcularDiasUteis } from '../src/calculator';
import { gerarFeriadosNacionais } from '../src/feriados';

const feriados2026 = gerarFeriadosNacionais(2026);

describe('calcularDataFatal', () => {
  it('15 dias uteis - contestacao CPC', () => {
    const r = calcularDataFatal({
      dataInicio: '2026-03-10', diasPrazo: 15, diasUteis: true, feriados: feriados2026,
    });
    expect(r.dataFatalFormatada).toBe('31/03/2026');
  });

  it('5 dias corridos - criminal CPP', () => {
    const r = calcularDataFatal({
      dataInicio: '2026-03-10', diasPrazo: 5, diasUteis: false, feriados: feriados2026,
    });
    expect(r.dataFatalFormatada).toBe('16/03/2026');
  });

  it('prorrogacao em feriado (Tiradentes)', () => {
    const r = calcularDataFatal({
      dataInicio: '2026-04-16', diasPrazo: 5, diasUteis: false, feriados: feriados2026,
    });
    expect(r.dataFatalFormatada).toBe('22/04/2026');
  });

  it('prazo zero prorroga fds', () => {
    const r = calcularDataFatal({
      dataInicio: '2026-03-14', diasPrazo: 0, diasUteis: false, feriados: feriados2026,
    });
    expect(r.dataFatalFormatada).toBe('16/03/2026');
  });

  it('funciona sem feriados', () => {
    const r = calcularDataFatal({ dataInicio: '2026-03-06', diasPrazo: 5, diasUteis: true });
    expect(r.dataFatalFormatada).toBe('13/03/2026');
  });

  it('Carnaval 2026', () => {
    const r = calcularDataFatal({
      dataInicio: '2026-02-13', diasPrazo: 5, diasUteis: true, feriados: feriados2026,
    });
    expect(r.dataFatalFormatada).toBe('24/02/2026');
  });

  it('erro para diasPrazo negativo', () => {
    expect(() => calcularDataFatal({ dataInicio: '2026-03-10', diasPrazo: -1 })).toThrow();
  });

  it('aceita Date como entrada', () => {
    const r = calcularDataFatal({
      dataInicio: new Date(2026, 2, 10, 12, 0, 0), diasPrazo: 5, diasUteis: true, feriados: feriados2026,
    });
    expect(r.dataFatalFormatada).toBe('17/03/2026');
  });
});

describe('calcularDiasUteis', () => {
  it('conta dias uteis entre datas', () => {
    const r = calcularDiasUteis('2026-03-02', '2026-03-06', feriados2026);
    expect(r).toBe(4);
  });
});

describe('gerarFeriadosNacionais', () => {
  it('gera fixos e moveis', () => {
    const f = gerarFeriadosNacionais(2026);
    const nomes = f.map(x => x.nome);
    expect(nomes).toContain('Natal');
    expect(nomes).toContain('Pascoa');
    expect(nomes).toContain('Carnaval (terca)');
    expect(nomes).toContain('Corpus Christi');
    expect(nomes).toContain('Dia da Consciencia Negra');
  });

  it('aceita array de anos', () => {
    const f = gerarFeriadosNacionais([2026, 2027]);
    expect(f.length).toBeGreaterThan(20);
  });
});
