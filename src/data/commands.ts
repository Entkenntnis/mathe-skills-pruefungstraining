import { App } from './types'
import { generateSeed } from '@/data/generate-seed'
import { goalsData } from '@/content/goals'
import { flow } from './flow'
import { triggerUpload } from './user-commands'

export function selectGoal(app: App, goal: number) {
  if (app.state.userData) {
    app.mut((state) => {
      state.userData!.goal = goal
      state.userData!.history.push([
        'G',
        goal,
        Math.floor(new Date().getTime() / 1000),
      ])
    })
    populateDashboard(app)
    triggerUpload(app)
  }
}

export function showExercise(
  app: App,
  id: number,
  seed: string,
  dashboardIndex: number
) {
  app.mut((state) => {
    state.showExercise = { id, seed, dashboardIndex }
  })
}

export function populateDashboard(app: App) {
  flow(app)
}

export function restartExercise(app: App) {
  const newSeed = generateSeed()
  app.mut((state) => {
    if (state.showExercise!.dashboardIndex >= 0) {
      state.userData!.dashboard[state.showExercise!.dashboardIndex].seed =
        newSeed
    }
  })
  showExercise(
    app,
    app.state.showExercise!.id,
    newSeed,
    app.state.showExercise!.dashboardIndex
  )
}

export function finishExercise(app: App, status: number, duration: number) {
  app.mut((state) => {
    state.userData!.history.push([
      'E',
      app.state.showExercise!.id,
      Math.floor(new Date().getTime() / 1000),
      app.state.showExercise!.seed,
      status as 1 | 2,
      Math.floor(duration / 1000),
    ])
  })
}

export function calculateProgress(app: App) {
  const goalExercises = goalsData[app.state.userData?.goal!].exercises
  const solved = new Set<number>()
  app.state.userData!.history.forEach((entry) => {
    if (entry[0] == 'E') {
      if (entry[4] == 1) {
        solved.add(entry[1])
      }
    }
  })
  const count = goalExercises.filter((id) => solved.has(id)).length
  return count / goalExercises.length
}
