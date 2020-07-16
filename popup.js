// PLEASE KEEP THE BELOW FOR POSTERITY AND SO WE KNOW WHAT ANYTHING IS
// async function postData(url, data) {
//   console.log(data)
//   // Default options are marked with *
//   const response = await fetch(url, {
//     method: 'POST', // *GET, POST, PUT, DELETE, etc.
//     // mode: 'cors', // no-cors, *cors, same-origin
//     // cache: 'no-cache', // *default, no-cache, reload, force-cache, only-if-cached
//     // credentials: 'same-origin', // include, *same-origin, omit
//     headers: {
//       'Content-Type': 'application/json'
//     //   ,
//       // 'Content-Type': 'application/x-www-form-urlencoded',
//     //   'Accept': 'application/json'
//     },
//     // redirect: 'follow', // manual, *follow, error
//     // referrerPolicy: 'no-referrer', // no-referrer, *no-referrer-when-downgrade, origin, origin-when-cross-origin, same-origin, strict-origin, strict-origin-when-cross-origin, unsafe-url
//     body: JSON.stringify(data), // body data type must match "Content-Type" header
//   })
//   return response.json() // parses JSON response into native JavaScript objects
// }
// const ourHost = "http://markjoy.herokuapp.com"
const ourHost = 'http://localhost:8080'

let user

async function fetchUser() {
  const response = await fetch(`${ourHost}/auth/me`, {
    method: 'GET',
    headers: {
      Accept: 'application/json'
    }
  })
  const text = await response.text()
  if (text) {
    user = await JSON.parse(text)
    return user
  } else {
    user = {}
    return user
  }
}
let chromeMarks = []

window.onload = async () => {
  await fetchUser()

  chrome.bookmarks.getTree(function(itemTree) {
    itemTree.forEach(function(item) {
      processNode(item)
    })
  })

  function processNode(node) {
    if (node.children) {
      node.children.forEach(function(child) {
        processNode(child)
      })
    }
    if (node.url) {
      chromeMarks.push({
        url: node.url,
        title: node.title,
        imageUrl: node.url + 'favicon.ico',
        userId: user.id,
        categoryId: 6
      })
    }
  }
}
// POST
async function postData(url, data) {
  const response = await fetch(url, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(data)
  })
  return response.json()
}

async function massPostData(url, data) {
  const response = await fetch(url, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(data)
  })
  return response.json()
}

// PUT
async function updateData(url, data = {}) {
  // Default options are marked with *
  const response = await fetch(url, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(data) // body data type must match "Content-Type" header
  })
  return response.json() // parses JSON response into native JavaScript objects
}

// DELETE
async function deleteData(url, data = {}) {
  const response = await fetch(url, {
    method: 'DELETE',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(data)
  })
  return response.json()
}

let current = {active: true, lastFocusedWindow: true}

function deletingCallback(tabs) {
  let currentTab = tabs[0]
  deleteData('http://localhost:8080/api/bookmarks', {
    url: currentTab.url,
    userId: user.id
  }).then(data => {
    console.log(data)
  })
}

function addingCallback(tabs) {
  let currentTab = tabs[0] // there will be only one in this array
  postData('http://localhost:8080/api/bookmarks', {
    url: currentTab.url,
    title: currentTab.title,
    imageUrl: currentTab.favIconUrl,
    userId: user.id,
    categoryId: 6
  }).then(data => {
    console.log(data)
  })
}

// MARQ (add) CURRENT TAB
document.getElementById('do-mark').onclick = () => {
  chrome.tabs.query(current, addingCallback)
}

// document.getElementById('do-mark').onclick = () => {
//   console.log(currentUser)
// }

// UPDATE BOOKMARK WITH ID = 1'S TITLE TO hot tamale time
// document.getElementById('do-count').onclick = updateData('http://localhost:8080/api/bookmarks/1', {
//     title: 'hot tamale time'
// })

// DELETE CURRENT TAB FROM BOOKMARK TABLE
document.getElementById('do-delete').onclick = () => {
  chrome.tabs.query(current, deletingCallback)
}

// Just see if popup.js has access to chrome bookmarks array from bg.js
// document.getElementById('do-count').onclick = () => {console.log('this is is it', typeof chromeMarks[0])}
// document.getElementById('do-sync').onclick = () => {postData('http://localhost:8080/api/bookmarks', {
//     url: 'http://twattre.com',
//     imageUrl: 'http://twtere.com/favicon.ico',
//     title: 'not itle'
// })
// }

document.getElementById('do-sync').onclick = () =>
  massPostData('http://localhost:8080/api/bookmarks/bulk', chromeMarks)
