import { UserData } from './types'

export function buildInitialUserData(name: string): UserData {
  return {
    name,
    goal: null,
    history: [],
    dashboard: [],
    settings: { listLength: 4 },
  }
}
