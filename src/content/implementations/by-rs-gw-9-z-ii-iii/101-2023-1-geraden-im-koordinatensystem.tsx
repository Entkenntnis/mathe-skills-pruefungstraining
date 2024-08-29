import { Exercise } from '@/data/types'
import { buildInlineFrac } from '@/helper/math-builder'
import { pp } from '@/helper/pretty-print'

interface DATA {
  m: [number, number]
  x: number
  y: number
  m2: number
  isCorrect: boolean
}

export const exercise101: Exercise<DATA> = {
  title: '2023 / 1) Geraden im Koordinatensystem',
  useCalculator: false,
  duration: 3,
  generator(rng) {
    const [x, m2] = rng.randomItemFromArray([
      [-0.25, 4],
      [-0.2, 5],
      [-0.5, 2],
      [-0.5, 4],
      [-0.1, 10],
      [-4, 0.25],
      [-5, 0.2],
      [-2, 0.5],
      [-4, 0.5],
      [-10, 0.1],
    ])
    const isCorrect = rng.randomBoolean()
    const y = isCorrect
      ? x * m2
      : x * m2 + rng.randomItemFromArray([-2, -1, 1, 2])
    return {
      m: rng.randomItemFromArray([
        [1, 1],
        [1, 2],
        [1, 3],
        [2, 1],
        [3, 1],
        [1.5, 1],
        [-1, 1],
      ]),
      x,
      y,
      m2,
      isCorrect,
    }
  },
  constraint({ data }) {
    return data.y !== 0
  },
  task({ data }) {
    return <></>
  },
  solution({ data }) {
    return <></>
  },
  subtasks: {
    tasks: [
      ({ data }) => (
        <>
          <p>
            a) Zeichne die Ursprungsgerade g mit der Gleichung y ={' '}
            {data.m[1] == 1
              ? pp(data.m[0])
              : buildInlineFrac(data.m[0], data.m[1])}{' '}
            · x in das Koordinatensystem.
          </p>
          <img src="/content/101.png" alt="Koordinatensystem" />
        </>
      ),
      ({ data }) => (
        <>
          <p>
            b) Überprüfe durch Rechnung, ob der Punkt P({pp(data.x)}|
            {pp(data.y)}) auf der Gerade h:&nbsp;y&nbsp;=&nbsp;{pp(data.m2)}
            &nbsp;·&nbsp;x liegt.
          </p>
        </>
      ),
    ],
    solutions: [
      ({ data }) => {
        function toX(n: number) {
          return 97 + n * 23.5 * 2
        }
        function toY(n: number) {
          return 177 - n * 23.5 * 2
        }
        const m = data.m[0] / data.m[1]
        return (
          <>
            <p>
              Starte beim Ursprung und zeichne die Gerade g mit der passenden
              Steigung{' '}
              {data.m[1] == 1
                ? pp(data.m[0])
                : buildInlineFrac(data.m[0], data.m[1])}
              :
            </p>
            <svg viewBox="0 0 277 249" className="max-w-[277px]">
              <image href="/content/101.png" width="277" height="249" />
              <line
                x1={toX(-2)}
                y1={toY(-2 * m)}
                x2={toX(3.5)}
                y2={toY(3.5 * m)}
                stroke="blue"
                strokeWidth={2}
              />
            </svg>
          </>
        )
      },
      ({ data }) => (
        <>
          <p>Berechne den y-Wert:</p>
          <p>
            y = {pp(data.m2)} · {pp(data.x)} = {pp(data.m2 * data.x)}
          </p>
          <p>Vergleiche:</p>
          <p>
            {pp(data.m2 * data.x)} {data.isCorrect ? '=' : '≠'} {pp(data.y)} ⇒ P
            {data.isCorrect ? '∈' : '∉'} h
          </p>
          <p className="font-bold">
            {data.isCorrect
              ? 'Der Punkt P liegt auf der Geraden h.'
              : 'Der Punkt P liegt nicht auf der Geraden h.'}
          </p>
        </>
      ),
    ],
  },
}
