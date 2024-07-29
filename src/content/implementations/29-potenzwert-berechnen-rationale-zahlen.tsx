import { Exercise } from '@/data/types'
import { baseExponent } from '../generators/base-exponent'
import { pp } from '@/helper/pretty-print'
import { buildFrac } from '@/helper/math-builder'

interface DATA {
  nums: {
    base: number
    exponent: number
  }[]
}

export const exercise29: Exercise<DATA> = {
  title: 'Potenzwert berechnen - rationale Zahlen',
  useCalculator: false,
  duration: 2,
  generator(rng) {
    return { nums: [0, 1, 2].map(() => baseExponent(rng)) }
  },
  task({ data }) {
    return (
      <>
        <p>Berechne.</p>
        <p>
          {data.nums.map((entry, i) => (
            <span className="inline-block mr-16" key={i}>
              <span className="inline-block pb-1 scale-y-[2.8]">(</span>
              {buildFrac(1, entry.base)}
              <span className="inline-block pb-1 scale-y-[2.8]">)</span>
              <sup>{entry.exponent}</sup>
            </span>
          ))}
        </p>
      </>
    )
  },
  solution({ data }) {
    return (
      <>
        <p>
          {data.nums.map((entry, i) => (
            <span className="inline-block mr-16" key={i}>
              <span className="inline-block pb-1 scale-y-[2.8]">(</span>
              {buildFrac(1, entry.base)}
              <span className="inline-block pb-1 scale-y-[2.8]">)</span>
              <sup>{entry.exponent}</sup> ={' '}
              {buildFrac(1, pp(Math.pow(entry.base, entry.exponent)))}
            </span>
          ))}
        </p>
      </>
    )
  },
}
