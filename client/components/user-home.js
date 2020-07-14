import React, {useState, useEffect} from 'react'
import {connect} from 'react-redux'
// import {AllBookmarks} from './bookmark'
import {Navbar} from './index'
import {CustomSidebar} from './sidemenu'
import {fetchGoals} from '../store/goal'
import {fetchBookmarks} from '../store/bookmark'
import {Item, Button, Responsive} from 'semantic-ui-react'

/**
 * COMPONENT
 */
export const UserHome = props => {
  const {user, fetchGoals, fetchBookmarks, goals, bookmarks} = props

  // similar to componentDidMount
  useEffect(
    () => {
      async function fetchUserGoals() {
        await fetchGoals()
      }
      async function fetchUserBookmarks() {
        await fetchBookmarks()
      }
      fetchUserGoals()
      fetchUserBookmarks()
    },
    [user]
  )

  const goalBookmarks = bookmarks.filter(bookmark => {
    if (goals[0] && goals[0].id) {
      return bookmark.goalId === goals[0].id
    }
  })

  const [randomNum, setRandomNum] = useState(0)
  const handleShuffleClick = prevNum => {
    let randomNum = prevNum
    if (goalBookmarks.length > 1) {
      while (randomNum === prevNum) {
        randomNum = Math.floor(Math.random() * goalBookmarks.length)
      }
    }
    setRandomNum(randomNum)
  }

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
                    {goalBookmarks[randomNum] && goalBookmarks[randomNum].id ? (
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
                        onClick={() => handleShuffleClick(randomNum)}
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

/**
 * CONTAINER
 */
const mapState = state => {
  return {
    user: state.user,
    goals: state.goals,
    bookmarks: state.bookmarks
  }
}

const mapDispatch = dispatch => {
  return {
    fetchGoals: () => dispatch(fetchGoals()),
    fetchBookmarks: () => dispatch(fetchBookmarks())
  }
}

export default connect(mapState, mapDispatch)(UserHome)
