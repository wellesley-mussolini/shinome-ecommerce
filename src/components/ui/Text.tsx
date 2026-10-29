import { cva, type VariantProps } from 'class-variance-authority'
import type { HTMLAttributes, ReactNode } from 'react'

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

// Só os atributos que as telas usam (ligar mensagem a campo e anunciar mudanças); style fica de fora.
type TextProps = VariantProps<typeof textVariants> &
  Pick<HTMLAttributes<HTMLElement>, 'id' | 'role' | 'aria-live'> & {
    as?: 'p' | 'span' | 'div' | 'small'
    children: ReactNode
    className?: string
  }

export function Text({ as: Tag = 'p', tone, size, className, ...props }: TextProps) {
  return <Tag className={cn(textVariants({ tone, size }), className)} {...props} />
}
