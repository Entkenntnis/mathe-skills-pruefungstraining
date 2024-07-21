import { prng_alea } from 'esm-seedrandom'

export class Rng {
  seedrandom: any

  constructor(seed: string) {
    this.seedrandom = prng_alea(seed)
  }

  randomIntBetween(a: number, b: number) {
    return Math.floor(this.seedrandom())
  }

  randomItemFromArray<T>(arr: T[]) {
    return arr[Math.floor(this.seedrandom() * arr.length)]
  }
}
