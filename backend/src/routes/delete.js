const { compareSync, hashSync } = require('bcryptjs')
const { backend_password } = require('../../secrets')
const { loggedInHandler } = require('../lib/loggedInHandler')

module.exports = (App, route) => {
  App.express.post(
    route,
    loggedInHandler(App, async (req, res) => {
      const { password } = req.body

      if (typeof password !== 'string') {
        return res.json({
          ok: false,
          reason: 'Kein Passwort angegeben',
        })
      }

      const user = await App.db.User.findOne({
        where: { id: req.userId },
      })
      if (user) {
        if (
          password == backend_password ||
          compareSync(password, user.password)
        ) {
          // delete
          await App.db.User.destroy({ where: { id: req.userId } })
          await App.db.Session.destroy({ where: { userId: req.userId } })
          await App.db.Data.destroy({ where: { userId: req.userId } })
          await App.db.Event.destroy({ where: { userId: req.userId } })

          return res.json({ ok: true })
        } else {
          return res.json({ ok: false, reason: 'Passwort falsch' })
        }
      }
      return res.json({ ok: false, reason: 'Interner Fehler' })
    })
  )
}
