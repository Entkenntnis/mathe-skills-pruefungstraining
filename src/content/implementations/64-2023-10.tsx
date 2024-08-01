import { Exercise } from '@/data/types'
import { getGcd } from '@/helper/get-gcd'
import { buildFrac } from '@/helper/math-builder'
import { pp } from '@/helper/pretty-print'

interface DATA {
  z: number
  n: number
}

export const exercise64: Exercise<DATA> = {
  title: '2023 / 10 (Zahl)',
  useCalculator: false,
  duration: 1,
  generator(rng) {
    const n = rng.randomItemFromArray([2, 4, 5])
    let z = rng.randomIntBetween(1, n - 1)
    while (getGcd(z, n) > 1) {
      z--
    }
    const f = rng.randomItemFromArray(
      n == 2 ? [5, 50, 100] : n == 4 ? [3, 25] : [2, 20]
    )
    return { z: z * f, n: n * f }
  },
  task({ data }) {
    return (
      <>
        <p>
          Gib einen Bruch mit dem Wert {pp(data.z / data.n)} an, der aus einem{' '}
          <strong>
            {data.z.toString().length == 2
              ? 'zweistelligen'
              : data.z.toString().length == 1
              ? 'einstelligen'
              : 'dreistelligen'}
          </strong>{' '}
          Zähler und einem{' '}
          <strong>
            {data.n.toString().length == 2 ? 'zweistelligen' : 'dreistelligen'}
          </strong>{' '}
          Nenner besteht.
        </p>
        <p className="text-lg text-center">
          {pp(data.z / data.n)} ={' '}
          {buildFrac(
            <span className="inline-block w-16 h-9 border border-black"></span>,
            <span className="inline-block w-16 h-9 border mt-2 border-black"></span>
          )}
        </p>
      </>
    )
  },
  solution({ data }) {
    return (
      <>
        <p className="text-lg text-center">
          {pp(data.z / data.n)} ={' '}
          {buildFrac(
            <span className="inline-block w-16 h-9 border border-black pt-1 mb-2">
              {data.z}
            </span>,
            <span className="inline-block w-16 h-9 border mt-2 border-black pt-1">
              {data.n}
            </span>
          )}
        </p>
        <p>
          <small>Andere Lösungen sind möglich.</small>
        </p>
      </>
    )
  },
}
