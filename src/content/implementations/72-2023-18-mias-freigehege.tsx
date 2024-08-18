import { Exercise } from '@/data/types'

interface DATA {
  target: number
  wall: number
  available: number
}

export const exercise72: Exercise<DATA> = {
  title: '2023 / 18) Mias Freigehege',
  useCalculator: false,
  duration: 3,
  generator(rng) {
    const wall = rng.randomIntBetween(3, 9)
    const b = rng.randomIntBetween(3, 9)

    const min = wall * b
    return {
      wall,
      available: wall + 2 * b,
      target: rng.randomIntBetween(Math.ceil(min / 10), 10) * 10,
    }
  },
  constraint({ data }) {
    return ((data.available - data.wall) / 2) * data.wall < data.target
  },
  task({ data }) {
    return (
      <>
        <p>
          Mia wünscht sich ein rechteckiges Freigehege für ihre Hühner mit einem
          Flächeninhalt von mindestens {data.target} m². Ihr Vater zeigt ihr
          einen Plan, bei dem der Zaun wie in der Skizze dargestellt an die{' '}
          {data.wall} m lange Wand des Hühnerstalls anschließt. Für die
          fehlenden 3 Seiten des Geheges sollen insgesamt {data.available} m
          Zaun vollständig verbaut werden.
        </p>
        <div className="relative w-fit">
          <img src="/content/72.png" alt="Skizze Hühnerstall" />
          <div
            className="absolute -rotate-90 text-lg"
            style={{ left: 108, top: 81 }}
          >
            {data.wall}
          </div>
        </div>
        <p>
          Begründe rechnerisch, dass Mias Wunsch nach einem Gehege mit
          mindestens {data.target} m² Flächeninhalt nicht erfüllt werden kann.
        </p>
      </>
    )
  },
  solution({ data }) {
    const b = (data.available - data.wall) / 2
    const a = b * data.wall
    return (
      <>
        <p>Berechne die Breite des Freigehege:</p>
        <p>
          ({data.available} m - {data.wall} m) : 2 = {b} m
        </p>
        <p>Berechne den Flächeninhalt:</p>
        <p>
          {b} m · {data.wall} m = {a} m²
        </p>
        <p>
          <strong>
            {a} m² &lt; {data.target} m²
          </strong>
          , deshalb ist Mias Wunsch nicht möglich.
        </p>
      </>
    )
  },
}
