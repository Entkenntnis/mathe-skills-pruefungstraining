import { Exercise } from '@/data/types'
import { pp } from '@/helper/pretty-print'

interface DATA {
  nums: { a: number; b: number }[]
}

export const exercise20: Exercise<DATA> = {
  title: 'Dezimalzahlen multiplizieren - im Kopf',
  useCalculator: false,
  duration: 2,
  generator(rng) {
    return {
      nums: [0, 1, 2].map(() => {
        let a_f = rng.randomItemFromArray([1, 10, 100])
        let b_f = rng.randomItemFromArray([1, 10, 100])
        if (a_f == 1 && b_f == 1) {
          b_f = 10
        }
        const a = rng.randomIntBetween(2, 9) / a_f
        const b = rng.randomIntBetween(2, 9) / b_f
        return { a, b }
      }),
    }
  },
  task({ data }) {
    return (
      <>
        <p>Multipliziere im Kopf.</p>
        <p>
          {data.nums.map((entry, i) => (
            <span className="mr-16" key={i}>
              {pp(entry.a)} · {pp(entry.b)}
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
          Setze das Komma im Ergebnis so, dass es genauso viele Stellen nach dem
          Komma hat wie beide Faktoren zusammen.
        </p>
        <p>
          {data.nums.map((entry, i) => (
            <span className="mr-16" key={i}>
              {pp(entry.a)} · {pp(entry.b)} = {pp(entry.a * entry.b)}
            </span>
          ))}
        </p>
      </>
    )
  },
}
