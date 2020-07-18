import React from 'react'
import {
  Form,
  Header,
  Button,
  Select,
  Radio,
  Message,
  Icon,
  Modal
} from 'semantic-ui-react'

export const BookmarkForm = props => {
  const {
    toggleModal,
    handleChange,
    handleGoalChange,
    handleSubmit,
    toggleSuccess,
    toggleUpdate,
    modalOpen,
    isUpdate,
    bookmarkInfo,
    goalOptions,
    success,
    error
  } = props
  const {title, url, categoryId, goalId} = bookmarkInfo

  return (
    <Modal
      open={modalOpen}
      onClose={() => {
        toggleModal()
        toggleSuccess()
        toggleUpdate()
      }}
      basic
      size="small"
      closeIcon
    >
      <Header
        icon="bookmark outline"
        content={isUpdate ? 'Update a Bookmark' : 'Add a New Bookmark'}
      />
      <Modal.Content>
        <Form
          inverted
          id="add-bookmark"
          success={success}
          onSubmit={handleSubmit}
        >
          <Form.Field id="url" required>
            <label htmlFor="url">Url</label>
            <input
              name="url"
              onChange={handleChange}
              value={url}
              placeholder="Whats the bookmark url?"
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
            <label htmlFor="category" style={{margin: '20px 0 10px 0'}}>
              Select a Category
            </label>
            <Form.Group inline>
              <Form.Field
                control={Radio}
                label="Learning"
                value="1"
                id="1"
                name="categoryId"
                checked={categoryId == '1'}
                onChange={handleChange}
              />
              <Form.Field
                control={Radio}
                label="Community"
                value="2"
                id="2"
                name="categoryId"
                checked={categoryId == '2'}
                onChange={handleChange}
              />
              <Form.Field
                control={Radio}
                label="Lifestyle"
                value="3"
                id="3"
                name="categoryId"
                checked={categoryId == '3'}
                onChange={handleChange}
              />
              <Form.Field
                control={Radio}
                label="Finance"
                value="4"
                id="4"
                name="categoryId"
                checked={categoryId == '4'}
                onChange={handleChange}
              />
              <Form.Field
                control={Radio}
                label="Wellness"
                value="5"
                id="5"
                name="categoryId"
                checked={categoryId == '5'}
                onChange={handleChange}
              />
              <Form.Field
                control={Radio}
                label="Unsorted"
                value="6"
                id="6"
                name="categoryId"
                checked={categoryId == '6'}
                onChange={handleChange}
              />
            </Form.Group>
          </Form.Field>
          <Form.Field
            control={Select}
            label="Select a Goal"
            options={goalOptions}
            onChange={handleGoalChange}
            placeholder="Would you like to assign this bookmark to a goal?"
          />
          <Message
            success
            color="teal"
            header="Bookmark Added!"
            content="You've successfully added a new bookmark."
          />
          <Button
            type="submit"
            floated="right"
            color="teal"
            inverted
            style={{marginTop: '36px'}}
          >
            <Icon name="checkmark" />
            {isUpdate ? 'Update' : 'Add'}
          </Button>
        </Form>
      </Modal.Content>
    </Modal>
  )
}

export default BookmarkForm
