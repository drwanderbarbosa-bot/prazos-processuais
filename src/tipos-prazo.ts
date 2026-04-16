import type { TipoPrazo, CategoriaPrazo } from './types';

/**
 * Tabela de tipos de prazo processual brasileiro.
 * Organizada por categoria com prazos padrao conforme CPC/2015, CPP e CLT.
 */
export const TIPOS_PRAZO: Record<string, Omit<TipoPrazo, 'chave'>> = {
  // === CIVEL (CPC/2015) ===
  contestacao: { nome: 'Contestacao', diasPadrao: 15, diasUteis: true, categoria: 'civel' },
  replica: { nome: 'Replica', diasPadrao: 15, diasUteis: true, categoria: 'civel' },
  impugnacao: { nome: 'Impugnacao', diasPadrao: 15, diasUteis: true, categoria: 'civel' },
  reconvencao: { nome: 'Reconvencao', diasPadrao: 15, diasUteis: true, categoria: 'civel' },
  cumprimento_sentenca: { nome: 'Cumprimento de Sentenca', diasPadrao: 15, diasUteis: true, categoria: 'civel' },
  embargos_execucao: { nome: 'Embargos a Execucao', diasPadrao: 15, diasUteis: true, categoria: 'civel' },
  embargos_terceiro: { nome: 'Embargos de Terceiro', diasPadrao: 15, diasUteis: true, categoria: 'civel' },
  memoriais: { nome: 'Memoriais', diasPadrao: 15, diasUteis: true, categoria: 'civel' },
  alegacoes_finais: { nome: 'Alegacoes Finais', diasPadrao: 15, diasUteis: true, categoria: 'civel' },
  especificacao_provas: { nome: 'Especificacao de Provas', diasPadrao: 10, diasUteis: true, categoria: 'civel' },

  // === RECURSOS CIVEIS ===
  recurso_apelacao: { nome: 'Apelacao', diasPadrao: 15, diasUteis: true, categoria: 'recurso_civel' },
  recurso_agravo: { nome: 'Agravo de Instrumento', diasPadrao: 15, diasUteis: true, categoria: 'recurso_civel' },
  agravo_interno: { nome: 'Agravo Interno', diasPadrao: 15, diasUteis: true, categoria: 'recurso_civel' },
  embargos_declaracao: { nome: 'Embargos de Declaracao (Civel)', diasPadrao: 5, diasUteis: true, categoria: 'recurso_civel' },
  recurso_especial: { nome: 'Recurso Especial', diasPadrao: 15, diasUteis: true, categoria: 'recurso_civel' },
  recurso_extraordinario: { nome: 'Recurso Extraordinario', diasPadrao: 15, diasUteis: true, categoria: 'recurso_civel' },
  contrarrazoes: { nome: 'Contrarrazoes', diasPadrao: 15, diasUteis: true, categoria: 'recurso_civel' },

  // === CRIMINAL (CPP) - DIAS CORRIDOS ===
  defesa_previa_criminal: { nome: 'Defesa Previa (Criminal)', diasPadrao: 10, diasUteis: false, categoria: 'criminal' },
  resposta_acusacao: { nome: 'Resposta a Acusacao', diasPadrao: 10, diasUteis: false, categoria: 'criminal' },
  alegacoes_finais_criminal: { nome: 'Alegacoes Finais (Criminal)', diasPadrao: 5, diasUteis: false, categoria: 'criminal' },
  apelacao_criminal: { nome: 'Apelacao Criminal', diasPadrao: 5, diasUteis: false, categoria: 'criminal' },
  rese: { nome: 'Recurso em Sentido Estrito', diasPadrao: 5, diasUteis: false, categoria: 'criminal' },
  embargos_declaracao_criminal: { nome: 'Embargos de Declaracao (Criminal)', diasPadrao: 2, diasUteis: false, categoria: 'criminal' },
  habeas_corpus: { nome: 'Habeas Corpus', diasPadrao: 0, diasUteis: false, categoria: 'criminal' },

  // === TRABALHISTA (CLT) - DIAS UTEIS ===
  defesa_trabalhista: { nome: 'Defesa Trabalhista', diasPadrao: 15, diasUteis: true, categoria: 'trabalhista' },
  recurso_ordinario: { nome: 'Recurso Ordinario', diasPadrao: 8, diasUteis: true, categoria: 'trabalhista' },
  recurso_revista: { nome: 'Recurso de Revista', diasPadrao: 8, diasUteis: true, categoria: 'trabalhista' },
  agravo_peticao: { nome: 'Agravo de Peticao', diasPadrao: 8, diasUteis: true, categoria: 'trabalhista' },
  embargos_declaracao_trab: { nome: 'Embargos de Declaracao (Trabalhista)', diasPadrao: 5, diasUteis: true, categoria: 'trabalhista' },
  contrarrazoes_trab: { nome: 'Contrarrazoes (Trabalhista)', diasPadrao: 8, diasUteis: true, categoria: 'trabalhista' },

  // === ADMINISTRATIVO ===
  recurso_administrativo: { nome: 'Recurso Administrativo', diasPadrao: 15, diasUteis: true, categoria: 'administrativo' },
  defesa_administrativa: { nome: 'Defesa Administrativa', diasPadrao: 15, diasUteis: true, categoria: 'administrativo' },
  mandado_seguranca: { nome: 'Mandado de Seguranca', diasPadrao: 120, diasUteis: false, categoria: 'administrativo' },

  // === GENERICO ===
  manifestacao: { nome: 'Manifestacao nos Autos', diasPadrao: 15, diasUteis: true, categoria: 'geral' },
  peticao_simples: { nome: 'Peticao Simples', diasPadrao: 5, diasUteis: true, categoria: 'geral' },
  outro: { nome: 'Outro (livre)', diasPadrao: 15, diasUteis: true, categoria: 'geral' },
};

/**
 * Retorna um tipo de prazo completo pela chave.
 */
export function getTipoPrazo(chave: string): TipoPrazo | undefined {
  const tipo = TIPOS_PRAZO[chave];
  if (!tipo) return undefined;
  return { chave, ...tipo };
}

/**
 * Lista todos os tipos de prazo de uma categoria.
 */
export function listarTiposPorCategoria(categoria: CategoriaPrazo): TipoPrazo[] {
  return Object.entries(TIPOS_PRAZO)
    .filter(([, v]) => v.categoria === categoria)
    .map(([chave, v]) => ({ chave, ...v }));
}
