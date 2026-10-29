import {
  createBrowserHistory,
  createRootRoute,
  createRoute,
  createRouter,
  notFound,
  redirect,
  type RouterHistory,
} from '@tanstack/react-router'

import { findProductBySlug } from '@/features/catalog/products'
import { CatalogPage } from '@/pages/catalog/CatalogPage'
import { NotFoundPage } from '@/pages/not-found/NotFoundPage'
import { ProductPage } from '@/pages/product/ProductPage'

import { RootLayout } from './RootLayout'

const rootRoute = createRootRoute({ component: RootLayout })

const homeRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/',
  beforeLoad: () => {
    throw redirect({ to: '/produtos', replace: true })
  },
})

const catalogRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/produtos',
  component: CatalogPage,
})

const productRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/produtos/$slug',
  loader: ({ params }) => {
    const product = findProductBySlug(params.slug)
    if (!product) throw notFound()
    return product
  },
  component: ProductPage,
})

const routeTree = rootRoute.addChildren([homeRoute, catalogRoute, productRoute])

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
