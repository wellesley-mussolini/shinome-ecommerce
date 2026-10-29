import { screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { beforeEach, describe, expect, it } from 'vitest'

import { startSession } from '@/features/auth/session'
import { formatPrice } from '@/features/catalog/format-price'
import { CATEGORY_NAMES, findProductBySlug } from '@/features/catalog/products'
import { renderApp } from '@/test/render-app'
import { keepWhitespace } from '@/test/text-matchers'

function readCatalogProduct(slug: string) {
  const product = findProductBySlug(slug)
  if (!product) throw new Error(`Produto ${slug} não está no catálogo`)
  return product
}

describe('página do produto', () => {
  beforeEach(() => {
    startSession('cliente@shinome.com')
  })

  it('abre ao clicar no card do catálogo', async () => {
    const router = renderApp('/produtos')

    await userEvent.click(await screen.findByRole('link', { name: 'Sapato Vermelho' }))

    expect(
      await screen.findByRole('heading', { level: 1, name: 'Sapato Vermelho' }),
    ).toBeInTheDocument()
    expect(router.state.location.pathname).toBe('/produtos/sapato-vermelho')
  })

  it('mostra foto, categoria, preço, descrição e destaques', async () => {
    const product = readCatalogProduct('relogio-pulseira-de-couro')
    renderApp(`/produtos/${product.slug}`)

    await screen.findByRole('heading', { level: 1, name: product.name })

    expect(screen.getByRole('img', { name: product.name })).toHaveAttribute(
      'src',
      product.imagePath,
    )
    expect(screen.getByText(CATEGORY_NAMES[product.category])).toBeInTheDocument()
    expect(screen.getByText(formatPrice(product.priceInCents), keepWhitespace)).toBeInTheDocument()
    expect(screen.getByText(product.description)).toBeInTheDocument()
    const highlightItems = screen.getAllByRole('listitem').map((item) => item.textContent)
    expect(highlightItems).toEqual(product.highlights)
  })

  it('volta para o catálogo', async () => {
    renderApp('/produtos/sapato-vermelho')

    await userEvent.click(await screen.findByRole('link', { name: 'Voltar para produtos' }))

    expect(await screen.findByRole('heading', { level: 1, name: 'Produtos' })).toBeInTheDocument()
  })

  it('avisa quando o produto não existe, dentro do layout da loja', async () => {
    renderApp('/produtos/produto-que-nao-existe')

    expect(
      await screen.findByRole('heading', { level: 1, name: 'Página não encontrada' }),
    ).toBeInTheDocument()
    expect(screen.getByRole('banner')).toBeInTheDocument()
    expect(screen.getByRole('main')).toBeInTheDocument()
    expect(screen.getByRole('link', { name: 'Voltar para produtos' })).toHaveAttribute(
      'href',
      '/produtos',
    )
  })

  it('avisa quando o endereço não existe, dentro do layout da loja', async () => {
    renderApp('/endereco-que-nao-existe')

    expect(
      await screen.findByRole('heading', { level: 1, name: 'Página não encontrada' }),
    ).toBeInTheDocument()
    expect(screen.getByRole('banner')).toBeInTheDocument()
    expect(screen.getByRole('main')).toBeInTheDocument()
  })
})
