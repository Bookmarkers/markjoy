import React from 'react'
import {connect} from 'react-redux'
import {fetchBookmarks, addBookmark, deleteBookmark} from '../redux/bookmarks'

export class AllBookmarks extends React.Component {
  componentDidMount() {
    this.props.getBookmarks()
  }

  render() {
    const bookmarks = this.props.bookmarks

    return (
      <div className="container">
        <p className="title">All Bookmarks</p>
        <div id="all-bookmarks-view">
          {bookmarks && bookmarks.length > 0
            ? bookmarks.map(bookmark => {
                return (
                  <div className="single-bookmark" key={bookmark.id}>
                    <div className="bookmark-card">{bookmark.title}</div>
                    <button
                      type="button"
                      className="delete"
                      onClick={() => this.props.deleteBookmark(bookmark.id)}
                    >
                      X
                    </button>
                  </div>
                )
              })
            : 'No Bookmarks'}
        </div>
      </div>
    )
  }
}

const mapState = state => {
  return {
    bookmarks: state.bookmarks
  }
}

const mapDispatch = dispatch => {
  return {
    getBookmarks: () => dispatch(fetchBookmarks()),
    addBookmark: bookmarkInfo => dispatch(addBookmark(bookmarkInfo)),
    deleteBookmark: bookmarkId => dispatch(deleteBookmark(bookmarkId))
  }
}

export default connect(mapState, mapDispatch)(AllBookmarks)
