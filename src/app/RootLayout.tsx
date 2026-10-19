import { Outlet } from '@tanstack/react-router'

export function RootLayout() {
  return (
    <div className="bg-bg text-fg flex min-h-dvh flex-col">
      <main className="flex flex-1 flex-col">
        <Outlet />
      </main>
    </div>
  )
}
