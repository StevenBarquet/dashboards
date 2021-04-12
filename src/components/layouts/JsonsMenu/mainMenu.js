/**
 * This file contains the structure that is occupied in "layouts/Navbar/TopSiderMenu/"
 *    for the header options of the Navbar the information is mapped and then it shows
 *    inline or vertical form depending of the responsive size.
 * It is NOT necessary to add an icon type, but it must be removed for the principal mapping in "layouts/Navbar/TopSiderMenu/mainMenuNav"
 * The param "title:" comes from "translations/"
 * @param [{}]
 * @return String
 */
const menuJson = [
  {
    title: 'header.menu.user.title',
    iconType: 'star',
    key: '4',
    titleSubmenu: 'header.menu.user.title',
    submenu: [
      {
        path: '/OperationUser',
        title: 'header.menu.user.create',
        iconType: 'star',
        key: '9-1',
      },
      {
        path: '/OperationSearch',
        title: 'header.menu.user.search',
        iconType: 'star',
        key: '9-2',
      },
    ],
  },
  {
    title: 'header.menu.dashboard.title',
    iconType: 'smile',
    key: '5',
    titleSubmenu: 'header.menu.dashboard.title',
    submenu: [
      {
        path: '/home-dashboard',
        title: 'header.menu.dashboard.create',
        iconType: 'form',
        key: '5-1',
      },
      {
        path: '/SearchDashboard',
        title: 'header.menu.dashboard.search',
        iconType: 'search',
        type: 'dashboards',
        key: '5-2',
      },
    ],
  },
  {
    title: 'header.menu.companies.title',
    iconType: 'star',
    key: '6',
    titleSubmenu: 'header.menu.companies.subtitle',
    titleSubmenu2: 'header.menu.companies.subtitle2',
    submenu: [
      {
        path: '/CreateCompany',
        title: 'header.menu.companies.create',
        iconType: 'form',
        key: '6-1',
      },
      {
        path: '/SearchCompany',
        title: 'header.menu.companies.search',
        iconType: 'search',
        type: 'dashboards',
        key: '6-2',
      },
    ],
    submenu2: [
      {
        path: '/CreateGroup',
        title: 'header.menu.group.create',
        iconType: 'form',
        key: '6-3',
      },
      {
        path: '/SearchGroup',
        title: 'header.menu.group.search',
        iconType: 'search',
        type: 'dashboards',
        key: '6-4',
      },
    ],
  },
]

export default menuJson
