import { Exercise } from '@/data/types'
import { buildInlineFrac, buildSqrt } from '@/helper/math-builder'
import { pp } from '@/helper/pretty-print'

interface DATA {
  a: number
}

export const exercise202: Exercise<DATA> = {
  title: '2023 /1) Zahlen ordnen',
  useCalculator: false,
  duration: -1,
  generator(rng) {
    return { a: rng.randomIntBetween(5, 99) }
  },
  constraint({ data }) {
    return pp(Math.sqrt(data.a)).includes(',')
  },
  task({ data }) {
    return <>{buildSqrt(data.a)}</>
  },
  solution({ data }) {
    const lower = Math.floor(Math.sqrt(data.a))
    const upper = Math.ceil(Math.sqrt(data.a))
    return (
      <>
        <p>Wähle die nächstkleinere und die nächstgrößere Quadratzahl:</p>
        <p>{lower}</p>
        <p>{upper}</p>
      </>
    )
  },
}
