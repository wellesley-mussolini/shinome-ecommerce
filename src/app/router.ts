import {
  createBrowserHistory,
  createRootRoute,
  createRoute,
  createRouter,
  lazyRouteComponent,
  notFound,
  redirect,
  type RouterHistory,
} from '@tanstack/react-router'

import { getSessionEmail } from '@/features/auth/session'
import { findProductBySlug } from '@/features/catalog/products'
import { NotFoundPage } from '@/pages/not-found/NotFoundPage'

import { StoreLayout } from './StoreLayout'

// Cada página vira um chunk próprio, carregado quando a rota abre: o motion (animações do
// Aceternity) e o código das telas não pesam no carregamento inicial.
const rootRoute = createRootRoute()

type LoginSearch = {
  voltar?: string | undefined
}

// Para onde voltar depois de entrar. Só caminho interno ('/produtos/x'); '//site.com' e URLs
// absolutas são descartados, para o login não virar um redirecionamento aberto. A chave volta
// sempre, com undefined quando recusada: o router mescla este retorno com a busca crua da URL,
// e omitir a chave manteria o valor recusado.
function readLoginSearch(search: Record<string, unknown>): LoginSearch {
  const { voltar } = search
  const isInternalPath = typeof voltar === 'string' && /^\/(?!\/)/.test(voltar)
  return { voltar: isInternalPath ? voltar : undefined }
}

const loginRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/login',
  validateSearch: readLoginSearch,
  beforeLoad: () => {
    if (getSessionEmail()) throw redirect({ to: '/produtos', replace: true })
  },
  component: lazyRouteComponent(() => import('@/pages/login/LoginPage'), 'LoginPage'),
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
  component: lazyRouteComponent(() => import('@/pages/catalog/CatalogPage'), 'CatalogPage'),
})

const productRoute = createRoute({
  getParentRoute: () => storeRoute,
  path: '/produtos/$slug',
  loader: ({ params }) => {
    const product = findProductBySlug(params.slug)
    if (!product) throw notFound()
    return product
  },
  component: lazyRouteComponent(() => import('@/pages/product/ProductPage'), 'ProductPage'),
})

// Endereço que não existe também passa pela guarda da loja e aparece dentro do layout dela.
const unknownAddressRoute = createRoute({
  getParentRoute: () => storeRoute,
  path: '$',
  component: NotFoundPage,
})

const routeTree = rootRoute.addChildren([
  loginRoute,
  storeRoute.addChildren([homeRoute, catalogRoute, productRoute, unknownAddressRoute]),
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
