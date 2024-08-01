import { Exercise } from '@/data/types'

interface DATA {
  a: number
  l: number
  b: number
  h: number
  order: number[]
}

const l = <span className="font-mono">l</span>

export const exercise69: Exercise<DATA> = {
  title: '2023 / 15 (Messen)',
  useCalculator: false,
  duration: 2,
  generator(rng) {
    const a = rng.randomIntBetween(2, 5)
    return {
      a,
      b: a * 2,
      l: a * 3,
      h: a * 2 + rng.randomIntBetween(1, 5),
      order: rng.shuffleArray([0, 1, 2]),
    }
  },
  constraint({ data }) {
    return (data.h - data.a * 2) * data.b * data.l <= 100
  },
  task({ data }) {
    const els = [
      <>
        Länge {l} = {data.l} cm
      </>,
      <>Breite b = {data.b} cm</>,
      <>Höhe h = {data.h} cm</>,
    ]
    const ordered = [els[data.order[0]], els[data.order[1]], els[data.order[2]]]
    return (
      <>
        <p>
          Ein quaderförmiger Karton hat folgende Innenmaße:
          <br />
          {ordered[0]}, {ordered[1]} und {ordered[2]}.
        </p>
        <img src="/content/69.jpg" alt="Skizze für Kiste" />
        <p>
          In diesen Karton werden 12 Würfel mit der Kantenlänge a = {data.a} cm
          in zwei Schichten aufeinandergestapelt (siehe Skizze).
        </p>
        <p>
          Da die Würfel den Karton nicht bis oben hin ausfüllen, soll das
          restliche Volumen V zum Transport mit Füllmaterial ausgestopft werden.
        </p>
        <p>Gib an, wie groß das restliche Volumen V ist (in cm³).</p>
      </>
    )
  },
  solution({ data }) {
    const d = data.h - data.a * 2
    const r = d * data.b * data.l
    return (
      <>
        <p>Berechne die restliche Höhe:</p>
        <p>
          {data.h}cm - 2 · {data.a}cm = {d}cm
        </p>
        <p>Berechne das restliche Volumen:</p>
        <p>
          V = {d}cm · {data.b}cm · {data.l}cm = <strong>{r}cm³</strong>
        </p>
      </>
    )
  },
}
