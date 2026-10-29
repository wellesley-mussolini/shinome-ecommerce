import { IconArrowRight } from '@tabler/icons-react'
import { getRouteApi, useNavigate } from '@tanstack/react-router'
import { useState, type FormEvent } from 'react'

import { Logo } from '@/components/brand/Logo'
import { Button } from '@/components/ui/Button'
import { Heading } from '@/components/ui/Heading'
import { Input } from '@/components/ui/Input'
import { Label } from '@/components/ui/Label'
import { Spotlight } from '@/components/ui/Spotlight'
import { Text } from '@/components/ui/Text'
import { startSession } from '@/features/auth/session'

const loginRoute = getRouteApi('/login')

export function LoginPage() {
  const { voltar: returnPath } = loginRoute.useSearch()
  const navigate = useNavigate()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [hasTriedToSubmit, setHasTriedToSubmit] = useState(false)

  const isEmailMissing = email.trim() === ''
  const isPasswordMissing = password === ''
  const showEmailError = hasTriedToSubmit && isEmailMissing
  const showPasswordError = hasTriedToSubmit && isPasswordMissing

  const submitLogin = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    setHasTriedToSubmit(true)
    if (isEmailMissing || isPasswordMissing) return

    startSession(email.trim())
    void navigate({ href: returnPath ?? '/produtos' })
  }

  return (
    <main className="relative flex min-h-dvh items-center justify-center overflow-hidden px-4 py-12">
      <Spotlight className="-top-40 left-0 md:-top-20 md:left-60" />
      <div className="border-border bg-surface/80 relative flex w-full max-w-md flex-col gap-8 rounded-lg border p-8 backdrop-blur-sm">
        <div className="flex flex-col gap-4">
          <Logo className="text-brand h-8 w-auto self-start" />
          <div className="flex flex-col gap-2">
            <Heading level={1}>Entrar</Heading>
            <Text tone="muted">Ambiente de demonstração: qualquer e-mail e senha funcionam.</Text>
          </div>
        </div>

        <form noValidate onSubmit={submitLogin} className="flex flex-col gap-6">
          <div className="flex flex-col gap-2">
            <Label htmlFor="login-email">E-mail</Label>
            <Input
              id="login-email"
              type="email"
              autoComplete="email"
              placeholder="voce@exemplo.com"
              value={email}
              onChange={(event) => setEmail(event.target.value)}
              aria-invalid={showEmailError}
              aria-describedby={showEmailError ? 'login-email-error' : undefined}
            />
            {showEmailError && (
              <Text id="login-email-error" size="sm" tone="danger">
                Informe seu e-mail.
              </Text>
            )}
          </div>
          <div className="flex flex-col gap-2">
            <Label htmlFor="login-password">Senha</Label>
            <Input
              id="login-password"
              type="password"
              autoComplete="current-password"
              placeholder="••••••••"
              value={password}
              onChange={(event) => setPassword(event.target.value)}
              aria-invalid={showPasswordError}
              aria-describedby={showPasswordError ? 'login-password-error' : undefined}
            />
            {showPasswordError && (
              <Text id="login-password-error" size="sm" tone="danger">
                Informe sua senha.
              </Text>
            )}
          </div>
          <Button type="submit" size="lg" className="w-full">
            Entrar
            <IconArrowRight aria-hidden="true" className="size-4" />
          </Button>
        </form>
      </div>
    </main>
  )
}
