import type { ComponentProps } from 'react'

import { cn } from '@/lib/cn'

// Adaptado do Input do Aceternity UI: mesmo formato e foco, com tokens. O brilho que segue o
// mouse ficou de fora porque depende de style dinâmico (docs/design-system.md).
export function Input({ className, ...props }: ComponentProps<'input'>) {
  return (
    <input
      className={cn(
        'border-border-strong bg-surface text-fg placeholder:text-fg-subtle hover:border-fg-subtle focus-visible:outline-focus aria-invalid:border-danger h-10 w-full rounded-md border px-3 text-sm shadow-sm transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 disabled:cursor-not-allowed disabled:opacity-50',
        className,
      )}
      {...props}
    />
  )
}
