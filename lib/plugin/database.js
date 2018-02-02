// const get = require('lodash/get')
var Sqlite = require('better-sqlite3')
var now = require('performance-now')

class Database {
  constructor () {
    this.db = new Sqlite('foobar.db')
    this.transacting = false
    this._createTables()
    this.statements = {
      insertThread: this.db.prepare('INSERT OR IGNORE INTO threads (root_key, changed) VALUES (:rootKey, 0)'),
      updateThreadChanged: this.db.prepare(
        `UPDATE threads
         SET changed = :changed
         WHERE root_key = :rootKey
           AND changed < :changed`
      )
    }
  }

  ensureTransaction () {
    if (!this.transacting) {
      this._startTransaction()
      this.transacting = true
      this.startTime = now()
    } else {
      if (this._elapsedTime() > 5.0) {
        this.finishTransaction()
      }
    }
  }

  finishTransaction () {
    if (this.transacting) {
      this._endTransaction()
      this.transacting = false
      this._logElapsedTime()
    }
  }

  _elapsedTime () {
    const endTime = now()
    return (endTime - this.startTime) / 1000.0
  }

  _logElapsedTime () {
    const elapsed = this._elapsedTime()
    console.log(`TRANSACTION TIME ${elapsed.toFixed(3)}s`)
  }

  _createTables () {
    this.db.exec(`
      CREATE TABLE IF NOT EXISTS threads
        (
          root_key string PRIMARY KEY,
          changed integer NOT NULL
        );
    `)
  }

  _startTransaction () {
    this.db.prepare('BEGIN TRANSACTION;').run()
  }

  _endTransaction () {
    this.db.prepare('END TRANSACTION;').run()
  }
}

module.exports = Database
