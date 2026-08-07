import { GRADES, type Grade } from '../wassce/types'

/**
 * Intents the advisor can answer. Every one is answered by computing over the
 * catalogue and the eligibility engine — never by a canned paragraph.
 *
 * The Figma prototype's advisor returned one of five hardcoded strings chosen
 * by substring match, with figures that drift from the dataset. This replaces
 * that with answers that cannot be wrong about eligibility.
 */
export type Intent =
  | { kind: 'study-with-aggregate'; aggregate: number }
  | { kind: 'do-i-qualify'; programmeQuery: string }
  | { kind: 'grades-needed'; programmeQuery: string }
  | { kind: 'easiest-university' }
  | { kind: 'compare'; left: string; right: string }
  | { kind: 'careers' }
  | { kind: 'cheapest' }
  | { kind: 'highest-salary' }
  | { kind: 'shortest' }
  | { kind: 'deadlines' }
  | { kind: 'my-aggregate' }
  | { kind: 'unknown'; text: string }

const NUMBER_WORDS: Record<string, number> = {
  six: 6, seven: 7, eight: 8, nine: 9, ten: 10, eleven: 11, twelve: 12,
  thirteen: 13, fourteen: 14, fifteen: 15, sixteen: 16, seventeen: 17,
  eighteen: 18, nineteen: 19, twenty: 20,
}

function extractAggregate(text: string): number | null {
  const digits = text.match(/\b(?:aggregate|agg\.?)\s*(?:of\s*)?(\d{1,2})\b/i)
  if (digits?.[1]) return Number(digits[1])

  const word = text.match(/\b(?:aggregate|agg\.?)\s*(?:of\s*)?([a-z]+)\b/i)
  if (word?.[1] && NUMBER_WORDS[word[1].toLowerCase()] !== undefined) {
    return NUMBER_WORDS[word[1].toLowerCase()]!
  }

  // A bare number in a question about studying, e.g. "what can I do with 14".
  const bare = text.match(/\bwith\s+(?:an?\s+)?(\d{1,2})\b/i)
  if (bare?.[1]) return Number(bare[1])

  return null
}

/** "Compare X and Y" / "X vs Y". */
function extractComparison(text: string): { left: string; right: string } | null {
  const vs = text.match(/(.+?)\s+(?:vs\.?|versus)\s+(.+)/i)
  if (vs?.[1] && vs[2]) {
    return { left: cleanSubject(vs[1]), right: cleanSubject(vs[2]) }
  }

  const compare = text.match(/compare\s+(.+?)\s+(?:and|with|to)\s+(.+)/i)
  if (compare?.[1] && compare[2]) {
    return { left: cleanSubject(compare[1]), right: cleanSubject(compare[2]) }
  }

  return null
}

function cleanSubject(raw: string): string {
  return raw
    .replace(/^(?:compare|what about|how about|tell me about)\s+/i, '')
    .replace(/[?.!,]+$/g, '')
    .trim()
}

/** Strip the question framing to leave a likely programme name. */
function extractProgrammeQuery(text: string, patterns: RegExp[]): string {
  for (const pattern of patterns) {
    const match = text.match(pattern)
    if (match?.[1]) return cleanSubject(match[1])
  }
  return cleanSubject(text)
}

export function isGradeToken(token: string): token is Grade {
  return (GRADES as readonly string[]).includes(token.toUpperCase())
}

/**
 * Classify a free-text question. Order matters: more specific patterns are
 * tested before broader ones.
 */
export function parseIntent(input: string): Intent {
  const text = input.trim()
  const lower = text.toLowerCase()

  if (!text) return { kind: 'unknown', text }

  // "What grades do I need for Medicine?"
  if (/\b(?:what|which)\b.*\bgrades?\b.*\b(?:need|require|get into|for)\b/i.test(lower)) {
    return {
      kind: 'grades-needed',
      programmeQuery: extractProgrammeQuery(text, [
        /(?:need|require)(?:d)?\s+(?:for|to (?:study|do|enter|get into))\s+(.+)/i,
        /\bfor\s+(.+)/i,
      ]),
    }
  }

  // "How do I get into Law?" / "What do I need for Nursing?"
  if (/\b(?:how (?:do|can) i get into|what do i need for)\b/i.test(lower)) {
    return {
      kind: 'grades-needed',
      programmeQuery: extractProgrammeQuery(text, [/(?:get into|need for)\s+(.+)/i]),
    }
  }

  // "Do I qualify for Computer Science?"
  if (/\b(?:do i|can i|am i)\b.*\b(?:qualify|eligible|get in)\b/i.test(lower)) {
    return {
      kind: 'do-i-qualify',
      programmeQuery: extractProgrammeQuery(text, [
        /(?:qualify|eligible)\s+(?:for|to (?:study|do))\s+(.+)/i,
        /\bfor\s+(.+)/i,
      ]),
    }
  }

  const comparison = extractComparison(text)
  if (comparison) return { kind: 'compare', ...comparison }

  if (/\b(?:easiest|easier|lowest cut ?-?off|least competitive|most accessible)\b/i.test(lower)) {
    if (/\buniversit/i.test(lower)) return { kind: 'easiest-university' }
    return { kind: 'easiest-university' }
  }

  if (/\b(?:cheapest|lowest fees?|most affordable|least expensive)\b/i.test(lower)) {
    return { kind: 'cheapest' }
  }

  if (/\b(?:highest|best|most)\b.*\b(?:salary|paying|pay|earning)\b/i.test(lower)) {
    return { kind: 'highest-salary' }
  }

  if (/\b(?:shortest|quickest|fastest)\b.*\b(?:programme|program|course|degree|duration)\b/i.test(lower)) {
    return { kind: 'shortest' }
  }

  if (/\bdeadline|closing|closes|application date\b/i.test(lower)) {
    return { kind: 'deadlines' }
  }

  if (/\bcareer|job|profession|work as\b/i.test(lower)) {
    return { kind: 'careers' }
  }

  if (/\b(?:my|what is my)\b.*\baggregate\b/i.test(lower)) {
    return { kind: 'my-aggregate' }
  }

  const aggregate = extractAggregate(text)
  if (aggregate !== null) return { kind: 'study-with-aggregate', aggregate }

  // "What can I study?" with no number → use the student's own results.
  if (/\bwhat can i (?:study|do|read)\b/i.test(lower)) {
    return { kind: 'my-aggregate' }
  }

  return { kind: 'unknown', text }
}
