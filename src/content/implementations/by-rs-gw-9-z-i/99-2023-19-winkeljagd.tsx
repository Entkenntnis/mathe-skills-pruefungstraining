import { Exercise } from '@/data/types'
import { buildOverline } from '@/helper/math-builder'

interface DATA {
  a: number
  b: number
}

export const exercise99: Exercise<DATA> = {
  title: '2023 / 19) Winkeljagd',
  useCalculator: false,
  duration: 2,
  generator(rng) {
    return {
      a: rng.randomIntBetween(5, 13) * 5,
      b: rng.randomIntBetween(2, 8) * 5,
    }
  },
  constraint({ data }) {
    return data.a > data.b
  },
  task({ data }) {
    return (
      <>
        <p>
          Gib die Winkelmaße α und β an. Es gilt: |{buildOverline('AM')}| = |
          {buildOverline('MC')}| und g || h.
        </p>
        <svg className="svg-defaults max-w-[499px]" viewBox="0 0 499 215">
          <image href="/content/99.png" width={499} height={215} />
          <text x={248} y={93}>
            {data.b}°
          </text>
          <text x={255} y={53}>
            {data.a}°
          </text>
        </svg>
      </>
    )
  },
  solution({ data }) {
    return (
      <>
        <p>
          Bestimme zuerst den Ergänzungswinkel bei A. Dieser hat eine Größe von
          180° − {data.a}° = {180 - data.a}°.
        </p>
        <p>
          Berechne aus der Innenwinkelsumme im Dreieck den Ergänzungswinkel zu{' '}
          α. Dieser beträgt 180° − {data.b}° − {180 - data.a}° ={' '}
          {data.a - data.b}°.
        </p>
        <p>Berechne nun α:</p>
        <p>
          <strong>α</strong> = 180° − {data.a - data.b}° ={' '}
          <strong>{180 - data.a + data.b}°</strong>
        </p>
        <p>
          Das Dreieck ABC ist gleichschenklig, deshalb gilt ∡MCB = {data.a}°.
          Als Wechselwinkel (Z-Winkel) hat β die gleiche Größe:
        </p>
        <p>
          <strong>β = {data.a}°</strong>
        </p>
      </>
    )
  },
}
