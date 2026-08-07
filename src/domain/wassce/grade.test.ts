import { describe, expect, it } from 'vitest'
import {
  betterOf,
  byGradeAscending,
  fromPoints,
  isCreditPass,
  isGrade,
  meetsMinimum,
  stepsBetween,
  toPoints,
} from './grade'
import { GRADES, type Grade } from './types'

describe('grade', () => {
  it('maps A1..F9 to 1..9', () => {
    expect(GRADES.map(toPoints)).toEqual([1, 2, 3, 4, 5, 6, 7, 8, 9])
  })

  it('round-trips points and grades', () => {
    for (const grade of GRADES) {
      expect(fromPoints(toPoints(grade))).toBe(grade)
    }
  })

  it.each([0, 10, -1, 1.5])('rejects %s as a point value', (points) => {
    expect(() => fromPoints(points)).toThrow(RangeError)
  })

  it('recognises valid grades', () => {
    expect(isGrade('A1')).toBe(true)
    expect(isGrade('a1')).toBe(false)
    expect(isGrade('G10')).toBe(false)
    expect(isGrade(1)).toBe(false)
    expect(isGrade(null)).toBe(false)
  })

  describe('credit passes', () => {
    it.each(['A1', 'B2', 'B3', 'C4', 'C5', 'C6'] as Grade[])('%s is a credit pass', (g) => {
      expect(isCreditPass(g)).toBe(true)
    })

    it.each(['D7', 'E8', 'F9'] as Grade[])('%s is not a credit pass', (g) => {
      expect(isCreditPass(g)).toBe(false)
    })
  })

  describe('meetsMinimum', () => {
    it('accepts a better grade', () => {
      expect(meetsMinimum('A1', 'C6')).toBe(true)
    })
    it('accepts an exact match', () => {
      expect(meetsMinimum('C6', 'C6')).toBe(true)
    })
    it('rejects a worse grade', () => {
      expect(meetsMinimum('D7', 'C6')).toBe(false)
    })
  })

  it('counts steps between grades', () => {
    expect(stepsBetween('C4', 'B2')).toBe(2)
    expect(stepsBetween('B2', 'C4')).toBe(-2)
    expect(stepsBetween('A1', 'A1')).toBe(0)
  })

  it('picks the better grade, favouring the first on a tie', () => {
    expect(betterOf('B2', 'C4')).toBe('B2')
    expect(betterOf('C4', 'B2')).toBe('B2')
    expect(betterOf('C4', 'C4')).toBe('C4')
  })

  it('sorts best grades first', () => {
    expect((['C6', 'A1', 'B3'] as Grade[]).sort(byGradeAscending)).toEqual(['A1', 'B3', 'C6'])
  })
})
