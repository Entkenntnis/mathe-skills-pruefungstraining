import { Exercise } from '@/data/types'
import { pp, ppPolynom } from '@/helper/pretty-print'

interface DATA {
  a: number
  b: number
  c: number
}

export const exercise86: Exercise<DATA> = {
  title: '2023 / 6) Klammer auflösen',
  useCalculator: false,
  duration: 2,
  generator(rng) {
    return {
      a: rng.randomIntBetween(2, 4),
      b: rng.randomIntBetween(-3, 3),
      c: rng.randomIntBetween(-5, 5),
    }
  },
  constraint({ data }) {
    return data.b !== 0 && Math.abs(data.c) > 1
  },
  task({ data }) {
    return (
      <>
        <p>Löse die Klammer auf und fasse so weit wie möglich zusammen.</p>
        <p className="text-lg">
          (
          {ppPolynom([
            [data.a, 'x', 0],
            [data.b, 'x', 1],
          ])}
          )² {pp(data.c, 'merge_op')}x =
        </p>
      </>
    )
  },
  solution({ data }) {
    return (
      <>
        <p>Löse zuerst die Klammer auf (z.B. mit der binomischen Formel):</p>
        <p className="text-lg">
          {ppPolynom([
            [data.b * data.b, 'x', 2],
            [2 * data.a * data.b, 'x', 1],
            [data.a * data.a, 'x', 0],
          ])}{' '}
          {pp(data.c, 'merge_op')}x =
        </p>
        <p>Fasse die x-Terme zusammen:</p>
        <p className="text-lg font-bold">
          {ppPolynom([
            [data.b * data.b, 'x', 2],
            [2 * data.a * data.b + data.c, 'x', 1],
            [data.a * data.a, 'x', 0],
          ])}
        </p>
        <p>
          <small>
            Binomische Formel hier angewendet: (b − ax)² = a²x² − 2abx + b²
          </small>
        </p>
      </>
    )
  },
}
