'use client'

import { impressum } from '@/data/impressum'
import { useRouter } from 'next/navigation'

export default function Page() {
  const router = useRouter()
  return (
    <>
      <h1 className="text-center mt-12 text-xl">Impressum / Datenschutz</h1>
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
        <p className="ml-4">Betreiber:</p>
        <p className="m-3 ml-4 mb-8">
          {impressum.name}
          <br />
          {impressum.address1}
          <br />
          {impressum.address2}
          <br />
          {impressum.contact}
        </p>
        <p className="ml-4 mb-4">
          <a
            href="https://github.com/Entkenntnis/mathe-skills-pruefungstraining"
            target="_blank"
            className="underline"
          >
            Quellcode auf GitHub
          </a>
        </p>
        <p className="ml-4 font-bold text-lg mt-8 mb-4">Datenschutz</p>
        <p className="mx-4 mb-2">
          Diese Website wird auf einem Uberspace gehostet. Dein Nutzerprofil
          wird auf dem Server gespeichert. Für die Anmeldung werden temporär
          Daten in deinem Browser (SessionStorage) hinterlegt. Diese werden beim
          Schließen des Fensters gelöscht. Daten werden nicht an Dritte
          weitergeben. Alle Daten werden innerhalb von Deutschland verarbeitet.
        </p>
      </div>
    </>
  )
}
