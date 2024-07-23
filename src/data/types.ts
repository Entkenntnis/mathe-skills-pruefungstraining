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

export type HistoryEntry =
  | [
      'E',
      id: number,
      ts: number,
      seed: string,
      result: 1 /* success*/ | 2 /* retry */,
      duration: number
    ]
  | ['G', id: number, ts: number]

export interface UserData {
  name: string
  goal: number | null
  history: HistoryEntry[]
  dashboard: { id: number; seed: string }[]
  settings: { listLength: number }
}

export interface GoalData {
  name: string
  description: string
  exercises: number[]
}

export interface Exercise<T = unknown> {
  title: string
  useCalculator: boolean
  duration: number
  generator: (rng: Rng) => T
  task: (props: { data: T }) => JSX.Element
  solution: (props: { data: T }) => JSX.Element
}
