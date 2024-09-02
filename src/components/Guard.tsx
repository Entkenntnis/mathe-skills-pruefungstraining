import Link from 'next/link'
import { useApp } from './App'

export function Guard() {
  const app = useApp()
  if (!app.init) {
    return null
  }
  return (
    <div className="modal modal-open" role="dialog">
      <div className="modal-box">
        <h3 className="text-lg font-bold">Hinweis</h3>
        <p className="py-4">Bitte melde dich an, um diese Seite zu nutzen.</p>
        <div className="modal-action">
          <Link href="/login">
            <button className="btn btn-primary">Zum Login</button>
          </Link>
        </div>
      </div>
    </div>
  )
}
