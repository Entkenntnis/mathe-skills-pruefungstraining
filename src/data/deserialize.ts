import { UserData } from './types'

export function deserialize(raw: string): UserData | null {
  // todo: some basic type checking
  const obj = JSON.parse(raw)
  if (!obj.settings) {
    obj.settings = { listLength: 4 }
  }
  if (!obj.level) {
    obj.level = 1
  }
  return obj
}
