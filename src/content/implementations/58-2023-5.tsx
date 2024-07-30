import { Exercise } from '@/data/types'
import { constrainedGeneration } from '@/helper/constrained-generation'
import { pp } from '@/helper/pretty-print'

interface DATA {
  a: number
  b: number
  c: number
  res_a: number
  res_b: number
  digits: number
}

export const exercise58: Exercise<DATA> = {
  title: '2023 / 5 (Zahl)',
  useCalculator: false,
  duration: 1,
  generator(rng) {
    return constrainedGeneration(
      () => {
        const a_base = rng.randomIntBetween(1, 9) * 1000
        const b_base = rng.randomIntBetween(1, 9) * 1000
        const a = a_base + rng.randomIntBetween(1, 9)
        const b = b_base + rng.randomIntBetween(1, 9)
        const digits = rng.randomItemFromArray([2, 3, 4, 5, 6])
        const c = (a * b) / Math.pow(10, digits)
        const digits_a = Math.floor(digits / 2)
        const res_a = a / Math.pow(10, digits_a)
        const res_b = b / Math.pow(10, digits - digits_a)
        return { a, b, c, res_a, res_b, digits }
      },
      (data) => {
        return (
          pp(data.c).length >= 9 &&
          pp(data.res_a).length >= 5 &&
          pp(data.res_b).length >= 5
        )
      }
    )
  },
  task({ data }) {
    return (
      <>
        <p>
          Setze bei den beiden Faktoren jeweils ein Komma, so dass eine wahre
          Aussage entsteht.
        </p>
        <p className="text-lg text-center">
          {data.a} · {data.b} = {pp(data.c)}
        </p>
      </>
    )
  },
  solution({ data }) {
    return (
      <>
        <p>
          Setze die Kommas so, dass die Faktoren zusammen {data.digits} Stellen
          hinter dem Komma haben.
        </p>
        <p>Es gibt mehrere Möglichkeiten, ein Beispiel:</p>
        <p className="text-lg text-center">
          <strong>
            {pp(data.res_a)} · {pp(data.res_b)}
          </strong>{' '}
          = {pp(data.c)}
        </p>
      </>
    )
  },
}
