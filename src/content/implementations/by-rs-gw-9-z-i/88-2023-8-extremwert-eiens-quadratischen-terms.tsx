import { Exercise } from '@/data/types'
import { pp } from '@/helper/pretty-print'

type El = { type: 'min' | 'max'; y: number; x: number }

interface DATA {
  a: number
  b: number
  c: number
  answers: El[]
  correctType: string
  correctY: number
  correctX: number
}

export const exercise88: Exercise<DATA> = {
  title: '2023 / 8) Extremwert eines quadratischen Terms',
  useCalculator: false,
  duration: 2,
  generator(rng) {
    const a = rng.randomIntBetween(-8, 8)
    const b = rng.randomIntBetween(-8, 8)
    const c = rng.randomIntBetween(-8, 8)
    const vals = rng.shuffleArray([a, b, -b, c])
    const wrongType = a > 0 ? 'max' : 'min'
    const correctType = a > 0 ? 'min' : 'max'
    const correctY = c
    const correctX = -b
    const answers = rng.shuffleArray<El>([
      { type: wrongType, y: vals[0], x: vals[1] },
      { type: wrongType, y: vals[1], x: vals[3] },
      { type: wrongType, y: vals[2], x: vals[0] },
      { type: correctType, y: vals[1], x: vals[2] },
      { type: correctType, y: correctY, x: correctX },
      { type: correctType, y: vals[3], x: vals[1] },
    ])
    answers.sort((a, b) => a.type.localeCompare(b.type))
    return {
      a,
      b,
      c,
      answers,
      correctType,
      correctY,
      correctX,
    }
  },
  constraint({ data }) {
    return (
      data.a !== 0 &&
      data.b !== 0 &&
      data.c !== 0 &&
      Math.abs(data.a) !== Math.abs(data.b) &&
      Math.abs(data.a) !== Math.abs(data.c) &&
      Math.abs(data.b) !== Math.abs(data.c) &&
      new Set(data.answers.map((el) => `${el.type};${el.x};${el.y}`)).size == 6
    )
  },
  task({ data }) {
    return (
      <>
        <p>
          Gegeben ist der quadratische Term T(x) = {pp(data.a)} · (x{' '}
          {pp(data.b, 'merge_op')})² {pp(data.c, 'merge_op')}.
        </p>
        <p>
          Eine der folgenden Angaben beschreibt den Extremwert, dessen Art und
          die dazugehörige Belegung von x für diesen Term korrekt.
        </p>
        <ol>
          {data.answers.map((el, i) => (
            <li key={i}>
              T<sub>{el.type}</sub> = {pp(el.y)} für x = {pp(el.x)}
            </li>
          ))}
        </ol>
      </>
    )
  },
  solution({ data }) {
    const index = data.answers.findIndex(
      (el) =>
        el.type == data.correctType &&
        el.x == data.correctX &&
        el.y == data.correctY
    )
    return (
      <>
        <p>
          Die zugehörige Parabel ist{' '}
          {data.a > 0 ? 'nach oben geöffnet' : 'nach unten geöffnet'}, daher
          besitzt der Term ein {data.a > 0 ? 'Minimum' : 'Maximum'}.
        </p>
        <p>
          Bestimme x, indem du die Klammer null setzt. Lies dann den Termwert
          ab. Die <strong>Antwort {index + 1}</strong> ist korrekt:
        </p>
        <p className="font-bold">
          T<sub>{data.correctType}</sub> = {pp(data.correctY)} für x ={' '}
          {pp(data.correctX)}
        </p>
      </>
    )
  },
}
