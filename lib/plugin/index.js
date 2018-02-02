// const flumeView = require('flumeview-reduce')
const flumeView = require('./flumeview_sqlite')
const handler = require('./db_handler')
const Database = require('./database')

// function handler (msg) {
//   console.log('msg', msg)
//   console.log('-------------------')
// }

const db = new Database()

module.exports = {
  name: 'rollway',
  version: '1.0.0',
  manifest: {
    rollbarStuff: 'async'
  },
  init: function (ssbServer, config) {
    console.log('*** loading rollway ***')

    const view = ssbServer._flumeUse('rollway', flumeView(
      1.0, // version
      handler,
      db
    ))
    console.log('init FlumeView', view)

    return {
      get: view.get,
      stream: view.stream
    }
  }
}
