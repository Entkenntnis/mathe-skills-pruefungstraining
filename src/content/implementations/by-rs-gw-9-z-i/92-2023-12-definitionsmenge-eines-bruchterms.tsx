import { Exercise } from '@/data/types'
import { buildFrac } from '@/helper/math-builder'
import { pp } from '@/helper/pretty-print'

interface DATA {
  n: number
  l1: number
  l2: number
}

export const exercise92: Exercise<DATA> = {
  title: '2023 / 12) Definitionsmenge eines Bruchterms',
  useCalculator: false,
  duration: 1,
  generator(rng) {
    return {
      n: rng.randomIntBetween(2, 11),
      l1: rng.randomIntBetween(-5, 5),
      l2: rng.randomIntBetween(-5, 5),
    }
  },
  constraint({ data }) {
    return data.l1 !== data.l2 && data.l1 < data.l2
  },
  task({ data }) {
    return (
      <>
        <p>
          Ergänze den Nenner, so dass der Bruchterm T(x) die Definitionsmenge
          D&nbsp;=&nbsp;ℚ&nbsp;\&nbsp;{'{'} {pp(data.l1)}; {pp(data.l2)}
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
      else return <>(x {pp(-x, 'merge_op')})</>
    }
    return (
      <>
        <p>
          Lasse den Nenner für jede Zahl, die aus der Definitionsmenge
          ausgeschlossen ist, null werden:
        </p>
        <p className="text-lg text-center">
          T(x) ={' '}
          {buildFrac(
            data.n,
            <>
              {buildF(data.l1)} · {buildF(data.l2)}
            </>
          )}
        </p>
      </>
    )
  },
}
