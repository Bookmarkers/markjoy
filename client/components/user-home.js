import React from 'react'
import {connect} from 'react-redux'
// import {AllBookmarks} from './bookmark'
import {Navbar} from './index'
import {CustomSidebar} from './sidemenu'

/**
 * COMPONENT
 */
export const UserHome = props => {
  const {user} = props

  return (
    <div>
      <Navbar />
      <div style={{display: 'flex', height: '100vh'}}>
        <div style={{flex: 1, padding: '50px'}}>
          <h3>Welcome, {user.firstName}</h3>
          <img src={user.imageUrl} height="200" width="200" />
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
    user: state.user
  }
}

export default connect(mapState)(UserHome)
