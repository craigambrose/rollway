const reducer = require('../lib/reducer')
const expect = require('expect.js')

function buildRootPost (key) {
  return {
    key: key,
    value: { type: 'post', text: 'Introducing myself' }
  }
}

describe('reducer()', function () {
  describe('with posts', function () {
    it('handles a single root post', function () {
      const post = buildRootPost('intro')
      const result = reducer({}, post)

      expect(result.threads).to.eql([
        { key: 'intro' }
      ])
    })
  })
})
