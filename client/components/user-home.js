import React from 'react'
import {connect} from 'react-redux'
// import {AllBookmarks} from './bookmark'
import {Navbar} from './index'

/**
 * COMPONENT
 */
export const UserHome = props => {
  const {user} = props

  return (
    <div>
      <Navbar />
      <h3>Welcome, {user.firstName}</h3>
    </div>
  )
}

/**
 * CONTAINER
 */
const mapState = state => {
  return {
    user: state.user
  }
}

export default connect(mapState)(UserHome)
