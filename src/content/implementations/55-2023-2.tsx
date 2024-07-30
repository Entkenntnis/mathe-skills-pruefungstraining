import { Exercise } from '@/data/types'
import { Cells } from '../components/Cells'
import { buildFrac } from '@/helper/math-builder'

interface DATA {
  grid: boolean[][]
  count: number
}

export const exercise55: Exercise<DATA> = {
  title: '2023 / 2 (Zahl)',
  useCalculator: false,
  duration: 1,
  generator(rng) {
    const row = []
    for (let i = 0; i < 10; i++) {
      row.push(false)
    }
    const grid = []
    for (let i = 0; i < 5; i++) {
      grid.push(row.slice(0))
    }
    let count = 0
    for (let i = 0; i < 5; i++) {
      if (rng.randomIntBetween(1, 2) == 1) {
        for (let j = 0; j < 5; j++) {
          grid[i][j] = true
        }
        count += 5
      }
    }
    for (let i = 6; i < 10; i++) {
      if (rng.randomIntBetween(1, 2) == 1) {
        for (let j = 0; j < 5; j++) {
          grid[j][i] = true
        }
        count += 5
      }
    }
    return { grid, count }
  },
  task({ data }) {
    return (
      <>
        <p>
          Eine Figur wurde aus gleichartigen Spielsteinen gelegt, die sich nur
          in der Farbe unterscheiden.
        </p>
        <p>
          Gib in Prozent an, welcher Anteil der Figur aus farbigen Spielsteinen
          besteht
        </p>
        <Cells data={data.grid} size={20} />
      </>
    )
  },
  solution({ data }) {
    return (
      <>
        <p>
          Zähle die Spielsteine. Die Figur besteht aus 50 Spielsteinen, davon
          sind {data.count} farbig.
        </p>
        <p>
          Schreibe als Bruch und erweitere auf 100, um die Prozent abzulesen:
        </p>
        <p>
          {buildFrac(data.count, 50)} = {buildFrac(data.count * 2, 100)} ={' '}
          {data.count * 2} %
        </p>
        <p>
          Der Anteil der farbigen Spielsteine beträgt{' '}
          <strong>{data.count * 2} %</strong>.
        </p>
      </>
    )
  },
}
