import { Exercise } from '@/data/types'
import { getSectorPath } from '@/helper/svg-builder'

interface DATA {
  alpha: number
  beta: number
}

export const exercise105: Exercise<DATA> = {
  title: '2023 / 5) Drachenviereck zeichnen',
  useCalculator: false,
  duration: 2,
  generator(rng) {
    return {
      alpha: rng.randomIntBetween(40, 110, 10),
      beta: rng.randomIntBetween(40, 110, 10),
    }
  },
  constraint({ data }) {
    return true
  },
  task({ data }) {
    return (
      <>
        <p>
          Für das Drachenviereck ABCD gilt: α = {data.alpha}° und γ ={' '}
          {data.beta}°. Vervollständige die Zeichnung zum Drachenviereck ABCD
          mit der Symmetrieachse AC.{' '}
        </p>
        <img src="/content/105.png" alt="Vorlage" className="max-w-[300px]" />
      </>
    )
  },
  solution({ data }) {
    const mx = 192
    const A_y = 15
    const C_y = 228
    const toR = Math.PI / 180
    const a = data.alpha / 2
    const g = data.beta / 2
    const r_y =
      ((Math.cos(a * toR) * Math.sin(g * toR)) /
        Math.sin((180 - a - g) * toR)) *
      (C_y - A_y)
    const dist = Math.tan(a * toR) * r_y
    return (
      <>
        <p>Nutze zwei Hilfswinkel und vervollständige das Drachenviereck:</p>
        <svg viewBox="0 0 386 239" className="max-w-[386px] svg-defaults">
          <image href="/content/105.png" width="386" height="239" />
          <line
            stroke="blue"
            strokeWidth={2}
            x1={mx}
            y1={A_y}
            x2={mx - dist}
            y2={A_y + r_y}
          />
          <line
            stroke="blue"
            strokeWidth={2}
            x1={mx}
            y1={C_y}
            x2={mx - dist}
            y2={A_y + r_y}
          />
          <line
            stroke="blue"
            strokeWidth={2}
            x1={mx}
            y1={A_y}
            x2={mx + dist}
            y2={A_y + r_y}
          />
          <line
            stroke="blue"
            strokeWidth={2}
            x1={mx}
            y1={C_y}
            x2={mx + dist}
            y2={A_y + r_y}
          />
          <text x={mx - dist - 5} y={A_y + r_y} textAnchor="end" fontSize={20}>
            B
          </text>
          <text x={mx + dist + 5} y={A_y + r_y} fontSize={20}>
            D
          </text>
          <path
            className="fill-blue-300/50"
            stroke="black"
            d={getSectorPath(mx, A_y, 120, 270, 270 + a)}
          />
          <text x={mx + 5} y={A_y + 70} textAnchor="right" stroke="gray">
            {a}°
          </text>
          <path
            className="fill-blue-300/50"
            stroke="black"
            d={getSectorPath(mx, C_y, 120, 90 - g, 90)}
          />
          <text x={mx + 5} y={C_y - 57} textAnchor="right" stroke="gray">
            {g}°
          </text>
        </svg>
      </>
    )
  },
}
