# Shinome E-commerce — regras do projeto

- **Design system é obrigatório**: leia `docs/design-system.md` antes de criar ou alterar qualquer tela. Só Tailwind, sem CSS, sem `style={}`, sem valores arbitrários, só tokens semânticos. Use os componentes de `src/components/ui` (`Container`, `Heading`, `Text`, `Button`). Falta um token ou componente? Ele entra no sistema (tokens + doc + teste), nunca na tela.
- **TDD**: todo comportamento novo começa com teste falhando. Teste comportamento e acessibilidade, não classes exatas.
- **Sem backend**: o app fala direto com o Supabase. Só chaves públicas (`VITE_*`); a segurança vem do RLS.
- **Sem default export** (exceto `vite.config.ts`); imports absolutos via `@/`.
- Antes de commitar: `npm run check` (format, lint, typecheck, testes, build), o mesmo pipeline do CI.
- Branches: `dev` (desenvolvimento) e `prod` (produção).
