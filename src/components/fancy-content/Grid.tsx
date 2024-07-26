import clsx from 'clsx'

interface GridProps {
  data: string[][]
}

export function Grid({ data }: GridProps) {
  return (
    <div className="bg-gray-300 p-[1px] flex flex-col items-start gap-[1px] w-fit">
      {data.map(renderRow)}
    </div>
  )

  function renderRow(data: string[], i: number) {
    return (
      <div key={i} className="flex gap-[1px]">
        {data.map(renderCell)}
      </div>
    )
  }

  function renderCell(data: string, i: number) {
    return (
      <div
        className={clsx(
          'bg-white w-7 h-7 flex items-center justify-center text-xl',
          data.includes('  ') && 'border-b-primary border-b'
        )}
        key={i}
      >
        {data.replace('  ', '')}
      </div>
    )
  }
}
