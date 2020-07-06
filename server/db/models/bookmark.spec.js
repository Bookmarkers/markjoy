/* global describe beforeEach it */

const {expect} = require('chai')
const db = require('../index')
const Bookmark = db.model('bookmark')

describe('Bookmark Model', () => {
  before(() => db.sync({force: true}))
  afterEach(() => db.sync({force: true}))

  it('has fields title, url, imageUrl', async () => {
    const bookmark = await Bookmark.create({
      title: 'Get swole AF',
      url: 'http://nerdfitness.com',
      imageUrl: '../../public/favicon.ico'
    })
    expect(bookmark.title).to.equal('Get swole AF')
    expect(bookmark.imageUrl).to.equal('../../public/favicon.ico')
    expect(bookmark.imageUrl).to.equal('http://nerdfitness.com')
  })

  it('url cannot be empty', async () => {
    const bookmark = Bookmark.build({title: '', url: ''})
    try {
      await bookmark.validate()
      throw Error('validation should have failed with empty url')
    } catch (err) {
      expect(err.message).to.contain('Validation notEmpty on url')
    }
  })

  it('default imageUrl if left blank', async () => {
    const bookmark = Bookmark.build({
      title: 'Jupiter Jumpstart',
      url: 'http://reddit.com'
    })
    await bookmark.validate()
    expect(bookmark.imageUrl).to.be.a('string')
    expect(bookmark.imageUrl.length).to.be.greaterThan(1)
  })
})
