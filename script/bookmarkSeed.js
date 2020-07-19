const faker = require('faker')
faker.seed(123)

const bookmarkUrls = [
  'https://google.com',
  'https://medium.com',
  'https://twitter.com',
  'https://instagram.com',
  'https://amazon.com',
  'https://facebook.com',
  'https://cnn.com',
  'https://bbc.com',
  'https://nytimes.com'
]

const bookmarkSeed = []
for (let i = 0; i < bookmarkUrls.length; i++) {
  bookmarkSeed.push({
    url: bookmarkUrls[i],
    categoryId: 6
  })
}

module.exports = bookmarkSeed
