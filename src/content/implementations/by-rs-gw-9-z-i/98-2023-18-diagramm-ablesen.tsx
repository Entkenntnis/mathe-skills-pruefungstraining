import { Exercise } from '@/data/types'
import React from 'react'
import { HandballDiagram } from '../../components/HandballDiagram'
import { pp } from '@/helper/pretty-print'

interface DATA {
  markers: { x: number; y: number; name: string }[]
  statements: string[]
  index: number
  explanation: string
}

export const exercise98: Exercise<DATA> = {
  title: '2023 / 18) Diagramm ablesen',
  useCalculator: false,
  duration: 2,
  generator(rng) {
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
  constraint({ data, rng }) {
    if (new Set(data.markers.map((m) => m.y)).size < 4) return false

    const [g1, g2, g3, g4] = rng.shuffleArray([
      (falseClaim: boolean) => {
        // blueprint 1:
        let sum = 0
        data.markers.forEach((m) => {
          sum += m.y
        })
        const possibles = data.markers
          .filter((m) => m.y > Math.ceil(sum / 4))
          .slice(0, 2)
        const impossibles = data.markers
          .filter((m) => m.y < Math.floor(sum / 4))
          .slice(0, 2)
        const values = falseClaim ? impossibles : possibles
        if (values.length < 2) {
          return null
        }
        if (falseClaim) {
          data.explanation = `Die Vereine ${values[0].name} und ${
            values[1].name
          } haben jeweils weniger als ${Math.floor(
            sum / 4
          )} der ${sum} Meisterschaften gewonnen.`
        }
        return `Die Vereine ${values[0].name} und ${values[1].name} haben jeweils mehr als ein Viertel aller Meisterschaften gewonnen.`
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
        return `Der Verein ${higher} hat mehr als doppelt so viele Mitglieder wie Verein ${lower}.`
      },
      (falseClaim: boolean) => {
        const [lower, higher] = rng.randomItemFromArray(
          falseClaim
            ? [
                ['B', 'D'],
                ['A', 'C'],
                ['B', 'E'],
              ]
            : [
                ['A', 'B'],
                ['C', 'E'],
              ]
        )
        if (falseClaim) {
          const x = data.markers.find((x) => x.name == lower)!.x
          data.explanation = `50% mehr als ${x} ist ${
            x * 1.5
          }, Verein ${higher} hat aber ${
            data.markers.find((x) => x.name == higher)!.x
          } Mitglieder.`
        }
        return `Verein ${higher} hat 50% mehr Mitglieder als Verein ${lower}.`
      },
      (falseClaim: boolean) => {
        // blueprint 4:

        const sorted = data.markers.slice()
        sorted.sort((a, b) => a.y - b.y)

        const lower = sorted[0].name
        const middle = sorted[2].name
        const higher = sorted[4].name

        const middleCount = (sorted[0].y + sorted[4].y) / 2
        if (sorted[2].y == middleCount) return null // uncomfortable

        if (falseClaim) {
          data.explanation = `Die Hälfte liegt bei ${pp(
            middleCount
          )} Meisterschaften und ${middle} liegt ${
            sorted[2].y > middleCount ? 'darüber' : 'darunter'
          }.`
        }

        return `Verein ${middle} hat${
          (falseClaim ? sorted[2].y > middleCount : sorted[2].y < middleCount)
            ? ' weniger als'
            : ' mehr als'
        } halb so viele Meisterschaften gewonnen wie die Vereine ${lower} und ${higher} zusammen.`
      },
    ])

    const t = [
      g1(data.index == 0),
      g2(data.index == 1),
      g3(data.index == 2),
      g4(data.index == 3),
    ]

    if (t.every((x) => x !== null)) {
      data.statements = t
      return true
    }

    return false
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
