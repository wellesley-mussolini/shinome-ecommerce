import '@testing-library/jest-dom/vitest'
import { cleanup } from '@testing-library/react'
import { afterEach, beforeEach, vi } from 'vitest'

beforeEach(() => {
  // O jsdom não implementa window.scrollTo, que a restauração de scroll do router chama a cada
  // navegação; sem isso, cada teste de fluxo enche a saída com "Not implemented".
  vi.spyOn(window, 'scrollTo').mockImplementation(() => undefined)
})

afterEach(() => {
  cleanup()
  localStorage.clear()
})
