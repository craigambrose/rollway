const reducer = require('../lib/reducer')
const expect = require('expect.js')

function initial () {
  return {
    threads: {}
  }
}

function buildRootPost (key, timestamp = 1) {
  return {
    key,
    timestamp,
    value: { type: 'post', text: 'Introducing myself' }
  }
}

function buildChildPost (key, rootKey, timestamp = 1) {
  return {
    key,
    timestamp,
    value: { type: 'post', text: 'Introducing myself', root: rootKey }
  }
}

describe('reducer()', function () {
  describe('with posts', function () {
    it('handles a single root post', function () {
      var result = initial()
      result = reducer(result, buildRootPost('intro', 1))

      expect(result.threads).to.eql({
        intro: { changed: 1 }
      })
    })

    it('appends a second root post', function () {
      var result = initial()
      result = reducer(result, buildRootPost('first', 1))
      result = reducer(result, buildRootPost('second', 2))

      expect(result.threads).to.eql({
        'first': { changed: 1 },
        'second': { changed: 2 }
      })
    })

    it('creates a reference with non root post', function () {
      var result = initial()
      result = reducer(result, buildChildPost('child', 'myroot', 23))

      expect(result.threads).to.eql({
        myroot: { changed: 23 }
      })
    })

    it('updates an existing timestamp', function () {
      var result = initial()
      result = reducer(result, buildChildPost('child', 'myroot', 23))
      result = reducer(result, buildChildPost('child', 'myroot', 40))

      expect(result.threads).to.eql({
        myroot: { changed: 40 }
      })
    })

    it('always uses the largest timestamp', function () {
      var result = initial()
      result = reducer(result, buildChildPost('child', 'myroot', 40))
      result = reducer(result, buildChildPost('child', 'myroot', 20))

      expect(result.threads).to.eql({
        myroot: { changed: 40 }
      })
    })
  })
})
