import React from 'react'
import { Menu } from 'antd'
import { FormattedMessage } from 'react-intl'
import MenuItem from './MenuItem'

const { SubMenu } = Menu

/**
 * This component rendering two types of menu deppending if the information that comes from "layouts/JsonsMenu"
 * This component creates a menu item with submenus if they exist
 *
 * @param {*} menuJson json structure from JsonsMenu/ (mainMenu)
 * @param {*} childToogle
 * @returns {Boolean}
 * @param {*} variab
 * @returns {String} "horizontal" / "vertical"
 */

const mainMenuNav = (menuJson, childToogle, variab) => {
  return menuJson.map(menuItem => {
    if (menuItem.submenu.length >= 1) {
      return (
        <SubMenu
          key={menuItem.key}
          title={
            <span>
              {/* <Icon type={menuItem.iconType} /> */}
              <FormattedMessage id={menuItem.title} />
            </span>
          }
        >
          <Menu.ItemGroup
            title={<FormattedMessage id={menuItem.titleSubmenu} />}
          >
            {menuItem.submenu.map(subMenuItem =>
              MenuItem(subMenuItem, childToogle, variab)
            )}
          </Menu.ItemGroup>
          {menuItem.submenu2 && (
            <Menu.ItemGroup
              title={<FormattedMessage id={menuItem.titleSubmenu2} />}
            >
              {menuItem.submenu2.map(subMenuItem =>
                MenuItem(subMenuItem, childToogle, variab)
              )}
            </Menu.ItemGroup>
          )}
        </SubMenu>
      )
    }
    return MenuItem(menuItem, childToogle, variab)
  })
}

export default mainMenuNav
