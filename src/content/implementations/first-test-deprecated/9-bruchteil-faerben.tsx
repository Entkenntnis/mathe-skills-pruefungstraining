import { Exercise } from '@/data/types'
import { getGcd } from '@/helper/get-gcd'
import { buildFrac } from '@/helper/math-builder'
import clsx from 'clsx'

interface DATA {
  n: number
}

export const exercise9: Exercise<DATA> = {
  title: 'Bruchteil färben',
  useCalculator: false,
  duration: 1,
  generator(rng) {
    return { n: rng.randomIntBetween(1, 11) }
  },
  task({ data }) {
    const f = getGcd(data.n, 12)
    return (
      <>
        <p>
          Zeiche ein Rechteck (4cm lang, 3 cm breit) und färbe den angegebenen
          Bruchteil.
        </p>
        <p>{buildFrac(data.n / f, 12 / f)}</p>
      </>
    )
  },
  solution({ data }) {
    const f = getGcd(data.n, 12)
    return (
      <>
        {f > 1 && (
          <p>
            {buildFrac(data.n / f, 12 / f)} = {buildFrac(data.n, 12)}
          </p>
        )}
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
        <p>
          <small>Das ist ein Beispiel. Andere Lösungen sind möglich.</small>
        </p>
      </>
    )

    function renderCell(id: number) {
      return (
        <div
          className={clsx(
            'h-8 w-8',
            id < data.n ? 'bg-blue-300' : 'bg-gray-50'
          )}
        ></div>
      )
    }
  },
}
