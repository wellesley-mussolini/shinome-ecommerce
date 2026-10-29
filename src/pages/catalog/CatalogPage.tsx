import { IconSearch } from '@tabler/icons-react'
import { useState } from 'react'

import { Button } from '@/components/ui/Button'
import { Container } from '@/components/ui/Container'
import { Heading } from '@/components/ui/Heading'
import { Input } from '@/components/ui/Input'
import { Text } from '@/components/ui/Text'
import {
  CATEGORY_NAMES,
  CATEGORY_SLUGS,
  PRODUCTS,
  type CategorySlug,
  type Product,
} from '@/features/catalog/products'

import { ProductGrid } from './ProductGrid'

// Busca sem diferenciar acento nem maiúscula: "oculos" encontra "Óculos".
function normalizeForSearch(text: string): string {
  return text
    .normalize('NFD')
    .replace(/\p{Diacritic}/gu, '')
    .toLowerCase()
}

function matchesFilters(
  product: Product,
  searchTerm: string,
  selectedCategory: CategorySlug | null,
): boolean {
  const isInCategory = selectedCategory === null || product.category === selectedCategory
  return isInCategory && normalizeForSearch(product.name).includes(normalizeForSearch(searchTerm))
}

function describeProductCount(productCount: number): string {
  return productCount === 1 ? '1 produto' : `${productCount} produtos`
}

export function CatalogPage() {
  const [searchTerm, setSearchTerm] = useState('')
  const [selectedCategory, setSelectedCategory] = useState<CategorySlug | null>(null)

  const visibleProducts = PRODUCTS.filter((product) =>
    matchesFilters(product, searchTerm.trim(), selectedCategory),
  )

  const clearFilters = () => {
    setSearchTerm('')
    setSelectedCategory(null)
  }

  return (
    <Container className="flex flex-col gap-8 py-12">
      <div className="flex flex-col gap-2">
        <Heading level={1}>Produtos</Heading>
        <Text tone="muted" aria-live="polite">
          {describeProductCount(visibleProducts.length)}
        </Text>
      </div>

      <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
        <fieldset className="flex flex-wrap gap-2">
          <legend className="sr-only">Categorias</legend>
          <Button
            size="sm"
            variant={selectedCategory === null ? 'primary' : 'secondary'}
            aria-pressed={selectedCategory === null}
            onClick={() => setSelectedCategory(null)}
          >
            Todas
          </Button>
          {CATEGORY_SLUGS.map((categorySlug) => (
            <Button
              key={categorySlug}
              size="sm"
              variant={selectedCategory === categorySlug ? 'primary' : 'secondary'}
              aria-pressed={selectedCategory === categorySlug}
              onClick={() => setSelectedCategory(categorySlug)}
            >
              {CATEGORY_NAMES[categorySlug]}
            </Button>
          ))}
        </fieldset>
        <div className="relative w-full lg:max-w-xs">
          <IconSearch
            aria-hidden="true"
            className="text-fg-subtle pointer-events-none absolute top-1/2 left-3 size-4 -translate-y-1/2"
          />
          <Input
            type="search"
            aria-label="Buscar produtos"
            placeholder="Buscar produtos"
            value={searchTerm}
            onChange={(event) => setSearchTerm(event.target.value)}
            className="pl-9"
          />
        </div>
      </div>

      {visibleProducts.length > 0 ? (
        <ProductGrid products={visibleProducts} />
      ) : (
        <div className="border-border flex flex-col items-center gap-4 rounded-lg border border-dashed px-4 py-16 text-center">
          <Text tone="muted">Nenhum produto encontrado com esses filtros.</Text>
          <Button variant="secondary" onClick={clearFilters}>
            Limpar filtros
          </Button>
        </div>
      )}
    </Container>
  )
}
