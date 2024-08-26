import { Exercise } from '@/data/types'
import { pp } from '@/helper/pretty-print'

interface DATA {
  factor: number
  l: number
}

export const exercise89: Exercise<DATA> = {
  title: '2023 / 9) Pias Freigehege',
  useCalculator: false,
  duration: 2,
  generator(rng) {
    const base = rng.randomIntBetween(2, 5)
    const factor = rng.randomItemFromArray([0.5, 1, 2, 3, 4])
    const other = base * factor
    return { factor, l: base + other }
  },
  constraint({ data }) {
    return !pp(data.l).includes(',') && data.l < 30 && data.l > 5
  },
  task({ data }) {
    return (
      <>
        <p>Pia wünscht sich ein Freigehege für ihre Hühner.</p>
        <p>
          Ihr Vater zeigt ihr einen Plan (siehe Skizze), bei dem zwei Wände für
          zwei Seiten des rechteckigen Geheges genutzt werden sollen. Für die
          restlichen zwei Seiten sollen insgesamt {pp(data.l)} m Zaun
          vollständig verbaut werden.
        </p>
        <img src="content/89.png" alt="Skizze" />
        <p>
          Gib den Flächeninhalt A des Freigeheges an, wenn es{' '}
          {factorToWord(data.factor)} so lang wie breit sein soll.
        </p>
      </>
    )
  },
  solution({ data }) {
    const f = data.factor < 1 ? 3 : data.factor + 1
    const r = (data.l / f) * (data.l - data.l / f)
    let [h1, h2] = data.factor < 1 ? ['Länge', 'Breite'] : ['Breite', 'Länge']
    return (
      <>
        <p>Bestimme die Länge und die Breite aus dem Verhältnis:</p>
        <p>
          {data.l} m : {f} = {data.l / f} m <i>({h1})</i>
        </p>
        <p>
          {data.l} m − {data.l / f} m = {data.l - data.l / f} m <i>({h2})</i>
        </p>
        <p>Multipliziere:</p>
        <p>
          {data.l / f} m · {data.l - data.l / f} m = {r} m²
        </p>
        <p>
          Der Flächeninhalt des Geheges beträgt <strong>{r} m²</strong>.
        </p>
      </>
    )
  },
}

function factorToWord(n: number) {
  if (n == 2) {
    return 'doppelt'
  }
  if (n == 3) {
    return 'dreimal'
  }
  if (n == 4) {
    return 'viermal'
  }
  if (n == 0.5) {
    return 'halb'
  }
  if (n == 1) {
    return 'genau'
  }
}
