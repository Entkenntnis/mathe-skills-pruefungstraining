const { safeHandler } = require('../lib/safeHandler')

module.exports = (App, route) => {
  App.express.post(
    route,
    safeHandler(async (req, res) => {
      const { userId, name } = req.body

      if (typeof userId !== 'string' || typeof name !== 'string' || !name) {
        return res.json({ ok: false, reason: 'Ungültige Anfrage' })
      }

      await App.db.Name.create({ userId, name })

      return res.json({ ok: true })
    })
  )
}
