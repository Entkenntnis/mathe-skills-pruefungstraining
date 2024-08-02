import { XIcon } from '@/components/icons/XIcon'
import { Exercise } from '@/data/types'
import { pp } from '@/helper/pretty-print'

interface DATA {
  text: string
  distance: number
  result: number
}

export const exercise71: Exercise<DATA> = {
  title: '2023 / 17) Achsenspiegelung',
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
    const upper = 212
    const lower = 23
    const step = (upper - lower) / 8
    const cy = lower + step * data.result
    return (
      <>
        <p>Das ist ein möglicher Punkt M:</p>
        <svg viewBox="0 0 339 237" className="max-w-[339px]">
          <image href="/content/71.png" height="237" width="339" />
          <g transform={`translate(111, ${cy})`}>
            <line x1="-5" y1="-5" x2="5" y2="5" stroke="blue" strokeWidth={2} />
            <line x1="-5" y1="5" x2="5" y2="-5" stroke="blue" strokeWidth={2} />
            <text x={6} y={-6} fontSize={18} textAnchor="left" stroke="blue">
              M
            </text>
          </g>

          <circle
            stroke="lightblue"
            strokeWidth={2}
            cx={111}
            cy={cy}
            r={data.distance * step * 2}
            fill="none"
          />
          {!data.text.includes('selbst') && (
            <circle
              stroke="lightblue"
              strokeWidth={2}
              cx={111}
              cy={lower + step * (8 - data.result)}
              r={data.distance * step * 2}
              fill="none"
            />
          )}
        </svg>
        <p>
          <small>Die Kreise sind zur Veranschlichung eingezeichnet.</small>
        </p>
      </>
    )
  },
}
