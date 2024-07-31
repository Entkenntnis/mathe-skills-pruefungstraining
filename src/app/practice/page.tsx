'use client'

import { useApp } from '@/components/App'
import { Guard } from '@/components/Guard'
import { CalculatorIcon } from '@/components/icons/CalculatorIcon'
import { NoCalculatorIcon } from '@/components/icons/NoCalculatorIcon'
import { exercisesData } from '@/content/exercises'
import { finishExercise, restartExercise } from '@/data/commands'
import { generateSeed } from '@/data/generate-seed'
import { proseWrapper } from '@/helper/prose-wrapper'
import { Rng } from '@/helper/rng'
import clsx from 'clsx'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { useEffect, useState } from 'react'
import PracticeView from './practice-view'

export default function Page() {
  const app = useApp()

  if (!app.state.userData || !app.state.token || !app.state.showExercise) {
    return <Guard />
  }

  return <PracticeView />
}
