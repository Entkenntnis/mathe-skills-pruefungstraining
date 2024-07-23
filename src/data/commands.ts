import { makePost } from '@/helper/make-post'
import { App } from './types'
import { deserialize } from './deserialize'
import { generateSeed } from '@/data/generate-seed'
import { Rng } from '@/helper/rng'
import { exercisesData } from '@/content/exercises'
import { goalsData } from '@/content/goals'
import { flow } from './flow'

export function login(app: App, token: string, raw: string) {
  app.mut((state) => {
    const userData = deserialize(raw)
    if (userData) {
      state.userData = userData
      state.token = token
      state.uploading = false
    } else {
      state.userData = null
      state.token = null
    }
  })
}

export function logout(app: App) {
  app.mut((state) => {
    state.userData = null
    state.token = null
  })
}

export async function triggerUpload(app: App) {
  app.mut((state) => {
    state.uploading = true
  })
  const res = await makePost('/store', {
    data: JSON.stringify(app.state.userData),
    token: app.state.token,
  })
  if (res.ok) {
    app.mut((state) => {
      state.uploading = false
    })
  }
}

export async function loadData(app: App) {
  const res = await makePost('/load', {
    token: app.state.token,
  })
  if (res.ok) {
    login(app, app.state.token!, res.data)
  }
}

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
