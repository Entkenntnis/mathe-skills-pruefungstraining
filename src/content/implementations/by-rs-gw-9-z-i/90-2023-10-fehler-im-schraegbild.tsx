import { Exercise } from '@/data/types'
import { buildInlineFrac, buildOverline } from '@/helper/math-builder'
import { pp } from '@/helper/pretty-print'

interface DATA {
  textAngle: number
  drawingAngle: number
  textQ: number
  drawingQ: number
  wrong: string
  textAxis: string
  drawingAxis: string
}

export const exercise90: Exercise<DATA> = {
  title: '2023 / 10) Fehler im Schrägbild',
  useCalculator: false,
  duration: 1,
  generator(rng) {
    const wrong = rng.randomItemFromArray(['axis', 'q', 'angle'])
    const angles = rng.shuffleArray([45, 60])
    let textAngle = angles[0],
      drawingAngle = angles[0]
    if (wrong == 'angle') {
      drawingAngle = angles[1]
    }
    const qs = rng.shuffleArray([0.5, 0.333])
    let textQ = qs[0],
      drawingQ = qs[0]
    if (wrong == 'q') {
      drawingQ = qs[1]
    }
    const axs = rng.shuffleArray(['AC', 'BD'])
    let textAxis = axs[0],
      drawingAxis = axs[0]
    if (wrong == 'axis') {
      drawingAxis = axs[1]
    }
    return {
      textAngle,
      drawingAngle,
      wrong,
      textQ,
      drawingQ,
      textAxis,
      drawingAxis,
    }
  },
  constraint({ data }) {
    return true
  },
  task({ data }) {
    let qx = 64,
      qy = 64
    if (data.drawingAngle == 60) {
      qx = 45
      qy = 78
    }
    if (data.drawingQ !== 0.5) {
      qx = (qx * 2) / 3
      qy = (qy * 2) / 3
    }

    const mx = 210,
      my = 210,
      ax = 30,
      ay = my,
      bx = mx - qx,
      by = my + qy,
      cx = 390,
      cy = 210,
      dx = mx + qx,
      dy = my - qy,
      sx = mx,
      sy = 30

    function line(x1: number, y1: number, x2: number, y2: number) {
      return (
        <line x1={x1} y1={y1} x2={x2} y2={y2} stroke="black" strokeWidth={2} />
      )
    }
    return (
      <>
        <p>
          Die Pyramide ABCDS hat eine quadratische Grundfläche ABCD mit |
          {buildOverline('AC')}| = 6&nbsp;cm und die Höhe |{buildOverline('MS')}
          | = 3 cm.
        </p>
        <p>
          Paul sollte ein Schrägbild dieser Pyramide nach folgenden Vorgaben
          zeichnen: Schrägbildachse {data.textAxis}; q ={' '}
          {data.textQ == 0.5 ? pp(0.5) : buildInlineFrac(1, 3)}; ω ={' '}
          {data.textAngle}°. Die Abbildung zeigt sein Ergebnis. Eine der
          Vorgaben hat er dabei nicht korrekt umgesetzt.
        </p>
        <svg viewBox="0 0 421 311" width={421} height={311}>
          {/* Grid */}
          <defs>
            <pattern
              id="grid"
              width="30"
              height="30"
              patternUnits="userSpaceOnUse"
            >
              <path
                d="M 30 0 L 0 0 0 30"
                fill="none"
                stroke="gray"
                strokeWidth="1"
                strokeDasharray={'4 4'}
              />
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#grid)" />

          {/* Pyramid Lines */}

          {line(ax, ay, cx, cy)}
          {line(bx, by, dx, dy)}
          {line(mx, my, sx, sy)}
          {line(sx, sy, ax, ay)}
          {line(sx, sy, bx, by)}
          {line(sx, sy, cx, cy)}
          {line(sx, sy, dx, dy)}
          {line(ax, ay, bx, by)}
          {line(ax, ay, dx, dy)}
          {line(cx, cy, bx, by)}
          {line(cx, cy, dx, dy)}
          <text x={ax - 16} y={ay} stroke="black">
            {data.drawingAxis == 'AC' ? 'A' : 'B'}
          </text>
          <text x={bx - 16} y={by + 15} stroke="black">
            {data.drawingAxis == 'AC' ? 'B' : 'C'}
          </text>
          <text x={cx + 2} y={cy + 15} stroke="black">
            {data.drawingAxis == 'AC' ? 'C' : 'D'}
          </text>
          <text x={dx + 2} y={dy - 5} stroke="black">
            {data.drawingAxis == 'AC' ? 'D' : 'A'}
          </text>
          <text x={sx + 2} y={sy - 5} stroke="black">
            S
          </text>
          <text x={mx + 2} y={my + 18} stroke="black">
            M
          </text>
          <text x={318} y={27}>
            |{data.drawingAxis == 'AC' ? 'BD' : 'AC'}| ={' '}
            {data.drawingQ == 0.5 ? 3 : 2} cm
          </text>
          <circle cx={mx - 8} cy={my - 8} r={3} fill="black" />
          <path
            d={`M ${mx},${my - 25} A 25,25 0 0 0 ${mx - 25} ${my}`}
            fill="none"
            stroke="black"
            stroke-width="2"
          />
        </svg>
        <p>Beschreibe den Fehler, den er bei der Zeichnung gemacht hat.</p>
      </>
    )
  },
  solution({ data }) {
    if (data.wrong == 'axis') {
      return (
        <p>Paul hat für seine Zeichnung die falsche Schrägbildachse gewählt.</p>
      )
    }
    if (data.wrong == 'q') {
      return (
        <p>
          Paul hat für seine Zeichnung einen Verzerrungsmaßstab mit dem falschen
          Maß verwendet.
        </p>
      )
    }
    return (
      <>
        <p>
          Paul hat für seine Zeichnung einen Verzerrungswinkel mit dem falschen
          Maß verwendet.
        </p>
      </>
    )
  },
}
