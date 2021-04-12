import {
  CREATE_DASHBOARD,
  ASSIGN_PERMISSIONS,
  TOOGLE_CREATE_DASH,
  GET_ONE_DASHBOARD,
  GET_USERS_DASH,
  GET_COMPANIES_DASH,
  GET_GROUPS_DASH,
  TOOGLE_CREATE_COMP,
  TOOGLE_UPDATE_COMP,
  TOOGLE_UPDATE_DASH,
  GET_ONE_COMPANY,
  GET_ALL_DASH,
  FILTER_COMPANY,
  RESET_DASH,
  FILTER_GROUPS,
  FILTER_DASHBOARD,
  GET_ONE_GROUP,
} from 'src/actions/actionTypes'

const INITIAL_STATE = {
  operationType: 'create',
}

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case GET_ALL_DASH:
      return {
        ...state,
        dashboardsData: action.payload,
      }
    case FILTER_DASHBOARD:
      return {
        ...state,
        dashboardsData: action.payload,
      }
    case CREATE_DASHBOARD:
      return {
        ...state,
        data: action.payload,
        operationType: 'update',
      }
    case ASSIGN_PERMISSIONS:
      return {
        ...state,
        dashboard: action.payload,
      }
    case TOOGLE_CREATE_DASH:
      return {
        ...state,
        operationType: 'update',
      }
    case TOOGLE_UPDATE_DASH:
      return {
        ...state,
        operationType: 'update',
      }
    case GET_ONE_DASHBOARD:
      return {
        ...state,
        data: action.payload,
        operationType: 'update',
      }
    case GET_USERS_DASH:
      return {
        ...state,
        users: action.payload,
      }
    case GET_COMPANIES_DASH:
      return {
        ...state,
        companies: action.payload,
      }
    case FILTER_COMPANY:
      return {
        ...state,
        companies: action.payload,
      }
    case GET_GROUPS_DASH:
      return {
        ...state,
        groups: action.payload,
      }
    case FILTER_GROUPS:
      return {
        ...state,
        groups: action.payload,
      }
    case TOOGLE_UPDATE_COMP:
      return {
        ...state,
        operationComp: 'update',
      }
    case TOOGLE_CREATE_COMP:
      return {
        ...state,
        operationComp: 'create',
      }
    case GET_ONE_GROUP:
      return {
        ...state,
        group: action.payload,
      }
    case GET_ONE_COMPANY:
      return {
        ...state,
        company: action.payload,
      }
    case RESET_DASH:
      return {
        ...state,
        data: undefined,
      }
    default:
      return state
  }
}
