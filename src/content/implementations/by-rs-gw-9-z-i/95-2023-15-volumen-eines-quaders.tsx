import { Exercise } from '@/data/types'

interface DATA {
  V_w: number
  schichten: number
  gap: number
}

export const exercise95: Exercise<DATA> = {
  title: '2023 / 15) Volumen eines Quaders',
  useCalculator: false,
  duration: 2,
  generator(rng) {
    return {
      V_w: rng.randomItemFromArray([8, 27]),
      schichten: rng.randomItemFromArray([2, 3]),
      gap: rng.randomItemFromArray([1, 2, 3]),
    }
  },
  constraint({ data }) {
    return true
  },
  task({ data }) {
    return (
      <>
        <p>
          Würfel mit einem Volumen von je {data.V_w} cm³ sind in{' '}
          {data.schichten == 2 ? 'zwei' : 'drei'} Schichten mit jeweils 6
          Würfeln in einem Karton gestapelt (siehe Skizze).
        </p>
        <img src="/content/69.jpg" width={236} />
        <p>
          Die insgesamt {data.schichten * 6} Würfel füllen die Breite und die
          Länge des Kartons vollständig aus. Oben bleibt ein Hohlraum mit einer
          Höhe von {data.gap} cm.
        </p>
        <p>Gib an, welches Volumen V der Karton hat.</p>
      </>
    )
  },
  solution({ data }) {
    const k = Math.round(Math.pow(data.V_w, 1 / 3))
    const b = k * 2
    const l = k * 3
    const h = data.schichten * k + data.gap
    return (
      <>
        <p>Die Würfel haben eine Kantenlänge von {k} cm.</p>
        <p>
          Breite des Kartons: {b} cm
          <br />
          Länge des Kartons: {l} cm
          <br />
          Höhe des Kartons: {data.schichten} · {k} cm + {data.gap} cm = {h} cm
        </p>
        <p>Multipliziere:</p>
        <p>
          {b} cm · {l} cm · {h} cm = {b * l * h} cm³
        </p>
        <p>
          Das Volumen V des Kartons beträgt <strong>{b * l * h} cm³</strong>.
        </p>
      </>
    )
  },
}
