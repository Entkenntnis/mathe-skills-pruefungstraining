import { Exercise } from '@/data/types'
import { buildFrac } from '@/helper/math-builder'
import { pp } from '@/helper/pretty-print'

interface DATA {
  n: number
  l1: number
}

export const exercise113: Exercise<DATA> = {
  title: '2023 / 13) Definitionsmenge eines Bruchterms',
  useCalculator: false,
  duration: 1,
  generator(rng) {
    return {
      n: rng.randomIntBetween(2, 11),
      l1: rng.randomIntBetween(-5, 5),
    }
  },
  constraint({ data }) {
    return true
  },
  task({ data }) {
    return (
      <>
        <p>
          Ergänze den Nenner, so dass der Bruchterm T(x) die Definitionsmenge
          D&nbsp;=&nbsp;ℚ&nbsp;\&nbsp;{'{'} {pp(data.l1)}
          {'}'} hat.
        </p>
        <p className="text-lg text-center">
          T(x) ={' '}
          {buildFrac(
            data.n,
            <span className="inline-block w-24 h-9 border mt-2 border-black"></span>
          )}
        </p>
      </>
    )
  },
  solution({ data }) {
    function buildF(x: number) {
      if (x == 0) return <>x</>
      else return <>x {pp(-x, 'merge_op')}</>
    }
    return (
      <>
        <p>
          Wähle einen Term im Nenner, der für die ausgeschlossene Zahl null
          wird:
        </p>
        <p className="text-lg text-center">
          T(x) = {buildFrac(data.n, <>{buildF(data.l1)}</>)}
        </p>
      </>
    )
  },
}
