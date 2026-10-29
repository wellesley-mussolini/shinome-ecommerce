import { existsSync } from 'node:fs'
import { join } from 'node:path'

import { describe, expect, it } from 'vitest'

import { CATEGORIES, PRODUCTS, findProductBySlug } from './products'

describe('catálogo de produtos', () => {
  it('cada produto tem um slug único, para a URL da página do produto', () => {
    const slugs = PRODUCTS.map((product) => product.slug)

    expect(new Set(slugs).size).toBe(PRODUCTS.length)
  })

  it.each(PRODUCTS)('$name aponta para uma imagem que existe em public/', (product) => {
    expect(existsSync(join(process.cwd(), 'public', product.imagePath))).toBe(true)
  })

  it('toda categoria tem pelo menos um produto', () => {
    const categoriesWithoutProducts = CATEGORIES.filter(
      (category) => !PRODUCTS.some((product) => product.category === category.slug),
    )

    expect(categoriesWithoutProducts).toEqual([])
  })

  it('encontra o produto pelo slug', () => {
    expect(findProductBySlug('sapato-vermelho')?.name).toBe('Sapato Vermelho')
  })

  it('não encontra slug que não existe', () => {
    expect(findProductBySlug('produto-que-nao-existe')).toBeUndefined()
  })
})
