const { loggedInHandler } = require('../lib/loggedInHandler')

module.exports = (App, route) => {
  App.express.post(
    route,
    loggedInHandler(App, async (req, res) => {
      const { data } = req.body

      if (typeof data !== 'string' || data.length == 0 || data.length > 9999) {
        return res.json({
          ok: false,
          reason: 'Interner Fehler: Daten fehlen oder ungültig',
        })
      }
      if (req.userId) {
        await App.db.Event.create({ data, userId: req.userId })
        return res.json({ ok: true })
      }

      return res.json({
        ok: false,
        reason: 'Interner Fehler: Kein Daten-Eintrag gefunden.',
      })
    })
  )
}
