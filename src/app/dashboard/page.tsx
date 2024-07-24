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
import { generateSeed } from '@/data/generate-seed'
import clsx from 'clsx'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { useState } from 'react'

export default function Page() {
  const app = useApp()
  const router = useRouter()

  if (!app.state.userData || !app.state.token) {
    return <Guard />
  }

  const goal = app.state.userData.goal

  const progress = goal !== null ? Math.round(calculateProgress(app) * 100) : 0

  const idSeeds = new Set<string>()
  const ids = new Set<number>()
  const toPractice = new Set<number>()

  app.state.userData!.history.forEach((entry) => {
    if (entry[0] == 'E') {
      idSeeds.add(entry[1].toString() + entry[3])
      if (entry[4] == 1) {
        ids.add(entry[1])
        toPractice.delete(entry[1])
      } else if (entry[4] == 2) {
        toPractice.add(entry[1])
      }
    }
  })

  const visibleCount = app.state.userData!.dashboard.filter(
    ({ id, seed }) => !idSeeds.has(id.toString() + seed)
  ).length

  return (
    <>
      <div>
        <h1 className="text-center text-4xl mt-12">Meine Mathe-Skills</h1>
        <div className="max-w-[700px] mx-auto mt-6">
          <div className="mt-6 mb-6 flex justify-between bg-gray-50 p-3 rounded-box">
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
          {goal !== null && (
            <div role="tablist" className="tabs tabs-bordered tabs-lg">
              <a
                role="tab"
                className={clsx(
                  'tab',
                  app.state.tab == 'tutor' && 'tab-active'
                )}
                onClick={() => {
                  app.mut((state) => {
                    state.tab = 'tutor'
                  })
                }}
              >
                Mein Lernziel
              </a>
              <a
                role="tab"
                className={clsx('tab', app.state.tab == 'list' && 'tab-active')}
                onClick={() => {
                  app.mut((state) => {
                    state.tab = 'list'
                  })
                }}
              >
                Aufgaben-Liste
              </a>
            </div>
          )}
          {app.state.tab == 'list' && (
            <div>
              <div className="flex flex-wrap justify-center gap-8 py-5 bg-gray-100 mt-6 rounded-box">
                {goalsData[goal!].exercises.map((id) => {
                  return (
                    <div
                      className={clsx(
                        'rounded mx-3 px-3 py-4 cursor-pointer w-full bg-white hover:bg-gray-50'
                      )}
                      key={id}
                      onClick={() => {
                        showExercise(app, id, generateSeed(), -1)
                        router.push('/practice')
                      }}
                    >
                      {exercisesData[id].title}
                      <span className="badge badge-outline font-normal ml-3">
                        {exercisesData[id].duration} min
                      </span>
                      {ids.has(id) && !toPractice.has(id) && (
                        <span className="badge bg-accent/30 border-0 font-normal ml-3">
                          geübt
                        </span>
                      )}
                      {toPractice.has(id) && (
                        <span className="badge bg-warning/30 border-0 font-normal ml-3">
                          zur Wiederholung markiert
                        </span>
                      )}
                    </div>
                  )
                })}
              </div>
            </div>
          )}
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
          {goal && app.state.tab == 'tutor' && (
            <>
              <div className="p-3 pt-8 rounded bg-gray-50">
                <div className="flex justify-between">
                  <p>
                    <span className="font-bold">{goalsData[goal].name}</span>
                  </p>
                  <Link href="/goals">
                    <button className="btn btn-sm btn-accent">ändern</button>
                  </Link>
                </div>
                <div className="mt-2 italic">
                  {goalsData[goal].description}.
                </div>
                <div className="mt-4">Fortschritt: {progress}%</div>
                <progress
                  className="progress w-full progress-accent"
                  value={progress}
                  max="100"
                ></progress>
              </div>
              <div className="mt-16 flex items-baseline justify-between">
                <span className="text-lg ml-6">Jetzt üben:</span>
                <div className="">
                  <button
                    className="btn btn-sm mr-3"
                    onClick={() => {
                      // @ts-ignore
                      document.getElementById('settings-modal')?.showModal()
                    }}
                  >
                    Einstellungen
                  </button>
                  <button
                    className={clsx(
                      'btn btn-sm',
                      visibleCount === 0 && 'btn-primary'
                    )}
                    onClick={() => {
                      populateDashboard(app)
                      triggerUpload(app)
                    }}
                  >
                    Neue Auswahl
                  </button>
                </div>
              </div>
              <div className="flex flex-wrap justify-center gap-8 py-5 bg-gray-100 mt-4 rounded-box">
                {app.state.userData.dashboard.map((entry, i) => {
                  if (idSeeds.has(entry.id.toString() + entry.seed)) return null
                  return (
                    <div
                      className={clsx(
                        'rounded mx-3 px-3 py-4 cursor-pointer w-full',
                        idSeeds.has(entry.id.toString() + entry.seed)
                          ? 'text-gray-400 bg-accent/10'
                          : 'font-bold text-gray-700 bg-white hover:bg-purple-50 hover:outline outline-primary outline-1'
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
                      {toPractice.has(entry.id) ? (
                        <span className="badge badge-outline badge-warning font-normal ml-3">
                          Wiederholung
                        </span>
                      ) : idSeeds.has(entry.id.toString() + entry.seed) ? (
                        <span className="badge bg-accent/30 border-0 font-normal ml-3">
                          bearbeitet
                        </span>
                      ) : !ids.has(entry.id) ? (
                        <span className="badge badge-primary font-normal ml-3">
                          neu
                        </span>
                      ) : ids.has(entry.id) ? (
                        <span className="badge badge-outline font-normal ml-3 hidden">
                          Vertiefung
                        </span>
                      ) : null}
                    </div>
                  )
                })}
              </div>
            </>
          )}
          <div className="h-[400px]"></div>
        </div>
      </div>
      <dialog id="settings-modal" className="modal">
        <div className="modal-box min-h-[300px]">
          <h3 className="font-bold text-lg">Einstellungen</h3>
          <p className="py-4">
            Anzahl der empfohlenen Aufgaben im Dashboard:
            <br />
            <select
              className="mt-1 p-2"
              value={app.state.userData.settings.listLength}
              onChange={(e) => {
                app.mut((state) => {
                  state.userData!.settings.listLength = parseInt(e.target.value)
                })
                populateDashboard(app)
                triggerUpload(app)
              }}
            >
              <option value="4">4 Aufgaben</option>
              <option value="6">6 Aufgaben</option>
              <option value="-1">unbegrenzt</option>
            </select>
          </p>
          <div className="modal-action">
            <form method="dialog">
              {/* if there is a button in form, it will close the modal */}
              <button className="btn">Schließen</button>
            </form>
          </div>
        </div>
        <form method="dialog" className="modal-backdrop">
          <button>close</button>
        </form>
      </dialog>
    </>
  )
}
