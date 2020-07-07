// WORK IN PROGRESS!!!

import React, {Component} from 'react'
import BookmarkForm from './bookmark-form'

export default class AddBookmark extends Component {
  constructor(props) {
    super(props)
    this.state = {
      title: '',
      url: ''
    }
    this.handleChange = this.handleChange.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
  }

  handleChange(event) {
    this.setState({
      [event.target.name]: event.target.value
    })
  }

  handleSubmit(event) {
    event.preventDefault()
    try {
      const updateState = {
        title: this.state.title,
        url: this.state.url
      }
      this.props.addBookmark(updateState)
    } catch (error) {
      console.error(error)
    }
  }

  render() {
    return (
      <BookmarkForm
        handleChange={this.handleChange}
        handleSubmit={this.handleSubmit}
      />
    )
  }
}
