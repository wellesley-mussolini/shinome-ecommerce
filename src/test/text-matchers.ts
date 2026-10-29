import { getDefaultNormalizer } from '@testing-library/react'

/**
 * Opção para getByText comparar preços formatados. O formatPrice usa espaço não separável
 * (U+00A0 entre R$ e o valor), e o normalizador padrão do Testing Library o troca por espaço
 * comum no texto da tela, o que faria a comparação com formatPrice falhar.
 */
export const keepWhitespace = { normalizer: getDefaultNormalizer({ collapseWhitespace: false }) }
