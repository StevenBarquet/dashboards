/**
 * This file contains the structure that is occupied in "layouts/Navbar/TopSiderMenu/"
 *    for the avatar/user options of the Navbar the information is mapped and then it shows
 *    inline or vertical form depending of the responsive size.
 * It is NOT necessary to add an icon type, but it must be removed for the principal mapping in "layouts/Navbar/TopSiderMenu/mainMenuNav"
 * The param "title:" comes from "translations/"
 * @param [{}]
 * @return String
 */
const userJson = {
  title: 'header.avatar.name',
  avatarName: 'header.avatar.title',
  key: '9',
  submenu: [
    {
      path: '/Logout',
      title: 'header.avatar.option2',
      iconType: 'star',
      key: '9-1',
    },
  ],
}

export default userJson
