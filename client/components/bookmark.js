/* eslint-disable no-alert */
import React from 'react'
import {connect} from 'react-redux'
import {
  fetchSingleBookmark,
  fetchBookmarks,
  fetchBookmarksByCategory,
  addBookmark,
  updateBookmark,
  deleteBookmark
} from '../store/bookmark'
import {fetchGoals} from '../store/goal'
import {Button, Image, List, Popup} from 'semantic-ui-react'
import {Navbar} from './index'
import {CustomSidebar} from './sidemenu'
import BookmarkForm from './bookmark-form'

const categories = {
  '/bookmarks': 'All Bookmarks',
  '/bookmarks/category/1': 'Learning',
  '/bookmarks/category/2': 'Community',
  '/bookmarks/category/3': 'Lifestyle',
  '/bookmarks/category/4': 'Finance',
  '/bookmarks/category/5': 'Wellness',
  '/bookmarks/category/6': 'Unsorted'
}

const cleanUrl = url => {
  if (url.length > 30) {
    url = `${url.slice(0, 30)}...`
  } else {
    url = url.slice()
  }
  return url
}

export class AllBookmarks extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      path: '',
      category: '',
      isUpdate: false,
      modalOpen: false,
      success: false,
      error: '',
      bookmarkInfo: {
        title: '',
        url: '',
        categoryId: 6,
        goalId: null
      }
    }
    this.getBookmarks = this.getBookmarks.bind(this)
    this.prefill = this.prefill.bind(this)
    this.pathChanged = this.pathChanged.bind(this)
    this.toggleUpdate = this.toggleUpdate.bind(this)
    this.toggleModal = this.toggleModal.bind(this)
    this.toggleSuccess = this.toggleSuccess.bind(this)
    this.handleChange = this.handleChange.bind(this)
    this.handleGoalChange = this.handleGoalChange.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
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
    this.props.fetchGoals()
  }

  prefill() {
    const bookmark = this.props.bookmark
    if (bookmark.id) {
      this.setState({
        bookmarkInfo: {
          title: bookmark.title,
          url: bookmark.url,
          categoryId: bookmark.categoryId,
          goalId: bookmark.goalId
        }
      })
    }
  }

  pathChanged() {
    const currPath = location.pathname
    if (this.state.path !== currPath) {
      this.getBookmarks(currPath)
      this.setState({
        path: currPath,
        category: categories[currPath]
      })
    }
  }

  handleChange(e) {
    e.persist()
    this.setState(prevState => ({
      bookmarkInfo: {
        ...prevState.bookmarkInfo,
        [e.target.name]: e.target.value
      },
      success: false,
      error: ''
    }))
  }

  handleGoalChange(e) {
    e.persist()
    const goalId = e._targetInst.return.key
    this.setState(prevState => ({
      bookmarkInfo: {
        ...prevState.bookmarkInfo,
        goalId: goalId
      }
    }))
  }

  toggleUpdate(bookmark) {
    if (bookmark) {
      this.setState({
        isUpdate: true
      })
    } else {
      this.setState({
        isUpdate: false
      })
    }
  }

  toggleModal() {
    this.setState(prevState => ({modalOpen: !prevState.modalOpen}))
  }

  toggleSuccess() {
    this.setState({
      success: false
    })
  }

  handleSubmit(e) {
    e.preventDefault()
    const {title, url, categoryId, goalId} = this.state.bookmarkInfo
    const bookmarksStr = JSON.stringify(this.props.bookmarks)
    const {bookmark} = this.props
    const {isUpdate} = this.state

    const bookmarkToAddOrUpdate = {
      title: title,
      url: url,
      categoryId: categoryId,
      goalId: goalId,
      userId: this.props.user.id
    }

    if (url === '') {
      this.setState({
        error: 'Url is a required field!'
      })
    } else if (!url.includes('.')) {
      this.setState({
        error: 'It must be a valid url!'
      })
    } else if (!isUpdate && bookmarksStr.indexOf(url) > -1) {
      this.setState({
        error: 'This bookmark already exists!'
      })
    } else {
      if (isUpdate) {
        this.props.updateBookmark(bookmark.id, bookmarkToAddOrUpdate)
      } else {
        this.props.addBookmark(bookmarkToAddOrUpdate)
      }
      this.setState({
        bookmarkInfo: {
          title: '',
          url: '',
          categoryId: 6,
          goalId: null
        },
        success: true
      })
    }
  }

  render() {
    const {bookmarks} = this.props
    const {category, modalOpen, isUpdate, bookmarkInfo} = this.state
    const goalOptions = this.props.goals.map(goal => ({
      key: goal.id,
      text: goal.detail,
      value: goal.id
    }))

    return (
      <div onClick={this.pathChanged}>
        <Navbar />
        <BookmarkForm
          toggleModal={this.toggleModal}
          handleChange={this.handleChange}
          handleGoalChange={this.handleGoalChange}
          toggleSuccess={this.toggleSuccess}
          toggleUpdate={this.toggleUpdate}
          handleSubmit={this.handleSubmit}
          modalOpen={modalOpen}
          isUpdate={isUpdate}
          bookmarkInfo={bookmarkInfo}
          goalOptions={goalOptions}
          success={this.state.success}
          error={this.state.error}
        />
        <div style={{display: 'flex'}}>
          <div
            style={{
              padding: '50px',
              width: 0,
              flex: 1,
              flexDirection: 'column'
            }}
          >
            <div style={{display: 'flex'}}>
              <h1 className="title" style={{flex: 1}}>
                {category}
              </h1>
              {/* EMPTY SINGLE BOOKMARK AFTER */}
              <Button color="orange" floated="right" onClick={this.toggleModal}>
                Add Bookmark
              </Button>
              {category === 'All Bookmarks' ? (
                <Button
                  floated="right"
                  // onClick={} dispatch sync-bookmark thunk
                  content="Sync"
                  color="purple"
                />
              ) : (
                ''
              )}
            </div>
            <List animated verticalAlign="middle" style={{marginTop: '30px'}}>
              {bookmarks && bookmarks.length > 0 ? (
                bookmarks.map(bookmark => {
                  return (
                    <List.Item key={bookmark.id}>
                      <Image
                        avatar
                        src={bookmark.imageUrl}
                        className="ui image"
                      />
                      <List.Content>
                        <Popup
                          content={bookmark.url}
                          trigger={
                            <List.Header a href={`//${bookmark.url}`}>
                              {cleanUrl(bookmark.url)}
                            </List.Header>
                          }
                        />
                      </List.Content>
                      <Button
                        floated="right"
                        secondary
                        onClick={() => {
                          if (window.confirm('Delete this bookmark?')) {
                            this.props.deleteBookmark(bookmark.id)
                          }
                        }}
                      >
                        Delete
                      </Button>
                      <Button
                        floated="right"
                        color="teal"
                        onClick={() => {
                          this.props
                            .fetchSingleBookmark(bookmark.id)
                            .then(() => {
                              this.prefill()
                            })
                            .then(() => {
                              this.toggleUpdate(bookmark)
                              this.toggleModal()
                            })
                        }}
                      >
                        Edit
                      </Button>
                    </List.Item>
                  )
                })
              ) : (
                <div style={{margin: '30px 0'}}>
                  You don't have any bookmarks under this category!
                </div>
              )}
            </List>
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
    goals: state.goals.goals,
    bookmarks: state.bookmarks.bookmarks,
    bookmark: state.bookmarks.selectedBookmark,
    loading: state.bookmarks.loading
  }
}

const mapDispatch = dispatch => {
  return {
    fetchSingleBookmark: bookmarkId =>
      dispatch(fetchSingleBookmark(bookmarkId)),
    fetchBookmarks: () => dispatch(fetchBookmarks()),
    fetchBookmarksByCategory: (categoryId, userId) =>
      dispatch(fetchBookmarksByCategory(categoryId, userId)),
    addBookmark: bookmarkInfo => dispatch(addBookmark(bookmarkInfo)),
    deleteBookmark: bookmarkId => dispatch(deleteBookmark(bookmarkId)),
    updateBookmark: (bookmarkId, updateInfo) =>
      dispatch(updateBookmark(bookmarkId, updateInfo)),
    fetchGoals: () => dispatch(fetchGoals())
  }
}

export default connect(mapState, mapDispatch)(AllBookmarks)
