import { Exercise } from '@/data/types'

interface DATA {
  angle: number
  el: string
}

export const exercise85: Exercise<DATA> = {
  title: '2023 / 5) Raute zeichnen',
  useCalculator: false,
  duration: 1,
  generator(rng) {
    return {
      el: rng.randomItemFromArray(['α', 'γ']),
      angle: rng.randomIntBetween(2, 11) * 10,
    }
  },
  constraint({ data }) {
    return true
  },
  task({ data }) {
    return (
      <>
        <p>
          Für die Raute ABCD gilt: {data.el} = {data.angle}°. Vervollständige
          die Zeichnung zur Raute ABCD.
        </p>
        <img src="/content/85.png" alt="Vorlage" className="h-[170px]" />
      </>
    )
  },
  solution({ data }) {
    const midX = 190
    const topY = 18
    const bottomY = 230
    const midY = (bottomY - topY) / 2 + topY
    const diff =
      (Math.tan((data.angle / 180 / 2) * Math.PI) * (bottomY - topY)) / 2
    return (
      <>
        <p>Nutze die Symmetrie der Raute ABCD für die Zeichung:</p>
        <svg viewBox="0 0 400 245" className="h-[170px]">
          <image href="/content/85.png" height="245" width="400" />
          <line
            x1={midX}
            y1={bottomY}
            x2={midX + diff}
            y2={midY}
            stroke="blue"
            strokeWidth={3}
          />
          <line
            x1={midX}
            y1={bottomY}
            x2={midX - diff}
            y2={midY}
            stroke="blue"
            strokeWidth={3}
          />
          <line
            x1={midX}
            y1={topY}
            x2={midX + diff}
            y2={midY}
            stroke="blue"
            strokeWidth={3}
          />
          <line
            x1={midX}
            y1={topY}
            x2={midX - diff}
            y2={midY}
            stroke="blue"
            strokeWidth={3}
          />
          <text
            x={midX + diff + 10}
            y={midY + 10}
            fontSize={20}
            textAnchor="left"
            stroke="black"
          >
            B
          </text>
          <text
            x={midX - diff - 20}
            y={midY + 10}
            fontSize={20}
            textAnchor="right"
            stroke="black"
          >
            D
          </text>
        </svg>
      </>
    )
  },
}
