import { Exercise } from '@/data/types'
import { buildFrac } from '@/helper/math-builder'

interface DATA {
  k: number
  z: number
  E: string
}

export const exercise100: Exercise<DATA> = {
  title: '2023 / 20) Relative Häufigkeit angeben',
  useCalculator: false,
  duration: 1,
  generator(rng) {
    return {
      k: rng.randomIntBetween(3, 15),
      z: rng.randomIntBetween(3, 15),
      E: rng.randomItemFromArray(['Kopf', 'Zahl']),
    }
  },
  constraint({ data }) {
    return true
  },
  task({ data }) {
    function renderLine(x: number, y: number, c: number) {
      const x_start = x + Math.floor(c / 5) * 45
      const elementIndex = c % 5
      if (elementIndex == 4) {
        return (
          <line
            strokeWidth={3}
            x1={-3 + x_start}
            y1={10 + y}
            x2={32 + x_start}
            y2={15 + y}
          />
        )
      } else {
        return (
          <line
            strokeWidth={3}
            x1={x_start + elementIndex * 8}
            y1={y}
            x2={x_start + elementIndex * 8 + 4}
            y2={y + 25}
          />
        )
      }
    }
    return (
      <>
        <p>
          Max hat mehrmals eine Münze geworfen und die Ergebnisse in einer
          Tabelle festgehalten. Gib die relative Häufigkeit des Ergebnisses „
          {data.E}“ an.
        </p>
        <svg className="svg-defaults max-w-[300px]" viewBox="0 0 300 80">
          <line x1={1} y1={1} x2={299} y2={1} />
          <line x1={1} y1={79} x2={299} y2={79} />
          <line x1={1} x2={1} y1={1} y2={79} />
          <line x1={299} x2={299} y1={1} y2={79} />
          <line x1={150} x2={150} y1={1} y2={79} />
          <line x1={1} x2={299} y1={40} y2={40} />
          {Array.from({ length: data.k }).map((_, i) => renderLine(10, 47, i))}
          {Array.from({ length: data.z }).map((_, i) =>
            renderLine(10 + 150, 47, i)
          )}
          <text x={75} y={28} textAnchor="middle">
            Kopf
          </text>
          <text x={75 + 150} y={28} textAnchor="middle">
            Zahl
          </text>
        </svg>
      </>
    )
  },
  solution({ data }) {
    return (
      <>
        <p>
          Bestimme die Gesamtzahl der Experimente: {data.k} + {data.z} ={' '}
          {data.k + data.z}
        </p>
        <p>
          Stelle die Wahrscheinlichkeit auf, indem du die absolute Häufigkeit
          von „{data.E}“ in den Zähler und die Gesamtzahl in den Nenner
          schreibst:
        </p>
        <p>
          <strong>
            {buildFrac(data.E == 'Kopf' ? data.k : data.z, data.k + data.z)}
          </strong>
        </p>
        <p>
          <small>Gleichwertige Lösungen sind ebenfalls korrekt.</small>
        </p>
      </>
    )
  },
}
