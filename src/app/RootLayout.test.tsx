import {
  createMemoryHistory,
  createRootRoute,
  createRoute,
  createRouter,
  RouterProvider,
} from '@tanstack/react-router'
import { render, screen, within } from '@testing-library/react'
import { describe, expect, it } from 'vitest'

import { RootLayout } from './RootLayout'

function renderLayoutAt(path: string) {
  const rootRoute = createRootRoute({ component: RootLayout })
  const routes = ['/', '/produtos'].map((routePath) =>
    createRoute({ getParentRoute: () => rootRoute, path: routePath, component: () => null }),
  )
  const router = createRouter({
    routeTree: rootRoute.addChildren(routes),
    history: createMemoryHistory({ initialEntries: [path] }),
  })

  render(<RouterProvider router={router} />)
}

describe('RootLayout', () => {
  it('mostra a logo no menu como link para a página inicial', async () => {
    renderLayoutAt('/produtos')

    const header = await screen.findByRole('banner')
    const homeLink = within(header).getByRole('link', { name: 'Shinome' })

    expect(homeLink).toHaveAttribute('href', '/')
    expect(within(homeLink).getByRole('img', { name: 'Shinome' })).toBeInTheDocument()
  })
})
