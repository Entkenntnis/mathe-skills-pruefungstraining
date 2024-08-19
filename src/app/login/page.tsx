'use client'

import { useApp } from '@/components/App'
import { AlertIcon } from '@/components/icons/AlertIcon'
import { login } from '@/data/user-commands'
import { makePost } from '@/helper/make-post'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { useState } from 'react'

export default function Page() {
  const app = useApp()
  const router = useRouter()
  const [name, setName] = useState('')
  const [pw, setPw] = useState('')
  const [error, setError] = useState('')
  const [pending, setPending] = useState(false)
  return (
    <div>
      <h1 className="mt-12 text-center text-5xl">Login</h1>
      <div className="mx-auto mt-8 w-[360px]">
        <form
          onSubmit={async (e) => {
            e.preventDefault()
            setPending(true)
            try {
              const res = await makePost('/login', { name, password: pw })
              if (res.ok) {
                login(app, res.token, res.data, res.events)
                router.push('/dashboard')
              } else {
                setError('Zugangsdaten nicht gefunden.')
                setPending(false)
              }
            } catch (e) {
              setError('Fehler beim Login')
              setPending(false)
            }
          }}
        >
          <label className="input input-bordered flex items-center gap-2 mt-6">
            Name:
            <input
              type="text"
              autoFocus
              className="grow"
              maxLength={30}
              value={name}
              onChange={(e) => {
                setName(e.target.value)
                setError('')
              }}
            />
          </label>
          <label className="input input-bordered flex items-center gap-2 mt-3">
            Passwort:
            <input
              type="password"
              className="grow"
              value={pw}
              onChange={(e) => {
                setPw(e.target.value)
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
          <p className="mt-8 flex justify-between items-baseline">
            <Link href="/">
              <button className="btn btn-sm" type="button">
                zurück
              </button>
            </Link>
            <button className="btn btn-primary" type="submit">
              {pending && (
                <span className="loading loading-spinner loading-md"></span>
              )}
              Login
            </button>
          </p>
        </form>
      </div>
    </div>
  )
}
