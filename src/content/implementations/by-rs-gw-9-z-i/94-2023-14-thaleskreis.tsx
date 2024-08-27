import { Exercise } from '@/data/types'
import { buildInlineFrac } from '@/helper/math-builder'
import { pp } from '@/helper/pretty-print'
import { renderCross, rightAngle } from '@/helper/svg-builder'

interface DATA {
  d: number
  h: number
  A: number
}

export const exercise94: Exercise<DATA> = {
  title: '2023 / 14) Thaleskreis',
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
          Vervollständige die Zeichnung mithilfe des Thaleskreises zu einem bei
          C rechtwinkligen Dreieck ABC mit einem Flächeninhalt A von{' '}
          {pp(data.A)} cm².
        </p>
        {basicSvg(data)}
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
          {data.A} cm² = {buildInlineFrac(1, 2)} · {data.d * 2} cm · h<br />h ={' '}
          {data.h} cm
        </p>
        <p>
          Zeichne den Thaleskreis und Gerade bei der gewünschten Höhe. Der Punkt
          C liegt auf dem Schnittpunkt von Kreis und Gerade:
        </p>
        <p></p>
        {basicSvg(
          data,
          <>
            {renderCross(9 * 25, 225, 'blue')}
            <text x={9 * 25 + 4} y={245} fill="blue">
              M
            </text>
            <path
              d={`M ${9 * 25 + data.d * 50},225 A ${data.d * 50},${
                data.d * 50
              } 0 0 0 ${9 * 25 - data.d * 50},225`}
              strokeWidth={2}
              fill="none"
              stroke="lightblue"
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

function basicSvg(data: DATA, stuff: JSX.Element = <></>) {
  const mx = 9 * 25

  return (
    <svg className="svg-defaults max-w-[450px]" viewBox="0 0 450 250">
      {[0, 1, 2, 3, 4, 5, 6, 7, 8].map((x) => (
        <line
          key={x}
          x1={0}
          x2={450}
          y1={25 + x * 25}
          y2={25 + x * 25}
          strokeDasharray="4 4"
        ></line>
      ))}
      {[0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16].map((x) => (
        <line
          key={x}
          y1={0}
          y2={250}
          x1={25 + x * 25}
          x2={25 + x * 25}
          strokeDasharray="4 4"
        ></line>
      ))}
      <line
        y1={225}
        y2={225}
        x1={mx - data.d * 50}
        x2={mx + data.d * 50}
        strokeWidth={2}
      ></line>
      {renderCross(mx - data.d * 50, 225)}
      {renderCross(mx + data.d * 50, 225)}
      <text x={mx - data.d * 50 - 20} y={245}>
        A
      </text>
      <text x={mx + data.d * 50 + 8} y={245}>
        B
      </text>
      {stuff}
    </svg>
  )
}
