import { Exercise } from '@/data/types'
import { getGcd } from '@/helper/get-gcd'
import { buildFrac } from '@/helper/math-builder'
import { pp } from '@/helper/pretty-print'

interface DATA {
  nums: {
    a: number
    b: number
    c: number
    d: number
    z: number
    n: number
    asDecimal: boolean
  }[]
}

export const exercise27: Exercise<DATA> = {
  title: 'Rationale Zahlen multiplizieren - geschickt kürzen',
  useCalculator: false,
  duration: 2,
  generator(rng) {
    return {
      nums: [0, 1].map(() => {
        const f1 = rng.randomIntBetween(2, 4)
        const f2 = rng.randomIntBetween(2, 4)
        const a = f1 * rng.randomIntBetween(1, 3)
        const d = f1 * rng.randomIntBetween(1, 3)
        const b = f2 * rng.randomIntBetween(1, 3)
        const c = f2 * rng.randomIntBetween(1, 3)
        const asDecimal =
          [2, 4, 8].includes(b) && rng.randomIntBetween(0, 9) < 5
        let z = a * c
        let n = b * d
        const f = getGcd(z, n)
        z /= f
        n /= f
        return { a, b, c, d, z, n, asDecimal }
      }),
    }
  },
  task({ data }) {
    return (
      <>
        <p>Berechne. Kürze, falls möglich, vor dem Multiplizieren.</p>
        <p>
          {data.nums.map((entry, i) => (
            <span className="inline-block mr-16" key={i}>
              {entry.asDecimal
                ? pp(entry.a / entry.b)
                : buildFrac(entry.a, entry.b)}{' '}
              · {buildFrac(entry.c, entry.d)}
            </span>
          ))}
        </p>
      </>
    )
  },
  solution({ data }) {
    return (
      <>
        <p>
          {data.nums.map((entry, i) => (
            <span className="inline-block mr-16" key={i}>
              {entry.asDecimal
                ? pp(entry.a / entry.b)
                : buildFrac(entry.a, entry.b)}{' '}
              · {buildFrac(entry.c, entry.d)} ={' '}
              <strong>{buildFrac(entry.z, entry.n)}</strong>
            </span>
          ))}
        </p>
      </>
    )
  },
}
