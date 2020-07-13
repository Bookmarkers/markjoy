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
        await fetchGoals(user.id)
      }
      async function fetchUserBookmarks() {
        await fetchBookmarks(user.id)
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
    while (randomNum === prevNum) {
      randomNum = Math.floor(Math.random() * bookmarks.length) - 1
      if (randomNum < 0) randomNum = 0
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
              <p>Here is a goal for you today:</p>
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
                      'No bookmarks for this goal!'
                    )}
                    <Button
                      floated="right"
                      onClick={() => handleShuffleClick(randomNum)}
                      content="Shuffle"
                      color="teal"
                    />
                  </Item.Description>
                </Item.Extra>
              </Item.Content>
            </div>
          ) : (
            <div style={{textAlign: 'center'}}>
              <h3>Welcome to bookmarq, {user.firstName}</h3>
              <h4>Set your very first goal here:</h4>
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
    fetchGoals: userId => dispatch(fetchGoals(userId)),
    fetchBookmarks: userId => dispatch(fetchBookmarks(userId))
  }
}

export default connect(mapState, mapDispatch)(UserHome)
