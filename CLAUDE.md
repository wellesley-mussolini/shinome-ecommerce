# Shinome E-commerce — regras do projeto

As regras estão em [`.claude/rules/INDEX.md`](.claude/rules/INDEX.md) e são o contrato de todo PR. Antes de codar e antes de entregar, leia os temas que a tarefa toca:

- [codigo.md](.claude/rules/codigo.md): só `const`, sem gambiarra, sem fallback que esconde erro, sem overengineering.
- [nomenclatura.md](.claude/rules/nomenclatura.md): código em inglês, tudo que uma pessoa lê em pt-BR, nomes claros.
- [testes.md](.claude/rules/testes.md): TDD, fluxo da tela, mock só do que sai do processo.
- [fluxo-git.md](.claude/rules/fluxo-git.md): só `dev` e `prod`; branch + worktree por trabalho, commit por etapa, review e simplify, PR para `dev`.
- [docs/design-system.md](docs/design-system.md): dark mode, tokens, componentes de `src/components/ui`, Aceternity UI adaptado. Obrigatório antes de qualquer tela.

Fora das regras de tema:

- **Sem backend**: o app fala direto com o Supabase. Só chaves públicas (`VITE_*`); a segurança vem do RLS.
- **Sem default export** (exceto `vite.config.ts` e `lint/*.mjs`); imports absolutos via `@/`.
- Antes de commitar: `npm run check` (format, lint, typecheck, testes, build), o mesmo pipeline do CI.
