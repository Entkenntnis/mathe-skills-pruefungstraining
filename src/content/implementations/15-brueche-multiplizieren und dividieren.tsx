import { Exercise } from '@/data/types'
import { getGcd } from '@/helper/get-gcd'
import { buildFrac } from '@/helper/math-builder'
import clsx from 'clsx'

interface DATA {
  fracs: {
    z1: number
    z2: number
    n1: number
    n2: number
  }[]
  ids: number[]
}

export const exercise15: Exercise<DATA> = {
  title: 'Brüche multiplizieren und dividieren',
  useCalculator: false,
  duration: 2,
  generator(rng) {
    const fracs: DATA['fracs'] = []

    for (let i = 0; i < 3; i++) {
      const z1 = rng.randomIntBetween(1, 9)
      const n1 = rng.randomIntBetween(2, 9)
      const z2 = rng.randomIntBetween(1, 9)
      const n2 = rng.randomIntBetween(2, 9)
      fracs.push({ z1, z2, n1, n2 })
    }

    return { fracs, ids: rng.shuffleArray([0, 1, 2]) }
  },
  task({ data }) {
    return (
      <>
        <p>Berechne und kürze.</p>
        <p>
          {data.ids.map((id) => {
            const { z1, z2, n1, n2 } = data.fracs[id]
            return (
              <span className="inline-block mr-14" key={id}>
                {buildFrac(z1, n1)} {id == 1 ? ':' : '·'} {buildFrac(z2, n2)}
              </span>
            )
          })}
        </p>
      </>
    )
  },
  solution({ data }) {
    return (
      <>
        {data.ids.map((id) => {
          const { z1, z2, n1, n2 } = data.fracs[id]
          let z = z1 * z2
          let n = n1 * n2
          if (id == 1) {
            z = z1 * n2
            n = n1 * z2
          }
          const f = getGcd(z, n)
          return (
            <p key={id}>
              {buildFrac(z1, n1)} {id == 1 ? ':' : '·'} {buildFrac(z2, n2)}{' '}
              {id == 1 && (
                <>
                  = {buildFrac(z1, n1)} · {buildFrac(n2, z2)}
                </>
              )}{' '}
              ={' '}
              <span className={clsx(f == 1 && 'font-bold')}>
                {buildFrac(z, n)}
              </span>
              {f > 1 && (
                <>
                  {' '}
                  = <strong>{buildFrac(z / f, n / f)}</strong>
                </>
              )}
            </p>
          )
        })}
        <p>Um einen Bruch zu dividieren, multipliziere mit dem Kehrbruch.</p>
      </>
    )
  },
}
