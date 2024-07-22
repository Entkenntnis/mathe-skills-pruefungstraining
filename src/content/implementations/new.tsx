import { Exercise } from '@/data/types'

interface DATA {}

export const exerciseXXX: Exercise<DATA> = {
  title: 'NEU',
  useCalculator: false,
  duration: -1,
  generator(rng) {
    return {}
  },
  task({ data }) {
    return <></>
  },
  solution({ data }) {
    return <></>
  },
}
