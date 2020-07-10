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

const Sidemenu = () => {
  return (
    <div>
      <Menu.Item href="/" active>
        Home
      </Menu.Item>
      <Menu.Item href="/goals">Goals</Menu.Item>
      <Menu.Item href="/bookmarks">Bookmarks</Menu.Item>
      <Menu.Menu vertical="true" secondary="true">
        <Menu.Item href="/bookmarks/category/1">Unsorted</Menu.Item>
        <Menu.Item href="/bookmarks/category/2">Learning</Menu.Item>
        <Menu.Item href="/bookmarks/category/3">Community</Menu.Item>
        <Menu.Item href="/bookmarks/category/4">Lifestyle</Menu.Item>
        <Menu.Item href="/bookmarks/category/5">Finance</Menu.Item>
        <Menu.Item href="/bookmarks/category/6">Wellness</Menu.Item>
      </Menu.Menu>
    </div>
  )
}

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

      {/* Sidemenu for desktop screen view */}
      <Responsive
        style={{height: '100vh', position: 'absolute', right: 0}}
        minWidth={Responsive.onlyMobile.maxWidth}
      >
        <Menu style={{height: 'inherit'}} vertical borderless>
          <Sidemenu />
        </Menu>
      </Responsive>

      {/* Sidebar for mobile screen view */}
      <Responsive maxWidth={Responsive.onlyMobile.maxWidth}>
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
