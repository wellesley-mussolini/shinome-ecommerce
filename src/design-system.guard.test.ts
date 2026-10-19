import { readdirSync, readFileSync } from 'node:fs'
import { join, relative, sep } from 'node:path'

import { describe, expect, it } from 'vitest'

const SRC_DIR = join(process.cwd(), 'src')
const TAILWIND_ENTRY = 'styles/tailwind.css'

function listFiles(dir: string): string[] {
  return readdirSync(dir, { withFileTypes: true }).flatMap((entry) => {
    const fullPath = join(dir, entry.name)
    return entry.isDirectory() ? listFiles(fullPath) : [fullPath]
  })
}

const files = listFiles(SRC_DIR).map((path) => ({
  path: relative(SRC_DIR, path).split(sep).join('/'),
  content: readFileSync(path, 'utf8'),
}))
function readTailwindEntry(): string {
  const entry = files.find(({ path }) => path === TAILWIND_ENTRY)
  if (!entry) throw new Error(`${TAILWIND_ENTRY} não encontrado`)
  return entry.content
}

const componentFiles = files.filter(
  ({ path }) => /\.(ts|tsx)$/.test(path) && !/\.test\.(ts|tsx)$/.test(path),
)

describe('design system', () => {
  it('tem um único arquivo CSS: a entrada do Tailwind', () => {
    const cssFiles = files.filter(({ path }) => path.endsWith('.css')).map(({ path }) => path)

    expect(cssFiles).toEqual([TAILWIND_ENTRY])
  })

  it('a entrada do Tailwind só importa o Tailwind e declara tokens no @theme, sem CSS próprio', () => {
    const css = readTailwindEntry()
    const withoutComments = css.replace(/\/\*[\s\S]*?\*\//g, '')
    const withoutTheme = withoutComments.replace(/@theme\s*\{[^}]*\}/g, '')
    const withoutImport = withoutTheme.replace(/@import\s+'tailwindcss';/, '')

    expect(withoutImport.trim()).toBe('')
  })

  it('desliga a paleta padrão do Tailwind para só existirem cores semânticas', () => {
    const css = readTailwindEntry()

    expect(css).toMatch(/--color-\*:\s*initial;/)
  })

  it.each(componentFiles)('$path não usa estilo inline', ({ content }) => {
    expect(content).not.toMatch(/\bstyle=\{/)
  })

  it.each(componentFiles)('$path não usa valores arbitrários do Tailwind', ({ content }) => {
    expect(content).not.toMatch(/(?:^|[\s"'`])[a-z][\w:-]*-\[[^\]]+\]/m)
  })
})
