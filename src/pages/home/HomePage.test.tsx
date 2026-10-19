import { render, screen, within } from '@testing-library/react'
import { describe, expect, it } from 'vitest'

import { HomePage } from './HomePage'

describe('HomePage', () => {
  it('usa a logo como título principal da página', () => {
    render(<HomePage />)

    const heading = screen.getByRole('heading', { level: 1, name: 'Shinome' })

    expect(within(heading).getByRole('img', { name: 'Shinome' })).toBeInTheDocument()
  })
})
