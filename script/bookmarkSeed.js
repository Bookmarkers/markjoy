const faker = require('faker')
faker.seed(123)

const bookmarkUrls = [
  'www.google.com',
  'www.medium.com',
  'www.twitter.com',
  'www.instagram.com',
  'www.amazon.com',
  'www.facebook.com'
]

const bookmarkSeed = []
for (let i = 0; i < 3; i++) {
  bookmarkSeed.push({
    url: bookmarkUrls[i]
  })
}

module.exports = bookmarkSeed
