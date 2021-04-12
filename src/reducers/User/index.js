import {
  GET_ALL_USERS,
  TOOGLE_CREATE,
  FILTER_USER,
  GET_ONE_USER,
  UPDATE_USER,
} from 'src/actions/actionTypes'

const INITIAL_STATE = {
  operationType: 'create',
}

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case GET_ALL_USERS:
      return {
        ...state,
        users: action.payload,
      }
    case FILTER_USER:
      return {
        ...state,
        users: action.payload,
      }
    case GET_ONE_USER:
      return {
        ...state,
        user: action.payload,
        operationType: 'update',
      }
    case TOOGLE_CREATE:
      return {
        ...state,
        user: undefined,
        operationType: 'create',
      }
    case UPDATE_USER:
      return {
        ...state,
        operationType: 'update',
      }

    default:
      return state
  }
}
