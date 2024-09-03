'use client'

import { useApp } from '@/components/App'
import { Guard } from '@/components/Guard'
import { AlertIcon } from '@/components/icons/AlertIcon'
import { makePost } from '@/helper/make-post'
import { useRouter } from 'next/navigation'
import { useState } from 'react'

export default function Page() {
  const app = useApp()
  const router = useRouter()
  const [error, setError] = useState('')
  const [oldPw, setOldPw] = useState('')
  const [newPw, setNewPw] = useState('')
  const [pending, setPending] = useState(false)

  const [success, setSuccess] = useState(false)

  if (!app.state.userData || !app.state.token) {
    return <Guard />
  }
  return (
    <>
      <h1 className="text-center mt-12 text-xl">Passwort ändern</h1>
      <div className="max-w-[700px] mx-auto mt-6 mb-96">
        <div className="mt-6 mb-12 text-center">
          <button
            className="btn btn-sm"
            onClick={() => {
              router.back()
            }}
          >
            zurück
          </button>
        </div>
        <div>
          <form
            onSubmit={async (e) => {
              e.preventDefault()
              setPending(true)
              try {
                const res = await makePost('/changepw', {
                  oldPw,
                  newPw,
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
                setError('Fehler beim Login')
                setPending(false)
              }
            }}
          >
            <label className="input input-bordered flex items-center gap-2 mt-3">
              Altes Passwort:
              <input
                type="password"
                className="grow"
                value={oldPw}
                onChange={(e) => {
                  setOldPw(e.target.value)
                  setError('')
                }}
              />
            </label>
            <label className="input input-bordered flex items-center gap-2 mt-8">
              Neues Passwort:
              <input
                type="password"
                className="grow"
                value={newPw}
                onChange={(e) => {
                  setNewPw(e.target.value)
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
            {success && (
              <div role="alert" className="alert alert-success mt-4">
                <span>Passwort erfolgreich geändert!</span>
              </div>
            )}
            {!success && (
              <button className="btn btn-primary mt-8" type="submit">
                {pending && (
                  <span className="loading loading-spinner loading-md"></span>
                )}
                Passwort ändern
              </button>
            )}
          </form>
        </div>
      </div>
    </>
  )
}
