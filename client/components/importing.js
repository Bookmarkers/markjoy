import React from 'react'
import {Dimmer, Loader} from 'semantic-ui-react'

class Importing extends React.Component {
  componentDidMount() {
    setTimeout(() => {
      this.props.history.push('/bookmarks')
    }, 3000)
  }

  render() {
    return (
      <Dimmer inverted active>
        <Loader size="large">Importing your bookmarks...</Loader>
      </Dimmer>
    )
  }
}

export default Importing
