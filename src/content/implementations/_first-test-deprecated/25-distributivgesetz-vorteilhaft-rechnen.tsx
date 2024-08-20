import { Exercise } from '@/data/types'
import { pp } from '@/helper/pretty-print'

interface DATA {
  a: number
  b: number
  c: number
}

export const exercise25: Exercise<DATA> = {
  title: 'Distributivgesetz - vorteilhaft rechnen',
  useCalculator: false,
  duration: 2,
  generator(rng) {
    const a = rng.randomIntBetween(1, 9) + rng.randomIntBetween(1, 9) / 10
    const sum = rng.randomItemFromArray([10, 100, 1000])
    const part1 =
      rng.randomIntBetween(1, 9) / 10 + rng.randomIntBetween(3, sum - 3)

    return { a, b: part1, c: sum - part1 }
  },
  task({ data }) {
    return (
      <>
        <p>Rechne vorteilhaft.</p>
        <p className="text-lg">
          {pp(data.a)} · {pp(data.b)} + {pp(data.a)} · {pp(data.c)}
        </p>
      </>
    )
  },
  solution({ data }) {
    return (
      <>
        <p className="text-lg">
          {pp(data.a)} · {pp(data.b)} + {pp(data.a)} · {pp(data.c)} ={' '}
          {pp(data.a)} · ({pp(data.b)} + {pp(data.c)}) = {pp(data.a)} ·{' '}
          {pp(data.b + data.c)} ={' '}
          <strong>{pp(data.a * (data.b + data.c))}</strong>
        </p>
        <p>Gleiche Faktoren einer Summe können zusammengelegt werden.</p>
      </>
    )
  },
}
