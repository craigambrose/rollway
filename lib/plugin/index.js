const flumeView = require('flumeview-reduce')
const reducer = require('../reducer')
// const pull = require('pull-stream')

module.exports = {
  name: 'rollway',
  version: '1.0.0',
  manifest: {
    get: 'async',
    stream: 'source'
  },
  init: function (ssbServer, config) {
    console.log('*** loading rollway ***')

    const view = ssbServer._flumeUse('rollway', flumeView(
      1.0, // version
      reducer,
      (msg) => msg,  // map
      null, // codec
      initialState()
    ))
    console.log('init FlumeView', view)

    return {
      get: view.get,
      stream: view.stream
    }
  }
}

function initialState () {
  return {
    total: 0
  }
}
