import { getDefaultNormalizer, screen, within } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { beforeEach, describe, expect, it } from 'vitest'

import { formatPrice } from '@/features/catalog/format-price'
import { CATEGORY_NAMES, PRODUCTS } from '@/features/catalog/products'
import { startSession } from '@/features/auth/session'
import { renderApp } from '@/test/render-app'

// O preço formatado usa espaço não separável (U+00A0 entre R$ e o valor); sem isso o Testing Library
// o troca por espaço comum no texto da tela e a comparação com formatPrice falha.
const keepWhitespace = { normalizer: getDefaultNormalizer({ collapseWhitespace: false }) }

async function openCatalog() {
  renderApp('/produtos')
  await screen.findByRole('heading', { level: 1, name: 'Produtos' })
}

function visibleProductNames() {
  return screen.queryAllByRole('heading', { level: 3 }).map((heading) => heading.textContent)
}

describe('catálogo', () => {
  beforeEach(() => {
    startSession('cliente@shinome.com')
  })

  it('a página inicial leva ao catálogo', async () => {
    const router = renderApp('/')

    expect(await screen.findByRole('heading', { level: 1, name: 'Produtos' })).toBeInTheDocument()
    expect(router.state.location.pathname).toBe('/produtos')
  })

  it('mostra um card para cada produto, com nome, categoria e preço', async () => {
    await openCatalog()

    expect(visibleProductNames()).toEqual(PRODUCTS.map((product) => product.name))
    PRODUCTS.forEach((product) => {
      const productCard = within(screen.getByRole('article', { name: product.name }))

      expect(
        productCard.getByText(formatPrice(product.priceInCents), keepWhitespace),
      ).toBeInTheDocument()
      expect(productCard.getByText(CATEGORY_NAMES[product.category])).toBeInTheDocument()
    })
  })

  it('informa quantos produtos estão sendo exibidos', async () => {
    await openCatalog()

    expect(screen.getByText(`${PRODUCTS.length} produtos`)).toBeInTheDocument()
  })

  it('filtra por categoria e marca a categoria escolhida', async () => {
    await openCatalog()

    await userEvent.click(screen.getByRole('button', { name: 'Relógios' }))

    const watchNames = PRODUCTS.filter((product) => product.category === 'relogios').map(
      (product) => product.name,
    )
    expect(visibleProductNames()).toEqual(watchNames)
    expect(screen.getByRole('button', { name: 'Relógios' })).toHaveAttribute('aria-pressed', 'true')
    expect(screen.getByRole('button', { name: 'Todas' })).toHaveAttribute('aria-pressed', 'false')
    expect(screen.getByText(`${watchNames.length} produtos`)).toBeInTheDocument()
  })

  it('volta a mostrar tudo ao escolher Todas', async () => {
    await openCatalog()

    await userEvent.click(screen.getByRole('button', { name: 'Bolsas' }))
    await userEvent.click(screen.getByRole('button', { name: 'Todas' }))

    expect(visibleProductNames()).toHaveLength(PRODUCTS.length)
  })

  it('busca pelo nome sem diferenciar acento nem maiúscula', async () => {
    await openCatalog()

    await userEvent.type(screen.getByRole('searchbox', { name: 'Buscar produtos' }), 'OCULOS')

    expect(visibleProductNames()).toEqual([
      'Óculos de Sol Preto',
      'Óculos de Sol Clássico',
      'Óculos Verde e Preto',
    ])
  })

  it('combina a busca com a categoria', async () => {
    await openCatalog()

    await userEvent.click(screen.getByRole('button', { name: 'Calçados' }))
    await userEvent.type(screen.getByRole('searchbox', { name: 'Buscar produtos' }), 'sapato')

    expect(visibleProductNames()).toEqual(['Sapato Dourado', 'Sapato Vermelho'])
    expect(screen.getByText('2 produtos')).toBeInTheDocument()
  })

  it('usa o singular quando sobra um produto', async () => {
    await openCatalog()

    await userEvent.type(screen.getByRole('searchbox', { name: 'Buscar produtos' }), 'mochila')

    expect(screen.getByText('1 produto')).toBeInTheDocument()
  })

  it('avisa quando nada é encontrado e permite limpar os filtros', async () => {
    await openCatalog()

    await userEvent.click(screen.getByRole('button', { name: 'Óculos' }))
    await userEvent.type(screen.getByRole('searchbox', { name: 'Buscar produtos' }), 'sapato')

    expect(visibleProductNames()).toEqual([])
    expect(screen.getByText('Nenhum produto encontrado com esses filtros.')).toBeInTheDocument()

    await userEvent.click(screen.getByRole('button', { name: 'Limpar filtros' }))

    expect(visibleProductNames()).toHaveLength(PRODUCTS.length)
    expect(screen.getByRole('searchbox', { name: 'Buscar produtos' })).toHaveValue('')
    expect(screen.getByRole('button', { name: 'Todas' })).toHaveAttribute('aria-pressed', 'true')
  })
})
