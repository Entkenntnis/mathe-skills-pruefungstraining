import { Exercise } from '@/data/types'
import { constrainedGeneration } from '@/helper/constrained-generation'
import { pp } from '@/helper/pretty-print'

interface DATA {
  a: number
  b: number
}

export const exercise52: Exercise<DATA> = {
  title: '2023 / 1b (Zahl)',
  useCalculator: false,
  duration: 1,
  generator(rng) {
    return constrainedGeneration(
      () => {
        const a = rng.randomIntBetween(11, 99) / 10
        const b = 0.1
        if (rng.randomIntBetween(1, 2) == 1) {
          return { a: b, b: a }
        }
        return { a, b }
      },
      (data) => {
        return pp(data.a).length > 1 && pp(data.b).length > 1
      }
    )
  },
  task({ data }) {
    return (
      <>
        <p>Berechne.</p>
        <p className="text-lg">
          {pp(data.a)} · {pp(data.b)} =
        </p>
      </>
    )
  },
  solution({ data }) {
    return (
      <>
        <p>
          Die Faktoren besitzen zusammen 2 Stellen nach dem Komma, so auch das
          Ergebnis:
        </p>
        <p className="text-lg">
          <strong>{pp(data.a * data.b)}</strong>
        </p>
      </>
    )
  },
}
