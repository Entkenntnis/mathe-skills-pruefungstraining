import { Exercise } from '@/data/types'
import { buildJSX } from '@/helper/math-builder'
import { rotatePoint } from '@/helper/rotate-point'

interface DATA {
  angle: number
  reverse: boolean
}

export const exercise60: Exercise<DATA> = {
  title: '2023 / 7) Winkel zeichnen',
  useCalculator: false,
  duration: 2,
  generator(rng) {
    return {
      angle: rng.randomIntBetween(8, 24) * 10,
      reverse: rng.randomItemFromArray([true, false]),
    }
  },
  task({ data }) {
    return (
      <>
        <p>
          Für das Maß α des Winkels {data.reverse ? 'RSQ' : 'QSR'} gilt: α ={' '}
          {data.angle}°.
        </p>
        {buildJSX(
          (b) => {
            const S = b.create('point', [0, 0], {
              face: 'cross',
              name: 'S',
              label: { offset: [10, 0] },
            })
            const Q = b.create('point', [2, 3], {
              face: 'cross',
              name: 'Q',
              label: { offset: [10, 0] },
            })
            b.create('line', [S, Q], { straightFirst: false })
          },
          { width: 200, height: 200 }
        )}
        <p>
          Ergänze den zweiten Schenkel des Winkels und kennzeichne diesen Winkel
          mit einem Bogen.
        </p>
      </>
    )
  },
  solution({ data }) {
    return (
      <>
        <p>
          Messe den Winkel mit dem Geodreieck{' '}
          {data.reverse ? 'im' : 'gegen den'} Uhrzeigersinn ab:
        </p>
        {buildJSX(
          (b) => {
            const S = b.create('point', [0, 0], {
              face: 'cross',
              name: 'S',
              label: {
                offset: [data.reverse ? -20 : 10, data.reverse ? 10 : 0],
              },
            })
            const Q = b.create('point', [2, 3], {
              face: 'cross',
              name: 'Q',
              label: { offset: [10, 0] },
            })
            const R = b.create(
              'point',
              rotatePoint(2, 3, data.reverse ? data.angle : -data.angle),
              {
                face: 'cross',
                name: 'R',
                label: {
                  offset: [
                    10,
                    (data.reverse ? data.angle > 210 : data.angle < 150)
                      ? 15
                      : 0,
                  ],
                },
              }
            )
            b.create('line', [S, Q], { straightFirst: false })
            b.create('line', [S, R], { straightFirst: false })
            b.create('Angle', data.reverse ? [R, S, Q] : [Q, S, R], {
              withLabel: false,
              orthoType: 'sector',
            })
          },
          { width: 200, height: 200 }
        )}
      </>
    )
  },
}
