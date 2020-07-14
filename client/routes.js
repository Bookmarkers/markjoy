import React, {Component} from 'react'
import {connect} from 'react-redux'
import {withRouter, Route, Switch, Redirect} from 'react-router-dom'
import PropTypes from 'prop-types'
import {
  UserHome,
  AllBookmarks,
  AuthForm,
  Landing,
  AllGoals,
  SingleGoal,
  Blocked
} from './components'
import {me} from './store'

/**
 * COMPONENT
 */
class Routes extends Component {
  componentDidMount() {
    this.props.loadInitialData()
  }

  render() {
    const {isLoggedIn} = this.props

    return isLoggedIn ? (
      <Switch>
        {/* Routes placed here are only available after logging in */}
        <Redirect from="/auth" to="/home" />
        <Route exact path="/home" component={UserHome} />
        <Route exact path="/bookmarks" component={AllBookmarks} />
        <Route
          exact
          path="/bookmarks/category/:categoryId"
          component={AllBookmarks}
        />
        <Route exact path="/goals" component={AllGoals} />
        <Route exact path="/goals/:id" component={SingleGoal} />
        <Route exact path="/blocked" component={Blocked} />
        {/* Landing as a fallback for logged in users */}
        <Route component={Landing} />
      </Switch>
    ) : (
      <Switch>
        {/* Routes placed here are available to all visitors */}
        <Route exact path="/auth" component={AuthForm} />
        <Route exact path="/" component={Landing} />
        {/* Displays our Landing component as a fallback */}
        <Route component={Landing} />
      </Switch>
    )
  }
}

/**
 * CONTAINER
 */
const mapState = state => {
  return {
    // Being 'logged in' for our purposes will be defined has having a state.user that has a truthy id.
    // Otherwise, state.user will be an empty object, and state.user.id will be falsey
    isLoggedIn: !!state.user.id
  }
}

const mapDispatch = dispatch => {
  return {
    loadInitialData() {
      dispatch(me())
    }
  }
}

// The `withRouter` wrapper makes sure that updates are not blocked
// when the url changes
export default withRouter(connect(mapState, mapDispatch)(Routes))

/**
 * PROP TYPES
 */
Routes.propTypes = {
  loadInitialData: PropTypes.func.isRequired,
  isLoggedIn: PropTypes.bool.isRequired
}
