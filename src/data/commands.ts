import { makePost } from '@/helper/make-post'
import { App } from './types'
import { deserialize } from './deserialize'
import { generateSeed } from '@/data/generate-seed'

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
  app.mut((state) => {
    state.userData!.dashboard = []
    for (let i = 0; i < 2; i++) {
      state.userData!.dashboard.push({ id: i + 1, seed: generateSeed() })
    }
  })
}

export function restartExercise(app: App) {
  const newSeed = generateSeed()
  app.mut((state) => {
    state.userData!.dashboard[state.showExercise!.dashboardIndex].seed = newSeed
  })
  showExercise(
    app,
    app.state.showExercise!.id,
    newSeed,
    app.state.showExercise!.dashboardIndex
  )
}
