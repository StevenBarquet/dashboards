import {
  CLOSE_HANDLER,
  IS_LOADING,
  LAUNCH_MESSAGE,
  LAUNCH_MODAL,
  LAUNCH_NOTIFY,
} from '../actions/actionTypes'

const INITIAL_STATE = {
  statusCode: null,
  message: '',
  title: '',
  type: '',
  level: '',
  open: false,
  loading: true,
}

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case LAUNCH_MESSAGE: {
      return {
        ...state,
        type: 'message',
        open: true,
        loading: false,
        ...action.payload,
      }
    }
    case LAUNCH_MODAL: {
      return {
        ...state,
        type: 'modal',
        open: true,
        loading: false,
        ...action.payload,
      }
    }
    case LAUNCH_NOTIFY: {
      return {
        ...state,
        type: 'notification',
        open: true,
        loading: false,
        ...action.payload,
      }
    }
    case CLOSE_HANDLER:
      return {
        ...state,
        open: false,
        statusCode: null,
        message: '',
        title: '',
        type: '',
        level: '',
        loading: false,
      }
    case IS_LOADING:
      return { ...state, loading: true }

    default:
      return state
  }
}
