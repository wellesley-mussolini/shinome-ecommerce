import { Container } from '@/components/ui/Container'
import { Heading } from '@/components/ui/Heading'
import { Text } from '@/components/ui/Text'
import { BackToCatalogLink } from '@/pages/catalog/BackToCatalogLink'

export function NotFoundPage() {
  return (
    <Container className="flex flex-1 flex-col items-center justify-center gap-6 py-16 text-center">
      <Heading level={1}>Página não encontrada</Heading>
      <Text tone="muted">O endereço que você abriu não existe ou o produto saiu do catálogo.</Text>
      <BackToCatalogLink />
    </Container>
  )
}
