import React from 'react'
import {connect} from 'react-redux'
// import {Link} from 'react-router-dom'
import {fetchGoals, deleteGoal, updateGoal} from '../store/goal'
import {me} from '../store/user'
import {fetchBookmarks} from '../store/bookmark'
import {Item, Button, Container, Form, Input} from 'semantic-ui-react'

export class AllGoals extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      detail: '',
      selectedGoalId: null
    }
    this.handleChange = this.handleChange.bind(this)
    //this.handleDelete = this.handleDelete.bind(this)
    this.edit = this.edit.bind(this)
  }

  componentDidMount() {
    this.props.getGoals()
    this.props.getUser()
    this.props.getBookmarks() //problem fetching bookmark!
  }

  edit(goalId, prevDetail) {
    this.setState({detail: prevDetail, selectedGoalId: goalId})
  }

  handleChange(e) {
    e.preventDefault()
    this.setState({[e.target.name]: e.target.value})
  }

  render() {
    const goals = this.props.goals
    const user = this.props.user
    //const bookmarks = this.props.bookmarks
    return (
      <Container>
        <Item.Group relaxed>
          {goals && goals.length > 0
            ? goals.map(goal => {
                if (goal.userId === user.id)
                  return (
                    <Item key={goal.id}>
                      <Item.Image size="small" src="./placeholder.png" />
                      <Item.Content verticalAlign="middle">
                        {this.state.selectedGoalId === goal.id ? (
                          <Form
                            onSubmit={() => {
                              this.props.updateGoal(goal.id, {
                                detail: this.state.detail
                              })
                              this.setState({detail: '', selectedGoalId: null})
                            }}
                          >
                            <Form.Field control={Input}>
                              <Input
                                name="detail"
                                value={this.state.detail}
                                onChange={this.handleChange}
                              />
                            </Form.Field>
                            {/* <Item.Extra> */}
                            <Button
                              floated="right"
                              type="submit"
                              content="Save Goal"
                              primary
                            />
                            {/* </Item.Extra> */}
                          </Form>
                        ) : (
                          <Item.Header as="a">
                            GOAL: {goal.detail}
                            <Item.Extra>
                              <Item.Meta>
                                Here's something to help with this goal: {'  '}
                              </Item.Meta>
                              <Item.Description>
                                <a>www.nytimes.com</a>
                              </Item.Description>
                              <Button
                                floated="right"
                                onClick={() => this.edit(goal.id, goal.detail)}
                                content="Edit"
                                primary
                              />
                              <Button
                                floated="right"
                                onClick={() => this.props.deleteGoal(goal.id)}
                                content="Delete"
                                secondary
                              />
                            </Item.Extra>
                          </Item.Header>
                        )}
                      </Item.Content>
                    </Item>
                  )
              })
            : 'please add some goals!'}
        </Item.Group>
      </Container>
    )
  }
}

const mapState = state => {
  return {
    goals: state.goals,
    user: state.user,
    bookmarks: state.bookmarks
  }
}

const mapDispatch = dispatch => {
  return {
    getGoals: () => dispatch(fetchGoals()),
    getUser: () => dispatch(me()),
    getBookmarks: () => dispatch(fetchBookmarks()),
    updateGoal: (goalId, updateInfo) =>
      dispatch(updateGoal(goalId, updateInfo)),
    deleteGoal: goalId => dispatch(deleteGoal(goalId))
  }
}
export default connect(mapState, mapDispatch)(AllGoals)
//export default AllGoals
