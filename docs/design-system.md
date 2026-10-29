# Design System — Shinome

Toda tela segue este documento. O objetivo é um só: **nenhuma decisão visual aleatória**. Cor, espaço, tipografia e forma saem sempre dos tokens e dos componentes daqui. Se algo não cabe no sistema, o sistema é que muda (neste documento e em `src/styles/tailwind.css`), nunca a tela isoladamente.

## Regras inegociáveis

1. **Só Tailwind, sem CSS.** O único arquivo CSS é `src/styles/tailwind.css`, que apenas importa o Tailwind e declara tokens no `@theme`. Não existe seletor, `@layer`, `@apply` ou `.module.css`.
2. **Sem estilo inline** (`style={...}`).
3. **Sem valores arbitrários** (`w-[37px]`, `bg-[#111]`, `mt-[13px]`). Se faltar um valor, crie um token.
4. **Só cores semânticas.** A paleta padrão do Tailwind está desligada (`--color-*: initial`), então `bg-zinc-900` ou `text-white` nem geram classe.
5. **Use os componentes de `src/components/ui`** antes de escrever classes soltas. Botão é sempre `<Button>`, título é sempre `<Heading>`, texto corrido é sempre `<Text>`, largura de página é sempre `<Container>`.
6. **Só dark mode.** Os tokens já são a paleta escura; não existe tema claro nem prefixo `dark:`.
7. **Uma tela, um sistema.** Toda tela usa os mesmos tokens, componentes, espaçamentos e padrões de layout. Nada de uma tela num estilo e outra noutro.

As regras 1 a 4 e 6 são verificadas por `src/design-system.guard.test.ts`: quebrar uma delas quebra o CI.

## Aceternity UI

