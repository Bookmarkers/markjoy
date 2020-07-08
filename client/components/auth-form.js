import React from 'react'
import {connect} from 'react-redux'
import PropTypes from 'prop-types'
import {auth} from '../store'
import {
  Container,
  Button,
  Divider,
  Form,
  Grid,
  Segment
} from 'semantic-ui-react'

/**
 * COMPONENT
 */
const AuthForm = props => {
  const {name, displayName, handleSubmit, error} = props
  return (
    <div>
      <Container>
        <Segment placeholder>
          <Grid columns={2} relaxed="very" stackable>
            <Grid.Column>
              <Form name={name} onSubmit={handleSubmit}>
                <Form.Input
                  icon="user"
                  iconPosition="left"
                  label="Email"
                  name="email"
                  placeholder="enter your email"
                />
                <Form.Input
                  icon="lock"
                  iconPosition="left"
                  label="Password"
                  name="password"
                  type="password"
                />
                {error && error.response && <div> {error.response.data} </div>}
                <Button type="submit" content="Login" primary />
              </Form>
            </Grid.Column>

            <Grid.Column verticalAlign="middle">
              <Button content="Sign up" icon="signup" size="big" />
            </Grid.Column>
          </Grid>

          <a href="/auth/google">{displayName} with Google</a>
          <Divider vertical>Or</Divider>
        </Segment>
      </Container>
    </div>
    // <div>
    // <Container>
    //   <Segment placeholder>
    //     <Grid column={2} relaxed="very" stackable>
    //       <Grid.Column>
    //         <Form onSubmit={handleSubmit} name={name}>
    //           <Form.Input
    //             icon="user"
    //             iconPosition="left"
    //             label="email"
    //             placeholder="enter your email"
    //           />
    //           <Form.Input
    //             icon="lock"
    //             iconPosition="left"
    //             label="Password"
    //             type="password"
    //           />
    //           <Button content="Login" primary type="submit" />
    //         </Form>
    //       </Grid.Column>

    //       <Grid.Column verticalAlign="middle">
    //         <Button content="Sign up" icon="signup" size="big" />
    //       </Grid.Column>
    //     </Grid>
    //     <Divider vertical>Or</Divider>
    //   </Segment>

    // </Container>
    // </div>
  )
}

/**
 * CONTAINER
 *   Note that we have two different sets of 'mapStateToProps' functions -
 *   one for Login, and one for Signup. However, they share the same 'mapDispatchToProps'
 *   function, and share the same Component. This is a good example of how we
 *   can stay DRY with interfaces that are very similar to each other!
 */
const mapLogin = state => {
  return {
    name: 'login',
    displayName: 'Login',
    error: state.user.error
  }
}

const mapSignup = state => {
  return {
    name: 'signup',
    displayName: 'Sign Up',
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
      dispatch(auth(email, password, formName))
    }
  }
}

export const Login = connect(mapLogin, mapDispatch)(AuthForm)
export const Signup = connect(mapSignup, mapDispatch)(AuthForm)

/**
 * PROP TYPES
 */
AuthForm.propTypes = {
  name: PropTypes.string.isRequired,
  displayName: PropTypes.string.isRequired,
  handleSubmit: PropTypes.func.isRequired,
  error: PropTypes.object
}
