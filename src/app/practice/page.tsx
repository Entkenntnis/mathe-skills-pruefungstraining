'use client'

import { useApp } from '@/components/App'
import { Guard } from '@/components/Guard'
import PracticeView from './practice-view'

export default function Page() {
  const app = useApp()

  if (!app.state.userData || !app.state.token || !app.state.showExercise) {
    return <Guard />
  }

  return <PracticeView />
}
