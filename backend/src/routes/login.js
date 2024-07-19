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
          // Question: should I remove other sessions with this username? not necessary
          const expires = new Date().getTime() + 24 * 60 * 60 * 1000
          await App.db.Session.create({ token, userId: user.id, expires })
          const solved = (
            await App.db.Solved.findAll({
              where: { userId: user.id },
            })
          ).map((entry) => entry.storyId)
          // TODO pass user token and other useful data to client
          return res.json({
            ok: true,
            token,
            data: { id: user.id, name: user.name, solved },
          })
        }
      }

      return res.json({ ok: false, reason: 'Name oder Passwort falsch.' })
    })
  )
}
