import { makePost } from '@/helper/make-post'
import { App, UserData } from './types'

export function login(app: App, token: string, data: UserData) {
  app.mut((state) => {
    state.userData = data
    state.token = token
  })
}

export function logout(app: App) {
  app.mut((state) => {
    state.userData = null
    state.token = null
  })
}

export function testChange(app: App) {
  app.mut((state) => {
    if (state.userData) {
      state.userData.testRandomValue = Math.random()
    }
  })
  triggerUpload(app)
}

export function triggerUpload(app: App) {
  makePost('/store', {
    data: JSON.stringify(app.state.userData),
    token: app.state.token,
  })
}

export async function loadData(app: App) {
  const res = await makePost('/load', {
    data: JSON.stringify(app.state.userData),
    token: app.state.token,
  })
  if (res.ok) {
    app.mut((state) => {
      state.userData = JSON.parse(res.data)
    })
  }
}
