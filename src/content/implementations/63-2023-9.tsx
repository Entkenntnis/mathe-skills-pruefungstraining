import { Exercise } from '@/data/types'
import { constrainedGeneration } from '@/helper/constrained-generation'

interface DATA {
  a: number
  b: number
}

export const exercise63: Exercise<DATA> = {
  title: '2023 / 9',
  useCalculator: false,
  duration: 2,
  generator(rng) {
    return constrainedGeneration(
      () => {
        return {
          a: rng.randomIntBetween(10, 15) * 5,
          b: rng.randomIntBetween(20, 30) * 5,
        }
      },
      (data) => data.a + data.b - 180 > 10
    )
  },
  task({ data }) {
    return (
      <>
        <p>Drei Geraden schneiden sich in einem Punkt.</p>
        <div className="my-3 relative">
          <img src="/content/63.png" alt="Aufgabenstellung" />
          <div className="absolute" style={{ left: 80, top: 11 }}>
            <p>{data.b}°</p>
          </div>
          <div className="absolute" style={{ left: 140, top: 45 }}>
            <p>{data.a}°</p>
          </div>
        </div>
        <p>Gib das Winkelmaß α an.</p>
      </>
    )
  },
  solution({ data }) {
    return (
      <>
        <p>
          Berechne zuerst den Nebenwinkel (grün-schraffiert) von {data.a}° und
          anschließend den Scheitelwinkel von α (blau):
        </p>
        <img src="/content/63_sol.png" alt="Lösungshinweis" />
        <p>
          180° - {data.a}° ={' '}
          <span className="text-lime-500">{180 - data.a}°</span>
          <br />α = {data.b}° -{' '}
          <span className="text-lime-500">{180 - data.a}°</span> ={' '}
          <strong className="text-blue-600">{data.a + data.b - 180}°</strong>
        </p>
      </>
    )
  },
}
