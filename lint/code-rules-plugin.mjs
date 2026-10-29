// Regras de .claude/rules/codigo.md que o oxlint não tem nativamente.
const codeRulesPlugin = {
  meta: { name: 'shinome' },
  rules: {
    'only-const': {
      meta: {
        type: 'problem',
        docs: { description: 'Proíbe let e var: toda variável é const (.claude/rules/codigo.md).' },
      },
      create(context) {
        return {
          VariableDeclaration(node) {
            if (node.kind === 'let' || node.kind === 'var') {
              context.report({
                node,
                message: `Use const em vez de ${node.kind}: troque a reatribuição por uma expressão, um retorno antecipado ou estado do React.`,
              })
            }
          },
        }
      },
    },
  },
}

export default codeRulesPlugin
