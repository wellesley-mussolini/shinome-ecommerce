const brazilianRealFormat = new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' })

export function formatPrice(priceInCents: number): string {
  return brazilianRealFormat.format(priceInCents / 100)
}
