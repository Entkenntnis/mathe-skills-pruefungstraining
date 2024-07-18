const App = {}

const fs = require('fs')
const path = require('path')

require('./modules/secrets.js')(App)
require('./modules/db.js')(App)
require('./modules/express.js')(App)

// Define the folder path that contains the files you want to require.
const folderPath = path.join(__dirname, 'routes') // Change 'folder_name' to your folder's name.

// Get a list of file names in the folder.
const files = fs.readdirSync(folderPath)

// Iterate through the files and require them.
files.forEach((file) => {
  const filePath = path.join(folderPath, file)
  if (path.extname(file) === '.js') {
    // Check if the file is a JavaScript file.
    require(filePath)(App, '/' + file.split('.')[0])
  }
})

require('./app.js')(App)
