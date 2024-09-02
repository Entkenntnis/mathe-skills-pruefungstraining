'use client'

import Link from 'next/link'

export default function Home() {
  return (
    <div>
      <div className="hero bg-base-200 min-h-screen">
        <div className="hero-content text-center">
          <div className="max-w-[720px] mt-12">
            <h1 className="text-4xl sm:text-5xl font-bold">
              Mathe-Skills Prüfungstraining
            </h1>
            <div className="flex gap-6 justify-center mt-14 mb-12">
              <>
                <Link href="/login">
                  <button className="btn btn-primary">Login</button>
                </Link>
                <Link href="/register">
                  <button className="btn btn-secondary">Registrieren</button>
                </Link>
              </>
            </div>
            <p className="py-3 text-lg">
              Inhalte für Realschule Bayern sind im Aufbau. Weitere Inhalte sind
              in Planung.
            </p>
            <p className="py-3 text-gray-600 mt-12 text-sm">
              Mit dem Rechnen von Prüfungsaufgaben kannst du deine
              mathematischen Fähigkeiten auf effektive Art verbessern. Diese
              Methode ist umso wirksamer, je selbstständiger du bist. Dazu
              bietet dir die Lernumgebung zu allen Aufgaben Musterlösungen,
              viele Beispielrechnungen zur Orientierung und einen
              vorstrukturierten Lernplan.
            </p>
            <p className="text-gray-500 mt-6 text-sm">
              <Link className="hover:underline" href="imprint">
                Impressum / Datenschutz
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}
