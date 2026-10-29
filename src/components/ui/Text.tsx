import { cva, type VariantProps } from 'class-variance-authority'
import type { HTMLAttributes } from 'react'

import { cn } from '@/lib/cn'

const textVariants = cva('', {
  variants: {
    tone: {
      default: 'text-fg',
      muted: 'text-fg-muted',
      subtle: 'text-fg-subtle',
      danger: 'text-danger',
    },
    size: {
      sm: 'text-sm',
      md: 'text-base',
      lg: 'text-lg',
    },
  },
  defaultVariants: { tone: 'default', size: 'md' },
})

type TextProps = VariantProps<typeof textVariants> &
  HTMLAttributes<HTMLElement> & {
    as?: 'p' | 'span' | 'div' | 'small'
  }

export function Text({ as: Tag = 'p', tone, size, className, ...props }: TextProps) {
  return <Tag className={cn(textVariants({ tone, size }), className)} {...props} />
}
