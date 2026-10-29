# Shinome E-commerce

E-commerce 100% frontend em **React + TypeScript**, com tema escuro. Não há backend próprio: o app conversa direto com o **Supabase**, e a segurança dos dados fica nas políticas de RLS.

## Stack

| Área          | Ferramenta                                     |
| ------------- | ---------------------------------------------- |
| Build / dev   | Vite 8                                         |
| UI            | React 19 + Tailwind CSS 4 + cva/tailwind-merge |
| Linguagem     | TypeScript 7 em modo estrito máximo            |
| Rotas         | TanStack Router (type-safe)                    |
| Dados remotos | TanStack Query + `@supabase/supabase-js`       |
| Validação     | Zod 4 (inclusive das variáveis de ambiente)    |
| Testes        | Vitest + Testing Library + jsdom               |
| Lint / format | oxlint + Prettier                              |

## Começando

Requer Node 24 (veja `.nvmrc`).

```bash
npm install
cp .env.example .env.local   # preencha com os dados do seu projeto Supabase
npm run dev
```

As variáveis são validadas com Zod quando o cliente Supabase (`src/lib/supabase/client.ts`) é carregado. Se alguma faltar ou for inválida, o erro diz qual.

## Telas

| Rota              | Tela                                                                                       |
| ----------------- | ------------------------------------------------------------------------------------------ |
| `/login`          | Login de demonstração: **qualquer e-mail e senha entram** (não há autenticação real ainda) |
| `/produtos`       | Catálogo: cards dos produtos, busca por nome e filtro por categoria                        |
| `/produtos/:slug` | Página do produto: foto, preço, descrição e destaques                                      |

Sem sessão, qualquer tela da loja leva ao login; com sessão, o login leva ao catálogo. A sessão é só o e-mail guardado no `localStorage` (`src/features/auth/session.ts`), e "Sair" no menu a encerra. Os produtos são um catálogo fixo de demonstração (`src/features/catalog/products.ts`).

## Variáveis de ambiente

| Variável                        | Descrição                                                     |
| ------------------------------- | ------------------------------------------------------------- |
| `VITE_SUPABASE_URL`             | URL do projeto (`https://<ref>.supabase.co`)                  |
| `VITE_SUPABASE_PUBLISHABLE_KEY` | Chave pública (publishable ou anon). **Nunca** a service_role |

Tudo com prefixo `VITE_` vai para o bundle do navegador. Só entram aqui chaves públicas.

## Scripts

| Script              | O que faz                                         |
| ------------------- | ------------------------------------------------- |
| `npm run dev`       | Servidor de desenvolvimento                       |
| `npm run build`     | Typecheck + build de produção                     |
| `npm run test`      | Testes (uma rodada); `test:watch` para modo watch |
| `npm run lint`      | oxlint, com warnings tratados como erro           |
| `npm run typecheck` | `tsc -b`                                          |
| `npm run format`    | Prettier (`format:check` só verifica)             |
| `npm run check`     | Tudo acima, na mesma ordem do CI                  |

## Design system

Todas as telas seguem [`docs/design-system.md`](docs/design-system.md): só Tailwind (sem CSS), só tokens semânticos e os componentes de `src/components/ui`. As regras são verificadas por teste no CI.

## Estrutura

```
src/
  app/        composição: App (providers), router (rotas protegidas) e StoreLayout (header da loja)
  components/ ui/ (primitivos do design system) e brand/ (logo)
  config/     leitura e validação do ambiente (parseEnv é puro e testável)
  features/   regras e dados do domínio: auth/ (sessão de demonstração) e catalog/ (produtos, preço)
  lib/        integrações (Supabase, QueryClient) e utilitários (cn)
  pages/      uma pasta por página, com o teste ao lado do componente
  styles/     tailwind.css: único CSS, só import do Tailwind + tokens
  test/       setup do Vitest e renderApp (renderiza o app com as rotas reais a partir de uma URL)
```

Princípios:

- **Responsabilidade única**: cada módulo faz uma coisa. A config valida, o `lib` integra, as páginas renderizam.
- **Inversão de dependência**: a lógica recebe as dependências por parâmetro (ex.: `parseEnv(source)`), e só a camada de composição liga ao ambiente real.
- **Sem default export** (exceto `vite.config.ts` e os plugins de lint em `lint/`, que o oxlint exige assim). Imports absolutos via `@/`.
- **TDD**: todo comportamento novo começa com um teste falhando.

## Branches e fluxo de trabalho

| Branch | Ambiente                                                                                   |
| ------ | ------------------------------------------------------------------------------------------ |
| `dev`  | Desenvolvimento. Recebe, por PR, todo trabalho novo já encaminhado e funcionando.          |
| `prod` | Produção, o que o usuário final usa. Só recebe, por PR vindo de `dev`, o que foi validado. |

Todo trabalho nasce numa branch + worktree próprios a partir de `dev` e volta por PR. O passo a passo está em [`.claude/rules/fluxo-git.md`](.claude/rules/fluxo-git.md), e as regras de código em [`.claude/rules/INDEX.md`](.claude/rules/INDEX.md).

O CI (`.github/workflows/ci.yml`) roda em push e PR para as duas branches.
