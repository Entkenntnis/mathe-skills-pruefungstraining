import { Exercise } from '@/data/types'
import { baseExponent } from '../../generators/base-exponent'

interface DATA {
  nums: { base: number; exponent: number }[]
}

export const exercise33: Exercise<DATA> = {
  title: 'Potenzwert berechnen - Term',
  useCalculator: false,
  duration: 3,
  generator(rng) {
    return { nums: [0, 1, 2].map(() => baseExponent(rng)) }
  },
  task({ data }) {
    return (
      <>
        <p>Berechne.</p>
        <p>
          {data.nums[0].base}
          <sup>{data.nums[0].exponent}</sup> +{data.nums[1].base}
          <sup>{data.nums[1].exponent}</sup> -{data.nums[2].base}
          <sup>{data.nums[2].exponent}</sup>
        </p>
      </>
    )
  },
  solution({ data }) {
    const result =
      Math.pow(data.nums[0].base, data.nums[0].exponent) +
      Math.pow(data.nums[1].base, data.nums[1].exponent) -
      Math.pow(data.nums[2].base, data.nums[2].exponent)
    return (
      <>
        <p>
          {data.nums[0].base}
          <sup>{data.nums[0].exponent}</sup> +{data.nums[1].base}
          <sup>{data.nums[1].exponent}</sup> -{data.nums[2].base}
          <sup>{data.nums[2].exponent}</sup> = {result}
        </p>
      </>
    )
  },
}
