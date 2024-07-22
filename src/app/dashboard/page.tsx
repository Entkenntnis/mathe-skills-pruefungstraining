'use client'

import { useApp } from '@/components/App'
import { Guard } from '@/components/Guard'
import { exercisesData } from '@/content/exercises'
import { goalsData } from '@/content/goals'
import {
  calculateProgress,
  logout,
  populateDashboard,
  showExercise,
  triggerUpload,
} from '@/data/commands'
import clsx from 'clsx'
import Link from 'next/link'
import { useRouter } from 'next/navigation'

export default function Page() {
  const app = useApp()
  const router = useRouter()

  if (!app.state.userData || !app.state.token) {
    return <Guard />
  }

  const goal = app.state.userData.goal

  const progress = goal ? Math.round(calculateProgress(app) * 100) : 0

  const idSeeds = new Set<string>()
  const ids = new Set<number>()

  app.state.userData.history.forEach((entry) => {
    if (entry[0] == 'E') {
      ids.add(entry[1])
      idSeeds.add(entry[1].toString() + entry[3])
    }
  })

  return (
    <div>
      <h1 className="text-center text-5xl mt-12">Dashboard</h1>
      <div className="max-w-[700px] mx-auto mt-6">
        <div className="mt-6 mb-12 flex justify-between bg-gray-50 p-3 rounded-box">
          <p>
            Hallo {app.state.userData.name}!{' '}
            {app.state.uploading ? (
              <span className="badge badge-info ml-1">
                ... wird synchornisiert
              </span>
            ) : (
              <span className="badge badge-accent badge-outline ml-1">
                Cloud verbunden
              </span>
            )}
          </p>
          <div>
            {goal !== null && (
              <Link href="/history">
                <button className="btn btn-sm mr-4">Lern-Verlauf</button>
              </Link>
            )}
            <button
              className="btn btn-sm"
              onClick={() => {
                router.push('/')
                app.afterPush('/', () => {
                  logout(app)
                })
              }}
            >
              Logout
            </button>
          </div>
        </div>
        {goal === null && (
          <div>
            <p className="mt-8 font-bold">Der erste Schritt:</p>
            <p className="mt-6">
              <Link href="/goals" className="btn btn-primary">
                Lernziel auswählen
              </Link>
            </p>
          </div>
        )}
        {goal && (
          <>
            <div className="p-3 rounded bg-gray-50">
              <div className="flex justify-between">
                <p>
                  Mein Lernziel:{' '}
                  <span className="font-bold">{goalsData[goal].name}</span>
                </p>
                <Link href="/goals">
                  <button className="btn btn-sm btn-accent">ändern</button>
                </Link>
              </div>
              <div className="mt-2 italic">{goalsData[goal].description}.</div>
              <div className="mt-4">Fortschritt: {progress}%</div>
              <progress
                className="progress w-full progress-accent"
                value={progress}
                max="100"
              ></progress>
            </div>
            <div className="mt-8 flex items-baseline justify-between">
              <span>Jetzt üben:</span>
              <div className="">
                <button className="btn btn-sm mr-3" onClick={() => {}}>
                  Einstellungen (TODO)
                </button>
                <button
                  className="btn btn-sm"
                  onClick={() => {
                    populateDashboard(app)
                    triggerUpload(app)
                  }}
                >
                  Neue Auswahl
                </button>
              </div>
            </div>
            <div className="flex flex-wrap justify-center gap-8 pt-6">
              {app.state.userData.dashboard.map((entry, i) => (
                <div
                  className={clsx(
                    'rounded w-full px-3 py-4 cursor-pointer',
                    idSeeds.has(entry.id.toString() + entry.seed)
                      ? 'text-gray-400 bg-accent/10'
                      : 'font-bold text-gray-700 bg-purple-50 hover:bg-purple-100 hover:outline outline-primary outline-1'
                  )}
                  onClick={() => {
                    showExercise(app, entry.id, entry.seed, i)
                    router.push('/practice')
                  }}
                  key={entry.id + entry.seed}
                >
                  {exercisesData[entry.id].title}
                  <span className="badge badge-outline font-normal ml-3">
                    {exercisesData[entry.id].duration} min
                  </span>
                  {!ids.has(entry.id) ? (
                    <span className="badge badge-primary font-normal ml-3">
                      neu
                    </span>
                  ) : idSeeds.has(entry.id.toString() + entry.seed) ? (
                    <span className="badge bg-accent/30 border-0 font-normal ml-3">
                      bearbeitet
                    </span>
                  ) : ids.has(entry.id) ? (
                    <span className="badge badge-outline badge-warning font-normal ml-3">
                      Wiederholung
                    </span>
                  ) : null}
                </div>
              ))}
            </div>
          </>
        )}
        <div className="h-[400px]"></div>
      </div>
    </div>
  )
}
