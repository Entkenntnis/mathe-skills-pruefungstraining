import { Exercise } from '@/data/types'
import { pp } from '@/helper/pretty-print'

interface DATA {
  brett: number
  hobel: number
}

export const exercise57: Exercise<DATA> = {
  title: '2023 / 4 (Messen)',
  useCalculator: false,
  duration: 1,
  generator(rng) {
    return {
      brett: rng.randomIntBetween(40, 80) / 10,
      hobel: rng.randomIntBetween(3, 9),
    }
  },
  constraint({ data }) {
    const r = data.brett - data.hobel / 10
    return (
      pp(data.brett).length > 1 &&
      pp(r).length > 1 &&
      Math.floor(data.brett) != Math.floor(r)
    )
  },
  task({ data }) {
    return (
      <>
        <p>
          Von einem {pp(data.brett)} cm dicken Holzbrett werden mit einer
          Hobelmaschine {data.hobel} mm abgehobelt.
        </p>
        <p>Gib an, wie dick das Brett danach ist.</p>
      </>
    )
  },
  solution({ data }) {
    const r = data.brett - data.hobel / 10
    return (
      <>
        <p>Wandle um in die gleiche Einheit:</p>
        <p>
          {data.hobel} mm = {pp(data.hobel / 10)} cm
        </p>
        <p>Ziehe ab:</p>
        <p>
          {pp(data.brett)} cm - {pp(data.hobel / 10)} cm = {pp(r)} cm
        </p>
        <p>
          Das Brett ist danach <strong>{pp(r)} cm</strong> dick.
          <br />
          <small>(auch richtig: {pp(r * 10)} mm)</small>
        </p>
      </>
    )
  },
}
