import { IconLogout } from '@tabler/icons-react'
import { getRouteApi, Outlet, useNavigate } from '@tanstack/react-router'

import { Logo } from '@/components/brand/Logo'
import { Button } from '@/components/ui/Button'
import { Container } from '@/components/ui/Container'
import { Text } from '@/components/ui/Text'
import { TextLink } from '@/components/ui/TextLink'
import { endSession } from '@/features/auth/session'

const storeRoute = getRouteApi('/store')

export function StoreLayout() {
  const { sessionEmail } = storeRoute.useRouteContext()
  const navigate = useNavigate()

  const signOut = () => {
    endSession()
    void navigate({ to: '/login' })
  }

  return (
    <div className="flex min-h-dvh flex-col">
      <header className="border-border bg-bg/80 sticky top-0 z-10 border-b backdrop-blur-sm">
        <Container className="flex h-16 items-center justify-between gap-4">
          <TextLink
            to="/produtos"
            aria-label="Shinome"
            className="text-brand transition-opacity hover:opacity-80"
          >
            <Logo className="h-8 w-auto" />
          </TextLink>
          <div className="flex items-center gap-4">
            <Text as="span" size="sm" tone="muted" className="hidden sm:block">
              {sessionEmail}
            </Text>
            <Button variant="ghost" size="sm" onClick={signOut}>
              <IconLogout aria-hidden="true" className="size-4" />
              Sair
            </Button>
          </div>
        </Container>
      </header>
      <main className="flex flex-1 flex-col">
        <Outlet />
      </main>
    </div>
  )
}
