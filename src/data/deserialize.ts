import { UserData } from './types'

export function deserialize(raw: string): UserData | null {
  // todo: some basic type checking
  return JSON.parse(raw)
}
