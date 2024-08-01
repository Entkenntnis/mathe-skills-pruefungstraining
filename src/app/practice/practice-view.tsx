'use client'

import { useApp } from '@/components/App'
import { Guard } from '@/components/Guard'
import { CalculatorIcon } from '@/components/icons/CalculatorIcon'
import { NoCalculatorIcon } from '@/components/icons/NoCalculatorIcon'
import { exercisesData } from '@/content/exercises'
import { finishExercise, restartExercise } from '@/data/commands'
import { generateData } from '@/data/generate-data'
import { generateSeed } from '@/data/generate-seed'
import { constrainedGeneration } from '@/helper/constrained-generation'
import { proseWrapper } from '@/helper/prose-wrapper'
import { Rng } from '@/helper/rng'
import clsx from 'clsx'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { useEffect, useMemo, useState } from 'react'

export default function PracticeView() {
  const app = useApp()
  const router = useRouter()

  const [step, setStep] = useState(0)
  const [startTs, setStartTs] = useState(new Date().getTime())

  const [positiveFeedback] = useState(
    new Rng(generateSeed()).randomItemFromArray([
      'Bravo!',
      'Super!',
      'Nice :)',
      'Hurra!',
      'Gut gemacht!',
    ])
  )

  function generateAltSeed() {
    let candidate = generateSeed()
    while (app.state.showExercise && app.state.showExercise.seed == candidate) {
      candidate = generateSeed()
    }
    return candidate
  }

  const [altSeed, setAltSeed] = useState(generateAltSeed)

  const [example, setExample] = useState<null | { id: number; seed: string }>(
    null
  )

  const [timeGuard, setTimeGuard] = useState<null | number>(null)

  const [minTimeDone, setMinTimeDone] = useState(false)

  const { id, seed } = app.state.showExercise!

  const exercise = exercisesData[id]

  const data = useMemo(
    () => generateData(id, seed, exercise),
    [exercise, id, seed]
  )

  const task = useMemo(() => exercise.task({ data }), [data, exercise])
  const solution = useMemo(() => exercise.solution({ data }), [data, exercise])

  useEffect(() => {
    const intervalId = setInterval(() => {
      if (app.state.showExercise && timeGuard === null) {
        const ts = new Date().getTime()
        const duration = ts - startTs
        if (
          duration / 1000 >=
          exercisesData[app.state.showExercise.id].duration * 60 * 0.2
        ) {
          //setMinTimeDone(true)
        }
      }
    }, 1000)

    // clear interval on re-render to avoid memory leaks
    return () => clearInterval(intervalId)
    // add timeLeft as a dependency to re-rerun the effect
    // when we update it
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [startTs])

  return (
    <>
      <div className="min-h-[500px] mx-auto max-w-[890px] flex md:flex-row flex-col mt-24">
        <div className="md:flex-grow md:flex-shrink mx-auto">
          <div className="ml-3 mt-6 font-bold text-gray-700 text-lg relative pr-3">
            {exercise.title}
            <span className="badge ml-2 font-normal">
              {exercise.duration} min
            </span>
            <span className="inline-block font-normal align-bottom h-6 ml-1">
              {exercise.useCalculator ? (
                <span className="tooltip" data-tip="Taschenrechner erlaubt">
                  <div className="scale-75">
                    <CalculatorIcon />
                  </div>
                </span>
              ) : (
                <span className="tooltip" data-tip="ohne Taschenrechner">
                  <div className="scale-75">
                    <NoCalculatorIcon />
                  </div>
                </span>
              )}
            </span>
          </div>
          <Link href="/dashboard">
            <button className="btn btn-sm ml-3 mt-3 text-gray-600">
              zurück
            </button>
          </Link>
          <div
            className={clsx(
              'mt-2 p-3 pb-6 mr-4',
              step == 1 && 'border-b-secondary border-b-2'
            )}
          >
            {proseWrapper(task)}
          </div>
          {step >= 2 && (
            <>
              <div className="indicator w-full pr-4">
                <span className="indicator-item mr-14 badge mt-1">Lösung</span>
                <div
                  className={clsx(
                    'mt-4 p-3 border-2 w-full',
                    step == 2 || step == 3
                      ? 'border-secondary'
                      : 'border-gray-300'
                  )}
                >
                  {proseWrapper(solution)}
                </div>
              </div>
            </>
          )}
          <div className="h-[400px]"></div>
        </div>
        <div className="md:flex-grow-0 md:flex-shrink-0 md:w-[280px] mx-3 md:mx-0">
          <div className="mt-3 bg-gray-50 md:sticky md:top-4 fixed bottom-3 left-3 right-3 p-3 rounded-box">
            {step === 0 && (
              <>
                <strong>1. Löse die Aufgabe</strong> und notiere dein Ergebnis
                auf einem Blatt Papier.
                <div>
                  <button
                    className={clsx(
                      'btn btn-secondary ml-3 mt-6 mb-6',
                      !minTimeDone && 'btn-outline'
                    )}
                    onClick={() => {
                      const ts = new Date().getTime()
                      const duration = ts - startTs
                      if (
                        duration / 1000 < exercise.duration * 60 * 0.2 &&
                        !minTimeDone
                      ) {
                        setTimeGuard(ts)
                      } else {
                        setStep(1)
                      }
                    }}
                  >
                    Ich bin fertig
                  </button>
                  <button
                    className="text-left btn ml-3 btn-primary btn-outline leading-snug"
                    onClick={() => {
                      setExample({
                        id: app.state.showExercise!.id,
                        seed: altSeed,
                      })
                    }}
                  >
                    Zeige mir ein Beispiel
                  </button>
                </div>
              </>
            )}
            {step === 1 && (
              <>
                <strong>2. Alle Teile der Aufgabe</strong> bearbeitet und bereit
                zum Abgeben?
                <div>
                  <button
                    className="btn btn-secondary btn-outline ml-3 mt-6 mb-3"
                    onClick={() => {
                      setStep(2)
                      setTimeout(() => {
                        setStep(3)
                      }, 5000)
                    }}
                  >
                    Zeige mir die Lösung
                  </button>
                  <button
                    className="btn btn-sm ml-3 mt-3 mb-6"
                    onClick={() => setStep(0)}
                  >
                    Ich brauche noch Zeit.
                  </button>
                </div>
              </>
            )}
            {step === 2 && (
              <>
                <strong>3. Vergleiche mit der Lösung</strong> und schaue, ob
                deine Lösung übereinstimmt.
                <TimerBar />
              </>
            )}
            {step === 3 && (
              <>
                <strong>3. Vergleiche mit der Lösung</strong> und schaue, ob
                deine Lösung übereinstimmt
                <br />
                <p className="mt-2">Wie schätzt du dich ein?</p>
                <div>
                  <button
                    className="btn btn-success ml-2 mt-6 mb-3"
                    onClick={() => {
                      setStep(4)
                      finish(1)
                    }}
                  >
                    Kann ich
                  </button>
                  <button
                    className="btn btn-warning ml-5 mt-6 mb-3"
                    onClick={() => {
                      setStep(5)
                      finish(2)
                    }}
                  >
                    Nochmal üben
                  </button>
                  <button
                    className="btn btn-sm ml-3 mt-6 mb-3"
                    onClick={() => {
                      setStep(1)
                    }}
                  >
                    Lösung verbergen
                  </button>
                </div>
              </>
            )}
            {step === 4 && (
              <>
                <strong>{positiveFeedback}</strong>
                <div>
                  <button
                    className="btn btn-primary ml-3 mt-6 mb-3"
                    onClick={() => {
                      router.push('/dashboard')
                    }}
                  >
                    Nächsten Aufgabe wählen
                  </button>
                </div>
              </>
            )}
            {step === 5 && (
              <>
                <strong>Das System hat sich die Aufgabe gemerkt</strong> und
                wird sie dir bald zur Wiederholung vorschlagen.
                <div>
                  <button
                    className="btn btn-primary ml-3 mt-6 mb-3"
                    onClick={() => {
                      router.push('/dashboard')
                    }}
                  >
                    Nächsten Aufgabe wählen
                  </button>
                  <button
                    className="btn btn-sm ml-3 mt-6 mb-3"
                    onClick={() => {
                      finish(2)
                      restartExercise(app)
                      setStep(0)
                    }}
                  >
                    Sofort nochmal üben
                  </button>
                </div>
              </>
            )}
          </div>
        </div>
      </div>
      {!app.state.paperHintShown && (
        <div className="modal modal-open" role="dialog">
          <div className="modal-box">
            <h3 className="text-lg font-bold">Vorbereitung</h3>
            <p className="py-4">
              Lege dir bitte etwas zum Schreiben bereit, z.B. Stift und ein
              Blatt Papier.
            </p>
            <img
              src="/paper.jpg"
              alt="Stift und Papier"
              className="h-[230px] mx-auto"
            />
            <p className="py-4">
              Mathematik passiert in der Tätigkeit ✍️ - das Schreiben ist ein
              wichtiger Teil davon.
            </p>
            <div className="modal-action">
              <button
                className="btn btn-primary"
                onClick={() => {
                  app.mut((state) => {
                    state.paperHintShown = true
                  })
                }}
              >
                Ich bin bereit
              </button>
            </div>
          </div>
        </div>
      )}
      {timeGuard !== null && (
        <div className="modal modal-open" role="dialog">
          <div className="modal-box">
            <h3 className="text-lg font-bold">Mathematik braucht Zeit</h3>
            <p className="py-4">
              Wir empfehlen dir, dich noch weitere{' '}
              <strong>
                {exercise.duration * 60 * 0.2 -
                  Math.round((timeGuard - startTs) / 1000)}{' '}
                Sekunden
              </strong>{' '}
              Zeit zur Bearbeitung dieser Aufgabe zu nehmen.
            </p>
            <div className="modal-action justify-between">
              <button
                className="hover:underline"
                onClick={() => {
                  setTimeGuard(null)
                  setMinTimeDone(true)
                }}
              >
                <small>Timer auf eigene Verantwortung überspringen</small>
              </button>
              <button
                className="btn btn-primary"
                onClick={() => {
                  setStartTs(startTs + (new Date().getTime() - timeGuard))
                  setTimeGuard(null)
                }}
              >
                Ok
              </button>
            </div>
          </div>
        </div>
      )}
      {example &&
        (() => {
          const rng = new Rng(example.id + '#' + example.seed)
          const e = exercisesData[example.id]
          const data = generateData(example.id, example.seed, e)
          return (
            <div className="modal modal-open" role="dialog">
              <div className="modal-box max-w-fit">
                <div className="w-[586px]">
                  <h3 className="text-lg border-b border-primary">
                    <strong>Beispiel:</strong> {exercisesData[example.id].title}
                  </h3>
                  <div className="mt-2 pt-2 pb-6">
                    {proseWrapper(
                      exercisesData[example.id].task({
                        data,
                      })
                    )}
                  </div>
                  <details open>
                    <summary className="pointer-events-none">Lösung</summary>
                    <div className="border pt-5 pb-3 px-4">
                      {proseWrapper(
                        exercisesData[example.id].solution({
                          data,
                        })
                      )}
                    </div>
                  </details>

                  <div className="modal-action justify-between">
                    <button
                      className="underline"
                      onClick={() => {
                        const seed = generateAltSeed()
                        setAltSeed(generateAltSeed())
                        setExample({
                          id: app.state.showExercise!.id,
                          seed,
                        })
                      }}
                    >
                      neues Beispiel
                    </button>
                    <button
                      className="btn btn-sm"
                      onClick={() => setExample(null)}
                    >
                      Schließen
                    </button>
                  </div>
                </div>
              </div>
              <label
                className="modal-backdrop"
                onClick={() => setExample(null)}
              >
                Close
              </label>
            </div>
          )
        })()}
    </>
  )

  function finish(status: number) {
    const duration = new Date().getTime() - startTs
    finishExercise(app, status, duration)
  }
}

function TimerBar() {
  return <progress className="progress progress-secondary w-56"></progress>
}
