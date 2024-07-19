import type { Metadata } from 'next'
import './globals.css'
import { AppWrapper } from '@/components/App'

export const metadata: Metadata = {
  title: 'Meine Mathe-Skills',
  description: 'Übungs-Tool für Mathematik, hauptsächlich Realschule Bayern',
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
