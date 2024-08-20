import { Exercise } from '@/data/types'
import { pp } from '@/helper/pretty-print'

interface DATA {
  a: number
  b: number
  c: number
  d: number
}

export const exercise24: Exercise<DATA> = {
  title: 'Rechengesetze - vorteilhaft addieren',
  useCalculator: false,
  duration: 1,
  generator(rng) {
    const sum1 = rng.randomIntBetween(1, 9) * 10
    const part1 =
      rng.randomIntBetween(1, 9) / 10 + rng.randomIntBetween(2, sum1 - 2)
    const sum2 = rng.randomIntBetween(1, 9) * 5
    const part2 =
      rng.randomIntBetween(1, 9) / 10 + rng.randomIntBetween(2, sum2 - 2)
    return { a: part1, b: part2, c: sum1 - part1, d: sum2 - part2 }
  },
  task({ data }) {
    return (
      <>
        <p>Rechne vorteilhaft.</p>
        <p className="text-lg">
          {pp(data.a)} + {pp(data.b)} + {pp(data.c)} + {pp(data.d)}
        </p>
      </>
    )
  },
  solution({ data }) {
    return (
      <>
        <p>Vertausche die Summanden für runde Zwischenergebnisse.</p>
        <p className="text-lg">
          {pp(data.a)} + {pp(data.b)} + {pp(data.c)} + {pp(data.d)} = (
          {pp(data.a)} + {pp(data.c)}) + ({pp(data.b)} + {pp(data.d)}) ={' '}
          {pp(data.a + data.c)} + {pp(data.b + data.d)} ={' '}
          <strong>{pp(data.a + data.b + data.c + data.d)}</strong>
        </p>
      </>
    )
  },
}
