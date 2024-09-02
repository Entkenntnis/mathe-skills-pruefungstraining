'use client'

import { useRouter } from 'next/navigation'

export default function Page() {
  const router = useRouter()
  return (
    <>
      <h1 className="text-center mt-12 text-xl">Passwort ändern</h1>
      <div className="max-w-[700px] mx-auto mt-6 mb-96">
        <div className="mt-6 mb-12 text-center">
          <button
            className="btn btn-sm"
            onClick={() => {
              router.back()
            }}
          >
            zurück
          </button>
        </div>
        <div>TODO</div>
      </div>
    </>
  )
}
