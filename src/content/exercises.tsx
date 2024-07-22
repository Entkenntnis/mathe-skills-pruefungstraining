import { Exercise } from '@/data/types'
import { exercise1 } from './implementations/1-bruchteil-ermitteln-rechteck'
import { exercise2 } from './implementations/2-bruchteil-ermitteln-kreis'
import { exercise3 } from './implementations/3-bruchschreibweisen-gemischte-zahl'
import { exercise4 } from './implementations/4-bruchschreibweisen-unechter-bruch'
import { exercise5 } from './implementations/5-bruch-erweitern-auf-nenner'
import { exercise6 } from './implementations/6-bruch-kuerzen'

export const exercisesData: { [key: number]: Exercise<any> } = {
  1: exercise1,
  2: exercise2,
  3: exercise3,
  4: exercise4,
  5: exercise5,
  6: exercise6,
}
