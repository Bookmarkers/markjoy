import React, {useState} from 'react'
import {connect} from 'react-redux'
import {auth} from '../store'
import {
  Container,
  Button,
  Divider,
  Form,
  Grid,
  Segment,
  Responsive,
  Menu,
  Header
} from 'semantic-ui-react'

const login = (handleSubmit, error, changeMethod) => (
  <div>
    <Container style={{width: '65%'}}>
      <Segment style={{marginTop: '15%'}}>
        <Grid
          columns={2}
          relaxed="very"
          stackable
          textAlign="center"
          verticalAlign="middle"
        >
          <Grid.Column>
            <Form
              name="login"
              onSubmit={handleSubmit}
              style={{display: 'flex', flexDirection: 'column', padding: '1em'}}
            >
              <Form.Input
                icon="user"
                iconPosition="left"
                name="email"
                placeholder="Email address"
              />
              <Form.Input
                icon="lock"
                iconPosition="left"
                name="password"
                type="password"
                placeholder="Password"
              />
              {error && error.response && <div> {error.response.data} </div>}
              <Button
                color="teal"
                type="submit"
                content="Sign In"
                style={{marginBottom: '0.5em'}}
              />
              <a style={{color: 'teal'}} href="/auth/google">
                Sign in with Google
              </a>
            </Form>
          </Grid.Column>
          <Grid.Column verticalAlign="middle">
            <Button
              content="Sign up"
              onClick={() => changeMethod('signup')}
              icon="sign-in"
              size="big"
            />
          </Grid.Column>
        </Grid>
        <Responsive minWidth={768}>
          <Divider vertical>Or</Divider>
        </Responsive>
      </Segment>
    </Container>
  </div>
)

const signup = (handleSubmit, error, changeMethod) => (
  <div>
    <Container style={{width: '65%'}}>
      <Segment style={{marginTop: '15%'}}>
        <Grid
          columns={2}
          relaxed="very"
          stackable
          textAlign="center"
          verticalAlign="middle"
        >
          <Grid.Column>
            <Button
              content="Sign In"
              onClick={() => changeMethod('login')}
              icon="sign-in"
              size="big"
            />
          </Grid.Column>
          <Grid.Column>
            <Form
              name="signup"
              onSubmit={handleSubmit}
              style={{display: 'flex', flexDirection: 'column', padding: '1em'}}
            >
              <Form.Input name="firstName" placeholder="First name" />
              <Form.Input name="lastName" placeholder="Last name" />
              <Form.Input
                icon="user"
                iconPosition="left"
                name="email"
                placeholder="Email address"
              />
              <Form.Input
                icon="lock"
                iconPosition="left"
                name="password"
                type="password"
                placeholder="Password"
              />
              {error && error.response && <div> {error.response.data} </div>}
              <Button
                color="teal"
                type="submit"
                content="Sign Up"
                style={{marginBottom: '0.5em'}}
              />
              <a style={{color: 'teal'}} href="/auth/google">
                Sign up with Google
              </a>
            </Form>
          </Grid.Column>
        </Grid>
        <Responsive minWidth={768}>
          <Divider vertical>Or</Divider>
        </Responsive>
      </Segment>
    </Container>
  </div>
)

const AuthForm = props => {
  const {handleSubmit, error} = props
  const [method, changeMethod] = useState('login')

  return (
    <div>
      <Menu
        borderless
        // inverted={darkMode}
        size="large"
        style={{marginBottom: 0}}
      >
        <Container style={{width: '100vw', margin: 0}}>
          <Menu.Item header href="/" style={{fontSize: '25px'}}>
            bookmarq
          </Menu.Item>
        </Container>
      </Menu>
      <Header
        style={{
          textAlign: 'center',
          marginTop: '100px',
          marginBottom: '-50px',
          color: 'teal'
        }}
      >
        Please sign in/sign up to continue to our website.
      </Header>
      {method === 'login'
        ? login(handleSubmit, error, changeMethod)
        : signup(handleSubmit, error, changeMethod)}
    </div>
  )
}

const mapState = state => {
  return {
    error: state.user.error
  }
}

const mapDispatch = dispatch => {
  return {
    handleSubmit(evt) {
      evt.preventDefault()
      const formName = evt.target.name
      const email = evt.target.email.value
      const password = evt.target.password.value
      const firstName = evt.target.firstName ? evt.target.firstName.value : null
      const lastName = evt.target.lastName ? evt.target.lastName.value : null
      dispatch(auth(formName, email, password, firstName, lastName))
    }
  }
}

export default connect(mapState, mapDispatch)(AuthForm)
