import { Exercise } from '@/data/types'
import { buildInlineFrac } from '@/helper/math-builder'
import { pp } from '@/helper/pretty-print'

interface DATA {
  m: [number, number]
}

export const exercise101: Exercise<DATA> = {
  title: '2023 / 1) Geraden im Koordinatensystem',
  useCalculator: false,
  duration: 3,
  generator(rng) {
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
    }
  },
  constraint({ data }) {
    return true
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
            b) Überprüfe durch Rechnung, ob der Punkt P(4|−1) auf der Gerade
            h:&nbsp;y&nbsp;=&nbsp;−0,25&nbsp;·&nbsp;x liegt.
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
      ({ data }) => <></>,
    ],
  },
}
