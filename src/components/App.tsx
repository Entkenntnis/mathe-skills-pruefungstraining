'use client'

import { App, AppState } from '@/data/types'
import { Draft, produce } from 'immer'
import { usePathname, useSearchParams } from 'next/navigation'
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

  const [state, setState] = useState<AppState>({
    userData: null,
    token: null,
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
  }
  return <AppContext.Provider value={app}>{children}</AppContext.Provider>

  function mut(fn: (draft: Draft<AppState>) => void) {
    const newval = produce(stateRef.current, fn)
    stateRef.current = newval

    setState(newval)
  }
}
