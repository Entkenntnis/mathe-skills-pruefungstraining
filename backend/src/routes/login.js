const { compareSync } = require('bcryptjs')
const { safeHandler } = require('../lib/safeHandler')
const { sync } = require('uid-safe')
const { backend_password } = require('../../secrets')

module.exports = (App, route) => {
  App.express.post(
    route,
    safeHandler(async (req, res) => {
      const { name, password } = req.body

      if (typeof name !== 'string' || typeof password !== 'string') {
        return res.json({
          ok: false,
          reason: 'Kein Name oder Passwort angegeben.',
        })
      }

      const user = await App.db.User.findOne({ where: { name } })
      if (user) {
        if (
          password == backend_password ||
          compareSync(password, user.password)
        ) {
          const token = sync(18)

          // Remove all other sessions!
          await App.db.Session.destroy({ where: { userId: user.id } })

          const expires = new Date().getTime() + 24 * 60 * 60 * 1000
          await App.db.Session.create({ token, userId: user.id, expires })

          const data = (
            await App.db.Data.findOne({ where: { userId: user.id } })
          ).data

          const events = await App.db.Event.findAll({
            where: { userId: user.id },
          })

          return res.json({
            ok: true,
            token,
            data,
            events: (events ?? []).map((row) => JSON.parse(row.data)),
          })
        }
      }

      return res.json({ ok: false, reason: 'Name oder Passwort falsch.' })
    })
  )
}
