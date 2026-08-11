
/**
 * Intents the advisor can answer. Every one is answered by computing over the
 * catalogue and the eligibility engine, never by a canned paragraph.
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
  /** "What courses does KNUST offer?" */
  | { kind: 'university-programmes'; universityQuery: string }
  /** "Where can I study Nursing?" */
  | { kind: 'where-to-study'; programmeQuery: string }
  /** "Is there distance learning?" / "fee paying options" */
  | { kind: 'by-track'; track: 'distance' | 'fee-paying' }
  /** A bare programme name, or "cut-off for Law". */
  | { kind: 'programme-detail'; programmeQuery: string }
  | { kind: 'greeting' }
  | { kind: 'acknowledgement' }
  | { kind: 'help' }
  | { kind: 'unknown'; text: string }

/**
 * What the advisor carries between turns.
 *
 * Enough to resolve "what about KNUST?" against the previous question, and no
 * more: a student's grades already live in their own state.
 */
export interface AdvisorMemory {
  lastIntent?: Intent['kind']
  lastProgrammeId?: string
  lastUniversityId?: string
}

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

/**
 * Classify a free-text question. Order matters: more specific patterns are
 * tested before broader ones.
 */
export function parseIntent(input: string, memory?: AdvisorMemory): Intent {
  const text = input.trim()
  const lower = text.toLowerCase()

  if (!text) return { kind: 'unknown', text }

  // Greetings and thanks are not questions, but answering them with "I would
  // rather not guess" reads as broken.
  if (/^(hi|hello|hey|yo|good (morning|afternoon|evening|day))\b/i.test(lower)) {
    return { kind: 'greeting' }
  }
  if (/^(thanks|thank you|ok(ay)?|cool|nice|got it)\b/i.test(lower)) {
    return { kind: 'acknowledgement' }
  }
  if (/^(help|what can you do|how does this work)\b/i.test(lower)) {
    return { kind: 'help' }
  }

  /*
   * "Give me cutoffs for Computer Science in all universities offering it."
   * The screenshot of the live advisor showed this falling through to
   * "unknown", which is the single most obvious question a student would ask.
   */
  const cutoffFor = text.match(
    /\bcut[\s-]?offs?\b[^a-z]*(?:for|of|in)?\s+(.+?)(?:\s+(?:in|at|across|for)\s+(?:all\s+)?(?:the\s+)?universit\w*.*)?$/i,
  )
  if (cutoffFor?.[1]) {
    const subject = cleanSubject(cutoffFor[1])
    const everywhere = /\ball\b|\bevery\b|\buniversit/i.test(text)
    if (subject && !/^(?:the|a|an|my|it)$/i.test(subject)) {
      return everywhere
        ? { kind: 'where-to-study', programmeQuery: subject }
        : { kind: 'programme-detail', programmeQuery: subject }
    }
  }

  // "What about KNUST?" / "and Law?": only meaningful with prior context.
  const followUp = text.match(/^(?:what about|how about|and)\s+(.+?)\??$/i)
  if (followUp?.[1] && memory?.lastIntent) {
    const subject = cleanSubject(followUp[1])
    if (memory.lastIntent === 'university-programmes') {
      return { kind: 'university-programmes', universityQuery: subject }
    }
    if (memory.lastIntent === 'where-to-study') {
      return { kind: 'where-to-study', programmeQuery: subject }
    }
    if (memory.lastIntent === 'grades-needed') {
      return { kind: 'grades-needed', programmeQuery: subject }
    }
    return { kind: 'programme-detail', programmeQuery: subject }
  }

  // "What grades do I need for Medicine?"
  if (/\b(?:what|which)\b.*\bgrades?\b.*\b(?:need(?:ed|s)?|require[ds]?|get into|for)\b/i.test(lower)) {
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

  // "Is there distance learning?" / "any fee paying options?"
  if (/\b(distance|online|remote)\s*(learning|education|programme|program|course)?\b/i.test(lower)) {
    return { kind: 'by-track', track: 'distance' }
  }
  if (/\b(fee[\s-]?paying|full[\s-]?fee|self[\s-]?sponsor)/i.test(lower)) {
    return { kind: 'by-track', track: 'fee-paying' }
  }

  // "Where can I study Nursing?" / "which universities offer Law?"
  if (
    /\b(?:where can i (?:study|read|do)|which (?:universit\w+|schools?)\s+(?:offer|teach|have|do))\b/i.test(
      lower,
    )
  ) {
    return {
      kind: 'where-to-study',
      programmeQuery: extractProgrammeQuery(text, [
        /(?:study|read|do|offer|teach|have)\s+(.+)/i,
      ]),
    }
  }

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

  /*
   * "What courses does KNUST offer?" / "programmes at Ashesi" / "KNUST courses".
   *
   * Deliberately last of the keyword rules: "the cheapest programmes" and "the
   * shortest programme" also contain the word, so the superlatives must get
   * first refusal. A university has to actually resolve for this to win.
   */
  if (/\b(?:courses?|programmes?|programs?)\b/i.test(lower)) {
    const does = text.match(/does\s+([A-Za-z.'()&-]+(?:\s+[A-Za-z.'()&-]+){0,4}?)\s+(?:offer|have|teach|run)/i)
    const at = text.match(/\b(?:at|in|from)\s+([A-Za-z.'()&-]+(?:\s+[A-Za-z.'()&-]+){0,4})\s*\??$/i)
    const leading = text.match(/^([A-Za-z.'()&-]+(?:\s+[A-Za-z.'()&-]+){0,3}?)\s+(?:courses?|programmes?|programs?)\b/i)
    const target = does?.[1] ?? at?.[1] ?? leading?.[1]
    if (target && !/^(what|which|the|any|all|are|is|do|does|show|list|me)\b/i.test(target.trim())) {
      return { kind: 'university-programmes', universityQuery: cleanSubject(target) }
    }
  }

  const aggregate = extractAggregate(text)
  if (aggregate !== null) return { kind: 'study-with-aggregate', aggregate }

  // "What can I study?" with no number → use the student's own results.
  if (/\bwhat can i (?:study|do|read)\b/i.test(lower)) {
    return { kind: 'my-aggregate' }
  }

  return { kind: 'unknown', text }
}
