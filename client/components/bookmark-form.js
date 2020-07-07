// WORK IN PROGRESS!!!

import React from 'react'

const BookmarkForm = props => (
  <form id="add-bookmark" onSubmit={props.handleSubmit}>
    <div>
      <div>
        <label htmlFor="title">Give your bookmark a title...</label>
        <input
          name="title"
          type="string"
          onChange={props.handleChange}
          value={props.title}
        />
      </div>
      <div>
        <label htmlFor="url">What's the bookmark url?</label>
        <input
          name="url"
          type="string"
          onChange={props.handleChange}
          value={props.url}
        />
      </div>
    </div>

    <button type="submit">SUBMIT</button>
  </form>
)
export default BookmarkForm
