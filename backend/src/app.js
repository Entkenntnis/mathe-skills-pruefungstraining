module.exports = (App) => {
  void (async function start() {
    await App.db.sync({})
    App.express.listen(3222, () => {
      console.log('server started on port 3222')
    })
  })()
}
