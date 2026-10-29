import { IconCheck } from '@tabler/icons-react'
import { getRouteApi } from '@tanstack/react-router'

import { Container } from '@/components/ui/Container'
import { Heading } from '@/components/ui/Heading'
import { Text } from '@/components/ui/Text'
import { formatPrice } from '@/features/catalog/format-price'
import { CATEGORY_NAMES } from '@/features/catalog/products'
import { BackToCatalogLink } from '@/pages/catalog/BackToCatalogLink'

const productRoute = getRouteApi('/store/produtos/$slug')

export function ProductPage() {
  const product = productRoute.useLoaderData()

  return (
    <Container className="flex flex-col gap-8 py-12">
      <BackToCatalogLink />
      <div className="grid gap-8 lg:grid-cols-2 lg:gap-12">
        <div className="border-border bg-surface aspect-square overflow-hidden rounded-lg border">
          <img
            src={product.imagePath}
            alt={product.name}
            className="size-full object-contain p-12"
          />
        </div>
        <div className="flex flex-col gap-6 lg:py-8">
          <div className="flex flex-col gap-2">
            <Text size="sm" tone="subtle">
              {CATEGORY_NAMES[product.category]}
            </Text>
            <Heading level={1}>{product.name}</Heading>
          </div>
          <Text size="lg" className="font-semibold">
            {formatPrice(product.priceInCents)}
          </Text>
          <Text tone="muted">{product.description}</Text>
          <ul aria-label="Destaques" className="border-border flex flex-col gap-3 border-t pt-6">
            {product.highlights.map((highlight) => (
              <li key={highlight} className="flex items-center gap-3">
                <IconCheck aria-hidden="true" className="text-success size-4 shrink-0" />
                <Text as="span" size="sm">
                  {highlight}
                </Text>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </Container>
  )
}
