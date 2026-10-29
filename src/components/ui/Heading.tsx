import type { ReactNode } from 'react'

import { cn } from '@/lib/cn'

type HeadingLevel = 1 | 2 | 3 | 4

const headingStyles: Record<HeadingLevel, string> = {
  1: 'text-4xl font-semibold tracking-tight sm:text-5xl',
  2: 'text-3xl font-semibold tracking-tight',
  3: 'text-xl font-semibold',
  4: 'text-lg font-medium',
}

type HeadingProps = {
  level: HeadingLevel
  children: ReactNode
  id?: string
  className?: string
}

export function Heading({ level, children, id, className }: HeadingProps) {
  const Tag = `h${level}` as const

  return (
    <Tag id={id} className={cn('text-fg', headingStyles[level], className)}>
      {children}
    </Tag>
  )
}
