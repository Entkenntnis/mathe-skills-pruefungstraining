import { Exercise } from '@/data/types'
import { pp, ppPolynom } from '@/helper/pretty-print'

interface DATA {
  a: number
  b: number
  c: number
  d: number
  e: number
}

export const exercise84: Exercise<DATA> = {
  title: '2023 / 4) Gleichung lösen',
  useCalculator: false,
  duration: 2,
  generator(rng) {
    const b = rng.randomIntBetween(2, 5)
    const d = rng.randomItemFromArray([1, -1])
    const c = rng.randomIntBetween(2, 5)
    const t = b * c - 1
    const e = t * rng.randomIntBetween(1, 5)
    return { a: -b * d, b, c, d, e }
  },
  constraint({ data }) {
    return data.e < 50
  },
  task({ data }) {
    return (
      <>
        <p>Gib die Lösungsmenge L der folgenden Gleichung an.</p>
        <p className="text-lg">
          {ppPolynom([[data.a, 'x', 2]])} + {pp(data.b)} · (
          {ppPolynom([
            [data.c, 'x', 1],
            [data.d, 'x', 2],
          ])}
          ) = x + {pp(data.e)}
        </p>
      </>
    )
  },
  solution({ data }) {
    const r = data.e / (data.c * data.b - 1)
    return (
      <>
        <p>Multipliziere die Klammer aus:</p>
        <p className="text-lg">
          {ppPolynom([[data.a, 'x', 2]])} +{' '}
          {ppPolynom([
            [data.c * data.b, 'x', 1],
            [data.d * data.b, 'x', 2],
          ])}{' '}
          = x + {pp(data.e)}
        </p>
        <p>Die Quadrate heben sich auf, vereinfache und löse:</p>
        <p className="text-lg">
          {ppPolynom([[data.c * data.b, 'x', 1]])} = x + {pp(data.e)} | −x
          <br />
          {ppPolynom([[data.c * data.b - 1, 'x', 1]])} = {pp(data.e)}{' '}
          &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;| : {pp(data.c * data.b - 1)}
          <br />
          &nbsp;&nbsp;x = {pp(r)}
        </p>
        <p>Gib die Lösungsmenge an:</p>
        <p className="text-lg font-bold">
          L = {'{'} {pp(r)} {'}'}
        </p>
      </>
    )
  },
}
