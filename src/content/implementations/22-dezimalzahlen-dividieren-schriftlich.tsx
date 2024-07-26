import { Exercise } from '@/data/types'
import { pp } from '@/helper/pretty-print'

interface DATA {
  a: number
  b: number
  r: number
}

export const exercise22: Exercise<DATA> = {
  title: 'Dezimalzahlen divideren - schriftlich',
  useCalculator: false,
  duration: 3,
  generator(rng) {
    const r = rng.randomIntBetween(111, 999) / 100
    const b = rng.randomIntBetween(2, 9) / 10
    return { a: b * r, b, r }
  },
  task({ data }) {
    return (
      <>
        <p>Dividiere schriftlich.</p>
        <p>
          {pp(data.a)} : {pp(data.b)}
        </p>
      </>
    )
  },
  solution({ data }) {
    return (
      <>
        <p>TODO: Visualisierung für Ergebnis {pp(data.r)}</p>
      </>
    )
  },
}
