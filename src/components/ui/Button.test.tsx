import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { describe, expect, it, vi } from 'vitest'

import { Button } from './Button'

describe('Button', () => {
  it('é type="button" por padrão para não submeter formulários sem querer', () => {
    render(<Button>Comprar</Button>)

    expect(screen.getByRole('button', { name: 'Comprar' })).toHaveAttribute('type', 'button')
  })

  it('aceita type="submit" quando pedido', () => {
    render(<Button type="submit">Enviar</Button>)

    expect(screen.getByRole('button', { name: 'Enviar' })).toHaveAttribute('type', 'submit')
  })

  it('dispara onClick', async () => {
    const onClick = vi.fn<() => void>()
    render(<Button onClick={onClick}>Comprar</Button>)

    await userEvent.click(screen.getByRole('button', { name: 'Comprar' }))

    expect(onClick).toHaveBeenCalledOnce()
  })

  it('não dispara onClick quando desabilitado', async () => {
    const onClick = vi.fn<() => void>()
    render(
      <Button disabled onClick={onClick}>
        Comprar
      </Button>,
    )

    await userEvent.click(screen.getByRole('button', { name: 'Comprar' }))

    expect(onClick).not.toHaveBeenCalled()
  })

  it('variantes diferentes geram estilos diferentes', () => {
    render(
      <>
        <Button variant="primary">Primário</Button>
        <Button variant="secondary">Secundário</Button>
      </>,
    )

    expect(screen.getByRole('button', { name: 'Primário' }).className).not.toBe(
      screen.getByRole('button', { name: 'Secundário' }).className,
    )
  })

  it('className do chamador vence o padrão em caso de conflito', () => {
    render(<Button className="w-full">Comprar</Button>)

    expect(screen.getByRole('button', { name: 'Comprar' })).toHaveClass('w-full')
  })
})
