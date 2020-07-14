import React from 'react'
import {connect} from 'react-redux'
import {getSingleGoal} from '../store/singleGoal'
import {me} from '../store/user'
import {deleteGoal, updateGoal, fetchGoals} from '../store/goal'
import {
  fetchBookmarksByGoal,
  fetchBookmarks,
  deleteBookmark
} from '../store/bookmark'
import {Item, Button, Icon, Container} from 'semantic-ui-react'

//single-goal should have:
//1)edit goal button and remove bookmark button
//2)list of all bookmarks associated with that goal

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
    this.props.getBookmarks()
    this.props.getBookmarksByGoal(this.state.goalId)
  }
  //Missing a route to delete bookmarks under single-goal view?
  render() {
    const goal = this.props.goal
    const bookmarks = this.props.bookmarks
    //const goalId = this.state.goalId
    return (
      <Container>
        <Item.Group relaxed>
          <Item>
            <Item.Content>
              {goal ? <h1>GOAL: {goal.detail}</h1> : ''}
              <Item.Header>
                Here are the bookmarks you saved for this goal:{' '}
              </Item.Header>
              <Item.Extra>
                {bookmarks
                  ? bookmarks.map(bookmark => (
                      <div key={bookmark.id}>
                        <Item.Description>
                          <Icon name="like" />
                          <a href={`//${bookmark.url}`}>{bookmark.url}</a>
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
                  : 'There are no bookmarks for this goal'}
              </Item.Extra>
            </Item.Content>
          </Item>
        </Item.Group>
      </Container>
    )
  }
}

const mapState = state => {
  return {
    goal: state.goal.goal,
    user: state.user,
    bookmarks: state.bookmarks
  }
}

const mapDispatch = dispatch => {
  return {
    getGoals: () => dispatch(fetchGoals()),
    getSingleGoal: id => dispatch(getSingleGoal(id)),
    getUser: () => dispatch(me()),
    getBookmarks: () => dispatch(fetchBookmarks()),
    getBookmarksByGoal: goalId => dispatch(fetchBookmarksByGoal(goalId)),
    deleteBookmark: bookmarkId => dispatch(deleteBookmark(bookmarkId)),
    deleteGoal: goalId => dispatch(deleteGoal(goalId)),
    updateGoal: (goalId, updateInfo) => dispatch(updateGoal(goalId, updateInfo))
  }
}

export default connect(mapState, mapDispatch)(SingleGoal)
