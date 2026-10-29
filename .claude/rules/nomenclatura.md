# Nomenclatura

> Ler antes de: nomear arquivo, componente, função, variável, constante, rota ou branch; tocar um nome existente.

## Regra

1. **Um idioma por camada, nunca misturado no mesmo nome.**
   - **Código em inglês**: identificadores, nomes de arquivo e de pasta, como o React, as bibliotecas e o código que já existe (`ProductCard`, `startSession`, `formatPrice`).
   - **Tudo que uma pessoa lê em pt-BR**: textos da tela, mensagens de erro, `describe`/`it` dos testes, documentação, commits, PRs e rotas visíveis ao usuário (`/produtos`).
   - Proibido o híbrido (`produtoCard`, `getProdutos`, `isLogado`).
2. **Função = verbo concreto + objeto do domínio.** `findProductBySlug`, `formatPrice`, `startSession`. Verbos genéricos são proibidos porque escondem o que a função faz: `handle`, `process`, `manage`, `resolve`, `do`, `run`, `data`. Exceção: o padrão do React para props de evento (`onSubmit`), que nomeia o evento, não a ação; o handler local diz a ação (`const submitLogin = ...`).
3. **Variável = domínio + papel, 1 a 4 palavras.** Nem genérico (`data`, `item`, `result`, `temp`, `obj`, `arr`, `x`, `p` em `map` de negócio), nem prolixo (`filteredProductListForCurrentCategoryView`). Sem sufixo técnico (`Data`, `Obj`, `List`, `Response`) quando o domínio já diz o que é (`products`, não `productsData`).
4. **Regra de negócio tem nome.** Quando um `filter`/`map` embute uma regra, a etapa vira uma constante nomeada (`const visibleProducts = products.filter(matchesSearch)`), não uma chain anônima.
5. **Componente = substantivo do que ele é na tela**: `LoginPage`, `ProductCard`, `CatalogFilters`. Página termina em `Page`. Sem `Wrapper`, `Container2`, `NewCard`, `CustomButton`.
6. **Booleano lê como pergunta**: `isOpen`, `hasStock`, `canSubmit`.
7. **Antes de batizar, procure o termo no repo** (`git grep`). Se ele já nomeia outro conceito, escolha outro nome. Um termo, um significado.
8. **Nome ruim que você toca, você corrige.** O padrão do arquivo vizinho não é autoridade; o trecho que passa pelas suas mãos sai como se fosse código novo.

> **Teste mental:** "Lendo só o nome, sem abrir o código, outra pessoa entende o que isso é ou faz?"

## Anti-padrão → correto

| Proibido                                    | Correto                                          |
| ------------------------------------------- | ------------------------------------------------ |
| `handleData()`, `processItems()`            | `filterProductsByCategory()`, `formatPrice()`    |
| `const data = await ...`, `const res = ...` | `const products = ...`, `const session = ...`    |
| `products.map((p) => ...)`                  | `products.map((product) => ...)`                 |
| `getProdutos`, `isLogado`, `produtoCard`    | `getProducts`, `isSignedIn`, `ProductCard`       |
| `it('should render correctly')`             | `it('mostra o preço formatado em reais')`        |
| `const MAX = 12`                            | `const PRODUCTS_PER_PAGE = 12`                   |
| `open`, `loading` como booleano             | `isOpen`, `isLoading`                            |
| `MyButton`, `CardWrapper`, `NewProductCard` | O nome do papel na tela: `Button`, `ProductCard` |

## Sinal de busca

- `git grep -nE "\b(handle|process|manage|resolve)[A-Z]\w*\s*[=(]" -- src` deve voltar vazio (props `on<Evento>` não casam).
- `git grep -nE "\.(map|filter|find|reduce|some|every)\(\(?[a-z]\b" -- src` deve voltar vazio: parâmetro de uma letra em callback.
