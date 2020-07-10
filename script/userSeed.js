const faker = require('faker')
faker.seed(123)

const userSeed = []
for (let i = 0; i < 27; i++) {
  userSeed.push({
    firstName: faker.name.firstName(),
    lastName: faker.name.lastName(),
    email: faker.internet.email(),
    password: '123!'
  })
}

module.exports = userSeed
