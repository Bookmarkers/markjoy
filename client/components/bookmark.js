import React from 'react'
import {connect} from 'react-redux'
import {
  fetchBookmarks,
  fetchBookmarksByCategory,
  addBookmark,
  deleteBookmark
} from '../store/bookmark'
import {Grid, Button, Image} from 'semantic-ui-react'
import {Navbar} from './index'
import {CustomSidebar} from './sidemenu'
import AddBookmark from './create-or-update-bookmark'

const titles = {
  '/bookmarks': 'All Bookmarks',
  '/bookmarks/category/1': 'Learning',
  '/bookmarks/category/2': 'Community',
  '/bookmarks/category/3': 'Lifestyle',
  '/bookmarks/category/4': 'Finance',
  '/bookmarks/category/5': 'Wellness',
  '/bookmarks/category/6': 'Unsorted'
}

export class AllBookmarks extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      path: '',
      title: ''
    }
    this.getBookmarks = this.getBookmarks.bind(this)
    this.pathChanged = this.pathChanged.bind(this)
  }

  getBookmarks(path) {
    let category
    if ('123456'.includes(path.split('/')[0])) {
      const paths = path.split('/')
      category = parseInt(paths[paths.length - 1], 10)
    }
    if (category) {
      this.props.fetchBookmarksByCategory(category)
    } else {
      this.props.fetchBookmarks()
    }
  }

  componentDidMount() {
    this.pathChanged()
  }

  pathChanged() {
    const currPath = location.pathname
    if (this.state.path !== currPath) {
      this.getBookmarks(currPath)
      this.setState({
        path: currPath,
        title: titles[currPath]
      })
    }
  }

  render() {
    const bookmarks = this.props.bookmarks
    const title = this.state.title

    return (
      <div onClick={this.pathChanged}>
        <Navbar />
        <div style={{display: 'flex', height: '100vh'}}>
          <div
            className="container"
            style={{padding: '50px', flex: 1, flexDirection: 'column'}}
          >
            <h1 className="title">{title}</h1>
            <AddBookmark />
            <Button
              floated="right"
              // onClick={} dispatch sync-bookmark thunk
              content="Sync"
              color="teal"
            />
            <div
              id="all-bookmarks-view"
              className="ui-grid"
              style={{margin: '50px 0'}}
            >
              <Grid doubling columns={4} relaxed="very" align="center">
                {bookmarks && bookmarks.length > 0 ? (
                  bookmarks.map(bookmark => {
                    return (
                      <div
                        className="column"
                        key={bookmark.id}
                        style={{margin: 0}}
                      >
                        <img src="/default.png" className="ui image" />
                      </div>
                    )
                  })
                ) : (
                  <div style={{margin: '30px'}}>
                    You don't have any bookmarks under this category!
                  </div>
                )}
              </Grid>
            </div>
          </div>
          <CustomSidebar />
        </div>
      </div>
    )
  }
}

const mapState = state => {
  return {
    user: state.user,
    bookmarks: state.bookmarks
  }
}

const mapDispatch = dispatch => {
  return {
    fetchBookmarks: () => dispatch(fetchBookmarks()),
    fetchBookmarksByCategory: (categoryId, userId) =>
      dispatch(fetchBookmarksByCategory(categoryId, userId)),
    addBookmark: bookmarkInfo => dispatch(addBookmark(bookmarkInfo)),
    deleteBookmark: bookmarkId => dispatch(deleteBookmark(bookmarkId))
  }
}

export default connect(mapState, mapDispatch)(AllBookmarks)
