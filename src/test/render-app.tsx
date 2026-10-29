import { createMemoryHistory, RouterProvider } from '@tanstack/react-router'
import { render } from '@testing-library/react'

import { createAppRouter } from '@/app/router'

/** Renderiza o app inteiro, com as rotas reais, a partir de uma URL. */
export function renderApp(initialPath: string) {
  const router = createAppRouter(createMemoryHistory({ initialEntries: [initialPath] }))
  render(<RouterProvider router={router} />)
  return router
}
