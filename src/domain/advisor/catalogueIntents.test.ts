import { describe, expect, it } from 'vitest'
import { catalogue } from '../../data/catalogue'
import { ask } from './answer'
import { parseIntent } from './intent'

/**
 * The advisor against the real catalogue.
 *
 * With 400+ programmes across public and private institutions, the risk is no
 * longer "does it answer" but "does it answer the question that was actually
 * asked". These exercise the phrasings a student would really use.
 */
const ctx = { catalogue, results: null, now: new Date('2026-08-07') }

describe('intent routing on real phrasings', () => {
  it.each([
    ['What courses does KNUST offer?', 'university-programmes'],
    ['What programmes does Ashesi offer?', 'university-programmes'],
    ['courses at Valley View', 'university-programmes'],
    ['Where can I study Nursing?', 'where-to-study'],
    ['which universities offer Law?', 'where-to-study'],
    ['Is there distance learning?', 'by-track'],
    ['any fee paying options?', 'by-track'],
    // The superlatives must keep priority over the word "programmes".
    ['What are the cheapest programmes?', 'cheapest'],
    ['what is the shortest programme', 'shortest'],
    ['Which university is easiest to enter?', 'easiest-university'],
  ])('%s → %s', (question, kind) => {
    expect(parseIntent(question).kind).toBe(kind)
  })
})

describe('phrasings that previously fell through to "unknown"', () => {
  it('handles the exact question from the live advisor screenshot', () => {
    const answer = ask(ctx, 'Give me cutoffs for Computer Science in all Universities offering it')
    expect(answer.text).not.toMatch(/rather (?:not guess|say so)/)
    expect(answer.text).toMatch(/institutions?/)
    expect(answer.programmeIds.length).toBeGreaterThan(0)
  })

  it('greets instead of refusing', () => {
    const answer = ask(ctx, 'hello')
    expect(answer.text).toMatch(/^Hello/)
    expect(answer.text).toContain('programmes')
  })

  it('explains what it can do', () => {
    expect(ask(ctx, 'help').text).toContain('cut-off')
  })

  it('treats a bare programme name as a lookup', () => {
    const answer = ask(ctx, 'Nursing')
    expect(answer.text).toMatch(/cut-off of \d+/)
  })

  it('treats a bare university name as a lookup', () => {
    const answer = ask(ctx, 'KNUST')
    expect(answer.text).toMatch(/KNUST has \d+ programmes/)
  })

  it('answers "cut off for Law"', () => {
    expect(ask(ctx, 'cut off for Law').text).toMatch(/cut-off of \d+/)
  })
})

describe('conversation memory', () => {
  it('resolves "what about X?" against the previous question', () => {
    const first = ask(ctx, 'What courses does KNUST offer?')
    expect(first.memory?.lastIntent).toBe('university-programmes')

    const second = ask({ ...ctx, memory: first.memory }, 'what about Ashesi?')
    expect(second.text).toMatch(/Ashesi has \d+ programmes/)
  })

  it('carries a where-to-study thread forward', () => {
    const first = ask(ctx, 'Where can I study Nursing?')
    const second = ask({ ...ctx, memory: first.memory }, 'and Law?')
    expect(second.text).toMatch(/institutions?/)
  })

  it('remembers the programme just discussed', () => {
    const answer = ask(ctx, 'Nursing')
    expect(answer.memory?.lastProgrammeId).toBeTruthy()
  })

  it('does not misread a follow-up with no prior context', () => {
    // Without memory, "and Law?" is not a follow-up and must not crash.
    const answer = ask(ctx, 'and Law?')
    expect(answer.text.length).toBeGreaterThan(10)
  })
})

describe('answers over the real catalogue', () => {
  it('lists a public university with its cut-off range', () => {
    const answer = ask(ctx, 'What courses does KNUST offer?')
    expect(answer.text).toMatch(/KNUST has \d+ programmes/)
    expect(answer.programmeIds.length).toBeGreaterThan(0)
  })

  it('covers private universities too', () => {
    const answer = ask(ctx, 'What programmes does Ashesi offer?')
    expect(answer.text).toMatch(/Ashesi has \d+ programmes/)
  })

  it('finds every institution offering a subject', () => {
    const answer = ask(ctx, 'Where can I study Nursing?')
    expect(answer.text).toMatch(/across \d+ institutions/)
    expect(answer.text).toContain('from')
  })

  it('knows about distance intakes', () => {
    const answer = ask(ctx, 'Is there distance learning?')
    expect(answer.text).toMatch(/\d+ distance-learning intakes/)
  })

  it('knows about fee-paying intakes', () => {
    const answer = ask(ctx, 'Do you have fee paying options?')
    expect(answer.text).toMatch(/\d+ fee-paying intakes/)
  })

  it('says so plainly for an unknown university', () => {
    expect(ask(ctx, 'What courses does Hogwarts offer?').text).toContain('could not find')
  })

  it('never claims a fee it does not hold', () => {
    const answer = ask(ctx, 'What are the cheapest programmes?')
    // Either it ranks only the programmes that publish a fee, or it declines
    // outright. What it must never do is invent one.
    expect(answer.text).toMatch(/publish (?:a fee|their fees)|GH₵/)
  })

  it('answers every default follow-up it offers', () => {
    const seen = new Set<string>()
    let queue = ask(ctx, 'hello').followUps

    for (let depth = 0; depth < 3 && queue.length > 0; depth += 1) {
      const next: string[] = []
      for (const question of queue) {
        if (seen.has(question)) continue
        seen.add(question)
        const answer = ask(ctx, question)
        expect(answer.text.length, `empty answer for "${question}"`).toBeGreaterThan(20)
        expect(
          parseIntent(question).kind,
          `"${question}" is offered but not understood`,
        ).not.toBe('unknown')
        next.push(...answer.followUps)
      }
      queue = next
    }

    expect(seen.size).toBeGreaterThan(3)
  })
})
