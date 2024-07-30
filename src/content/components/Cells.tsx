import clsx from 'clsx'

interface CellsProps {
  data: boolean[][]
  size: number
}

export function Cells({ data, size }: CellsProps) {
  return (
    <div className="bg-black p-[2px] flex flex-col items-start gap-[1px] w-fit mt-4">
      {data.map((row, i) => {
        return (
          <div className="flex gap-[1px]" key={i}>
            {row.map((filled, i) => {
              return (
                <div
                  key={i}
                  style={{ width: size, height: size }}
                  className={clsx(filled ? 'bg-blue-300' : 'bg-gray-50')}
                ></div>
              )
            })}
          </div>
        )
      })}
    </div>
  )
}
