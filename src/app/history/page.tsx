'use client'

import { useApp } from '@/components/App'
import { Guard } from '@/components/Guard'
import { exercisesData } from '@/content/exercises'
import { goalsData } from '@/content/goals'
import { showExercise } from '@/data/commands'
import { generateData } from '@/data/generate-data'
import { generateSeed } from '@/data/generate-seed'
import { renderExample } from '@/data/render-example'
import { HistoryEntry } from '@/data/types'
import { constrainedGeneration } from '@/helper/constrained-generation'
import { proseWrapper } from '@/helper/prose-wrapper'
import { Rng } from '@/helper/rng'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { useState } from 'react'

export default function Page() {
  const app = useApp()
  const router = useRouter()
  const [showExerciseModal, setShowExercise] = useState<{
    id: number
    seed: string
  } | null>(null)

  if (!app.state.userData || !app.state.token) {
    return <Guard />
  }

  const entries = app.state.userData!.history.slice(0)

  entries.sort((a, b) => b[2] - a[2])

  return (
    <>
      <div>
        <h1 className="text-center text-5xl mt-12">Lern-Verlauf</h1>
        <div className="max-w-[700px] mx-auto mt-6 mb-96">
          <div className="mt-6 mb-12 text-center">
            <Link href="/dashboard">
              <button className="btn btn-sm">zurück</button>
            </Link>
          </div>
          <div>{entries.map(renderHistoryEntry)}</div>
        </div>
      </div>
      {showExerciseModal &&
        (() => {
          return (
            <div className="modal modal-open" role="dialog">
              <div className="modal-box">
                <h3 className="text-lg font-bold">
                  {exercisesData[showExerciseModal.id].title}
                </h3>

                {renderExample(
                  showExerciseModal.id,
                  showExerciseModal.seed,
                  exercisesData[showExerciseModal.id],
                  'history'
                )}

                <div className="modal-action">
                  <button
                    className="btn btn-sm"
                    onClick={() => setShowExercise(null)}
                  >
                    Schließen
                  </button>
                </div>
              </div>
              <label
                className="modal-backdrop"
                onClick={() => setShowExercise(null)}
              >
                Close
              </label>
            </div>
          )
        })()}
    </>
  )

  function renderHistoryEntry(entry: HistoryEntry, i: number) {
    const inner =
      entry[0] == 'G' ? (
        <>Lernziel gewechselt auf &quot;{goalsData[entry[1]]?.name}&quot;</>
      ) : (
        <>
          Aufgabe &quot;{exercisesData[entry[1]].title}
          <span className="text-gray-600">&quot;#{entry[3]}</span>{' '}
          {entry[4] == 1 ? 'erfolgreich gelöst' : 'zur Wiederholung markiert'}{' '}
          in{' '}
          {entry[5] > 60 ? (
            <>{Math.round(entry[5] / 60)} min</>
          ) : (
            <>{entry[5]} s</>
          )}{' '}
          <button
            className="link"
            onClick={() => {
              setShowExercise({ id: entry[1], seed: entry[3] })
            }}
          >
            [anzeigen]
          </button>{' '}
          <button
            className="link"
            onClick={() => {
              showExercise(app, entry[1], generateSeed(), -1)
              router.push('/practice')
            }}
          >
            [nochmal üben]
          </button>
        </>
      )
    return (
      <div className="bg-gray-50 px-3 py-1 my-5" key={i}>
        <div>
          <small>{new Date(entry[2] * 1000).toLocaleString('de-De')}</small>
        </div>
        {inner}
      </div>
    )
  }
}
