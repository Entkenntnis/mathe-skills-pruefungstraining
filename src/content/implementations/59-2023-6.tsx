import { Exercise } from '@/data/types'
import { constrainedGeneration } from '@/helper/constrained-generation'

interface DATA {
  digits: number[]
  target: number
  solution: number[]
  bad: boolean
}

export const exercise59: Exercise<DATA> = {
  title: '2023 / 6 (Zahl)',
  useCalculator: false,
  duration: 2,
  generator(rng) {
    return constrainedGeneration(
      () => {
        const digits = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9]
        const selected = rng.shuffleArray(digits).slice(0, 7)
        selected.sort()
        const target = rng.randomItemFromArray(digits) * 1000
        const candidate1 = [
          target / 1000,
          ...selected.filter((x) => x != target).slice(0, 3),
        ]
        const candidate2 = [
          target / 1000 - 1,
          ...selected
            .filter((x) => x != target)
            .reverse()
            .slice(0, 3),
        ]
        const diff1 = parseInt(candidate1.join('')) - target
        const diff2 = target - parseInt(candidate2.join(''))

        return {
          digits: selected,
          target,
          solution: diff1 < diff2 ? candidate1 : candidate2,
          bad: diff1 == diff2,
        }
      },
      (data) => {
        const d = data.target / 1000
        return (
          d > 1 &&
          data.digits.includes(d) &&
          data.digits.includes(d - 1) &&
          !data.bad
        )
      }
    )
  },
  task({ data }) {
    return (
      <>
        <p>
          Die abgebildeten Ziffernkärtchen stehen jeweils einmal zur Verfügung.
        </p>
        <p>{renderDigits(data.digits)}</p>
        <p>
          Wähle vier dieser Kärtchen aus und bilde damit die Zahl, deren Wert so
          nah wie möglich bei {data.target} liegt.
        </p>
      </>
    )
  },
  solution({ data }) {
    return (
      <>
        <p>Die gesuchte Zahl ist:</p>
        <p>{renderDigits(data.solution)}</p>
        <p>
          <small>
            Strategie: Bilde die kleinste Zahl, die mit {data.target / 1000}{' '}
            startet und die größte Zahl, die mit {data.target / 1000 - 1}{' '}
            startet. Vergleiche, welche dieser zwei Zahl näher an {data.target}{' '}
            liegt.
          </small>
        </p>
      </>
    )
  },
}

function renderDigits(ns: number[]) {
  return ns.map((num, i) => {
    return (
      <span className="kbd h-16 w-12 mr-2 text-xl" key={i}>
        {num}
      </span>
    )
  })
}
