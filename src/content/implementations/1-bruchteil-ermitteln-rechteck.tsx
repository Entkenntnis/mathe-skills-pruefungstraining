import { Exercise } from '@/data/types'
import { getGcd } from '@/helper/get-gcd'
import { buildFrac } from '@/helper/math-builder'
import clsx from 'clsx'

interface DATA {
  colored: boolean[]
}

export const exercise1: Exercise<DATA> = {
  title: 'Bruchteil ermitteln - Rechteck',
  generator(rng) {
    const count = rng.randomIntBetween(0, 12)
    const colored: boolean[] = []
    for (let i = 0; i < 12; i++) {
      colored.push(i <= count)
    }
    return { colored: rng.shuffleArray(colored) }
  },
  task({ data }) {
    return (
      <>
        <p>
          Bestimme den Bruchteil der gefärbten und weißen Fläche. Kürze dein
          Ergebnis so weit wie möglich.
        </p>
        <div className="bg-black p-[2px] flex flex-col items-start gap-[1px] w-fit mt-4">
          <div className="flex gap-[1px]">
            {renderCell(0)}
            {renderCell(1)}
            {renderCell(2)}
            {renderCell(3)}
          </div>
          <div className="flex gap-[1px]">
            {renderCell(4)}
            {renderCell(5)}
            {renderCell(6)}
            {renderCell(7)}
          </div>
          <div className="flex gap-[1px]">
            {renderCell(8)}
            {renderCell(9)}
            {renderCell(10)}
            {renderCell(11)}
          </div>
        </div>
      </>
    )
    function renderCell(id: number) {
      return (
        <div
          className={clsx(
            'h-8 w-8',
            data.colored[id] ? 'bg-blue-300' : 'bg-gray-50'
          )}
        ></div>
      )
    }
  },
  solution({ data }) {
    const colored = data.colored.filter((x) => x).length
    const gcd = getGcd(colored, 12)
    return (
      <>
        <p>
          Anteil gefärbt: {buildFrac(colored, 12)}
          {gcd > 1 && <> = {buildFrac(colored / gcd, 12 / gcd)}</>}
        </p>
        <p>
          Anteil weiß: {buildFrac(12 - colored, 12)}
          {gcd > 1 && <> = {buildFrac((12 - colored) / gcd, 12 / gcd)}</>}
        </p>
        <p>
          Schreibe die gesuchten Zahl der Quadrate ({colored} und {12 - colored}
          ) in den Zähler und die Gesamtzahl der Quadrate (12) in den Nenner.
        </p>
      </>
    )
  },
}
