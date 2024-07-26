import { Grid } from '@/components/fancy-content/Grid'
import { Exercise } from '@/data/types'
import { pp } from '@/helper/pretty-print'

interface DATA {
  nums: { a: number; b: number }[]
}

export const exercise21: Exercise<DATA> = {
  title: 'Dezimalzahlen multiplizieren - schriftlich',
  useCalculator: false,
  duration: 3,
  generator(rng) {
    return {
      nums: [0, 1].map(() => {
        let a = rng.randomIntBetween(11, 99)
        if (a % 10 == 0) {
          a++
        }
        let b = rng.randomIntBetween(11, 99)
        if (b % 10 == 0) {
          b++
        }
        return {
          a: a / 10,
          b: b / 10,
        }
      }),
    }
  },
  task({ data }) {
    return (
      <>
        <p>Multipliziere schriftlich.</p>
        <p>
          {data.nums.map((entry, i) => (
            <span className="mr-16" key={i}>
              {pp(entry.a)} · {pp(entry.b)}
            </span>
          ))}
        </p>
      </>
    )
  },
  solution({ data }) {
    return (
      <>
        {data.nums.map((entry, i) => (
          <div key={i} className="my-6">
            {renderGrid(entry.a, entry.b)}
          </div>
        ))}
      </>
    )

    function renderGrid(a: number, b: number) {
      const row = ['', '', '', '', '', '', '', '', '']
      const grid: string[][] = []
      for (let i = 0; i < 7; i++) {
        grid.push(row.slice())
      }
      renderNumber(a, 1, 3, '  ')
      renderNumber(b, 1, 6, '  ')
      grid[1][1] = '  '
      grid[1][7] = '  '
      grid[1][4] = '·  '
      for (let i = 1; i <= 7; i++) {
        grid[4][i] = '  '
      }
      renderNumber(a * b, 5, 6)
      renderNumber(Math.floor(b) * 10 * a, 2, 5)
      renderNumber((b - Math.floor(b)) * 100 * a, 3, 6)

      // calculate overflow
      for (let col = 5; col >= 1; col--) {
        const sum =
          parseInt(grid[2][col + 1] || '0') +
          parseInt(grid[3][col + 1] || '0') +
          (grid[3][col + 1] ? 1 : 0)
        if (sum >= 10) {
          grid[4][col] += '¹'
        }
      }

      return <Grid data={grid} />

      function renderNumber(
        a: number,
        row: number,
        col: number,
        postfix: string = ''
      ) {
        // right aligned
        const [h, l] = pp(a).split(',')
        const cells: string[] = []
        h.split('').forEach((d) => {
          cells.push(d)
        })
        if (l) {
          const last = cells.pop()
          cells.push(last + ',')
          l.split('').forEach((d) => cells.push(d))
        }
        cells.reverse()
        for (let i = 0; i < cells.length; i++) {
          grid[row][col - i] = cells[i] + postfix
        }
      }
    }
  },
}
