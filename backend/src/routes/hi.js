const { safeHandler } = require('../lib/safeHandler')

module.exports = (App, route) => {
  App.express.get(
    route,
    safeHandler(async (req, res) => {
      return res.json({ ok: true })
    })
  )
}
