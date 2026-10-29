import type { ComponentProps } from 'react'

import { cn } from '@/lib/cn'

type LabelProps = ComponentProps<'label'> & {
  htmlFor: string
}

export function Label({ htmlFor, className, ...props }: LabelProps) {
  return (
    <label htmlFor={htmlFor} className={cn('text-fg text-sm font-medium', className)} {...props} />
  )
}
