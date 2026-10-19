import { render, screen } from '@testing-library/react'
import { describe, expect, it } from 'vitest'

import { HomePage } from './HomePage'

describe('HomePage', () => {
  it('exibe o nome da loja como título principal', () => {
    render(<HomePage />)

    expect(screen.getByRole('heading', { level: 1, name: 'Shinome' })).toBeInTheDocument()
  })
})
