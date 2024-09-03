'use client'

import { useApp } from '@/components/App'
import { Guard } from '@/components/Guard'
import { AlertIcon } from '@/components/icons/AlertIcon'
import { makePost } from '@/helper/make-post'
import { useRouter } from 'next/navigation'
import { useState } from 'react'

export default function Page() {
  const router = useRouter()
  const app = useApp()

  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const [pending, setPending] = useState(false)
  const [success, setSuccess] = useState(false)

  if (!app.state.userData || !app.state.token) {
    return <Guard />
  }

  return (
    <>
      <h1 className="text-center mt-12 text-xl">Account löschen</h1>
      <div className="max-w-[700px] mx-auto mt-6 mb-96">
        <div className="mt-6 mb-12 text-center">
          <button
            className="btn btn-sm"
            onClick={() => {
              if (success) {
                router.push('/')
              } else {
                router.back()
              }
            }}
          >
            zurück
          </button>
        </div>
        <div>
          {!success && (
            <form
              onSubmit={async (e) => {
                e.preventDefault()
                setPending(true)
                try {
                  const res = await makePost('/delete', {
                    password,
                    token: app.state.token,
                  })
                  if (res.ok) {
                    setPending(false)
                    setSuccess(true)
                  } else {
                    setError(res.reason)
                    setPending(false)
                  }
                } catch (e) {
                  setError('Fehler beim Löschen des Accounts')
                  setPending(false)
                }
              }}
            >
              <label className="input input-bordered flex items-center gap-2 mt-3">
                Passwort:
                <input
                  type="password"
                  className="grow"
                  value={password}
                  onChange={(e) => {
                    setPassword(e.target.value)
                    setError('')
                  }}
                />
              </label>
              {error && (
                <div role="alert" className="alert alert-error mt-4">
                  <AlertIcon />
                  <span>{error}</span>
                </div>
              )}

              {!success && (
                <button className="btn btn-error mt-8" type="submit">
                  {pending && (
                    <span className="loading loading-spinner loading-md"></span>
                  )}
                  Account löschen
                </button>
              )}
            </form>
          )}
          {success && (
            <div role="alert" className="alert alert-success mt-4">
              <span>Dein Account wurde erfolgreich gelöscht.</span>
            </div>
          )}
        </div>
      </div>
    </>
  )
}
