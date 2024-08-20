import { Exercise } from '@/data/types'
import { getGcd } from '@/helper/get-gcd'
import { buildFrac } from '@/helper/math-builder'
import clsx from 'clsx'

interface DATA {
  colored: boolean[]
}

export const exercise2: Exercise<DATA> = {
  title: 'Bruchteil ermitteln - Kreis',
  useCalculator: false,
  duration: 1,
  generator(rng) {
    const count = rng.randomIntBetween(1, 5)
    const colored: boolean[] = []
    for (let i = 0; i < 6; i++) {
      colored.push(i < count)
    }
    return { colored: rng.shuffleArray(colored) }
  },
  task({ data }) {
    return (
      <>
        <p>
          Bestimme den Bruchteil der gefärbten und weißen Fläche. Kürze dein
          Ergebnis so weit wie möglich.
        </p>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="w-[200px] fill-none stroke-current"
          viewBox="0 0 110 110"
        >
          {renderFills()}
          <circle cx="55" cy="55" r="50" strokeWidth="2" stroke="black" />
          <line x1="5" y1="55" x2="105" y2="55" stroke="black"></line>
          <line x1="80" y1="98" x2="30" y2="12" stroke="black"></line>
          <line x1="80" y1="12" x2="30" y2="98" stroke="black"></line>
        </svg>
      </>
    )
    function renderFills() {
      const els: JSX.Element[] = []
      for (let i = 0; i < 6; i++) {
        if (data.colored[i]) {
          els.push(
            <path
              key={i}
              className="fill-blue-300"
              stroke="transparent"
              d={getSectorPath(55, 55, 109, i * 60, i * 60 + 60)}
            />
          )
        }
      }
      return <>{els}</>
    }
  },
  solution({ data }) {
    const colored = data.colored.filter((x) => x).length
    const gcd = getGcd(colored, 6)
    return (
      <>
        <p>
          Anteil gefärbt: {buildFrac(colored, 6)}
          {gcd > 1 && <> = {buildFrac(colored / gcd, 6 / gcd)}</>}
        </p>
        <p>
          Anteil weiß: {buildFrac(6 - colored, 6)}
          {gcd > 1 && <> = {buildFrac((6 - colored) / gcd, 6 / gcd)}</>}
        </p>
        <p>
          Schreibe die gesuchten Zahl der Kreisteile ({colored} und{' '}
          {6 - colored}) in den Zähler und die Gesamtzahl der Kreisteile (6) in
          den Nenner.
        </p>
      </>
    )
  },
}

function getSectorPath(
  x: number,
  y: number,
  outerDiameter: number,
  a1: number,
  a2: number
) {
  const degtorad = Math.PI / 180
  const halfOuterDiameter = outerDiameter / 2
  const cr = halfOuterDiameter - 5
  const cx1 = Math.cos(degtorad * a2) * cr + x
  const cy1 = -Math.sin(degtorad * a2) * cr + y
  const cx2 = Math.cos(degtorad * a1) * cr + x
  const cy2 = -Math.sin(degtorad * a1) * cr + y

  return (
    'M' +
    x +
    ' ' +
    y +
    ' ' +
    cx1 +
    ' ' +
    cy1 +
    ' A' +
    cr +
    ' ' +
    cr +
    ' 0 0 1 ' +
    cx2 +
    ' ' +
    cy2 +
    'Z'
  )
}
