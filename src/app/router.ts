import {
  createBrowserHistory,
  createRootRoute,
  createRoute,
  createRouter,
  notFound,
  redirect,
  type RouterHistory,
} from '@tanstack/react-router'
import { z } from 'zod'

import { getSessionEmail } from '@/features/auth/session'
import { findProductBySlug } from '@/features/catalog/products'
import { CatalogPage } from '@/pages/catalog/CatalogPage'
import { LoginPage } from '@/pages/login/LoginPage'
import { NotFoundPage } from '@/pages/not-found/NotFoundPage'
import { ProductPage } from '@/pages/product/ProductPage'

import { StoreLayout } from './StoreLayout'

const rootRoute = createRootRoute()

const loginSearchSchema = z.object({
  // Para onde voltar depois de entrar. Só caminho interno ('/produtos/x'); '//site.com' e URLs
  // absolutas são ignorados, para o login não virar um redirecionamento aberto.
  voltar: z
    .string()
    .regex(/^\/(?!\/)/)
    .optional()
    .catch(undefined),
})

const loginRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/login',
  validateSearch: loginSearchSchema,
  beforeLoad: () => {
    if (getSessionEmail()) throw redirect({ to: '/produtos', replace: true })
  },
  component: LoginPage,
})

// Layout da loja: só entra quem tem sessão; o e-mail segue no contexto para o cabeçalho.
const storeRoute = createRoute({
  getParentRoute: () => rootRoute,
  id: 'store',
  beforeLoad: ({ location }) => {
    const sessionEmail = getSessionEmail()
    if (!sessionEmail) {
      throw redirect({ to: '/login', search: { voltar: location.href }, replace: true })
    }
    return { sessionEmail }
  },
  component: StoreLayout,
})

const homeRoute = createRoute({
  getParentRoute: () => storeRoute,
  path: '/',
  beforeLoad: () => {
    throw redirect({ to: '/produtos', replace: true })
  },
})

const catalogRoute = createRoute({
  getParentRoute: () => storeRoute,
  path: '/produtos',
  component: CatalogPage,
})

const productRoute = createRoute({
  getParentRoute: () => storeRoute,
  path: '/produtos/$slug',
  loader: ({ params }) => {
    const product = findProductBySlug(params.slug)
    if (!product) throw notFound()
    return product
  },
  component: ProductPage,
})

const routeTree = rootRoute.addChildren([
  loginRoute,
  storeRoute.addChildren([homeRoute, catalogRoute, productRoute]),
])

export function createAppRouter(history: RouterHistory = createBrowserHistory()) {
  return createRouter({
    routeTree,
    history,
    defaultPreload: 'intent',
    defaultNotFoundComponent: NotFoundPage,
    scrollRestoration: true,
  })
}

declare module '@tanstack/react-router' {
  interface Register {
    router: ReturnType<typeof createAppRouter>
  }
}
