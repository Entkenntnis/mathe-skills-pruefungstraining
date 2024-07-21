'use client'

import { useApp } from '@/components/App'
import { Guard } from '@/components/Guard'
import { exercisesData } from '@/content/exercises'
import { Rng } from '@/helper/rng'
import Link from 'next/link'
import { useRouter } from 'next/navigation'

export default function Page() {
  const app = useApp()
  const router = useRouter()

  if (!app.state.userData || !app.state.token || !app.state.showExercise) {
    return <Guard />
  }

  const exercise = exercisesData[app.state.showExercise.id]

  const data = exercise.generator(new Rng(app.state.showExercise.seed))

  return (
    <div className="min-h-[500px] mx-auto max-w-[800px] bg-gray-50 flex mt-24">
      <div className="bg-pink-100 flex-grow flex-shrink">
        <Link href="/dashboard">
          <button className="btn btn-sm">zurück</button>
        </Link>
        <div className="h-[3000px] mt-8 mx-3 bg-pink-200">
          {exercise.task({ data })}
        </div>
      </div>
      <div className="bg-green-100 flex-grow-0 flex-shrink-0 w-[280px]">
        <div className="mx-3 mt-6 bg-green-200 h-[200px] sticky top-4">
          <div className="chat chat-start">
            <div className="chat-bubble">
              Löse die Aufgabe. Notiere dein Ergebnis (z.B. auf einem Blatt
              Papier)
            </div>
          </div>
          <div>Ich bin bereit</div>
        </div>
      </div>
    </div>
  )
}
