import { UserData } from './types'

export function buildInitialUserData(name: string): UserData {
  return {
    name,
    goal: null,
    dashboard: [],
    settings: { listLength: 4 },
    level: {},
  }
}
