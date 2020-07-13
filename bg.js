// const tree = chrome.bookmarks.getRecent(20, function(items) {
//     items.forEach(function(item) {
//       document.write(item.url);
//     });
//   });

// window.onload = function() {
//     console.log(tree)
// }

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
    // this is where we want to push each node.url + node.title into an array of objects.
    // array of objects somehow populates DB upon pressing a button.
    // end goal is not to console.log
    console.log(node)
  }
}
