'use client'

import { useApp } from '@/components/App'
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
  const canLogin = name.length > 0 && pw.length > 0
  return (
    <div>
      <h1 className="mt-12 text-center text-5xl">Login</h1>
      <div className="mx-auto mt-8 w-[360px]">
        <label className="input input-bordered flex items-center gap-2 mt-6">
          Name:
          <input
            type="text"
            className="grow"
            placeholder="Dein Name"
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
            placeholder="Dein Passwort"
            value={pw}
            onChange={(e) => {
              setPw(e.target.value)
              setError('')
            }}
          />
        </label>
        {error && (
          <div role="alert" className="alert alert-error mt-4">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6 shrink-0 stroke-current"
              fill="none"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z"
              />
            </svg>
            <span>{error}</span>
          </div>
        )}
        <p className="mt-8 flex justify-between items-baseline">
          <Link href="/">
            <button className="btn btn-sm">zurück</button>
          </Link>
          <button
            className="btn btn-primary"
            onClick={async () => {
              const json = await makePost('/login', { name, password: pw })
              if (json.ok) {
                login(app, json.token, JSON.parse(json.data))
                router.push('/dashboard')
              } else {
                setError('Zugangsdaten stimmen nicht überein.')
              }
            }}
          >
            Login
          </button>
        </p>
      </div>
    </div>
  )
}
