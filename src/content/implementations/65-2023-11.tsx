import { Exercise } from '@/data/types'
import { constrainedGeneration } from '@/helper/constrained-generation'
import { pp } from '@/helper/pretty-print'

interface DATA {
  m: number
  t: number
  tables: number[][]
  correct: number
}

export const exercise65: Exercise<DATA> = {
  title: '2023 / 11 (Zahl)',
  useCalculator: false,
  duration: 2,
  generator(rng) {
    return constrainedGeneration(
      () => {
        const m = rng.randomIntBetween(2, 6)
        const t = rng.randomIntBetween(-5, 5)
        const f = (x: number) => m * x + t
        const correct = [f(-1), f(0), f(2)]
        const vars = []
        for (let i = 0; i < 3; i++) {
          const copy = correct.slice()
          vars.push(copy.map((n) => n + rng.randomIntBetween(-1, 1)))
        }
        const tables = rng.shuffleArray([correct, ...vars])
        return { m, t, tables, correct: tables.indexOf(correct) }
      },
      (data) => {
        return (
          data.t != 0 && new Set(data.tables.map((x) => x.join('-'))).size === 4
        )
      }
    )
  },
  task({ data }) {
    return (
      <>
        <p>
          Gegeben ist der Term T(x) = {data.m}x {pp(data.t, 'merge_op')} (G =
          ℚ).
        </p>
        <p>Welche Tabelle gehört zu diesem Term?</p>
        <ol>
          {data.tables.map((table, i) => (
            <li key={i}>{renderTable(table)}</li>
          ))}
        </ol>
      </>
    )
  },
  solution({ data }) {
    return (
      <>
        <p>Die Tabelle {data.correct + 1} gehört zum Term T(x).</p>
      </>
    )
  },
}

function renderTable(nums: number[]) {
  return (
    <table className="table-auto border-collapse w-fit text-base text-center">
      <tbody>
        <tr>
          <td className="border border-gray-300 px-4 py-2">x</td>
          <td className="border border-gray-300 px-4 py-2">-1</td>
          <td className="border border-gray-300 px-4 py-2">0</td>
          <td className="border border-gray-300 px-4 py-2">2</td>
        </tr>
        <tr>
          <td className="border border-gray-300 px-4 py-2">T(x)</td>
          <td className="border border-gray-300 px-4 py-2">{nums[0]}</td>
          <td className="border border-gray-300 px-4 py-2">{nums[1]}</td>
          <td className="border border-gray-300 px-4 py-2">{nums[2]}</td>
        </tr>
      </tbody>
    </table>
  )
}
