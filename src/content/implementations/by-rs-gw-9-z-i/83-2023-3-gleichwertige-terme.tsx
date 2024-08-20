import { Exercise } from '@/data/types'

interface DATA {
  randomOrder: number[]
  options: JSX.Element[]
  correct: number
}

export const exercise83: Exercise<DATA> = {
  title: '2023 / 3) Gleichwertige Terme',
  useCalculator: false,
  duration: 1,
  generator(rng) {
    const correct = rng.randomIntBetween(0, 4)
    const [a, b] = rng.randomItemFromArray([
      [2, 3],
      [3, 4],
      [2, 4],
    ])
    const options: JSX.Element[] = [
      correct == 0 ? (
        <>x + x = 2x</>
      ) : (
        <>
          x + x = x<sup>2</sup>
        </>
      ),
      correct == 1 ? <>2x − 4x = −2x</> : <>2 − 4x = −2x</>,
      correct == 2 ? <>3x − x = 2x</> : <>3x − x = 3</>,
      correct == 3 ? (
        <>
          x<sup>{a}</sup> · x<sup>{b}</sup> = x<sup>{a + b}</sup>
        </>
      ) : (
        <>
          x<sup>{a}</sup> · x<sup>{b}</sup> = x<sup>{a * b}</sup>
        </>
      ),
      correct == 4 ? <>2x · 3 = 6x</> : <>2x · 3x = 6x</>,
    ]
    return { randomOrder: rng.shuffleArray([0, 1, 2, 3, 4]), options, correct }
  },
  constraint({ data }) {
    return true
  },
  task({ data }) {
    return (
      <>
        <p>
          Nur eine der folgenden Aussagen ist für jede beliebige Belegung von x
          wahr.
        </p>
        <ol>
          {data.randomOrder.map((i) => (
            <li key={i}>{data.options[i]}</li>
          ))}
        </ol>
      </>
    )
  },
  solution({ data }) {
    return (
      <>
        <p>
          Nur die{' '}
          <strong>Aussage {data.randomOrder.indexOf(data.correct) + 1}</strong>{' '}
          ist immer wahr.
        </p>
      </>
    )
  },
}
