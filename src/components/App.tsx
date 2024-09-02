'use client'

import { App, AppState } from '@/data/types'
import { Uploader } from '@/data/uploader'
import { Draft, produce } from 'immer'
import { usePathname } from 'next/navigation'
import { createContext, useContext, useEffect, useRef, useState } from 'react'

const AppContext = createContext<App | null>(null)

export function useApp() {
  const app = useContext(AppContext)
  if (!app) throw new Error("Can't access app here.")
  return app
}

interface AppWrapperProps {
  children: React.ReactNode
}

export function AppWrapper({ children }: AppWrapperProps) {
  const pathname = usePathname()

  const afterPush = useRef<{ target: string; handler: () => void } | null>(null)

  useEffect(() => {
    const url = `${pathname}`
    if (afterPush.current && afterPush.current.target == url) {
      afterPush.current.handler()
      afterPush.current = null
    }
  }, [pathname])

  const [init, setInit] = useState(false)

  useEffect(() => {
    try {
      const obj = JSON.parse(
        sessionStorage.getItem('mathe-skills-client-store') ?? 'false'
      )
      if (obj) {
        setState(obj)
        stateRef.current = obj
      }
    } catch (e) {
      //
    }
    setInit(true)
  }, [])

  const [state, setState] = useState<AppState>({
    userData: null,
    history: [],
    token: null,
    showExercise: null,
    paperHintShown: false,
    tab: 'tutor',
    uploading: false,
  })
  const stateRef = useRef(state)
  const app = {
    get state() {
      return stateRef.current
    },
    mut,
    afterPush: (target: string, handler: () => void) => {
      afterPush.current = { target, handler }
    },
    uploader: new Uploader(),
    init,
  }

  return <AppContext.Provider value={app}>{children}</AppContext.Provider>

  function mut(fn: (draft: Draft<AppState>) => void) {
    const newval = produce(stateRef.current, fn)
    stateRef.current = newval

    sessionStorage.setItem('mathe-skills-client-store', JSON.stringify(newval))

    setState(newval)
  }
}
