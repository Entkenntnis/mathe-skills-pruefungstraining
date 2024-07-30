import { GoalData } from '@/data/types'
import { exercisesData } from './exercises'

export const goalsData: { [key: number]: GoalData } = {
  1: {
    name: 'Test: Fit für die 7. Klasse Realschule Bayern',
    description: 'Testlauf zum Setup der Lernumgebung',
    exercises: Object.keys(exercisesData).map((x) => parseInt(x)), // temporary
    index: 2,
  },
  2: {
    name: 'Grundwissenstest 7. Klasse Realschule Bayern',
    description: 'Unverzichtbare Grundlagen aus der 5. und 6. Klasse',
    exercises: Object.keys(exercisesData)
      .map((x) => parseInt(x))
      .filter((x) => x > 50),
    index: 1,
  },
  /*99: {
    name: 'Gesamter Katalog',
    description: 'Übe alle verfügbaren Aufgaben',
    exercises: Object.keys(exercisesData).map((x) => parseInt(x)),
  },*/
}
