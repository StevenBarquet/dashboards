import { combineReducers } from 'redux'
import errorHandler from 'src/reducers/errorHandler'
import spinner from 'src/reducers/spinner'
import login from 'src/reducers/Login'
import company from 'src/reducers/company'
import group from 'src/reducers/group'
import user from 'src/reducers/User'
import dashboards from 'src/reducers/Dashboard'

export default combineReducers({
  errorHandler,
  login,
  spinner,
  company,
  group,
  user,
  dashboards,
})
