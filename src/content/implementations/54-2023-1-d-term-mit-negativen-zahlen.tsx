import { Exercise } from '@/data/types'
import { pp } from '@/helper/pretty-print'

interface DATA {
  a: number
  b: number
  c: number
}

export const exercise54: Exercise<DATA> = {
  title: '2023 / 1d) Term mit negativen Zahlen',
  useCalculator: false,
  duration: 1,
  generator(rng) {
    const a = rng.randomIntBetween(1, 4)
    const b = rng.randomIntBetween(1, 4) * -1
    const c = rng.randomIntBetween(1, 4) * rng.randomItemFromArray([1, -1])
    return { a, b, c }
  },
  constraint({ data }) {
    return data.a + data.b < 0
  },
  task({ data }) {
    return (
      <>
        <p>Berechne.</p>
        <p className="text-lg">
          −({pp(data.a)} {pp(data.b, 'merge_op')}) {pp(data.c, 'merge_op')} =
        </p>
      </>
    )
  },
  solution({ data }) {
    return (
      <>
        <p>Berechne die Klammer:</p>
        <p className="text-lg">
          −({pp(data.a + data.b)}) {pp(data.c, 'merge_op')}
        </p>
        <p>
          Drehe das Vorzeichen um und {data.c > 0 ? 'addiere' : 'subtrahiere'}:
        </p>
        <p className="text-lg">
          {pp(-(data.a + data.b))} {pp(data.c, 'merge_op')} ={' '}
          <strong>{pp(-(data.a + data.b) + data.c)}</strong>
        </p>
      </>
    )
  },
}
