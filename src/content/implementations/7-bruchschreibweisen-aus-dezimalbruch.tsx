import { Exercise } from '@/data/types'
import { getGcd } from '@/helper/get-gcd'
import { buildFrac, buildOverline } from '@/helper/math-builder'
import { pp } from '@/helper/pretty-print'

interface DATA {
  nums: { jsx: JSX.Element; z: number; n: number }[]
}

export const exercise7: Exercise<DATA> = {
  title: 'Bruchschreibweise - aus Dezimalbruch',
  useCalculator: false,
  duration: 2,
  generator(rng) {
    const candidates = rng.shuffleArray([2, 3, 4, 5, 8, 10, 20, 100])
    const nums = []
    for (let i = 0; i < 4; i++) {
      const n = candidates[i]
      let z = rng.randomIntBetween(1, n - 1)
      while (getGcd(n, z) > 1) {
        z--
      }
      nums.push({
        z,
        n,
        jsx:
          n == 3 ? (
            <>0,{buildOverline(3 * z)}</>
          ) : n == 9 ? (
            <>0,{buildOverline(z)}</>
          ) : (
            <>{pp(z / n)}</>
          ),
      })
    }
    return { nums }
  },
  task({ data }) {
    return (
      <>
        <p>Schreibe als Bruch.</p>
        <p>
          {[0, 1, 2, 3].map((id) => (
            <span className="inline-block mr-16 text-lg" key={id}>
              {data.nums[id].jsx}
            </span>
          ))}
        </p>
      </>
    )
  },
  solution({ data }) {
    return (
      <>
        {[0, 1, 2, 3].map((id) => (
          <p className="" key={id}>
            {data.nums[id].jsx} = {buildFrac(data.nums[id].z, data.nums[id].n)}
          </p>
        ))}
      </>
    )
  },
}
