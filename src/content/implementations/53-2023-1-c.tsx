import { Exercise } from '@/data/types'
import { constrainedGeneration } from '@/helper/constrained-generation'
import { getGcd } from '@/helper/get-gcd'
import { buildFrac } from '@/helper/math-builder'
import { pp } from '@/helper/pretty-print'
import { roundToDigits } from '@/helper/round-to-digits'

interface DATA {
  a: number
  b: number
  c: number
}

export const exercise53: Exercise<DATA> = {
  title: '2023 / 1c (Zahl)',
  useCalculator: false,
  duration: 1,
  generator(rng) {
    return constrainedGeneration(
      () => {
        const diff = rng.randomIntBetween(0, 4) / 10
        const b = rng.randomIntBetween(1, 9) / 10
        const c = rng.randomItemFromArray([2, 3, 4])
        const a = b * c + diff
        return { a, b, c }
      },
      (data) => {
        return (
          pp(data.a).length > 1 &&
          Math.floor(data.a) == Math.floor(data.b * data.c) &&
          pp(data.b * data.c).length > 1
        )
      }
    )
  },
  task({ data }) {
    return (
      <>
        <p>Berechne.</p>
        <p className="text-lg">
          {pp(data.a)} − {pp(data.b)} · {pp(data.c)} =
        </p>
      </>
    )
  },
  solution({ data }) {
    return (
      <>
        <p>Berechne zuerst das Produkt:</p>
        <p className="text-lg">
          {pp(data.a)} − {pp(data.b * data.c)}
        </p>
        <p>Berechne die Differenz:</p>
        <p className="text-lg">
          <strong>{pp(data.a - data.b * data.c)}</strong>
        </p>
      </>
    )
  },
}
