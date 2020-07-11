import React, {useEffect} from 'react'
import {connect} from 'react-redux'
// import {AllBookmarks} from './bookmark'
import {Navbar} from './index'
import {CustomSidebar} from './sidemenu'
import {fetchGoals} from '../store/goal'
import {Item, Responsive} from 'semantic-ui-react'

/**
 * COMPONENT
 */
export const UserHome = props => {
  const {user, fetchGoals, goals, bookmarks} = props

  // similar to componentDidMount
  useEffect(
    () => {
      async function fetchUserGoals() {
        await fetchGoals(user.id)
      }
      fetchUserGoals()
    },
    [user.id]
  )

  const userHasGoals = goals.length > 0
  const goalBookmarks = bookmarks.filter(bookmark => {
    return bookmark.goalId === goals[0].id
  })

  return (
    <div>
      <Navbar />
      <div style={{display: 'flex', height: '100vh'}}>
        <div style={{flex: 1, padding: '50px'}}>
          {userHasGoals ? (
            <div style={{textAlign: 'center'}}>
              <h3>Welcome back, {user.firstName}</h3>
              <p>Here is a goal for you today:</p>
              <Item.Content>
                <Item.Header
                  style={{
                    fontWeight: '800',
                    fontSize: '2em',
                    marginTop: '50px'
                  }}
                >
                  {goals[0].detail}
                </Item.Header>
                <Item.Extra>
                  <Item.Description>{goalBookmarks}</Item.Description>
                </Item.Extra>
              </Item.Content>
              {/* <img src={user.imageUrl} height="200" width="200" /> */}
            </div>
          ) : (
            <div style={{textAlign: 'center'}}>
              <h3>Welcome, {user.firstName}</h3>
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
    fetchGoals: userId => dispatch(fetchGoals(userId))
  }
}

export default connect(mapState, mapDispatch)(UserHome)
