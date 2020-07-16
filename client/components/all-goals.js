import React from 'react'
import {connect} from 'react-redux'
import {Link} from 'react-router-dom'
import {
  setGoals,
  fetchGoals,
  addGoal,
  deleteGoal,
  updateGoal
} from '../store/goal'
import {me} from '../store/user'
import {setBookmarks, fetchBookmarks} from '../store/bookmark'
import {Item, Button, Form, Input, Header, Responsive} from 'semantic-ui-react'
import {Navbar} from './index'
import {CustomSidebar} from './sidemenu'

export class AllGoals extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      detail: '',
      selectedGoalId: null,
      newGoalDetail: ''
    }
    this.handleChange = this.handleChange.bind(this)
    this.edit = this.edit.bind(this)
    this.itemGroup = this.itemGroup.bind(this)
  }

  componentDidMount() {
    this.props.getGoals()
    this.props.getUser()
    this.props.getBookmarks()
  }

  edit(goalId, prevDetail) {
    this.setState({detail: prevDetail, selectedGoalId: goalId})
  }

  handleChange(e) {
    e.preventDefault()
    this.setState({[e.target.name]: e.target.value})
  }

  itemGroup(goals, bookmarks, goalBookmarks) {
    return (
      <Item.Group relaxed style={{padding: '20px 50px'}}>
        {goals && goals.length > 0
          ? goals.map(goal => {
              return (
                <Item key={goal.id}>
                  {this.state.selectedGoalId === goal.id ? (
                    <Item.Content verticalAlign="middle">
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
                        <Button
                          floated="right"
                          content="Cancel"
                          color="teal"
                          onClick={() => this.edit(null, '')}
                        />
                        <Button
                          floated="right"
                          type="submit"
                          content="Save"
                          color="teal"
                        />
                      </Form>
                    </Item.Content>
                  ) : (
                    <Item.Content verticalAlign="middle">
                      <Item.Header as="div" style={{width: '100%'}}>
                        <Link to={`/goals/${goal.id}`}>
                          GOAL: {goal.detail}
                        </Link>
                        <Item.Extra>
                          <Item.Meta>
                            Here's something to help with this goal: {'  '}
                          </Item.Meta>
                          <Item.Description>
                            {goalBookmarks(goal.id, bookmarks)[0] ? (
                              <a
                                style={{color: 'teal'}}
                                href={goalBookmarks(goal.id, bookmarks)[0].url}
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
                            color="teal"
                          />
                        </Item.Extra>
                      </Item.Header>
                    </Item.Content>
                  )}
                </Item>
              )
            })
          : 'please add some goals!'}
      </Item.Group>
    )
  }

  componentWillUnmount() {
    this.props.setGoals([])
    this.props.setBookmarks([])
  }

  render() {
    const goals = this.props.goals
    const user = this.props.user
    const bookmarks = this.props.bookmarks
    const goalBookmarks = function(goalId, bookmarks) {
      return bookmarks.filter(bookmark => {
        return bookmark.goalId === goalId
      })
    }

    return this.props.loading ? (
      <div className="ui active loader" />
    ) : (
      <div>
        <Navbar />
        <div style={{display: 'flex'}}>
          <div style={{flex: 1}}>
            <Header style={{textAlign: 'center', marginTop: '50px'}}>
              You have {goals.length} goals
            </Header>
            {goals.length < 5 ? (
              <div>
                <p style={{textAlign: 'center'}}>You can add up to 5 goals</p>
                <Item.Content
                  style={{padding: '20px 50px'}}
                  verticalAlign="middle"
                >
                  <Form
                    onSubmit={() => {
                      this.props.addGoal({
                        detail: this.state.newGoalDetail,
                        userId: user.id
                      })
                      this.setState({newGoalDetail: ''})
                    }}
                  >
                    <Form.Field control={Input}>
                      <Input
                        name="newGoalDetail"
                        value={this.state.newGoalDetail}
                        onChange={this.handleChange}
                      />
                    </Form.Field>
                    <Button
                      floated="right"
                      type="submit"
                      content="Add Goal"
                      color="teal"
                    />
                  </Form>
                </Item.Content>
              </div>
            ) : (
              ''
            )}
            <Responsive minWidth={Responsive.onlyMobile.maxWidth}>
              {this.itemGroup(goals, bookmarks, goalBookmarks)}
            </Responsive>
            <Responsive maxWidth={Responsive.onlyMobile.maxWidth}>
              {this.itemGroup(goals, bookmarks, goalBookmarks)}
            </Responsive>
          </div>
          <CustomSidebar />
        </div>
      </div>
    )
  }
}

const mapState = state => {
  return {
    goals: state.goals.goals,
    loading: state.goals.loading,
    user: state.user,
    bookmarks: state.bookmarks.bookmarks
  }
}

const mapDispatch = dispatch => {
  return {
    setGoals: goals => dispatch(setGoals(goals)),
    getGoals: () => dispatch(fetchGoals()),
    getUser: () => dispatch(me()),
    setBookmarks: bookmarks => dispatch(setBookmarks(bookmarks)),
    getBookmarks: () => dispatch(fetchBookmarks()),
    deleteGoal: goalId => dispatch(deleteGoal(goalId)),
    updateGoal: (goalId, updateInfo) =>
      dispatch(updateGoal(goalId, updateInfo)),
    addGoal: goalInfo => dispatch(addGoal(goalInfo))
  }
}
export default connect(mapState, mapDispatch)(AllGoals)
