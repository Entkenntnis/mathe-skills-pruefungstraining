import { XIcon } from '@/components/icons/XIcon'
import { Exercise } from '@/data/types'
import { pp } from '@/helper/pretty-print'

interface DATA {
  text: string
  distance: number
  result: number
}

export const exercise71: Exercise<DATA> = {
  title: '2023 / 17 (Raum und Form)',
  useCalculator: false,
  duration: 1,
  generator(rng) {
    const distance = rng.randomItemFromArray([0.5, 1, 1.5, 2])
    const [text, result] = rng.randomItemFromArray([
      ['auf sich selbst abgebildet werden.', 4],
      [
        "auf k' abgebildet werden. Die Kreise k und k' haben keinen gemeinsamen Punkt.",
        5 + distance * 2,
      ],
      [
        "auf k' abgebildet werden. Die Kreise k und k' haben einen gemeinsamen Punkt.",
        4 + distance * 2,
      ],
      [
        "auf k' abgebildet werden. Die Kreise k und k' haben zwei gemeinsame Punkt.",
        3 + distance * 2,
      ],
    ])
    return {
      distance,
      text,
      result,
    }
  },
  constraint({ data }) {
    return (
      !(data.distance == 0.5 && data.text.includes('zwei')) &&
      !(data.distance == 0.5 && data.text.includes('gemeinsamen')) &&
      !(data.distance == 2 && data.text.includes('keinen'))
    )
  },
  task({ data }) {
    return (
      <>
        <p>
          Ein Kreis k mit dem Radius r = {pp(data.distance)} cm soll durch
          Achsenspiegelung an der Achse a {data.text}
        </p>
        <p>
          Zeichne einen möglichen Mittelpunkt M eines solchen Kreises k ein.{' '}
        </p>
        <img src="/content/71.png" alt="Achse a" />
      </>
    )
  },
  solution({ data }) {
    const upper = 84.5
    const lower = 5
    const top = lower + ((upper - lower) / 8) * data.result
    return (
      <>
        <p>Das ist ein möglicher Punkt:</p>
        <div className="relative w-fit">
          <div
            className="absolute text-lg text-blue-600"
            style={{ left: '43.7%', top: `${top - 6}%` }}
          >
            M
          </div>
          <div
            className="absolute text-lg text-blue-600"
            style={{ left: '38.3%', top: `${top}%` }}
          >
            <XIcon />
          </div>
          <img src="/content/71.png" alt="Achse a" />
        </div>
      </>
    )
  },
}
