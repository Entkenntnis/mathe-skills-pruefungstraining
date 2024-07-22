import { Exercise } from '@/data/types'
import { buildFrac } from '@/helper/math-builder'

interface DATA {
  fracs: { z: number; n: number; g: number; r: number }[]
}

export const exercise3: Exercise<DATA> = {
  title: 'Bruchschreibweisen - gemischte Zahl',
  useCalculator: false,
  duration: 2,
  generator(rng) {
    let z3 = rng.randomIntBetween(5, 13)
    if (z3 % 3 == 0) {
      z3++
    }
    let z4 = rng.randomIntBetween(3, 10) * 2 + 1
    let z7 = rng.randomIntBetween(10, 30)
    if (z7 % 7 == 0) {
      z7++
    }
    let z9 = rng.randomIntBetween(12, 40)
    if (z9 % 3 == 0) {
      z9++
    }
    return {
      fracs: [
        { z: z3, n: 3, g: Math.floor(z3 / 3), r: z3 % 3 },
        { z: z4, n: 4, g: Math.floor(z4 / 4), r: z4 % 4 },
        { z: z7, n: 7, g: Math.floor(z7 / 7), r: z7 % 7 },
        { z: z9, n: 9, g: Math.floor(z9 / 9), r: z9 % 9 },
      ],
    }
  },
  task({ data }) {
    return (
      <>
        <p>Schreibe als gemischte Zahl:</p>
        <p>
          {buildFrac(data.fracs[0].z, data.fracs[0].n)}
          <span className="inline-block w-16"></span>
          {buildFrac(data.fracs[1].z, data.fracs[1].n)}
          <span className="inline-block w-16"></span>
          {buildFrac(data.fracs[2].z, data.fracs[2].n)}
          <span className="inline-block w-16"></span>
          {buildFrac(data.fracs[3].z, data.fracs[3].n)}
        </p>
      </>
    )
  },
  solution({ data }) {
    return (
      <>
        <p>
          {data.fracs[0].g} {buildFrac(data.fracs[0].r, data.fracs[0].n)}
          <span className="inline-block w-16"></span>
          {data.fracs[1].g} {buildFrac(data.fracs[1].r, data.fracs[1].n)}
          <span className="inline-block w-16"></span>
          {data.fracs[2].g} {buildFrac(data.fracs[2].r, data.fracs[2].n)}
          <span className="inline-block w-16"></span>
          {data.fracs[3].g} {buildFrac(data.fracs[3].r, data.fracs[3].n)}
        </p>
      </>
    )
  },
}
