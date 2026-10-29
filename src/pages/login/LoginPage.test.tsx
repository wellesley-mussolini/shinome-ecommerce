import { cleanup, screen, within } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { describe, expect, it } from 'vitest'

import { getSessionEmail, startSession } from '@/features/auth/session'
import { renderApp } from '@/test/render-app'

async function findLoginHeading() {
  return screen.findByRole('heading', { level: 1, name: 'Entrar' })
}

async function signInThroughForm(email: string) {
  await userEvent.type(screen.getByLabelText('E-mail'), email)
  await userEvent.type(screen.getByLabelText('Senha'), '123')
  await userEvent.click(screen.getByRole('button', { name: 'Entrar' }))
}

describe('login', () => {
  it('sem sessão, o catálogo leva ao login', async () => {
    const router = await renderApp('/produtos')

    expect(await findLoginHeading()).toBeInTheDocument()
    expect(router.state.location.pathname).toBe('/login')
  })

  it('sem sessão, a página de um produto também leva ao login', async () => {
    const router = await renderApp('/produtos/sapato-vermelho')

    expect(await findLoginHeading()).toBeInTheDocument()
    expect(router.state.location.pathname).toBe('/login')
  })

  it('entra com qualquer e-mail e senha e vai para o catálogo', async () => {
    const router = await renderApp('/login')
    await findLoginHeading()

    await signInThroughForm('qualquer@coisa')

    expect(await screen.findByRole('heading', { level: 1, name: 'Produtos' })).toBeInTheDocument()
    expect(router.state.location.pathname).toBe('/produtos')
    expect(within(screen.getByRole('banner')).getByText('qualquer@coisa')).toBeInTheDocument()
  })

  it('pede e-mail e senha quando faltam, sem sair do login', async () => {
    const router = await renderApp('/login')
    await findLoginHeading()

    await userEvent.type(screen.getByLabelText('E-mail'), '   ')
    await userEvent.click(screen.getByRole('button', { name: 'Entrar' }))

    expect(screen.getByLabelText('E-mail')).toBeInvalid()
    expect(screen.getByLabelText('E-mail')).toHaveAccessibleDescription('Informe seu e-mail.')
    expect(screen.getByLabelText('Senha')).toBeInvalid()
    expect(screen.getByLabelText('Senha')).toHaveAccessibleDescription('Informe sua senha.')
    expect(screen.getAllByRole('alert').map((alert) => alert.textContent)).toEqual([
      'Informe seu e-mail.',
      'Informe sua senha.',
    ])
    expect(screen.getByLabelText('E-mail')).toHaveFocus()
    expect(router.state.location.pathname).toBe('/login')
    expect(getSessionEmail()).toBeNull()
  })

  it('tira o aviso do campo assim que ele é preenchido', async () => {
    await renderApp('/login')
    await findLoginHeading()

    await userEvent.click(screen.getByRole('button', { name: 'Entrar' }))
    await userEvent.type(screen.getByLabelText('E-mail'), 'cliente@shinome.com')

    expect(screen.getByLabelText('E-mail')).toBeValid()
    expect(screen.queryByText('Informe seu e-mail.')).not.toBeInTheDocument()
    expect(screen.getByLabelText('Senha')).toBeInvalid()
  })

  it('depois de entrar, volta para a página que a pessoa tinha aberto', async () => {
    const router = await renderApp('/produtos/sapato-vermelho')
    await findLoginHeading()

    await signInThroughForm('cliente@shinome.com')

    expect(
      await screen.findByRole('heading', { level: 1, name: 'Sapato Vermelho' }),
    ).toBeInTheDocument()
    expect(router.state.location.pathname).toBe('/produtos/sapato-vermelho')
  })

  it('não segue um endereço de volta que aponte para fora do app', async () => {
    const router = await renderApp('/login?voltar=//site-malicioso.com')
    await findLoginHeading()

    await signInThroughForm('cliente@shinome.com')

    expect(await screen.findByRole('heading', { level: 1, name: 'Produtos' })).toBeInTheDocument()
    expect(router.state.location.pathname).toBe('/produtos')
  })

  it('sem sessão, um endereço que não existe também leva ao login', async () => {
    const router = await renderApp('/endereco-que-nao-existe')

    expect(await findLoginHeading()).toBeInTheDocument()
    expect(router.state.location.pathname).toBe('/login')
  })

  it('continua logado ao abrir o app de novo', async () => {
    await renderApp('/login')
    await findLoginHeading()
    await signInThroughForm('cliente@shinome.com')
    await screen.findByRole('heading', { level: 1, name: 'Produtos' })

    cleanup()
    await renderApp('/produtos')

    expect(await screen.findByRole('heading', { level: 1, name: 'Produtos' })).toBeInTheDocument()
  })

  it('não considera logado quem só tem um e-mail em branco guardado', async () => {
    localStorage.setItem('shinome:session-email', '   ')
    const router = await renderApp('/produtos')

    expect(await findLoginHeading()).toBeInTheDocument()
    expect(router.state.location.pathname).toBe('/login')
  })

  it('com sessão, abrir o login leva direto ao catálogo', async () => {
    startSession('cliente@shinome.com')
    const router = await renderApp('/login')

    expect(await screen.findByRole('heading', { level: 1, name: 'Produtos' })).toBeInTheDocument()
    expect(router.state.location.pathname).toBe('/produtos')
  })

  it('sair encerra a sessão e volta ao login', async () => {
    startSession('cliente@shinome.com')
    await renderApp('/produtos')

    await userEvent.click(await screen.findByRole('button', { name: 'Sair' }))

    expect(await findLoginHeading()).toBeInTheDocument()
    expect(getSessionEmail()).toBeNull()
  })
})
