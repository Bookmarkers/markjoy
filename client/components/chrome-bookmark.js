import React from 'react'
import {connect} from 'react-redux'

export class ChromeBookmarks extends React.Component {
  componentDidMount() {
    chrome.bookmarks.getRecent(8, function(list) {
      let obj = {}
    })
  }

  render() {
    function onFulfilled(bookmarks) {
      console.log(bookmarks)
    }

    function onRejected(error) {
      console.log(`An error: ${error}`)
    }

    var gettingBookmarks = chrome.bookmarks.get(1)
    gettingBookmarks.then(onFulfilled, onRejected)
  }
}

const mapState = state => {
  return {
    // state = chrome.bookmarks
  }
}

const mapDispatch = dispatch => {
  return {}
}

export default connect(mapState, mapDispatch)(ChromeBookmarks)
