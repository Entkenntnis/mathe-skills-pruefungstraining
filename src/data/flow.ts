import { goalsData } from '@/content/goals'
import { App } from './types'
import { generateSeed } from './generate-seed'
import { exercisesData } from '@/content/exercises'
import { buildHistoryStats } from './build-history-stats'
import { constrainedGeneration } from '@/helper/constrained-generation'

export function flow(app: App) {
  const historyStats = buildHistoryStats(app)

  // calculate dashboard entries
  const { listLength } = app.state.userData!.settings
  const goal = app.state.userData!.goal!

  const goalData = goalsData[goal]

  const num = listLength == -1 ? goalData.exercises.length : listLength

  const result: { id: number; score: number }[] = []
  for (const exercise of goalData.exercises) {
    const currentLevel = historyStats[exercise]
      ? historyStats[exercise].solvedCount
      : 0

    const targetLevel = app.state.userData!.level

    let score = Math.random() * 20 // jitter

    // status value
    if (historyStats[exercise]?.practice) {
      score += 150
    }

    const diff = targetLevel - currentLevel
    score += diff * 80

    if (currentLevel < targetLevel) {
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
    for (let i = 0; i < num && i < result.length; i++) {
      const id = result[i].id
      newDashboard.push({
        id,
        seed: constrainedGeneration<string>(
          () => generateSeed(),
          (seed) => !historyStats[id] || !historyStats[id].seeds.includes(seed)
        ),
      })
    }
    state.userData!.dashboard = newDashboard
  })
}
