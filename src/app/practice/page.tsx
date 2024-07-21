'use client'

import { useApp } from '@/components/App'
import { Guard } from '@/components/Guard'
import { exercisesData } from '@/content/exercises'
import { restartExercise, showExercise } from '@/data/commands'
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

  if (!app.state.userData || !app.state.token || !app.state.showExercise) {
    return <Guard />
  }

  const exercise = exercisesData[app.state.showExercise.id]

  const data = exercise.generator(new Rng(app.state.showExercise.seed))

  return (
    <div className="min-h-[500px] mx-auto max-w-[890px] flex mt-24">
      <div className="flex-grow flex-shrink">
        <div className="ml-3 mt-6 font-bold text-gray-700 text-lg">
          {exercise.title}
        </div>
        <Link href="/dashboard">
          <button className="btn btn-sm ml-3 mt-3 text-gray-600">zurück</button>
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
          <div
            className={clsx(
              'mt-4 p-3 prose prose-p:text-gray-900 border-2',
              step == 2 ? 'border-secondary' : 'border-transparent'
            )}
          >
            {exercise.solution({ data })}
          </div>
        )}
      </div>
      <div className="flex-grow-0 flex-shrink-0 w-[280px]">
        <div className="mx-3 mt-6 bg-gray-50 sticky top-4 p-3 rounded-box">
          {step === 0 && (
            <>
              <strong>1. Schritt:</strong> Löse die Aufgabe und notiere dein
              Ergebnis (z.B. auf einem Blatt Papier).
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
              <strong>2. Schritt:</strong> Alle Teile der Aufgabe bearbeitet und
              bereit zum Abgeben?
              <div>
                <button
                  className="btn btn-secondary btn-outline ml-3 mt-6 mb-3"
                  onClick={() => {
                    setStep(2)
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
              <strong>3. Schritt:</strong> Vergleiche nun mit der Lösung und
              schaue, ob deine Lösung übereinstimmt. Wie schätzt du dich ein?
              <div>
                <button
                  className="btn btn-success ml-3 mt-6 mb-3"
                  onClick={() => {
                    setStep(3)
                  }}
                >
                  Alles richtig!
                </button>
                <button
                  className="btn btn-warning ml-3 mt-6 mb-3"
                  onClick={() => {
                    setStep(4)
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
          {step === 3 && (
            <>
              <strong>Bravo!</strong>
              <div>
                <button
                  className="btn btn-primary ml-3 mt-6 mb-3"
                  onClick={() => {
                    router.push('/dashboard')
                  }}
                >
                  Zur nächsten Aufgabe
                </button>
              </div>
            </>
          )}
          {step === 4 && (
            <>
              <strong>Das System hat sich die Aufgabe gemerkt</strong> und wird
              sie dir bald zur Wiederholung vorschlagen.
              <div>
                <button
                  className="btn btn-primary ml-3 mt-6 mb-3"
                  onClick={() => {
                    router.push('/dashboard')
                  }}
                >
                  Zur nächsten Aufgabe
                </button>
                <button
                  className="btn btn-sm ml-3 mt-6 mb-3"
                  onClick={() => {
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
  )
}
