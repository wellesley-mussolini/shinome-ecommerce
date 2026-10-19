import { Link, Outlet } from '@tanstack/react-router'

import { Logo } from '@/components/brand/Logo'

export function RootLayout() {
  return (
    <div className="bg-bg text-fg flex min-h-dvh flex-col">
      <header className="border-border border-b">
        <nav className="mx-auto flex h-16 max-w-7xl items-center px-4">
          <Link to="/" aria-label="Shinome" className="text-brand rounded-sm hover:opacity-90">
            <Logo className="h-8 w-auto" />
          </Link>
        </nav>
      </header>
      <main className="flex flex-1 flex-col">
        <Outlet />
      </main>
    </div>
  )
}
