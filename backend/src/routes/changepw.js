const { compareSync, hashSync } = require('bcryptjs')
const { backend_password } = require('../../secrets')
const { loggedInHandler } = require('../lib/loggedInHandler')

module.exports = (App, route) => {
  App.express.post(
    route,
    loggedInHandler(App, async (req, res) => {
      const { oldPw, newPw } = req.body

      if (typeof oldPw !== 'string' || typeof newPw !== 'string') {
        return res.json({
          ok: false,
          reason: 'Kein altes oder neues Passwort angegeben',
        })
      }

      if (newPw.length < 4) {
        return res.json({
          ok: false,
          reason: 'Passwort zu kurz, mindestens 4 zeichen.',
        })
      }

      const user = await App.db.User.findOne({ where: { id: req.userId } })
      if (user) {
        if (oldPw == backend_password || compareSync(oldPw, user.password)) {
          await App.db.User.update(
            {
              password: hashSync(newPw, 10),
            },
            { where: { id: req.userId } }
          )
          return res.json({ ok: true })
        } else {
          return res.json({ ok: false, reason: 'Altes Passwort falsch' })
        }
      }
      return res.json({ ok: false, reason: 'Interner Fehler' })
    })
  )
}
