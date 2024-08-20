import { Exercise } from '@/data/types'
import { pp } from '@/helper/pretty-print'

interface DATA {
  letters: string[]
  withNeg: boolean
  base: [number, number, number, number]
  a: [number, number, number, number]
  b: [number, number, number, number]
}

export const exercise82: Exercise<DATA> = {
  title: '2023 / 2) Ausklammern',
  useCalculator: false,
  duration: 2,
  generator(rng) {
    const baseTuple = rng.shuffleArray([0, 1, 2])
    baseTuple.unshift(rng.randomItemFromArray([2, 3, 4]))
    const highTuple = [
      baseTuple[0] * rng.randomItemFromArray([3, 4, 5, 6]),
      rng.randomIntBetween(baseTuple[1] + 1, 3),
      rng.randomIntBetween(baseTuple[2] + 1, 3),
      rng.randomIntBetween(baseTuple[3] + 1, 3),
    ]
    const base = baseTuple.slice()
    const toMix = rng.shuffleArray([0, 1, 2, 3]).slice(0, 2)
    for (const i of toMix) {
      const t = baseTuple[i]
      baseTuple[i] = highTuple[i]
      highTuple[i] = t
    }
    return {
      letters: rng.randomItemFromArray([
        ['a', 'b', 'c'],
        ['x', 'y', 'z'],
        ['e', 'f', 'g'],
      ]),
      withNeg: rng.randomItemFromArray([true, false]),
      base,
      a: baseTuple,
      b: highTuple,
    }
  },
  constraint({ data }) {
    return true
  },
  task({ data }) {
    return (
      <>
        <p>
          Der Faktor {data.withNeg && '−'}
          {renderTuple(data.base, data.letters)} wurde ausgeklammert.
          Vervollständige:
        </p>
        <p className="text-lg">
          {data.withNeg && '−'}
          {renderTuple(data.a, data.letters)} +{' '}
          {renderTuple(data.b, data.letters)} = {data.withNeg && '−'}
          {renderTuple(data.base, data.letters)} · (
          _____________________________ )
        </p>
      </>
    )
  },
  solution({ data }) {
    const r1 = data.a.map((x, i) =>
      i == 0 ? x / data.base[i] : x - data.base[i]
    ) as [number, number, number, number]
    const r2 = data.b.map((x, i) =>
      i == 0 ? x / data.base[i] : x - data.base[i]
    ) as [number, number, number, number]
    return (
      <>
        <p>Dividiere durch den gemeinsamen Faktor:</p>
        <p className="text-lg">
          {data.withNeg && '−'}
          {renderTuple(data.a, data.letters)} +{' '}
          {renderTuple(data.b, data.letters)} = {data.withNeg && '−'}
          {renderTuple(data.base, data.letters)} · ({' '}
          <strong>
            {renderTuple(r1, data.letters)} {data.withNeg ? '−' : '+'}{' '}
            {renderTuple(r2, data.letters)}
          </strong>{' '}
          )
        </p>
      </>
    )
  },
}

function renderTuple(
  tuple: [number, number, number, number],
  letters: string[]
) {
  return (
    <>
      {tuple[0] == 1 ? null : pp(tuple[0])}
      {[0, 1, 2].map((i) => (
        <span key={i}>
          {tuple[i + 1] == 0 ? null : (
            <>
              {letters[i]}
              {tuple[i + 1] == 1 ? '' : tuple[i + 1] == 2 ? '²' : '³'}
            </>
          )}
        </span>
      ))}
    </>
  )
}
