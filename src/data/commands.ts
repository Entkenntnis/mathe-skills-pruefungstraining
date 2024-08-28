import { App } from './types'
import { generateSeed } from '@/data/generate-seed'
import { goalsData } from '@/content/goals'
import { flow } from './flow'

export function selectGoal(app: App, goal: number) {
  if (app.state.userData) {
    app.mut((state) => {
      state.userData!.goal = goal
      if (!state.userData!.level[goal]) {
        state.userData!.level[goal] = 1
      }
    })
    app.uploader.uploadUserData(app)
    populateDashboard(app)
    app.uploader.uploadUserData(app) // for dashboard
    app.uploader.uploadEvent(app, [
      'G',
      goal,
      Math.floor(new Date().getTime() / 1000),
    ])
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
  app.uploader.uploadEvent(app, [
    'E',
    app.state.showExercise!.id,
    Math.floor(new Date().getTime() / 1000),
    app.state.showExercise!.seed,
    status as 1 | 2,
    Math.floor(duration / 1000),
  ])
}

export function unlockNextLevel(app: App) {
  app.mut((state) => {
    state.userData!.level[state.userData!.goal!]++
  })
}

export function calculateProgress(app: App) {
  const goalExercises = goalsData[app.state.userData?.goal!].exercises
  const solved = new Set<number>()
  app.state.history.forEach((entry) => {
    if (entry[0] == 'E') {
      if (entry[4] == 1) {
        solved.add(entry[1])
      }
    }
  })
  const count = goalExercises.filter((id) => solved.has(id)).length
  return count / goalExercises.length
}
