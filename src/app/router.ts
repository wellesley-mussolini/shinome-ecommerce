import {
  createBrowserHistory,
  createRootRoute,
  createRoute,
  createRouter,
  redirect,
  type RouterHistory,
} from '@tanstack/react-router'

import { CatalogPage } from '@/pages/catalog/CatalogPage'

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

const routeTree = rootRoute.addChildren([homeRoute, catalogRoute])

export function createAppRouter(history: RouterHistory = createBrowserHistory()) {
  return createRouter({ routeTree, history, defaultPreload: 'intent', scrollRestoration: true })
}

declare module '@tanstack/react-router' {
  interface Register {
    router: ReturnType<typeof createAppRouter>
  }
}
