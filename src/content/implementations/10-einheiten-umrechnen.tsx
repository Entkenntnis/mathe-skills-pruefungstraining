import { Exercise } from '@/data/types'
import { pp } from '@/helper/pretty-print'

interface DATA {
  a: number
  b: number
  c: number
  d: number
}

export const exercise10: Exercise<DATA> = {
  title: 'Einheiten umrechnen',
  useCalculator: false,
  duration: 2,
  generator(rng) {
    return {
      a: rng.randomIntBetween(1, 9) / 10,
      b: rng.randomIntBetween(1, 99) / 100,
      c: rng.randomIntBetween(1, 99) / 100,
      d: rng.randomIntBetween(1, 4) * 0.2,
    }
  },
  task({ data }) {
    return (
      <>
        <p>Gib in der nächst kleineren Einheit an.</p>
        <p>Beispiel: 0,6 t = 600 kg</p>
        <p className="text-lg">
          <span className="mr-12">{pp(data.a)} m</span>
          <span className="mr-12">{pp(data.b)} km</span>
          <span className="mr-12">{pp(data.c)} kg</span>
          <span className="mr-12">{pp(data.d)} h</span>
        </p>
      </>
    )
  },
  solution({ data }) {
    return (
      <>
        <p>
          {pp(data.a)} m = <strong>{Math.round(data.a * 10)} dm</strong>
        </p>
        <p>
          {pp(data.b)} km = <strong>{Math.round(data.b * 1000)} km</strong>
        </p>
        <p>
          {pp(data.c)} kg = <strong>{Math.round(data.c * 1000)} g</strong>
        </p>
        <p>
          {pp(data.d)} h = <strong>{Math.round(data.d * 60)} min</strong>
        </p>
      </>
    )
  },
}
