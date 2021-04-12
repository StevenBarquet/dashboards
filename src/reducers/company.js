import { GET_ALL_COMPANY, IS_LOADING } from '../actions/actionTypes'

const INITIAL_STATE = {
  company: [],
  loading: false,
  error: '',
}

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case GET_ALL_COMPANY:
      return {
        ...state,
        company: action.payload,
        loading: true,
        error: '',
        type: ['modal', 'notify', 'message'],
        level: ['success', 'warning', 'info', 'error'],
      }
    case IS_LOADING:
      return { ...state, loading: false }
    default:
      return state
  }
}
