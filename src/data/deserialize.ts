import { UserData } from './types'

export function deserialize(raw: string): UserData | null {
  // todo: some basic type checking
  const obj = JSON.parse(raw)
  return obj
}
