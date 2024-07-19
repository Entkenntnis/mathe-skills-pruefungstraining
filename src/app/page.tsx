'use client'

import { useApp } from '@/components/App'
import Link from 'next/link'

export default function Home() {
  const app = useApp()
  return (
    <div>
      <div className="hero bg-base-200 min-h-screen">
        <div className="hero-content text-center">
          <div className="max-w-md">
            <h1 className="text-5xl font-bold">Meine Mathe-Skills</h1>
            <p className="py-6">
              {app.state.userData && <>Hallo {app.state.userData.name}! </>}
              Einfache Lernumgebung mit vielen eingebauten Aufgaben,
              strukturiert nach Lernzielen.
            </p>
            <div className="flex gap-3 justify-center">
              {app.state.userData ? (
                <>
                  <Link href="/dashboard">
                    <button className="btn btn-primary">zum Dashboard</button>
                  </Link>
                </>
              ) : (
                <>
                  <button className="btn btn-primary" disabled>
                    Login (TODO)
                  </button>
                  <Link href="/register">
                    <button className="btn btn-secondary">Registrieren</button>
                  </Link>
                </>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
