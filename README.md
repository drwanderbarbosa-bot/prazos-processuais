# @guardianlegis/prazos-processuais

Calculador de prazos processuais brasileiros. Zero dependencias. Suporte completo a dias uteis, feriados nacionais (fixos e moveis), feriados estaduais/municipais/forenses e regras do CPC/2015, CPP e CLT.

[![npm version](https://img.shields.io/npm/v/@guardianlegis/prazos-processuais.svg)](https://www.npmjs.com/package/@guardianlegis/prazos-processuais)
[![license](https://img.shields.io/npm/l/@guardianlegis/prazos-processuais.svg)](https://github.com/guardianlegis/prazos-processuais/blob/main/LICENSE)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.x-blue.svg)](https://www.typescriptlang.org/)

---

## Instalacao

```bash
npm install @guardianlegis/prazos-processuais
```

## Uso rapido

```typescript
import {
  calcularDataFatal,
  gerarFeriadosNacionais,
  getTipoPrazo,
} from '@guardianlegis/prazos-processuais';

// Gerar feriados nacionais para 2026 (fixos + moveis automaticamente)
const feriados = gerarFeriadosNacionais(2026);

// Calcular prazo de contestacao (15 dias uteis, CPC Art. 335)
const resultado = calcularDataFatal({
  dataInicio: '2026-03-10',  // data da publicacao/intimacao
  diasPrazo: 15,
  diasUteis: true,            // padrao CPC/2015
  feriados,
});

console.log(resultado.dataFatalFormatada); // "31/03/2026"
console.log(resultado.diasCorridos);       // 21

// Usar a tabela de tipos de prazo
const tipo = getTipoPrazo('contestacao');
// { chave: 'contestacao', nome: 'Contestacao', diasPadrao: 15, diasUteis: true, categoria: 'civel' }
```

## Funcionalidades

### Calculo de prazos

- **Dias uteis** (CPC/2015 Art. 219): exclui sabados, domingos e feriados
- **Dias corridos** (CPP): soma direta com prorrogacao se vencimento em dia nao util
- **Prorrogacao automatica** (Art. 224 p1): vencimento em fds/feriado prorroga para proximo dia util
- **Dia da publicacao nao contado** (Art. 224 p3): contagem inicia no dia seguinte

### Feriados

- **9 feriados nacionais fixos** incluindo Dia da Consciencia Negra
- **5 feriados moveis** calculados automaticamente (Carnaval, Sexta-feira Santa, Pascoa, Corpus Christi)
- **Suporte a feriados customizados**: estaduais, municipais e forenses

### Tabela de tipos de prazo

- **40+ tipos** organizados por categoria
- Categorias: civel, recurso_civel, criminal, trabalhista, administrativo, geral
- Cada tipo com nome, prazo padrao e indicacao de dias uteis/corridos

## API

### `calcularDataFatal(opcoes)`

```typescript
interface OpcoesPrazo {
  dataInicio: string | Date;   // YYYY-MM-DD ou Date
  diasPrazo: number;           // numero de dias
  diasUteis?: boolean;         // default: true (CPC/2015)
  feriados?: Feriado[];        // lista de feriados
}

interface ResultadoPrazo {
  dataFatal: Date;
  dataFatalFormatada: string;  // DD/MM/YYYY
  dataInicio: Date;
  diasPrazo: number;
  diasUteis: boolean;
  diasCorridos: number;
}
```

### `calcularDiasRestantes(dataFatal)`

Retorna dias restantes ate a data fatal. Negativo = vencido.

### `calcularDiasUteis(dataInicio, dataFim, feriados?)`

Conta dias uteis entre duas datas (exclusive inicio, inclusive fim).

### `gerarFeriadosNacionais(anos)`

Gera todos os feriados nacionais (fixos + moveis) para um ou mais anos.

```typescript
const feriados = gerarFeriadosNacionais(2026);
const feriadosMulti = gerarFeriadosNacionais([2026, 2027, 2028]);
```

### `gerarFeriadosMoveis(ano)`

Gera apenas os feriados moveis (Carnaval, Sexta-Santa, Pascoa, Corpus Christi).

### Utilitarios

```typescript
import { isFeriado, isWeekend, isDiaUtil, prorrogarParaDiaUtil } from '@guardianlegis/prazos-processuais';

isFeriado('2026-12-25', feriados);           // true
isWeekend('2026-03-14');                      // true (sabado)
isDiaUtil('2026-03-16', feriados);            // true (segunda)
prorrogarParaDiaUtil('2026-03-14', feriados); // '2026-03-16'
```

### Tipos de prazo

```typescript
import { getTipoPrazo, listarTiposPorCategoria, TIPOS_PRAZO } from '@guardianlegis/prazos-processuais';

getTipoPrazo('apelacao_criminal');
// { chave: 'apelacao_criminal', nome: 'Apelacao Criminal', diasPadrao: 5, diasUteis: false, categoria: 'criminal' }

listarTiposPorCategoria('trabalhista');
// [{ chave: 'defesa_trabalhista', ... }, { chave: 'recurso_ordinario', ... }, ...]
```

## Feriados customizados

Adicione feriados estaduais, municipais ou forenses:

```typescript
import { calcularDataFatal, gerarFeriadosNacionais, Feriado } from '@guardianlegis/prazos-processuais';

const nacionais = gerarFeriadosNacionais(2026);

const feriadosSP: Feriado[] = [
  { data: '2026-01-25', nome: 'Aniversario de Sao Paulo', tipo: 'municipal', municipio: 'Sao Paulo' },
  { data: '2026-07-09', nome: 'Revolucao Constitucionalista', tipo: 'estadual', uf: 'SP' },
];

// Feriados forenses (recesso, suspensoes)
const forenses: Feriado[] = [
  { data: '2026-12-20', nome: 'Recesso Forense', tipo: 'forense', tribunal: 'TJSP' },
  // ... ate 06/01
];

const todosFeriados = [...nacionais, ...feriadosSP, ...forenses];

const resultado = calcularDataFatal({
  dataInicio: '2026-01-20',
  diasPrazo: 15,
  diasUteis: true,
  feriados: todosFeriados,
});
```

## Compatibilidade

- **Node.js** >= 16
- **Browser** (via bundler)
- **Deno**, **Bun**
- **Zero dependencias** em runtime
- Exports CJS + ESM + TypeScript declarations

## Regras processuais implementadas

| Regra | Artigo | Implementacao |
|-------|--------|---------------|
| Prazos em dias uteis | CPC Art. 219 | `diasUteis: true` (padrao) |
| Prorrogacao para dia util | CPC Art. 224 p1 | Automatica |
| Publicacao nao conta | CPC Art. 224 p3 | Contagem inicia no dia seguinte |
| Dias corridos (criminal) | CPP | `diasUteis: false` |
| Dias uteis (trabalhista) | CLT + Reforma | `diasUteis: true` |

## Contribuindo

Contribuicoes sao bem-vindas. Para feriados estaduais/municipais/forenses de novas localidades, abra uma issue ou PR.

```bash
git clone https://github.com/guardianlegis/prazos-processuais.git
cd prazos-processuais
npm install
npm test
```

## Licenca

MIT - [Guardian Legis](https://guardianlegis.com.br)

---

**Desenvolvido por [Guardian Legis](https://guardianlegis.com.br)** — Tecnologia juridica de alta performance.
