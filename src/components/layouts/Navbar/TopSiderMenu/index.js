/* eslint-disable react/prop-types */
import React from 'react'
import { Menu } from 'antd'
import mainMenu from 'src/components/layouts/JsonsMenu/mainMenu'
import mainMenuNav from './mainMenuNav'

/**
 * This component depend of routes/ because it have a dynamical mapping model of json
 * Is listening at every time for the window width to declare if the mode of the Menu is "vertical", "inline" or "horizontal"
 */

const LayoutMenu = ({ childToogle, variab }) => {
  return (
    <div>
      <Menu mode={variab === 'vertical' ? 'vertical' : 'horizontal'}>
        {mainMenuNav(mainMenu, childToogle, variab)}
      </Menu>
    </div>
  )
}

export default LayoutMenu
