import { Exercise } from '@/data/types'
import { buildOverline } from '@/helper/math-builder'

interface DATA {
  l: number
  h: number
  offset: number
  lettersL: string[]
  lettersR: string[]
}

export const exercise66: Exercise<DATA> = {
  title: '2023 / 12 (Raum und Form)',
  useCalculator: false,
  duration: 2,
  generator(rng) {
    const letters = rng.shuffleArray([
      'DEF',
      'LMN',
      'STU',
      'PQR',
      'GHI',
      'ABC',
      'XYZ',
    ])
    return {
      l: rng.randomIntBetween(2, 5),
      h: rng.randomIntBetween(3, 7),
      offset: rng.randomIntBetween(-2, 11),
      lettersL: letters[0].split(''),
      lettersR: letters[1].split(''),
    }
  },
  constraint({ data }) {
    return (
      data.offset !== data.l && data.offset !== data.l * 2 && data.offset !== 0
    )
  },
  task({ data }) {
    return (
      <>
        <p>
          Erkan hat das Dreieck {data.lettersL[0]}
          {data.lettersL[1]}
          {data.lettersL[2]} mit |
          {buildOverline(data.lettersL[0] + data.lettersL[1])}| = {data.l} cm
          gezeichnet. Stefan soll mit der bereits vorgegebenen Seite{' '}
          {data.lettersR[0]}
          {data.lettersR[1]} mit |
          {buildOverline(data.lettersR[0] + data.lettersR[1])}| = {data.l} cm
          ein Dreieck {data.lettersR[0]}
          {data.lettersR[1]}
          {data.lettersR[2]} zeichnen, so dass gilt:
        </p>
        <ul>
          <li>Beide Dreiecke haben den gleichen Flächeninhalt A.</li>
          <li>
            Stefans Dreieck ist gleichschenklig mit der Basis{' '}
            {buildOverline(data.lettersR[0] + data.lettersR[1])}.
          </li>
        </ul>
        <p>
          Zeichne die fehlenden Schenkel des Dreiecks {data.lettersR[0]}
          {data.lettersR[1]}
          {data.lettersR[2]} ein.
        </p>
        {renderSvg(data)}
      </>
    )
  },
  solution({ data }) {
    return (
      <>
        <p>
          Der Punkt {data.lettersR[2]} befindet sich auf der gleichen Höhe wie{' '}
          {data.lettersL[2]} und auf der Mittelsenkrechen von der Basis{' '}
          {buildOverline(data.lettersR[0] + data.lettersR[1])}
        </p>
        {renderSvg(data, true)}
      </>
    )
  },
}

function renderSvg(data: DATA, showResult?: boolean) {
  const p2x = 60 + 40 * data.l
  const p3x = 60 + 20 * data.offset
  const p3y = 180 - 20 * data.h
  const p4x = 340 + 40 * data.l

  const prx = 340 + 20 * data.l
  const pry = p3y
  return (
    <svg width="601" height="201" viewBox="0 0 601 201">
      <defs>
        <pattern id="grid" width="20" height="20" patternUnits="userSpaceOnUse">
          <path
            d="M 20 0 L 0 0 0 20"
            fill="none"
            stroke="black"
            strokeWidth="0.5"
          />
        </pattern>
      </defs>
      <rect width="100%" height="100%" fill="url(#grid)" />

      {/* Lines */}
      <line x1="60" y1="160" x2={p2x} y2="160" stroke="black" strokeWidth="2" />
      <line x1="60" y1="160" x2={p3x} y2={p3y} stroke="black" strokeWidth="2" />
      <line
        x1={p2x}
        y1="160"
        x2={p3x}
        y2={p3y}
        stroke="black"
        strokeWidth="2"
      />
      <line
        x1="340"
        y1="160"
        x2={p4x}
        y2="160"
        stroke="black"
        strokeWidth="2"
      />
      {showResult && (
        <line
          x1="340"
          y1="160"
          x2={prx}
          y2={pry}
          stroke="blue"
          strokeWidth="2"
        />
      )}
      {showResult && (
        <line
          x1={p4x}
          y1="160"
          x2={prx}
          y2={pry}
          stroke="blue"
          strokeWidth="2"
        />
      )}

      {/* Points */}
      <circle cx="60" cy="160" r="3" fill="black" />
      <circle cx={p2x} cy="160" r="3" fill="black" />
      <circle cx={p3x} cy={p3y} r="3" fill="black" />
      <circle cx="340" cy="160" r="3" fill="black" />
      <circle cx={p4x} cy="160" r="3" fill="black" />
      {showResult && <circle cx={prx} cy={pry} r="3" fill="blue" />}

      {/* Labels */}
      <text x="48" y="178" fontSize="16">
        {data.lettersL[0]}
      </text>
      <text x={p2x - 13} y="178" fontSize="16">
        {data.lettersL[1]}
      </text>
      <text x={p3x - 5} y={p3y - 6} fontSize="16">
        {data.lettersL[2]}
      </text>
      <text x="328" y="178" fontSize="16">
        {data.lettersR[0]}
      </text>
      <text x={p4x - 13} y={178} fontSize="16">
        {data.lettersR[1]}
      </text>
      {showResult && (
        <text x={prx - 5} y={pry - 6} fontSize="16" stroke="blue">
          {data.lettersR[2]}
        </text>
      )}
    </svg>
  )
}
