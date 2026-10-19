import { z } from 'zod'

const envSchema = z.object({
  VITE_SUPABASE_URL: z.url({ protocol: /^https?$/ }),
  VITE_SUPABASE_PUBLISHABLE_KEY: z.string().trim().min(1),
})

export type AppEnv = {
  supabaseUrl: string
  supabasePublishableKey: string
}

export function parseEnv(source: Record<string, unknown>): AppEnv {
  const result = envSchema.safeParse(source)

  if (!result.success) {
    throw new Error(
      `Variáveis de ambiente inválidas (veja o .env.example):\n${z.prettifyError(result.error)}`,
    )
  }

  return {
    supabaseUrl: result.data.VITE_SUPABASE_URL,
    supabasePublishableKey: result.data.VITE_SUPABASE_PUBLISHABLE_KEY,
  }
}
