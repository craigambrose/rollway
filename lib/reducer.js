
function reducer (acc, msg) {
  return {
    threads: [
      { key: msg.key }
    ]
  }
}

module.exports = reducer
