import { screen, within } from '@testing-library/react'
import { describe, expect, it } from 'vitest'

import { renderApp } from '@/test/render-app'

describe('RootLayout', () => {
  it('mostra a logo no menu como link para o catálogo', async () => {
    renderApp('/produtos')

    const header = await screen.findByRole('banner')
    const catalogLink = within(header).getByRole('link', { name: 'Shinome' })

    expect(catalogLink).toHaveAttribute('href', '/produtos')
    expect(within(catalogLink).getByRole('img', { name: 'Shinome' })).toBeInTheDocument()
  })
})
