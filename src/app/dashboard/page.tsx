'use client'

import { useApp } from '@/components/App'
import { loadData, logout, testChange } from '@/data/commands'
import Link from 'next/link'
import { useRouter } from 'next/navigation'

export default function Page() {
  const app = useApp()
  const router = useRouter()

  if (!app.state.userData) {
    return (
      <p>
        Bitte anmelden: <Link href="/">zur Startseite</Link>
      </p>
    )
  }

  return (
    <div>
      <h1 className="text-center text-5xl mt-12">Dashboard</h1>
      <div className="w-[300px] mx-auto mt-6">
        <div>Hallo {app.state.userData.name}!</div>
        Daten: {app.state.userData.testRandomValue}{' '}
        <button
          className="btn btn-sm"
          onClick={() => {
            testChange(app)
          }}
        >
          Neu setzen
        </button>
        <button
          className="btn btn-sm"
          onClick={() => {
            loadData(app)
          }}
        >
          Neu laden
        </button>
        <div className="mt-12">
          <button
            className="btn btn-secondary"
            onClick={() => {
              logout(app)
              router.push('/')
            }}
          >
            Logout
          </button>
        </div>
      </div>
    </div>
  )
}
