import { Exercise } from '@/data/types'
import { pp } from '@/helper/pretty-print'

interface DATA {
  a: number
  b: number
  c: number
}

export const exercise67: Exercise<DATA> = {
  title: '2023 / 13) Gleichung lösen',
  useCalculator: false,
  duration: 2,
  generator(rng) {
    return {
      a: -rng.randomIntBetween(2, 5),
      b: rng.randomIntBetween(-15, -2),
      c: rng.randomIntBetween(-10, -1),
    }
  },
  constraint({ data }) {
    return Math.abs(data.b + data.c) % Math.abs(data.a) == 0
  },
  task({ data }) {
    return (
      <>
        <p>Gib die Lösungsmenge L der folgenden Gleichung an (G = ℚ).</p>
        <p className="text-lg">
          {pp(data.a)} ∙ x = {pp(data.b)} {pp(data.c, 'merge_op')}
        </p>
      </>
    )
  },
  solution({ data }) {
    const r = (data.b + data.c) / data.a
    return (
      <>
        <p>Berechne die rechte Seite und forme um:</p>
        <p className="text-lg">
          {pp(data.a)} ∙ x = {pp(data.b + data.c)}&nbsp;&nbsp;&nbsp;&nbsp;| :{' '}
          {pp(data.a, 'embrace_neg')}
          <br />x = {pp(r)}
        </p>
        <p>Gib die Lösungsmenge an:</p>
        <p className="text-lg">
          <strong>
            L = {'{'} {pp(r)} {'}'}
          </strong>
        </p>
      </>
    )
  },
}
