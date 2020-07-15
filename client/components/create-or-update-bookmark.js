import React, {Component} from 'react'
import {connect} from 'react-redux'
import BookmarkForm from './bookmark-form'
import {addBookmark} from '../store/bookmark'
import {fetchGoals} from '../store/goal'

export class AddBookmark extends Component {
  constructor(props) {
    super(props)
    this.state = {
      title: '',
      url: '',
      categoryId: '6',
      goalId: null,
      success: false,
      error: ''
    }
    this.handleChange = this.handleChange.bind(this)
    this.handleGoalChange = this.handleGoalChange.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
  }

  componentDidMount() {
    this.props.fetchGoals()
  }

  handleChange(event) {
    event.preventDefault()
    this.setState({
      [event.target.name]: event.target.value,
      success: false,
      error: ''
    })
  }

  handleGoalChange(e) {
    e.persist()
    const goalId = parseInt(e._targetInst.return.key, 10)
    this.setState({
      goalId: goalId
    })
  }

  handleSubmit(event) {
    event.preventDefault()
    const {title, url, categoryId, goalId, error} = this.state

    if (url === '') {
      this.setState({
        error: 'Url is a required field!'
      })
    } else if (!url.includes('.')) {
      this.setState({
        error: 'It must be a valid url!'
      })
    } else {
      const newBookmark = {
        title: title,
        url: url,
        categoryId: parseInt(categoryId, 10),
        goalId: goalId,
        userId: this.props.user.id
      }
      this.props.addBookmark(newBookmark)
      this.setState({
        title: '',
        url: '',
        categoryId: '6',
        goalId: null,
        success: true
      })
    }
  }

  render() {
    const goals = this.props.goals.map(goal => ({
      key: goal.id,
      text: goal.detail,
      value: goal.id
    }))

    return (
      <BookmarkForm
        handleChange={this.handleChange}
        handleGoalChange={this.handleGoalChange}
        handleSubmit={this.handleSubmit}
        state={this.state}
        goals={goals}
      />
    )
  }
}

const mapState = state => ({
  user: state.user,
  goals: state.goals
})

const mapDispatch = dispatch => ({
  addBookmark: bookmarkInfo => dispatch(addBookmark(bookmarkInfo)),
  fetchGoals: () => dispatch(fetchGoals())
})

export default connect(mapState, mapDispatch)(AddBookmark)
