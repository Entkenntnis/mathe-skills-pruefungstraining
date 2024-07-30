import { Exercise } from '@/data/types'
import { pp } from '@/helper/pretty-print'

interface DATA {
  n: number
  p: number
}

export const exercise56: Exercise<DATA> = {
  title: '2023 / 3 (Zahl)',
  useCalculator: false,
  duration: 2,
  generator(rng) {
    const n = rng.randomIntBetween(4, 10)
    const p = rng.randomItemFromArray([0.1, 0.2, 0.25, 0.5])
    return { n, p }
  },
  task({ data }) {
    return (
      <>
        <p>
          Mila hat schon {data.n} neue Englischvokabeln gelernt. Das sind{' '}
          {data.p * 100} % aller Vokabeln, die sie für die nächste
          Englischstunde zu lernen hat.
        </p>
        <p>Gib an, wie viele Vokabeln sie noch lernen muss.</p>
      </>
    )
  },
  solution({ data }) {
    return (
      <>
        <p>Nutze den Dreisatz:</p>
        <p>
          &nbsp;&nbsp;{data.p * 100} % ≙ {data.n}
          <span className="ml-16 inline-block translate-y-3">
            ↓ · {1 / data.p}
          </span>
          <br />
          100 % ≙ {data.n / data.p}
        </p>
        <p>Ziehe die gelernten Vokabeln ab:</p>
        <p>
          {data.n / data.p} {pp(-data.n, 'merge_op')} ={' '}
          {data.n / data.p - data.n}
        </p>
        <p>
          Mila muss noch <strong>{data.n / data.p - data.n}</strong> Vokabeln
          lernen.
        </p>
      </>
    )
  },
}
