'use client'

import { useApp } from '@/components/App'
import { AlertIcon } from '@/components/icons/AlertIcon'
import { login } from '@/data/commands'
import { buildInitialUserData } from '@/data/user-data'
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

  const canRegister = name.length >= 3 && name.length <= 30 && pw.length >= 4

  async function submit() {
    if (canRegister) {
      try {
        const result = await makePost('/register', {
          name,
          password: pw,
          data: JSON.stringify(buildInitialUserData(name)),
        })
        if (result.ok) {
          const res = await makePost('/login', { name, password: pw })
          if (res.ok) {
            login(app, res.token, res.data)
            router.push('/dashboard')
          } else {
            // interner Fehler
            alert(JSON.stringify(res))
          }
        } else {
          setError(result.reason || 'Fehler bei Registrierung.')
        }
      } catch (e) {
        setError('Fehler bei Registrierung')
      }
    }
  }

  return (
    <div className="mx-auto w-[360px]">
      <h1 className="mt-12 text-center text-5xl">Registrierung</h1>
      <form
        onSubmit={(e) => {
          e.preventDefault()
          submit()
        }}
      >
        <label className="input input-bordered flex items-center gap-2 mt-12">
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
        <small className="ml-2 italic text-gray-600">3 - 30 Zeichen</small>
        <label className="input input-bordered flex items-center gap-2 mt-9">
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
        <small className="ml-2 italic text-gray-600">Mind. 4 Zeichen</small>
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
          <button
            className="btn btn-primary"
            type="submit"
            disabled={!canRegister}
          >
            Jetzt registrieren
          </button>
        </p>
      </form>
    </div>
  )
}
