import { screen, within } from '@testing-library/react'
import { beforeEach, describe, expect, it } from 'vitest'

import { startSession } from '@/features/auth/session'
import { renderApp } from '@/test/render-app'

describe('StoreLayout', () => {
  beforeEach(() => {
    startSession('cliente@shinome.com')
  })

  it('mostra a logo no menu como link para o catálogo', async () => {
    await renderApp('/produtos')

    const header = await screen.findByRole('banner')
    const catalogLink = within(header).getByRole('link', { name: 'Shinome' })

    expect(catalogLink).toHaveAttribute('href', '/produtos')
    expect(within(catalogLink).getByRole('img', { name: 'Shinome' })).toBeInTheDocument()
  })

  it('mostra no menu o e-mail de quem entrou', async () => {
    await renderApp('/produtos')

    const header = await screen.findByRole('banner')

    expect(within(header).getByText('cliente@shinome.com')).toBeInTheDocument()
  })
})
