import { createMemoryHistory, RouterProvider } from '@tanstack/react-router'
import { render } from '@testing-library/react'

import { createAppRouter } from '@/app/router'

// O app carrega o código de cada página sob demanda. Nos testes, ele é carregado uma vez aqui, ao
// importar este módulo, para o custo da primeira importação não cair dentro do tempo de um teste.
const preloadRouter = createAppRouter(createMemoryHistory())
await Promise.all(
  Object.values(preloadRouter.routesById).map((route) => preloadRouter.loadRouteChunk(route)),
)

/**
 * Renderiza o app inteiro, com as rotas reais, a partir de uma URL. Espera o router resolver as
 * guardas e os redirecionamentos antes de renderizar.
 */
export async function renderApp(initialPath: string) {
  const router = createAppRouter(createMemoryHistory({ initialEntries: [initialPath] }))
  await router.load()
  render(<RouterProvider router={router} />)
  return router
}
