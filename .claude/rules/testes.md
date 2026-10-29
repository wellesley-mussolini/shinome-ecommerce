# Testes: TDD, fluxo da tela, mock só do que sai do processo

> Ler antes de: escrever qualquer comportamento novo, corrigir bug, montar cenário, decidir o que mockar.

## Regra

1. **TDD sempre (Red → Green → Refactor).** O teste nasce antes do código e é visto falhando **pelo motivo certo**. Em bug, o teste reproduz o bug antes do conserto. Depois do Green, tire a correção e veja o teste falhar de novo (contraprova); recoloque e veja passar. Só docs e comentários dispensam o Red.
2. **Teste o fluxo que a pessoa faz na tela, não a função isolada.** Renderize a página com as rotas reais, aja como o usuário (`userEvent`: digitar, clicar, navegar) e confira o que ela vê. Função pura com regra própria (formatar preço, ler sessão) pode ter teste unitário, mas a funcionalidade só está coberta quando o fluxo está.
3. **Busque como o usuário e a tecnologia assistiva encontram**: `getByRole` com nome acessível, `getByLabelText`, `getByText`. Nunca `data-testid` ou estrutura do DOM. Classe CSS só entra no teste quando o contrato testado **é** a classe (o primitivo aceita e mescla o `className` de quem chama); aparência de tela não se testa por classe, o design system já tem guarda própria.
4. **Mock só do que sai do processo**: rede, Supabase, relógio quando importa. Componente, hook e módulo do próprio app rodam de verdade. `localStorage` do jsdom é real: limpe entre testes, não mocke.
5. **O esperado se lê no código e nos dados**, não se adivinha: o preço esperado vem do catálogo, o texto esperado vem da tela.
6. **Teste determinístico.** Rode o arquivo mais de uma vez antes de commitar. Teste que alterna entre passar e falhar é defeito do teste até prova em contrário. Animação e espera assíncrona usam `findBy*`/`waitFor`, nunca `setTimeout`.
7. **O nome do teste descreve o comportamento**, em pt-BR ([nomenclatura.md](nomenclatura.md)): `it('leva para o catálogo depois de entrar')`.

## Anti-padrão → correto

| Proibido                                             | Correto                                                            |
| ---------------------------------------------------- | ------------------------------------------------------------------ |
| Escrever o código e depois o teste "para cobrir"     | Teste primeiro, vê-lo falhar, depois o código                      |
| `vi.mock('@/features/...')` de módulo do próprio app | Rodar o módulo real; mock só na fronteira (rede, Supabase)         |
| `container.querySelector('.card')`, `getByTestId`    | `getByRole('link', { name: 'Camisa xadrez' })`                     |
| `expect(button).toHaveClass('bg-primary')` numa tela | Testar o comportamento: habilitado, nome acessível, o que acontece |
| `await new Promise((r) => setTimeout(r, 300))`       | `await screen.findByRole(...)`                                     |
| `it('works')`, `it('should render')`                 | `it('mostra a mensagem de erro quando o e-mail está vazio')`       |
| Preço esperado digitado de cabeça                    | Ler do catálogo usado pela tela                                    |

## Sinal de busca

- `git grep -n "getByTestId" -- src` deve voltar vazio.
- `git grep -nE "querySelector|toHaveClass" -- "src/**/*.test.tsx"` é julgamento: só vale nos testes dos primitivos (`src/components`), verificando o contrato de `className` ou o SVG da logo; em teste de tela é violação.
- `git grep -nE "vi\.mock\('@/" -- src` é julgamento: só vale para fronteira que sai do processo.
