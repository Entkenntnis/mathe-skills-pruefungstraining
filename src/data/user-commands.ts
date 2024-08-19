import { deserialize } from './deserialize'
import { App, HistoryEntry } from './types'

export function login(
  app: App,
  token: string,
  raw: string,
  events: HistoryEntry[]
) {
  app.mut((state) => {
    const userData = deserialize(raw)
    if (userData) {
      state.userData = userData
      state.token = token
      state.history = events
    } else {
      state.history = []
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
