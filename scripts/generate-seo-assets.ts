/**
 * Emit sitemap.xml and robots.txt from the catalogue.
 *
 * Every programme and university gets a crawlable URL, so the cut-off data we
 * hold is discoverable rather than locked behind a grade form. Run as part of
 * the build.
 */
import { writeFileSync } from 'node:fs'
import { join, resolve } from 'node:path'
import { fileURLToPath } from 'node:url'
import { catalogue } from '../src/data/catalogue.generated'

const ROOT = resolve(fileURLToPath(new URL('..', import.meta.url)))
const PUBLIC_DIR = join(ROOT, 'public')

const SITE_URL = (process.env.VITE_SITE_URL ?? 'https://unimatch-ghana.herokuapp.com').replace(
  /\/$/,
  '',
)

interface Entry {
  path: string
  changefreq: 'daily' | 'weekly' | 'monthly' | 'yearly'
  priority: number
}

const staticEntries: Entry[] = [
  { path: '/', changefreq: 'weekly', priority: 1.0 },
  { path: '/cut-off-points', changefreq: 'weekly', priority: 0.9 },
  { path: '/eligibility', changefreq: 'monthly', priority: 0.9 },
  { path: '/universities', changefreq: 'weekly', priority: 0.8 },
  { path: '/simulator', changefreq: 'monthly', priority: 0.7 },
  { path: '/deadlines', changefreq: 'weekly', priority: 0.7 },
  { path: '/advisor', changefreq: 'monthly', priority: 0.6 },
  { path: '/privacy', changefreq: 'yearly', priority: 0.3 },
  { path: '/terms', changefreq: 'yearly', priority: 0.3 },
]

const universityEntries: Entry[] = catalogue.universities.map((university) => ({
  path: `/university/${university.id}`,
  changefreq: 'weekly',
  priority: 0.8,
}))

const programmeEntries: Entry[] = catalogue.programmes.map((programme) => ({
  path: `/programme/${programme.id}`,
  changefreq: 'weekly',
  priority: 0.7,
}))

const entries = [...staticEntries, ...universityEntries, ...programmeEntries]

const lastmod = new Date().toISOString().slice(0, 10)

const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${entries
  .map(
    (entry) => `  <url>
    <loc>${SITE_URL}${entry.path}</loc>
    <lastmod>${lastmod}</lastmod>
    <changefreq>${entry.changefreq}</changefreq>
    <priority>${entry.priority.toFixed(1)}</priority>
  </url>`,
  )
  .join('\n')}
</urlset>
`

const robots = `User-agent: *
Allow: /

# Personal pages hold nothing useful to a crawler.
Disallow: /profile
Disallow: /saved
Disallow: /compare
Disallow: /login
Disallow: /signup

Sitemap: ${SITE_URL}/sitemap.xml
`

writeFileSync(join(PUBLIC_DIR, 'sitemap.xml'), sitemap, 'utf8')
writeFileSync(join(PUBLIC_DIR, 'robots.txt'), robots, 'utf8')

console.log(`✓ sitemap.xml (${entries.length} urls) and robots.txt written`)
