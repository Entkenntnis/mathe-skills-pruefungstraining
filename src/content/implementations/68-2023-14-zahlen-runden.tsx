import { Exercise } from '@/data/types'
import { countLetter } from '@/helper/count-letter'
import { pp } from '@/helper/pretty-print'

interface DATA {
  target: number
  candidates: number[]
  correct: number
}

export const exercise68: Exercise<DATA> = {
  title: '2023 / 14) Zahlen runden',
  useCalculator: false,
  duration: 2,
  generator(rng) {
    const target = rng.randomIntBetween(11, 98) / 100
    const correct = target - 0.005 + rng.randomIntBetween(1, 4) / 10000
    const candidates = rng.shuffleArray([
      correct,
      target - 0.005 - rng.randomIntBetween(1, 8) / 10000,
      target + 0.005 - rng.randomIntBetween(1, 8) / 10000,
      target + 0.005 + rng.randomIntBetween(1, 8) / 10000,

      target -
        rng.randomIntBetween(1, 3) / 100 -
        rng.randomIntBetween(1, 8) / 10000,
    ])

    return { target, candidates, correct: candidates.indexOf(correct) }
  },
  constraint({ data }) {
    return pp(data.target).length == 4
  },
  task({ data }) {
    return (
      <>
        <p>
          Welche der folgenden fünf Zahlen ist die{' '}
          <strong>kleinste Zahl</strong>, die gerundet {pp(data.target)} ergibt?
        </p>
        <ul>
          {data.candidates.map((c, i) => (
            <li key={i}>
              {countLetter('A', i) + ')'} {pp(c)}
            </li>
          ))}
        </ul>
      </>
    )
  },
  solution({ data }) {
    return (
      <>
        <p>
          Die richtige Antwort lautet{' '}
          <strong>{countLetter('A', data.correct)}</strong>.
        </p>
      </>
    )
  },
}
