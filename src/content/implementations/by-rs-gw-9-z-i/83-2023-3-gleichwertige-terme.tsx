import { Exercise } from '@/data/types'

interface DATA {}

export const exercise83: Exercise<DATA> = {
  title: '2023 / 3) Gleichwertige Terme',
  useCalculator: false,
  duration: 1,
  generator(rng) {
    return {}
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
          <li>x + x = x²</li>
          <li>2 - 4x = -2x</li>
          <li>3x - 3 = 3</li>
          <li>x² x³ = x⁵</li>
          <li>2x 3x = 6x</li>
        </ol>
      </>
    )
  },
  solution({ data }) {
    return <></>
  },
}
