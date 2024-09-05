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
    name: 'Fit für 7, Realschule Bayern',
    description: 'Grundwissenstest über die Inhalte der 5. und 6. Klasse',
    exercises: [
      51, 55, 56, 57, 58, 59, 60, 61, 63, 64, 65, 66, 67, 68, 69, 70, 71, 72,
      73,
    ],
    index: 10,
  },
  3: {
    name: 'Fit für 9, Zweig I, Realschule Bayern',
    description: 'Grundwissenstest über die Inhalte der 5. - 8. Klasse',
    exercises: [
      81, 82, 83, 84, 85, 86, 87, 88, 89, 90, 91, 92, 93, 94, 95, 96, 97, 98,
      99, 100,
    ],
    index: 8,
  },
  4: {
    name: 'Fit für 9, Zweig II/III, Realschule Bayern',
    description: 'Grundwissenstest über die Inhalte der 5. - 8. Klasse',
    exercises: [
      101, 102, 103, 104, 105, 106, 87, 88, 89, 90, 111, 112, 113, 114, 115,
      116, 117, 118, 119, 120, 121,
    ].filter((id) => exercisesData[id]),
    index: 9,
  },
  5: {
    name: 'NRW MSA (Test)',
    description: 'Testlauf für NRW',
    exercises: Object.keys(exercisesData)
      .map((x) => parseInt(x))
      .filter((x) => x > 200), // temporary
    index: 99,
  },
  /*99: {
    name: 'Gesamter Katalog',
    description: 'Übe alle verfügbaren Aufgaben',
    exercises: Object.keys(exercisesData).map((x) => parseInt(x)),
  },*/
}
