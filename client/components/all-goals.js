import React from 'react'
import {connect} from 'react-redux'
// import {Link} from 'react-router-dom'
import {fetchGoals} from '../store/goal'
import {Item} from 'semantic-ui-react'

export class AllGoals extends React.Component {
  componentDidMount() {
    this.props.getGoals()
  }

  render() {
    console.log('PROPS', this.props.goals)
    const goals = this.props.goals
    //this.props.user in the ternary to get goals associated with the user logged in!
    return (
      <Item.Group>
        {goals && goals.length > 0
          ? goals.map(goal => {
              return (
                <Item key={goal.id}>
                  <Item.Content>
                    <Item.Header as="a">{goal.detail}</Item.Header>
                    <Item.Meta>
                      Here are some bookmarks related to your goals:{' '}
                    </Item.Meta>
                    <Item.Description>
                      <p>input 2 related bookmark as lists</p>
                    </Item.Description>
                  </Item.Content>
                </Item>
              )
            })
          : 'please add some goals!'}
      </Item.Group>
    )
  }
}

const mapState = state => {
  return {
    goals: state.goals
  }
}

const mapDispatch = dispatch => {
  return {
    getGoals: () => dispatch(fetchGoals())
  }
}
export default connect(mapState, mapDispatch)(AllGoals)
//export default AllGoals
