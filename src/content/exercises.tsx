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
import { exercise11 } from './implementations/11-brueche-addieren-und-subtrahieren-gleichnamig'
import { exercise12 } from './implementations/12-brueche-addieren-und-subtrahieren'
import { exercise13 } from './implementations/13-brueche-addieren-und-subtrahieren-negative-zahlen'
import { exercise14 } from './implementations/14-brueche-addieren-und-subtrahieren-laengerer-term'
import { exercise15 } from './implementations/15-brueche-multiplizieren und dividieren'
import { exercise16 } from './implementations/16-brueche-multiplizieren und dividieren-negative-zahlen'
import { exercise17 } from './implementations/17-bruchterme-punkt-vor-strich'
import { exercise18 } from './implementations/18-sachaufgabe-mit-bruechen-fussballfans'
import { exercise19 } from './implementations/19-dezimalzahlen-addieren-und-subtrahieren'
import { exercise20 } from './implementations/20-dezimalzahlen-multiplizieren-im-kopf'
import { exercise23 } from './implementations/23-rechnen-mit-zehnerpotenzen'
import { exercise21 } from './implementations/21-dezimalzahlen-multiplizieren-schriftlich'
import { exercise22 } from './implementations/22-dezimalzahlen-dividieren-schriftlich'

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
  11: exercise11,
  12: exercise12,
  13: exercise13,
  14: exercise14,
  15: exercise15,
  16: exercise16,
  17: exercise17,
  18: exercise18,
  19: exercise19,
  20: exercise20,
  21: exercise21,
  22: exercise22,
  23: exercise23,
}
