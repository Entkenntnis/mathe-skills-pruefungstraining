import { goalsData } from '@/content/goals'
import { App, ProgressData } from './types'
import { buildHistoryStats } from './build-history-stats'

export function dashboardProgress(app: App): ProgressData {
  const historyStats = buildHistoryStats(app)

  const ids = goalsData[app.state.userData!.goal!].exercises

  let newExercises = 0
  let practice = 0
  const levels = Array.from({ length: app.state.userData!.level }, (_, i) => ({
    n: 0,
    level: i + 1,
  }))

  for (const id of ids) {
    if (!historyStats[id]) {
      newExercises++
      continue
    }
    if (historyStats[id].practice) {
      practice++
    } else {
      if (historyStats[id].solvedCount == 0) {
        newExercises++
      }
    }
    if (historyStats[id].solvedCount > 0) {
      const levelIndex = Math.min(
        levels.length - 1,
        historyStats[id].solvedCount - 1
      )
      for (let i = 0; i <= levelIndex; i++) {
        levels[i].n++
      }
    }
  }

  let sum = 0
  let ns = 0

  levels.forEach((l) => {
    sum += ids.length
    ns += l.n
  })

  return {
    levels,
    new: newExercises,
    practice,
    p: Math.round((ns / sum) * 100),
  }
}
