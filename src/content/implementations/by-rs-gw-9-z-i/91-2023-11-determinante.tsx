import { Exercise } from '@/data/types'
import { constrainedGeneration } from '@/helper/constrained-generation'
import {
  buildDet2,
  buildInlineFrac,
  buildOverline,
  buildVec,
  buildVec2,
} from '@/helper/math-builder'
import { pp } from '@/helper/pretty-print'
import { defArrowMarker, renderCross } from '@/helper/svg-builder'
import { Fragment } from 'react'

interface DATA {
  px: number
  py: number
  qx: number
  qy: number
  rx: number
  ry: number
  answers: { a: number; b: number; c: number; d: number; isCorrect: boolean }[]
}

export const exercise91: Exercise<DATA> = {
  title: '2023 / 11) Determinante',
  useCalculator: false,
  duration: 2,
  generator(rng) {
    const px = rng.randomIntBetween(1, 5)
    const py = rng.randomIntBetween(1, 3)
    const qx = rng.randomIntBetween(1, 5)
    const qy = rng.randomIntBetween(1, 3)
    const rx = rng.randomIntBetween(1, 5)
    const ry = rng.randomIntBetween(1, 3)
    const PQ = [qx - px, qy - py]
    const PR = [rx - px, ry - py]
    const answers: DATA['answers'] = [
      { isCorrect: true, a: PQ[0], b: PR[0], c: PQ[1], d: PR[1] },
      { isCorrect: false, b: PQ[0], a: PR[0], d: PQ[1], c: PR[1] },
      { isCorrect: false, a: -PQ[0], b: PR[0], c: -PQ[1], d: PR[1] },
      { isCorrect: false, a: PQ[0], b: -PR[0], c: PQ[1], d: -PR[1] },
      { isCorrect: false, a: PQ[1], b: PR[0], c: PQ[0], d: PR[1] },
    ]
    return {
      px,
      py,
      qx,
      qy,
      rx,
      ry,
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
    const A =
      ((data.qx - data.px) * (data.ry - data.py) -
        (data.qy - data.py) * (data.rx - data.px)) *
      0.5
    return A >= 2
  },
  task({ data }) {
    const p_x = 50 + 50 * data.px
    const p_y = 225 - 50 * data.py
    const q_x = 50 + 50 * data.qx
    const q_y = 225 - 50 * data.qy
    const r_x = 50 + 50 * data.rx
    const r_y = 225 - 50 * data.ry

    function tryAutoposText(
      x_: number,
      y_: number,
      x: number,
      y: number,
      T: string
    ) {
      return (
        <text x={x_ + (x <= 2 ? -15 : 3)} y={y_ + (y == 3 ? -8 : 19)}>
          {T}
        </text>
      )
    }
    return (
      <>
        <p>
          Der Flächeninhalt A des Dreiecks PQR soll mit Hilfe einer Determinante
          ermittelt werden.
        </p>
        <svg viewBox="0 0 350 275" className="svg-defaults max-w-[350px]">
          {defArrowMarker()}

          <line
            x1={25}
            x2={325}
            y1={225}
            y2={225}
            markerEnd="url(#arrow)"
          ></line>
          {[1, 2, 3, 4, 5].map((x) => (
            <Fragment key={x}>
              <line
                x1={50 + 50 * x - 25}
                x2={50 + 50 * x - 25}
                y1={250}
                y2={25}
                stroke="gray"
                strokeDasharray={'4 4'}
              ></line>
              <line
                x1={50 + 50 * x}
                x2={50 + 50 * x}
                y1={225}
                y2={25}
                stroke="gray"
                strokeDasharray={'4 4'}
              ></line>
              <line x1={50 + 50 * x} x2={50 + 50 * x} y1={218} y2={232}></line>
              <text x={50 + 50 * x} y={250} textAnchor="middle">
                {x}
              </text>
            </Fragment>
          ))}
          <text x={320} y={244}>
            x
          </text>

          <line x1={50} x2={50} y1={250} y2={25} markerEnd="url(#arrow)"></line>
          {[1, 2, 3].map((x) => (
            <Fragment key={x}>
              <line
                x1={25}
                x2={325}
                y1={250 - 50 * x}
                y2={250 - 50 * x}
                stroke="gray"
                strokeDasharray="4 4"
              ></line>
              <line
                x1={50}
                x2={325}
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
            x2={325}
            y1={50}
            y2={50}
            stroke="gray"
            strokeDasharray="4 4"
          ></line>
          <text x={30} y={25}>
            y
          </text>

          <text x={32} y={243}>
            O
          </text>

          {renderCross(p_x, p_y)}
          {tryAutoposText(p_x, p_y, data.px, data.py, 'P')}
          {renderCross(q_x, q_y)}
          {tryAutoposText(q_x, q_y, data.qx, data.qy, 'Q')}
          {renderCross(r_x, r_y)}
          {tryAutoposText(r_x, r_y, data.rx, data.ry, 'R')}

          <line x1={p_x} y1={p_y} x2={q_x} y2={q_y} strokeWidth={2}></line>
          <line x1={r_x} y1={r_y} x2={q_x} y2={q_y} strokeWidth={2}></line>
          <line x1={r_x} y1={r_y} x2={p_x} y2={p_y} strokeWidth={2}></line>
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
          {buildVec('PQ')} ={' '}
          {buildVec2(
            data.answers[correctIndex].a,
            data.answers[correctIndex].c
          )}
          <br />
          und dem Pfeil
          <br />
          {buildVec('PR')} ={' '}
          {buildVec2(
            data.answers[correctIndex].b,
            data.answers[correctIndex].d
          )}
        </p>
      </>
    )
  },
}
