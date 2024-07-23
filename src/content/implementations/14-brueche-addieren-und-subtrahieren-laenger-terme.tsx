import { Exercise } from '@/data/types'
import { getGcd } from '@/helper/get-gcd'
import { buildFrac } from '@/helper/math-builder'
import clsx from 'clsx'

interface DATA {
  z1: number
  z2: number
  z3: number
  n1: number
  n2: number
  n3: number
  r: number
  n: number
}

export const exercise14: Exercise<DATA> = {
  title: 'Brüche addieren und subtrahieren - länger Terme',
  useCalculator: false,
  duration: 3,
  generator(rng) {
    const [n1, n2, n3, n] = rng.shuffleArray(
      rng.randomItemFromArray([
        [3, 6, 9, 18],
        [3, 6, 12, 12],
        [3, 4, 5, 60],
        [2, 4, 8, 8],
      ])
    )
    let z1 = rng.randomIntBetween(1, n1 - 1)
    const z2 = rng.randomIntBetween(1, n2 - 1)
    let z3 = rng.randomIntBetween(1, n3 - 1)
    while (z1 / n1 + z2 / n2 <= z3 / n3) {
      if (z1 + 1 < n1) {
        z1++
      }
      z3--
    }
    const r = z1 * (n / n1) + z2 * (n / n2) - z3 * (n / n3)

    return { z1, z2, z3, n1, n2, n3, n, r }
  },
  task({ data }) {
    return (
      <>
        <p>Berechne und kürze.</p>
        <p>
          {buildFrac(data.z1, data.n1)} <span className="text-xl">+</span>{' '}
          {buildFrac(data.z2, data.n2)} <span className="text-xl">−</span>{' '}
          {buildFrac(data.z3, data.n3)}
        </p>
      </>
    )
  },
  solution({ data }) {
    const { z1, z2, z3, n1, n2, n3, n, r } = data
    const f = getGcd(n, r)
    return (
      <>
        <p>
          {buildFrac(z1, n1)} <span className="text-xl">+</span>{' '}
          {buildFrac(z2, n2)} <span className="text-xl">−</span>{' '}
          {buildFrac(z3, n3)} = {buildFrac(z1 * (n / n1), n)}{' '}
          <span className="text-xl">+</span> {buildFrac(z2 * (n / n2), n)}{' '}
          <span className="text-xl">−</span> {buildFrac(z3 * (n / n3), n)} ={' '}
          <span className={clsx(f == 1 && 'font-bold')}>{buildFrac(r, n)}</span>
          {f > 1 && (
            <>
              {' '}
              = <strong>{buildFrac(r / f, n / f)}</strong>
            </>
          )}
        </p>
      </>
    )
  },
}
