import { Exercise } from '@/data/types'
import React from 'react'
import { HandballDiagram } from '../components/HandballDiagram'

interface DATA {}

export const exercise61: Exercise<DATA> = {
  title: '2023 / 8a (Daten und Zufall)',
  useCalculator: false,
  duration: 1,
  generator(rng) {
    return {}
  },
  task({ data }) {
    return (
      <>
        <p>
          Im abgebildeten Diagramm sind jeweils die Mitgliederzahl und die
          Anzahl der gewonnenen Meisterschaften von fünf Handballvereinen
          dargestellt.
        </p>
        <HandballDiagram
          markers={[
            { x: 2000, y: 2, name: 'A' },
            { x: 3000, y: 2, name: 'B' },
          ]}
        />
      </>
    )
  },
  solution({ data }) {
    return <></>
  },
}
