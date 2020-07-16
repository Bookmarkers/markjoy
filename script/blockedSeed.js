const blockedUrls = [
  'https://www.reddit.com/',
  'https://www.madewell.com/',
  'https://nextdoor.com/',
  'https://www.facebook.com/',
  'https://twitter.com/',
  'https://www.instagram.com/'
]

const blockedSeed = []
for (let i = 0; i < blockedUrls.length; i++) {
  blockedSeed.push({
    url: blockedUrls[i]
  })
}

module.exports = blockedSeed
