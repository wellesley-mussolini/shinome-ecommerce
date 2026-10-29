# Regras do repositório: índice

Estas regras são o contrato de todo PR (meu, de terceiros, correção de review). Antes de codar e antes de entregar, ache abaixo os temas que a tarefa toca, leia e confronte cada linha nova do diff com a tabela de anti-padrões do tema. Violação de regra **bloqueia o merge**; não é sugestão.

## Regra mestre: o simples bem feito

Antes de criar qualquer estrutura nova e antes de entregar, pergunte: **"Isso tem necessidade real hoje? O código cresceu demais para um problema simples? Existe um caminho mais direto?"** Se a resposta aponta uma volta desnecessária, refaça pelo caminho direto. Simples não é pular regra: é resolver o problema real com o menor número de conceitos.

## Temas

| Tema                                         | Quando ler                                                                         |
| -------------------------------------------- | ---------------------------------------------------------------------------------- |
| [codigo.md](codigo.md)                       | Qualquer código: variáveis (`const`), gambiarra, fallback, abstração, código morto |
| [nomenclatura.md](nomenclatura.md)           | Nomear arquivo, componente, função, variável, rota, branch                         |
| [testes.md](testes.md)                       | Qualquer comportamento novo ou bug (TDD), montar cenário, decidir o que mockar     |
| [fluxo-git.md](fluxo-git.md)                 | Começar trabalho, commitar, abrir PR, mergear, levar algo para produção            |
| [design-system](../../docs/design-system.md) | Criar ou alterar qualquer tela ou componente visual (tokens, Aceternity, layout)   |

## Como registrar uma regra nova

1. Ache o tema dono e acrescente: a regra (o princípio e o teste mental), a linha na tabela "Anti-padrão → correto" e o sinal de busca (`git grep`) que encontra os casos restantes.
2. Se não cabe em nenhum tema, crie `<tema>.md` no mesmo formato e acrescente a linha na tabela acima.
3. Regra que dá para verificar por máquina vira lint ou teste (como a regra `shinome/only-const` em `lint/code-rules-plugin.mjs` e o `src/design-system.guard.test.ts`). Regra só no papel é a primeira a ser esquecida.
