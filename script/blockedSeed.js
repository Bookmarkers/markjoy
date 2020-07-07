const blockedUrls = [
  'www.reddit.com',
  'www.madewell.com',
  'www.nextdoor.com',
  'www.facebook.com',
  'www.twitter.com',
  'www.instagram.com'
]

const blockedSeed = []
for (let i = 0; i < blockedUrls.length; i++) {
  blockedSeed.push({
    url: blockedUrls[i]
  })
}

module.exports = blockedSeed
