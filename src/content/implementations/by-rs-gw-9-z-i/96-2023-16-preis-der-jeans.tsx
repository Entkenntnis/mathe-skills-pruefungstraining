import { Exercise } from '@/data/types'
import { pp } from '@/helper/pretty-print'

interface DATA {
  factor: number
  percentage: number
  base: number
  price: number
}

export const exercise96: Exercise<DATA> = {
  title: '2023 / 16) Preis der Jeans',
  useCalculator: false,
  duration: 2,
  generator(rng) {
    const base = rng.randomIntBetween(12, 24) * 10
    const factor = rng.randomItemFromArray([1, 2, 3, 4])
    const percentage = rng.randomItemFromArray([0.2, 0.25, 0.5])
    const price = ((base * (1 - percentage)) / (factor + 1)) * factor
    return { factor, percentage, price, base }
  },
  constraint({ data }) {
    return (
      !pp(data.price).includes(',') && (data.percentage * data.base) % 10 == 0
    )
  },
  task({ data }) {
    return (
      <>
        <p>
          Alex hat {data.base} € gespart und geht mit diesem Geld einkaufen.
          Alex findet eine Jeans und ein Hemd. Die Jeans ist{' '}
          {data.factor == 1
            ? 'genau'
            : data.factor == 2
            ? 'doppelt'
            : data.factor == 3
            ? 'dreimal'
            : 'viermal'}{' '}
          so teuer wie das Hemd. Nach dem Bezahlen verbleiben noch{' '}
          {data.percentage * 100}% des Ersparten.
        </p>
        <p>Gib an, wie teuer die Jeans war.</p>
      </>
    )
  },
  solution({ data }) {
    return (
      <>
        <p>
          Übriges Geld: {data.base} € · {data.percentage * 100} % ={' '}
          {data.base * data.percentage} €
        </p>
        <p>
          Ausgegebenes Betrag: {data.base} € − {data.base * data.percentage} € ={' '}
          {data.base - data.base * data.percentage} €
        </p>
        {data.factor == 1 && (
          <p>Halbiere den Betrag, weil Jeans und Hemd gleich teuer sind.</p>
        )}
        {data.factor == 2 && (
          <p>
            Teile den Betrag durch 3 und nehme davon 2 Teile, weil die Jeans
            doppelt so teuer ist wie das Hemd.
          </p>
        )}
        {data.factor == 3 && (
          <p>
            Teile den Betrag durch 4 und nehme davon 3 Teile, weil die Jeans
            dreimal so teuer ist wie das Hemd.
          </p>
        )}
        {data.factor == 4 && (
          <p>
            Teile den Betrag durch 5 und nehme davon 4 Teile, weil die Jeans
            viermal so teuer ist wie das Hemd.
          </p>
        )}
        <p>
          Die Jeans kostete <strong>{pp(data.price)} €</strong>.
        </p>
      </>
    )
  },
}
