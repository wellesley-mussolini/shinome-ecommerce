import { IconArrowLeft } from '@tabler/icons-react'

import { TextLink } from '@/components/ui/TextLink'

export function BackToCatalogLink() {
  return (
    <TextLink
      to="/produtos"
      className="text-fg-muted hover:text-fg inline-flex w-fit items-center gap-2 text-sm"
    >
      <IconArrowLeft aria-hidden="true" className="size-4" />
      Voltar para produtos
    </TextLink>
  )
}
