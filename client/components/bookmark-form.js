import React from 'react'
import {Form, Button, Select, Radio, Message, Icon} from 'semantic-ui-react'

export const BookmarkForm = props => {
  const {handleChange, handleGoalChange, handleSubmit, state, goals} = props
  const {title, url, categoryId, success, error} = state

  return (
    <Form id="add-bookmark" success={success} onSubmit={handleSubmit}>
      <Form.Field required>
        <label htmlFor="url">Url</label>
        <input
          name="url"
          onChange={handleChange}
          value={url}
          placeholder="What's the bookmark url?"
        />
      </Form.Field>
      {error !== '' && (
        <div style={{color: 'red', marginBottom: '15px'}}>
          <Icon name="warning circle" />
          {error}
        </div>
      )}
      <Form.Field>
        <label htmlFor="title">Title</label>
        <input
          name="title"
          onChange={handleChange}
          value={title}
          placeholder="Give your bookmark a title"
        />
      </Form.Field>
      <Form.Field>
        <label htmlFor="category" style={{margin: '20px 0 15px 0'}}>
          Select a Category
        </label>
        <Form.Group inline>
          <Form.Field
            control={Radio}
            label="Learning"
            value="1"
            id="1"
            name="categoryId"
            checked={categoryId === '1'}
            onChange={handleChange}
          />
          <Form.Field
            control={Radio}
            label="Community"
            value="2"
            id="2"
            name="categoryId"
            checked={categoryId === '2'}
            onChange={handleChange}
          />
          <Form.Field
            control={Radio}
            label="Lifestyle"
            value="3"
            id="3"
            name="categoryId"
            checked={categoryId === '3'}
            onChange={handleChange}
          />
          <Form.Field
            control={Radio}
            label="Finance"
            value="4"
            id="4"
            name="categoryId"
            checked={categoryId === '4'}
            onChange={handleChange}
          />
          <Form.Field
            control={Radio}
            label="Wellness"
            value="5"
            id="5"
            name="categoryId"
            checked={categoryId === '5'}
            onChange={handleChange}
          />
          <Form.Field
            control={Radio}
            label="Unsorted"
            value="6"
            id="6"
            name="categoryId"
            checked={categoryId === '6'}
            onChange={handleChange}
          />
        </Form.Group>
      </Form.Field>
      <Form.Field
        control={Select}
        label="Select a Goal"
        options={goals}
        onChange={handleGoalChange}
        placeholder="Would you like to assign this bookmark to a goal?"
      />
      <Message
        success
        header="Bookmark Added!"
        content="You've successfully added a new bookmark."
      />
      <Button type="submit" floated="right" color="teal">
        Add
      </Button>
    </Form>
  )
}

export default BookmarkForm
