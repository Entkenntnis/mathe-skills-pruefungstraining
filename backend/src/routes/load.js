const { loggedInHandler } = require('../lib/loggedInHandler')

module.exports = (App, route) => {
  App.express.post(
    route,
    loggedInHandler(App, async (req, res) => {
      const result = await App.db.Data.findOne({
        where: { userId: req.userId },
      })

      if (result && result.data) {
        return res.json({ ok: true, data: result.data })
      }

      return res.json({
        ok: false,
        reason: 'Interner Fehler: Kein Daten-Eintrag gefunden.',
      })
    })
  )
}
