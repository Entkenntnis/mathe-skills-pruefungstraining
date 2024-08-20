'use client'

import { useApp } from '@/components/App'
import { Guard } from '@/components/Guard'
import { goalsData } from '@/content/goals'
import { selectGoal } from '@/data/commands'
import Link from 'next/link'
import { useRouter } from 'next/navigation'

export default function Page() {
  const app = useApp()
  const router = useRouter()

  if (!app.state.userData || !app.state.token) {
    return <Guard />
  }

  const goals = Object.entries(goalsData)
  goals.sort((a, b) => a[1].index - b[1].index)

  return (
    <div>
      <h1 className="text-center text-5xl mt-12">Lernziel auswählen</h1>
      <div className="mx-12 mt-6">
        <div className="mt-6 mb-12 text-center">
          <Link href="/dashboard">
            <button className="btn btn-sm">zurück</button>
          </Link>
        </div>
        <div>
          <p className="mt-8 text-center">
            Du kannst dein Ziel jederzeit anpassen.
          </p>
        </div>
        <div className="flex flex-col items-center mt-8 justify-center gap-12">
          {goals.map(([id, goal]) => {
            const isSelected = parseInt(id) == app.state.userData?.goal
            return (
              <div className="indicator" key={goal.name}>
                {isSelected && (
                  <span className="mt-4 mr-3 indicator-item badge badge-accent badge-lg">
                    aktiv
                  </span>
                )}
                <div className="card bg-base-100 max-w-[700px] shadow-xl">
                  <div className="card-body">
                    <h2 className="card-title">{goal.name}</h2>
                    <p>{goal.description}</p>
                    {!isSelected && !goal.draft && (
                      <div className="card-actions justify-end">
                        <button
                          className="btn btn-primary"
                          onClick={() => {
                            if (!app.state.userData?.goal) {
                              setTimeout(() => {
                                router.push('/dashboard')
                              }, 100)
                            }
                            selectGoal(app, parseInt(id))
                          }}
                        >
                          Auswählen
                        </button>
                      </div>
                    )}
                    {goal.draft && (
                      <div className="card-actions justify-center font-bold text-gray-500 mt-6">
                        demnächst verfügbar
                      </div>
                    )}
                  </div>
                </div>
              </div>
            )
          })}
        </div>
      </div>
    </div>
  )
}
