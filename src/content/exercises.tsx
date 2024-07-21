import { Exercise } from '@/data/types'
import { exercise1 } from './implementations/1-bruchteil-ermitteln'

export const exercisesData: { [key: number]: Exercise<any> } = {
  1: exercise1,
}
