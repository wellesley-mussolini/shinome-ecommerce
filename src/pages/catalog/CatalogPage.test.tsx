import { getDefaultNormalizer, screen, within } from '@testing-library/react'
import { describe, expect, it } from 'vitest'

import { formatPrice } from '@/features/catalog/format-price'
import { CATEGORY_NAMES, PRODUCTS } from '@/features/catalog/products'
import { renderApp } from '@/test/render-app'

// O preço formatado usa espaço não separável (U+00A0 entre R$ e o valor); sem isso o Testing Library o troca
// por espaço comum no texto da tela e a comparação com formatPrice falha.
const keepWhitespace = { normalizer: getDefaultNormalizer({ collapseWhitespace: false }) }

describe('catálogo', () => {
  it('a página inicial leva ao catálogo', async () => {
    const router = renderApp('/')

    expect(await screen.findByRole('heading', { level: 1, name: 'Produtos' })).toBeInTheDocument()
    expect(router.state.location.pathname).toBe('/produtos')
  })

  it('mostra um card para cada produto, com nome, categoria e preço', async () => {
    renderApp('/produtos')
    await screen.findByRole('heading', { level: 1, name: 'Produtos' })

    const productCards = screen.getAllByRole('article')
    expect(productCards).toHaveLength(PRODUCTS.length)

    PRODUCTS.forEach((product, index) => {
      const productCard = within(productCards[index] as HTMLElement)
      expect(productCard.getByRole('heading', { level: 3, name: product.name })).toBeInTheDocument()
      expect(
        productCard.getByText(formatPrice(product.priceInCents), keepWhitespace),
      ).toBeInTheDocument()
      expect(productCard.getByText(CATEGORY_NAMES[product.category])).toBeInTheDocument()
    })
  })

  it('informa quantos produtos estão sendo exibidos', async () => {
    renderApp('/produtos')

    expect(await screen.findByText(`${PRODUCTS.length} produtos`)).toBeInTheDocument()
  })
})
