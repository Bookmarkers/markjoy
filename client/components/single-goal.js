import React from 'react'
import {connect} from 'react-redux'
import {setGoal, getSingleGoal} from '../store/singleGoal'
import ErrorMessage from './error-message'
import {me} from '../store/user'
import {deleteGoal, updateGoal, fetchGoals} from '../store/goal'
import {
  setBookmarks,
  fetchBookmarksByGoal,
  fetchBookmarks,
  deleteBookmark
} from '../store/bookmark'
import {Item, Button, Icon, Popup} from 'semantic-ui-react'
import {Navbar} from './index'
import {CustomSidebar} from './sidemenu'

const cleanUrl = url => {
  if (url.length > 30) {
    url = `${url.slice(0, 30)}...`
  } else {
    url = url.slice()
  }
  return url
}

const cleanTitle = title => {
  if (title.length > 70) {
    title = `${title.slice(0, 70)}...`
  } else {
    title = title.slice()
  }
  return title
}

export class SingleGoal extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      goalId: this.props.match.params.id
    }
  }

  componentDidMount() {
    this.props.getSingleGoal(this.state.goalId)
    this.props.getGoals()
    this.props.getBookmarksByGoal(this.state.goalId)
  }

  componentWillUnmount() {
    this.props.setGoal({goal: {}})
    this.props.setBookmarks([])
  }

  render() {
    const goal = this.props.goal.goal
    const goalError = this.props.goal.error
    const bookmarks = this.props.bookmarks

    return (
      <div>
        <Navbar />
        <div style={{display: 'flex', height: '100vh'}}>
          <div style={{flex: 1, padding: '50px'}}>
            {goalError ? (
              <ErrorMessage />
            ) : (
              <Item.Group relaxed>
                <Item>
                  <Item.Content>
                    {goal ? <h1>GOAL: {goal.detail}</h1> : ''}
                    <Item.Header>
                      Here are the bookmarks you saved for this goal:{' '}
                    </Item.Header>
                    <Item.Extra style={{marginTop: '40px'}}>
                      {bookmarks.length > 0
                        ? bookmarks.map(bookmark => (
                            <div key={bookmark.id}>
                              <Item.Description>
                                <Icon name="like" />
                                <Popup
                                  content={bookmark.url}
                                  trigger={
                                    // eslint-disable-next-line react/jsx-no-target-blank
                                    <a
                                      target="_blank"
                                      href={`//${bookmark.url}`}
                                    >
                                      {bookmark.title.length > 0
                                        ? cleanTitle(bookmark.title)
                                        : cleanUrl(bookmark.url)}
                                    </a>
                                  }
                                />
                                <Item.Extra>
                                  <Button
                                    floated="right"
                                    onClick={() =>
                                      this.props.deleteBookmark(bookmark.id)
                                    }
                                    content="Delete"
                                    secondary
                                  />
                                </Item.Extra>
                              </Item.Description>
                            </div>
                          ))
                        : 'There are no bookmarks for this goal yet!'}
                    </Item.Extra>
                  </Item.Content>
                </Item>
              </Item.Group>
            )}
          </div>
          <CustomSidebar />
        </div>
      </div>
    )
  }
}

const mapState = state => {
  return {
    goal: state.goal,
    user: state.user,
    bookmarks: state.bookmarks.bookmarks
  }
}

const mapDispatch = dispatch => {
  return {
    setGoal: goal => dispatch(setGoal(goal)),
    getGoals: () => dispatch(fetchGoals()),
    getSingleGoal: id => dispatch(getSingleGoal(id)),
    getUser: () => dispatch(me()),
    setBookmarks: bookmarks => dispatch(setBookmarks(bookmarks)),
    getBookmarks: () => dispatch(fetchBookmarks()),
    getBookmarksByGoal: goalId => dispatch(fetchBookmarksByGoal(goalId)),
    deleteBookmark: bookmarkId => dispatch(deleteBookmark(bookmarkId)),
    deleteGoal: goalId => dispatch(deleteGoal(goalId)),
    updateGoal: (goalId, updateInfo) => dispatch(updateGoal(goalId, updateInfo))
  }
}

export default connect(mapState, mapDispatch)(SingleGoal)
