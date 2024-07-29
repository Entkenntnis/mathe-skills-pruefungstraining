import type { Metadata } from 'next'
import './globals.css'
import { AppWrapper } from '@/components/App'

export const metadata: Metadata = {
  title: 'Mathe-Skills Intensivtraining',
  description:
    'Einfache Lernumgebung mit Fokus auf Aufgaben-Rechnen und Erklärung am Beispiel',
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="de">
      <body>
        <AppWrapper>{children}</AppWrapper>
      </body>
    </html>
  )
}
