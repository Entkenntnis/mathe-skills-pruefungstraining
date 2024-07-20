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
              Einfache Lernumgebung mit vielen eingebauten Aufgaben und
              strukturierten Lernzielen.
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
