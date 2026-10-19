import { render, screen } from '@testing-library/react'
import { describe, expect, it } from 'vitest'

import { Container } from './Container'

describe('Container', () => {
  it('renderiza o conteúdo dentro da largura padrão do layout', () => {
    render(<Container>Conteúdo</Container>)

    expect(screen.getByText('Conteúdo')).toHaveClass('max-w-7xl', 'mx-auto')
  })

  it('soma className sem perder o alinhamento padrão', () => {
    render(<Container className="py-8">Conteúdo</Container>)

    expect(screen.getByText('Conteúdo')).toHaveClass('max-w-7xl', 'py-8')
  })
})
