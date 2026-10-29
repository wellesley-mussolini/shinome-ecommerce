import { describe, expect, it } from 'vitest'

import { endSession, getSessionEmail, startSession } from './session'

describe('sessão de demonstração', () => {
  it('não tem ninguém logado no começo', () => {
    expect(getSessionEmail()).toBeNull()
  })

  it('guarda o e-mail de quem entrou', () => {
    startSession('cliente@shinome.com')

    expect(getSessionEmail()).toBe('cliente@shinome.com')
  })

  it('continua logado depois de recarregar a página (o e-mail fica no localStorage)', () => {
    startSession('cliente@shinome.com')

    expect(localStorage.getItem('shinome:session-email')).toBe('cliente@shinome.com')
  })

  it('esquece a sessão ao sair', () => {
    startSession('cliente@shinome.com')
    endSession()

    expect(getSessionEmail()).toBeNull()
  })
})
