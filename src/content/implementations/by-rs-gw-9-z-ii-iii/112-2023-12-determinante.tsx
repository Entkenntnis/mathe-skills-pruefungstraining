import { Exercise } from '@/data/types'
import { constrainedGeneration } from '@/helper/constrained-generation'
import {
  buildInlineFrac,
  buildDet2,
  buildVec,
  buildVec2,
} from '@/helper/math-builder'
import { pp } from '@/helper/pretty-print'
import { defArrowMarker, renderCross } from '@/helper/svg-builder'
import { Fragment } from 'react'

interface DATA {
  qx: number
  qy: number
  px: number
  py: number
  answers: { a: number; b: number; c: number; d: number; isCorrect: boolean }[]
}

export const exercise112: Exercise<DATA> = {
  title: '2023 / 12) Determinante',
  useCalculator: false,
  duration: 2,
  generator(rng) {
    const px = rng.randomIntBetween(1, 4)
    const py = rng.randomIntBetween(1, 2)
    const qx = rng.randomIntBetween(1, 4)
    const qy = rng.randomIntBetween(1, 2)
    const OP = [px, py]
    const OQ = [qx, qy]
    const answers: DATA['answers'] = [
      { isCorrect: true, a: OP[0], b: OQ[0], c: OP[1], d: OQ[1] },
      { isCorrect: false, b: OP[0], a: OQ[0], d: OP[1], c: OQ[1] },
      { isCorrect: false, a: -OP[0], b: OQ[0], c: -OP[1], d: OQ[1] },
      { isCorrect: false, a: OP[0], b: -OQ[0], c: OP[1], d: -OQ[1] },
      { isCorrect: false, a: OP[1], b: OQ[0], c: OP[0], d: OQ[1] },
    ]
    return {
      qx,
      qy,
      px,
      py,
      answers: constrainedGeneration(
        () => rng.shuffleArray(answers).slice(0, 4),
        (data) => {
          return (
            data.some((x) => x.isCorrect) &&
            new Set(data.map((x) => `${x.a};${x.b};${x.c};${x.d}`)).size == 4
          )
        }
      ),
    }
  },
  constraint({ data }) {
    const A = (data.px * data.qy - data.py * data.qx) * 0.5
    return A >= 1.5
  },
  task({ data }) {
    const O_x = 50
    const O_y = 225
    const p_x = 50 + 50 * data.px
    const p_y = 225 - 50 * data.py
    const q_x = 50 + 50 * data.qx
    const q_y = 225 - 50 * data.qy

    return (
      <>
        <p>
          Der Flächeninhalt A des Dreiecks OPQ soll mit Hilfe einer Determinante
          ermittelt werden.
        </p>
        <svg viewBox="0 50 325 225" className="svg-defaults max-w-[325px]">
          {defArrowMarker()}

          <line
            x1={25}
            x2={300}
            y1={225}
            y2={225}
            markerEnd="url(#arrow)"
          ></line>
          {[1, 2, 3, 4].map((x) => (
            <Fragment key={x}>
              <line
                x1={50 + 50 * x - 25}
                x2={50 + 50 * x - 25}
                y1={250}
                y2={75}
                stroke="gray"
                strokeDasharray={'4 4'}
              ></line>
              <line
                x1={50 + 50 * x}
                x2={50 + 50 * x}
                y1={225}
                y2={75}
                stroke="gray"
                strokeDasharray={'4 4'}
              ></line>
              <line x1={50 + 50 * x} x2={50 + 50 * x} y1={218} y2={232}></line>
              <text x={50 + 50 * x} y={250} textAnchor="middle">
                {x}
              </text>
            </Fragment>
          ))}
          <line
            x1={50 + 50 * 5 - 25}
            x2={50 + 50 * 5 - 25}
            y1={250}
            y2={75}
            stroke="gray"
            strokeDasharray={'4 4'}
          ></line>
          <text x={295} y={244}>
            x
          </text>

          <line x1={50} x2={50} y1={250} y2={90} markerEnd="url(#arrow)"></line>
          {[1, 2].map((x) => (
            <Fragment key={x}>
              <line
                x1={25}
                x2={300}
                y1={250 - 50 * x}
                y2={250 - 50 * x}
                stroke="gray"
                strokeDasharray="4 4"
              ></line>
              <line
                x1={50}
                x2={300}
                y1={225 - 50 * x}
                y2={225 - 50 * x}
                stroke="gray"
                strokeDasharray="4 4"
              ></line>
              <line x1={43} x2={57} y1={225 - 50 * x} y2={225 - 50 * x}></line>
              <text x={38} y={225 - 50 * x + 7} textAnchor="end">
                {x}
              </text>
            </Fragment>
          ))}
          <line
            x1={25}
            x2={300}
            y1={100}
            y2={100}
            stroke="gray"
            strokeDasharray="4 4"
          ></line>
          <text x={30} y={90}>
            y
          </text>

          <text x={32} y={243}>
            O
          </text>

          {renderCross(p_x, p_y)}
          {renderCross(q_x, q_y)}
          <text x={p_x + 4} y={p_y - 6}>
            P
          </text>
          {renderCross(p_x, p_y)}
          <text x={q_x + 4} y={q_y - 6}>
            Q
          </text>

          <line x1={O_x} y1={O_y} x2={q_x} y2={q_y} strokeWidth={2}></line>
          <line x1={p_x} y1={p_y} x2={q_x} y2={q_y} strokeWidth={2}></line>
          <line x1={p_x} y1={p_y} x2={O_x} y2={O_y} strokeWidth={2}></line>
        </svg>
        <p>Einer der folgenden Lösungsansätze ist richtig.</p>
        <ol>
          {data.answers.map((x, i) => (
            <li key={i} className="my-4">
              A = {buildInlineFrac(1, 2)} ·{' '}
              {buildDet2(pp(x.a), pp(x.b), pp(x.c), pp(x.d))} FE
            </li>
          ))}
        </ol>
      </>
    )
  },
  solution({ data }) {
    const correctIndex = data.answers.findIndex((x) => x.isCorrect)
    return (
      <>
        <p>
          Der richtige Ansatz ist <strong>Nummer {correctIndex + 1}</strong>.
        </p>
        <p>
          Die Determinante besteht aus dem Pfeil <br />
          {buildVec('OP')} ={' '}
          {buildVec2(
            data.answers[correctIndex].a,
            data.answers[correctIndex].c
          )}
          <br />
          und dem Pfeil
          <br />
          {buildVec('OQ')} ={' '}
          {buildVec2(
            data.answers[correctIndex].b,
            data.answers[correctIndex].d
          )}
        </p>
      </>
    )
  },
}
