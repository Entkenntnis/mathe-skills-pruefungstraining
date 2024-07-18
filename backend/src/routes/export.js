const { backend_password } = require('../../secrets')
const { safeHandler } = require('../lib/safeHandler')

module.exports = (App, route) => {
  App.express.post(
    route,
    safeHandler(async (req, res) => {
      const { password } = req.body

      if (password !== backend_password) {
        return res.json({ ok: false, reason: 'Ungültige Anfrage' })
      }

      const names = await App.db.Name.findAll({
        raw: true,
      })
      const logs = await App.db.Log.findAll({
        raw: true,
      })
      const events = await App.db.Event.findAll({
        raw: true,
      })
      const solves = await App.db.Solve.findAll({
        raw: true,
      })

      return res.json({ ok: true, names, logs, solves, events })
    })
  )
}
