import React from 'react'
import {connect} from 'react-redux'
import {Link} from 'react-router-dom'
import {fetchGoals, deleteGoal, updateGoal} from '../store/goal'
import {me} from '../store/user'
import {
  fetchBookmarks,
  fetchBookmarksByGoal,
  fetchBookmarksByCategory
} from '../store/bookmark'
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
    this.props.getBookmarks()
    //this.props.getBookmarksByGoal(goalId)
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
    const bookmarks = this.props.bookmarks
    console.log('GOALS: ', goals)
    console.log('BOOKMARKS: ', bookmarks)
    const userGoals = goals.filter(goal => goal.userId === user.id)
    const goalBookmarks = function(goalId, bookmarks) {
      return bookmarks.filter(bookmark => {
        return bookmark.goalId === goalId
      })
    }
    console.log('CAN YOU SEE: ', goalBookmarks(9, bookmarks))
    return (
      <Container>
        <Item.Group relaxed>
          {goals && goals.length > 0
            ? goals.map(goal => {
                if (goal.userId === user.id)
                  return (
                    <Item key={goal.id}>
                      {/* <Item.Image size="small" src="./category/unsorted.png" /> */}
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
                          <Item.Header as="div">
                            GOAL: {goal.detail}
                            <Item.Extra>
                              <Item.Meta>
                                Here's something to help with this goal: {'  '}
                              </Item.Meta>
                              <Item.Description>
                                {goalBookmarks(goal.id, bookmarks)[0] ? (
                                  <a
                                    href={
                                      goalBookmarks(goal.id, bookmarks)[0].url
                                    }
                                  >
                                    {goalBookmarks(goal.id, bookmarks)[0].url}
                                  </a>
                                ) : (
                                  'There are no bookmarks for this goal!'
                                )}
                              </Item.Description>
                              <Button
                                floated="right"
                                onClick={() => this.props.deleteGoal(goal.id)}
                                content="Delete"
                                secondary
                              />
                              <Button
                                floated="right"
                                onClick={() => this.edit(goal.id, goal.detail)}
                                content="Edit"
                                primary
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
    getBookmarksByGoal: goalId => dispatch(fetchBookmarksByGoal(goalId)),
    deleteGoal: goalId => dispatch(deleteGoal(goalId)),
    updateGoal: (goalId, updateInfo) => dispatch(updateGoal(goalId, updateInfo))
  }
}
export default connect(mapState, mapDispatch)(AllGoals)
