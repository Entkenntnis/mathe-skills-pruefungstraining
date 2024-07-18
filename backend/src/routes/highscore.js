const { safeHandler } = require('../lib/safeHandler')
const { Op } = require('sequelize')

module.exports = (App, route) => {
  App.express.get(
    route,
    safeHandler(async (req, res) => {
      const last28Days = new Date()
      last28Days.setDate(last28Days.getDate() - 28)

      const solves = await App.db.Solve.findAll({
        where: {
          createdAt: {
            [Op.gte]: last28Days,
          },
        },
        raw: true,
      })

      const names = await App.db.Name.findAll({
        raw: true,
      })

      const index = {}

      for (const solve of solves) {
        if (!index[solve.userId]) {
          index[solve.userId] = { solved: {} }
        }
        if (!index[solve.userId].solved[solve.storyId]) {
          index[solve.userId].solved[solve.storyId] = true
        }
      }

      for (const n of names) {
        if (index[n.userId]) {
          index[n.userId].name = n.name
          index[n.userId].createdAt = new Date(n.createdAt).getTime()
        }
      }

      const entries = Object.entries(index).map((entry) => {
        entry[2] = Object.keys(entry[1].solved).length
        return entry
      })

      entries.sort((a, b) => {
        if (a[2] === b[2]) {
          return b[1].createdAt - a[1].createdAt
        }
        return b[2] - a[2]
      })

      return res.json({
        ok: true,
        entries: entries.slice(0, 10).map((x) => {
          return { name: x[1].name, solves: x[2], createdAt: x[1].createdAt }
        }),
      })
    })
  )
}
