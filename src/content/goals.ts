import { GoalData } from '@/data/types'
import { exercisesData } from './exercises'

export const goalsData: { [key: number]: GoalData } = {
  /*1: {
    name: 'Test: Fit für die 7. Klasse Realschule Bayern',
    description: 'Testlauf zum Setup der Lernumgebung',
    exercises: Object.keys(exercisesData)
      .map((x) => parseInt(x))
      .filter((x) => x < 50), // temporary
    index: 2,
  },*/
  2: {
    name: 'Grundwissenstest 7. Klasse (Realschule Bayern)',
    description: 'Grundlagen der 5. und 6. Klasse',
    exercises: [
      51, 55, 56, 57, 58, 59, 60, 61, 63, 64, 65, 66, 67, 68, 69, 70, 71, 72,
      73,
    ],
    index: 1,
  },
  3: {
    name: 'Grundwissenstest 9. Klasse Zweig I (Realschule Bayern)',
    description: 'Grundlagen der 5. - 8. Klasse',
    exercises: Object.keys(exercisesData)
      .map((x) => parseInt(x))
      .filter((x) => x > 80),
    index: 2,
  },
  /*99: {
    name: 'Gesamter Katalog',
    description: 'Übe alle verfügbaren Aufgaben',
    exercises: Object.keys(exercisesData).map((x) => parseInt(x)),
  },*/
}
