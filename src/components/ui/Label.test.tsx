import { render, screen } from '@testing-library/react'
import { describe, expect, it } from 'vitest'

import { Label } from './Label'

describe('Label', () => {
  it('renderiza um label nativo ligado ao campo pelo htmlFor', () => {
    render(<Label htmlFor="senha">Senha</Label>)

    expect(screen.getByText('Senha')).toHaveAttribute('for', 'senha')
  })
})
