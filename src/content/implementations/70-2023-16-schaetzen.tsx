import { Exercise } from '@/data/types'

interface DATA {
  ratio: number
  diff: number
}

export const exercise70: Exercise<DATA> = {
  title: '2023 / 16) Schätzen',
  useCalculator: false,
  duration: 2,
  generator(rng) {
    return {
      ratio: rng.randomIntBetween(2, 4),
      diff: rng.randomIntBetween(2, 9) * 10,
    }
  },
  constraint({ data }) {
    return true
  },
  task({ data }) {
    return (
      <>
        <p>
          Die Abbildung zeigt maßstabsgetreu eine Autobahnbrücke mit sechs
          Pfeilern. Der längste Pfeiler ist nur {data.diff} m kürzer als der
          Eifelturm, der 330 m hoch ist.
        </p>
        <img
          src="/content/70.png"
          alt="Bild einer Brücke"
          className="w-[450px]"
          style={{ aspectRatio: data.ratio * 0.9 }}
        />
        <p>Wie lang ist die Brücke? Gib deinen Lösungsweg an.</p>
      </>
    )
  },
  solution({ data }) {
    const pf = 330 - data.diff
    return (
      <>
        <p>Berechne die Höhe des längsten Pfeiler:</p>
        <p>
          330m - {data.diff}m = {pf}m
        </p>
        <p>Die Brücke ist etwa {data.ratio}-mal länger als der Pfeiler:</p>
        <p>
          {data.ratio} · {pf}m = <strong>ca. {pf * data.ratio}m</strong>
        </p>
      </>
    )
  },
}
