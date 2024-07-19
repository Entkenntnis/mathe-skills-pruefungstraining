import { makePost } from '@/helper/make-post'
import { App } from './types'
import { deserialize } from './deserialize'

export function login(app: App, token: string, raw: string) {
  app.mut((state) => {
    const userData = deserialize(raw)
    if (userData) {
      state.userData = userData
      state.token = token
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

export function triggerUpload(app: App) {
  makePost('/store', {
    data: JSON.stringify(app.state.userData),
    token: app.state.token,
  })
}

export async function loadData(app: App) {
  const res = await makePost('/load', {
    token: app.state.token,
  })
  if (res.ok) {
    login(app, app.state.token!, res.data)
  }
}
