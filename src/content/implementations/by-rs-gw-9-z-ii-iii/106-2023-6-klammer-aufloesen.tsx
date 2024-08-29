import { Exercise } from '@/data/types'
import { pp, ppPolynom } from '@/helper/pretty-print'

interface DATA {
  a: number
  c: number
}

export const exercise106: Exercise<DATA> = {
  title: '2023 / 6) Klammer auflösen',
  useCalculator: false,
  duration: 2,
  generator(rng) {
    return {
      a: rng.randomIntBetween(1, 7),
      c: rng.randomIntBetween(-5, 5),
    }
  },
  constraint({ data }) {
    return Math.abs(data.c) > 1 && 2 * data.a + data.c !== 0
  },
  task({ data }) {
    return (
      <>
        <p>Löse die Klammer auf und fasse so weit wie möglich zusammen.</p>
        <p className="text-lg">
          (
          {ppPolynom([
            [1, 'x', 1],
            [data.a, 'x', 0],
          ])}
          )² {pp(data.c, 'merge_op')}x =
        </p>
      </>
    )
  },
  solution({ data }) {
    return (
      <>
        <p>Nutze die binomische Formel:</p>
        <p className="text-lg">
          {ppPolynom([
            [1, 'x', 2],
            [2 * data.a, 'x', 1],
            [data.a * data.a, 'x', 0],
          ])}{' '}
          {pp(data.c, 'merge_op')}x =
        </p>
        <p>Fasse die x-Terme zusammen:</p>
        <p className="text-lg font-bold">
          {ppPolynom([
            [1, 'x', 2],
            [2 * data.a + data.c, 'x', 1],
            [data.a * data.a, 'x', 0],
          ])}
        </p>
      </>
    )
  },
}
