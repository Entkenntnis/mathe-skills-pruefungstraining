'use client'

import { useApp } from '@/components/App'
import { register } from '@/data/commands'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { useState } from 'react'

export default function Page() {
  const app = useApp()
  const router = useRouter()
  const [name, setName] = useState('')
  return (
    <div>
      <h1 className="mt-12 text-center text-5xl">Registrierung</h1>
      <h2 className="text-2xl mt-8 text-center">Offline-Profil erstellen</h2>
      <div className="mx-auto mt-8 w-[320px]">
        <label className="input input-bordered flex items-center gap-2">
          Name:
          <input
            type="text"
            className="grow"
            placeholder="Dein Name"
            value={name}
            onChange={(e) => {
              setName(e.target.value)
            }}
          />
        </label>
        <div className="form-control mt-6">
          <label className="label cursor-pointer">
            <span className="label-text">Auf diesem Gerät speichern</span>
            <input type="checkbox" defaultChecked className="checkbox" />
          </label>
        </div>
        <p className="mt-8 flex justify-between items-baseline">
          <Link href="/">
            <button className="btn btn-sm">zurück</button>
          </Link>
          <button
            className="btn btn-primary"
            onClick={() => {
              register(app, name)
              router.push('/')
            }}
          >
            Profil erstellen
          </button>
        </p>
        <div className="mt-12">
          <small>TODO: Online-Profil mit Passwort und Login</small>
        </div>
      </div>
    </div>
  )
}
