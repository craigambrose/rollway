const get = require('lodash/get')

function handler (database, msg) {
  const rootKey = get(msg, 'value.root') || msg.key
  database.statements.insertThread.run({
    rootKey: rootKey
  })

  database.statements.updateThreadChanged.run({
    rootKey: rootKey,
    changed: msg.timestamp
  })
}

module.exports = handler
