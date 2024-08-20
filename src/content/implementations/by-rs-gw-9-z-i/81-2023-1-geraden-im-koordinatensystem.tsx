import { Exercise } from '@/data/types'
import { buildInlineFrac, buildJSX } from '@/helper/math-builder'
import { pp, ppPolynom } from '@/helper/pretty-print'

interface DATA {
  t: number
  m: number
  t2: number
  m2: number
  randomOrder: number[]
  gs: { m: number; t: number }[]
}

export const exercise81: Exercise<DATA> = {
  title: '2023 / 1) Geraden im Koordinatensystem',
  useCalculator: false,
  duration: 5,
  generator(rng) {
    return {
      t: rng.randomItemFromArray([-1, 0, 1]),
      m: rng.randomItemFromArray([1, 0.5, 0.333, -0.333, -0.5, -1]),
      t2: rng.randomItemFromArray([-1, 1]),
      m2: rng.randomItemFromArray([1, -1]),
      randomOrder: rng.shuffleArray([0, 1, 2, 3]),
      gs: [
        {
          m: 1,
          t: rng.randomItemFromArray([
            -5, -4, -3, -2, -1, -0.5, 0.5, 1, 2, 3, 4, 5,
          ]),
        },
        {
          m: -1,
          t: rng.randomItemFromArray([
            -5, -4, -3, -2, -1, -0.5, 0.5, 1, 2, 3, 4, 5,
          ]),
        },
        {
          m: 0.5,
          t: rng.randomItemFromArray([
            -5, -4, -3, -2, -1, -0.5, 0.5, 1, 2, 3, 4, 5,
          ]),
        },
        {
          m: -0.5,
          t: rng.randomItemFromArray([
            -5, -4, -3, -2, -1, -0.5, 0.5, 1, 2, 3, 4, 5,
          ]),
        },
      ],
    }
  },
  constraint({ data }) {
    return new Set(data.gs.map((x) => x.t)).size == 4
  },
  task({ data }) {
    return <></>
  },
  solution({ data }) {
    return <></>
  },
  subtasks: {
    tasks: [
      ({ data }) => {
        let fr: any = pp(data.m)
        if (data.m == -0.333) {
          fr = <>−{buildInlineFrac(1, 3)}</>
        }
        if (data.m == -0.5) {
          fr = <>−{buildInlineFrac(1, 2)}</>
        }
        if (data.m == 0.5) {
          fr = <>{buildInlineFrac(1, 2)}</>
        }
        if (data.m == 0.333) {
          fr = <>{buildInlineFrac(1, 3)}</>
        }
        if (data.m == 1) {
          fr = null
        }
        if (data.m == -1) {
          fr = '−'
        }
        return (
          <>
            <img src="/content/81_1.png" alt="Koordinatensystem" />
            <p>
              a) Zeichne die Gerade g mit der Gleichung y = {fr}x{' '}
              {data.t == 0 ? null : pp(data.t, 'merge_op')} in das
              Koordinatensystem.
            </p>
          </>
        )
      },
      ({ data }) => {
        return (
          <>
            <p>
              b) Die Gerade h steht senkrecht auf der Gerade g und verläuft
              durch den Punkt P(0|{pp(data.t2)}).
            </p>
            <p>Gib die Gleichung der Gerade h an.</p>
          </>
        )
      },
      ({ data }) => {
        return (
          <>
            <p>c)</p>
            <img src="/content/81_2.png" alt="Quadranten" className="-mt-5" />
            <p>
              Welche der folgenden Gleichungen beschreibt eine Gerade, die
              parallel zur Winkelhalbierenden des{' '}
              {data.m2 == 1 ? 'I. und III.' : 'II. und IV.'} Quadranten
              verläuft?
            </p>
            <ol>
              {data.randomOrder.map((i) => (
                <li key={i}>
                  y ={' '}
                  {ppPolynom([
                    [data.gs[i].m, 'x', 1],
                    [data.gs[i].t, 'x', 0],
                  ])}
                </li>
              ))}
            </ol>
          </>
        )
      },
    ],
    solutions: [
      ({ data }) => {
        function toX(x: number) {
          return 101 + 47 * x
        }
        function toY(y: number) {
          return 102 + 47 * -y
        }
        return (
          <>
            <p>
              Starte beim y-Achsenabschnitt {pp(data.t)}. Zeichne die Gerade g
              mit der passenden Steigung:
            </p>
            <svg viewBox="0 0 275 203" className="max-w-[275px]">
              <image href="/content/81_1.png" height="203" width="275" />
              <line
                x1={toX(-2)}
                y1={toY(-2 * data.m + data.t)}
                x2={toX(3.5)}
                y2={toY(3.5 * data.m + data.t)}
                stroke="blue"
                strokeWidth={2}
              />
              <text
                x={toX(0.5)}
                y={toY(0.5 * data.m + data.t - 0.4)}
                fontSize={18}
                textAnchor="left"
                stroke="blue"
              >
                g
              </text>
            </svg>
          </>
        )
      },
      ({ data }) => {
        return (
          <>
            <p>
              Berechne die Steigung von h mit der Formel −&nbsp;
              {buildInlineFrac(1, 'm')} (bilde Kehrwert der Steigung von g und
              drehe das Vorzeichen um):
            </p>
            <p className="text-lg font-bold">
              h: y ={' '}
              {ppPolynom([
                [Math.round(-1 / data.m), 'x', 1],
                [data.t2, 'x', 0],
              ])}
            </p>
          </>
        )
      },
      ({ data }) => {
        return (
          <>
            <p>
              Die Gerade hat die gleiche Steigung {pp(data.m2)} wie die
              Winkelhalbierende. Die Antwort ist{' '}
              <strong>
                Gleichung {data.randomOrder.indexOf(data.m2 == 1 ? 0 : 1) + 1}
              </strong>
              .
            </p>
          </>
        )
      },
    ],
  },
}
