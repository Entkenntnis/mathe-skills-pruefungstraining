'use client'

import { useApp } from '@/components/App'
import Link from 'next/link'

export default function Page() {
  const app = useApp()

  if (!app.state.userData) {
    return (
      <p>
        Bitte anmelden: <Link href="/">zur Startseite</Link>
      </p>
    )
  }

  return (
    <div>
      <h1>Dashboard</h1>
    </div>
  )
}
