/* global describe beforeEach it */

const {expect} = require('chai')
const db = require('../index')
const Goal = db.model('goal')

// describe('Goal Model', () => {
//   before(() => db.sync({force: true}))
//   afterEach(() => db.sync({force: true}))

//   it('has fields detail and active', async () => {
//     const goal = await Goal.create({
//       detail: 'Dance in the moonlight',
//       active: true
//     })
//     expect(goal.detail).to.equal('Get swole AF')
//     expect(goal.active).to.equal(true)
//   })

//   it('detail cannot be empty', async () => {
//     const goal = Goal.build({detail: ''})
//     try {
//       await goal.validate()
//       throw Error('validation should have failed with empty detail')
//     } catch (err) {
//       expect(err.message).to.contain('Validation notEmpty on detail')
//     }
//   })

//   it('defaults to active:true if left blank', async () => {
//     const goal = Goal.build({
//       detail: 'Jumping Jack Master'
//     })
//     await goal.validate()
//     expect(goal.detail).to.be.a('string')
//     expect(goal.active).to.equal(true)
//   })
// })
