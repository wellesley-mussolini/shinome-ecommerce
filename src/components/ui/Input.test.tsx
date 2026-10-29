import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { describe, expect, it } from 'vitest'

import { Input } from './Input'
import { Label } from './Label'

describe('Input', () => {
  it('é encontrado pelo texto do Label associado e recebe digitação', async () => {
    render(
      <>
        <Label htmlFor="email">E-mail</Label>
        <Input id="email" type="email" />
      </>,
    )

    const emailInput = screen.getByLabelText('E-mail')
    await userEvent.type(emailInput, 'cliente@shinome.com')

    expect(emailInput).toHaveValue('cliente@shinome.com')
  })

  it('repassa atributos de acessibilidade, como aria-invalid', () => {
    render(<Input aria-label="Senha" aria-invalid="true" />)

    expect(screen.getByRole('textbox', { name: 'Senha' })).toBeInvalid()
  })

  it('soma className sem perder o estilo padrão', () => {
    render(<Input aria-label="Busca" className="pl-10" />)

    expect(screen.getByRole('textbox', { name: 'Busca' })).toHaveClass('pl-10', 'h-10')
  })
})
