import { Rng } from '@/helper/rng'
import { Draft } from 'immer'
import { Uploader } from './uploader'

export interface AppState {
  userData: UserData | null
  history: HistoryEntry[]
  token: string | null
  showExercise: null | { id: number; seed: string; dashboardIndex: number }
  paperHintShown: boolean
  tab: 'tutor' | 'list'
}

export interface App {
  state: AppState
  mut(fn: (draft: Draft<AppState>) => void): void
  afterPush(target: string, handler: () => void): void
  uploader: Uploader
  rerender: () => void
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
  dashboard: { id: number; seed: string }[]
  settings: { listLength: number }
  level: number
}

export interface GoalData {
  name: string
  description: string
  exercises: number[]
  draft?: boolean
  index: number
}

export interface Exercise<T = unknown> {
  title: string
  useCalculator: boolean
  duration: number
  generator: (rng: Rng) => T
  constraint?: (props: { data: T; rng: Rng }) => boolean
  task: (props: { data: T }) => JSX.Element
  solution: (props: { data: T }) => JSX.Element
  subtasks?: {
    tasks: ((props: { data: T }) => JSX.Element)[]
    solutions: ((props: { data: T }) => JSX.Element)[]
  }
}

export interface ProgressData {
  p: number
  new: number
  practice: number
  levels: {
    level: number
    n: number
  }[]
}
