import { IS_LOADING, IS_LOADED } from '../actions/actionTypes'

const INITIAL_STATE = {
  loading: false,
}

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case IS_LOADING:
      return { ...state, loading: true }
    case IS_LOADED:
      return { ...state, loading: false }
    default:
      return state
  }
}
