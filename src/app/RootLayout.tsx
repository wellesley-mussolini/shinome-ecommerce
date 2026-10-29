import { Link, Outlet } from '@tanstack/react-router'

import { Logo } from '@/components/brand/Logo'
import { Container } from '@/components/ui/Container'

export function RootLayout() {
  return (
    <div className="flex min-h-dvh flex-col">
      <header className="border-border border-b">
        <Container className="flex h-16 items-center">
          <Link
            to="/produtos"
            aria-label="Shinome"
            className="text-brand focus-visible:outline-focus rounded-sm transition-opacity hover:opacity-80 focus-visible:outline-2 focus-visible:outline-offset-4"
          >
            <Logo className="h-8 w-auto" />
          </Link>
        </Container>
      </header>
      <main className="flex flex-1 flex-col">
        <Outlet />
      </main>
    </div>
  )
}
