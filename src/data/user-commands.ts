import { makePost } from '@/helper/make-post'
import { deserialize } from './deserialize'
import { App } from './types'

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
