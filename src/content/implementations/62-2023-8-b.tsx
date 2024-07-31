import { Exercise } from '@/data/types'
import React from 'react'
import { HandballDiagram } from '../components/HandballDiagram'
import { constrainedGeneration } from '@/helper/constrained-generation'

interface DATA {
  markers: { x: number; y: number; name: string }[]
  middleOf: string[]
  x: number
  y: number
}

export const exercise62: Exercise<DATA> = {
  title: '2023 / 8b (Daten und Zufall)',
  useCalculator: false,
  duration: 1,
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
        const [middleOf, x] = rng.randomItemFromArray([
          [['A', 'C'], 3000],
          [['A', 'E'], 4000],
          [['B', 'D'], 4000],
          [['C', 'E'], 5000],
        ])
        return {
          markers,
          middleOf,
          x,
          y: rng.randomIntBetween(0, 7),
        }
      },
      (data) => {
        const resY = data.markers.find((m) => m.x == data.x)!.y
        return (
          Math.abs(data.y - resY) >= 2 &&
          new Set(data.markers.map((m) => m.y)).size > 3
        )
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
          Der Verein F hat{' '}
          {data.y == 0
            ? 'noch nie eine Meisterschaft'
            : data.y == 1
            ? 'eine Meisterschaft'
            : `schon ${data.y} Meisterschaften`}{' '}
          gewonnen und halb so viele Mitglieder wie die Vereine{' '}
          {data.middleOf[0]} und {data.middleOf[1]} zusammen.
        </p>
        <p>Trage das Kreuz für den Verein F in das Diagramm ein.</p>
      </>
    )
  },
  solution({ data }) {
    return (
      <>
        <HandballDiagram
          markers={[
            ...data.markers,
            { x: data.x, y: data.y, name: 'F', stroke: 'blue' },
          ]}
        />
      </>
    )
  },
}
