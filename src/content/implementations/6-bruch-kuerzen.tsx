import { Exercise } from '@/data/types'
import { getGcd } from '@/helper/get-gcd'
import { buildFrac } from '@/helper/math-builder'

interface DATA {
  fracs: { z: number; n: number }[]
}

export const exercise6: Exercise<DATA> = {
  title: 'Bruch kürzen',
  useCalculator: false,
  duration: 2,
  generator(rng) {
    const fracs = []
    for (let i = 0; i < 3; i++) {
      const base = rng.randomItemFromArray([4, 5, 6, 7, 8, 9, 10])
      const factor = rng.randomItemFromArray([2, 3, 4, 5, 6, 7, 8, 9, 10])
      let denom = rng.randomIntBetween(1, base - 1)
      while (getGcd(denom, base) > 1) {
        denom--
      }
      fracs.push({ z: denom * factor, n: base * factor })
    }
    return { fracs }
  },
  task({ data }) {
    return (
      <>
        <p>Kürze so weit wie möglich.</p>
        <p>
          {[0, 1, 2].map((id) => (
            <span className="inline-block mr-16" key={id}>
              {buildFrac(data.fracs[id].z, data.fracs[id].n)}
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
          const f = getGcd(data.fracs[id].z, data.fracs[id].n)
          return (
            <p className="" key={id}>
              {buildFrac(data.fracs[id].z, data.fracs[id].n)} ={' '}
              <strong>
                {buildFrac(data.fracs[id].z / f, data.fracs[id].n / f)}
              </strong>{' '}
              &nbsp;&nbsp;&nbsp;<span className="italic">Kürze mit {f}</span>
            </p>
          )
        })}
      </>
    )
  },
}
