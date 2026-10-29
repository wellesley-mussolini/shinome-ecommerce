import {
  createMemoryHistory,
  createRootRoute,
  createRoute,
  createRouter,
  Outlet,
  RouterProvider,
} from '@tanstack/react-router'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { describe, expect, it } from 'vitest'

import { TextLink } from './TextLink'

function renderWithRoutes() {
  const rootRoute = createRootRoute({ component: Outlet })
  const startRoute = createRoute({
    getParentRoute: () => rootRoute,
    path: '/',
    component: () => (
      <TextLink to="/produtos" className="text-fg-muted">
        Ver produtos
      </TextLink>
    ),
  })
  const productsRoute = createRoute({
    getParentRoute: () => rootRoute,
    path: '/produtos',
    component: () => <h1>Produtos</h1>,
  })
  const router = createRouter({
    routeTree: rootRoute.addChildren([startRoute, productsRoute]),
    history: createMemoryHistory({ initialEntries: ['/'] }),
  })
  render(<RouterProvider router={router} />)
}

describe('TextLink', () => {
  it('é um link do router: aponta para a rota e navega ao clicar', async () => {
    renderWithRoutes()

    const productsLink = await screen.findByRole('link', { name: 'Ver produtos' })
    expect(productsLink).toHaveAttribute('href', '/produtos')

    await userEvent.click(productsLink)

    expect(await screen.findByRole('heading', { name: 'Produtos' })).toBeInTheDocument()
  })

  it('soma className sem perder o anel de foco padrão', async () => {
    renderWithRoutes()

    expect(await screen.findByRole('link', { name: 'Ver produtos' })).toHaveClass(
      'text-fg-muted',
      'focus-visible:outline-focus',
    )
  })
})
