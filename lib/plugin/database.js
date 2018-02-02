// const get = require('lodash/get')
var Sqlite = require('better-sqlite3')
var now = require('performance-now')

class Database {
  constructor () {
    this.db = new Sqlite('foobar.db')
    this.transacting = false
    this._createTables()
    this.statements = {
      insertThread: this.db.prepare('REPLACE INTO threads (root_key) VALUES (?)')
    }
  }

  ensureTransaction () {
    if (!this.transacting) {
      this._startTransaction()
      this.transacting = true
      this.startTime = now()
    }
  }

  finishTransaction () {
    if (this.transacting) {
      this._endTransaction()
      this.transacting = false
      this.endTime = now()
      this._logElapsedTime()
    }
  }

  _logElapsedTime () {
    const elapsed = (this.endTime - this.startTime) / 1000.0
    console.log(`TRANSACTION TIME ${elapsed.toFixed(3)}s`)
  }

  _createTables () {
    this.db.prepare('CREATE TABLE IF NOT EXISTS threads (root_key string PRIMARY KEY, changed integer NULL);').run()
  }

  _startTransaction () {
    this.db.prepare('BEGIN TRANSACTION;').run()
  }

  _endTransaction () {
    this.db.prepare('END TRANSACTION;').run()
  }
}

module.exports = Database
