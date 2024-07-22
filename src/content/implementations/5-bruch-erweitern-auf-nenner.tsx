import { Exercise } from '@/data/types'
import { buildFrac } from '@/helper/math-builder'

interface DATA {
  fracs: { z: number; n: number; f: number }[]
}

export const exercise5: Exercise<DATA> = {
  title: 'Bruch erweitern - Nenner gegeben',
  useCalculator: false,
  duration: 2,
  generator(rng) {
    const z3 = rng.randomItemFromArray([1, 3])
    const f3 = rng.randomIntBetween(3, 6)
    const z6 = rng.randomItemFromArray([])
    const z9 = rng.randomItemFromArray([])

    return {
      fracs: [
        {
          z: rng.randomItemFromArray([1, 3]),
          n: 4,
          f: rng.randomIntBetween(3, 6),
        },
        {
          z: rng.randomItemFromArray([1, 5]),
          n: 6,
          f: rng.randomIntBetween(2, 5),
        },
        {
          z: rng.randomItemFromArray([1, 2, 4, 5, 7, 8]),
          n: 9,
          f: rng.randomIntBetween(2, 5),
        },
      ],
    }
  },
  task({ data }) {
    return (
      <>
        <p>Erweitere auf den angegebenen Nenner.</p>
        <p>
          {buildFrac(data.fracs[0].z, data.fracs[0].n)} ={' '}
          {buildFrac(
            <span className="inline-block w-5 h-5 bg-blue-300 -mb-1"></span>,
            data.fracs[0].f * data.fracs[0].n
          )}
          <span className="inline-block w-20"></span>
          {buildFrac(data.fracs[1].z, data.fracs[1].n)} ={' '}
          {buildFrac(
            <span className="inline-block w-5 h-5 bg-blue-300 -mb-1"></span>,
            data.fracs[1].f * data.fracs[1].n
          )}
          <span className="inline-block w-20"></span>
          {buildFrac(data.fracs[2].z, data.fracs[2].n)} ={' '}
          {buildFrac(
            <span className="inline-block w-5 h-5 bg-blue-300 -mb-1"></span>,
            data.fracs[2].f * data.fracs[2].n
          )}
        </p>
      </>
    )
  },
  solution({ data }) {
    return (
      <>
        {[0, 1, 2].map((i) => {
          return (
            <p key={i}>
              {buildFrac(data.fracs[i].z, data.fracs[i].n)} ={' '}
              {buildFrac(
                <span className="font-bold">
                  {data.fracs[i].f * data.fracs[0].z}
                </span>,
                data.fracs[i].f * data.fracs[i].n
              )}
              &nbsp;&nbsp;&nbsp;
              <span className="italic">Erweitere mit {data.fracs[i].f}</span>
            </p>
          )
        })}
      </>
    )
  },
}
