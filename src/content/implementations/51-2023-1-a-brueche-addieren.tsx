import { Exercise } from '@/data/types'
import { getGcd } from '@/helper/get-gcd'
import { buildFrac } from '@/helper/math-builder'

interface DATA {
  a: number
  b: number
  c: number
  d: number
}

export const exercise51: Exercise<DATA> = {
  title: '2023 / 1a) Brüche addieren',
  useCalculator: false,
  duration: 1,
  generator(rng) {
    const b = rng.randomIntBetween(2, 8)
    const d = b * rng.randomItemFromArray([2, 3])
    const a = rng.randomIntBetween(1, b - 1)
    const c = rng.randomIntBetween(1, d - 1)
    return { a, b, c, d }
  },
  constraint({ data }) {
    return (
      getGcd(data.a, data.b) == 1 &&
      getGcd(data.c, data.d) == 1 &&
      data.a / data.b + data.c / data.d < 1 &&
      getGcd((data.a * data.d) / data.b + data.c, data.d) == 1 &&
      data.a !== data.c
    )
  },
  task({ data }) {
    return (
      <>
        <p>Berechne.</p>
        <p>
          {buildFrac(data.a, data.b)} + {buildFrac(data.c, data.d)} =
        </p>
      </>
    )
  },
  solution({ data }) {
    return (
      <>
        <p>Erweitere auf den Hauptnenner {data.d}:</p>
        <p>
          {buildFrac((data.a * data.d) / data.b, data.d)} +{' '}
          {buildFrac(data.c, data.d)}
        </p>
        <p>Addiere die Zähler und behalte den Nenner:</p>
        <p>
          <strong>
            {buildFrac((data.a * data.d) / data.b + data.c, data.d)}
          </strong>
        </p>
      </>
    )
  },
}
