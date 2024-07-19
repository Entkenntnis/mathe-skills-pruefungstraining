import { Draft } from 'immer'

export interface AppState {
  testRandomValue: number
  userData: { name: string } | null
}

export interface App {
  state: AppState
  mut: (fn: (draft: Draft<AppState>) => void) => void
}
