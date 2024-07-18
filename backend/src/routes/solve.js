const { safeHandler } = require('../lib/safeHandler')

module.exports = (App, route) => {
  App.express.post(
    route,
    safeHandler(async (req, res) => {
      const { storyId, userId } = req.body

      if (typeof userId !== 'string' || !userId) {
        return res.json({ ok: false, reason: 'Missing user id' })
      }

      if (typeof storyId !== 'number' || !Number.isInteger(storyId)) {
        return res.json({ ok: false, reason: 'Missing story id' })
      }

      await App.db.Solve.findOrCreate({
        where: { storyId, userId },
      })

      return res.json({ ok: true })
    })
  )
}
