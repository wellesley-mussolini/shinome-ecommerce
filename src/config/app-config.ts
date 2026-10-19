import { parseEnv } from './env'

export const appConfig = parseEnv(import.meta.env)
