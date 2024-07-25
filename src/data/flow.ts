import { goalsData } from '@/content/goals'
import { App } from './types'
import { generateSeed } from './generate-seed'
import { Rng } from '@/helper/rng'
import { exercisesData } from '@/content/exercises'

export function flow(app: App) {
  // calculate dashboard entries
  const { listLength } = app.state.userData!.settings
  const goal = app.state.userData!.goal!

  const goalData = goalsData[goal]

  const num = listLength == -1 ? goalData.exercises.length : listLength

  const ids = new Set<number>()
  const toPractice = new Set<number>()

  app.state.userData!.history.forEach((entry) => {
    if (entry[0] == 'E') {
      if (entry[4] == 1) {
        ids.add(entry[1])
        toPractice.delete(entry[1])
      } else if (entry[4] == 2) {
        toPractice.add(entry[1])
      }
    }
  })

  const result: { id: number; score: number }[] = []
  for (const exercise of goalData.exercises) {
    let score = Math.random() * 20 // jitter

    // status value
    if (!ids.has(exercise)) {
      score += 100
    } else if (toPractice.has(exercise)) {
      score += 150
    }

    if (!ids.has(exercise)) {
      // bonus for short exercises
      const duration = exercisesData[exercise].duration
      if (duration <= 1) {
        score += 30
      } else if (duration <= 2) {
        score += 20
      } else if (duration <= 4) {
        score += 10
      }

      // bonus for order
      const position = goalData.exercises.indexOf(exercise)
      score +=
        15 *
        ((goalData.exercises.length - position) / goalData.exercises.length)
    }

    result.push({ id: exercise, score })
  }

  result.sort((a, b) => b.score - a.score)

  app.mut((state) => {
    const newDashboard = []
    for (let i = 0; i < num; i++) {
      newDashboard.push({ id: result[i].id, seed: generateSeed() })
    }
    state.userData!.dashboard = newDashboard
  })
}
