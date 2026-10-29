import { Container } from '@/components/ui/Container'
import { Heading } from '@/components/ui/Heading'
import { Text } from '@/components/ui/Text'
import { PRODUCTS } from '@/features/catalog/products'

import { ProductGrid } from './ProductGrid'

export function CatalogPage() {
  return (
    <Container className="flex flex-col gap-8 py-12">
      <div className="flex flex-col gap-2">
        <Heading level={1}>Produtos</Heading>
        <Text tone="muted">{`${PRODUCTS.length} produtos`}</Text>
      </div>
      <ProductGrid products={PRODUCTS} />
    </Container>
  )
}
