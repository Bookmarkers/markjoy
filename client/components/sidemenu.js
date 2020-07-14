import React from 'react'
import {Menu, Responsive} from 'semantic-ui-react'
import {Link} from 'react-router-dom'

export class Sidemenu extends React.Component {
  constructor(props) {
    super(props)
    this.isActive = this.isActive.bind(this)
  }

  isActive(path) {
    return location.pathname.includes(path)
  }

  render() {
    return (
      <div>
        <Link to="/home">
          <Menu.Item active={this.isActive('/home')}>Home</Menu.Item>
        </Link>
        <Link to="/goals">
          <Menu.Item active={this.isActive('/goals')}>Goals</Menu.Item>
        </Link>
        <Link to="/bookmarks">
          <Menu.Item active={this.isActive('/bookmarks')}>Bookmarks</Menu.Item>
        </Link>
        <Menu.Menu vertical="true" secondary="true">
          <Link to="/bookmarks/category/1">
            <Menu.Item active={this.isActive('/bookmarks/category/1')}>
              Unsorted
            </Menu.Item>
          </Link>
          <Link to="/bookmarks/category/2">
            <Menu.Item active={this.isActive('/bookmarks/category/2')}>
              Learning
            </Menu.Item>
          </Link>
          <Link to="/bookmarks/category/3">
            <Menu.Item active={this.isActive('/bookmarks/category/3')}>
              Community
            </Menu.Item>
          </Link>
          <Link to="/bookmarks/category/4">
            <Menu.Item active={this.isActive('/bookmarks/category/4')}>
              Lifestyle
            </Menu.Item>
          </Link>
          <Link to="/bookmarks/category/5">
            <Menu.Item active={this.isActive('/bookmarks/category/5')}>
              Finance
            </Menu.Item>
          </Link>
          <Link to="/bookmarks/category/6">
            <Menu.Item active={this.isActive('/bookmarks/category/6')}>
              Wellness
            </Menu.Item>
          </Link>
        </Menu.Menu>
      </div>
    )
  }
}

export const CustomSidebar = () => {
  return (
    <Responsive minWidth={Responsive.onlyMobile.maxWidth + 2}>
      <Menu style={{height: '100%'}} vertical borderless>
        <Sidemenu />
      </Menu>
    </Responsive>
  )
}
