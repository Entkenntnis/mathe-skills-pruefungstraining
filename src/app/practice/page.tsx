'use client'

import { useApp } from '@/components/App'
import { Guard } from '@/components/Guard'
import { CalculatorIcon } from '@/components/icons/CalculatorIcon'
import { NoCalculatorIcon } from '@/components/icons/NoCalculatorIcon'
import { exercisesData } from '@/content/exercises'
import { finishExercise, restartExercise, showExercise } from '@/data/commands'
import { generateSeed } from '@/data/generate-seed'
import { Rng } from '@/helper/rng'
import clsx from 'clsx'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { useState } from 'react'

export default function Page() {
  const app = useApp()
  const router = useRouter()

  const [step, setStep] = useState(0)
  const [startTs] = useState(new Date().getTime())

  if (!app.state.userData || !app.state.token || !app.state.showExercise) {
    return <Guard />
  }

  const exercise = exercisesData[app.state.showExercise.id]

  const data = exercise.generator(
    new Rng(
      app.state.showExercise.seed + '#' + app.state.showExercise.id.toString()
    )
  )

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
              'mt-2 p-3 pb-6 prose prose-p:text-gray-900',
              step == 1 && 'border-b-secondary border-b-2'
            )}
          >
            {exercise.task({ data })}
          </div>
          {step >= 2 && (
            <>
              <div className="indicator w-full">
                <span className="indicator-item mr-20 badge mt-1">Lösung</span>
                <div
                  className={clsx(
                    'mt-4 p-3 prose prose-p:text-gray-900 border-2 w-full',
                    step == 2 || step == 3
                      ? 'border-secondary'
                      : 'border-gray-300'
                  )}
                >
                  {exercise.solution({ data })}
                </div>
              </div>
            </>
          )}
          <div className="h-[400px]"></div>
        </div>
        <div className="md:flex-grow-0 md:flex-shrink-0 md:w-[280px] mx-3 md:mx-0">
          <div className="mt-3 bg-gray-50 sticky top-4 p-3 rounded-box">
            {step === 0 && (
              <>
                <strong>1. Löse die Aufgabe</strong> und notiere dein Ergebnis
                auf einem Blatt Papier.
                <div>
                  <button
                    className="btn btn-secondary btn-outline ml-3 mt-6 mb-6"
                    onClick={() => {
                      setStep(1)
                    }}
                  >
                    Ich bin fertig
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
                    }}
                  >
                    Kann ich
                  </button>
                  <button
                    className="btn btn-warning ml-5 mt-6 mb-3"
                    onClick={() => {
                      setStep(5)
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
                <strong>Bravo!</strong>
                <div>
                  <button
                    className="btn btn-primary ml-3 mt-6 mb-3"
                    onClick={() => {
                      finish(1)
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
                      finish(2)
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
