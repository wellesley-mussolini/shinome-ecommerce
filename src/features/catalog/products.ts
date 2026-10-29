// Catálogo fixo de demonstração. Quando os produtos vierem do Supabase, este módulo vira a consulta.
export const CATEGORY_SLUGS = ['camisas', 'relogios', 'oculos', 'bolsas', 'calcados'] as const

export type CategorySlug = (typeof CATEGORY_SLUGS)[number]

export const CATEGORY_NAMES: Record<CategorySlug, string> = {
  camisas: 'Camisas',
  relogios: 'Relógios',
  oculos: 'Óculos',
  bolsas: 'Bolsas',
  calcados: 'Calçados',
}

export type Product = {
  slug: string
  name: string
  category: CategorySlug
  priceInCents: number
  description: string
  highlights: string[]
  imagePath: string
}

export const PRODUCTS: Product[] = [
  {
    slug: 'camisa-xadrez-azul-e-preta',
    name: 'Camisa Xadrez Azul e Preta',
    category: 'camisas',
    priceInCents: 14990,
    description:
      'Camisa masculina com xadrez clássico em azul e preto. O tecido macio acompanha do dia a dia casual a ocasiões mais arrumadas.',
    highlights: ['Tecido de algodão macio', 'Botões frontais e punho ajustável', 'Corte regular'],
    imagePath: '/products/camisa-xadrez-azul-e-preta.webp',
  },
  {
    slug: 'camisa-xadrez-classica',
    name: 'Camisa Xadrez Clássica',
    category: 'camisas',
    priceInCents: 16990,
    description:
      'Uma camisa xadrez atemporal, de caimento confortável, que combina com jeans, sarja e o que mais estiver no guarda-roupa.',
    highlights: ['Estampa xadrez atemporal', 'Caimento confortável', 'Fácil de combinar'],
    imagePath: '/products/camisa-xadrez-classica.webp',
  },
  {
    slug: 'camisa-manga-curta',
    name: 'Camisa Manga Curta',
    category: 'camisas',
    priceInCents: 11990,
    description:
      'Leve e fresca para os dias quentes, sem perder o visual arrumado. Manga curta e modelagem que não aperta.',
    highlights: ['Tecido leve e respirável', 'Manga curta', 'Ideal para o verão'],
    imagePath: '/products/camisa-manga-curta.webp',
  },
  {
    slug: 'relogio-pulseira-de-couro',
    name: 'Relógio Pulseira de Couro',
    category: 'relogios',
    priceInCents: 32990,
    description:
      'Relógio de desenho clássico com pulseira de couro legítimo e mostrador limpo. Um toque de sofisticação para qualquer produção.',
    highlights: ['Pulseira de couro legítimo', 'Mostrador analógico', 'Resistente a respingos'],
    imagePath: '/products/relogio-pulseira-de-couro.webp',
  },
  {
    slug: 'relogio-dourado-feminino',
    name: 'Relógio Dourado Feminino',
    category: 'relogios',
    priceInCents: 89990,
    description:
      'Caixa banhada a ouro e desenho elegante: um acessório que transforma o visual, do dia à noite.',
    highlights: ['Caixa banhada a ouro', 'Pulseira de elos ajustável', 'Acompanha estojo'],
    imagePath: '/products/relogio-dourado-feminino.webp',
  },
  {
    slug: 'relogio-de-pulso-feminino',
    name: 'Relógio de Pulso Feminino',
    category: 'relogios',
    priceInCents: 45990,
    description:
      'Versátil e confortável para usar todos os dias, com um desenho simples e elegante que combina com vários estilos.',
    highlights: ['Pulseira confortável', 'Desenho minimalista', 'Uso diário'],
    imagePath: '/products/relogio-de-pulso-feminino.webp',
  },
  {
    slug: 'oculos-de-sol-preto',
    name: 'Óculos de Sol Preto',
    category: 'oculos',
    priceInCents: 18990,
    description:
      'Armação preta e lentes escuras: o clássico que não sai de moda, com proteção contra raios UV.',
    highlights: ['Proteção UV400', 'Armação leve', 'Acompanha estojo'],
    imagePath: '/products/oculos-de-sol-preto.webp',
  },
  {
    slug: 'oculos-de-sol-classico',
    name: 'Óculos de Sol Clássico',
    category: 'oculos',
    priceInCents: 15990,
    description:
      'Desenho atemporal com armação neutra e lentes com proteção UV, para usar em qualquer ocasião.',
    highlights: ['Proteção UV400', 'Armação neutra', 'Desenho atemporal'],
    imagePath: '/products/oculos-de-sol-classico.webp',
  },
  {
    slug: 'oculos-verde-e-preto',
    name: 'Óculos Verde e Preto',
    category: 'oculos',
    priceInCents: 21990,
    description:
      'A combinação ousada de verde e preto traz personalidade para a sua coleção de óculos, sem abrir mão do conforto.',
    highlights: ['Armação bicolor', 'Proteção UV400', 'Hastes flexíveis'],
    imagePath: '/products/oculos-verde-e-preto.webp',
  },
  {
    slug: 'bolsa-de-mao-azul',
    name: 'Bolsa de Mão Azul',
    category: 'bolsas',
    priceInCents: 25990,
    description:
      'Espaçosa e cheia de estilo, num azul vibrante. Vários compartimentos para organizar o que você leva no dia a dia.',
    highlights: ['Vários compartimentos', 'Alça de mão e alça transversal', 'Fecho com zíper'],
    imagePath: '/products/bolsa-de-mao-azul.webp',
  },
  {
    slug: 'mochila-branca',
    name: 'Mochila Branca de Couro Sintético',
    category: 'bolsas',
    priceInCents: 22990,
    description:
      'Prática e atual, com espaço de sobra. O couro sintético branco deixa o visual leve, no trabalho ou no passeio.',
    highlights: ['Couro sintético', 'Alças reguláveis', 'Bolso interno'],
    imagePath: '/products/mochila-branca.webp',
  },
  {
    slug: 'bolsa-de-mao-preta',
    name: 'Bolsa de Mão Preta',
    category: 'bolsas',
    priceInCents: 27990,
    description:
      'O preto clássico que combina com tudo, num desenho funcional que não pode faltar no guarda-roupa.',
    highlights: ['Cor que combina com tudo', 'Divisórias internas', 'Fecho magnético'],
    imagePath: '/products/bolsa-de-mao-preta.webp',
  },
  {
    slug: 'chinelo-preto-e-marrom',
    name: 'Chinelo Preto e Marrom',
    category: 'calcados',
    priceInCents: 8990,
    description:
      'Conforto para os momentos de descanso, com a combinação de preto e marrom que deixa o casual mais caprichado.',
    highlights: ['Palmilha macia', 'Solado antiderrapante', 'Uso casual'],
    imagePath: '/products/chinelo-preto-e-marrom.webp',
  },
  {
    slug: 'sapato-dourado',
    name: 'Sapato Dourado',
    category: 'calcados',
    priceInCents: 24990,
    description:
      'Brilho na medida certa para ocasiões especiais. O tom dourado leva um toque de luxo a qualquer produção.',
    highlights: ['Acabamento metalizado', 'Salto confortável', 'Ocasiões especiais'],
    imagePath: '/products/sapato-dourado.webp',
  },
  {
    slug: 'sapato-vermelho',
    name: 'Sapato Vermelho',
    category: 'calcados',
    priceInCents: 19990,
    description:
      'Um vermelho que não passa despercebido. Para a festa ou para o passeio, é o ponto de cor que faltava.',
    highlights: ['Vermelho vibrante', 'Palmilha acolchoada', 'Festa ou passeio'],
    imagePath: '/products/sapato-vermelho.webp',
  },
]

export function findProductBySlug(slug: string): Product | undefined {
  return PRODUCTS.find((product) => product.slug === slug)
}
