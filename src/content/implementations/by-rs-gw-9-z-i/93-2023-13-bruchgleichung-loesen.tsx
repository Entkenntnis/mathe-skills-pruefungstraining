import { Exercise } from '@/data/types'
import { buildFrac } from '@/helper/math-builder'
import { pp, ppPolynom } from '@/helper/pretty-print'

interface DATA {
  a: number
  b: number
  c: number
  d: number
}

export const exercise93: Exercise<DATA> = {
  title: '2023 / 13) Bruchgleichung lösen',
  useCalculator: false,
  duration: 2,
  generator(rng) {
    const [a, b] = rng.shuffleArray(
      rng.randomItemFromArray([
        [1, 2],
        [2, 3],
        [1, 4],
        [3, 4],
        [1, 5],
        [2, 5],
        [3, 5],
        [4, 5],
      ])
    )
    const c = a * rng.randomIntBetween(2, 4)
    const d = rng.randomIntBetween(-4, 4)
    return { a, b, c, d }
  },
  constraint({ data }) {
    return data.d !== 0 && data.b * data.c !== data.a * data.d
  },
  task({ data }) {
    return (
      <>
        <p>
          Gib die Lösungsmenge L der Bruchgleichung mit D = ℚ \{' '}
          {`{${pp(-data.d)}}`} an.
        </p>
        <p>
          {buildFrac(data.a, data.b)} ={' '}
          {buildFrac(data.c, <>x {pp(data.d, 'merge_op')}</>)}
        </p>
      </>
    )
  },
  solution({ data }) {
    const r = (data.b * data.c - data.a * data.d) / data.a
    return (
      <>
        <p>Multipliziere über Kreuz, vereinfache und löse die Gleichung:</p>
        <div className="not-prose">
          <table className="not-prose ">
            <tr>
              <td className="text-right">
                {data.a} · (x {pp(data.d, 'merge_op')})
              </td>
              <td className="px-1">=</td>
              <td>
                {data.b} · {data.c}
              </td>
              <td></td>
            </tr>
            <tr>
              <td className="text-right">
                {ppPolynom([
                  [data.a, 'x', 1],
                  [data.a * data.d, 'x', 0],
                ])}
              </td>
              <td className="px-1">=</td>
              <td>{data.b * data.c}</td>
              <td className="pl-3">| {pp(-data.a * data.d, 'merge_op')}</td>
            </tr>
            <tr>
              <td className="text-right">{ppPolynom([[data.a, 'x', 1]])}</td>
              <td className="px-1">=</td>
              <td>{data.b * data.c - data.a * data.d}</td>
              <td className="pl-3">{data.a !== 1 && <>| : {data.a}</>}</td>
            </tr>
            {data.a !== 1 && (
              <tr>
                <td className="text-right">x</td>
                <td className="px-1">=</td>
                <td>{r}</td>
                <td></td>
              </tr>
            )}
          </table>
        </div>
        <p>Gib die Lösungsmenge an:</p>
        <p className="font-bold">L = {`{ ${pp(r)} }`}</p>
        <p>
          <small>
            Alternativ kann die Aufgabe durch geschicktes Rückwärts-Denken auch
            im Kopf gelöst werden.
          </small>
        </p>
      </>
    )
  },
}
