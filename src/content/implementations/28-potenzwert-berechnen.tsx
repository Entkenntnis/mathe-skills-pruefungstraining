import { Exercise } from '@/data/types'
import { baseExponent } from '../generators/base-exponent'
import { pp } from '@/helper/pretty-print'

interface DATA {
  nums: {
    base: number
    exponent: number
  }[]
}

export const exercise28: Exercise<DATA> = {
  title: 'Potenzwert berechnen',
  useCalculator: false,
  duration: 1,
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
              {entry.base}
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
              {entry.base}
              <sup>{entry.exponent}</sup> ={' '}
              {pp(Math.pow(entry.base, entry.exponent))}
            </span>
          ))}
        </p>
      </>
    )
  },
}
