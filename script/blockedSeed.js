const blockedUrls = ['www.reddit.com']

const blockedSeed = []
for (let i = 0; i < blockedUrls.length; i++) {
  blockedSeed.push({
    url: blockedUrls[i]
  })
}

module.exports = blockedSeed
