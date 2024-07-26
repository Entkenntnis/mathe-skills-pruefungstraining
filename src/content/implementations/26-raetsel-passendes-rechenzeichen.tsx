import { Exercise } from '@/data/types'

interface DATA {
  nums: { a: number; b: number; c: number; r: number; op: string }[]
}

export const exercise26: Exercise<DATA> = {
  title: 'Rätsel - passendes Rechenzeichen',
  useCalculator: false,
  duration: 2,
  generator(rng) {
    return {
      nums: [0, 1].map(() => {
        const op = rng.randomItemFromArray(['add', 'sub', 'mult'])
        const a = rng.randomIntBetween(1, 9)
        const b = rng.randomIntBetween(1, 9)
        const c = rng.randomIntBetween(1, 9)
        const r = op == 'add' ? a + b + c : op == 'sub' ? a + b - c : a + b * c
        return { a, b, c, r, op: op == 'add' ? '+' : op == 'sub' ? '-' : '·' }
      }),
    }
  },
  task({ data }) {
    return (
      <>
        <p>Ersetze im Heft den Platzhalter durch das richtige Rechenzeichen.</p>
        <p>
          {data.nums.map((data, i) => (
            <span className="inline-block mr-16" key={i}>
              {data.a} + {data.b}{' '}
              <span className="bg-blue-300 inline-block w-4 h-4 -mb-[3px] mx-1"></span>{' '}
              {data.c} = {data.r}
            </span>
          ))}
        </p>
      </>
    )
  },
  solution({ data }) {
    return (
      <>
        {data.nums.map((data, i) => (
          <p className="inline-block mr-16" key={i}>
            {data.a} + {data.b}{' '}
            <span className="bg-gray-200 inline-block font-bold">
              {data.op}
            </span>{' '}
            {data.c} = {data.r}
          </p>
        ))}
      </>
    )
  },
}
