'use client'

import { useApp } from '@/components/App'
import Link from 'next/link'

export default function Home() {
  const app = useApp()
  return (
    <div>
      <div className="hero bg-base-200 min-h-screen">
        <div className="hero-content text-center">
          <div className="max-w-lg">
            <h1 className="text-5xl font-bold">Meine Mathe-Skills</h1>
            <p className="pt-6">
              Einfache Lernumgebung mit eingebauten Aufgaben und strukturierten
              Lernzielen.
            </p>
            <p className="pt-2 pb-6">
              Inhalte für die Sekundarstufe 1 der Realschule Bayern im Aufbau.
            </p>
            <div className="flex gap-6 justify-center">
              <>
                <Link href="/login">
                  <button className="btn btn-primary">Login</button>
                </Link>
                <Link href="/register">
                  <button className="btn btn-secondary">Registrieren</button>
                </Link>
              </>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
