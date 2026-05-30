# Inventário de Staging — `prazos-processuais`

> **Fase 0 — Diagnóstico e Inventário** · GuardianLegis (plataforma multi-produto)  
> **Papel:** **Biblioteca** de cálculo de prazos processuais (pacote npm publicável), consumida por outros serviços.  
> **Stack:** Biblioteca TypeScript (build via tsup)  
> **Data:** 2026-05-30  
> **Branch de trabalho:** `claude/serene-hawking-V9cvL` (base: `main`)

> ⚠️ Documento de diagnóstico da Fase 0. **Nenhum código de aplicação foi alterado.**

> ℹ️ Este repo é uma **biblioteca**, não um serviço — entra no staging como dependência (build/publicação ou via workspace), não como processo em execução.

## 1. Branch e working tree

| Item | Valor |
|------|-------|
| Branch ativa | `claude/serene-hawking-V9cvL` |
| Branch base (default) | `main` |
| Working tree | Limpo no início da Fase 0 |
| Sincronia com `origin` | 0 à frente / 0 atrás |

## 2. Gerenciador de pacotes e runtime

| Item | Valor |
|------|-------|
| Runtime | Node |
| Gerenciador de pacotes | `npm` (`package-lock.json` ✅) |
| Lockfile | `package-lock.json` presente; tem `.npmignore` |
| Versão esperada | `engines`: `node >=16.0.0` |
| `.nvmrc` | ❌ ausente |

## 3. Configuração de ambiente e deploy

| Arquivo | Status |
|---------|--------|
| `.env.example` | ❌ ausente |
| `.env.staging` | ❌ ausente |
| `docker-compose*` | ❌ ausente |
| `Dockerfile*` | ❌ ausente |
| CI (`.github/workflows`) | ❌ ausente |
| Outros | `vitest.config.ts`, `__tests__/`, `.npmignore`, `LICENSE` |

## 4. Componentes, build e testes

- **`@guardianlegis/prazos-processuais`** — Lib TS (tsup → cjs/esm/dts) — porta: N/A
  - Scripts: `build` (tsup --dts --clean), `test` (**vitest**), `test:watch`, `lint` (tsc --noEmit), `prepublishOnly`

## 5. Portas e dependências externas

- **Porta(s):** N/A (não é serviço)
- **Dependências externas:**
  - Nenhuma (biblioteca pura, sem I/O externo declarado)

## 6. Observações para o staging

- É **biblioteca** — não há porta nem `.env`.
- Tem testes (vitest). **Sem CI** para build/publicação.
- No staging, garantir versão/publicação consistente para os serviços que a consomem.

---

_Relatório gerado na Fase 0 (diagnóstico). Próximo passo: aguardar revisão antes da Fase 1._
