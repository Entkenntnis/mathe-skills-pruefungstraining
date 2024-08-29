import { Exercise } from '@/data/types'
import { buildOverline } from '@/helper/math-builder'
import { renderCross } from '@/helper/svg-builder'

interface DATA {
  mode: string
}

export const exercise111: Exercise<DATA> = {
  title: '2023 / 11) Geometrischen Ort bestimmen',
  useCalculator: false,
  duration: 1,
  generator(rng) {
    return {
      mode: rng.randomItemFromArray([
        'wh',
        'k_A_C',
        'k_A_B',
        'ms_A_B',
        'ms_A_C',
      ]),
    }
  },
  constraint({ data }) {
    return true
  },
  task({ data }) {
    return (
      <>
        {data.mode == 'wh' && (
          <p>
            Kennzeichne die Menge aller Punkte, die von den Halbgeraden [AB und
            [AC den gleichen Abstand haben
          </p>
        )}
        {data.mode == 'k_A_C' && (
          <p>
            Kennzeichne die Menge aller Punkte, die vom Punkt A den gleichen
            Abstand haben wie C.
          </p>
        )}
        {data.mode == 'k_A_B' && (
          <p>
            Kennzeichne die Menge aller Punkte, die vom Punkt A den gleichen
            Abstand haben wie B.
          </p>
        )}
        {data.mode == 'ms_A_B' && (
          <p>
            Kennzeichne die Menge aller Punkte, die von den Punkten A und B den
            gleichen Abstand haben.
          </p>
        )}
        {data.mode == 'ms_A_C' && (
          <p>
            Kennzeichne die Menge aller Punkte, die von den Punkten A und C den
            gleichen Abstand haben.
          </p>
        )}
        <img src="/content/111.png" alt="Skizze" />
      </>
    )
  },
  solution({ data }) {
    function svg(other: JSX.Element) {
      return (
        <svg viewBox="0 0 277 100" className="svg-defaults max-w-[277px]">
          <image href="/content/111.png" width={277} height={100} />
          {other}
        </svg>
      )
    }
    return (
      <>
        {data.mode == 'wh' && (
          <>
            <p>
              Zeichne die Winkelhalbierende w<sup>α</sup>:
            </p>
            {svg(
              <line
                x1={270}
                y1={34}
                x2={28}
                y2={59}
                stroke="blue"
                strokeWidth={2}
              />
            )}
          </>
        )}
        {(data.mode == 'k_A_C' || data.mode == 'k_A_B') && (
          <>
            <p>
              Zeichne einen Kreis um A mit Radius |
              {buildOverline(data.mode == 'k_A_C' ? 'AC' : 'AB')}|:
            </p>
            {svg(
              <>
                <circle
                  r={data.mode == 'k_A_C' ? 117 : 193}
                  cx={28}
                  cy={59}
                  stroke="blue"
                  strokeWidth={2}
                  fill="none"
                />
                {renderCross(28, 59, 'blue')}
              </>
            )}
          </>
        )}
        {data.mode == 'ms_A_B' && (
          <>
            <p>Zeichne die Mittelsenkrechte zu [AB]:</p>
            {svg(
              <line
                x1={118}
                y1={99}
                x2={135}
                y2={0}
                stroke="blue"
                strokeWidth={2}
              />
            )}
          </>
        )}
        {data.mode == 'ms_A_C' && (
          <>
            <p>Zeichne die Mittelsenkrechte zu [AC]:</p>
            {svg(
              <>
                <line
                  x1={65}
                  y1={0}
                  x2={105}
                  y2={99}
                  stroke="blue"
                  strokeWidth={2}
                />
              </>
            )}
          </>
        )}
      </>
    )
  },
}
