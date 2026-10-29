import { createLink, type LinkComponent } from '@tanstack/react-router'
import type { ComponentProps } from 'react'

import { cn } from '@/lib/cn'

function StyledAnchor({ className, children, ...props }: ComponentProps<'a'>) {
  return (
    <a
      className={cn(
        'focus-visible:outline-focus rounded-sm transition-colors focus-visible:outline-2 focus-visible:outline-offset-4',
        className,
      )}
      {...props}
    >
      {children}
    </a>
  )
}

const StyledRouterLink = createLink(StyledAnchor)

// Padrão do TanStack Router para link próprio: mantém a tipagem das rotas (to, params, search).
export const TextLink: LinkComponent<typeof StyledAnchor> = (props) => (
  <StyledRouterLink {...props} />
)
