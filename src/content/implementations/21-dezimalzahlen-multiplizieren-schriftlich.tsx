import { Exercise } from '@/data/types'
import { pp } from '@/helper/pretty-print'

interface DATA {
  nums: { a: number; b: number }[]
}

export const exercise21: Exercise<DATA> = {
  title: 'Dezimalzahlen multiplizieren - schriftlich',
  useCalculator: false,
  duration: 3,
  generator(rng) {
    return {
      nums: [0, 1].map(() => {
        return {
          a: rng.randomIntBetween(111, 999) / 10,
          b: rng.randomIntBetween(11, 99) / 10,
        }
      }),
    }
  },
  task({ data }) {
    return (
      <>
        <p>Multipliziere schriftlich.</p>
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
        {data.nums.map((entry, i) => (
          <p key={i}>
            TODO: Schriftliche Rechnung für Ergebnis {pp(entry.a * entry.b)}
          </p>
        ))}
      </>
    )
  },
}
