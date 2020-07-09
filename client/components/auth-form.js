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
  Responsive
} from 'semantic-ui-react'
import Navbar from './navbar'

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
                type="submit"
                content="Sign In"
                primary
                style={{marginBottom: '0.5em'}}
              />
              <a href="/auth/google">Sign in with Google</a>
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
                type="submit"
                content="Sign Up"
                primary
                style={{marginBottom: '0.5em'}}
              />
              <a href="/auth/google">Sign up with Google</a>
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
      <Navbar />
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
