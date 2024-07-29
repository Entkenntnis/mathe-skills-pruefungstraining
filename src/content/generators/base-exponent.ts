import { Rng } from '@/helper/rng'

export function baseExponent(rng: Rng) {
  let base = rng.randomIntBetween(2, 10)
  let exponent = rng.randomIntBetween(2, 6)
  if (base !== 10) {
    while (Math.pow(base, exponent) > 100) {
      exponent--
    }
  }
  return { base, exponent }
}
