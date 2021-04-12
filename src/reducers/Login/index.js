import { GET_SESSION, CLEAR_SESSION } from 'src/actions/actionTypes'

const INITIAL_STATE = {}

export default (state = INITIAL_STATE, action) => {
  const { type, payload } = action
  switch (type) {
    case GET_SESSION:
      return {
        ...state,
        ...payload,
      }

    case CLEAR_SESSION:
      return {}

    default:
      return state
  }
}
