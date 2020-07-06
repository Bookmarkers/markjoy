/* global describe beforeEach it */

const {expect} = require('chai')
const db = require('../index')
const Goal = db.model('goal')

describe('Goal Model', () => {
  before(() => db.sync({force: true}))
  afterEach(() => db.sync({force: true}))

  it('has fields goal and active', async () => {
    const goal = await Goal.create({
      goal: 'Dance in the moonlight',
      active: true
    })
    expect(goal.goal).to.equal('Get swole AF')
    expect(goal.active).to.equal(true)
  })

  it('goal cannot be empty', async () => {
    const goal = Goal.build({goal: ''})
    try {
      await goal.validate()
      throw Error('validation should have failed with empty goal')
    } catch (err) {
      expect(err.message).to.contain('Validation notEmpty on goal')
    }
  })

  it('defaults to active:true if left blank', async () => {
    const goal = Goal.build({
      title: 'Jumping Jack Master'
    })
    await goal.validate()
    expect(goal.title).to.be.a('string')
    expect(goal.active).to.equal(true)
  })
})
