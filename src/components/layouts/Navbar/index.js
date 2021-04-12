import React, { useState } from 'react'
import { Button, Row, Col, Dropdown, Drawer } from 'antd'
import { useRouter } from 'next/router'
import LayoutMenu from './TopSiderMenu/index'
import UserMenu from './TopSiderMenu/UserMenu'
import useWindowSize from './UseWindowSize'
import userJson from '../JsonsMenu/userMenu'

const Navbar = () => {
  const [visible, toogle] = useState(false)

  const variab = useWindowSize()

  const userMenu = () => {
    return <UserMenu userJson={userJson} />
  }

  const { pathname } = useRouter()
  if (
    pathname === '/Login' ||
    pathname === '/Error404' ||
    pathname === '/RecoverMail' ||
    pathname === '/RecoverPass'
  ) {
    return (
      <div className="navbar-iw">
        <Row className="drawer-iw" />
      </div>
    )
  }
  return (
    <div className="navbar-iw">
      <Row className="drawer-iw">
        {/* HAMBURGER BUTTON FOR DRAWER */}
        <Col xs={6} md={0}>
          <Button
            className="drop-menu-iw"
            icon="menu"
            size="large"
            onClick={() => toogle(!visible)}
          />
        </Col>
        {/* HORIZONTAL MENU */}
        <Col xs={0} sm={0} md={20}>
          <LayoutMenu variab={variab} />
        </Col>

        <Col sm={17} md={3}>
          <Dropdown overlay={userMenu} placement="bottomLeft">
            <Button type="primary" shape="circle" icon="user" size="large" />
          </Dropdown>
        </Col>
      </Row>
      {/* MENU RESPONSIVE WITH MODE "VERTICAL" */}
      <Drawer
        className="drawer-iw"
        placement="left"
        closable={false}
        onClose={() => toogle(!visible)}
        visible={visible}
      >
        <LayoutMenu childToogle={toogle} variab={variab} />
      </Drawer>
    </div>
  )
}

export default Navbar
