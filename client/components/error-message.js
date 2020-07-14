import React from 'react'
import {Message, Icon} from 'semantic-ui-react'

const ErrorMessage = () => (
  <Message icon>
    <Icon name="x" loading />
    <Message.Content>
      <Message.Header>Uh oh</Message.Header>
      Something went wrong.
    </Message.Content>
  </Message>
)

export default ErrorMessage
