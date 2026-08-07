import { describe, expect, it } from 'vitest'
import { parseIntent } from './intent'

describe('parseIntent', () => {
  it.each([
    ['What can I study with Aggregate 12?', 12],
    ['what can i study with agg 8', 8],
    ['What can I study with aggregate of 20?', 20],
    ['what can i do with 14', 14],
    ['What can I study with aggregate twelve?', 12],
  ])('%s → study-with-aggregate %i', (question, aggregate) => {
    expect(parseIntent(question)).toEqual({ kind: 'study-with-aggregate', aggregate })
  })

  it.each([
    'Which university is easiest to enter?',
    'which uni has the lowest cut-off',
    'what is the least competitive university',
  ])('%s → easiest-university', (question) => {
    expect(parseIntent(question).kind).toBe('easiest-university')
  })

  it('recognises a comparison with "and"', () => {
    expect(parseIntent('Compare Computer Science and Law')).toEqual({
      kind: 'compare',
      left: 'Computer Science',
      right: 'Law',
    })
  })

  it('recognises a comparison with "vs"', () => {
    expect(parseIntent('Nursing vs Medicine')).toEqual({
      kind: 'compare',
      left: 'Nursing',
      right: 'Medicine',
    })
  })

  it.each([
    'What grades do I need for Medicine?',
    'What grades do I need to study Law',
    'How do I get into Nursing?',
  ])('%s → grades-needed', (question) => {
    expect(parseIntent(question).kind).toBe('grades-needed')
  })

  it('extracts the programme from a grades-needed question', () => {
    const intent = parseIntent('What grades do I need for Medicine?')
    expect(intent).toMatchObject({ kind: 'grades-needed', programmeQuery: 'Medicine' })
  })

  it.each(['Do I qualify for Computer Science?', 'Can I qualify for Law', 'Am I eligible for Nursing?'])(
    '%s → do-i-qualify',
    (question) => {
      expect(parseIntent(question).kind).toBe('do-i-qualify')
    },
  )

  it.each([
    ['What are the cheapest programmes?', 'cheapest'],
    ['which has the highest salary', 'highest-salary'],
    ['what is the shortest programme', 'shortest'],
    ['What careers fit my grades?', 'careers'],
    ['which deadlines are closing soon', 'deadlines'],
    ['what is my aggregate', 'my-aggregate'],
  ])('%s → %s', (question, kind) => {
    expect(parseIntent(question).kind).toBe(kind)
  })

  it('falls back to unknown for unrelated text', () => {
    expect(parseIntent('what is the weather in Kumasi').kind).toBe('unknown')
  })

  it('treats empty input as unknown', () => {
    expect(parseIntent('   ').kind).toBe('unknown')
  })
})
