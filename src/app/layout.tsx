import { Inter } from 'next/font/google'

const inter = Inter({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-inter',
})

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
    <html lang="de" className={inter.className}>
      <body>
        <AppWrapper>{children}</AppWrapper>
      </body>
    </html>
  )
}
