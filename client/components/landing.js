import React from 'react'
import {connect} from 'react-redux'
import {Button, Header, Icon} from 'semantic-ui-react'

const Landing = props => {
  const {user} = props

  return (
    <div>
      <div
        style={{
          backgroundImage: "url('./landing.jpg')",
          backgroundSize: 'cover',
          width: '100%',
          height: '100%',
          position: 'absolute',
          zIndex: '-1'
        }}
      />
      <Header
        as="h1"
        content="Join bookmarq."
        style={{
          fontSize: '4em',
          fontWeight: 'normal',
          marginBottom: 0,
          marginTop: 0,
          paddingTop: '180px',
          paddingLeft: '15%'
        }}
      />
      <Header
        as="h2"
        content="Save bookmarks that help you achieve your goals."
        style={{
          fontSize: '1.7em',
          fontWeight: 'normal',
          marginTop: '1.5em',
          marginBottom: '1.5em',
          paddingLeft: '15%'
        }}
      />
      <Button
        color="teal"
        size="huge"
        style={{marginRight: '1em', marginLeft: '15%'}}
      >
        Install Extension
      </Button>

      <Button color="teal" size="huge" href="/auth">
        Sign In
        <Icon name="right arrow" />
      </Button>
    </div>
  )
}

const mapState = state => ({
  user: state.user
})

export default connect(mapState)(Landing)
