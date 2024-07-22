'use client'

import { useApp } from '@/components/App'
import { Guard } from '@/components/Guard'
import { goalsData } from '@/content/goals'
import { selectGoal } from '@/data/commands'
import Link from 'next/link'

export default function Page() {
  const app = useApp()

  if (!app.state.userData || !app.state.token) {
    return <Guard />
  }

  return (
    <div>
      <h1 className="text-center text-5xl mt-12">Lernziel auswählen</h1>
      <div className="w-[500px] mx-auto mt-6">
        <div className="mt-6 mb-12 text-center">
          <Link href="/dashboard">
            <button className="btn btn-sm">zurück</button>
          </Link>
        </div>
        <div>
          <p className="mt-8">
            Die Lernziele orientieren sich an der Realschule Bayern. Du kannst
            dein Ziel jederzeit anpassen.
          </p>
        </div>
        <div className="flex flex-wrap mt-8 justify-center gap-8">
          {Object.entries(goalsData).map(([id, goal]) => {
            const isSelected = parseInt(id) == app.state.userData?.goal
            return (
              <div className="indicator" key={goal.name}>
                {isSelected && (
                  <span className="mt-4 mr-3 indicator-item badge badge-accent badge-lg">
                    aktiv
                  </span>
                )}
                <div className="card bg-base-100 w-96 shadow-xl">
                  <div className="card-body">
                    <h2 className="card-title">{goal.name}</h2>
                    <p>{goal.description}</p>
                    {!isSelected && (
                      <div className="card-actions justify-end">
                        <button
                          className="btn btn-primary"
                          onClick={() => {
                            selectGoal(app, parseInt(id))
                            // router.push('/dashboard')
                          }}
                        >
                          Auswählen
                        </button>
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
