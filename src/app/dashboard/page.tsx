'use client'

import { useApp } from '@/components/App'
import { Guard } from '@/components/Guard'
import { exercisesData } from '@/content/exercises'
import { goalsData } from '@/content/goals'
import { buildHistoryStats } from '@/data/build-history-stats'
import {
  populateDashboard,
  showExercise,
  unlockNextLevel,
} from '@/data/commands'
import { dashboardProgress } from '@/data/dashboard-progress'
import { generateSeed } from '@/data/generate-seed'
import { logout } from '@/data/user-commands'
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

  return (
    <>
      <div>
        <h1 className="text-center text-4xl mt-12">
          Mathe-Skills Prüfungstraining
        </h1>
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
          {goal !== null &&
            (() => {
              const progressData = dashboardProgress(app)
              const n = goalsData[goal].exercises.length
              const showUnlock =
                progressData.practice == 0 &&
                n - progressData.levels[progressData.levels.length - 1].n < 4
              return (
                <div className="p-3 rounded bg-gray-50">
                  <div className="flex justify-between">
                    <p>
                      <span>
                        Dein Lernziel:{' '}
                        <span className="font-bold">
                          {goalsData[goal].name}
                        </span>
                      </span>
                    </p>
                    <Link href="/goals">
                      <button className="btn btn-sm btn-accent">ändern</button>
                    </Link>
                  </div>
                  <div className="mt-2">{goalsData[goal].description}.</div>
                  <div className="mt-4 font-semibold text-gray-500 flex justify-between">
                    <span>Fortschritt: {progressData.p}%</span>
                    <span>
                      Level {app.state.userData.level[app.state.userData.goal!]}
                    </span>
                  </div>
                  <progress
                    className="progress w-full progress-accent"
                    value={progressData.p}
                    max="100"
                  ></progress>
                  {(() => {
                    const values = []
                    if (progressData.new > 0) {
                      values.push(`Neu: ${progressData.new}`)
                    }
                    if (progressData.practice > 0) {
                      values.push(`Nochmal üben: ${progressData.practice}`)
                    }
                    progressData.levels.forEach((l) => {
                      if (
                        (l.n > 0 && l.n < n) ||
                        l.level ==
                          app.state.userData!.level[app.state.userData!.goal!]
                      ) {
                        values.push(`Level ${l.level}: ${l.n}/${n}`)
                      }
                    })
                    return (
                      <div className="text-sm mt-1">{values.join(', ')}</div>
                    )
                  })()}
                  {showUnlock && (
                    <div className="text-center">
                      <button
                        className="btn btn-sm btn-accent"
                        onClick={() => {
                          unlockNextLevel(app)
                          app.uploader.uploadUserData(app)
                        }}
                      >
                        Level{' '}
                        {app.state.userData.level[app.state.userData.goal!] + 1}{' '}
                        starten
                      </button>
                    </div>
                  )}
                </div>
              )
            })()}
          {goal !== null && (
            <div role="tablist" className="tabs tabs-bordered tabs-lg mt-12">
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
                Jetzt üben
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
                Alle Aufgaben
              </a>
            </div>
          )}
          {app.state.tab == 'list' &&
            (() => {
              const historyStats = buildHistoryStats(app)
              return (
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
                          {!historyStats[id]?.practice &&
                            historyStats[id]?.solvedCount > 0 && (
                              <span className="badge badge-outline border-accent text-accent-content font-normal ml-3">
                                kann ich - lvl{' '}
                                {Math.min(
                                  historyStats[id].solvedCount,
                                  app.state.userData!.level[
                                    app.state.userData!.goal!
                                  ]
                                )}
                              </span>
                            )}
                          {historyStats[id]?.practice && (
                            <span className="badge text-warning-content border-warning font-normal ml-3">
                              nochmal üben
                            </span>
                          )}
                        </div>
                      )
                    })}
                  </div>
                </div>
              )
            })()}
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
          {goal &&
            app.state.tab == 'tutor' &&
            (() => {
              const historyStats = buildHistoryStats(app)
              const visibleCount = app.state.userData.dashboard.filter(
                (d) =>
                  !(
                    historyStats[d.id] &&
                    historyStats[d.id].seeds.includes(d.seed)
                  )
              ).length
              return (
                <>
                  <div className="my-5 ml-5 text-gray-600 flex justify-between mt-8">
                    <p>Diese Aufgaben empfehlen wir dir für heute:</p>
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
                          app.uploader.uploadUserData(app)
                        }}
                      >
                        Neue Auswahl
                      </button>
                    </div>
                  </div>
                  <div className="flex flex-wrap justify-center gap-8 py-5 bg-gray-100 mt-4 rounded-box">
                    {app.state.userData.dashboard.map((entry, i) => {
                      const solved =
                        historyStats[entry.id] &&
                        historyStats[entry.id].seeds.includes(entry.seed)
                      return (
                        <div
                          className={clsx(
                            'rounded mx-3 px-3 py-4 cursor-pointer w-full',
                            solved
                              ? 'text-gray-400 bg-accent/10 pointer-events-none'
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
                          {historyStats[entry.id] ? (
                            historyStats[entry.id].practice ? (
                              <span
                                className={clsx(
                                  'badge badge-warning font-normal ml-3',
                                  solved && 'opacity-70'
                                )}
                              >
                                {solved
                                  ? 'später nochmal üben'
                                  : 'Wiederholung'}
                              </span>
                            ) : solved ? (
                              <span className="badge bg-accent/30 border-0 font-normal ml-3">
                                kann ich
                              </span>
                            ) : historyStats[entry.id].solvedCount == 0 ? (
                              <span className="badge badge-primary font-normal ml-3">
                                neu
                              </span>
                            ) : historyStats[entry.id].solvedCount ==
                              app.state.userData!.level[
                                app.state.userData!.goal!
                              ] -
                                1 ? (
                              <span className="badge badge-primary badge-outline font-normal ml-3">
                                Level {historyStats[entry.id].solvedCount + 1}
                              </span>
                            ) : historyStats[entry.id].solvedCount <
                              app.state.userData!.level[
                                app.state.userData!.goal!
                              ] /* if level is below two */ ? (
                              <span className="badge badge-primary font-normal ml-3">
                                Level {historyStats[entry.id].solvedCount + 1}
                              </span>
                            ) : null
                          ) : (
                            <span className="badge badge-primary font-normal ml-3">
                              neu
                            </span>
                          )}
                          {/*toPractice.has(entry.id) ? (
                            <span
                              className={clsx(
                                'badge badge-warning font-normal ml-3',
                                solved && 'opacity-70'
                              )}
                            >
                              {solved ? 'später nochmal üben' : 'Wiederholung'}
                            </span>
                          ) : idSeeds.has(entry.id.toString() + entry.seed) ? (
                            <span className="badge bg-accent/30 border-0 font-normal ml-3">
                              kann ich
                            </span>
                          ) : !ids.has(entry.id) ? (
                            <span className="badge badge-primary font-normal ml-3">
                              neu
                            </span>
                          ) : ids.has(entry.id) ? (
                            <span className="badge badge-outline font-normal ml-3 hidden">
                              Vertiefung
                            </span>
                          ) : null*/}
                        </div>
                      )
                    })}
                  </div>
                </>
              )
            })()}
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
                app.uploader.uploadUserData(app)
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
