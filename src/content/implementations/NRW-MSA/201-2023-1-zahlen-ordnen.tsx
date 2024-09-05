import { Exercise } from '@/data/types'
import { buildInlineFrac, buildSqrt } from '@/helper/math-builder'
import { pp } from '@/helper/pretty-print'

interface DATA {
  a: number
}

export const exercise201: Exercise<DATA> = {
  title: '2023 /1) Zahlen ordnen',
  useCalculator: false,
  duration: -1,
  generator(rng) {
    return { a: rng.randomIntBetween(5, 100, 5) / -100 }
  },
  constraint({ data }) {
    return true
  },
  task({ data }) {
    return (
      <>
        <p>dsfdf </p>
        <p>
          Test f(x)=
          {buildInlineFrac(
            <>
              {pp(data.a)} − 2<sup>2</sup>
            </>,
            pp(data.a)
          )}
          x+
          {buildInlineFrac(
            <>
              log<sub>2</sub>(x)
            </>,
            buildSqrt(2)
          )}
        </p>
      </>
    )
  },
  solution({ data }) {
    return <></>
  },
}
