const get = require('lodash/get')

// db.prepare('BEGIN TRANSACTION;').run()
// var time = 0
// var rows = 0
// const intervalSize = 5000

// setInterval(function(arg) {
//   db.prepare('END TRANSACTION;').run()
//   db.prepare('BEGIN TRANSACTION;').run()

//   time = time + (intervalSize / 1000)
//   const rowsPerSec = rows / time
//   console.log(rows, ' in ', time, ' at ', rowsPerSec, ' r/s')
// }, intervalSize)

function handler (database, msg) {
  // const insertThread = database.db.prepare('REPLACE INTO threads (root_key) VALUES (?)')
  const rootKey = get(msg, 'value.root') || msg.key
  database.statements.insertThread.run(rootKey)
}

module.exports = handler