Para efeitos e componentes visuais (spotlight, cards com hover animado, fundos, navegação), a primeira fonte é o [Aceternity UI](https://ui.aceternity.com/components): muita coisa pronta e bem desenhada. O código de lá, porém, vem com cores fixas (`bg-zinc-800`, `#3b82f6`), valores arbitrários (`p-[2px]`), `style={}`, `let`, `any` e prefixo `dark:`, tudo proibido aqui. Por isso **o componente nunca é colado como veio: ele é adaptado**.

1. Pegue o código no registry (`https://ui.aceternity.com/registry/<componente>.json`) e use como referência visual e de animação.
2. Reescreva no padrão do repo: cores por token, escala padrão do Tailwind, animação pelas props do [`motion`](https://motion.dev) (`initial`, `animate`, `whileHover`, `layoutId`) em vez de `style` (a dependência entra junto com o primeiro componente que a usar), só `const`, tipos explícitos, sem `dark:`.
3. Corrija a acessibilidade: elemento clicável é `<button>` ou `<a>`, decorativo leva `aria-hidden`, foco visível com o token `focus`.
4. Se o componente é genérico, ele entra em `src/components/ui` com teste e uma linha na tabela de componentes abaixo; se serve a uma tela só, mora ao lado dela.
5. Efeito que só funciona com `style` dinâmico (por exemplo, o brilho que segue o mouse do `Input` deles) fica de fora até existir uma forma de fazê-lo com tokens.

## Tokens

### Cores

| Token                                      | Uso                                                    |
| ------------------------------------------ | ------------------------------------------------------ |
| `bg`                                       | Fundo da página                                        |
| `surface`                                  | Cartões, painéis, inputs                               |
| `surface-raised`                           | Superfície sobre surface (hover, menus, modais)        |
| `border`                                   | Divisórias e bordas padrão                             |
| `border-strong`                            | Bordas que precisam aparecer (botão secundário, input) |
| `fg`                                       | Texto principal                                        |
| `fg-muted`                                 | Texto secundário (descrições, legendas)                |
| `fg-subtle`                                | Texto terciário (placeholders, metadados)              |
| `brand`                                    | Cor da logo                                            |
| `primary` / `primary-fg` / `primary-hover` | Ação principal da tela (CTA)                           |
| `danger` / `danger-fg`                     | Ações destrutivas e erros                              |
| `success`                                  | Confirmações                                           |
| `focus`                                    | Anel de foco (`focus-visible:outline-focus`)           |

A identidade é monocromática, como a logo: a ação principal é clara sobre fundo escuro. Cor saturada aparece só para estado (`danger`, `success`).

### Tipografia

Uma família só (`font-sans`, a fonte do sistema). Os títulos usam a escala do `<Heading>`:

| Nível | Classes                                             | Uso             |
| ----- | --------------------------------------------------- | --------------- |
| 1     | `text-4xl sm:text-5xl font-semibold tracking-tight` | Um por página   |
| 2     | `text-3xl font-semibold tracking-tight`             | Seções          |
| 3     | `text-xl font-semibold`                             | Cartões, blocos |
| 4     | `text-lg font-medium`                               | Subtítulos      |

Texto corrido: `<Text size="sm" | "md" | "lg" tone="default" | "muted" | "subtle" | "danger">`. O tom `danger` é para mensagens de erro, ligadas ao campo por `id` + `aria-describedby`.

### Espaçamento

Escala padrão do Tailwind (múltiplos de 4px). Para manter o ritmo, use preferencialmente:

- **Entre elementos relacionados:** `gap-2` (8px) e `gap-4` (16px)
- **Entre blocos de uma seção:** `gap-6` e `gap-8`
- **Entre seções da página:** `py-12` e `py-16`
- **Laterais da página:** sempre o `<Container>` (`px-4 sm:px-6 lg:px-8`, `max-w-7xl`)

### Raio

`rounded-sm` (4px) para foco e detalhes, `rounded-md` (8px) para botões e inputs, `rounded-lg` (12px) para cartões e modais, `rounded-full` para avatares e badges. Não existem outros.

### Altura de controles

Botões e inputs compartilham a escala: `h-8` (sm), `h-10` (md, padrão) e `h-12` (lg). Elementos lado a lado ficam alinhados porque têm a mesma altura.

## Componentes

| Componente  | Onde                              | Quando usar                                           |
| ----------- | --------------------------------- | ----------------------------------------------------- |
| `Container` | `src/components/ui/Container.tsx` | Toda largura de conteúdo de página                    |
| `Heading`   | `src/components/ui/Heading.tsx`   | Todo título (`level` define tag e escala)             |
| `Text`      | `src/components/ui/Text.tsx`      | Todo texto corrido                                    |
| `Button`    | `src/components/ui/Button.tsx`    | Toda ação (`primary`, `secondary`, `ghost`, `danger`) |
| `Logo`      | `src/components/brand/Logo.tsx`   | A marca. Cor via `text-brand`, tamanho via altura     |
| `Input`     | `src/components/ui/Input.tsx`     | Todo campo de texto (adaptado do Aceternity)          |
| `Label`     | `src/components/ui/Label.tsx`     | Rótulo de campo; `htmlFor` é obrigatório              |
| `Spotlight` | `src/components/ui/Spotlight.tsx` | Luz decorativa de fundo (Aceternity), em tela cheia   |

Efeitos do Aceternity que servem a uma tela só moram ao lado dela: o _Card Hover_ do catálogo está em `src/pages/catalog/ProductGrid.tsx`.

Para combinar classes, use `cn()` (`src/lib/cn.ts`): ele resolve conflitos (`px-4` + `px-8` → `px-8`), então o `className` de quem chama sempre vence.

## Criando um componente novo

1. Primeiro, confira se dá para compor com o que já existe.
2. Variantes ficam em `cva`, com nomes semânticos (`variant`, `size`, `tone`), nunca de cor (`red`, `big`).
3. Aceite `className` e combine com `cn()` por último.
4. Teste antes (TDD): comportamento e acessibilidade (role, nome acessível), não classes exatas.
5. Documente aqui.

## Layout das telas

```
<StoreLayout>           telas da loja: header fixo (logo, e-mail, Sair) + main
  <Container>           largura e laterais
    <Heading level={1}> um por página
    ...seções com py-12/py-16 e gap-6/gap-8
```

O login fica fora do `StoreLayout`: tela cheia, um card de formulário centralizado sobre o `Spotlight`.
