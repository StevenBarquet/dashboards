/* eslint-disable react/prop-types */
import React from 'react'
import { Menu } from 'antd'
import MenuItem from './MenuItem'

const UserMenu = ({ userJson }) => {
  return <Menu>{userJson.submenu.map(menuItem => MenuItem(menuItem))}</Menu>
}

export default UserMenu
