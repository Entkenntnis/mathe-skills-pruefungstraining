import { Rng } from '@/helper/rng'
import { Draft } from 'immer'

export interface AppState {
  userData: UserData | null
  token: string | null
  uploading: boolean
  showExercise: null | { id: number; seed: string; dashboardIndex: number }
}

export interface App {
  state: AppState
  mut(fn: (draft: Draft<AppState>) => void): void
  afterPush(target: string, handler: () => void): void
}

export interface UserData {
  name: string
  goal: number | null
  history: [id: number, seed: string, ts: number, result: number][]
  dashboard: { id: number; seed: string }[]
}

export interface GoalData {
  name: string
  description: string
}

export interface Exercise<T = unknown> {
  title: string
  generator: (rng: Rng) => T
  task: (props: { data: T }) => JSX.Element
  solution: (props: { data: T }) => JSX.Element
}
