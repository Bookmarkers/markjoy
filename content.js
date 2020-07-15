// const text = document.querySelectorAll('h1, h2, h3, h4, h5, p, li, td, caption, span, a')

// for (let i = 0; i < text.length; i++) {
//     if (text[i].innerHTML.includes('President Donald Trump')) {
//         text[i].innerHTML = text[i].innerHTML.replace('President Donald Trump', 'The Dark Lord')
// }
// const blockedUrls = ['twitter.com', 'instagram.com']

// const blockedUrls =
// window.localStorage.setItem('blockedUrls', chrome.extension.getURL('main.js'))

// Logic implementation: no one can block the redirect page cause it can cause infinite loop and doesn't make sense.
// I.e. need to check if user is blocking our SPA page and/or the redirection page and not allow for it in the model?
// logic problem 2: correctly match against the canonicalized URLs stored in bookmarks created with the bookmarks API.
// i.e. trimming or adding of forward slashes for regexing the url later.

// very finnicky about where they are
// findall then find one specific one
// callback function for an event firing.
// background script instead of the main content script?
// popup.js

// expecting a return promise
// async await
// pass in string for the gettree

// const ourHost = "http://markjoy.herokuapp.com"
const ourHost = 'http://localhost:8080'

window.onload = async function() {
  function fetchHappen() {
    fetch(`${ourHost}/auth/me`, {
      method: 'GET',
      headers: {
        Accept: 'application/json'
      }
    })
      .then(response => response.json())
      .then(data => data.id)
      .then(userId => {
        fetch(`${ourHost}/api/blocked/user/${userId}`, {
          method: 'GET',
          headers: {
            Accept: 'application/json'
          }
        })
          .then(response => response.json())
          .then(data => data.map(blocked => blocked.url))
          .then(blockedUrls =>
            window.localStorage.setItem(
              'blockedUrls',
              JSON.stringify(blockedUrls)
            )
          )
      })
  }

  await fetchHappen()

  if (window.location.href.indexOf('twitter.com') > -1) {
    // if (blockedUrls.includes(window.location.href)) {
    window.location.replace('http://localhost:8080')
    // alert("your url contains the name twitter");
  }
  //         window.location.replace('https://developer.mozilla.org/en-US/docs/Web/API/Location.reload');
  //     }
}
