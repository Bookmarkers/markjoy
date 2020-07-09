import React from 'react'
import {connect} from 'react-redux'
import {getSingleGoal} from '../store/singleGoal'

export class SingleGoal extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      goalId: this.props.match.params.id
    }
  }

  componentDidMount() {
    this.props.getSingleGoal(this.state.goalId)
  }

  render() {
    let goal = this.props.goal
    console.log('GOAL!!', goal)
    return <div>{goal ? <p>{goal.detail}</p> : 'this goal does not exist'}</div>
  }
}

const mapState = state => {
  console.log('STATE', state)
  return {
    goal: state.goal.goal
  }
}

const mapDispatch = dispatch => {
  return {
    getSingleGoal: id => dispatch(getSingleGoal(id))
  }
}

export default connect(mapState, mapDispatch)(SingleGoal)
