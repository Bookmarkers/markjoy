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

    const header = (goals, size) => (
      <Item.Header
        style={{
          fontWeight: '800',
          lineHeight: '50px',
          fontSize: size === 'tablet' ? '8vw' : '3.3vw',
          margin: '100px -50px',
          padding: '0 30px',
          textAlign: size === 'tablet' ? 'left' : 'center'
        }}
      >
        {goals[0].detail}
      </Item.Header>
    )

    return this.props.loading ? (
      <div className="ui active loader" />
    ) : (
      <div>
        <Navbar />
        <div style={{display: 'flex', height: '100vh'}}>
          <div style={{flex: 1, padding: '50px'}}>
            {goals.length > 0 ? (
              <div style={{textAlign: 'center'}}>
                <Responsive maxWidth={Responsive.onlyTablet.minWidth - 1}>
                  <h3 style={{fontSize: '4vw'}}>
                    Welcome back, {user.firstName}
                  </h3>
                </Responsive>
                <Responsive minWidth={Responsive.onlyTablet.minWidth}>
                  <h3 style={{fontSize: '2.5vw'}}>
                    Welcome back, {user.firstName}
                  </h3>
                </Responsive>
                <p>Here's a goal for you today:</p>
                <Item.Content>
                  <Responsive maxWidth={Responsive.onlyTablet.minWidth - 1}>
                    {header(goals, 'tablet')}
                  </Responsive>
                  <Responsive minWidth={Responsive.onlyTablet.minWidth}>
                    {header(goals, 'desktop')}
                  </Responsive>
                  <Item.Extra>
                    <Item.Description>
                      <Item.Meta>
                        Here's something to help with this goal:
                      </Item.Meta>
                      {goalBookmarks[randomNum] &&
                      goalBookmarks[randomNum].id ? (
                        <div
                          key={goalBookmarks[randomNum].id}
                          style={{marginTop: '25px', fontSize: '2vw'}}
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
                          onClick={() =>
                            this.handleShuffleClick(randomNum, goalBookmarks)
                          }
                          content="Shuffle"
                          style={{
                            backgroundColor: '#FFB000',
                            color: 'black',
                            marginTop: '30px'
                          }}
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
    goals: state.goals.goals,
    loading: state.goals.loading,
    bookmarks: state.bookmarks.bookmarks,
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
