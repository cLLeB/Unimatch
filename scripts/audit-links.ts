/**
 * Fetches every external URL the catalogue links to and reports the dead ones.
 *
 * This exists because the catalogue shipped with seventeen of nineteen
 * "official admissions page" links pointing at nothing, and nothing in the
 * build would have told us. Links rot on someone else's schedule: a
 * university moves domain, renames a path, retires a portal, so the only way
 * to know is to ask.
 *
 *   npm run data:audit-links
 *
 * Exits non-zero when anything is unreachable, so it can gate a release.
 */
import { spawnSync } from 'node:child_process'
import { readFileSync } from 'node:fs'
import { resolve } from 'node:path'

/*
 * UEW answers with response headers larger than Node's 16KB default, which
 * fetch reports as HEADERS_OVERFLOW rather than as a redirect or an error.
 * Browsers accept them, so treating those pages as broken would be the audit
 * lying about twenty-six perfectly good links. Re-exec once with a larger cap.
 */
const HEADER_CAP = '--max-http-header-size=131072'
if (!process.execArgv.includes(HEADER_CAP)) {
  // execArgv carries tsx's own loader flags, so the child can still run .ts.
  const child = spawnSync(
    process.execPath,
    [HEADER_CAP, ...process.execArgv, ...process.argv.slice(1)],
    { stdio: 'inherit' },
  )
  process.exit(child.status ?? 1)
}

const ROOT = resolve(import.meta.dirname, '..')
const read = (p: string) => JSON.parse(readFileSync(resolve(ROOT, p), 'utf8'))

const USER_AGENT =
  'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/126.0 Safari/537.36'

/** Phrases that mean a 200 response is really a missing page. */
const SOFT_404 = [
  'page not found',
  '404 not found',
  'nothing found',
  'this page could not be found',
  'account suspended',
  'origin dns error',
]

/*
 * Ghanaian university hosts are slow and several rate-limit, so an impatient
 * audit reports healthy pages as dead and trains everyone to ignore it. Retry
 * with a growing pause and keep few requests in flight; a run takes minutes,
 * which is the right trade for a result that can be trusted.
 */
const TIMEOUT_MS = 45_000
const ATTEMPTS = 4
const RETRY_BACKOFF_MS = 3_000
const CONCURRENCY = 3

interface Check {
  url: string
  where: string[]
  ok: boolean
  status: number
  detail: string
}

async function check(url: string, attempt = 1): Promise<Omit<Check, 'where'>> {
  const controller = new AbortController()
  const timer = setTimeout(() => controller.abort(), TIMEOUT_MS)
  try {
    const res = await fetch(url, {
      redirect: 'follow',
      signal: controller.signal,
      headers: { 'user-agent': USER_AGENT, accept: 'text/html,*/*' },
    })
    const body = await res.text().catch(() => '')
    const title = (body.match(/<title[^>]*>([\s\S]{0,300}?)<\/title>/i)?.[1] ?? '')
      .replace(/\s+/g, ' ')
      .trim()
    const soft404 = SOFT_404.some((phrase) =>
      `${title} ${body.slice(0, 4000)}`.toLowerCase().includes(phrase),
    )
    if (!res.ok) return { url, ok: false, status: res.status, detail: title || res.statusText }
    if (soft404) return { url, ok: false, status: res.status, detail: `soft 404: ${title}` }
    return { url, ok: true, status: res.status, detail: title }
  } catch (error) {
    if (attempt < ATTEMPTS) {
      await new Promise((r) => setTimeout(r, RETRY_BACKOFF_MS * attempt))
      return check(url, attempt + 1)
    }
    const cause = (error as { cause?: { code?: string } })?.cause?.code
    return { url, ok: false, status: 0, detail: String(cause ?? (error as Error).message) }
  } finally {
    clearTimeout(timer)
  }
}

function collect(): Map<string, string[]> {
  const urls = new Map<string, string[]>()
  const add = (url: string | undefined, where: string) => {
    if (!url) return
    const existing = urls.get(url)
    if (existing) existing.push(where)
    else urls.set(url, [where])
  }

  for (const u of read('data/seed/universities.json')) {
    add(u.admissionsUrl, `${u.id}.admissionsUrl`)
    add(u.programmesUrl, `${u.id}.programmesUrl`)
    add(u.cutoffUrl, `${u.id}.cutoffUrl`)
  }
  for (const p of read('data/seed/programmes.json')) {
    add(p.officialUrl, `${p.id}.officialUrl`)
    add(p.applyUrl, `${p.id}.applyUrl`)
    add(p.provenance?.sourceUrl, `${p.id}.provenance`)
    add(p.fees?.sourceUrl, `${p.id}.fees`)
  }
  for (const d of read('data/seed/deadlines.json')) {
    add(d.provenance?.sourceUrl, `${d.id}.provenance`)
  }
  return urls
}

async function main() {
  const urls = collect()
  const entries = [...urls.entries()]
  console.log(`Checking ${entries.length} distinct URLs...\n`)

  const results: Check[] = []
  let cursor = 0
  await Promise.all(
    Array.from({ length: CONCURRENCY }, async () => {
      while (cursor < entries.length) {
        const entry = entries[cursor++]
        if (!entry) break
        const [url, where] = entry
        const result = await check(url)
        results.push({ ...result, where })
        process.stdout.write(result.ok ? '.' : 'X')
      }
    }),
  )

  const broken = results.filter((r) => !r.ok)
  console.log(`\n\n${results.length - broken.length}/${results.length} reachable`)

  if (broken.length === 0) {
    console.log('Every external link resolves.')
    return
  }

  console.log(`\n${broken.length} broken:`)
  for (const b of broken.sort((x, y) => x.url.localeCompare(y.url))) {
    console.log(`  [${b.status || 'ERR'}] ${b.url}`)
    console.log(`        ${b.detail}`)
    console.log(`        used by ${b.where.length} record(s), e.g. ${b.where[0]}`)
  }
  process.exitCode = 1
}

await main()
