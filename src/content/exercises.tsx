import { Exercise } from '@/data/types'
import { exercise1 } from './implementations/1-bruchteil-ermitteln-rechteck'
import { exercise2 } from './implementations/2-bruchteil-ermitteln-kreis'
import { exercise3 } from './implementations/3-bruchschreibweisen-gemischte-zahl'
import { exercise4 } from './implementations/4-bruchschreibweisen-unechter-bruch'
import { exercise5 } from './implementations/5-bruch-erweitern-auf-nenner'
import { exercise6 } from './implementations/6-bruch-kuerzen'
import { exercise7 } from './implementations/7-bruchschreibweisen-aus-dezimalzahl'
import { exercise8 } from './implementations/8-bruchschreibweisen-dezimalzahl'
import { exercise9 } from './implementations/9-bruchteil-faerben'
import { exercise10 } from './implementations/10-einheiten-umrechnen'

export const exercisesData: { [key: number]: Exercise<any> } = {
  1: exercise1,
  2: exercise2,
  3: exercise3,
  4: exercise4,
  5: exercise5,
  6: exercise6,
  7: exercise7,
  8: exercise8,
  9: exercise9,
  10: exercise10,
}
