import { Exercise } from '@/data/types'
import { baseExponent } from '../generators/base-exponent'
import { pp } from '@/helper/pretty-print'

interface DATA {
  nums: { base: number; exponent: number }[]
}

export const exercise32: Exercise<DATA> = {
  title: 'Als Potenz schreiben',
  useCalculator: false,
  duration: 2,
  generator(rng) {
    return { nums: [0, 1].map(() => baseExponent(rng)) }
  },
  task({ data }) {
    return (
      <>
        <p>Schreibe als Potenz mit einem Exponent größer als 1.</p>
        <p>
          {data.nums.map((entry, i) => (
            <span className="inline-block mr-16" key={i}>
              {pp(Math.pow(entry.base, entry.exponent))}
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
              {pp(Math.pow(entry.base, entry.exponent))} = {entry.base}
              <sup>{entry.exponent}</sup>
            </span>
          ))}
        </p>
      </>
    )
  },
}
