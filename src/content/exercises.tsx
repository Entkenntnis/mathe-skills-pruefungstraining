import { Exercise } from '@/data/types'
import { exercise1 } from './implementations/1-bruchteil-ermitteln-rechteck'
import { exercise2 } from './implementations/2-bruchteil-ermitteln-kreis'

export const exercisesData: { [key: number]: Exercise<any> } = {
  1: exercise1,
  2: exercise2,
}
