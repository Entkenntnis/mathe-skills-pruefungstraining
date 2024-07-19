import { Draft } from 'immer'

export interface AppState {
  userData: UserData | null
  token: string | null
}

export interface App {
  state: AppState
  mut(fn: (draft: Draft<AppState>) => void): void
  afterPush(target: string, handler: () => void): void
}

export interface UserData {
  name: string
}
