import { Container } from '@/components/ui/Container'
import { Heading } from '@/components/ui/Heading'
import { Text } from '@/components/ui/Text'

export function HomePage() {
  return (
    <Container className="flex flex-1 flex-col items-center justify-center gap-4 py-16 text-center">
      <Heading level={1}>Shinome</Heading>
      <Text tone="muted">Em breve.</Text>
    </Container>
  )
}
