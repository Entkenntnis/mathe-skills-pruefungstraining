import { Exercise } from '@/data/types'
import { buildInlineFrac } from '@/helper/math-builder'
import { pp } from '@/helper/pretty-print'
import { renderCross, rightAngle } from '@/helper/svg-builder'
import { basicSvg } from '../by-rs-gw-9-z-i/94-2023-14-thaleskreis'

interface DATA {
  d: number
  h: number
  A: number
}

export const exercise115: Exercise<DATA> = {
  title: '2023 / 15) Thaleskreis',
  useCalculator: false,
  duration: 1,
  generator(rng) {
    const d = rng.randomItemFromArray([4, 3.5, 3, 2.5])
    const h = rng.randomIntBetween(1, Math.floor(d - 0.5))
    return { d, A: h * d, h }
  },
  constraint({ data }) {
    return true
  },
  task({ data }) {
    return (
      <>
        <p>
          Luna möchte mithilfe des Thaleskreiss ein bei C rechtwinkliges Dreieck
          ABC zeichnen. Vervollständige die Zeichnung zum Dreieck ABC mit dem
          Flächeninhalt A von {pp(data.A)} cm².
        </p>
        {basicSvg(
          data,
          <>
            {renderCross(9 * 25, 225, 'black')}
            <text x={9 * 25 + 4} y={245} fill="black">
              M
            </text>
            <path
              d={`M ${9 * 25 + data.d * 50},225 A ${data.d * 50},${
                data.d * 50
              } 0 0 0 ${9 * 25 - data.d * 50},225`}
              strokeWidth={2}
              fill="none"
              stroke="black"
            ></path>
          </>
        )}
      </>
    )
  },
  solution({ data }) {
    const d_c = Math.sqrt(data.d * data.d - data.h * data.h)
    const c_x = 9 * 25 - d_c * 50
    const c_y = 225 - data.h * 50

    const angle = (Math.atan(data.h / (d_c + data.d)) / Math.PI) * 180
    return (
      <>
        <p>Löse die Formel für den Flächeninhalt nach h auf:</p>
        <p>
          {pp(data.A)} cm² = {buildInlineFrac(1, 2)} · {data.d * 2} cm · h<br />
          h = {data.h} cm
        </p>
        <p>
          Zeichne auf der gewünschten Höhe eine Gerade. Der Punkt C liegt auf
          dem Schnittpunkt von Thaleskreis und Gerade:
        </p>
        {basicSvg(
          data,
          <>
            {renderCross(9 * 25, 225, 'black')}
            <text x={9 * 25 + 4} y={245} fill="black">
              M
            </text>
            <path
              d={`M ${9 * 25 + data.d * 50},225 A ${data.d * 50},${
                data.d * 50
              } 0 0 0 ${9 * 25 - data.d * 50},225`}
              strokeWidth={2}
              fill="none"
              stroke="black"
            ></path>
            <line
              x1={25}
              x2={425}
              y1={225 - data.h * 50}
              y2={225 - data.h * 50}
              stroke="orange"
              strokeDasharray="4 4"
              strokeWidth={2}
            ></line>
            {renderCross(c_x, c_y, 'blue')}
            <text x={c_x - 16} y={c_y - 4} fill="blue">
              C
            </text>
            <line
              x1={c_x}
              y1={c_y}
              x2={9 * 25 - data.d * 50}
              y2={225}
              strokeWidth={2}
            ></line>
            <line
              x1={c_x}
              y1={c_y}
              x2={9 * 25 + data.d * 50}
              y2={225}
              strokeWidth={2}
            ></line>
            <g transform={`translate(${c_x}, ${c_y}) rotate(${angle}, 0, 0)`}>
              {rightAngle}
            </g>
          </>
        )}
        <p>
          <small>
            Es kann auch der andere Schnittpunkt für C gewählt werden.
          </small>
        </p>
      </>
    )
  },
}
