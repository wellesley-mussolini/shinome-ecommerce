import { AnimatePresence, motion } from 'motion/react'
import { useState } from 'react'

import type { Product } from '@/features/catalog/products'

import { ProductCard } from './ProductCard'

type ProductGridProps = {
  products: Product[]
}

// Efeito "Card Hover" do Aceternity UI: um único fundo (layoutId) desliza até o card sob o mouse
// ou com o foco do teclado.
export function ProductGrid({ products }: ProductGridProps) {
  const [highlightedSlug, setHighlightedSlug] = useState<string | null>(null)

  return (
    <ul className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
      {products.map((product) => (
        <li key={product.slug} className="relative p-2">
          <AnimatePresence>
            {highlightedSlug === product.slug && (
              <motion.span
                aria-hidden="true"
                layoutId="product-grid-highlight"
                className="bg-surface-raised absolute inset-0 rounded-lg"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1, transition: { duration: 0.15 } }}
                exit={{ opacity: 0, transition: { duration: 0.15, delay: 0.2 } }}
              />
            )}
          </AnimatePresence>
          <ProductCard
            product={product}
            onHighlightChange={(isHighlighted) =>
              setHighlightedSlug(isHighlighted ? product.slug : null)
            }
          />
        </li>
      ))}
    </ul>
  )
}
