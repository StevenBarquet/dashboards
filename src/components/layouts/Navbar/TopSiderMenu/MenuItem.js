import React from 'react'
import Router from 'next/router'
import { Menu } from 'antd'
import { FormattedMessage } from 'react-intl'

/**
 * This is a component that recives the information type JSON from "layouts/JsonsMenu"
 *    and does a mapping of the same
 * It's a reutilizable component because the tag "<Menu.Item>" is occupied for the main and user menu in navbar
 * This component render an a Menu tag that contains a span and an Icon
 * This one is reutilizable because does a mapping of information that comes of a json file and it works for the both menus
 *
 * @param {*} menuItem json structure from JsonsMenu/ (mainMenu/userMenu)
 * @param {*} childToogle
 * @returns {Boolean}
 * @param {*} variab
 * @returns {String} "horizontal" / "vertical"
 */

const MenuItem = (menuItem, childToogle = undefined, variab = null) => {
  return (
    <Menu.Item
      onClick={() =>
        Router.push(menuItem.path).then(() => {
          if (variab && childToogle !== undefined) {
            return variab === 'horizontal' ? '' : childToogle()
          }
          return undefined
        })
      }
      key={menuItem.key}
    >
      {/* <Icon type={menuItem.iconType} /> */}
      <FormattedMessage id={menuItem.title} />
    </Menu.Item>
  )
}

export default MenuItem
