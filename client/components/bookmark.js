import React from 'react'
import {connect} from 'react-redux'
import {fetchBookmarks, addBookmark, deleteBookmark} from '../store/bookmark'
import {Grid, Button, Image} from 'semantic-ui-react'
import {Navbar} from './index'
import {CustomSidebar} from './sidemenu'

export class AllBookmarks extends React.Component {
  componentDidMount() {
    this.props.getBookmarks()
  }

  render() {
    const bookmarks = this.props.bookmarks

    return (
      <div>
        <Navbar />
        <div style={{display: 'flex', height: '100vh'}}>
          <div className="container" style={{padding: '50px'}}>
            <Button
              floated="right"
              // onClick={} dispatch sync-bookmark thunk
              content="Sync"
              color="teal"
            />
            <h1 className="title">All Bookmarks</h1>
            <div id="all-bookmarks-view" className="ui-grid">
              <Grid columns={4} relaxed="very" align="center">
                {bookmarks && bookmarks.length > 0
                  ? bookmarks.map(bookmark => {
                      return (
                        <div className="column" key={bookmark.id}>
                          <img src="/default.png" className="ui image" />
                        </div>
                      )
                    })
                  : 'No Bookmarks'}
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
