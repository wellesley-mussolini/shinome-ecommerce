# Código: `const`, sem gambiarra, sem overengineering

> Ler antes de: escrever ou editar qualquer código, revisar o próprio diff.

## Regra

1. **Só `const`.** `let` e `var` são proibidos no repositório inteiro. Valor que muda ao longo de um bloco é sinal de que o bloco faz coisa demais: troque por uma expressão (`map`, `filter`, `reduce`, ternário), por um retorno antecipado ou por uma função com nome. Estado de tela é `useState`/`useReducer`, nunca variável reatribuída. Verificado pelo lint: a regra `shinome/only-const` (`lint/code-rules-plugin.mjs`) lê a AST, então não confunde `let` dentro de um texto com uma declaração.
2. **Sem gambiarra.** Gambiarra é qualquer coisa que faz o sintoma sumir sem resolver a causa: `as any`, `as unknown as`, `@ts-ignore`/`@ts-expect-error`, `// oxlint-disable`, `!` (non-null assertion), `setTimeout` para "esperar" um estado, `try/catch` vazio, `key={Math.random()}`, cópia de bloco "só para funcionar". Se o tipo ou o lint reclamam, o modelo está errado: corrija o modelo.
3. **Sem fallback que esconde erro.** Se o contrato garante o valor (tipo obrigatório, schema Zod, dado do próprio código), use direto: sem `??`, `||` ou `if (!x) return null`. Valor que pode faltar de verdade (entrada do usuário, `localStorage`, URL) é validado **na borda** e quebra alto (`throw`) ou vira um estado explícito da tela (erro, vazio). Guard quebra alto; fallback mascara.
4. **Sem overengineering.** Abstração só com necessidade concreta **hoje**: dois ou mais usos reais, uma fronteira real (Supabase, `localStorage`, relógio, rede) ou uma regra de domínio que merece nome. Proibido por futuro hipotético: wrapper que só repassa props, arquivo-ponte só com re-export, "util genérico" com um uso, factory/provider/contexto para um valor que cabe numa prop, configuração para algo que nunca varia.
5. **Sem código morto.** Nada de código comentado, `TODO` sem dono, export sem uso, prop que ninguém passa, botão que não faz nada. Funcionalidade que não existe não aparece na tela.
6. **Comentário explica o porquê**, nunca traduz a linha. Decisão não óbvia, limitação ou regra de negócio: comente. O resto o nome resolve.

> **Teste mental:** "Um revisor que não me conhece entenderia esse trecho sem eu explicar, e concordaria que não havia caminho mais direto?"

## Anti-padrão → correto

| Proibido                                                             | Correto                                                                                           |
| -------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------- |
| `let total = 0; for (...) total += cartItem.price`                   | `const total = cartItems.reduce((sum, cartItem) => sum + cartItem.price, 0)`                      |
| `let stockLabel; if (hasStock) stockLabel = ...; else ...`           | `const stockLabel = hasStock ? 'Em estoque' : 'Esgotado'`, ou uma função com retornos antecipados |
| `const user = data as any` / `@ts-ignore`                            | Tipar a origem (schema Zod na borda, tipo correto no retorno)                                     |
| `product!.name`                                                      | Tratar o "não encontrado" na borda (rota 404, `throw`) e seguir com o tipo certo                  |
| `const price = product.price ?? 0` com `price` obrigatório no tipo   | `product.price`                                                                                   |
| `JSON.parse(localStorage.getItem(k) \|\| '{}')`                      | Ler, validar com Zod e tratar o inválido como "sem sessão" de forma explícita                     |
| `setTimeout(() => setOpen(true), 50)` para "dar tempo" de renderizar | Achar a causa (ordem de efeitos, chave, estado derivado) e corrigir                               |
| `<Card {...props} />` num `MyCard` que não acrescenta nada           | Usar `Card` direto                                                                                |
| `utils/formatters.ts` com uma função usada num lugar só              | A função mora ao lado do único uso; sobe para módulo próprio no segundo uso                       |
| Código comentado "para depois", `TODO: melhorar`                     | Apagar; o histórico do git guarda                                                                 |
| `// incrementa o contador` acima de `count + 1`                      | Sem comentário; ou um comentário com o porquê, se houver                                          |

## Sinal de busca

- `let`/`var`: `npm run lint` (regra `shinome/only-const`) é a fonte da verdade e quebra o CI.
- `@ts-ignore`/`@ts-expect-error`, `catch` vazio, `any` e `!`: o lint já quebra o CI (`typescript/ban-ts-comment`, `no-empty`, `typescript/no-explicit-any`, `typescript/no-non-null-assertion`).
- `git grep -nE "as unknown as|oxlint-disable" -- src` deve voltar vazio.
- `git grep -nE "\?\?|\|\| ['\"0\[{]" -- src` é julgamento: cada ocorrência precisa ser borda de entrada real, nunca valor garantido pelo tipo.
