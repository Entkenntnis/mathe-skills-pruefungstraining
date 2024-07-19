'use client'

import { useApp } from '@/components/App'
import { loadData, logout } from '@/data/commands'
import Link from 'next/link'
import { useRouter } from 'next/navigation'

export default function Page() {
  const app = useApp()
  const router = useRouter()

  if (!app.state.userData || !app.state.token) {
    return (
      <div className="modal modal-open" role="dialog">
        <div className="modal-box">
          <h3 className="text-lg font-bold">Hinweis</h3>
          <p className="py-4">
            Bitte melde dich an, um das Dashboard zu öffnen.
          </p>
          <div className="modal-action">
            <Link href="/login">
              <button className="btn btn-primary">Zum Login</button>
            </Link>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div>
      <h1 className="text-center text-5xl mt-12">Dashboard</h1>
      <div className="w-[300px] mx-auto mt-6">
        <div>Hallo {app.state.userData.name}!</div>
        <div className="mt-12">
          <button
            className="btn btn-secondary"
            onClick={() => {
              router.push('/')
              app.afterPush('/', () => {
                logout(app)
              })
            }}
          >
            Logout
          </button>
        </div>
      </div>
    </div>
  )
}
