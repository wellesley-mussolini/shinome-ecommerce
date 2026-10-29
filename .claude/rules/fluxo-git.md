# Fluxo de git: branches, worktrees, commits, PRs e produção

> Ler antes de: começar qualquer trabalho, commitar, abrir PR, mergear, levar algo para `prod`.

## Branches

O repositório tem **só duas branches permanentes**:

| Branch | O que é                                                                                                       |
| ------ | ------------------------------------------------------------------------------------------------------------- |
| `dev`  | Desenvolvimento. Recebe tudo que é novo, **já encaminhado e funcionando**, mesmo que ainda falte validar.     |
| `prod` | Produção: é o que o usuário final usa. Só recebe o que está funcionando, testado, validado e é produto final. |

O trabalho em andamento (pela metade, incompleto) vive **só** na branch de trabalho, nunca em `dev`.

## Fluxo de um trabalho, do início ao fim

1. **Branch + worktree próprios**, criados a partir de `origin/dev` atualizado:
   ```bash
   git fetch origin
   git worktree add -b <tipo>/<assunto> ../shinome-ecommerce.worktrees/<assunto> origin/dev
   cd ../shinome-ecommerce.worktrees/<assunto> && npm ci
   ```
   Nome da branch: `<tipo>/<assunto-em-kebab-case>` em pt-BR, com o tipo do conventional commits (`feat/login-e-catalogo`, `fix/preco-com-centavos`, `chore/regras-do-repositorio`).
2. **Commits por etapa concluída** (veja abaixo), cada um passando em `npm run check`.
3. **Antes do PR**: rodar o code review e o simplify sobre o diff inteiro da branch, confrontar cada linha `+` com as regras dos temas tocados e corrigir os achados com TDD, cada correção no seu commit.
4. **PR para `dev`**, com a descrição completa (o que mudou, por quê, como era antes, como é agora, como foi testado, riscos) e comentários inline nas linhas com decisão não óbvia.
5. **Merge só com CI verde**, sem warning novo (build, lint, testes, actions) e sem achado aberto. Estratégia: **merge commit** (`gh pr merge --merge --match-head-commit <sha>`), que preserva os commits da branch e agrupa o trabalho no histórico.
6. **Depois do merge**: apagar o worktree e a branch (local e remota).
   ```bash
   git worktree remove ../shinome-ecommerce.worktrees/<assunto>
   git branch -D <tipo>/<assunto>
   git push origin --delete <tipo>/<assunto>
   ```

## Commits

- **Um commit por etapa concluída do trabalho**: terminou o componente, commita; terminou a tela, commita; ajustou algo numa tela, commita. Cada commit conta uma coisa só e deixa o projeto funcionando, para que auditar o histórico mostre exatamente onde algo foi introduzido.
- Nem um commit gigante com tudo misturado, nem um commit por arquivo ou por função criada.
- Mensagem em pt-BR no padrão conventional commits: `feat(catalogo): filtro por categoria`, `fix(login): ...`, `docs(regras): ...`, `test(...)`, `build(deps): ...`, `chore: ...`.
- Teste e código da mesma etapa vão no mesmo commit (o Red é visto antes, mas não é commitado sozinho).

## Levar para produção

- `dev` → `prod` **sempre por PR**, nunca push direto nem merge local.
- Só vai para `prod` o que está funcionando, sem bug conhecido, testado, validado pelo dono do produto e pronto como produto final.
- O PR de `dev` → `prod` lista o que entra (os PRs mergeados em `dev` desde a última subida) e como foi validado.

## Anti-padrão → correto

| Proibido                                              | Correto                                                        |
| ----------------------------------------------------- | -------------------------------------------------------------- |
| Commitar direto em `dev` ou `prod`                    | Branch + worktree + PR                                         |
| Merge local (`git merge`) entre branches permanentes  | PR, sempre                                                     |
| Branch permanente nova (`staging`, `develop`, `main`) | Só `dev` e `prod`                                              |
| Trabalho pela metade em `dev`                         | Fica na branch de trabalho até estar encaminhado e funcionando |
| Um commit "feat: login, catálogo, ajustes e testes"   | Um commit por etapa concluída                                  |
| Um commit por arquivo criado                          | Agrupar pela etapa que o arquivo completa                      |
| Branch e worktree esquecidos depois do merge          | Apagar os dois logo após o merge                               |
| Subir para `prod` algo "quase pronto"                 | Fica em `dev` até estar validado                               |
