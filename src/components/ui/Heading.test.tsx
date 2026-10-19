import { render, screen } from '@testing-library/react'
import { describe, expect, it } from 'vitest'

import { Heading } from './Heading'

describe('Heading', () => {
  it.each([1, 2, 3, 4] as const)('renderiza o nível %i com a tag semântica certa', (level) => {
    render(<Heading level={level}>Título</Heading>)

    expect(screen.getByRole('heading', { level, name: 'Título' })).toBeInTheDocument()
  })

  it('cada nível tem escala tipográfica própria', () => {
    render(
      <>
        <Heading level={1}>Um</Heading>
        <Heading level={2}>Dois</Heading>
      </>,
    )

    expect(screen.getByRole('heading', { name: 'Um' }).className).not.toBe(
      screen.getByRole('heading', { name: 'Dois' }).className,
    )
  })
})
