import React, {useState} from 'react'
import PropTypes from 'prop-types'
import {connect} from 'react-redux'
import {logout} from '../store'
import {
  Button,
  Container,
  Menu,
  Dropdown,
  Responsive,
  Sidebar,
  Icon
} from 'semantic-ui-react'
import {Sidemenu} from './sidemenu'

const Navbar = ({handleClick, isLoggedIn, user}) => {
  // const [darkMode, changeDarkMode] = useState('false')
  const [sidebarOpened, handleToggle] = useState(false)

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
          <Menu.Item position="right">
            {isLoggedIn ? (
              <Dropdown
                text={`Hi, ${user.firstName}`}
                style={{marginRight: '15px'}}
              >
                <Dropdown.Menu>
                  <Dropdown.Item href="#">My profile</Dropdown.Item>
                  <Dropdown.Item onClick={handleClick}>Sign out</Dropdown.Item>
                </Dropdown.Menu>
              </Dropdown>
            ) : (
              <Button href="/auth" color="teal">
                Sign in
              </Button>
            )}
          </Menu.Item>
        </Container>
      </Menu>

      {/* Sidebar for mobile screen view */}
      <Responsive maxWidth={Responsive.onlyMobile.maxWidth + 1}>
        <Sidebar
          as={Menu}
          animation="push"
          direction="right"
          // inverted
          onHide={() => handleToggle(false)}
          vertical
          borderless
          visible={sidebarOpened}
        >
          <Sidemenu />
        </Sidebar>
        <Menu.Item
          style={{
            position: 'absolute',
            top: 0,
            right: 100,
            height: '71.41px',
            padding: '28px'
          }}
          onClick={() => handleToggle(true)}
        >
          <Icon name="sidebar" />
        </Menu.Item>
      </Responsive>
    </div>
  )
}

/**
 * CONTAINER
 */
const mapState = state => {
  return {
    isLoggedIn: !!state.user.id,
    user: state.user
  }
}

const mapDispatch = dispatch => {
  return {
    handleClick() {
      dispatch(logout())
    }
  }
}

export default connect(mapState, mapDispatch)(Navbar)

/**
 * PROP TYPES
 */
Navbar.propTypes = {
  handleClick: PropTypes.func.isRequired,
  isLoggedIn: PropTypes.bool.isRequired
}
