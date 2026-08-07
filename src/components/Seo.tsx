const SITE_NAME = 'UniMatch Ghana'
const DEFAULT_DESCRIPTION =
  'Enter your WASSCE grades and instantly see every Ghanaian university programme you qualify for, with the cut-off points and where they came from.'

/** Set at build time; falls back to the origin at runtime. */
export const SITE_URL =
  import.meta.env.VITE_SITE_URL ??
  (typeof window !== 'undefined' ? window.location.origin : 'https://unimatch-ghana.herokuapp.com')

interface SeoProps {
  title: string
  description?: string
  /** Path only, e.g. "/cut-off-points". */
  path?: string
  /** Schema.org JSON-LD for this page. */
  structuredData?: Record<string, unknown>
  noIndex?: boolean
}

/**
 * Per-route document metadata.
 *
 * React 19 hoists `<title>`, `<meta>` and `<link>` out of components into
 * `<head>`, so this needs no helmet library. Without it every route shared one
 * title and had no description — which is exactly why a competitor with the
 * same data is discoverable and we were not.
 */
export default function Seo({
  title,
  description = DEFAULT_DESCRIPTION,
  path,
  structuredData,
  noIndex = false,
}: SeoProps) {
  const fullTitle = title === SITE_NAME ? title : `${title} | ${SITE_NAME}`
  const canonical = path ? `${SITE_URL}${path}` : undefined

  return (
    <>
      <title>{fullTitle}</title>
      <meta name="description" content={description} />
      {canonical && <link rel="canonical" href={canonical} />}
      {noIndex && <meta name="robots" content="noindex" />}

      <meta property="og:type" content="website" />
      <meta property="og:site_name" content={SITE_NAME} />
      <meta property="og:title" content={fullTitle} />
      <meta property="og:description" content={description} />
      {canonical && <meta property="og:url" content={canonical} />}

      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={fullTitle} />
      <meta name="twitter:description" content={description} />

      {structuredData && (
        <script type="application/ld+json">{JSON.stringify(structuredData)}</script>
      )}
    </>
  )
}
