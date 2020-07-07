const faker = require('faker')
faker.seed(123)

const goalExamples = [
  'Get swoll',
  'Brush teeth thrice a day',
  'Eating more apples',
  "Looking up whether I'm allergic to apples",
  'Save for Disneyland Tokyo',
  'Survive 2020',
  'Drink more H20',
  'Go on a date with a hottie',
  'Stop being so shallow',
  'Do not consume twitter',
  'Read five books about healthy finances',
  'Learn to do your own taxes',
  'Begin a college fund for each of your children',
  'Build up an emergency or rainy day fund',
  'Start a family vacation fund',
  'Work toward an excellent credit score',
  'Pay off your student loan debt',
  'Pay off all credit card debt',
  'Max out your IRA contribution',
  'Buy your own home and pay off the mortgage'
]

const goalSeed = []
for (let i = 0; i < goalExamples.length; i++) {
  goalSeed.push({
    detail: faker.random.arrayElement(goalExamples)
  })
}

module.exports = goalSeed
