import { Exercise } from '@/data/types'
import React from 'react'
import { HandballDiagram } from '../components/HandballDiagram'
import { constrainedGeneration } from '@/helper/constrained-generation'

interface DATA {
  markers: { x: number; y: number; name: string }[]
  statements: string[]
  index: number
  explanation: string
}

export const exercise61: Exercise<DATA> = {
  title: '2023 / 8a (Daten und Zufall)',
  useCalculator: false,
  duration: 2,
  generator(rng) {
    return constrainedGeneration<DATA>(
      () => {
        const markers = [
          { x: 2000, y: rng.randomIntBetween(2, 4), name: 'A' },
          { x: 3000, y: rng.randomIntBetween(2, 5), name: 'B' },
          { x: 4000, y: rng.randomIntBetween(2, 7), name: 'C' },
          { x: 5000, y: rng.randomIntBetween(2, 7), name: 'D' },
          { x: 6000, y: rng.randomIntBetween(2, 7), name: 'E' },
        ]
        return {
          markers,
          statements: [],
          index: rng.randomIntBetween(1, 3),
          explanation: '',
        }
      },
      (data) => {
        const values = new Set<number>()
        let doubled = -1
        let max = ''
        let maxValue = -1
        data.markers.forEach((m) => {
          if (values.has(m.y)) {
            doubled = m.y
          }
          if (m.y > maxValue) {
            maxValue = m.y
            max = m.name
          }
          values.add(m.y)
        })
        if (values.size !== 4) {
          return false
        }
        // todo

        const [g1, g2, g3, g4] = rng.shuffleArray([
          (falseClaim: boolean) => {
            // blueprint 1:
            let sum = 0
            data.markers.forEach((m) => {
              sum += m.y
            })
            if (falseClaim) {
              data.explanation = `Alle Vereine haben zusammen ${sum} Meisterschaften gewonnen.`
            }
            return `Alle Vereine haben zusammen ${
              falseClaim ? sum + rng.randomItemFromArray([1, -1]) : sum
            } Meisterschaften gewonnen.`
          },
          (falseClaim: boolean) => {
            // blueprint 2:
            const [lower, higher] = rng.randomItemFromArray(
              falseClaim
                ? [
                    ['B', 'D'],
                    ['A', 'C'],
                    ['B', 'E'],
                  ]
                : [
                    ['A', 'D'],
                    ['A', 'E'],
                  ]
            )
            if (falseClaim) {
              data.explanation = `Die Anzahl der Mitglieder ist nicht mehr als doppelt so groß.`
            }
            return `Verein ${higher} hat mehr als doppelt so viele Mitglieder wie Verein ${lower}.`
          },
          (falseClaim: boolean) => {
            // blueprint 3:
            const [v1, v2] = data.markers
              .filter((m) => m.y == doubled)
              .map((m) => m.name)
            if (falseClaim) {
              data.explanation = `Die Anzahl der Mitglieder ist unterschiedlich.`
            }
            return `Die Vereine ${v1} und ${v2} haben die gleiche Anzahl an ${
              falseClaim ? 'Mitgliedern' : 'Meisterschaften'
            }.`
          },
          (falseClaim: boolean) => {
            // blueprint 4:
            let sum = 0
            let other = 0
            const vs: string[] = []
            data.markers.forEach((m) => {
              if (m.name !== max) {
                sum += m.y
                vs.push(m.name)
              } else other = m.y
            })
            const diff = sum - other
            if (falseClaim) {
              data.explanation = `Die Differenz beträgt ${diff}.`
            }
            return `Die Vereine ${vs[0]}, ${vs[1]}, ${vs[2]} und ${
              vs[3]
            } haben zusammen ${
              falseClaim ? diff + rng.randomItemFromArray([1, -1]) : diff
            } Meisterschaften mehr gewonnen als Verein ${max}.`
          },
        ])

        data.statements = [
          g1(data.index == 0),
          g2(data.index == 1),
          g3(data.index == 2),
          g4(data.index == 3),
        ]

        return true
      }
    )
  },
  task({ data }) {
    return (
      <>
        <p>
          Im abgebildeten Diagramm sind jeweils die Mitgliederzahl und die
          Anzahl der gewonnenen Meisterschaften von fünf Handballvereinen
          dargestellt.
        </p>
        <HandballDiagram markers={data.markers} />
        <p>
          Eine Aussage zum Diagramm ist <strong>falsch</strong>. Welche ist es?
        </p>
        <ol>
          {data.statements.map((s, i) => (
            <li key={i}>{s}</li>
          ))}
        </ol>
      </>
    )
  },
  solution({ data }) {
    return (
      <>
        <p>
          Die <strong>Aussage {data.index + 1}</strong> ist falsch.{' '}
          {data.explanation}
        </p>
      </>
    )
  },
}
