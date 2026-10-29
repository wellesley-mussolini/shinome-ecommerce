// Autenticação de demonstração: qualquer e-mail e senha entram, e a sessão é só o e-mail guardado
// no navegador. Quando a autenticação real chegar (Supabase Auth), ela substitui este módulo.
const SESSION_STORAGE_KEY = 'shinome:session-email'

export function startSession(email: string): void {
  localStorage.setItem(SESSION_STORAGE_KEY, email)
}

export function endSession(): void {
  localStorage.removeItem(SESSION_STORAGE_KEY)
}

export function getSessionEmail(): string | null {
  return localStorage.getItem(SESSION_STORAGE_KEY)
}
