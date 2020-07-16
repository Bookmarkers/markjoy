import React from 'react'
import {connect} from 'react-redux'
import {Navbar} from './index'
import {CustomSidebar} from './sidemenu'
import {fetchGoals} from '../store/goal'
import {fetchBookmarks} from '../store/bookmark'
import {fetchBlocked} from '../store/blocked'
import {Item, Button, Responsive} from 'semantic-ui-react'

/**
 * COMPONENT
 */
export class UserHome extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      randomNum: 0
    }
    this.handleShuffleClick = this.handleShuffleClick.bind(this)
  }

  componentDidMount() {
    this.props.fetchGoals()
    this.props.fetchBookmarks()
    this.props.fetchBlocked(this.props.user.id)
  }

  handleShuffleClick(prevNum, goalBookmarks) {
    let randomNum = prevNum
    if (goalBookmarks.length > 1) {
      while (randomNum === prevNum) {
        randomNum = Math.floor(Math.random() * goalBookmarks.length)
      }
    }
    this.setState({randomNum})
  }

  render() {
    const randomNum = this.state.randomNum
    const {user, goals, bookmarks, blocked} = this.props

    const goalBookmarks = bookmarks.filter(bookmark => {
      if (goals[0] && goals[0].id) {
        return bookmark.goalId === goals[0].id
      }
    })

    const blockedUrls = blocked.map(block => block.url)
    window.localStorage.removeItem('blockedUrls')
    window.localStorage.setItem('blockedUrls', JSON.stringify(blockedUrls))

    return (
      <div>
        <Navbar />
        <div style={{display: 'flex', height: '100vh'}}>
          <div style={{flex: 1, padding: '50px'}}>
            {goals.length > 0 ? (
              <div style={{textAlign: 'center'}}>
                <h3>Welcome back, {user.firstName}</h3>
                <p>Here's a goal for you today:</p>
                <Item.Content>
                  <Item.Header
                    style={{
                      fontWeight: '800',
                      fontSize: '2em',
                      margin: '50px -50px'
                    }}
                  >
                    {goals[0].detail}
                  </Item.Header>
                  <Item.Extra>
                    <Item.Description>
                      <Item.Meta>
                        Here's something to help with this goal:
                      </Item.Meta>
                      {goalBookmarks[randomNum] &&
                      goalBookmarks[randomNum].id ? (
                        <div
                          key={goalBookmarks[randomNum].id}
                          style={{marginTop: '25px'}}
                        >
                          <a href={goalBookmarks[randomNum].url}>
                            {goalBookmarks[randomNum].url}
                          </a>
                        </div>
                      ) : (
                        <div style={{marginTop: '25px'}}>
                          You don't have bookmarks for this goal yet! Add one{' '}
                          <a href="/bookmarks">here</a>
                        </div>
                      )}
                      {goalBookmarks.length > 0 ? (
                        <Button
                          floated="right"
                          onClick={() =>
                            this.handleShuffleClick(randomNum, goalBookmarks)
                          }
                          content="Shuffle"
                          color="teal"
                        />
                      ) : (
                        ''
                      )}
                    </Item.Description>
                  </Item.Extra>
                </Item.Content>
              </div>
            ) : (
              <div style={{textAlign: 'center'}}>
                <h3>Welcome to bookmarq, {user.firstName}</h3>
                <h4>You don't have any goal yet!</h4>
                <p>
                  Set your very first goal <a href="/goals">here</a>
                </p>
              </div>
            )}
          </div>
          <CustomSidebar />
        </div>
      </div>
    )
  }
}

/**
 * CONTAINER
 */
const mapState = state => {
  return {
    user: state.user,
    goals: state.goals,
    bookmarks: state.bookmarks,
    blocked: state.blocked
  }
}

const mapDispatch = dispatch => {
  return {
    fetchGoals: () => dispatch(fetchGoals()),
    fetchBookmarks: () => dispatch(fetchBookmarks()),
    fetchBlocked: userId => dispatch(fetchBlocked(userId))
  }
}

export default connect(mapState, mapDispatch)(UserHome)
