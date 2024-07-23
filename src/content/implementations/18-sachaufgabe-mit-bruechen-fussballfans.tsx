import { Exercise } from '@/data/types'
import { getGcd } from '@/helper/get-gcd'
import { buildFrac } from '@/helper/math-builder'

interface DATA {
  z1: number
  n1: number
  z2: number
  n2: number
  r: number
}

export const exercise18: Exercise<DATA> = {
  title: 'Sachaufgabe mit Brüchen - Fußballfans',
  useCalculator: false,
  duration: 5,
  generator(rng) {
    const [[z1, n1], [z2, n2]] = rng.shuffleArray([
      [1, 2],
      [2, 3],
      [3, 4],
      [4, 5],
    ])
    const r = rng.randomIntBetween(3, 9) * 1000
    return { z1, n1, z2, n2, r }
  },
  task({ data }) {
    return (
      <>
        <p>
          Das Fußball-Spiel lief nicht gut, viele Fans waren enttäuscht. In der
          ersten Halbzeit verließen bereits{' '}
          <span className="text-sm">{buildFrac(data.z1, data.n1)}</span> der
          Fans das Stadion,{' '}
          <span className="text-sm">{buildFrac(data.z2, data.n2)}</span> der
          Fans gingen nach weiteren 30 Minuten. Nur {data.r} Fans blieben bis
          zum Schluss. Wie viele Fans waren zu Beginn im Stadion?
        </p>
      </>
    )
  },
  solution({ data }) {
    return (
      <>
        <p>
          <span className="text-sm">{buildFrac(data.z1, data.n1)}</span> der
          Fans verließen das Stadion in der ersten Halbzeit,{' '}
          <span className="text-sm">
            {buildFrac(data.n1 - data.z1, data.n1)} ·{' '}
            {buildFrac(data.z2, data.n2)}
          </span>{' '}
          der Fans verließen das Stadion 30 Miuten später.
        </p>
        <p>Berechne den Gesamtanteil der Fans, die das Stadion verließen:</p>
        <p>
          {buildFrac(data.z1, data.n1)} +{' '}
          {buildFrac(data.n1 - data.z1, data.n1)} ·{' '}
          {buildFrac(data.z2, data.n2)} = {buildFrac(data.z1, data.n1)} +{' '}
          {buildFrac((data.n1 - data.z1) * data.z2, data.n1 * data.n2)} ={' '}
          {buildFrac(data.z1 * data.n2, data.n1 * data.n2)} +{' '}
          {buildFrac((data.n1 - data.z1) * data.z2, data.n1 * data.n2)} ={' '}
          {buildFrac(
            data.z1 * data.n2 + (data.n1 - data.z1) * data.z2,
            data.n1 * data.n2
          )}
        </p>
        <p>
          {data.r} entspricht{' '}
          <span className="text-sm">{buildFrac(1, data.n1 * data.n2)}</span>, zu
          Beginn waren daher {data.r} · {data.n1 * data.n2} ={' '}
          <strong>{data.r * data.n1 * data.n2}</strong> Fans im Stadion.
        </p>
      </>
    )
  },
}
