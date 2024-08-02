import { App } from './types'

export function buildHistoryStats(app: App) {
  const historyStats: {
    [id: number]: { practice: boolean; solvedCount: number; seeds: string[] }
  } = {}

  for (const entry of app.state.userData!.history) {
    if (entry[0] == 'G') continue
    const id = entry[1]
    if (!historyStats[id]) {
      historyStats[id] = {
        practice: false,
        solvedCount: 0,
        seeds: [],
      }
    }
    const s = historyStats[id]
    const result = entry[4]
    if (result == 1 /* success */) {
      s.practice = false
      s.solvedCount++
    } else {
      // retry
      s.practice = true
    }
    s.seeds.push(entry[3])
  }

  return historyStats
}
