import { IconArrowLeft } from '@tabler/icons-react'
import { Link } from '@tanstack/react-router'

export function BackToCatalogLink() {
  return (
    <Link
      to="/produtos"
      className="text-fg-muted hover:text-fg focus-visible:outline-focus inline-flex w-fit items-center gap-2 rounded-sm text-sm transition-colors focus-visible:outline-2 focus-visible:outline-offset-4"
    >
      <IconArrowLeft aria-hidden="true" className="size-4" />
      Voltar para produtos
    </Link>
  )
}
