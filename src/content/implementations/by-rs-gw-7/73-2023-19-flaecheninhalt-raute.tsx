import { Exercise } from '@/data/types'
import { buildInlineFrac } from '@/helper/math-builder'
import { pp } from '@/helper/pretty-print'
import { roundToDigits } from '@/helper/round-to-digits'

interface DATA {
  e: number
  f: number
  a: number
}

export const exercise73: Exercise<DATA> = {
  title: '2023 / 19) Flächeninhalt Raute',
  useCalculator: false,
  duration: 1,
  generator(rng) {
    const e = rng.randomIntBetween(3, 9)
    const f = rng.randomIntBetween(3, 9)
    return {
      e,
      f,
      a: roundToDigits(Math.sqrt(Math.pow(e / 2, 2) + Math.pow(f / 2, 2)), 1),
    }
  },
  constraint({ data }) {
    return data.e > data.f && (data.e * data.f) % 2 == 0
  },
  task({ data }) {
    return (
      <>
        <p>
          Die Raute ABCD hat die Diagonalenlängen e = {data.e} cm und f ={' '}
          {data.f} cm. Für die Seitenlängen gilt: a = b = c = d = {pp(data.a)}{' '}
          cm.
        </p>
        <img src="/content/73.png" alt="Raute" />
        <p>Gib den Flächeninhalt A der Raute ABCD an.</p>
      </>
    )
  },
  solution({ data }) {
    return (
      <>
        <p>Berechne den Flächeninhalt der Raute mit den Diagonalenlängen:</p>
        <p>
          A = {buildInlineFrac(1, 2)} · e · f = {buildInlineFrac(1, 2)} ·{' '}
          {data.e} cm · {data.f} cm ={' '}
          <strong>{(data.e * data.f) / 2} cm²</strong>
        </p>
      </>
    )
  },
}
