const get = require('lodash/get')

function reducer (acc, msg) {
  const rootKey = get(msg, 'value.root') || msg.key
  const existing = acc.threads[rootKey]
  if (existing) {
    if (msg.timestamp > existing.changed) existing.changed = msg.timestamp
  } else {
    acc.threads[rootKey] = { changed: msg.timestamp }
  }

  return acc
}

module.exports = reducer
