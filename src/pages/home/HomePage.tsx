import { Logo } from '@/components/brand/Logo'
import { Container } from '@/components/ui/Container'
import { Heading } from '@/components/ui/Heading'
import { Text } from '@/components/ui/Text'

export function HomePage() {
  return (
    <Container className="flex flex-1 flex-col items-center justify-center gap-6 py-16 text-center">
      <Heading level={1} className="text-brand">
        <Logo className="h-20 w-auto sm:h-28" />
      </Heading>
      <Text tone="muted">Em breve.</Text>
    </Container>
  )
}
