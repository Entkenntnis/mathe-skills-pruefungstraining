import { App } from './types'

export function register(app: App, name: string) {
  app.mut((state) => {
    state.userData = { name }
  })
}
