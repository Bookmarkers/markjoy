import React from 'react'
import {Menu, Responsive} from 'semantic-ui-react'

export const Sidemenu = () => {
  return (
    <div>
      <Menu.Item href="/home" active>
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

export const CustomSidebar = () => {
  return (
    <Responsive minWidth={Responsive.onlyMobile.maxWidth + 2}>
      <Menu style={{height: '100%'}} vertical borderless>
        <Sidemenu />
      </Menu>
    </Responsive>
  )
}