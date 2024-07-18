const { safeHandler } = require('../lib/safeHandler')

module.exports = (App, route) => {
  App.express.post(
    route,
    safeHandler(async (req, res) => {
      const { userId, value } = req.body

      if (
        typeof userId !== 'string' ||
        typeof value !== 'string' ||
        !value ||
        !userId
      ) {
        return res.json({ ok: false, reason: 'Ungültige Anfrage' })
      }

      await App.db.Event.create({ userId, value })

      return res.json({ ok: true })
    })
  )
}
