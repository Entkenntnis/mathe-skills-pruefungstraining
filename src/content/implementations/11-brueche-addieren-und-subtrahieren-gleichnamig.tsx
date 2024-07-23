import { Exercise } from '@/data/types'
import { getGcd } from '@/helper/get-gcd'
import { buildFrac } from '@/helper/math-builder'
import clsx from 'clsx'

interface DATA {
  fracs: { z1: number; n: number; z2: number; add: boolean; r: number }[]
}

export const exercise11: Exercise<DATA> = {
  title: 'Brüche addieren und subtrahieren - gleichnamig',
  useCalculator: false,
  duration: 2,
  generator(rng) {
    const fracs = []

    for (let i = 0; i < 3; i++) {
      const add = rng.randomItemFromArray([true, false])
      const n = rng.randomIntBetween(5, 25)
      const c = rng.randomIntBetween(Math.floor(n / 2), n - 1)
      const b = rng.randomIntBetween(1, c - 1)
      const a = c - b
      const z1 = add ? a : c
      const z2 = b
      const r = add ? c : a
      fracs.push({ z1, z2, n, add, r })
    }

    return { fracs }
  },
  task({ data }) {
    return (
      <>
        <p>Berechne und kürze.</p>
        <p>
          {[0, 1, 2].map((id) => (
            <span className="mr-12" key={id}>
              {buildFrac(data.fracs[id].z1, data.fracs[id].n)}{' '}
              <span className="text-xl">{data.fracs[id].add ? '+' : '−'} </span>
              {buildFrac(data.fracs[id].z2, data.fracs[id].n)}
            </span>
          ))}
        </p>
      </>
    )
  },
  solution({ data }) {
    return (
      <>
        {[0, 1, 2].map((id) => {
          const f = getGcd(data.fracs[id].r, data.fracs[id].n)
          return (
            <p key={id}>
              {buildFrac(data.fracs[id].z1, data.fracs[id].n)}{' '}
              <span className="text-xl">{data.fracs[id].add ? '+' : '−'} </span>
              {buildFrac(data.fracs[id].z2, data.fracs[id].n)} ={' '}
              <span className={clsx(f == 1 && 'font-bold')}>
                {buildFrac(data.fracs[id].r, data.fracs[id].n)}
              </span>
              {f > 1 && (
                <>
                  {' '}
                  ={' '}
                  <strong>
                    {buildFrac(data.fracs[id].r / f, data.fracs[id].n / f)}
                  </strong>
                </>
              )}
            </p>
          )
        })}
      </>
    )
  },
}
