const { safeHandler } = require('../lib/safeHandler')
const { hashSync } = require('bcryptjs')

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

      if (name.length < 3) {
        return res.json({
          ok: false,
          reason: 'Name zu kurz, mindestens 3 Zeichen.',
        })
      }

      if (name.length > 30) {
        return res.json({
          ok: false,
          reason: 'Name zu lang, maximal 30 Zeichen.',
        })
      }

      if (password.length < 4) {
        return res.json({
          ok: false,
          reason: 'Passwort zu kurz, mindestens 4 zeichen.',
        })
      }

      try {
        // Attempt to create a new user with the given name and password
        await App.db.User.create({
          name,
          password: hashSync(password, 10),
        })

        // If the creation is successful, the name is unique.
        return res.json({ ok: true })
      } catch (error) {
        // If the creation fails due to a unique constraint violation, the name already exists.
        if (error.name === 'SequelizeUniqueConstraintError') {
          return res.json({
            ok: false,
            reason: 'Name bereits vergeben.',
          })
        } else {
          throw error
        }
      }
    })
  )
}
