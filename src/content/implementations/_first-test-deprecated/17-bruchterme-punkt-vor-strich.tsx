import { Exercise } from '@/data/types'
import { getGcd } from '@/helper/get-gcd'
import { buildFrac } from '@/helper/math-builder'
import clsx from 'clsx'

interface DATA {
  z1: number
  z2: number
  z3: number
  r1: number
  n1: number
  n2: number
  n3: number
  z4: number
  z5: number
  z6: number
  r2: number
  n4: number
  n5: number
  n6: number
}

export const exercise17: Exercise<DATA> = {
  title: 'Bruchterme - Punkt vor Strich',
  useCalculator: false,
  duration: 5,
  generator(rng) {
    const n1 = rng.randomIntBetween(3, 7)
    let n2 = rng.randomIntBetween(3, 7)
    if (n1 == n2) {
      n2++
    }
    let z1 = rng.randomIntBetween(2, 4)
    let z2 = rng.randomIntBetween(2, 6)
    let z3 = rng.randomIntBetween(2, 6)
    if (z1 == n1) {
      z1--
    }
    if (z2 == n1) {
      z2--
    }
    if (z3 == n2) {
      z3--
    }

    const r1 = z1 * n2 + z2 * z3
    const n3 = n1 * n2

    const n4 = rng.randomIntBetween(3, 7)
    let n5 = rng.randomIntBetween(3, 7)
    if (n4 == n5) {
      n5++
    }
    let z4 = rng.randomIntBetween(2, 4)
    let z5 = rng.randomIntBetween(2, 6)
    let z6 = rng.randomIntBetween(2, 6)
    if (z4 == n4) {
      z4--
    }
    if (z5 == n4) {
      z5--
    }
    if (z6 == n5) {
      z6--
    }

    const r2 = z4 * (z5 + z6)
    const n6 = n4 * n5

    return { z1, z2, z3, n1, n2, r1, n3, z4, z5, z6, n4, n5, n6, r2 }
  },
  task({ data }) {
    return (
      <>
        <p>Berechne und kürze.</p>
        <p>
          <span className="inline-block mr-16">
            {buildFrac(data.z1, data.n1)} + {buildFrac(data.z2, data.n1)} ·{' '}
            {buildFrac(data.z3, data.n2)}
          </span>
          <span>
            {buildFrac(data.z4, data.n4)} ·{' '}
            <span className="inline-block pb-1 scale-y-[2.8]">(</span>
            {buildFrac(data.z5, data.n5)} + {buildFrac(data.z6, data.n5)}
            <span className="inline-block pb-1 scale-y-[2.8]">)</span>
          </span>
        </p>
      </>
    )
  },
  solution({ data }) {
    const f1 = getGcd(data.r1, data.n3)
    const f2 = getGcd(data.r2, data.n6)
    return (
      <>
        <p>
          {buildFrac(data.z1, data.n1)} + {buildFrac(data.z2, data.n1)} ·{' '}
          {buildFrac(data.z3, data.n2)} = {buildFrac(data.z1, data.n1)} +{' '}
          {buildFrac(data.z2 * data.z3, data.n1 * data.n2)} ={' '}
          {buildFrac(data.z1 * data.n2, data.n1 * data.n2)} +{' '}
          {buildFrac(data.z2 * data.z3, data.n1 * data.n2)} ={' '}
          <span className={clsx(f1 == 1 && 'font-bold')}>
            {buildFrac(data.r1, data.n3)}
          </span>
          {f1 > 1 && (
            <>
              {' '}
              = <strong>{buildFrac(data.r1 / f1, data.n3 / f1)}</strong>
            </>
          )}
        </p>
        <p>
          {buildFrac(data.z4, data.n4)} ·{' '}
          <span className="inline-block pb-1 scale-y-[2.8]">(</span>
          {buildFrac(data.z5, data.n5)} + {buildFrac(data.z6, data.n5)}
          <span className="inline-block pb-1 scale-y-[2.8]">)</span> ={' '}
          {buildFrac(data.z4, data.n4)} ·{' '}
          {buildFrac(data.z5 + data.z6, data.n5)} ={' '}
          <span className={clsx(f2 == 1 && 'font-bold')}>
            {buildFrac(data.r2, data.n6)}
          </span>
          {f2 > 1 && (
            <>
              {' '}
              = <strong>{buildFrac(data.r2 / f2, data.n6 / f2)}</strong>
            </>
          )}
        </p>
      </>
    )
  },
}
