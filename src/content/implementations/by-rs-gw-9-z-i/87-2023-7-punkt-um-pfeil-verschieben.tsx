import { Exercise } from '@/data/types'
import { buildVec, buildVec2 } from '@/helper/math-builder'
import { pp } from '@/helper/pretty-print'

interface DATA {
  P1: string
  P2: string
  reverse: boolean
  a: number
  b: number
  c: number
  d: number
}

export const exercise87: Exercise<DATA> = {
  title: '2023 / 7) Punkt um Pfeil verschieben',
  useCalculator: false,
  duration: 2,
  generator(rng) {
    const [P1, P2] = rng.randomItemFromArray([
      ['A', 'B'],
      ['S', 'T'],
      ['P', 'Q'],
    ])
    return {
      P1,
      P2,
      reverse: rng.randomItemFromArray([true, false]),
      a: rng.randomIntBetween(-5, 5),
      b: rng.randomIntBetween(-5, 5),
      c: rng.randomIntBetween(-5, 5),
      d: rng.randomIntBetween(-5, 5),
    }
  },
  constraint({ data }) {
    return (
      data.a * data.b !== 0 &&
      data.c * data.d !== 0 &&
      data.a !== data.b &&
      data.c !== data.d
    )
  },
  task({ data }) {
    return (
      <>
        <p>
          Gegeben sind der Punkt {data.reverse ? data.P2 : data.P1}({' '}
          {pp(data.a)} | {pp(data.b)} ) und der Pfeil{' '}
          {buildVec(data.P1 + data.P2)} = {buildVec2(pp(data.c), pp(data.d))}.
        </p>
        <p>
          Gib die Koordinaten x und y des Punktes{' '}
          {data.reverse ? data.P1 : data.P2}(x|y) an.
        </p>
      </>
    )
  },
  solution({ data }) {
    if (data.reverse) {
      return (
        <>
          <p>
            Bilde die Summe aus dem Ortsvektor von {data.P2} und dem Gegenvektor{' '}
            {buildVec(data.P2 + data.P1)}:
          </p>
          <p>
            {buildVec('O' + data.P1)} = {buildVec('O' + data.P2)} ⊕{' '}
            {buildVec(data.P2 + data.P1)} = {buildVec2(pp(data.a), pp(data.b))}{' '}
            ⊕ {buildVec2(pp(-data.c), pp(-data.d))} ={' '}
            {buildVec2(pp(data.a - data.c), pp(data.b - data.d))}
          </p>
          <p>Lies die Koordinaten ab:</p>
          <p>
            <strong>
              {data.P1}( {pp(data.a - data.c)} | {pp(data.b - data.d)} )
            </strong>
          </p>
        </>
      )
    }
    return (
      <>
        <p>
          Bilde die Summe aus dem Ortsvektor von {data.P1} und dem Pfeil{' '}
          {buildVec(data.P1 + data.P2)}:
        </p>
        <p>
          {buildVec('O' + data.P2)} = {buildVec('O' + data.P1)} ⊕{' '}
          {buildVec(data.P1 + data.P2)} = {buildVec2(pp(data.a), pp(data.b))} ⊕{' '}
          {buildVec2(pp(data.c), pp(data.d))} ={' '}
          {buildVec2(pp(data.a + data.c), pp(data.b + data.d))}
        </p>
        <p>Lies die Koordinaten ab:</p>
        <p>
          <strong>
            {data.P2}( {pp(data.a + data.c)} | {pp(data.b + data.d)} )
          </strong>
        </p>
      </>
    )
  },
}
