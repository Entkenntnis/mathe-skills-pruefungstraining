import { Exercise } from '@/data/types'
import { constrainedGeneration } from '@/helper/constrained-generation'
import { getGcd } from '@/helper/get-gcd'
import { buildFrac } from '@/helper/math-builder'
import { pp } from '@/helper/pretty-print'

interface DATA {
  A: { a: number; b: number; c: number; d: number }
  B: { a: number; b: number }
  C: { a: number; b: number; c: number }
  D: { a: number; b: number; c: number }
}

export const exercise51: Exercise<DATA> = {
  title: '2023 / 1) Rechnen mit rationalen Zahlen',
  useCalculator: false,
  duration: 4,
  generator(rng) {
    return {
      A: constrainedGeneration<DATA['A']>(
        () => {
          const b = rng.randomIntBetween(2, 8)
          const d = b * rng.randomItemFromArray([2, 3])
          const a = rng.randomIntBetween(1, b - 1)
          const c = rng.randomIntBetween(1, d - 1)
          return { a, b, c, d }
        },
        ({ a, b, c, d }) => {
          return (
            getGcd(a, b) == 1 &&
            getGcd(c, d) == 1 &&
            a / b + c / d < 1 &&
            getGcd((a * d) / b + c, d) == 1 &&
            a !== c
          )
        }
      ),
      B: constrainedGeneration<DATA['B']>(
        () => {
          const a = rng.randomIntBetween(11, 99) / 10
          const b = 0.1
          if (rng.randomIntBetween(1, 2) == 1) {
            return { a: b, b: a }
          }
          return { a, b }
        },
        ({ a, b }) => {
          return pp(a).length > 1 && pp(b).length > 1
        }
      ),
      C: constrainedGeneration<DATA['C']>(
        () => {
          const diff = rng.randomIntBetween(0, 4) / 10
          const b = rng.randomIntBetween(1, 9) / 10
          const c = rng.randomItemFromArray([2, 3, 4])
          const a = b * c + diff
          return { a, b, c }
        },
        ({ a, b, c }) => {
          return (
            pp(a).length > 1 &&
            Math.floor(a) == Math.floor(b * c) &&
            pp(b * c).length > 1
          )
        }
      ),
      D: constrainedGeneration<DATA['D']>(
        () => {
          const a = rng.randomIntBetween(1, 4)
          const b = rng.randomIntBetween(1, 4) * -1
          const c =
            rng.randomIntBetween(1, 4) * rng.randomItemFromArray([1, -1])
          return { a, b, c }
        },
        ({ a, b }) => {
          return a + b < 0
        }
      ),
    }
  },
  task({ data }) {
    return <></>
  },
  solution({ data }) {
    return <></>
  },
  subtasks: {
    tasks: [
      ({
        data: {
          A: { a, b, c, d },
        },
      }) => {
        return (
          <>
            <p>Berechne.</p>
            <p>
              a{')'} {buildFrac(a, b)} + {buildFrac(c, d)} =
            </p>
          </>
        )
      },
      ({ data }) => {
        return (
          <>
            <p>
              b{')'}{' '}
              <span className="text-lg">
                {pp(data.B.a)} · {pp(data.B.b)} =
              </span>
            </p>
          </>
        )
      },
      ({ data }) => {
        return (
          <>
            <p>
              {'c) '}
              <span className="text-lg">
                {pp(data.C.a)} − {pp(data.C.b)} · {pp(data.C.c)} =
              </span>
            </p>
          </>
        )
      },
      ({ data }) => {
        return (
          <>
            <p>
              {'d) '}
              <span className="text-lg">
                −({pp(data.D.a)} {pp(data.D.b, 'merge_op')}){' '}
                {pp(data.D.c, 'merge_op')} =
              </span>
            </p>
          </>
        )
      },
    ],
    solutions: [
      ({
        data: {
          A: { a, b, c, d },
        },
      }) => {
        return (
          <>
            <p>Erweitere auf den Hauptnenner {d}:</p>
            <p>
              {buildFrac((a * d) / b, d)} + {buildFrac(c, d)}
            </p>
            <p>Addiere die Zähler und behalte den Nenner:</p>
            <p>
              <strong>{buildFrac((a * d) / b + c, d)}</strong>
            </p>
          </>
        )
      },
      ({ data }) => {
        return (
          <>
            <p>
              Die Faktoren besitzen zusammen 2 Stellen nach dem Komma, so auch
              das Ergebnis:
            </p>
            <p className="text-lg">
              <strong>{pp(data.B.a * data.B.b)}</strong>
            </p>
          </>
        )
      },
      ({ data }) => {
        return (
          <>
            <p>Berechne zuerst das Produkt:</p>
            <p className="text-lg">
              {pp(data.C.a)} − {pp(data.C.b * data.C.c)}
            </p>
            <p>Berechne die Differenz:</p>
            <p className="text-lg">
              <strong>{pp(data.C.a - data.C.b * data.C.c)}</strong>
            </p>
          </>
        )
      },
      ({ data }) => {
        return (
          <>
            <p>Berechne die Klammer:</p>
            <p className="text-lg">
              −({pp(data.D.a + data.D.b)}) {pp(data.D.c, 'merge_op')}
            </p>
            <p>
              Drehe das Vorzeichen um und{' '}
              {data.D.c > 0 ? 'addiere' : 'subtrahiere'}:
            </p>
            <p className="text-lg">
              {pp(-(data.D.a + data.D.b))} {pp(data.D.c, 'merge_op')} ={' '}
              <strong>{pp(-(data.D.a + data.D.b) + data.D.c)}</strong>
            </p>
          </>
        )
      },
    ],
  },
}
