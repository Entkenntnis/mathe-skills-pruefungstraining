import { Exercise } from '@/data/types'
import { pp } from '@/helper/pretty-print'
import { roundToDigits } from '@/helper/round-to-digits'
import { Grid } from '../../components/Grid'

interface DATA {
  a: number
  b: number
  r: number
}

export const exercise22: Exercise<DATA> = {
  title: 'Dezimalzahlen divideren - schriftlich',
  useCalculator: false,
  duration: 3,
  generator(rng) {
    const r =
      rng.randomIntBetween(1, 9) / 100 +
      rng.randomIntBetween(1, 9) / 10 +
      rng.randomIntBetween(1, 9)
    const b = rng.randomIntBetween(2, 9) / 10
    return { a: b * r, b, r }
  },
  task({ data }) {
    return (
      <>
        <p>Dividiere schriftlich.</p>
        <p>
          {pp(data.a)} : {pp(data.b)}
        </p>
      </>
    )
  },
  solution({ data }) {
    const row = new Array(12).fill('')
    const grid: string[][] = []

    for (let i = 0; i < 3; i++) {
      grid.push(row.slice())
    }

    const div = data.b * 10
    const val = data.a * 10

    renderNumber(val, 1, 4)
    grid[1][5] = ':'
    renderNumber(div, 1, 6)
    grid[1][7] = '='
    renderNumber(data.r, 1, 10)

    const digits: number[] = []

    let t = val
    while (t >= 10) {
      t /= 10
    }
    while (t > 0.0000001) {
      const r = Math.floor(t)
      digits.push(r)
      t -= r
      t *= 10
      t = roundToDigits(t, 5)
      if (digits.length > 10) break
    }

    let c = digits[0]
    let i = 1
    if (c < div) {
      c = c * 10 + digits[1]
      i++
    }
    let outputRow = 2
    while (c !== 0) {
      const sub = c - (c % div)
      grid.push(row.slice())
      grid.push(row.slice())
      renderNumber(sub, outputRow++, i, '  ')
      renderNumber(c % div, outputRow, i)
      if (i < digits.length) {
        renderNumber(digits[i], outputRow++, i + 1)
        c = c % div
        c *= 10
        c += digits[i]
        i++
      } else {
        break
      }
    }

    return (
      <>
        <p>
          Multipliziere Dividend und Divisor mit 10, um durch eine ganze Zahl zu
          dividieren.
        </p>
        <div className="my-5">
          <Grid data={grid} />
        </div>
        <p>Beim Überschreiten des Kommas wird im Ergebnis das Komma gesetzt.</p>
      </>
    )

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
  },
}
