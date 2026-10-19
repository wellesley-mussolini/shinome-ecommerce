import { describe, expect, it } from 'vitest'

import { parseEnv } from './env'

const validSource = {
  VITE_SUPABASE_URL: 'https://abcdefghijklmnop.supabase.co',
  VITE_SUPABASE_PUBLISHABLE_KEY: 'sb_publishable_123',
}

describe('parseEnv', () => {
  it('retorna a configuração tipada quando todas as variáveis são válidas', () => {
    expect(parseEnv(validSource)).toEqual({
      supabaseUrl: 'https://abcdefghijklmnop.supabase.co',
      supabasePublishableKey: 'sb_publishable_123',
    })
  })

  it('falha nomeando a variável ausente', () => {
    expect(() => parseEnv({ VITE_SUPABASE_URL: validSource.VITE_SUPABASE_URL })).toThrow(
      /VITE_SUPABASE_PUBLISHABLE_KEY/,
    )
  })

  it('rejeita VITE_SUPABASE_URL que não é URL', () => {
    expect(() => parseEnv({ ...validSource, VITE_SUPABASE_URL: 'supabase' })).toThrow(
      /VITE_SUPABASE_URL/,
    )
  })

  it('rejeita chave vazia ou só com espaços', () => {
    expect(() => parseEnv({ ...validSource, VITE_SUPABASE_PUBLISHABLE_KEY: '   ' })).toThrow(
      /VITE_SUPABASE_PUBLISHABLE_KEY/,
    )
  })
})
