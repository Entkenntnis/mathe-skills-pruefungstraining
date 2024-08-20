import { Exercise } from '@/data/types'
import { pp } from '@/helper/pretty-print'

interface DATA {
  nums: { a: number; b: number; isMult: boolean }[]
}

export const exercise23: Exercise<DATA> = {
  title: 'Rechnen mit Zehnerpotenzen',
  useCalculator: false,
  duration: 2,
  generator(rng) {
    return {
      nums: [0, 1, 2].map(() => {
        const f = rng.randomItemFromArray([1, 10])
        const a = rng.randomIntBetween(11, 99) / f
        const b = rng.randomItemFromArray([10, 100, 100])
        return { a, b, isMult: rng.randomItemFromArray([true, false]) }
      }),
    }
  },
  task({ data }) {
    return (
      <>
        <p>Berechne im Kopf.</p>
        <p>
          {data.nums.map((entry, i) => (
            <span className="mr-16" key={i}>
              {pp(entry.a)} {entry.isMult ? '·' : ':'} {pp(entry.b)}
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
          Um mit 10 zu multiplizieren (dividieren), verschiebe das Komma nach
          links (rechts).
        </p>
        <p>
          {data.nums.map((entry, i) => (
            <span className="mr-16" key={i}>
              {pp(entry.a)} {entry.isMult ? '·' : ':'} {pp(entry.b)} ={' '}
              {pp(entry.isMult ? entry.a * entry.b : entry.a / entry.b)}
            </span>
          ))}
        </p>
      </>
    )
  },
}
