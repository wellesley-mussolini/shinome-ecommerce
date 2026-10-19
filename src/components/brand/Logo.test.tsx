import { render, screen } from '@testing-library/react'
import { describe, expect, it } from 'vitest'

import { Logo } from './Logo'

describe('Logo', () => {
  it('expõe a marca para leitores de tela como imagem chamada "Shinome"', () => {
    render(<Logo />)

    expect(screen.getByRole('img', { name: 'Shinome' })).toBeInTheDocument()
  })

  it('desenha o lettering com cor herdada para seguir o tema', () => {
    render(<Logo />)

    const svg = screen.getByRole('img', { name: 'Shinome' })
    expect(svg.querySelector('path')).toHaveAttribute('fill', 'currentColor')
  })

  it('repassa className para dimensionar pelo layout', () => {
    render(<Logo className="h-10" />)

    expect(screen.getByRole('img', { name: 'Shinome' })).toHaveClass('h-10')
  })
})
