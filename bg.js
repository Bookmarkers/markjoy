// background script to check if the current url === database blockedUrl
// if it matches object[url] window.replace('spapage.com')

// const tree = chrome.bookmarks.getRecent(20, function(items) {
//     items.forEach(function(item) {
//       document.write(item.url);
//     });
//   });

// window.onload = function() {
//     console.log(tree)
// }

// import model
// bulk create with Promise.all
// export bg function to UI page
// maybe not even run it as a background script
// check if able to run this script frontend??
// import functionality of bg scripts into content or other pages?

let chromeMarks = []

chrome.bookmarks.getTree(function(itemTree) {
  itemTree.forEach(function(item) {
    processNode(item)
  })
})

function processNode(node) {
  // RECURSIN'
  if (node.children) {
    node.children.forEach(function(child) {
      processNode(child)
    })
  }
  // print leaf nodes URLs
  // IMPLEMENT : ADD THESE TO BOOKMARKS TABLE
  if (node.url) {
    //   let myObject = {}
    //   myObject[url] = node.url
    //   myObject[title] = node.title
    //   myObject[imageUrl] = node.url + '/favicon.ico'
    // this is where we want to push each node.url + node.title into an array of objects.
    // array of objects somehow populates DB upon pressing a button.
    // end goal is not to console.log
    chromeMarks.push({
      url: node.url,
      title: node.title,
      imageUrl: node.url + '/favicon.ico'
    })
    // chrome marks is an array of objects.
  }
  console.log(chromeMarks)
}

// export default { chromeMarks }
