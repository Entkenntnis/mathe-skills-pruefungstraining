import { GoalData } from '@/data/types'
import { exercisesData } from './exercises'

export const goalsData: { [key: number]: GoalData } = {
  1: {
    name: 'Fit für die 7. Klasse Realschule Bayern',
    description: 'Wiederholung der Grundlagen aus der 5. und 6. Klasse',
    exercises: Object.keys(exercisesData).map((x) => parseInt(x)), // temporary
    index: 2,
  },
  2: {
    name: 'ZP MSA NRW',
    description:
      'Alt-Prüfungen der letzten drei Jahre (2021-2023) in dynamischen Varianten',
    exercises: [],
    draft: true,
    index: 1,
  },
  /*99: {
    name: 'Gesamter Katalog',
    description: 'Übe alle verfügbaren Aufgaben',
    exercises: Object.keys(exercisesData).map((x) => parseInt(x)),
  },*/
}
