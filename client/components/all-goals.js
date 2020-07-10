import React from 'react'
import {connect} from 'react-redux'
// import {Link} from 'react-router-dom'
import {fetchGoals, addGoal, deleteGoal, updateGoal} from '../store/goal'
import {me} from '../store/user'
import {fetchBookmarks, fetchBookmarksByGoal} from '../store/bookmark'
import {Item, Button, Form, Input, Header, Responsive} from 'semantic-ui-react'
import {Navbar} from './index'
import {CustomSidebar} from './sidemenu'

export class AllGoals extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      detail: '',
      selectedGoalId: null
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

  itemGroup(userGoals, view, inputWidth, bookmarks, goalBookmarks) {
    return (
      <Item.Group relaxed style={{padding: '20px 50px', marginRight: view}}>
        {userGoals && userGoals.length > 0
          ? userGoals.map(goal => {
              return (
                <Item key={goal.id}>
                  {/* <Item.Image size="small" src="./placeholder.png" /> */}
                  {this.state.selectedGoalId === goal.id ? (
                    <Item.Content
                      verticalAlign="middle"
                      // style={{width: inputWidth}}
                    >
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
                          primary
                          onClick={() => this.edit(null, '')}
                        />
                        <Button
                          floated="right"
                          type="submit"
                          content="Save"
                          primary
                        />
                      </Form>
                    </Item.Content>
                  ) : (
                    <Item.Content
                      verticalAlign="middle"
                      // style={{width: inputWidth}}
                    >
                      <Item.Header as="div">
                        GOAL: {goal.detail}
                        <Item.Extra>
                          <Item.Meta>
                            Here's something to help with this goal: {'  '}
                          </Item.Meta>
                          <Item.Description>
                            {goalBookmarks(goal.id, bookmarks)[0] ? (
                              <a
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
                            primary
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

  render() {
    const goals = this.props.goals
    const user = this.props.user
    const bookmarks = this.props.bookmarks
    const userGoals = goals.filter(goal => goal.userId === user.id)
    const goalBookmarks = function(goalId, bookmarks) {
      return bookmarks.filter(bookmark => {
        return bookmark.goalId === goalId
      })
    }

    return (
      <div>
        <Navbar />
        <CustomSidebar />
        <div>
          <Header style={{marginLeft: '35%', marginTop: '50px'}}>
            You have {userGoals.length} goals:
          </Header>

          <Item.Content
            style={{padding: '20px 50px', marginRight: '30%'}}
            verticalAlign="middle"
          >
            <Form
              onSubmit={() => {
                this.props.addGoal({
                  detail: this.state.detail,
                  userId: user.id
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
                type="submit"
                content="Add Goal"
                primary
              />
            </Form>
          </Item.Content>

          <Responsive minWidth={Responsive.onlyMobile.maxWidth}>
            {this.itemGroup(
              userGoals,
              '25%',
              'inherit',
              bookmarks,
              goalBookmarks
            )}
          </Responsive>
          <Responsive maxWidth={Responsive.onlyMobile.maxWidth}>
            {this.itemGroup(userGoals, 0, '70%', bookmarks, goalBookmarks)}
          </Responsive>
        </div>
      </div>
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
    updateGoal: (goalId, updateInfo) =>
      dispatch(updateGoal(goalId, updateInfo)),
    addGoal: goalInfo => dispatch(addGoal(goalInfo))
  }
}
export default connect(mapState, mapDispatch)(AllGoals)
