import { spawnSync } from 'node:child_process'
import { mkdtempSync, rmSync, writeFileSync } from 'node:fs'
import { tmpdir } from 'node:os'
import { join } from 'node:path'

import { afterAll, describe, expect, it } from 'vitest'

const CONFIG_PATH = join(process.cwd(), '.oxlintrc.json')
const OXLINT_BIN = join(process.cwd(), 'node_modules', 'oxlint', 'bin', 'oxlint')
const fixtureDir = mkdtempSync(join(tmpdir(), 'shinome-lint-'))

afterAll(() => {
  rmSync(fixtureDir, { recursive: true, force: true })
})

function lintSource(source: string): string {
  const fixturePath = join(fixtureDir, 'fixture.ts')
  writeFileSync(fixturePath, source)
  const lintRun = spawnSync(process.execPath, [OXLINT_BIN, '-c', CONFIG_PATH, fixturePath], {
    encoding: 'utf8',
  })
  return lintRun.stdout
}

describe('regra shinome/only-const', () => {
  it('acusa let e var', () => {
    const lintOutput = lintSource('let total = 0\nvar count = 1\nexport { total, count }\n')

    expect(lintOutput).toMatch(/only-const.*Use const em vez de let/)
    expect(lintOutput).toMatch(/only-const.*Use const em vez de var/)
  })

  it('acusa let mesmo depois de uma URL na mesma linha', () => {
    const lintOutput = lintSource(
      "const url = 'https://x.supabase.co'; let retries = 3\nexport { url, retries }\n",
    )

    expect(lintOutput).toMatch(/only-const/)
  })

  it('não confunde a palavra let dentro de um texto com uma declaração', () => {
    const lintOutput = lintSource("export const greeting = 'let me in'\n")

    expect(lintOutput).not.toMatch(/only-const/)
  })
})
