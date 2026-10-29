import { describe, expect, it } from 'vitest'

import { formatPrice } from './format-price'

describe('formatPrice', () => {
  it('mostra centavos como reais, no formato brasileiro', () => {
    expect(formatPrice(14990)).toBe('R$ 149,90')
  })

  it('separa milhar com ponto', () => {
    expect(formatPrice(129990)).toBe('R$ 1.299,90')
  })
})
