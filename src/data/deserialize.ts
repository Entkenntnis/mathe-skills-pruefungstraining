import { UserData } from './types'

export function deserialize(raw: string): UserData | null {
  const obj = JSON.parse(raw)
  return obj
}
