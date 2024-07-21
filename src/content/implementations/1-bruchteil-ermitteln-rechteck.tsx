import { Exercise } from '@/data/types'
import clsx from 'clsx'

interface DATA {
  colored: boolean[]
}

export const exercise1: Exercise<DATA> = {
  title: 'Bruchteil ermitteln - Rechteck',
  generator(rng) {
    const colored: boolean[] = []
    for (let i = 0; i < 12; i++) {
      colored.push(rng.randomItemFromArray([true, false]))
    }
    return { colored }
  },
  task({ data }) {
    return (
      <>
        <p>
          Bestimme den Bruchteil der gefärbten und weißen Fläche. Kürze dein
          Ergebnis so weit wie möglich.
        </p>
        <div className="bg-black p-[1px] flex flex-col items-start gap-[1px] w-fit mt-4">
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
            data.colored[id] ? 'bg-primary' : 'bg-gray-50'
          )}
        ></div>
      )
    }
  },
  solution({ data }) {
    const colored = data.colored.filter((x) => x).length
    return (
      <>
        <p>
          Das Rechteckt ist in 12 kleinere Quadrate unterteilt, die gleich groß
          sind.
        </p>
        <p>
          Von den Quadraten sind {colored} gefärbt und {12 - colored} weiß.
        </p>
        <p>
          Daraus folgen die Bruchteile {colored}/12 = [gekürzter Bruch] gefärbt
          und {12 - colored}/12 = [gekürzter Bruch] weiß.
        </p>
      </>
    )
  },
}
