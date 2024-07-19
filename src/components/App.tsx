'use client'

import { App, AppState } from '@/data/types'
import { Draft, produce } from 'immer'
import { createContext, useContext, useRef, useState } from 'react'

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
  const [state, setState] = useState<AppState>({
    userData: null,
    token: null,
  })
  const stateRef = useRef(state)
  const app = {
    get state() {
      return stateRef.current
    },
    mut,
  }
  return <AppContext.Provider value={app}>{children}</AppContext.Provider>

  function mut(fn: (draft: Draft<AppState>) => void) {
    const newval = produce(stateRef.current, fn)
    stateRef.current = newval

    setState(newval)
  }
}
