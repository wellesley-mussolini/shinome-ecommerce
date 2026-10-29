import { useId } from 'react'

import { Heading } from '@/components/ui/Heading'
import { Text } from '@/components/ui/Text'
import { formatPrice } from '@/features/catalog/format-price'
import { CATEGORY_NAMES, type Product } from '@/features/catalog/products'

type ProductCardProps = {
  product: Product
}

export function ProductCard({ product }: ProductCardProps) {
  const nameId = useId()

  return (
    <article
      aria-labelledby={nameId}
      className="group border-border bg-surface hover:border-border-strong relative flex h-full flex-col gap-4 rounded-lg border p-4 transition-colors"
    >
      <div className="bg-surface-raised aspect-square overflow-hidden rounded-md">
        <img
          src={product.imagePath}
          alt=""
          loading="lazy"
          className="size-full object-contain p-6 transition-transform duration-300 group-hover:scale-105"
        />
      </div>
      <div className="flex flex-1 flex-col gap-1">
        <Text as="span" size="sm" tone="subtle">
          {CATEGORY_NAMES[product.category]}
        </Text>
        <Heading level={3} id={nameId}>
          {product.name}
        </Heading>
        <Text as="span" className="mt-auto pt-2 font-medium">
          {formatPrice(product.priceInCents)}
        </Text>
      </div>
    </article>
  )
}
