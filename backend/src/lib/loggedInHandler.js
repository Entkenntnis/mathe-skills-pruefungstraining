const { safeHandler } = require('./safeHandler')

function loggedInHandler(App, cb) {
  return safeHandler(async (req, res) => {
    const { token } = req.body

    if (typeof token !== 'string') {
      return res.json({ ok: false, reason: 'Missing token' })
    }

    const session = await App.db.Session.findOne({ where: { token } })

    if (!session) {
      return res.json({ ok: false, reason: 'Invalid token' })
    }

    req.userId = session.userId

    await cb(req, res)
  })
}

module.exports = { loggedInHandler }
