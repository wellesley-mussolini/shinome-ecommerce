import { render } from '@testing-library/react'
import { describe, expect, it } from 'vitest'

import { Spotlight } from './Spotlight'

describe('Spotlight', () => {
  it('é decorativo: fica escondido da tecnologia assistiva', () => {
    const { container } = render(<Spotlight />)

    expect(container.firstElementChild).toHaveAttribute('aria-hidden', 'true')
  })

  it('usa um filtro de desfoque próprio por instância, sem colidir ids na mesma tela', () => {
    const { container } = render(
      <>
        <Spotlight />
        <Spotlight />
      </>,
    )

    const filterIds = Array.from(container.getElementsByTagName('filter'), (filter) => filter.id)

    expect(new Set(filterIds).size).toBe(2)
  })
})
