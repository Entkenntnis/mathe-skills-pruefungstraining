'use client'

import { useApp } from '@/components/App'
import { Guard } from '@/components/Guard'
import { exercisesData } from '@/content/exercises'
import { goalsData } from '@/content/goals'
import { selectGoal } from '@/data/commands'
import { HistoryEntry } from '@/data/types'
import Link from 'next/link'

export default function Page() {
  const app = useApp()

  if (!app.state.userData || !app.state.token) {
    return <Guard />
  }

  const entries = app.state.userData!.history.slice(0)

  entries.sort((a, b) => b[2] - a[2])

  return (
    <div>
      <h1 className="text-center text-5xl mt-12">Lern-Verlauf</h1>
      <div className="max-w-[700px] mx-auto mt-6">
        <div className="mt-6 mb-12 text-center">
          <Link href="/dashboard">
            <button className="btn btn-sm">zurück</button>
          </Link>
        </div>
        <div>{entries.map(renderHistoryEntry)}</div>
      </div>
    </div>
  )

  function renderHistoryEntry(entry: HistoryEntry) {
    const inner =
      entry[0] == 'G' ? (
        <>Lernziel gewechselt auf &quot;{goalsData[entry[1]].name}&quot;</>
      ) : (
        <>
          Aufgabe &quot;{exercisesData[entry[1]].title}
          <span className="text-gray-600">&quot;#{entry[3]}</span>{' '}
          {entry[4] == 1 ? 'erfolgreich gelöst' : 'zur Wiederholung markiert'}{' '}
          in {entry[5]}s
        </>
      )
    return (
      <div className="bg-gray-50 px-3 py-1 my-5">
        <div>
          <small>{new Date(entry[2] * 1000).toLocaleString('de-De')}</small>
        </div>
        {inner}
      </div>
    )
  }
}
