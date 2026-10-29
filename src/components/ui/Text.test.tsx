import { render, screen } from '@testing-library/react'
import { describe, expect, it } from 'vitest'

import { Text } from './Text'

describe('Text', () => {
  it('renderiza um parágrafo por padrão', () => {
    render(<Text>Descrição</Text>)

    expect(screen.getByText('Descrição').tagName).toBe('P')
  })

  it('permite trocar a tag sem perder o estilo', () => {
    render(<Text as="span">Preço</Text>)

    expect(screen.getByText('Preço').tagName).toBe('SPAN')
  })

  it('tons diferentes geram estilos diferentes', () => {
    render(
      <>
        <Text tone="default">Normal</Text>
        <Text tone="muted">Secundário</Text>
      </>,
    )

    expect(screen.getByText('Normal').className).not.toBe(screen.getByText('Secundário').className)
  })

  it('usa o token de erro no tom danger', () => {
    render(<Text tone="danger">Informe o e-mail</Text>)

    expect(screen.getByText('Informe o e-mail')).toHaveClass('text-danger')
  })

  it('repassa atributos como id, para ligar a mensagem a um campo', () => {
    render(<Text id="email-erro">Informe o e-mail</Text>)

    expect(screen.getByText('Informe o e-mail')).toHaveAttribute('id', 'email-erro')
  })
})
