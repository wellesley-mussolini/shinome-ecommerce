import { cva, type VariantProps } from 'class-variance-authority'
import type { ReactNode } from 'react'

import { cn } from '@/lib/cn'

const textVariants = cva('', {
  variants: {
    tone: {
      default: 'text-fg',
      muted: 'text-fg-muted',
      subtle: 'text-fg-subtle',
    },
    size: {
      sm: 'text-sm',
      md: 'text-base',
      lg: 'text-lg',
    },
  },
  defaultVariants: { tone: 'default', size: 'md' },
})

type TextProps = VariantProps<typeof textVariants> & {
  as?: 'p' | 'span' | 'div' | 'small'
  children: ReactNode
  className?: string
}

export function Text({ as: Tag = 'p', tone, size, children, className }: TextProps) {
  return <Tag className={cn(textVariants({ tone, size }), className)}>{children}</Tag>
}
