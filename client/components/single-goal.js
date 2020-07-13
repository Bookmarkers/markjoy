import React from 'react'
import {Link, Redirect} from 'react-router-dom'
import {connect} from 'react-redux'
import {getSingleGoal} from '../store/singleGoal'
import {me} from '../store/user'
import {deleteGoal, updateGoal, fetchGoals} from '../store/goal'
import {fetchBookmarksByGoal, fetchBookmarks} from '../store/bookmark'
import {Card, Icon, Image, Header} from 'semantic-ui-react'

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

  render() {
    const goal = this.props.goal
    const bookmarks = this.props.bookmarks
    const goalId = this.state.goalId
    return (
      <div>
        {goal ? <h1>Goal: {goal.detail}</h1> : ''}
        {bookmarks
          ? bookmarks.map(bookmark => (
              <div key={bookmark.id}>
                <p>
                  <Header>
                    <a href={`//${bookmark.url}`}>{bookmark.url}</a>
                  </Header>
                </p>
              </div>
            ))
          : 'There are no bookmarks for this goal'}
      </div>
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
    deleteGoal: goalId => dispatch(deleteGoal(goalId)),
    updateGoal: (goalId, updateInfo) => dispatch(updateGoal(goalId, updateInfo))
  }
}

export default connect(mapState, mapDispatch)(SingleGoal)
