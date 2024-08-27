import { Exercise } from '@/data/types'
import { pp } from '@/helper/pretty-print'

interface DATA {
  ratio: number
  result: number
  p: number
  l: number
}

export const exercise97: Exercise<DATA> = {
  title: '2023 / 17) Schätzen',
  useCalculator: false,
  duration: 2,
  generator(rng) {
    const ratio = rng.randomIntBetween(2, 4)
    const result = rng.randomItemFromArray([50, 100, 150, 200, 250])
    const p = rng.randomItemFromArray([0.2, 0.25, 0.5, 0.1, 0.125])
    return { ratio, result, p, l: result * ratio * p }
  },
  constraint({ data }) {
    return !pp(data.l).includes(',')
  },
  task({ data }) {
    return (
      <>
        <p>
          Eine Autobahnbrücke mit sechs Pfeilern (siehe maßstabsgetreue
          Abbildung) wird saniert. Am ersten Tag wurden {pp(data.l)} m der
          Fahrbahn erneuert, das sind {pp(data.p * 100)}&nbsp;% der gesamten
          Brückenlänge. Anschließend werden die Brückenpfeiler instandgesetzt.
        </p>
        <img
          src="/content/70.png"
          alt="Bild einer Brücke"
          className="w-[450px]"
          style={{ aspectRatio: data.ratio * 0.9 }}
        />
        <p>
          Welche Höhe hat der längste Brückenpfeiler? Gib deinen Lösungsweg an.
        </p>
      </>
    )
  },
  solution({ data }) {
    return (
      <>
        <p>Berechne die Länge der Fahrbahn:</p>
        <p>
          {pp(data.l)} m ≙ {pp(data.p * 100)} %<br />
          {pp(data.l / data.p)} m ≙ 100 %
        </p>
        <p>
          Die Fahrbahn ist etwa {data.ratio}-mal länger als der längste
          Brückenpfeiler, dieser hat eine Höhe von ungefähr {data.l / data.p} m
          : {data.ratio} = <strong>{data.result} m</strong>.
        </p>
      </>
    )
  },
}
