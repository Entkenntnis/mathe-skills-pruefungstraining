import { Exercise } from '@/data/types'
import { pp } from '@/helper/pretty-print'

interface DATA {
  a1: number
  b1: number
  a2: number
  b2: number
  a3: number
  b3: number
}

export const exercise19: Exercise<DATA> = {
  title: 'Dezimalzahlen addieren und subtrahieren',
  useCalculator: false,
  duration: 2,
  generator(rng) {
    function dezimalzahl() {
      const twoDigits = rng.randomItemFromArray([true, true, false])
      const e = rng.randomIntBetween(1, 5)
      const k = twoDigits
        ? rng.randomIntBetween(1, 99) / 100
        : rng.randomIntBetween(1, 9) / 10
      return e + k
    }
    return {
      a1: dezimalzahl(),
      b1: dezimalzahl(),
      a2: dezimalzahl(),
      b2: dezimalzahl(),
      a3: dezimalzahl(),
      b3: dezimalzahl(),
    }
  },
  task({ data }) {
    return (
      <>
        <p>Berechne.</p>
        <p>
          <span className="inline-block mr-14">
            {pp(data.a1)} + {pp(data.b1)}
          </span>
          <span className="inline-block mr-14">
            {pp(data.a2)} - {pp(data.b2)}
          </span>
          <span className="inline-block mr-14">
            {pp(-data.a3)} + {pp(data.b3)}
          </span>
        </p>
      </>
    )
  },
  solution({ data }) {
    return (
      <>
        <p>
          {pp(data.a1)} + {pp(data.b1)} = {pp(data.a1 + data.b1)}
        </p>
        <p>
          {pp(data.a2)} - {pp(data.b2)} = {pp(data.a2 - data.b2)}
        </p>
        <p>
          {pp(-data.a3)} + {pp(data.b3)} = {pp(-data.a3 + data.b3)}
        </p>
      </>
    )
  },
}
