import { Exercise } from '@/data/types'

interface DATA {
  test: number
}

export const exercise1: Exercise<DATA> = {
  title: 'Bruchteil ermitteln',
  generator() {
    return { test: 1 }
  },
  task({ data }) {
    return (
      <>
        <p>Aufgabenstellung!{data.test}</p>
        <div className="bg-black p-[1px] flex flex-col items-start gap-[1px] w-fit mt-4">
          <div className="flex gap-[1px]">
            <div className="h-8 w-8 bg-gray-50"></div>
            <div className="h-8 w-8 bg-gray-50"></div>
            <div className="h-8 w-8 bg-gray-50"></div>
            <div className="h-8 w-8 bg-gray-50"></div>
          </div>
          <div className="flex gap-[1px]">
            <div className="h-8 w-8 bg-gray-50"></div>
            <div className="h-8 w-8 bg-gray-50"></div>
            <div className="h-8 w-8 bg-gray-50"></div>
            <div className="h-8 w-8 bg-gray-50"></div>
          </div>
          <div className="flex gap-[1px]">
            <div className="h-8 w-8 bg-gray-50"></div>
            <div className="h-8 w-8 bg-gray-50"></div>
            <div className="h-8 w-8 bg-gray-50"></div>
            <div className="h-8 w-8 bg-gray-50"></div>
          </div>
        </div>
      </>
    )
  },
  solution() {
    return (
      <>
        <p>Hi!</p>
      </>
    )
  },
}
