var Drain = require('pull-stream/sinks/drain')
var Obv = require('obv')

// const sinceFunc = (...args) => {
//   console.log('called since main fun', args)
// }

// sinceFunc.once = (cb) => {
//   console.log('called since once', cb)
//   const upto = 0
//   cb(upto)
// }

const since = Obv()
since.set(-1)

module.exports = function (version, handler, database) {
  return function createView (log, name) {
    console.log('in create view func')
    return {
      since: since,
      value: function () {
        console.log('value func')
      },
      methods: {get: 'async', stream: 'source', value: 'sync'},
      get: function (opts, cb) {
        console.log('get func')
      },
      stream: function (opts) {
        console.log('stream func')
      },
      createSink: function (cb) {
        return Drain(function (data) {
          // console.log('Data', data.seq, log.since.value)
          database.ensureTransaction()
          handler(database, data.value)
          since.set(data.seq)
          if (since.value === log.since.value) database.finishTransaction()
        }, cb)
      },
      destroy: function (cb) {
        console.log('destroy func')
      },
      close: function (cb) {
        console.log('close func')
      }
    }
  }
}
