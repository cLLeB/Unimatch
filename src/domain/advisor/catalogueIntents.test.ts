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
