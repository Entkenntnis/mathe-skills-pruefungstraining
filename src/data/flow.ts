import { goalsData } from '@/content/goals'
import { App } from './types'
import { generateSeed } from './generate-seed'
import { Rng } from '@/helper/rng'

export function flow(app: App) {
  // calculate dashboard entries
  const { listLength } = app.state.userData!.settings
  const goal = app.state.userData!.goal!

  const goalData = goalsData[goal]

  const num = listLength == -1 ? goalData.exercises.length : listLength

  // TEMP TEMP TEMP
  app.mut((state) => {
    const newDashboard = []
    for (let i = 0; i < num; i++) {
      newDashboard.push({ id: i + 1, seed: generateSeed() })
    }
    state.userData!.dashboard = new Rng(Math.random().toString()).shuffleArray(
      newDashboard
    )
  })
  // TEMP TEMP TEMP
}
