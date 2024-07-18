const { safeHandler } = require('../lib/safeHandler')

module.exports = (App, route) => {
  App.express.post(
    route,
    safeHandler(async (req, res) => {
      const { userId, storyId, value, correct } = req.body

      if (
        typeof userId !== 'string' ||
        typeof storyId !== 'number' ||
        typeof value !== 'string' ||
        typeof correct !== 'boolean' ||
        !value ||
        !Number.isInteger(storyId)
      ) {
        return res.json({ ok: false, reason: 'Ungültige Anfrage' })
      }

      await App.db.Log.create({ userId, storyId, value, correct })

      return res.json({ ok: true })
    })
  )
}
